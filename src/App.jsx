import React from 'react'
import Homepage from './pages/Homepage'
import {Routes, Route} from 'react-router'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='checkout' element={<div>Test</div>}/>
    </Routes>
    </>
  )
}

export default App