import React from "react";
import "./Encuentranos.css";
import { motion } from "framer-motion";
const Encuentranos = () => {

  const transition = { type: "spring", duration: 1 };
  return (
    <div className="testimonials" id="encuentranos">
      <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={transition}
          className="left-t"
        >
        <span>Encuentranos</span>
        <span className="stroke-text">Donde nos</span>
        <span>puedes encontrar?</span>
        <span>Encuentra nuestro taller ubicado a algunas cuadras de la intendecia de Montevideo</span>
        <span>
          <span style={{ color: "var(--orange)" }}>
            Montevideo
          </span>{" "}
          - Palermo{" "}
          - Isla de Flores
        </span>
      </motion.div>
      
      <div className="right-t">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          transition={{ ...transition, duration: 2 }}
          whileInView={{ opacity: 1, x: 0 }}
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          transition={{ ...transition, duration: 2 }}
          whileInView={{ opacity: 1, x: 0 }}
        ></motion.div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.8423467422595!2d-56.181081223566366!3d-34.91040567284596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f81d742d7e469%3A0xaabf6ac907637dc3!2sAutodiagn%C3%B3stico%20PANJOS!5e0!3m2!1ses!2suy!4v1729793444609!5m2!1ses!2suy"
          width="600"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map"
        >
        </iframe>

      </div>
    </div>
  );
};

export default Encuentranos;
