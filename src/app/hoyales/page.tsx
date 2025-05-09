"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Cloud, Thermometer, Calendar } from "lucide-react"

const CODIGO_MUNICIPIO = "09172"
const AEMET_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWxkY3Jlc2NlbjVAZ21haWwuY29tIiwianRpIjoiMjcwMWU2YzUtYTE0Ny00NTBjLWE1YzctNGZhOGJmMTQ4MDllIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE3NDMzNjYzMjUsInVzZXJJZCI6IjI3MDFlNmM1LWExNDctNDUwYy1hNWM3LTRmYThiZjE0ODA5ZSIsInJvbGUiOiIifQ.nFpujebMLMdBlG6a-LuH2F9jklqjbCB4U4Juy2rZLlQ"

export default function HoyalesPage() {
  type PrediccionDia = {
    fecha: string
    temperatura: {
      maxima: string
      minima: string
    }
    estadoCielo: { descripcion?: string }[]
  }
  
  type DatosAEMET = {
    prediccion: {
      dia: PrediccionDia[]
    }
  }
  
  const [datos, setDatos] = useState<DatosAEMET | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fechaActual, setFechaActual] = useState<string | null>(null)

  useEffect(() => {
    async function obtenerDatos() {
      try {
        setLoading(true)
        const urlInicial = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${CODIGO_MUNICIPIO}?api_key=${AEMET_API_KEY}`
        const resp1 = await fetch(urlInicial)
        const json1 = await resp1.json()

        if (!json1.datos) throw new Error("No se obtuvo el enlace a los datos")

        const resp2 = await fetch(json1.datos)
        const json2 = await resp2.json()

        setDatos(json2[0])
        setError(null)
      } catch (error: unknown) {
        console.error("Error en la petición:", error)
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(String(error))
        }
      } finally {
        setLoading(false)
      }
    }

    obtenerDatos()

    // Solo cliente: fecha actual
    setFechaActual(new Date().toLocaleString("es-ES"))
  }, [])

  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return ""
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="hidden md:block">
        <MainNav />
      </div>

      <div className="md:hidden">
        <MobileNav />
      </div>

      <div className="container mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-8">El Tiempo en Hoyales de Roa</h1>

          <div className="max-w-3xl mx-auto text-center mb-8">
            <p className="text-gray-700">
              Consulta la predicción meteorológica actualizada para Hoyales de Roa, donde se encuentran nuestros
              viñedos. El clima es un factor fundamental para la calidad de nuestras uvas y vinos.
            </p>
          </div>

          {loading ? (
            <Card className="max-w-2xl mx-auto p-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4 mx-auto" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-32 rounded-lg" />
                  <Skeleton className="h-32 rounded-lg" />
                  <Skeleton className="h-32 rounded-lg" />
                  <Skeleton className="h-32 rounded-lg" />
                </div>
              </div>
            </Card>
          ) : error ? (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                No se pudieron obtener los datos meteorológicos: {error}. Por favor, inténtalo de nuevo más tarde.
              </AlertDescription>
            </Alert>
          ) : datos ? (
            <Card className="max-w-2xl mx-auto p-6">
              <h2 className="text-2xl font-serif text-center mb-6 text-[#6b1d1d]">Predicción para hoy</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Fecha */}
                <motion.div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center"
                  whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="bg-[#6b1d1d]/10 p-3 rounded-full mr-4">
                    <Calendar className="h-6 w-6 text-[#6b1d1d]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Fecha</h3>
                    <p className="text-lg font-medium">{formatearFecha(datos.prediccion.dia[0].fecha)}</p>
                  </div>
                </motion.div>

                {/* Temperatura máxima */}
                <motion.div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center"
                  whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="bg-red-100 p-3 rounded-full mr-4">
                    <Thermometer className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Temperatura máxima</h3>
                    <p className="text-lg font-medium">{datos.prediccion.dia[0].temperatura.maxima} °C</p>
                  </div>
                </motion.div>

                {/* Temperatura mínima */}
                <motion.div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center"
                  whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Thermometer className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Temperatura mínima</h3>
                    <p className="text-lg font-medium">{datos.prediccion.dia[0].temperatura.minima} °C</p>
                  </div>
                </motion.div>

                {/* Estado del cielo */}
                <motion.div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center"
                  whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="bg-sky-100 p-3 rounded-full mr-4">
                    <Cloud className="h-6 w-6 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Estado del cielo</h3>
                    <p className="text-lg font-medium">
                      {datos.prediccion.dia[0].estadoCielo[0]?.descripcion || "Desconocido"}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Datos proporcionados por AEMET (Agencia Estatal de Meteorología)</p>
                <p>Última actualización: {fechaActual ?? "Cargando..."}</p>
              </div>
            </Card>
          ) : null}
        </motion.div>
      </div>
    </main>
  )
}
