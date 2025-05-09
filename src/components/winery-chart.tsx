"use client"

import {
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Jan", sales: 10 },
  { name: "Feb", sales: 15 },
  { name: "Mar", sales: 25 },
  { name: "Apr", sales: 22 },
  { name: "May", sales: 30 },
  { name: "Jun", sales: 28 },
  { name: "Jul", sales: 40 },
  { name: "Dec", sales: 32 },
]

export function LineChart() {
  return (
    <ChartContainer
      config={{
        sales: {
          label: "Sales",
          color: "hsl(0, 59%, 27%)",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis hide />
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="var(--color-sales)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--color-sales)" }}
            activeDot={{ r: 6 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
