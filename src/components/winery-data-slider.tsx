"use client"

import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import { Skeleton } from "@/components/ui/skeleton"
import { Thermometer, Droplets, Wind } from "lucide-react"
import { motion } from "framer-motion"

// Importar estilos de Swiper
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"

// Tipo para los datos de la bodega
interface WineryData {
  co2: number
  temperature: number
  humidity: number
  date: string
}

export function WineryDataSlider() {
  const [data, setData] = useState<WineryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3001/api/ultimo-registro")
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error("Error fetching winery data:", err)
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Actualizar datos cada 5 minutos
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Formatear fecha
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-32 rounded-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600">Error al cargar datos: {error}</p>
        <p className="text-sm text-red-500 mt-2">Comprueba que el servidor esté funcionando en http://localhost:3001</p>
      </div>
    )
  }

  if (!data) {
    return <p className="text-center text-gray-500">No hay datos disponibles</p>
  }

  const slides = [
    {
      title: "Temperatura",
      value: `${data.temperature} °C`,
      icon: <Thermometer className="h-8 w-8 text-red-500" />,
      color: "bg-red-50",
      iconColor: "bg-red-100",
    },
    {
      title: "Humedad",
      value: `${data.humidity} %`,
      icon: <Droplets className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-50",
      iconColor: "bg-blue-100",
    },
    {
      title: "CO2",
      value: `${data.co2} ppm`,
      icon: <Wind className="h-8 w-8 text-green-500" />,
      color: "bg-green-50",
      iconColor: "bg-green-100",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-center">Último registro: {formatDate(data.date)}</h3>
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className={`p-6 rounded-lg ${slide.color} flex items-center justify-between`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div>
                <h4 className="text-lg font-medium text-gray-700">{slide.title}</h4>
                <p className="text-3xl font-bold">{slide.value}</p>
              </div>
              <div className={`p-4 rounded-full ${slide.iconColor}`}>{slide.icon}</div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
