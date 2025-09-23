import React from 'react'
import Homepage from './pages/Homepage'
import {Routes, Route} from 'react-router'
import Checkout from './pages/Checkout'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='checkout' element={<Checkout/>}/>
    </Routes>
    </>
  )
}

export default App