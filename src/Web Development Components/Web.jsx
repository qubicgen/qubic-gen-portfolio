import React from 'react'
import Navbar from '../HomeComponents/Navbar'
import Footer from '../HomeComponents/Footer'
import Webhead from './Webhead'
import Weblist from './Weblist'

const Web = () => {
  return (
    
    <>
    <Navbar/>
  <div className="bg" style={{backgroundColor:'black'}}>
    <Webhead/>
    <Weblist/>


    <Footer/>


        
    </div>
    </>
  )
}

export default Web