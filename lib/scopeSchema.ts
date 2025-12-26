import { z } from "zod";

export const ScopeSchema = z.object({
  summary: z.string().min(20, "Summary too short"),

  mvpFeatures: z
    .array(z.string().min(3))
    .min(1, "At least one feature is required"),
  
  futureFeatures: z
    .array(z.string().min(3))
    .min(1, "At least one feature is required"),

  assumptions: z
    .array(z.string().min(1))
    .min(1, "At least one assumption is required"),

  outOfScope: z
    .array(z.string().min(1))
    .min(1, "At least one out of scope item is required"),

  timeline: z.string().min(5, "Timeline too short"),

  costEstimate: z.enum(["low", "medium", "high"]),

  costDrivers: z
    .array(z.string().min(3)),

  costRange: z.string().min(5, "Cost range too short"),

  risks: z
    .array(
      z.object({
        description: z.string().min(5),
        severity: z.enum(["low", "medium", "high"]),
      })
    )
    .min(1, "At least one risk is required"),

  skills: z.object({
    primary: z
      .array(z.string()),
    supporting: z
      .array(z.string())
      .optional()
      .default([]),
    optional: z
      .array(z.string())
      .optional()
      .default([])
  }),

  clarifyingQuestions: z
    .array(z.string().min(5))
    .min(1, "At least one clarifying question is required"),

  confidenceScore: z.number().min(0).max(1),
});
