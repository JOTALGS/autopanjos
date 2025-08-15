import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Box, 
  Link,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

// Importar la fuente Suisse Intl Medium
import { createGlobalStyle } from 'styled-components';

// Componente para importar la fuente globalmente
const GlobalFontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Suisse Intl Medium';
    src: url('fonnts.com-Suisse_Intl_Medium.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

// Import components
import SequentialGlitchText from './SequentialGlitchText';
// Ya no necesitamos importar SmoothGlowingTitle ya que usaremos una imagen
// import SmoothGlowingTitle from './SmoothGlowingTitle';
import UruguayTime from './UruguayTime';
import { 
  InfoButton, 
  OverlayBackdrop, 
  CloseButton 
} from './StyledComponents';
import MapComponent from './MapComponent';

const OffCanvas = ({ name, onShowChange, ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [open, setOpen] = useState(false);
  const [mouseInsideCanvas, setMouseInsideCanvas] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorCloseRef = useRef(null);
  
  // Estados para el cursor personalizado
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const handleOpen = () => {
    setOpen(true);
    if (onShowChange) onShowChange(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onShowChange) onShowChange(false);
    // Reset state for next opening
    setTimeout(() => setCanvasReady(false), 500);
  };

  const handleOverlayClick = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      handleClose();
    }
  };

  // GSAP effect for custom drawer animation
  useEffect(() => {
    if (!drawerRef.current) return;

    if (open) {
      // Important: set canvasReady to true immediately on desktop
      // to ensure title displays correctly
      if (!isMobile) {
        setCanvasReady(true);
      }
      
      gsap.to(drawerRef.current, { 
        x: 0, 
        duration: 0.5, 
        ease: 'power2.out',
        onComplete: () => {
          // On mobile, set canvasReady after animation
          if (isMobile) {
            setCanvasReady(true);
          }
        }
      });
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 1, visibility: 'visible', duration: 0.5 });
      }
    } else {
      gsap.to(drawerRef.current, { 
        x: '100%', 
        duration: 0.5, 
        ease: 'power2.in', 
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { visibility: 'hidden' });
          }
        }
      });
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.5 });
      }
    }
  }, [open, isMobile]);

  // Efecto para manejar el cursor personalizado
  useEffect(() => {
    if (isMobile || isTablet || !open) return;

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.dataset.cursorText) {
        setCursorText(target.dataset.cursorText);
      } else if (target.closest('[data-cursor-hover]')) {
        const hoverElement = target.closest('[data-cursor-hover]');
        setCursorText(hoverElement.dataset.cursorHover || '');
      }
    };

    const handleMouseLeave = () => {
      setCursorText('');
    };

    // Add event listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor-hover], [data-cursor-text]'
    );

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Esconder el cursor nativo
    if (drawerRef.current) {
      drawerRef.current.style.cursor = 'none';
      const elements = drawerRef.current.querySelectorAll('*');
      elements.forEach(element => {
        element.style.cursor = 'none';
      });
    }
    document.body.style.cursor = 'none';
    
    return () => {
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [isMobile, isTablet, open]);

  const handleMouseEnterCanvas = () => {
    setMouseInsideCanvas(true);
  };
  
  const handleMouseLeaveCanvas = () => {
    setMouseInsideCanvas(false);
  };
  
  const handleCursorClick = () => {
    if (!mouseInsideCanvas) handleClose();
  };
  
  // Calculate responsive dimensions
  const drawerWidth = isMobile ? '100%' : isTablet ? '90%' : '800px';
  
  // Estilo común para todos los textos que NO son "ENZO CIMILLO"
  const suisseTextStyle = {
    fontFamily: "'Suisse Intl Medium', sans-serif"
  };
  
  return (
    <>
      {/* Importar la fuente globalmente */}
      <GlobalFontStyle />
      
      <InfoButton
        onClick={handleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          position: 'fixed',
          right: '1%',
          bottom: '2%',
          zIndex: 9999,
          backgroundColor: isHovered ? 'white' : 'transparent',
          color: '#ff6200',
          boxShadow: isHovered ? '0 0 8px #ff0000' : 'none',
          fontFamily: "sans-serif"
        }}
      >
        i
      </InfoButton>

      {open && (
        <OverlayBackdrop 
          ref={overlayRef} 
          onClick={handleOverlayClick}
        >
          <Box 
            ref={drawerRef}
            onMouseEnter={handleMouseEnterCanvas}
            onMouseLeave={handleMouseLeaveCanvas}
            sx={{ 
              width: drawerWidth,
              height: '100%',
              bgcolor: '#0033e5',
              color: 'white',
              padding: isMobile ? '14px 24px 14px 14px' : isTablet ? '18px 26px 18px 18px' : '22px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transform: 'translateX(100%)',
              overflowY: 'auto', // Allow scrolling on small screens
              overflowX: 'hidden',
              cursor: 'none', // Hide default cursor in the drawer
              '& *': { 
                cursor: 'none !important', // Force cursor:none on all child elements
                fontFamily: "'Suisse Intl Medium', sans-serif" // Aplicar fuente globalmente
              }
            }}
          >
            {/* Close button for mobile/tablet */}
            {(isMobile || isTablet) && (
              <CloseButton isMobile={isMobile} onClick={handleClose}>
                ✖
              </CloseButton>
            )}
            
            <Box sx={{ 
              position: 'relative', // Changed from absolute to relative for better mobile layout
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              pt: { xs: '12px', sm: '16px', md: '8px' }, // menos espacio arriba
              pb: { xs: '12px', sm: '12px', md: '12px' }, // mantengo bottom
              marginBottom: isMobile ? '2.5rem' : '0.5rem'
            }}>
              {/* 
                IMAGEN DEL TÍTULO ENZO CIMILLO
                
                AJUSTES DE TAMAÑO:
                - Modifica width para cambiar el ancho de la imagen
                - Los valores actuales son: 
                  * Móvil: 80% del ancho del contenedor
                  * Tablet: 70% del ancho del contenedor
                  * Desktop: 60% del ancho del contenedor o 450px máximo
                
                - Para un tamaño fijo en todas las pantallas, reemplaza el objeto por un valor único, ejemplo:
                  width: '400px'
                
                - Para control preciso por breakpoint, usa:
                  width: { xs: '280px', sm: '350px', md: '400px', lg: '450px' }
                
                - También puedes ajustar maxHeight si es necesario
              */}
              <Typography sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '75px' }, fontWeight: 'bold', fontFamily: "'Suisse Intl Medium', sans-serif" }}>AUTODIAGNOSTICO PANJOS</Typography>
            </Box>
            
            {/* Content sections with improved responsiveness */}
            <Box sx={{ 
              position: { xs: 'relative', md: 'absolute' },
              top: { md: '18rem' },
              left: '12px', 
              right: '12px', 
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }, 
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              marginBottom: { xs: '2.5rem', md: 0 } 
            }}>
              <Box sx={{ 
                width: { xs: '100%', sm: '12rem' },
                marginBottom: { xs: '1.2rem', sm: 0 },
                marginRight: { sm: '2.5rem' },
                paddingRight: { xs: '10px', sm: 0 } // Padding adicional en móvil
              }}>
                <SequentialGlitchText 
                  text="DIRECCION" 
                  fontWeight="bold" 
                  fontSize={{ xs: '0.8rem', sm: '0.95rem' }}
                  initialGlitch={canvasReady}
                  style={suisseTextStyle} // Aplicar la fuente Suisse
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <SequentialGlitchText 
                  text="Encuentra nuestro taller cerca tuyo, ubicado a algunas cuadras de la intendecia de Montevideo"
                  fontSize={{ xs: '0.95rem', sm: '1.1rem' }}
                  lineHeight={{ xs: '1.25rem', sm: '1.35rem' }}
                  fontWeight="500"
                  style={{ ...suisseTextStyle, marginBottom: '1.2rem' }} // Aplicar la fuente Suisse
                  initialGlitch={canvasReady}
                />
                <SequentialGlitchText 
                  text="MONTEVIDEO - PALERMO - ISLA DE FLORES" 
                  fontWeight="bold" 
                  fontSize={{ xs: '0.8rem', sm: '0.95rem' }}
                  initialGlitch={canvasReady}
                  style={suisseTextStyle} // Aplicar la fuente Suisse
                />
              </Box>
            </Box>
            
            <Box sx={{ 
              position: { xs: 'relative', md: 'absolute' },
              top: { md: '26rem' },
              left: '12px', 
              right: '12px', 
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }, 
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              marginBottom: { xs: '2.5rem', md: 0 } 
            }}>
              <Box sx={{ 
                width: { xs: '100%', sm: '12rem' },
                marginBottom: { xs: '1.2rem', sm: 0 },
                marginRight: { sm: '2.5rem' }
              }}>
                <SequentialGlitchText 
                  text="MAPA" 
                  fontWeight="bold" 
                  fontSize={{ xs: '0.8rem', sm: '0.95rem' }}
                  initialGlitch={canvasReady}
                  style={suisseTextStyle} // Aplicar la fuente Suisse
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <MapComponent />
              </Box>
            </Box>
            
            <Box sx={{ 
              position: { xs: 'relative', md: 'absolute' },
              bottom: { md: '6rem' }, // Lo subo un poco
              left: '12px', 
              right: '12px', 
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }, 
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              marginBottom: { xs: '2.5rem', md: 0 },
              mt: { xs: '3rem', md: 0 } // espacio extra en móvil
            }}>
              <Box sx={{ 
                width: { xs: '100%', sm: '12rem' },
                marginBottom: { xs: '1.2rem', sm: 0 },
                marginRight: { sm: '2.5rem' }
              }}>
                <SequentialGlitchText 
                  text="CONTACTO" 
                  fontWeight="bold" 
                  fontSize={{ xs: '0.8rem', sm: '0.95rem' }}
                  initialGlitch={canvasReady}
                  style={suisseTextStyle} // Aplicar la fuente Suisse
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <SequentialGlitchText 
                  text="MAÑANA: 8:30 a 12.30 TARDE: 14:00 a 18.30"
                  fontSize={{ xs: '0.95rem', sm: '1.1rem' }}
                  lineHeight={{ xs: '1.25rem', sm: '1.45rem' }}
                  fontWeight="500"
                  style={{ ...suisseTextStyle, marginBottom: '1rem' }} // Aplicar la fuente Suisse
                  initialGlitch={canvasReady}
                />
                  <Box sx={{ 
                    display: 'flex', 
                    gap: '1rem',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexWrap: 'wrap',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word'
                  }}>
                    <Link 
                      href="mailto:autopanjos@vera.com.uy" 
                      onMouseEnter={() => {
                        const el = document.getElementById('email-underline');
                        if (el) {
                          gsap.killTweensOf(el);
                          gsap.fromTo(el, 
                            { width: "0%", left: "0%", right: "auto" }, 
                            { width: "100%", duration: 0.35, ease: "power2.inOut" }
                          )
                        }
                      }}
                      onMouseLeave={() => {
                        const el = document.getElementById('email-underline');
                        if (el) {
                          gsap.killTweensOf(el);
                          gsap.to(el, {
                            left: "auto",
                            right: "0%",
                            width: "0%",
                            duration: 0.35,
                            ease: "power2.inOut",
                          });
                        }
                      }}
                      sx={{ 
                        fontSize: { xs: '0.95rem', sm: '1.1rem' }, 
                        textDecoration: 'underline', 
                        color: '#000000', 
                        fontWeight: '500',
                        fontFamily: "'Suisse Intl Medium', sans-serif", // Aplicar la fuente Suisse
                        textShadow: '0 0 2px #000000, 0 0 4px #000000, 0 0 6px #000000',
                        transition: 'text-shadow 0.3s ease, color 0.3s ease',
                        '&:hover': {
                          color: '#000000',
                          textDecoration: 'none',
                          textShadow: '0 0 4px #000000, 0 0 8px #000000, 0 0 12px #000000, 0 0 16px #000000'
                        }
                      }}
                    >
                    <Box position="relative" display="inline-block">
                        EMAIL
                      <Box
                        id="email-underline"
                        sx={{
                          position: 'absolute',
                          bottom: '-2px',
                          left: 0,
                          height: '2px',
                          width: '0%',
                          backgroundColor: '#000000',
                          boxShadow: '0 0 4px #000000, 0 0 8px #000000',
                        }}
                        />
                    </Box>
                  </Link>
                  
                  <Link 
                    href="https://www.facebook.com/autopanjos" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onMouseEnter={() => {
                      const el = document.getElementById('instagram-underline');
                      if (el) {
                        gsap.killTweensOf(el);
                        gsap.fromTo(el, 
                          { width: "0%", left: "0%", right: "auto" }, 
                          { width: "100%", duration: 0.35, ease: "power2.inOut" }
                        )
                      }
                    }}
                    onMouseLeave={() => {
                      const el = document.getElementById('instagram-underline');
                      if (el) {
                        gsap.killTweensOf(el);
                        gsap.to(el, {
                          left: "auto",
                          right: "0%",
                          width: "0%",
                          duration: 0.35,
                          ease: "power2.inOut",
                        });
                      }
                    }}
                    sx={{ 
                      fontSize: { xs: '0.95rem', sm: '1.1rem' }, 
                      textDecoration: 'underline', 
                      color: '#000000', 
                      fontWeight: '500',
                      fontFamily: "'Suisse Intl Medium', sans-serif", // Aplicar la fuente Suisse
                      textShadow: '0 0 2px #000000, 0 0 4px #000000, 0 0 6px #000000',
                      transition: 'text-shadow 0.3s ease, color 0.3s ease',
                      '&:hover': {
                        color: '#000000',
                        textDecoration: 'none',
                        textShadow: '0 0 4px #000000, 0 0 8px #000000, 0 0 12px #000000, 0 0 16px #000000'
                      }
                    }}
                  >
                    <Box position="relative" display="inline-block">
                        FACEBOOK
                      <Box
                        id="instagram-underline"
                        sx={{
                          position: 'absolute',
                          bottom: '-2px',
                          left: 0,
                          height: '2px',
                          width: '0%',
                          backgroundColor: '#000000',
                          boxShadow: '0 0 4px #000000, 0 0 8px #000000',
                        }}
                        />
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ 
              position: { xs: 'relative', md: 'absolute' },
              bottom: { md: '3rem' },
              left: '12px', 
              right: '12px', 
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }, 
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              marginTop: { xs: '1.2rem', md: 0 }
            }}>
              <Box sx={{ 
                width: { xs: '100%', sm: '12rem' },
                marginBottom: { xs: '0.7rem', sm: 0 },
                marginRight: { sm: '2.5rem' }
              }}>
                <SequentialGlitchText 
                  text="HORA LOCAL" 
                  fontWeight="bold" 
                  fontSize={{ xs: '0.8rem', sm: '0.95rem' }}
                  initialGlitch={canvasReady}
                  style={suisseTextStyle} // Aplicar la fuente Suisse
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                {/* Asegúrate de modificar el componente UruguayTime para que use la fuente Suisse */}
                <UruguayTime fontFamily="'Suisse Intl Medium', sans-serif" fontSize={{ xs: '0.95rem', sm: '1.1rem' }} />
              </Box>
            </Box>
          </Box>
        </OverlayBackdrop>
      )}
      
      {/* Custom cursors - solo para desktop */}
      {!isMobile && !isTablet && open && (
        <>
          {/* Cursor X - solo visible FUERA del canvas */}
          <Box
            ref={cursorCloseRef}
            onClick={handleCursorClick}
            sx={{
              position: 'fixed',
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              fontFamily: "'Suisse Intl Medium', sans-serif", // Aplicar la fuente Suisse
              backgroundColor: 'black',
              color: 'white',
              border: '2px solid white',
              borderRadius: '0',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 10000,
              cursor: 'none',
              left: `${position.x}px`,
              top: `${position.y}px`,
              visibility: mouseInsideCanvas ? 'hidden' : 'visible',
            }}
          >
            ✖
          </Box>
          
          {/* Cursor circular - solo visible DENTRO del canvas */}
          <Box
            ref={cursorRef}
            className="cursor-dot bg-white mix-blend-difference"
            sx={{
              position: 'fixed',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'white',
              mixBlendMode: 'difference',
              pointerEvents: 'none',
              zIndex: 10000,
              transform: 'translate(-50%, -50%)',
              left: `${position.x}px`,
              top: `${position.y}px`,
              scale: mouseInsideCanvas ? (isClicking ? 0.8 : 2) : 0,
              transition: 'scale 0.3s ease',
              visibility: mouseInsideCanvas ? 'visible' : 'hidden',
            }}
          />
          
          {/* Texto del cursor cuando corresponda */}
          {cursorText && mouseInsideCanvas && (
            <Box
              sx={{
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y + 30}px`,
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: "'Suisse Intl Medium', sans-serif", // Aplicar la fuente Suisse
                pointerEvents: 'none',
                zIndex: 10001,
                padding: '2px 4px',
                opacity: 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              {cursorText}
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default OffCanvas;
