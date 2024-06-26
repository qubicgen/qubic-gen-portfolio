import React, { useEffect, useRef, useState } from 'react'
import './Cybersecurity.css'
import 'aos/dist/aos.css';
import { Link } from 'react-scroll';
import Queries from '../Industries Components/Banking Components/Queries';


const Cybersecuritylist = () => {
  const overviewRef = useRef(null);
  const serveRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const queriesRef = useRef(null);

  const [isNavFixed, setIsNavFixed] = useState(false);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // This is for rpa offering cards
  const [Cyberoffers, setCyberoffers] = useState([
    {
      title: 'Vulnerability Assessment and Penetration Testing (VAPT) ',
      description: 'Identifying weaknesses and vulnerabilities in networks, systems and applications through assessments and conducting controlled attacks to test their security posture.'
    },
    {
      title: 'Security Information and Event Management (SIEM) ',
      description: 'Implementing SIEM solutions to collect, analyze and correlate security events and logs from various sources to detect and respond to security incidents in real-time.'
    },
    {
      title: 'Intrusion Detection and Prevention Systems (IDPS)',
      description: 'Deploying IDPS solutions to monitor network traffic and detect and block malicious activities, including unauthorized access, malware infections and insider threats.'
    },
    {
      title: 'Firewall Management',
      description: 'Managing and configuring firewall devices to enforce access controls, filter network traffic and protect against unauthorized access and cyber-attacks.'
    },
    {
      title: 'Identity and Access Management (IAM) ',
      description: 'Implementing IAM solutions to manage user identities, roles and permissions, enforce access controls and ensure that only authorized users have access to resources and data.'
    },

  ]);

  const [CyberSecurityServices, setCyberSecurityServices] = useState([

    {
      title: 'Finance and Insurance',
      description: 'Cyber security in finance and insurance involves protecting sensitive financial data by implementing robust encryption, access controls and fraud detection mechanisms to safeguard against cyber attacks targeting financial transactions and personal information.',
      background: "https://res.cloudinary.com/defsu5bfc/image/upload/v1709796658/QubicGen/Cyber%20Security/Who%20We%20Serve/unrecognizable-businessman-pointing-printed-chart-showing-graph-colleagues-professional-content-partners-making-notes-statistics-cooperation-communication-partnership-concept_74855-14267_lunmdz.jpg"
    },

    {
      title: 'Healthcare',
      description: 'In healthcare, cyber security focuses on protecting electronic health records (EHRs), medical devices and patient confidentiality. This entails implementing strong authentication measures, encryption protocols and intrusion detection systems to prevent data breaches and ensure compliance with regulations like HIPAA.',
      background: "https://res.cloudinary.com/defsu5bfc/image/upload/v1710070221/QubicGen/Cyber%20Security/Who%20We%20Serve/medical-banner-with-stethoscope_23-2149611199_xwaslj.jpg"
    },
    {
      title: 'Energy and Utilities',
      description: 'Cyber security in the energy sector is crucial for safeguarding critical infrastructure by deploying advanced threat detection technologies, segmenting networks and conducting regular security assessments to mitigate the risk of cyber attacks.',
      background: "https://res.cloudinary.com/defsu5bfc/image/upload/v1709796885/QubicGen/Cyber%20Security/Who%20We%20Serve/aerial-shot-two-power-plant-sunset-vilnius_181624-15104_vtk9cp.jpg"
    },
    {
      title: 'Government',
      description: 'Encompasses protecting sensitive government data, citizen information and national security interests from cyber threats. This includes establishing robust perimeter defenses, monitoring for suspicious activity and collaborating with intelligence agencies to identify and neutralize cyber threats targeting government networks and systems.',
      background: "https://res.cloudinary.com/defsu5bfc/image/upload/v1709796752/QubicGen/Cyber%20Security/Who%20We%20Serve/national-museum-history-romania_1268-14722_oqutul.jpg"
    },
    {
      title: 'Retail',
      description: 'Involves safeguarding customer payment data, online shopping platforms and supply chain networks from cyber attacks. This requires implementing secure payment processing systems, conducting regular vulnerability assessments.',
      background: "https://res.cloudinary.com/defsu5bfc/image/upload/v1709796968/QubicGen/Cyber%20Security/Who%20We%20Serve/abundance-healthy-food-choices-supermarket-aisle-generated-by-ai_188544-42447_z9m7jx.jpg"
    },
    {
      title: 'Manufacturing',
      description: 'Focuses on protecting industrial control systems (ICS), production networks and intellectual property from cyber threats. This includes implementing network segmentation, endpoint protection and intrusion detection systems to prevent unauthorized access and ensure the integrity of manufacturing processes and product designs.',
      background: "https://res.cloudinary.com/defsu5bfc/image/upload/v1709797002/QubicGen/Cyber%20Security/Who%20We%20Serve/factory-workshop-interior-machines-glass-production-background_645730-396_x5leks.jpg"
    },  {
      title: 'Cold Chain Management',
      background: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1709705177/QubicGen/Transportation/role-logistics-globalised-5g-tecnology-concept_250469-9921_dhmyzy.jpg',
      description: 'Implementation of cold chain management solutions to monitor and maintain temperature-sensitive goods throughout the transportation and storage process, ensuring compliance with temperature requirements and quality standards.'
  } 

  ]);

  // This is for rpa offering cards




  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsNavFixed(scrollPosition > 600);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);





  return (


    <>

      {/* This is rpalist starts */}

      <div className="banking-main-list" >
      <nav style={{ position: isNavFixed ? 'fixed' : 'relative', top: isNavFixed ? 70 : 0, zIndex: 1, width: '98vw', backgroundColor: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(20px)" }}>
<Link className='hover:cursor-pointer' to="overview" spy={true} smooth={true} offset={-150} duration={200}><li>Overview</li></Link>
<Link className='hover:cursor-pointer' to="whoweserve" spy={true} smooth={true} offset={-150} duration={200}><li>Service Offerings</li></Link>
<Link className='hover:cursor-pointer' to="serviceofferings" spy={true} smooth={true} offset={-180} duration={200}><li>Who We serve</li></Link>
<Link className='hover:cursor-pointer' to="querie" spy={true} smooth={true} offset={-200} duration={200}><li>Queries</li></Link>
</nav>

      </div>
      <hr />

      <div id='overview'>

      </div>

      <div className="container" style={{ color: 'white', marginTop: '50px' }} data-aos="fade-up"  >
        <h1 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bolder', color: 'white' }}  > Overview</h1>




        <div className="row featurette" bis_skin_checked="1" style={{ marginTop: '100px' }}  >

          <div className="col-md-7" bis_skin_checked="1">
            <h1 className="featurette-heading fw-normal lh-1" style={{ fontSize: '40px', padding: '20px', fontWeight: 'bolder' }}>Defend Your Digital Domain: Expert Cyber Security Solutions for Total Protection</h1>
            <p className="lead" id='leadtext'>In a world where digital threats loom large, our cyber security services stand as your shield against unseen dangers. We offer comprehensive solutions tailored to safeguard your digital assets, ensuring peace of mind in an ever-evolving cyber landscape. From threat detection to incident response, trust us to fortify your defenses and keep your organization secure.</p>
          </div>
          <div className="col-md-5" bis_skin_checked="1">
            <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1709112147/QubicGen/Cyber%20Security/Overview/online-security-dark-background-3d-illustration_qgwvz8.jpg" alt="" />
          </div>
        </div>
      </div>

      {/* This is rpalist ends */}

      <div id='whoweserve'>

      </div>



      <div style={{ color: 'white', marginLeft: '40px', marginTop: '130px' }} data-aos="fade-up"  >

        <h1 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bolder' }}> Service Offerings</h1>

        <div className="container" style={{ marginTop: '100px' }}>

          <div className="row" >
            {
              Cyberoffers.map((item) => {
                return (
                  <div className="col" >
                    <div className="card" id='offeringscards' style={{ height: '14rem', width: '18rem', color: 'white' }}>
                      <div className="card-body">
                        <h5 className="card-title" style={{ fontSize: '20px' }}>{item.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{item.subtitle}</h6>
                        <p className="card-text" style={{ fontSize: '13px' }}>{item.description}</p>

                      </div>
                    </div>
                    <br />
                  </div>
                )
              })
            }


          </div>
          <br />

        </div>
      </div>






      {/* This is rpa offering start */}



      {/* This is who we server starts */}
      <div id='serviceofferings'>

      </div>

 

      <h1 className='text-white' style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bolder' }}> Who We Serve</h1>


      <div className="grid grid-flow-row auto-rows-max ml-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-24 ">
              {CyberSecurityServices.map((serve) => {
              return (
                <div className="col">
                  {/* Card component */}
                  <div className="card">
                    <div className="card-inner">
                      {/* Front of the card with background image and overlay */}
                      <div className="card-front" style={{ background: `url('${serve.background}') center/cover` }}>
                        <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div>
                        <p style={{ fontWeight: 'bolder', color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{serve.title}</p>
                      </div>
                      {/* Back of the card with additional information */}
                      <div className="card-back" style={{ backgroundColor: '#2f2f2f', color: '#000', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ fontSize: '12px' }}>{serve.description}</p>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              );
            })}
</div>

      {/* This is who we server ends */}
      <div className="queries" id='querie' style={{ marginTop: '50px' }}>
        <Queries />
      </div>






    </>
  )
}

export default Cybersecuritylist