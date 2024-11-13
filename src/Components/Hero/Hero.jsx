import React from 'react'
import "./Hero.css"
import hero_image from "../../assets/hero_image.png"
import hero_back from "../../assets/hero_image_back.png"
import brand1 from "../../assets/brand1.png"
import brand2 from "../../assets/brand2.png"
import brand3 from "../../assets/brand3.png"
import brand4 from "../../assets/brand4.png"
import brand5 from "../../assets/brand5.png"
import brand6 from "../../assets/brand6.png"
import brand7 from "../../assets/brand7.png"

import { motion } from "framer-motion"
import Header from '../Header/Header'
import { Link } from "react-scroll";

const Hero = () => {
  const transition = { duration: 3, type: "spring" };
  const mobile = window.innerWidth<=768? true:false;
  return (
    <div className="hero" id='home'>
      <div className="blur hero-blur"></div>

      <Header/>
      <div className="left-h">
        {/* the best ad */}
        <div className="the-best">
          <div className="best-point"></div>
          <span>SERVICIOS DE MECANICA MULTIMARCA</span>
        </div>
        {/* Hero text */}
        <div className="hero-text">
          <div className='hero-title'>
            <div className="title-container">
              <span className='stroke-text-animated title-one'>
                MECANICA
              </span>
              <span className='title-two stroke-text-animated'>
                AUTOMOTRIZ
              </span>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem', fontSize: '1.1rem', fontWeight: 'lighter' }}>
              <span>
                servicio y reparacion para autos de todas las marcas
              </span>
            </div>
          <div>
            <span className="stroke-text text-animated ">PANJOS</span>
          </div>
          </div>
        </div>

        {/* experience figures 
        <div className="figures">
          <div>
            <span>
              <NumberCounter end={140} start={100} delay={4} preFix="+" />
            </span>
            <span>expert coaches</span>
          </div>
          <div>
            <span>
              <NumberCounter end={978} start={878} delay={4} preFix="+" />
            </span>
            <span>Members joined</span>
          </div>
          <div>
            <span>
              <NumberCounter end={50} delay={2} preFix="+" />
            </span>
            <span>fitness programs</span>
          </div>
        </div>
 */}
      <div style={{ width: '80%' }}>
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
      </div>

      {/* Right Side */}
      <div className="right-h">

        {/* heart rate */}
          <motion.div
            initial={{ right: "-2rem" }}
            whileInView={{ right: "4rem" }}
            transition={transition}
            className="heart-rate"
          >
            <img src={brand2} alt="" />
            <img src={brand3} alt="" />
            <img src={brand1} alt="" />
          </motion.div>

        {/* hero images */}
        <img className="hero-img" src={hero_image} alt="" />
        <motion.img
            initial={{right: mobile? "11rem": '11rem' }}
          whileInView={{ right: "20rem" }}
          transition={transition}
          className="hero-back"
          src={hero_back}
          alt=""
        />

        {/* calories */}
        <motion.div
          initial={{ right: "32rem" }}
          whileInView={{ right: "28rem" }}
          transition={transition}
          className="calories"
        >
          <img src={brand4} alt="" />
          <img src={brand5} alt="" />
          <img src={brand6} alt="" />
          <img src={brand7} alt="" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
