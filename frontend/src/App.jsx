import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import PrivateRoutes from '../contexts/PrivateRoutes'
import Register from './pages/Register'
import { AuthProvider } from '../contexts/AuthContext'



function App() {
  
  return (
    <>
      
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
              
            <Route element={<PrivateRoutes />} >
              <Route path="/" element={<Home />} />
            </Route>
              
          </Routes>
        </AuthProvider>
      </Router>
      
      
      
    </>
  )
}

export default App
