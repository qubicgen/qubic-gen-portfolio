import React, { useEffect, useRef, useState } from 'react'
import 'aos/dist/aos.css';
import Queries from './Queries';
import {Link} from 'react-scroll'

const Medialist = () => {
  const overviewRef = useRef(null);
  const serveRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const queriesRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const [isNavFixed, setIsNavFixed] = useState(false);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // This is for rpa offering cards

  const[EnergyServe,setEnergyServe]=useState([
    {
      title: 'Electricity',
      description: 'At QubicGen, our developed solutions support the holistic growth of the power industry, spanning Electricity Generation, Transmission, Distribution, Retail, and catering to both commercial and residential sectors.'
    },
    {
      title: 'Renewables',
      description: 'Delivers advanced monitoring and efficiency management platforms for solar and wind energy assets. Additionally, emphasizes the development of innovative technologies in renewable energy, including hydroelectric, wind, bioenergy, solar, and geothermal power.'
    },
    {
      title: 'Water and Waste Management',
      description: 'Our dedication lies in fostering enduring positive change, delivering enhanced value to water, wastewater utilities, and waste management sectors through the provision of seamless, efficient digital services to customers.'
    },
    {
      title: 'Gas',
      description: 'We aid in addressing challenges concerning the seamless operations of gas distribution.'
    },
    {
      title: 'Nuclear',
      description: 'Tackling industry challenges like the rise of nuclear power through innovative solutions with AR and VR technologies, while also offering sustainable alternatives.'
    },
    {
      title: 'Distributed Energy Resources',
      description: 'Delivering comprehensive services for electric vehicle charging systems, constructing microgrids, and facilitating real-time data streaming and infrastructure monitoring. We collaborate closely with end-users, manufacturers, and utilities to ensure optimal operation and efficiency.'
    },
    {
      title: 'Mining',
      description: 'Industry-focused solutions prioritize safety, environmental compliance, project development planning, and operational excellence within the mining sector.'
    },
    {
      title: 'Smart Cities',
      description: 'An integrated system utilizing IoT, data analytics, and machine learning drives smart city transformation, offering solutions such as meter reading and energy management.'
    },
    {
      title: "EPC's",
      description: 'Emphasizing ERP solutions for asset management and digital core to enhance business process automation.'
    },

    
  ]);


  const [MediaOffering, setMediaOffering] = useState([
    {
        title: 'Content Management Systems (CMS)',
        background: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1709635106/QubicGen/Media%20and%20Entertainment/person-working-html-computer_23-2150038849_ewha3z.jpg',
        description: 'Development and customization of content management systems tailored to the needs of media and entertainment companies, enabling efficient organization, storage, and retrieval of digital assets such as videos, images, and articles.'
    },
    {
        title: 'Streaming Platforms',
        background: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1709635243/QubicGen/Media%20and%20Entertainment/full-shot-woman-looking-floating-screen_23-2150300996_uwqaui.jpg',
        description: 'Design and development of streaming platforms for live and on-demand content delivery, including video streaming services, music streaming apps, and podcast platforms, to reach audiences across multiple devices and platforms.'
    },
    {
        title: 'Digital Rights Management (DRM)',
        background: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1709635371/QubicGen/Media%20and%20Entertainment/2022-concept-business-people-show-future-big-data-technology-metaverse-through-networking_590401-95_hnzwn4.jpg',
        description: 'Implementation of digital rights management solutions to protect copyrighted content from piracy and unauthorized distribution, ensuring content creators and rights holders receive proper compensation for their work.'
    },
    {
        title: 'Content Distribution Networks (CDN)',
        background: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1709635450/QubicGen/Media%20and%20Entertainment/world-map-with-global-technology-social-connection-network-with-nodes-links-vector-illustration_1284-1968_npdt7p.jpg',
        description: 'Deployment of content distribution networks to optimize the delivery of media content to end-users, reducing latency, buffering, and downtime while improving scalability and reliability of content delivery.'
    },
    {
        title: 'Advertising Technology (AdTech)',
        background: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1709635556/QubicGen/Media%20and%20Entertainment/corporate-management-strategy-solution-branding-concept_53876-167088_v3pfuq.jpg',
        description: 'Development of advertising technology solutions, including ad serving platforms, programmatic advertising systems, and ad targeting algorithms, to optimize ad placement, targeting, and monetization across digital channels.'
    },
    {
        title: 'Data Analytics and Personalization',
        background: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1709622700/QubicGen/bfsi/revenue-operations-collage_23-2150847854_j10r9b.jpg',
        description: 'Utilization of data analytics and machine learning algorithms to analyze user behavior, preferences, and engagement patterns, enabling personalized content recommendations, targeted advertising, and audience segmentation.'
    },
    {
        title: 'User Experience (UX) Design',
        background: 'https://img.freepik.com/free-photo/representations-user-experience-interface-design_23-2150104516.jpg?t=st=1709635763~exp=1709639363~hmac=dbff7c5f2cb97dd598b114e8660b16a813c8c773be21493938d7273aaf634467&w=826',
        description: 'User experience design services to create intuitive and engaging user interfaces for media and entertainment applications, enhancing user satisfaction and retention through seamless navigation and interactive features.'
    },
    {
        title: 'Social Media Integration',
        background: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1709635894/QubicGen/Media%20and%20Entertainment/hands-holding-smartphone-social-media-concept_23-2150208264_ojh5o0.jpg',
        description: 'Integration of social media platforms into media and entertainment applications to facilitate social sharing, user-generated content creation, and community engagement, enhancing brand visibility and audience interaction.'
    },
    {
        title: 'Virtual Reality (VR) and Augmented Reality (AR)',
        background: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1709636013/QubicGen/Media%20and%20Entertainment/medium-shot-woman-wearing-vr-glasses_23-2150394453_y6xhge.jpg',
        description: 'Development of immersive VR and AR experiences for gaming, storytelling, live events, and interactive marketing campaigns, leveraging cutting-edge technologies to create memorable and engaging content experiences.'
    },
    {
        title: 'Monetization Strategies',
        background: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1709636200/QubicGen/Media%20and%20Entertainment/happy-business-woman-money-rain-made-dollars-isolated-black-wall_231208-11727_bybnqs.jpg',
        description: 'Consulting and advisory services to help media and entertainment companies develop effective monetization strategies, including subscription models, pay-per-view options, advertising revenue, sponsorships, and merchandising opportunities.'
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
<Link to="overview" spy={true} smooth={true} offset={-150} duration={200}><li>Overview</li></Link>
<Link to="serviceofferings" spy={true} smooth={true} offset={-180} duration={200}><li>Service Offerings</li></Link>
<Link to="querie" spy={true} smooth={true} offset={-200} duration={200}><li>Queries</li></Link>
</nav>

    </div>
    <hr />
   
   <div id='overview'>
    
   </div>

    <div className="container" style={{ color: 'white',marginTop:'50px' }} data-aos="fade-up"  >
    <h1 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bolder', color: 'white' }}  > Overview</h1>




  
      <div className="row featurette" bis_skin_checked="1" style={{marginTop:'100px'}}  >

        <div className="col-md-7" bis_skin_checked="1">
          <h1 className="featurette-heading fw-normal lh-1" style={{ fontSize: '40px', padding: '20px', fontWeight: 'bolder' }}>Guiding the course of change</h1>
          <p className="lead" id='leadtext'>Harnessing fresh perspectives and cutting-edge strategies, our company is dedicated to revolutionizing the landscape of Retail Banking, Lending and Leasing, Cards and Payments, Asset and Wealth Management, Investment Banks, Stock Exchanges, as well as Life/General Insurances. Despite our newcomer status, we are committed to guiding these sectors through dynamic changes, presenting exciting opportunities to elevate product offerings, services, and prioritize customer satisfaction.</p>
        </div>
        <div className="col-md-5" bis_skin_checked="1">
          <img src="https://res.cloudinary.com/defsu5bfc/image/upload/v1709535501/QubicGen/stack-money-coin-with-trading-graph_1_jjrd0p.jpg" alt="" />
        </div>
      </div>
    </div>

    {/* This is rpalist ends */}

    <div id='whoweserve'>
    
    </div>
  
    

   







    {/* This is rpa offering start */}



    {/* This is who we server starts */}
     <div id='serviceofferings'>
    
    </div>

    <div style={{ color: 'white', marginLeft: '40px',marginTop:'120px'}} data-aos="zoom-in"  >
      
      <h1 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bolder' }} > Service Offerings</h1>
  
   

      {/* This is offering */}

      <div className="container" style={{marginTop:'80px'}}  >
        <div className="row">
          {MediaOffering.map((serve) => (
            <div className="book" style={{ marginLeft: '50px', marginTop: '20px' }}>
              <p>{serve.description}</p>
              <div className="cover" style={{ background: `rgba(255, 255, 255, 0.8) url('${serve.background}') center/cover` }}>
                <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div>
                <p style={{ fontWeight: 'bolder', color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '15px' }}>{serve.title}</p>
              </div>


            </div>


          ))}
        </div>
        <br />
      </div>

      {/* This is offering ends */}





    </div>

    {/* This is who we server ends */}
    <div className="queries" id='querie' style={{marginTop:'50px'}}>
      <Queries />
    </div>






  </>
  )
}

export default Medialist