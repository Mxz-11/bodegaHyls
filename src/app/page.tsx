import Image from "next/image"
import { Card } from "@/components/ui/card"
import { LineChart } from "@/components/winery-chart"
import { GrapeTable } from "@/components/grape-table"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { MetricCard } from "@/components/metric-card"

export default function Dashboard() {
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
        {/* Hero Image */}
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

        {/* Dashboard Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-center mb-8">Sobre nuestra bodega</h1>

        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricCard title="Colaboradores:" value="120" unit="personas" />
          <MetricCard title="Tamaño de nuestras viñas" value="50" unit="hectáreas" />
          <MetricCard title="Litros/año" value="90.000" valueClassName="text-[#6b1d1d]" />
        </div>

        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-serif mb-4">Monthly Sales</h2>
            <div className="h-64">
              <LineChart />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-serif mb-4">Uvas</h2>
            <GrapeTable />
          </Card>
        </div>
      </div>
    </main>
  )
}
