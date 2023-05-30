import React from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'

export default function MainLayOutes({children}) {
  return (
      <div>
          <Header />
          {children}
          <Footer/>
    </div>
  )
}
