import React, { useState } from 'react';
import './Servicios.css';
import { programsData } from '../../data/programsData';
import RightArrow from '../../assets/rightArrow.png';
import { motion } from 'framer-motion';

const Servicios = () => {
  const [expandedProgram, setExpandedProgram] = useState(null);

  // Toggle between expanded and collapsed
  const handleClick = (index) => {
    console.log('expamded:', expandedProgram, index)
    if (expandedProgram === null || expandedProgram === index) {
      setExpandedProgram(expandedProgram === index ? null : index); // Expand or collapse
    }
  };

  // Total width for the non-expanded items when one is expanded
  const collapsedWidth = expandedProgram !== null ? (100 - 90) / (programsData.length - 1) + 'vw' : '15%';

  return (
    <div className="Servicios" id="servicios">
      <div className="programs-header">
        <span className="stroke-text">Conoce algunos</span>
        <span className="animated-service-title">Servicios</span>
        <span className="stroke-text">que ofrecemos</span>
      </div>
      <div className="programs-categories">
        {programsData.map((program, index) => (
          <motion.div
            key={index}
            className="category"
            initial={{ width: '15%' }} // Initial width
            animate={{ 
              width: expandedProgram === index 
                ? '90vw' // Expanded div takes 90vw
                : collapsedWidth  // Non-expanded divs share remaining space
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }} // Smooth transition
          >
            {program.image}
            <span>{program.heading}</span>
            <span>{program.details}</span>
            <div style={{ zIndex: '1000'}} className="join-now" onClick={() => handleClick(index)}>
              <span>{expandedProgram === index ? 'Menos' : 'Saber Mas'}</span>
              <motion.img
                src={RightArrow}
                alt="Right Arrow"
                initial={{ rotate: 0 }} // Initial rotation
                animate={{ rotate: expandedProgram === index ? 180 : 0 }} // Rotate 180 when expanded
                transition={{ duration: 0.5}} // Smooth rotation
              />
            </div>
            {expandedProgram === index && 
            <motion.div className="saber-mas"
                initial={{ opacity: 0 }} // Initial rotation
                animate={{ opacity: expandedProgram === index ? 1 : 0 }} // Rotate 180 when expanded
                transition={{ duration: 1.5}} // Smooth rotation
              >
              <h3 style={{ fontSize: '18px', fontWeight: 'bolder'}}>{program.subtitle}</h3>
              <span>{program.detail}</span>
            </motion.div>
            }
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Servicios;
