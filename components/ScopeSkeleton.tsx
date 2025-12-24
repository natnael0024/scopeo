import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ScopeSkeleton({ type = "card" }: { type?: "card" | "chart" }) {
  if (type === "chart") {
    return (
      <div className="flex flex-col gap-2 items-center justify-center w-full max-w-sm mx-auto p-6">
        <Skeleton className="h-4 w-40" />
        <div className="relative ">
          <Skeleton className=" h-52 w-52 rounded-full" />
          {/* Inner hole */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="h-28 w-28 rounded-full bg-background" />
          </div>
        </div>
        <Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-48" />
      </div>
    )
  }

  //  Card skeleton
  return (
    <Card className="w-full border-gray-200 dark:border-gray-700 max-w-3xl rounded-xl mx-auto p-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-40" />
        </div>

        <Skeleton className="h-4 w-64 mt-4" />
      </CardHeader>

      <CardContent className="pt-4 space-y-3">
        <div className="flex gap-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="flex gap-1">
          <Skeleton className="h-4 w-96" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="flex gap-1">
          <Skeleton className="h-4 w-96" />
          <Skeleton className="h-4 w-48" />
        </div>
      </CardContent>
    </Card>
  )
}
