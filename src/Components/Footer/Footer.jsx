import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
    <section className="footer">
    <div className="Footer-container">
        <div className="box-container">
          <div className="box">
            <h3>Direccion</h3>
            <a href="googlemaplink">Isla de flores 1691. Esq. Magallanes</a>
            <a href="googlemaplink">Montevideo, Uruguay</a>
          </div>
        <div className="box">
            <h3>Contacto</h3>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div className="hero1">
                  <a href="tel:24103302"><i className="fa"> (2) 410 3302</i></a>  
                  <br></br>
                  <a href="mailto:autopanjos@adinet.com"><i className="fa"> autopanjos@adinet.com</i></a>
                </div>
            </div>
        <div className="box">
            <h3>Siguenos</h3>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
              />
              <div className="hero1">
                <div className="home__social-icon">
                  <a href="Facebook"><i className="fab fa-facebook-f"> Facebook</i></a>
                  <a href="Instagram"><i className="fab fa-instagram"> Instagram</i></a>
                  <a href="Whatsapp link"><i className="fab fa-whatsapp"> Whatsapp</i></a>
                  <a href="https://www.google.com/maps/"><i className="fab fa-google"> Google Maps</i></a>
                </div>
              </div>
        </div> 
      </div>
    </div>
      <div className="credits">
        <p>© 2012 Panjos. All Rights Reserved.</p>
      </div>
    </section>
    </>
  );
};

export default Footer;
