import React, { useEffect, useState } from 'react'
import './App.css'
import Router from './components/Router'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Mento from './components/Mento/Mento'

function App() {
  return (
    <div className="App">
      <Router />
      <Mento />
    </div>
  )
}
export default App
