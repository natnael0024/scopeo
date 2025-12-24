"use client";

import { useState, useMemo } from "react";
import ScopeCard from "@/components/ScopeCard";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScopeSkeleton } from "@/components/ScopeSkeleton";
import { ModeToggle } from "@/components/ModeToggle";
import { ScopeOutput } from "@/types/scope";
import { getDecision } from "@/lib/decisionEngine";
import DecisionChart from "@/components/DecisionChart";
import { buildDecisionMetrics } from "@/lib/decisionMetrics";
import RiskList from "@/components/RisksList";
import FeatureList from "@/components/FeaturesList";
import ClarifyingQuestionsList from "@/components/ClarifyingQuestionsList";
import SkillsRequired from "@/components/SkillsRequired"

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<ScopeOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const decision = useMemo(() => {
    if (!output) return null;
    const decision = getDecision(output);
    return getDecision(output);
  }, [output]);

  const metrics = useMemo(()=>{
    if(!output) return null;
    return buildDecisionMetrics(output);
  },[output])

  const generateScope = async () => {
    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      const res = await fetch("/api/generateScope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientRequest: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to generate scope");
        return;
      }

      setOutput(data as ScopeOutput);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  console.log('ou2873:',output)
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between py-5">
        <h1 className="text-xl md:text-3xl font-bold text-green-600">
          C
        </h1>
        <ModeToggle />
      </div>

      {/* Input */}
      <Textarea
        rows={5}
        placeholder="Paste client request here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-4"
        autoFocus
      />

      <div className=" flex">
      <Button
        onClick={generateScope}
        size="lg"
        disabled={loading || !input.trim()}
        className="mb-4  bg-green-600 cursor-pointer duration-500"
      >
        {loading ? "Analyzing..." : "Generate Scope"}
      </Button>
      {
        output && decision && metrics && (
          <Button
          onClick={generateScope}
          size="lg"
          disabled={loading || !input.trim()}
          className="mb-4  bg-sky-600 hover:bg-sky-500 cursor-pointer duration-500"
        >
          {loading ? "Analyzing..." : "Generate Proposal"}
        </Button>
        )
      }
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 rounded bg-yellow-100 text-yellow-800">
          ⚠️ {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col md:flex-row gap-2">
          {/* {[1, 2, 3].map((s) => (
            <ScopeSkeleton key={s} />
          ))} */}
          <div>
            <ScopeSkeleton type={'chart'} />
          </div>
          <div className=" flex flex-col gap-2">
            {[1, 2, 3].map((s) => (
              <ScopeSkeleton type={'card'} key={s} />
            ))}
          </div>
        </div>
      )}

      {/* Output */}
      {output && decision && metrics && (
        <>
          <div className=" flex flex-col md:flex-row gap-4 justify-between">
            <div className="mb-6 p-4 rounded flex-1  ">
              <h3 className="font-semibold mb-4 text-center">
                Decision Summary
              </h3>

              <DecisionChart metrics={metrics} />

              <p className="mt-4 text-center">
                <strong>Recommended Action:</strong>{" "}
                {decision.recommendation === "ASK_QUESTIONS" && "Ask clarifying questions"}
                {decision.recommendation === "SEND_PROPOSAL" && "Send proposal"}
                {decision.recommendation === "DECLINE" && "Decline project"}
              </p>

            </div>

            {/* 🔑 DECISION SUMMARY (FIRST) */}
            {/* <div className="mb-6 p-4 rounded border w-full ">
              <h3 className="font-semibold mb-2">Decision Summary</h3>

              <p>
                <strong>Reliability:</strong>{" "}
                {decision.reliability.toUpperCase()}
              </p>

              <p>
                <strong>Risk Level:</strong>{" "}
                {decision.riskLevel.toUpperCase()}
              </p>

              <p className="mt-2">
                <strong>Recommended Action:</strong>{" "}
                {decision.recommendation === "ASK_QUESTIONS" && "Ask clarifying questions"}
                {decision.recommendation === "SEND_PROPOSAL" && "Send proposal"}
                {decision.recommendation === "DECLINE" && "Decline project"}
              </p>
            </div> */}

            {/* DETAILS */}
            <div className=" flex-2">
              <ScopeCard title="Project Summary" content={output.summary} />
              <ScopeCard title="Core Features">
                <FeatureList features={output.features} />
              </ScopeCard>
              <ScopeCard title="Timeline" content={output.timeline} />
              <ScopeCard
                title="Cost Estimate"
                content={`Estimated cost: ${output.costEstimate.toUpperCase()}`}
              />

              {/* <ScopeCard
                title="Risks"
                content={
                  "\n\n" +
                  output.risks
                    .map(
                      (r) =>
                        `- ${r.severity.toUpperCase()}: ${r.description}`
                    )
                    .join("\n")
                }
                
              /> */}
              <ScopeCard title="Risks">
                <RiskList risks={output.risks} />
              </ScopeCard>

              <ScopeCard title="Clarifying Questions">
                <ClarifyingQuestionsList clarifyingQuestions={output.clarifyingQuestions}/>
              </ScopeCard>
            </div>

            <div className=" flex-1 ">
              <ScopeCard title="Skills Required">
                <SkillsRequired
                  primary={output.skills.primary}
                  supporting={output.skills.supporting}
                  optional={output.skills.optional}
                />
              </ScopeCard>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
