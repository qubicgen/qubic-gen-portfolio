import React, { useEffect, useRef } from 'react'
import "./Contact.css"
import Navbar from '../HomeComponents/Navbar'
import Footer from '../HomeComponents/Footer'
import Typewriter from 'typewriter-effect';
import AOS from 'aos';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import SEO from '../SEO';



const Contact = () => {
  const containeroneRef = useRef(null);
  const mobileCodeInputRef1 = useRef(null); // Ref for first input field
  const mobileCodeInputRef2 = useRef(null); //
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");

    sign_up_btn.addEventListener("click", () => {
      containeroneRef.current.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      containeroneRef.current.classList.remove("sign-up-mode");
    });
  }, []);

  useEffect(() => {
    const input1 = document.querySelector("#mobile_code1");
    const iti1 = intlTelInput(input1, {
      initialCountry: "in",
      separateDialCode: true
    });
    mobileCodeInputRef1.current = iti1;

    const input2 = document.querySelector("#mobile_code2");
    const iti2 = intlTelInput(input2, {
      initialCountry: "in",
      separateDialCode: true
    });
    mobileCodeInputRef2.current = iti2;

    return () => {
      // Clean up the plugin when the component unmounts
      iti1.destroy();
      iti2.destroy();
    };
  }, []); 

  return (
    <>
      <SEO
        title="QubiGen - Contact Us"
        description="Connect with QubiGen and get in touch with our team. Learn how you can reach out to us for inquiries, collaborations, and partnerships. We are here to support your business needs."
        type="website"
        name="QubiGen Contact"
        image="https://example.com/contact-og-image.jpg"
        url="https://www.qubicgen.com/contact"
        keywords="QubiGen, Contact Us, inquiries, collaborations, partnerships, support"
      />

      <Navbar />
      <div className="boxy" data-aos="fade-right">
        <div className="containerone" ref={containeroneRef}>
          <div className="forms-container">
            <div className="signin-signup">

              <form action="#" className="sign-in-form">


                <h2 className="text-3xl font-bold mt-4 md:mt-0 text-white" id='wearequbic' style={{ fontSize: '40px' }}>
                  <Typewriter
                    options={{
                      autoStart: true,
                      loop: true,

                      delay: 2,
                      strings: ['Project<span class="text-[#ffd700]"> Form</span>'],
                      onComplete: (self) => {
                        const textElement = self.el;
                        const html = textElement.innerHTML;
                        textElement.innerHTML = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                      },
                    }}
                  />
                </h2>
                <div className="input-field">
                  <i className="fas fa-user" />
                  <input type="text" placeholder="Enter Full Name" />
                </div>

                <div className="input-field">
                  <i className="fas fa-envelope" />
                  <input type="email" placeholder="Email" />
                </div>
                <div className="form-group">
        <input
          type="text"
          id="mobile_code1"
          className="input-field form-control"
          placeholder="Phone Number"
          name="name"
          ref={mobileCodeInputRef1}
        />
      </div>
                <div className="input-field">
                  <i className="fas fa-user" />
                  <input type="text" placeholder="Job title" />
                </div>
                <div className="input-field">
                  <i className="fas fa-building" />
                  <input type="text" placeholder="Enter Company" />
                </div>
                <div className="input-field" style={{ height: '20vh' }}>
                  <i className="fas fa-address-book" style={{ position: 'relative', top: '20px' }} />
                  <input type="text" placeholder="Enter Comments" />
                </div>




                <button className="btn-53" style={{ marginTop: '20px' }}>
                  <div className="original">SUBMIT</div>
                  <div className="letters">

                    <span>S</span>
                    <span>U</span>
                    <span>B</span>
                    <span>M</span>
                    <span>I</span>
                    <span>T</span>
                  </div>
                </button>

              </form>


              <form action="#" className="sign-up-form">
                <h2 className="text-3xl font-bold mt-4 md:mt-0 text-white" id='wearequbic' style={{ fontSize: '40px' }}>
                  <Typewriter
                    options={{
                      autoStart: true,
                      loop: true,

                      delay: 2,
                      strings: ['Student<span class="text-[#ffd700]"> Form</span>'],
                      onComplete: (self) => {
                        const textElement = self.el;
                        const html = textElement.innerHTML;
                        textElement.innerHTML = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                      },
                    }}
                  />
                </h2>            <div className="input-field">
                  <i className="fas fa-user" />
                  <input type="text" placeholder="Enter Full Name" />
                </div>


                <div className="form-group">
        <input
          type="text"
          id="mobile_code2"
          className="input-field form-control"
          placeholder="Phone Number"
          name="name"
          ref={mobileCodeInputRef2}
        />
      </div>


                <div className="input-field">
                  <i className="fas fa-envelope" />
                  <input type="email" placeholder="Enter email" />
                </div>
                <div className="input-field">
                  <i className="fas fa-caret-down" />
                  <select name="year" id="year" style={{ color: 'black' }}>
                    <option value="select">Select a Course</option>
                    <option value="rpa">RPA</option>
                    <option value="year2">Web Development</option>
                    <option value="year2">SAP</option>
                    <option value="year2">Testing</option>
                    
                    {/* Add more options as needed */}
                  </select>
                </div>

                <div className="input-field" style={{ height: '20vh' }}>
                  <i className="fas fa-mobile" style={{ position: 'relative', top: '20px', border: 'none' }} />
                  <input type="text" placeholder="Enter Message" />
                </div>

                <button className="btn-53" style={{ marginTop: '10px' }}>
                  <div className="original" >Submit</div>
                  <div className="letters">

                    <span>S</span>
                    <span>U</span>
                    <span>B</span>
                    <span>M</span>
                    <span>I</span>
                    <span>T</span>
                  </div>
                </button>



              </form>



            </div>
          </div>





          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content" id='lookingproject'>
              <h3 style={{ fontSize: '45px' }}>Want to Learn Skills?</h3>

                <button className="btnone" id="sign-up-btn" style={{ width: '170px', position: 'relative', left: '76px', height: '50px', marginTop: '30px' }}>
                  Student Form
                </button>


              </div>
            </div>
            <div className="panel right-panel" style={{ position: 'relative', left: '-150px' }}>
              <div className="content" id='studentskill'>
                <h3 style={{ fontSize: '45px' }} id=''>Looking for Project ?</h3>


                <button className="btnone" id="sign-in-btn" style={{ width: '170px', position: 'relative', left: '140px', height: '50px' }}>
                  Project Form
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>

  )
}

export default Contact