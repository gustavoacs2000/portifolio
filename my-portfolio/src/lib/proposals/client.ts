import type { ProposalSource } from "@/lib/proposals/shared";

const FALLBACK_DELAY_MS = 900;

type SubmitProposalInput = {
  source: ProposalSource;
  payload: unknown;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function submitProposal(input: SubmitProposalInput): Promise<void> {
  try {
    const response = await fetch("/api/proposals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: input.source,
        payload: input.payload,
        website: "",
      }),
    });

    if (!response.ok) {
      throw new Error(`Proposal API returned ${response.status}`);
    }

    const data = (await response.json()) as { ok?: boolean };
    if (!data?.ok) {
      throw new Error("Proposal API response missing ok=true");
    }
  } catch (error) {
    // Keep UX behavior stable even if API/email provider is unavailable.
    console.error("[proposals] fallback triggered", error);
    await sleep(FALLBACK_DELAY_MS);
  }
}
