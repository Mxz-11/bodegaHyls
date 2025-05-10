"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

// Datos de ejemplo para la gráfica (se reemplazarían con datos reales)
const mockTemperatureData = [
  { day: "Lunes", temperature: 22 },
  { day: "Martes", temperature: 24 },
  { day: "Miércoles", temperature: 21 },
  { day: "Jueves", temperature: 23 },
  { day: "Viernes", temperature: 25 },
  { day: "Sábado", temperature: 20 },
  { day: "Domingo", temperature: 22 },
]

export function TemperatureChart() {
  const [data, setData] = useState(mockTemperatureData)
  const [loading, setLoading] = useState(false)

  // En una implementación real, aquí se haría una petición para obtener
  // las temperaturas de los últimos días
  useEffect(() => {
    // Simulamos una carga de datos
    setLoading(true)
    const timer = setTimeout(() => {
      // Aquí se haría la petición real
      // Por ahora usamos los datos de ejemplo
      setData(mockTemperatureData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Skeleton className="h-64 w-full" />
  }

  return (
    <div className="h-64">
      <ChartContainer
        config={{
          temperature: {
            label: "Temperatura",
            color: "hsl(0, 59%, 27%)",
          },
        }}
        className="h-full w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis domain={[15, 30]} />
            <Tooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="var(--color-temperature)"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--color-temperature)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
