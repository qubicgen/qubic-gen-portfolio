import React from 'react'
import Navbar from '../Services/HomeComponents/Navbar'
import './Sap.css'
import Saphead from "./Saphead"

import Footer from '../Services/HomeComponents/Footer'
import Saplist from './Saplist'


const Rpa = () => {
  return (
    
    <>
    <Navbar/>
  <div className="bg" style={{backgroundColor:'black'}}>
    <Saphead/>
    <Saplist/>
    

    <Footer/>

        
    </div>
    </>
  )
}

export default Rpa