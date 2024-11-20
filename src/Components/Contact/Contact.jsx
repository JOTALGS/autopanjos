import React from 'react'
import './Contact.css'

const Contact = () => {

    function whatsapp(){
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var message = document.getElementById("message").value;
         
        var url = "https://wa.me/+59899334970?text="
        +"*Name :* "+name+"%0a"
        +"*Email :* "+email+"%0a"
        +"*Contact No :* "+phone+"%0a"
        +"*Message :* "+message;
         
        window.open(url,'_blank').focus();
        }

  return (
  <div className="container" id='contact'>
    <div className="screen">
      <div className="screen-header">
        <div className="screen-header-left">
          <div className="screen-header-button close"></div>
          <div className="screen-header-button maximize"></div>
          <div className="screen-header-button minimize"></div>
        </div>
        <div className="screen-header-right">
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
          <div className="screen-header-ellipsis"></div>
        </div>
      </div>
      <div className="screen-body">
        <div className="screen-body-item left">
          <div className="app-title">
            <span>CONTACTANOS</span>

          </div>
          <div className="app-contact">INFO DE CONTACTO : 2 410 33 02</div>
        </div>
        <div className="screen-body-item">
          <div className="app-form">
            <div className="app-form-group">
              <input className="app-form-control" autoComplete='true' placeholder="NOMBRE" id='name' />
            </div>
            <div className="app-form-group">
              <input className="app-form-control" autoComplete='on' placeholder="EMAIL" id='email'/>
            </div>
            <div className="app-form-group">
              <input className="app-form-control" placeholder="NUMERO CELULAR" id='phone'/>
            </div>
            <div className="app-form-group message">
              <input className="app-form-control" placeholder="DEJA TU MENSAJE" id='message'/>
            </div>
            <div className="app-form-group buttons">
              <button className="app-form-button" data-bs-dismiss="modal">CANCELAR</button>
              <button className="app-form-button" onClick={whatsapp}>ENVIAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  )
}

export default Contact