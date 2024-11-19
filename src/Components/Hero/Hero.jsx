import React from 'react'
import "./Hero.css"
import hero_image from "../../assets/hero_image.png"
import hero_back from "../../assets/hero_image_back.png"

import { motion } from "framer-motion"
import { Link } from "react-scroll";

const Hero = () => {
  const transition = { duration: 3, type: "spring" };
  const mobile = window.innerWidth<=768? true:false;
  return (
    <div className="hero" id='home'>
      <div className="blur hero-blur"></div>

      <div className="left-h">

        <div className="the-best">
          <div className="best-point"></div>
          <span>SERVICIOS DE MECÁNICA MULTIMARCA</span>
        </div>

        <div className='hero-title'>
          <span className='stroke-text-animated title-one'>
            MECÁNICA
          </span>
          <span className='title-two stroke-text-animated'>
            AUTOMOTRIZ
          </span>
        </div>

        <div className='hero-subtitle'>
          <span>
            Servicio y reparación para autos de todas las marcas
          </span>
        </div>

        <div className="hero-name">
          <span className="stroke-text text-animated ">PANJOS</span>
        </div>
    
        <div className="hero-btn">
          <Link
            to="encuentranos"
            spy={true}
            smooth={true}
          >
            Encuentranos!
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="right-h">



        {/* hero images */}
        <img className="hero-img" src={hero_image} alt="" />
        <motion.img
          initial={{right: mobile? "11rem": '11rem' }}
          whileInView={{ right: "17rem" }}
          transition={transition}
          className="hero-back"
          src={hero_back}
          alt=""
        />

      </div>
    </div>
  );
};

export default Hero;
