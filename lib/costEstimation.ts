import { ScopeOutput } from "@/types/scope";

export function estimateCost(output: ScopeOutput) {
    const mvpCount = output.mvpFeatures.length;
    const futureCount = output.futureFeatures?.length || 0;
  
    // Determine risk factor
    const highestRisk = output.risks.some(r => r.severity === "high") ? 2 :
                        output.risks.some(r => r.severity === "medium") ? 1 : 0;
  
    // Base score
    const score = mvpCount + 0.5 * futureCount + highestRisk;
  
    if (score <= 4) return "low";
    if (score <= 7) return "medium";
    return "high";
  }
  