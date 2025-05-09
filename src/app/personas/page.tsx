"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Pagination } from "swiper/modules"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Card } from "@/components/ui/card"

// Importar estilos de Swiper
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"

// Datos de las personas
const personas = [
  {
    img: "https://res.cloudinary.com/dhp3vmkkl/image/upload/v1743277078/persona1_xiejul.png",
    nombre: "Luis Martínez",
    cargo: "Enólogo jefe",
    descripcion:
      "Luis supervisa la producción de nuestros vinos desde hace más de 15 años. Su experiencia y pasión por la enología han sido fundamentales para el desarrollo de nuestros vinos premiados. Graduado en Enología por la Universidad de La Rioja, ha trabajado en bodegas de Francia e Italia antes de unirse a nuestro equipo.",
  },
  {
    img: "https://res.cloudinary.com/dhp3vmkkl/image/upload/v1743277082/persona2_l9i6p3.png",
    nombre: "Clara Ruiz",
    cargo: "Directora de marketing",
    descripcion:
      "Clara se encarga de que nuestra marca brille tanto como nuestros vinos. Con más de 10 años de experiencia en marketing digital y tradicional, ha posicionado nuestra bodega en el mercado nacional e internacional. Su creatividad y visión estratégica han sido clave para el crecimiento de nuestra presencia en el sector.",
  },
  {
    img: "https://res.cloudinary.com/dhp3vmkkl/image/upload/v1743277082/persona3_hy6wwf.png",
    nombre: "Javier Gómez",
    cargo: "Responsable de bodega",
    descripcion:
      "Javier gestiona la bodega con pasión y atención al detalle. Su conocimiento profundo de los procesos de vinificación y su dedicación a la calidad garantizan que cada botella que sale de nuestra bodega cumpla con los más altos estándares. Lleva más de 20 años en el sector vitivinícola y es un experto en la crianza en barrica.",
  },
]

export default function PersonasPage() {
  const [personaIdx, setPersonaIdx] = useState(0)
  const persona = personas[personaIdx]

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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-8">Nuestro Equipo</h1>

        <Card className="max-w-4xl mx-auto p-6 md:p-8">
          <div className="personas-wrapper">
            <div className="slider-container mb-8">
              <Swiper
                effect="fade"
                onSlideChange={(sw) => setPersonaIdx(sw.realIndex)}
                pagination={{ clickable: true }}
                modules={[EffectFade, Pagination]}
                className="mySwiper rounded-lg overflow-hidden"
              >
                {personas.map((p, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="aspect-[4/3] relative">
                      <img src={p.img || "/placeholder.svg"} alt={p.nombre} className="w-full h-full object-cover" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={personaIdx}
                className="persona-info text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-serif text-[#6b1d1d] mb-2">{persona.nombre}</h2>
                <h3 className="text-xl text-gray-700 mb-4">{persona.cargo}</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">{persona.descripcion}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </main>
  )
}
