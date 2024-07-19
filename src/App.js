import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Common from './components/common'
import SearchQuery from './components/search result'

const App = () => {

  return (
    <>
      <div className='w-11/12 mx-auto sm:w-10/12'>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/common/:category' element={<Common/>} />
            <Route path="/search/:query" element={<SearchQuery/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
