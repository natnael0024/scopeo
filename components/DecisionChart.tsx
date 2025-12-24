"use client";

import { Doughnut } from "react-chartjs-2";
import "@/lib/chartConfig";
import { DecisionMetrics } from "@/types/decision";

export default function DecisionChart({ metrics }: { metrics: DecisionMetrics }) {
  const data = {
    labels: ["Confidence", "Risk", "Scope Clarity"],
    datasets: [
      {
        data: [
          metrics.confidence,
          metrics.risk,
          metrics.clarity,
        ],
        backgroundColor: [
          "#16a34a", // green
          "#dc2626", // red
          "#f59e0b", // amber
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw; 
            return `${label}: ${value}%`;
          }
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Doughnut data={data}  options={options} />
    </div>
  );
}
