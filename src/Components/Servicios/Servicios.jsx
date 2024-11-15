import React, { useEffect, useRef } from 'react';
import './Servicios.css';
import { programsData } from '../../data/programsData';
import { useScroll } from 'framer-motion';
import { useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Servicios = () => {
  const { scrollYProgress } = useScroll(); // Hook to track scroll progress
  const containerRef = useRef(null);
  const titleRef = useRef(null);


  useEffect(() => {
    const title = titleRef.current;
  
      // Animation for regular categories
      gsap.to(title, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: title,
          start: "top 1%",
          end: "+=1800",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      
      const container = containerRef.current;
      const categories = gsap.utils.toArray(".category");
      gsap.to(container, {
        scrollTrigger: {
          trigger: container,
          start: "top 10%",
          end: "+=2000",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      categories.forEach((category, index) => {

        if (index === 0) {
          gsap.to(category, {
            scale: 0.85,
            y: -0,
            zIndex: 0,
            ease: "none",
            scrollTrigger: {
              trigger: category,
              start: "20% center",
              end: "+=500",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        } else if (index === 1) {
          gsap.to(category, {
            scale: 0.85,
            y: -400,
            zIndex: 0,
            ease: "none",
            scrollTrigger: {
              trigger: category,
              start: "30% center",
              end: "+=500",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        } else if (index === 2) {
          gsap.to(category, {
            scale: 0.85,
            y: -800,
            zIndex: 0,
            ease: "none",
            scrollTrigger: {
              trigger: category,
              start: "20% center",
              end: "+=500",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        } else if (index === 3) {
          gsap.to(category, {
            scale: 0.85,
            y: -1200,
            zIndex: 0,
            ease: "none",
            scrollTrigger: {
              trigger: category,
              start: "20% center",
              end: "+=500",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        } else if (index === 4) {
          gsap.to(category, {
            scale: 0.85,
            y: -1600,
            zIndex: 0,
            ease: "none",
            scrollTrigger: {
              trigger: category,
              start: "10% center",
              end: "+=500",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

      });

    return () => {
      ScrollTrigger.kill(); // Clean up on component unmount
    };
  }, [programsData]);

  return (
    <div className={`Servicios`} id="servicios">
      <div className={`programs-header`} ref={titleRef}>
        <span className="stroke-text">Conoce algunos</span>
        <span className="animated-service-title">Servicios</span>
        <span className="stroke-text">que ofrecemos</span>
      </div>
      <div className="programs-categories" ref={containerRef}>
        {programsData.map((program, index) => (
          <div
            key={index}
            className={`category`}
          >
            {program.image}
            <span>{program.heading}</span>
            <div>{program.details}</div>

            {/* Join Now button */}
            <div className="pictures">
              {program.picture1}
              {program.picture2}
            </div>
            <div className="join-now">

              <span>{program.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicios;
