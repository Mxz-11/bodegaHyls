import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MainNav() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-serif">
            <span className="text-[#6b1d1d]">Bodega</span> <span className="text-amber-500">Valenciano</span>
          </h1>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/personas" className="text-gray-700 hover:text-[#6b1d1d] transition-colors">
            Personas
          </Link>
          <Link href="/historia" className="text-gray-700 hover:text-[#6b1d1d] transition-colors">
            Historia
          </Link>
          <Link href="/hoyales" className="text-gray-700 hover:text-[#6b1d1d] transition-colors">
            Hoyales
          </Link>
          <Button variant="default" className="bg-[#6b1d1d] hover:bg-[#5a1818]">
            Imagenes
          </Button>
        </nav>
      </div>
    </header>
  )
}
