import { ScopeOutput } from "@/types/scope";

export function getDecision(scope: ScopeOutput) {
  // --- Reliability ---
  let reliability: "low" | "medium" | "high" = "high";
  if (scope.confidenceScore < 0.4) reliability = "low";
  else if (scope.confidenceScore < 0.7) reliability = "medium";

  // --- Risk Level ---
  let riskLevel: "low" | "medium" | "high" = "low";
  if (scope.risks.some(r => r.severity === "high")) {
    riskLevel = "high";
  } else if (scope.risks.some(r => r.severity === "medium")) {
    riskLevel = "medium";
  }

  // --- Recommendation ---
  let recommendation: "ASK_QUESTIONS" | "SEND_PROPOSAL" | "DECLINE";

  // Decision logic
  if (reliability === "low" && riskLevel === "high") {
    recommendation = "DECLINE"; // Extreme case
  } else if (reliability === "low" || riskLevel === "high" || riskLevel === "medium") {
    recommendation = "ASK_QUESTIONS"; // Need more info
  } else {
    recommendation = "SEND_PROPOSAL"; // Confident and low risk
  }

  return { reliability, riskLevel, recommendation };
}
