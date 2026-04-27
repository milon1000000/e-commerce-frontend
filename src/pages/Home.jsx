import React from 'react'
import Navbar from '../components/ui/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='pt-16'>
      <Navbar />
      <Hero />
      <Features />
      <Footer/>
    </div>
  )
}

export default Home