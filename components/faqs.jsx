'use client';

import { useState } from "react";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const preguntas = [
    "¿Que marcas y modelos de vehículos atienden?",
    "¿Tienen servicio de remolque o auxilio mecánico?",
    "¿Qué idioma se habla?",
    "Moneda y cambio",
  ];

  const respuestas = [
    "Atendemos todos los vehiculos con motor a inyeccion electrónica",
    "De momento no contamos con remolque",
    "Español, inglés y Portugues",
    "Aceptamos distintas divisas y monedas, verifique con nuestro equipo de ventas",
  ];

  return (
    <section className="bg-[#991B1B] text-white py-16 z-10">
      <div className="px-10">
        <h2 className="mb-6 leading-tight mx-4 md:mx-0">
          <span className="block text-[#6995b8ff] text-3xl md:text-5xl font-bold">Preguntas Frecuentes</span>
        </h2>

        {preguntas.map((pregunta, index) => (
          <div key={index} className=" mx-4 md:mx-0 z-10">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left py-4 flex justify-between items-center border-b border-[#6995b8ff] hover:opacity-90 cursor-pointer"
            >
              <span className="font-medium">{pregunta}</span>
              <span className="text-lg">{openIndex === index ? "−" : "+"}</span>
            </button>

            <div className={`overflow-hidden transition-all duration-250 ${openIndex === index ? 'max-h-[600px] py-4' : 'max-h-0'}`}>
              <div className="text-sm text-white/90">
                {respuestas[index]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
