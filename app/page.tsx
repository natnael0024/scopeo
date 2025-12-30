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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { SpinnerCustom } from "@/components/ui/spinner";


export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<ScopeOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const decision = useMemo(() => {
    if (!output) return null;
    // const decision = getDecision(output);
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

  // console.log('ou2873:',output)
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between py-2 pb-4">
        <h1 className="text-xl md:text-2xl font-bold text-green-600">
          <Image
          src={'/logo.png'}
          alt=""
          width={100}
          height={100}/>
        </h1>
        <ModeToggle />
      </div>

      {/* Input */}
      <Textarea
        rows={5}
        placeholder="Paste client request here..."
        value={input}
        
        onChange={(e) => setInput(e.target.value)}
        className="mb-4  bg-white dark:bg-[#0f1311] selection:bg-green-500 selection:text-white"
        autoFocus
      />

      <div className=" flex">
        <Button
          onClick={generateScope}
          size="lg"
          disabled={loading || !input.trim()}
          className="mb-4 py-6 px-10 dark:text-white text-md rounded-full bg-green-600 cursor-pointer duration-500"
        >
          {loading ?(
            <div className=" flex items-center gap-2">
              <SpinnerCustom/> Analyzing...
            </div>
          ) : "Analyze Request"}
        </Button>

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
            <Card className="mb-4 h-fit flex-1 relative overflow-hidden rounded-2xl border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Decision Summary</CardTitle>
              </CardHeader>

              <CardContent>

                <DecisionChart metrics={metrics} />

                <p className="mt-4 text-center">
                  <strong>Recommended Action:</strong>{" "}
                  {decision.recommendation === "ASK_QUESTIONS" && "Ask clarifying questions"}
                  {decision.recommendation === "SEND_PROPOSAL" && "Send proposal"}
                  {decision.recommendation === "DECLINE" && "Decline project"}
                </p>
              </CardContent>

            </Card>

            {/* DETAILS */}
            <div className=" flex-2">
              <ScopeCard title="Project Summary" content={output.summary} />
              <ScopeCard title="MVP Features">
                <FeatureList type="features" items={output.mvpFeatures} />
              </ScopeCard>
              <ScopeCard title="Future Features">
                <FeatureList type="features" items={output.futureFeatures} />
              </ScopeCard>
              <ScopeCard title="Assumptions">
                <FeatureList type="assumption" items={output.assumptions} />
              </ScopeCard>
              <ScopeCard title="Out of scope">
                <FeatureList type="out-of-scope" items={output.outOfScope} />
              </ScopeCard>
              <ScopeCard title="Timeline" content={output.timeline} />
              <ScopeCard
                title="Cost Estimate"
                content={`Estimated cost: ${output.costEstimate.toUpperCase()} (${output.costRange}) `}
              />
              {/* <ScopeCard title="Cost Drivers">
                <FeatureList type="features" items={output.costDrivers} />
              </ScopeCard>  */}
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

      <div>
        <footer className="mt-16 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} scopeo. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
