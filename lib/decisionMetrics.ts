import { ScopeOutput } from "@/types/scope";

export function buildDecisionMetrics(output: ScopeOutput) {
  const confidence = Math.round(output.confidenceScore * 100);

  const highestRisk =
    output.risks.find(r => r.severity === "high") ? 71 + Math.round(Math.random() * 10):
    output.risks.find(r => r.severity === "medium") ? 50 :
    20;

  // let clarity =
  //   output.mvpFeatures.length >= 5 ? 80 :
  //   output.mvpFeatures.length >= 3 ? 50 :
  //   20;

  const clarity = Math.round(confidence * (1 - (highestRisk/100)))

  return {
    confidence,
    risk: highestRisk,
    clarity,
  };
}
