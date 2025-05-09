import { Card } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string
  unit?: string
  valueClassName?: string
}

export function MetricCard({ title, value, unit, valueClassName }: MetricCardProps) {
  return (
    <Card className="p-6 flex flex-col items-center justify-center text-center">
      <h3 className="text-lg text-gray-700 mb-2">{title}</h3>
      <div className={`text-3xl md:text-4xl font-serif ${valueClassName || "text-gray-900"}`}>
        {value}
        {unit && <span className="text-base ml-1">{unit}</span>}
      </div>
    </Card>
  )
}
