import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import Home from "./pages/Home";
import About from "./pages/About";
// import Services from "./pages/Services";
// import Industries from "./pages/Industries";
import Banking from "./BankingComponents/Banking";
// import Blog from "./pages/Blog";
import 'bootstrap/dist/css/bootstrap.min.css';
import Rpa from "./Rpa Components/Rpa";


const App = () => {
  return (
    <HelmetProvider> {/* Wrap your App component with HelmetProvider */}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/services" element={<Services />} /> */}
          {/* <Route path="/industries" element={<Industries />} /> */}
          <Route path="/banking" element={<Banking/>} />
          <Route path="/about" element={<About />} />
          <Route path="/rpa" element={<Rpa/>} />
          {/* <Route path="/blog" element={<Blog />} /> */}
        </Routes>
      </Router>

      
    </HelmetProvider>
  );
};

export default App;
