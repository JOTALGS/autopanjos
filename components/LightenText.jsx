import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typography } from "@mui/material";
import { Michroma } from 'next/font/google';

const michroma = Michroma({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

gsap.registerPlugin(ScrollTrigger);

const LightenText = () => {
  const lineWrapperRef = useRef([]);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  // Text content and splitting logic
  const homeText = `
    Servicio especializado con tecnología de punta y
    atención certificada para mantener tu vehículo en su máximo rendimiento.
  `;
  
  const splitText = (text, parts) => {
    const words = text.split(' ');
    const partLength = Math.ceil(words.length / parts);
    const result = [];
    
    for (let i = 0; i < parts; i++) {
      const start = i * partLength;
      const end = start + partLength;
      result.push(words.slice(start, end).join(' '));
    }
    
    return result;
  };

  const textParts = splitText(homeText, 3);

  useLayoutEffect(() => {
    const wrappers = lineWrapperRef.current;
    
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Create a timeline for sequential animations
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 50%",
        scrub: 1,
        markers: false,
        id: "text-reveal-timeline"
      }
    });
    
    wrappers.forEach((wrapper, index) => {
      if (!wrapper) return;
      
      const overlay = wrapper.querySelector(".line-overlay");
      
      // Set initial state
      gsap.set(overlay, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
      });
      
      // Add to timeline with staggered delay
      timelineRef.current.to(overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none",
        duration: 1
      }, index * 0.3); // 0.3 second delay between each line
    });
    
    // Cleanup function
    return () => {
      timelineRef.current?.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center p-4 bg-[#ffffff]">
      <div className="flex items-center justify-center about-intro max-w-4xl w-full min-w-[95vw] mx-4">
        <div>
          {textParts.map((part, index) => (
            <div 
              key={`line-${index}`}
              ref={el => lineWrapperRef.current[index] = el}
              className={`text-center line-wrapper relative mb-2 ${index === 0 ? '' : ''}`}
            >
              {/* Base text (dark) */}
              <Typography 
                variant="p"
                fontWeight={"bold"}
                fontSize={{xs: "20px", sm: "30px", md: "40px", lg: "50px"}}
                className={`${michroma.className} text-display line`} 
                style={{ color: "#e9e9e9" }}
              >
                {part}
              </Typography>
              
              {/* Overlay text (light) */}
              <Typography 
                variant="p"
                fontWeight={"bold"}
                fontSize={{xs: "20px", sm: "30px", md: "40px", lg: "50px"}}
                className={`${michroma.className} text-display line-overlay absolute top-0 left-0 w-full`}
                style={{ color: "#000", clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
              >
                {part}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LightenText;