"use client";

import { useMemo, useState } from "react";
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
import SkillsRequired from "@/components/SkillsRequired";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { SpinnerCustom } from "@/components/ui/spinner";

export default function Analyzer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<ScopeOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const decision = useMemo(() => (output ? getDecision(output) : null), [output]);
  const metrics = useMemo(() => (output ? buildDecisionMetrics(output) : null), [output]);

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
      if (!res.ok) return setError(data.message || "Failed to generate scope");
      setOutput(data as ScopeOutput);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 md:p-12">
      {/* Header */}
      <div className="flex items-center justify-between py-4 mb-10">
        <Image src="/logo.png" alt="Scopeo" width={120} height={48} />
        <ModeToggle />
      </div>

      {/* Input Section */}
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto mb-10">
        <Textarea
          rows={6}
          placeholder="Paste client request here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className=" w-full rounded-3xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg focus:border-green-500 focus:ring-2 focus:ring-green-400 transition"
          autoFocus
        />

        <Button
          onClick={generateScope}
          size="lg"
          disabled={loading || !input.trim()}
          className="mt-6 rounded-full px-12 py-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-xl transition-all transform hover:-translate-y-1"
        >
          {loading ? (
            <div className="flex items-center gap-3 justify-center">
              <SpinnerCustom />
              <span>Analyzing...</span>
            </div>
          ) : (
            "Analyze Request"
          )}
        </Button>

        {error && (
          <div className="mt-6 w-full rounded-xl bg-yellow-100 text-yellow-900 px-5 py-3 shadow-lg max-w-3xl text-center font-medium animate-pulse">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
          <ScopeSkeleton type="chart" />
          <div className="flex flex-col gap-4 flex-1">
            {[1, 2, 3].map((s) => (
              <ScopeSkeleton type="card" key={s} />
            ))}
          </div>
        </div>
      )}

      {/* Output Section */}
      {output && decision && metrics && (
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left: Decision Summary */}
          <Card className="flex-1 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800 transition-all hover:scale-105">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-extrabold text-green-700 dark:text-green-400">
                Decision Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DecisionChart metrics={metrics} />
              <p className="mt-6 text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                Recommended Action:{" "}
                <span className="text-green-600 dark:text-green-400 font-bold">
                  {decision.recommendation === "ASK_QUESTIONS" && "Ask clarifying questions"}
                  {decision.recommendation === "SEND_PROPOSAL" && "Send proposal"}
                  {decision.recommendation === "DECLINE" && "Decline project"}
                </span>
              </p>
            </CardContent>
          </Card>

          {/* Middle: Main Scope Sections */}
          <div className="flex-2 flex flex-col gap-6">
            <ScopeCard title="Project Summary" content={output.summary} className="hover:shadow-xl transition" />
            <ScopeCard title="MVP Features" className="hover:shadow-xl transition">
              <FeatureList type="features" items={output.mvpFeatures} />
            </ScopeCard>
            <ScopeCard title="Future Features" className="hover:shadow-xl transition">
              <FeatureList type="features" items={output.futureFeatures} />
            </ScopeCard>
            <ScopeCard title="Risks" className="hover:shadow-xl transition">
              <RiskList risks={output.risks} />
            </ScopeCard>
            <ScopeCard title="Clarifying Questions" className="hover:shadow-xl transition">
              <ClarifyingQuestionsList clarifyingQuestions={output.clarifyingQuestions} />
            </ScopeCard>
          </div>

          {/* Right: Skills Required */}
          <div className="flex-1">
            <ScopeCard title="Skills Required" className="hover:shadow-xl transition">
              <SkillsRequired {...output.skills} />
            </ScopeCard>
          </div>
        </div>
      )}
    </div>
  );
}
