export const proposalSources = ["ga", "advocacia", "imoveis", "cosmeticos", "dueto"] as const;

export type ProposalSource = (typeof proposalSources)[number];

export const proposalSourceLabels: Record<ProposalSource, string> = {
  ga: "GA Solutions",
  advocacia: "Advocacia",
  imoveis: "Imoveis",
  cosmeticos: "Cosmeticos",
  dueto: "Dueto",
};

export function isProposalSource(value: unknown): value is ProposalSource {
  return typeof value === "string" && proposalSources.includes(value as ProposalSource);
}
