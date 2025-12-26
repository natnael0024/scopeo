
import { cn } from "@/lib/utils";
import React from "react";

export function DotBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black">
      {/* Static dots layer */}
      <div
        className={cn(
          "fixed inset-0 z-0 pointer-events-none",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#535353_1px,transparent_1px)]"
        )}
      />

      {/* Static fade mask */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] dark:bg-black" />

      {/* Page content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
