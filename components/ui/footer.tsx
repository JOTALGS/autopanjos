import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { Box, Button, TextField, Typography } from '@mui/material';
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

const Footer: React.FC = () => {
  const rightSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (rightSectionRef.current) {
      gsap.fromTo(
        rightSectionRef.current,
        { y: -400, opacity: 1, zIndex: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightSectionRef.current,
            start: '20% bottom', // When the bottom of the page reaches the top of the right section
            end: 'bottom bottom', // When scroll reaches the very bottom of the page
            scrub: 4,
          },
        }
      );
    }
  }, []);

  return (
    <footer className="flex flex-col md:flex-row w-ful bg-gray-800 text-white pb-4">
      {/* Left Section */}
      <div className="w-full md:w-2/3 h-[100vh] p-6 flex flex-col justify-start bg-gray-900">
        <div className={`${michroma.className} h-[50%]`} >
          <h2 className={`${michroma.className} text-lg font-semibold mb-2 mt-6`} >Dirección y Horarios</h2>
          <p className="mb-2">📍 Isla de Flores 1691, Palermo Montevideo</p>
          <p className="mb-4">🕒 Lunes a Viernes: 8:30 AM – 12.30 PM | 14:00 AM – 18.30 PM</p>
          <div className="w-full h-64">
            {/* Replace with your actual map embed link */}
            <iframe
              title="Ubicación en mapa"
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <div className='min-h-[50%] flex items-center justify-center'>
          <div>
            <Image src="/images/sava.png" alt="Logo" width={400} height={400} />
          </div>
          <div className={`flex flex-col items-start justify-center px-2 md:px-8 relative py-8 mr-2 md:mr-12`}>
            <h1 className={`${russoOne.className} text-xl lg:text-4xl xl:text-6xl font-bold uppercase`}>Autodiagnóstico</h1>
            <h1 className={`${russoOne.className} text-xl lg:text-4xl xl:text-6xl font-bold uppercase`}>Panjos</h1>
            
            {/* Half-width border */}
            <div className="absolute bottom-0 left-1/3 transform -translate-x-1/2 w-1/2 h-px bg-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div
        ref={rightSectionRef}
        className="w-full md:w-1/3 bg-gray-700 h-auto md:h-screen flex flex-col justify-start"
      >
        <div id="right-section" className="py-6 px-4">
            <h1
              className={`leading-tight font-bold text-4xl md:text-5xl text-white text-start space-y-2 pt-10`}
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
              className={`${russoOne.className} leading-tight font-bold text-4xl md:text-5xl text-white text-start space-y-2 pt-2`}
              style={{
                lineHeight: "1",
              }}
            >
              {["AUTODIAGNÓSTICO", "PANJOS"].map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </h1>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ maxWidth: 500, mx: 'auto', marginTop: '10px' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 3,
                }}
              >
                <span  className={`${michroma.className}`} style={{ fontSize: '16px' }}>
                  Dejanos tu consulta y nos comunicaremos contigo
                </span>
                <span  className={`${michroma.className}`} style={{ color: '#B0B0B0', fontSize: '12px' }}>
                  *Campos Requeridos
                </span>
              </Box>

              {[
                {
                  name: 'firstName',
                  label: 'Primer Nombre*',
                  placeholder: 'Ingresa tu primer nombre',
                  type: 'text',
                },
                {
                  name: 'lastName',
                  label: 'Apellido*',
                  placeholder: 'Ingresa tu apellido',
                  type: 'text',
                },
                {
                  name: 'email',
                  label: 'E‑mail*',
                  placeholder: 'Ingresa tu dirección de mail',
                  type: 'email',
                },
                {
                  name: 'phone',
                  label: 'Número de celular (Opcional)',
                  placeholder: 'Ingresa tu número de celular',
                  type: 'tel',
                },
              ].map((field) => (
                <TextField
                  key={field.name}
                  fullWidth
                  variant="standard"
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      color: '#B0B0B0',
                      '&.Mui-focused': {
                        color: '#cf2929ff',
                        fontWeight: 'bold',
                      }
                    },
                  }}
                  InputProps={{
                    disableUnderline: false,
                    sx: { color: '#ffffff' },
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiInput-underline:before': { borderBottomColor: '#555555' },
                    '&:hover .MuiInput-underline:before': { borderBottomColor: '#ccc1c1ff' },
                    '& .MuiInput-underline:after': { borderBottomColor: '#991B1B' },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#B0B0B0',
                      opacity: 1,
                    },
                  }}
                />
              ))}

              <TextField
                fullWidth
                variant="standard"
                label="Mensaje/Aspiraciones*"
                placeholder="Escribí un mensaje…"
                multiline
                rows={3}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: '#B0B0B0',
                    '&.Mui-focused': {
                      color: '#cf2929ff',
                      fontWeight: 'bold',
                    }
                  },
                }}
                InputProps={{
                  disableUnderline: false,
                  sx: { color: '#fff' },
                }}
                sx={{
                  mb: 4,
                  '& .MuiInput-underline:before': { borderBottomColor: '#555' },
                  '&:hover .MuiInput-underline:before': { borderBottomColor: '#ccc1c1ff' },
                  '& .MuiInput-underline:after': { borderBottomColor: '#991B1B' },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#B0B0B0',
                    opacity: 1,
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#F5F5F5',
                  color: '#000',
                  borderRadius: '4px',
                  textTransform: 'none',
                  py: 1.5,
                  width: '70%',
                  display: 'flex',
                  alignSelf: 'center',
                  justifySelf: 'center',
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#cca7a7ff' },
                }}
              >
                <span className={`${michroma.className}`}>
                  Enviar tu Consulta Ahora
                </span>
              </Button>
            </Box>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
