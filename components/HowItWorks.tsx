import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ScopeoHowItWorks() {
  const router = useRouter()

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl sm:h-[600px] sm:w-[600px]" />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-4 sm:px-6">
        {/* Terminal */}
        <div className="w-full max-w-4xl rounded-xl border bg-muted/30 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-3 py-2 text-[11px] sm:px-4 sm:text-xs text-muted-foreground">
            <span className="truncate">scopeo / analysis-engine</span>
            <span className="hidden sm:block">v1.0</span>
          </div>

          {/* Body */}
          <div className="space-y-3 px-4 py-4 font-mono text-[12px] leading-relaxed sm:space-y-4 sm:px-6 sm:py-6 sm:text-sm">
            <p>
              <span className="text-primary">$</span> ingest client_request
            </p>
            <p className="text-muted-foreground">
              → Parsing goals, constraints, assumptions, and unknowns
            </p>

            <p>
              <span className="text-primary">$</span> model scope
            </p>
            <p className="text-muted-foreground">
              → Separating MVP, future scope, and out-of-scope items
            </p>

            <p>
              <span className="text-primary">$</span> evaluate risk_signals
            </p>
            <p className="text-muted-foreground">
              → Detecting ambiguity, dependencies, timeline pressure, cost variance
            </p>

            <p>
              <span className="text-primary">$</span> generate clarifying_questions
            </p>
            <p className="text-muted-foreground">
              → Highlighting missing inputs required for confident delivery
            </p>

            <p>
              <span className="text-primary">$</span> recommend action
            </p>
            <p className="text-muted-foreground">
              → ASK QUESTIONS · SEND PROPOSAL · DECLINE PROJECT
            </p>
          </div>
        </div>

        {/* Minimal explanation */}
        <p className="mt-4 max-w-2xl text-center text-xs sm:mt-6 sm:text-sm text-muted-foreground">
          Scopeo evaluates delivery signals before recommending commitment.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <Button size="lg" onClick={() => router.push("/?mode=analyze")}>
            Try with a real request
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/")}
          >
            Back
          </Button>
        </div>
      </div>
    </main>
  )
}
