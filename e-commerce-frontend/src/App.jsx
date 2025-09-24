import React from 'react'
import Homepage from './pages/Homepage'
import {Routes, Route} from 'react-router'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Tracking from './pages/Tracking'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='checkout' element={<Checkout/>}/>
      <Route path='orders' element={<Orders/>}/>
      <Route path='tracking' element={<Tracking/>}/>
    </Routes>
    </>
  )
}

export default App