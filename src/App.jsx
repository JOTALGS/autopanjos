import './App.css';
import Hero from './Components/Hero/Hero';
import Servicios from './Components/Servicios/Servicios';
import Nosotros from './Components/Nosotros/Nosotros';
import Footer from './Components/Footer/Footer';
import Contacto from './Components/Contacto/Contacto';
import Contact from './Components/Contact/Contact';
import Encuentranos from './Components/Encuentranos/Encuentranos';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Hero/>
      <Servicios/>
      <Nosotros/>
      <Encuentranos/>
      <Contacto/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
