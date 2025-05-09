"use client"

import { motion } from "framer-motion"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import Timeline from "@/components/Timeline"

export default function HistoriaPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <MainNav />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      <div className="container mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-8">Nuestra Historia</h1>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gray-700">
              Desde nuestra fundación en 1920, Bodega Valenciano ha mantenido un compromiso inquebrantable con la
              calidad y la tradición vinícola. A lo largo de más de un siglo, hemos evolucionado y crecido, pero siempre
              manteniendo nuestras raíces y valores familiares.
            </p>
          </div>

          <Timeline />
        </motion.div>
      </div>
    </main>
  )
}
