import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import './Homewhatwedo.css';
import Typewriter from 'typewriter-effect';

const Homewhatwedo = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleScroll = () => {
      const element = document.getElementById('homwwhatwedo');
      const rect = element.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      const isElementInView = !(rect.bottom < 0 || rect.top - viewHeight >= 0);

      setIsVisible(isElementInView);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <section id='homwwhatwedo' className="bg-[#26282b] w-11/12 mx-auto rounded-md m-4 p-4" data-aos="fade-up" style={{width:'85vw'}}>
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
          <div className="md:ml-12 text-center md:text-left" id='lefttextabout'>
            {/* {isVisible && (
              <Typewriter
                options={{
                  strings: ['What we do'],
                  autoStart: true,
                  loop: false,
                }}
              />
            )} */}
            <h2 className="text-3xl font-bold mt-4 md:mt-0 text-white" style={{ fontSize: '40px' }}>What we 
              <span style={{color:'gold'}}> do</span>
            </h2>
            <p
              id='whatwedotext'
              className="mt-2 text-white"
              style={{
                position: 'relative',
                right: '10px',
                fontSize:'15px',
                fontWeight:'400'
              }}
            >
At QubicGen, we specialize in powering businesses through digital transformation with our comprehensive suite of software services. From automating processes with RPA, crafting bespoke web solutions, and implementing robust SAP systems to fortifying cyber security, managing databases, and driving digital marketing strategies, we cover all bases. Our expertise extends into digitalization, data analytics, rigorous testing, strategic outsourcing, and insightful business consulting to navigate today’s challenges and unlock tomorrow’s opportunities. Partnering with us means choosing a future where technology fuels growth, efficiency, and innovation.                </p>
            </div>
            <br />

            
            <div id="carouselExampleFade1" className="carousel slide carousel-fade" data-bs-ride="carousel">
              <div className="carousel-inner" style={{ height: '200px', width: '300px', borderRadius:'30px' }}>
                <div className="carousel-item active" data-bs-interval="2000">
                  <Link to="/rpa">
                    <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1709804355/QubicGen/Home%20Page/What%20We%20Do/robotic-arm-rpa-hologram_klywdu_qaw6xz_1_1_1_1_1_2_lictuk.jpg" className="d-block w-100" alt="..." />
                  </Link>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <Link to="/digitalization">
                    <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1709804544/QubicGen/Home%20Page/What%20We%20Do/26761825_2111.i101.015.F.m004.c9.digital_transformation_digitization_isometric_jttcar_n7620j_1_1_1_e0ttdw.jpg" className="d-block w-100" alt="..." />
                  </Link>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <Link to="/sap">
                    <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1709804755/QubicGen/Home%20Page/What%20We%20Do/998_sap_etuzdj_m4s30u_2_1_1_jwwv9o.jpg" className="d-block w-100" alt="..." />
                  </Link>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <Link to="/cybersecurity">
                    <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1709804890/QubicGen/Home%20Page/What%20We%20Do/3d-internet-secuirty-badge_lhwfci_s4vubk_1_1_1_1_1_fpktfg.jpg" className="d-block w-100" alt="..." />
                  </Link>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade1" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade1" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  export default Homewhatwedo;
