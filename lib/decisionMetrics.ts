import { ScopeOutput } from "@/types/scope";

export function buildDecisionMetrics(output: ScopeOutput) {
  const confidence = Math.round(output.confidenceScore * 100);

  const highestRisk =
    output.risks.find(r => r.severity === "high") ? 80 :
    output.risks.find(r => r.severity === "medium") ? 50 :
    20;

  const clarity =
    output.features.length >= 5 ? 80 :
    output.features.length >= 3 ? 50 :
    20;

  return {
    confidence,
    risk: highestRisk,
    clarity,
  };
}
