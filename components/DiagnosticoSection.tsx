"use client"

import { useEffect, useState, useRef, JSX } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
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

interface DiagnosticCard {
  id: number
  title: string
  description: string
  details: string
  features: string[]
}

export default function DiagnosticoSection(): JSX.Element {
  const [selectedCard, setSelectedCard] = useState<DiagnosticCard | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const diagnosticCards: DiagnosticCard[] = [
    {
      id: 1,
      title: "Análisis Inicial",
      description: "Evaluación completa del estado actual",
      details: "Realizamos un análisis exhaustivo de tu situación actual, identificando áreas de mejora y oportunidades de crecimiento. Nuestro equipo de expertos evalúa cada aspecto relevante para proporcionar un diagnóstico preciso.",
      features: ["Evaluación 360°", "Identificación de KPIs", "Análisis de competencia", "Informe detallado"]
    },
    {
      id: 2,
      title: "Estrategia Personalizada",
      description: "Plan de acción adaptado a tus necesidades",
      details: "Desarrollamos una estrategia única basada en los resultados del análisis inicial. Cada plan está diseñado específicamente para alcanzar tus objetivos de manera eficiente.",
      features: ["Plan a medida", "Objetivos SMART", "Cronograma detallado", "Métricas de seguimiento"]
    },
    {
      id: 3,
      title: "Implementación",
      description: "Ejecución paso a paso del plan",
      details: "Ponemos en marcha la estrategia con un enfoque sistemático y organizado. Nuestro equipo te acompaña en cada etapa del proceso de implementación.",
      features: ["Soporte continuo", "Ajustes en tiempo real", "Gestión de recursos", "Control de calidad"]
    },
    {
      id: 4,
      title: "Monitoreo Continuo",
      description: "Seguimiento y optimización constante",
      details: "Supervisamos constantemente el progreso y realizamos ajustes necesarios para garantizar el éxito. La mejora continua es parte fundamental de nuestro proceso.",
      features: ["Dashboard en vivo", "Reportes semanales", "Alertas automáticas", "Optimización continua"]
    },
    {
      id: 5,
      title: "Resultados Medibles",
      description: "Análisis de impacto y ROI",
      details: "Medimos y documentamos los resultados obtenidos, proporcionando informes claros sobre el retorno de inversión y el impacto de las acciones implementadas.",
      features: ["ROI detallado", "Comparativas", "Proyecciones futuras", "Casos de éxito"]
    },
    {
      id: 6,
      title: "Soporte Premium",
      description: "Asistencia dedicada 24/7",
      details: "Accede a nuestro equipo de soporte premium disponible en todo momento. Resolvemos tus dudas y te ayudamos a superar cualquier desafío.",
      features: ["Soporte 24/7", "Equipo dedicado", "Respuesta prioritaria", "Consultoría incluida"]
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation directly tied to scroll
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          {
            opacity: 0,
            y: -50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 90%",
              end: "top 50%",
              scrub: true,
            }
          }
        )
      }

      // Cards animation directly tied to scroll progress
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Direct scroll-tied animation for each card
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 120,
              rotationY: -45,
              scale: 0.7,
              transformPerspective: 1000
            },
            {
              opacity: 1,
              y: 0,
              rotationY: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                end: "top 50%",
                scrub: true, // Animation moves EXACTLY with scroll
                onUpdate: (self) => {
                  // Icon parallax that moves with scroll progress
                  const icon = card.querySelector('.floating-icon')
                  if (icon) {
                    gsap.set(icon, {
                      y: -15 * self.progress,
                      rotation: 10 * self.progress
                    })
                  }
                }
              }
            }
          )

          // Hover animations (separate from scroll)
          let hoverAnimation: gsap.core.Tween | null = null
          
          const handleMouseEnter = () => {
            if (hoverAnimation) hoverAnimation.kill()
            hoverAnimation = gsap.to(card, {
              scale: 1.05,
              y: -5,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto"
            })
          }

          const handleMouseLeave = () => {
            if (hoverAnimation) hoverAnimation.kill()
            hoverAnimation = gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto"
            })
          }

          card.addEventListener('mouseenter', handleMouseEnter)
          card.addEventListener('mouseleave', handleMouseLeave)

          // Cleanup
          return () => {
            card.removeEventListener('mouseenter', handleMouseEnter)
            card.removeEventListener('mouseleave', handleMouseLeave)
            if (hoverAnimation) hoverAnimation.kill()
          }
        }
      })

      // Continuous parallax for background decorations
      const decorations = document.querySelectorAll('.bg-decoration')
      decorations.forEach((decoration, index) => {
        gsap.to(decoration, {
          y: index % 2 === 0 ? -100 : 100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
          }
        })
      })

      // Overall section fade-in
      if (containerRef.current) {
        gsap.fromTo(containerRef.current,
          {
            opacity: 0.3
          },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1
            }
          }
        )
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const openModal = (card: DiagnosticCard): void => {
    setSelectedCard(card)
    setIsModalOpen(true)
    
    // Wait for next tick to ensure modal is rendered
    setTimeout(() => {
      gsap.fromTo(".modal-content",
        {
          scale: 0.8,
          opacity: 0,
          rotationX: -15
        },
        {
          scale: 1,
          opacity: 1,
          rotationX: 0,
          duration: 0.4,
          ease: "back.out(1.7)"
        }
      )
    }, 0)
  }

  const closeModal = (): void => {
    gsap.to(".modal-content", {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsModalOpen(false)
        setSelectedCard(null)
      }
    })
  }

  const handleModalBackdropClick = (): void => {
    closeModal()
  }

  const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
  }

  return (
    <div ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-[#5d7581] to-[#4a5f6a] pt-4 pb-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <AnimatedBackground />
      
      {/* Background decoration with parallax */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="bg-decoration absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="bg-decoration absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="bg-decoration absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-white/3 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className={`${russoOne.className} uppercase text-center mb-12 `}>
          <h2 className="text-5xl md:text-6xl font-thin text-white mt-2 mb-4 tracking-wide">
            Diagnóstico
          </h2>
          <div className="w-24 h-0.5 bg-white/30 mx-auto" />
          <p className="mt-4 text-white/70 text-lg font-light max-w-2xl mx-auto">
            Descubre nuestro proceso integral para transformar tu visión en resultados tangibles
          </p>
        </div>

        {/* Cards Grid - No gap, seamless grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {diagnosticCards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              onClick={() => openModal(card)}
              className="group relative bg-red-500/20 backdrop-blur-sm border border-red-500/40 p-8 cursor-pointer transition-all duration-300 hover:bg-white/50 hover:border-white/30 hover:shadow-2xl hover:z-10"
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Card content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-light text-white mb-3">{card.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{card.description}</p>
                
                {/* Action indicator */}
                <div className="mt-6 flex items-center text-white/40 group-hover:text-white/70 transition-colors">
                  <span className="text-sm">Ver más</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Card number */}
              <div className="absolute top-4 right-4 text-white/10 text-6xl font-thin">
                {String(card.id).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedCard && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleModalBackdropClick}
        >
          <div 
            className="modal-content bg-gradient-to-br from-[#5d7581] to-[#4a5f6a] rounded-3xl p-8 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
            onClick={handleModalContentClick}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-5xl mb-4">{selectedCard.icon}</div>
                <h3 className="text-3xl font-light text-white">{selectedCard.title}</h3>
              </div>
              <button 
                onClick={closeModal}
                className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                type="button"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6">
              <p className="text-white/80 leading-relaxed text-lg font-light">
                {selectedCard.details}
              </p>

              {/* Features */}
              <div>
                <h4 className="text-white text-xl font-light mb-4">Características principales</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCard.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                      <span className="text-white/70 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button 
                className="mt-8 w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white py-4 px-8 rounded-xl transition-all duration-300 font-light text-lg hover:shadow-lg"
                type="button"
              >
                Comenzar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 50%",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          const blurValue = 4 * (1 - progress);
          container.style.filter = `blur(${blurValue}px)`;

          const scaleValue = 1 + (0.2 * progress);
          gsap.set(image, { scaleX: scaleValue });
        }
      }
    });

    tl.fromTo(image,
      { x: -200, },
      { 
        x: 200,
        y: 200,
        ease: "none", 
        duration: 1, 
        scrollTrigger: {
          trigger: container,
          start: "top 50%",
          end: "bottom top",
          scrub: 1,
        }
      }
    )

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 bg-black z-0"
      style={{ filter: 'blur(4px)' }}
    >
      <Image 
        ref={imageRef}
        src="/images/PANJOS_RED.png" 
        alt="Background gradient" 
        className="p-4" 
        layout="fill" 
        objectFit="cover" 
        priority 
      />
    </div>
  );
};
