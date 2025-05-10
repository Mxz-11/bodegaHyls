"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { GrapeTable } from "@/components/grape-table"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { MetricCard } from "@/components/metric-card"

export default function Dashboard() {
  const [latestData, setLatestData] = useState({
    temperature: "Cargando...",
    humidity: "Cargando...",
    co2: "Cargando...",
    date: "Cargando...",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/latest")
        const data = await res.json()
        setLatestData(data)
      } catch (error) {
        console.error("Error fetching latest data:", error)
      }
    }
    fetchData()
  }, [])

  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return ""
    const fecha = new Date(fechaStr)
    return fecha.toLocaleString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const { temperature, humidity, co2, date } = latestData

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navs */}
      <div className="hidden md:block">
        <MainNav />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Hero */}
        <div className="relative w-full h-64 md:h-80 lg:h-96">
          <Image
            src="https://res.cloudinary.com/dauwswgd1/image/upload/v1746815613/vi%C3%B1as_ger0zb.webp"
            alt="Viñas"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-8">Sobre nuestra bodega</h1>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
          <MetricCard title="Colaboradores:" value="120" unit="personas" />
          <MetricCard title="Tamaño de nuestras viñas" value="50" unit="hectáreas" />
          <MetricCard title="Litros/año" value="1.000" valueClassName="text-[#6b1d1d]" />
        </div>

        {/* 4 tarjetas (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h2 className="text-2xl font-serif mb-4">Temperatura</h2>
            <MetricCard title="Actual" value={temperature} unit="°C" />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-serif mb-4">Humedad</h2>
            <MetricCard title="Actual" value={humidity} unit="%" />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-serif mb-4">CO₂</h2>
            <MetricCard title="Actual" value={co2} unit="ppm" />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-serif mb-6 text-center">Última lectura</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">CO₂</p>
                <p className="text-lg font-semibold text-[#6b1d1d]">{co2} ppm</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Temperatura</p>
                <p className="text-lg font-semibold">{temperature} °C</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Humedad</p>
                <p className="text-lg font-semibold">{humidity} %</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="text-lg font-medium italic">{formatearFecha(date)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Uvas */}
        <div className="mt-6">
          <Card className="p-6">
            <h2 className="text-2xl font-serif mb-4">Uvas</h2>
            <GrapeTable />
          </Card>
        </div>
      </div>
    </main>
  )
}
