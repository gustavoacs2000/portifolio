interface GooglePlaceReview {
  author_name?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
  time?: number;
}

interface GooglePlaceDetailsResponse {
  status?: string;
  result?: {
    reviews?: GooglePlaceReview[];
  };
}

interface DuetoTestimonial {
  id: string;
  body: string;
  author: string;
  role: string;
  since: string;
  rating: number;
}

function clampRating(value: number | undefined): number {
  if (!Number.isFinite(value)) return 5;
  return Math.max(1, Math.min(5, Math.round(value as number)));
}

function normalizeText(value: string | undefined): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function truncate(value: string, max = 260): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trim()}…`;
}

export async function fetchDuetoGoogleTestimonials(maxReviews = 6): Promise<DuetoTestimonial[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.DUETO_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  const endpoint = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  endpoint.searchParams.set("place_id", placeId);
  endpoint.searchParams.set("fields", "reviews");
  endpoint.searchParams.set("language", "pt-BR");
  endpoint.searchParams.set("reviews_sort", "newest");
  endpoint.searchParams.set("key", apiKey);

  try {
    const response = await fetch(endpoint.toString(), {
      next: { revalidate: 60 * 60 * 6 },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as GooglePlaceDetailsResponse;
    const reviews = payload.result?.reviews;
    if (payload.status !== "OK" || !reviews?.length) return null;

    const mappedReviews = reviews
      .slice(0, maxReviews)
      .map((review, index) => {
        const body = truncate(normalizeText(review.text));
        if (!body) return null;

        const author = normalizeText(review.author_name) || "Aluno(a)";
        const relativeDate = normalizeText(review.relative_time_description);

        return {
          id: `google-${review.time ?? Date.now()}-${index}`,
          body,
          author,
          role: "Avaliacao do Google",
          since: relativeDate ? `${relativeDate} · Google` : "Google",
          rating: clampRating(review.rating),
        } satisfies DuetoTestimonial;
      })
      .filter((item): item is DuetoTestimonial => item !== null);

    return mappedReviews.length > 0 ? mappedReviews : null;
  } catch {
    return null;
  }
}
