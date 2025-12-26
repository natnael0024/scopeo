import { ScopeOutput } from "@/types/scope";

export function buildDecisionMetrics(output: ScopeOutput) {
  const confidence = Math.min(100, Math.max(0, Math.round(output.confidenceScore * 100)));

  // Deterministic highest risk
  const highestRisk =
    output.risks.some(r => r.severity === "high") ? 80 :
    output.risks.some(r => r.severity === "medium") ? 50 :
    20;

  // Clarity based on MVP scope + risk + confidence
  const mvpFeatureScore =
    output.mvpFeatures.length >= 5 ? 80 :
    output.mvpFeatures.length >= 3 ? 50 : 20;

  // Weighted average approach
  const clarity = Math.round(
    0.4 * mvpFeatureScore + 
    0.4 * confidence + 
    0.2 * (100 - highestRisk)
  );

  return {
    confidence,
    risk: highestRisk,
    clarity,
  };
}
