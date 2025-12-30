"use client";

import { useSearchParams } from "next/navigation";
import ScopeoLanding from "@/components/Landing";
import ScopeoHowItWorks from "@/components/HowItWorks";
import Analyzer from "@/components/Analyzer";

export default function ModeRouter() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  if (mode === "how") return <ScopeoHowItWorks />;
  if (mode !== "analyze") return <ScopeoLanding />;

  return <Analyzer/>;
}
