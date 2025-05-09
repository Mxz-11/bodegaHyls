"use client"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Pagination } from "swiper/modules"
import { Card } from "@/components/ui/card"

// Importar estilos de Swiper
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"

// Datos de los eventos históricos
const eventos = [
  {
    year: "1920",
    title: "Fundación",
    text: "La bodega fue fundada por la familia Valenciano en las tierras de Ribera del Duero, comenzando con apenas 5 hectáreas de viñedo y una pequeña instalación para la elaboración de vino.",
    images: ["https://res.cloudinary.com/dhp3vmkkl/image/upload/v1743353067/iqdiaqlbmmirf6lopuvx.jpg"],
  },
  {
    year: "1945",
    title: "Primera expansión",
    text: "Se amplían los viñedos hasta alcanzar las 15 hectáreas y se moderniza la bodega con nueva tecnología de la época, permitiendo aumentar la producción y mejorar la calidad del vino.",
    images: ["https://res.cloudinary.com/dhp3vmkkl/image/upload/v1743353067/jozujwwzl9jd2kgylnya.jpg"],
  },
  {
    year: "1978",
    title: "Reconocimiento internacional",
    text: "Nuestros vinos comienzan a exportarse a países europeos y reciben los primeros premios internacionales, consolidando la reputación de la bodega en el mercado global.",
    images: ["https://res.cloudinary.com/dhp3vmkkl/image/upload/v1743277078/persona1_xiejul.png"],
  },
  {
    year: "1995",
    title: "Renovación",
    text: "Se renueva completamente la bodega, combinando tradición con tecnología de vanguardia. Se construyen nuevas instalaciones y se implementan procesos de elaboración más sostenibles.",
    images: ["https://res.cloudinary.com/dhp3vmkkl/image/upload/v1743353063/ieiw0c8x7k34jclmgpbc.png"],
  },
  {
    year: "2010",
    title: "Certificación ecológica",
    text: "Obtenemos la certificación de producción ecológica para todos nuestros viñedos, reflejando nuestro compromiso con la sostenibilidad y el respeto por el medio ambiente.",
    images: [
      "https://res.cloudinary.com/dhp3vmkkl/image/upload/v1743353067/iqdiaqlbmmirf6lopuvx.jpg",
      "https://res.cloudinary.com/dhp3vmkkl/image/upload/v1743353063/ieiw0c8x7k34jclmgpbc.png",
    ],
  },
  {
    year: "2023",
    title: "Actualidad",
    text: "Seguimos innovando y manteniendo la calidad que nos caracteriza desde hace más de un siglo, con una producción anual de 90.000 litros y exportaciones a más de 20 países.",
    images: ["https://res.cloudinary.com/dhp3vmkkl/image/upload/v1743353067/jozujwwzl9jd2kgylnya.jpg"],
  },
]

export default function Timeline() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Línea vertical */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#6b1d1d]"></div>

        <div className="space-y-12">
          {eventos.map((evento, index) => (
            <motion.div
              key={evento.year}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Círculo en la línea */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#6b1d1d] border-4 border-white z-10"></div>

              {/* Contenido */}
              <Card className={`w-5/12 ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}>
                <div className="p-4">
                  <div className="flex flex-col space-y-2 mb-4">
                    <h3 className="text-xl font-bold text-[#6b1d1d]">{evento.year}</h3>
                    <h4 className="text-lg font-medium">{evento.title}</h4>
                    <p className="text-gray-700">{evento.text}</p>
                  </div>

                  {evento.images && evento.images.length > 0 && (
                    <div className="mt-4 rounded-lg overflow-hidden">
                      <Swiper
                        effect="fade"
                        pagination={{ clickable: true }}
                        modules={[EffectFade, Pagination]}
                        className="mySwiper"
                      >
                        {evento.images.map((imgUrl, idx) => (
                          <SwiperSlide key={idx}>
                            <div className="aspect-[4/3] relative">
                              <img
                                src={imgUrl || "/placeholder.svg"}
                                alt={`Evento de ${evento.year} - imagen ${idx}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
