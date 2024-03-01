import React, { useEffect, useRef, useState } from 'react'
import './Web.css'
import 'aos/dist/aos.css';
import Queries from '../Rpa Components/Queries';


const Weblist = () => {
  const overviewRef = useRef(null);
  const serveRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const queriesRef = useRef(null);

  const [isNavFixed, setIsNavFixed] = useState(false);
  
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // This is for rpa offering cards
  const [Webofferings, setWebofferings] = useState([
    {
        title: 'Custom Website Development',
        description: 'Creating tailor-made websites from scratch based on client requirements, incorporating unique designs, features, and functionalities.'
    },
    {
        title: 'Full-Stack Development',
        description: 'Providing end-to-end development services encompassing both front-end and back-end development, along with database management and server configuration.'
    },
    {
        title: 'Content Management System (CMS) Development',
        description: 'Building websites using CMS platforms such as WordPress, Joomla, Drupal, or Magento, allowing clients to easily manage and update website content without requiring technical expertise.'
    },
    {
        title: 'E-commerce Development',
        description: 'Creating online stores and e-commerce platforms with features such as product catalogs, shopping carts, payment gateways, order management, and customer accounts using platforms like WooCommerce, Shopify, Magento, or custom solutions.'
    },
    {
        title: 'Responsive Web Design',
        description: 'Designing websites that are optimized for various devices and screen sizes, ensuring a consistent and seamless user experience across desktops, laptops, tablets, and smartphones.'
    },
    {
        title: 'Web Application Development',
        description: 'Developing dynamic and interactive web applications with advanced functionalities such as user authentication, real-time updates, APIs integration, and data processing using frameworks like React.js, Angular, Vue.js, or Ember.js.'
    },
    {
        title: 'Web Maintenance and Support',
        description: 'Providing ongoing maintenance, updates, and technical support services to ensure the security, performance, and reliability of websites, including bug fixes, security patches, and software upgrades.'
    },
    {
        title: 'Search Engine Optimization (SEO)',
        description: 'Optimizing websites for search engines to improve visibility, ranking, and organic traffic through techniques such as keyword optimization, content creation, link building, and site performance optimization.'
    },
    
]);

const[Webserve,setWebserve]=useState([

  {
  title:'HealthCare',
  description: 'Web development in healthcare includes patient portals, telemedicine platforms, and EHR systems for streamlined data management. It also encompasses HIE platforms, analytics dashboards, and medical education platforms for improved insights and learning experiences.',
  background: "https://img.freepik.com/free-photo/doctor-using-stretoscope-virtual-projection_651396-925.jpg?w=996&t=st=1709114310~exp=1709114910~hmac=fc2512f59b3913b7678fac53ff3201cfb06521acc5a1095df61d5b54616fb712"
  },
  
  {
  title: 'Finance',
  description: 'Web development in the finance industry drives digital innovation, offering applications like online banking, mobile payments, and trading platforms. It enhances security, user experience, and business efficiency by providing personalized financial services.',
  background: "https://img.freepik.com/free-photo/collage-finance-banner-concept_23-2150608824.jpg?w=360&t=st=1709114342~exp=1709114942~hmac=4a7159af6ae81f6d99da8fdaa8988b22e1337d1238e3a6ab04a83945a2068b28"
  },
  {
    title: 'Education',
    description: 'Web development in education drives transformative change, enabling seamless access to resources like online platforms, virtual classrooms, and learning analytics tools. It empowers educators with interactive tools by enhancing student engagement and experiential learning.',
    background: "https://img.freepik.com/free-vector/geometric-science-education-background-vector-gradient-blue-digital-remix_53876-125993.jpg?t=st=1709113950~exp=1709117550~hmac=03ac687e455c69f4f495870d45d6882c54c32a4ed2d61270b467016373aa74a8&w=996"
    },
  {
  title: 'Entertainment',
  description: 'Web development powers immersive experiences in entertainment, from streaming services to gaming platforms, enabling content delivery and user engagement. Leveraging HTML5, CSS3, and JavaScript, we create responsive websites for diverse audiences.',
  background: "https://img.freepik.com/free-photo/top-view-clapperboard-movie-elements_23-2147775695.jpg?w=1380&t=st=1709114409~exp=1709115009~hmac=d4a0ccbdc2fcaf52df040fe80f79b4c95b249131279578332376f8834f720dd7"
  },
  {
  title: 'Travel',
  description: 'Web development in the travel industry revolutionizes the way people plan, book, and experience trips. From online booking platforms to destination guides, we create user-friendly interfaces and integrate third-party services for seamless travel experiences. ',
  background: "https://img.freepik.com/free-photo/high-angle-travel-items-arrangement_23-2149617688.jpg?w=996&t=st=1709114437~exp=1709115037~hmac=cebffffe68699b6665437608ff0eb7102fa08db2576be2a971ad85ab07d9ab15"
  },
    
    ]);

  // This is for rpa offering cards




  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsNavFixed(scrollPosition >  600);
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
    <nav style={{ position: isNavFixed ? 'fixed' : 'relative', top: isNavFixed ? 70 : 0, zIndex: 1, width: '98vw',backgroundColor:"rgba(0, 0, 0, 0.9)",backdropFilter:"blur(20px)" }}>
          <li onClick={() => scrollToRef(overviewRef)}>Overview</li>  
          <li onClick={() => scrollToRef(serveRef)}>Our Offerings</li>
          <li onClick={() => scrollToRef(caseStudiesRef)}>Who we serve</li>
          <li onClick={() => scrollToRef(queriesRef)}>Queries</li>

          {/* <li onClick={() => scrollToRef(leadershipRef)}>Meet our leadership</li> */}
        </nav>
    </div>
    <hr />
    <br />
    <br />
    
    <div className="container"  style={{color:'white'}}  data-aos = "fade-up" ref={overviewRef }>

      
    <br />
      <br />
     
    <h1 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bolder' }}> Overview</h1>
      <br />
      <br />
      <br />
      <br />
    <div className="row featurette" bis_skin_checked="1"  >
   
      <div className="col-md-7" bis_skin_checked="1">
        <h1 className="featurette-heading fw-normal lh-1" style={{fontSize:'40px',padding:'20px',fontWeight:'bolder'}}>Building Dreams, One Pixel at a Time: Your Journey to Online Brilliance Begins Here</h1>
        <p className="lead" id='leadtext'>Our web development services are crafted to breathe life into your online vision, combining creativity with technical prowess to create stunning websites that captivate and inspire. From sleek and intuitive designs to robust functionality, we're here to transform your online presence and propel your business to new heights in the digital landscape.</p>
      </div>
      <div className="col-md-5" bis_skin_checked="1">
        <img src="https://img.freepik.com/free-photo/medium-shot-woman-working-laptop_23-2150323516.jpg?t=st=1709113693~exp=1709117293~hmac=80464deac02031535b1286984e04dbee49f8f0ded7438d3e837ab5398be06f05&w=996"  alt="" />
      </div>
    </div>
    </div>

{/* This is rpalist ends */}


   
{/* This is rpa offering start */}
<div style={{ color: 'white',marginLeft:'40px' }}  data-aos = "fade-up"  ref={serveRef} >
<br />
      <br />
      <br />
      <br />
      <br />
                    <h1 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bolder' }}> Our Offerings</h1>
      <br />
      <br />
      <br />
      <br />
                    <br />
                    <div className="container">
                        <div className="row" >
                            
                                {
                                    Webofferings.map((item) => {
                                        return (
                                        <div className="col" >
                                            <div className="card" id='offeringscards' style={{ height: '14rem', width: '18rem', backgroundColor: '#242424', color: 'white' }}>
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{fontSize:'20px'}}>{item.title}</h5>
                                                    <h6 className="card-subtitle mb-2 text-body-secondary">{item.subtitle}</h6>
                                                    <p className="card-text" style={{fontSize:'13px'}}>{item.description}</p>

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
{/* This is rpa offering ends */}


{/* This is who we server starts */}
<div style={{ color: 'white',marginLeft:'40px' }} ref={caseStudiesRef} data-aos = "zoom-in"  >
<br />
      <br />
      <br />
      <br />
                    <h1 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bolder' }} > Who we Serve</h1>
      <br />
      <br />
      <br />
                    <br />
                    <div className="container" >
                        <div className="row"  >
                            
                                {
                                    Webserve.map((serve) => {
                                        return (
                                        <div className="col md-3 mb-3" >
                                           <div className="card" >
  <div className="card-inner">
    <div className="card-front" style={{ background: `url('${serve.background}')`, backgroundPosition:'center',objectFit:'cover',opacity:'0.8' }}>
      <p style={{fontWeight:'bolder'}}>{serve.title}</p>
    </div>
    <div className="card-back">
      <p>{serve.description}</p>
    </div>
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

{/* This is who we server ends */}


     
<div className="queries" ref={queriesRef}>
  <Queries/>
</div>


    
    </>
  )
}

export default Weblist