"use client"

import { useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ActivitiesSection from "./components/services"
import Footer from "./components/ui/footer"
import DynamicFrameLayout from "./components/DynamicFrameLayout"
import OffCanvas from "./components/OffCanvas"
import LogoSlider from "./components/InfiniteSlider"
import LightenText from "./components/LightenText"
import DiagnosticoSection from "./components/DiagnosticoSection"
import Faqs from "./components/faqs"
import NavBar from "./components/navbar/NavBar"
import ClipBottomButton from "./components/button/clipTopButton"
import { Michroma, Russo_One } from 'next/font/google';

const russoOne = Russo_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const michroma = Michroma({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

gsap.registerPlugin(ScrollTrigger)

export default function Component() {
  const images = [
    '/images/elf-logo.svg',
    '/images/nami.svg',
    '/images/panjos_logo_2.png',
    '/images/elf-logo.svg',
    '/images/nami.svg',
    '/images/panjos_logo_2.png',
    '/images/elf-logo.svg',
    '/images/nami.svg',
    '/images/panjos_logo_2.png',
  ];

  useEffect(() => {
    const leftSection = document.getElementById("left-section")
    const letters = document.querySelectorAll(".letter")

    const isMobile = window.innerWidth < 768;

    gsap.fromTo(
      letters,
      {
        opacity: 0,
        filter: "blur(4px) brightness(2)",
      },
      {
        opacity: 1,
        filter: "blur(0px) brightness(1)",
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      }
    )

    if (leftSection) {
      ScrollTrigger.create({
        trigger: leftSection,
        start: "top top",
        end: isMobile ? "bottom+=120% top" : "bottom+=330% top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        markers: false,
        anticipatePin: 1,
      })
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  const services = [
    { title: "DIAGNÓSTICO COMPUTARIZADO", description: "Utilizamos equipos de última generación..." },
    { title: "MANTENIMIENTO PREVENTIVO", description: "Servicios completos de mantenimiento programado..." },
    { title: "REPARACIÓN DE MOTOR", description: "Especialistas en reparación y reconstrucción de motores..." },
    { title: "SISTEMA DE FRENOS", description: "Inspección, reparación y reemplazo de componentes..." },
    { title: "TRANSMISIÓN AUTOMÁTICA", description: "Diagnóstico y reparación especializada..." },
    { title: "SISTEMA ELÉCTRICO", description: "Reparación de alternadores, arrancadores, sistema de carga..." },
  ]

  return (
    <div className="min-h-screen bg-gray-700">
      <NavBar />

      <OffCanvas name={undefined} onShowChange={undefined} />
      <div className="relative flex flex-col md:flex-row pt-14">
        {/* Left Section */}
        <div
          
          className="w-1/3 bg-gray-700 h-screen flex flex-col justify-start z-0 relative"
        >
          <div id="left-section" className="py-8 px-4 z-0">
            <h1
              className={`leading-tight text-4xl md:text-5xl font-bold text-white text-start space-y-2 pt-10`}
              style={{
                fontFamily: 'Arimo',
                lineHeight: "1",
              }}
            >
              {["MECÁNICA", "AUTOMOTRIZ"].map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </h1>
            <h1
              className={`${russoOne.className} leading-tight text-4xl md:text-5xl font-bold text-white text-start space-y-2 pt-2`}
              style={{
                lineHeight: "1",
              }}
            >
              {["AUTODIAGNÓSTICO", "PANJOS"].map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </h1>

            {/* <p className="text-gray-900 text-sm lg:text-base leading-relaxed pt-8 pr-24">
              Somos especialistas en mecánica automotriz con más de 15 años de experiencia
              servicio de electrónica automotriz: diagnóstico electrónico, reparación de arranques y
              alternadores, carga de aire acondicionado y mantenimiento de sistemas eléctricos.
              Nuestro compromiso es ofrecer transparencia, rapidez y garantía en cada trabajo.
              Contáctenos hoy para agendar su servicio y déjenos cuidar de su vehículo con
              la misma pasión y profesionalismo que nos respalda desde nuestros inicios.
            </p> */}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[100%] md:w-2/3 ml-0 md:ml-auto z-1 relative">
          {/* Hero Image */}
          <div className="h-screen relative">
            <DynamicFrameLayout />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Who We Are */}
          <section id="who-we-are" className="bg-white p-8 lg:p-12 h-[calc(screen + 600px)]">
            <h2 className={`${michroma.className} font-display text-4xl md:text-5xl font-extrabold text-gray-900 mb-61`}>¿Quiénes Somos?</h2>
            <span className={`${michroma.className} block text-xl font-normal text-gray-600 ml-4 mt-2 mb-4`} >¿Quem somos?</span>
            <div className="space-y-4 font-display">
              <p className={`text-lg leading-relaxed`}>
                Tenemos mas de una decada de experiencia en el mercado, en autodiagnostico panjos somos un taller familiar,
                brindamos un servicio de confianza y alta calidad para automotores de todas las marcas y modelos. Nuestros
                expertos utilizan tecnología de punta para detectar fallas y optimizar el rendimiento de su vehículo con
                inyección electrónica. Atención especializada y garantía en cada reparación.
              </p>
              <span className="block text-lg font-normal text-gray-600 bg-gray-100 border-l border-gray-500 ml-4 p-4 mt-2 mb-4">
                Temos mais de uma década de experiência no mercado. Na Autodiagnóstico Panjos, somos uma oficina familiar
                que oferece um serviço confiável e de alta qualidade para automóveis de todas as marcas e modelos. Nossos
                especialistas utilizam tecnologia de ponta para detectar falhas e otimizar o desempenho do seu veículo
                com injeção eletrônica. Oferecemos atendimento especializado e garantia em cada reparo.
              </span>
              <p className="text-lg leading-relaxed">
                Contamos con un equipo de mecánicos altamente capacitado en mantenimiento y reparación integral de vehículos:
                cambio de aceite y filtro, revisión de frenos, alineación y balanceo. Nuestro taller en Montevideo garantiza
                calidad, rapidez y transparencia en cada servicio, para que disfrute siempre de un auto seguro y confiable.
              </p>
              <span className="block text-lg font-normal text-gray-600 bg-gray-100 border-l border-gray-500 ml-4 p-4 mt-2 mb-4">
                Contamos com uma equipe de mecânicos altamente capacitada em manutenção e reparo integral de veículos,
                incluindo: troca de óleo e filtro, revisão de freios, alinhamento e balanceamento. Nossa oficina em Montevidéu
                garante qualidade, rapidez e transparência em cada serviço, para que você desfrute sempre de um carro seguro e confiável.
              </span>
              <p className="text-lg leading-relaxed">
                La confianza de nuestros clientes es nuestro mayor activo, ofrecemos atención rápida y personalizada. Ubicados en Palermo,
                Montevideo. 
              </p>
              <span className="block text-lg font-normal text-gray-600 bg-gray-100 border-l border-gray-500 ml-4 p-4 mt-2 mb-4">
                A confiança de nossos clientes é o nosso maior ativo, e por isso oferecemos atendimento rápido e personalizado. Estamos
                localizados no Palermo, Montevidéu.
              </span>
            </div>
            <div className={`${michroma.className} flex justify-center mt-8 p-4 mx-[30%]`} >
              <ClipBottomButton>
                Consultenos
              </ClipBottomButton> 
            </div>
          </section>

        </div>
      </div>
          {/* Text light effect */}
          <LightenText />
          
          {/* Diagnostico para tu automovil */}
          <DiagnosticoSection />
          

          {/* Services */}
          <ActivitiesSection />

          <LogoSlider logos={images} />

          <Faqs />

          <div className="z-[-10]">
            <Footer />
          </div>
    </div>
  )
}
