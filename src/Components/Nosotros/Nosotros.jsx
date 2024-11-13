import React from "react";
import nb from '../../assets/nb.png';
import adidas from '../../assets/adidas.png'
import nike from '../../assets/nike.png'
import tick from "../../assets/tick.png";
import "./Nosotros.css";
const Nosotros = () => {
  return (
    <div className="Reasons" id='reasons'>
      <div className="left-r">
        <img src="./images/panjos11.jpg" alt="" />
        <img src="./images/panjos5.jpg" alt="" />
        <img src="./images/panjos18.jpg" alt="" />
        <img src="./images/panjos15.jpg" alt="" />
      </div>
      <div className="right-r">
        <span>nosotros</span>
        <div>
          <span style={{fontFamily: 'Oswald', fontSize: '65px'}}>Quienes somos?</span>
        </div>
        <div className="details-r">
          <div>
            <img src={tick} alt="" />
            <span className="our-traits">tenemos +15 aÑos en el mercado</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span className="our-traits">somos un negocio de familia</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span className="our-traits">amantes de lo que hacemos</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span className="our-traits">garantizamos confianza</span>
          </div>
        </div>
        <span style={{color: "var(--gray)", fontWeight: "normal", lineHeight: "1.8"}}>
          en autodiagnostico panjos somos un taller familiar, brindamos un servicio de confianza y alta calidad para automotores de todas
          las marcas y modelos. Contamos con un eqipo de mecanicos que esta ampliamente capacitado
          para la reparacion especializada y mantenimiento de vehiculos con motores a inyeccion electronica
        </span>
        <div className="partners">
              <img src={nb} alt="" />
              <img src={adidas} alt="" />
              <img src={nike} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
