import React from 'react'
import FloatingShapes from './components/FloatingShapes'
import { Route,Routes } from 'react-router'
import Signup from './pages/Signup'
import LoginPage from './pages/LoginPage'

function App() {
  

  return (
    <>
<div className='min-h-screen bg-gradient-to-br from-indigo-900 via-sky-700 to-cyan-900 flex items-center justify-center overflow-hidden text-white'>
  
  <FloatingShapes color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
  <FloatingShapes color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5}/>
  <FloatingShapes color="bg-lime-500" size="w-32 h-32" top="40%" left="10%" delay={2}/>

    <Routes>
"      <Route path='/'element={"Home"}/>
"      <Route path='/signup'element={<Signup/>}/>
      <Route path='/login'element={<LoginPage/>}/>

    </Routes>



</div>
    </>
  )
}

export default App
