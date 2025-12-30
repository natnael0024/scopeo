import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function ScopeoLanding() {
  const router = useRouter()

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="
            absolute left-1/2 top-1/2
            h-[420px] w-[420px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full bg-primary/20 blur-3xl
            sm:h-[600px] sm:w-[600px]
            lg:h-[700px] lg:w-[700px]
          "
        />
        <div
          className="
            absolute bottom-0 right-0
            h-[260px] w-[260px]
            rounded-full bg-secondary/20 blur-3xl
            sm:h-[340px] sm:w-[340px]
            lg:h-[400px] lg:w-[400px]
          "
        />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-4 sm:px-6 text-center">
        <Badge variant="secondary" className="mb-4 sm:mb-6">
          AI-Powered Scope Analysis
        </Badge>

        <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Turn client requests into
          <span className="block text-primary">
            clear, confident delivery plans
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-sm sm:mt-6 sm:text-base lg:text-lg text-muted-foreground">
          <span className="font-medium text-foreground">Scopeo</span> analyzes
          client requests to assess scope, risks, timelines, and cost — helping
          teams decide before committing.
        </p>

        <div className="mt-6 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:mt-10 sm:text-sm text-muted-foreground">
          <span>• Identify hidden risks</span>
          <span>• Clarify vague requirements</span>
          <span>• Estimate time & cost early</span>
          <span>• Decide with confidence</span>
        </div>

        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:mt-12 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <Button size="lg" onClick={() => router.push("/?mode=analyze")}>
            Analyze Request
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/?mode=how")}
          >
            See how it works
          </Button>
        </div>
      </div>
    </main>
  )
}
