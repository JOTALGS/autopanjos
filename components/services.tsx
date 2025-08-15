"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const activities = [
  {
    id: "climbing",
    title: "INYECCIÓN ELECTRÓNICA",
    enTitle: "Electronic Fuel Injection",
    ptTitle: "Injeção Eletrônica",
    description: "Sistema que controla electrónicamente la cantidad de combustible que se inyecta en el motor, mejorando el rendimiento y reduciendo emisiones.",
    enDescription: "A system that electronically controls the amount of fuel injected into the engine, improving performance and reducing emissions.",
    ptDescription: "Sistema que controla eletronicamente a quantidade de combustível injetado no motor, melhorando o desempenho e reduzindo as emissões.",
    image: "/images/inyector.png",
    products: ["Limpieza de Inyectores", "Colocacion de Inyectores", "Diagnóstico de Sensor de Oxígeno"],
  },
  {
    id: "hiking",
    title: "MECÁNICA INTEGRAL",
    enTitle: "Integral Mechanics",
    ptTitle: "Mecânica Integral",
    description: "Rama de la mecánica automotriz que abarca el diagnóstico, mantenimiento y reparación de todos los sistemas principales del vehículo, asegurando su funcionamiento óptimo.",
    enDescription: "A branch of automotive mechanics that covers diagnosis, maintenance, and repair of all major vehicle systems to ensure optimal performance.",
    ptDescription: "Ramo da mecânica automotiva que abrange diagnóstico, manutenção e reparo de todos os principais sistemas do veículo para garantir seu desempenho ideal.",
    image: "/images/block.png",
    products: ["Cambio de Aceite y Filtro", "Revisión de Frenos", "Cambio de Pastillas de Freno"]
  },
  {
    id: "skiing",
    title: "ELECTRÓNICA AUTOMOTRIZ",
    enTitle: "Automotive Electronics",
    ptTitle: "Eletrônica Automotiva",
    description: "Disciplina que integra sistemas eléctricos y electrónicos en los vehículos, permitiendo funciones como control de motor, seguridad y entretenimiento.",
    enDescription: "Discipline that integrates electrical and electronic systems in vehicles, enabling functions like engine control, safety and entertainment.",
    ptDescription: "Disciplina que integra sistemas elétricos e eletrônicos nos veículos, permitindo funções como controle do motor, segurança e entretenimento.",
    image: "/images/ecu.png",
    products: ["Diagnóstico Computarizado", "Reparacion de Arranques", "Revisión de Fusibles y Relés"]
  },
  {
    id: "alpine",
    title: "AIRE ACONDICIONADO",
    enTitle: "Air Conditioning",
    ptTitle: "Ar Condicionado",
    description: "Sistema que regula la temperatura, humedad y limpieza del aire dentro del vehículo para proporcionar confort al conductor y pasajeros.",
    enDescription: "System that regulates temperature, humidity, and air quality inside the vehicle to provide comfort for the driver and passengers.",
    ptDescription: "Sistema que regula a temperatura, umidade e qualidade do ar dentro do veículo para proporcionar conforto ao motorista e passageiros.",
    image: "/images/compresor.png",
    products: ["Recarga de Gas", "Cambio de Filtro de Cabina", "Diagnóstico de Compresor"]
  },
  {
    id: "trail-running",
    title: "ALINEACIÓN Y BALANCEO",
    enTitle: "Alignment and Balancing",
    ptTitle: "Alinhamento e Balanceamento",
    description: "Procedimientos que corrigen la posición del volante y equilibran el peso de las ruedas para asegurar una conducción estable y evitar desgaste irregular.",
    enDescription: "Procedures that correct steering wheel position and balance wheels weight to ensure stable driving and prevent uneven wear.",
    ptDescription: "Procedimentos que corrigem a posição volante e equilibram o peso das rodas para garantir uma condução estável e evitar desgaste irregular.",
    image: "/images/direccion.png",
    products: ["Alineación y Balanceo", "Balanceo Dinámico", "Reparacion de Suspensión"]
  }
]

export default function ActivitiesSection() {
  const [activeActivity, setActiveActivity] = useState(activities[0])
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [lang, setLang] = useState("por")

  return (
    <div className="w-full bg-white text-black py-24 px-6 md:px-16 relative z-10">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
            SERVICIOS MECANICOS
            <span className="block text-xl font-normal text-gray-600 mt-2">{lang==="por" ? "SERVIÇOS MÉCANICOS" : "MECHANICAL SERVICES"}</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl">
            Servicios de calidad garantizada para automotores de todas las marcas y modelos. Ofrecemos una amplia gama de servicios para satisfacer las necesidades de nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Activity Navigation */}
          <div className="lg:col-span-4">
            <div className="space-y-1">
              {activities.map((activity, index) => (
                <button
                  key={activity.id}
                  onClick={() => setActiveActivity(activity)}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className={`w-full text-left py-4 px-6 flex justify-between items-center transition-colors ${
                    activeActivity.id === activity.id
                      ? "bg-[#991B1B] text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  <div>
                    <span className="font-display font-extrabold block">{activity.title}</span>
                    <span className="text-sm opacity-70">{lang==="por" ? activity.ptTitle : activity.enTitle}</span>
                  </div>
                  <ChevronRight
                    className={`transition-transform duration-300 ${
                      hoverIndex === index || activeActivity.id === activity.id ? "translate-x-1" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Activity Content */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={activeActivity.image || "/placeholder.svg"}
                  alt={activeActivity.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h3 className="font-display text-3xl font-extrabold mb-2">{activeActivity.title}</h3>
                <p className="text-gray-600 mb-6">{lang==="por" ? activeActivity.ptTitle : activeActivity.enTitle}</p>
                <p className="text-lg mb-4">{activeActivity.description}</p>
                <p className="text-gray-600 bg-gray-100 border-l border-gray-500 ml-4 mr-8 p-2 mb-8">{lang==="por" ? activeActivity.ptDescription : activeActivity.enDescription}</p>

                <div className="mb-8">
                  <h4 className="font-display font-bold mb-4">SERVICIOS FRECUENTES</h4>
                  <ul className="space-y-2">
                    {activeActivity.products.map((product, index) => (
                      <li key={index} className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                        <div>
                          {product}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
