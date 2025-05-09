"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-serif">
            <span className="text-[#6b1d1d]">Bodega</span> <span className="text-amber-500">Valenciano</span>
          </h1>
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className="p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <nav className="absolute w-full bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/personas"
              className="text-gray-700 hover:text-[#6b1d1d] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Personas
            </Link>
            <Link
              href="/historia"
              className="text-gray-700 hover:text-[#6b1d1d] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Historia
            </Link>
            <Link
              href="/hoyales"
              className="text-gray-700 hover:text-[#6b1d1d] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Hoyales
            </Link>
            <Button
              variant="default"
              className="bg-[#6b1d1d] hover:bg-[#5a1818] w-full"
              onClick={() => setIsOpen(false)}
            >
              Imagenes
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
