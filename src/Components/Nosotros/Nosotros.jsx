import React from "react";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import nb from '../../assets/nb.png';
import adidas from '../../assets/adidas.png'
import nike from '../../assets/nike.png'
import tick from "../../assets/tick.png";
import "./Nosotros.css";
const Nosotros = () => {
  return (
    <div className="Reasons" id='reasons'>
      <div className="left-r">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
        <img src={image3} alt="" />
        <img src={image4} alt="" />
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
