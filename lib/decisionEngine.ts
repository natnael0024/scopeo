import { ScopeOutput } from "@/types/scope";

export function getDecision(scope: ScopeOutput) {
  // Reliability
  let reliability: "low" | "medium" | "high" = "high";
  if (scope.confidenceScore < 0.4) reliability = "low";
  else if (scope.confidenceScore < 0.7) reliability = "medium";

  // Risk level
  let riskLevel: "low" | "medium" | "high" = "low";
  if (scope.risks.some(r => r.severity === "high")) {
    riskLevel = "high";
  } else if (scope.risks.some(r => r.severity === "medium")) {
    riskLevel = "medium";
  }

  // Recommendation
  let recommendation:
    | "ASK_QUESTIONS"
    | "SEND_PROPOSAL"
    | "DECLINE" = "SEND_PROPOSAL";

  if (reliability === "low") recommendation = "ASK_QUESTIONS";
  else if (riskLevel === "high") recommendation = "ASK_QUESTIONS";
  else if (riskLevel === "medium") recommendation = "ASK_QUESTIONS";

  return { reliability, riskLevel, recommendation };
}
