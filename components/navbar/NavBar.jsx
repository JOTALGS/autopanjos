import React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, useMediaQuery } from "@mui/material";
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


export default function NavBar() {
  const [timeParts, setTimeParts] = useState({ 
    hour: "00", 
    minute: "00", 
    second: "00", 
    period: "MVD" 
  });
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("INICIO");
  const isMobile = useMediaQuery('(max-width:900px)');
  
  const navRef = useRef(null);
  const [underline, setUnderline] = useState({ width: 0, left: 0 });
  
  const menuLinks = [
    { name: "Inicio", path: "/" },
    { name: "Clínica", path: "/clinica" },
    { name: "Procedimientos", path: "/procedimientos" },
    { name: "Resultados", path: "/resultados" },
  ];

  // Reloj en tiempo real con segundos
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("es-UY", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/Montevideo",
      });
      const [hour, minute, second] = timeString.split(":");
      setTimeParts({ hour, minute, second, period: "MVD" });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Detectar sección actual basada en scroll
  useEffect(() => {
    // Define los puntos de cambio (en píxeles desde el top)
    const sectionThresholds = [
      { name: "INICIO", threshold: 0 },
      { name: "NOSOTROS", threshold: 900 },
      { name: "DIAGNOSTICO", threshold: 2000 },
      { name: "SERVICIOS", threshold: 3100 },
      { name: "FAQ", threshold: 4300 },
      { name: "FOOTER", threshold: 4900 }
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Encontrar la sección actual basada en los umbrales
      let current = "INICIO";
      for (let i = sectionThresholds.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionThresholds[i].threshold) {
          current = sectionThresholds[i].name;
          break;
        }
      }
      
      setCurrentSection(current);
    };

    // Agregar listener de scroll
    window.addEventListener("scroll", handleScroll);
    
    // Ejecutar al montar para establecer el valor inicial
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detección de fondo mejorada
  useEffect(() => {
    const detectBackground = () => {
      // Crear un elemento temporal para detectar el color de fondo
      const tempElement = document.createElement('div');
      tempElement.style.position = 'fixed';
      tempElement.style.top = '20px';
      tempElement.style.left = '50%';
      tempElement.style.width = '1px';
      tempElement.style.height = '1px';
      tempElement.style.pointerEvents = 'none';
      tempElement.style.zIndex = '-1';
      
      document.body.appendChild(tempElement);
      
      const computedStyle = window.getComputedStyle(tempElement);
      const bgColor = computedStyle.backgroundColor;
      
      // Analizar si el fondo es oscuro o claro
      const rgb = bgColor.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        setIsDarkBackground(brightness < 128);
      } else {
        // Fallback: detectar por scroll o tiempo
        setIsDarkBackground(window.scrollY > 200);
      }
      
      document.body.removeChild(tempElement);
    };

    // Detectar cambios en scroll
    const handleScroll = () => {
      detectBackground();
    };

    window.addEventListener('scroll', handleScroll);
    detectBackground(); // Ejecutar al montar

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    zIndex: 50,
    width: '100%',
    backgroundColor: 'transparent',
    mixBlendMode: 'difference',
    color: 'white'
  };

  return (
    <header style={navbarStyle} ref={navRef}>
      <Box component="nav" sx={{
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        alignItems: 'center',
        gap: '20px',
        paddingLeft: { xs: '20px', md: '70px'},
        paddingRight: { xs: '20px', md: '70px'},
        paddingTop: '12px',
        paddingBottom: '12px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '400', // Poppins Medium
        fontSize: '18px',
        lineHeight: '17.28px',
        letterSpacing: '-0.54px'
      }}>
        
        {/* Logo - Columnas 1-2 */}
        <Box sx={{ 
          gridColumn: { xs: '1 / 3', md: '1 / 3'},
          display: 'flex',
          alignItems: 'center'
        }}>
            {/* Logo que cambia según el fondo */}
            <img 
              src={isDarkBackground ? "/images/logo.png" : "/images/panjos0.jpg"}
              alt="Guzmán Ripoll Logo" 
              style={{ 
                height: 'auto',
                width: 'auto',
                maxHeight: '40px'
              }}
            />
        </Box>

        {/* Hora - Alineada al inicio de Columna 4 */}
        <Box sx={{
          gridColumn: { xs: '6 / 10', md: '3 / 5' },
          display: 'flex',
          justifyContent: { xs: 'flex-center', md: 'flex-start' },
          alignItems: 'center',
          color: 'inherit'
        }}>
          <span className={`${michroma.className}`}>
            {`${timeParts.hour}:${timeParts.minute}:${timeParts.second} ${timeParts.period}`}
          </span>
        </Box>

        <div style={{
          gridColumn: '12 / 13',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <div className={`${michroma.className}`}style={{ position: 'relative' }}>
            {currentSection}
          </div>
        </div>
      </Box>
    </header>
  );
}