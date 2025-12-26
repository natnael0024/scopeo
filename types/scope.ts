export type RiskLevel = "low" | "medium" | "high"

export interface ScopeOutput {
  summary: string
  mvpFeatures: string[]
  futureFeatures: string[]
  assumptions: string[]
  outOfScope: string[]
  timeline: string
  costEstimate: "low" | "medium" | "high"
  risks: {
    description: string
    severity: RiskLevel
  }[]
  clarifyingQuestions: string[]
  confidenceScore: number // 0.0 – 1.0
  skills: {
    primary: string[]
    supporting: string[]
    optional: string[]
  }
}
