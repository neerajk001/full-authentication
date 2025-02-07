import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { MdLock } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';

import { Loader } from 'lucide-react';
import { useAuthStore } from '../store/authStore';




function Signup() {
    const [name, setName] =useState("")
    const [email , setEmail] =useState("")
    const [password , SetPassword] =useState("")
    // const isLoading =false
    const navigate  =useNavigate()

const {signup,error, isLoading} =useAuthStore();


    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            await signup(email ,password, name);
            navigate("/verify-email");
            
        }
        catch(error){
            console.log(error)
        }
        
    }
  return (
    <motion.div
    initial={{opacity:0, y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}

    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    
>
    <div className='p-8 '>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-emerald-700 text-transparent bg-clip-text'>
            Create Account
        </h2>
      <form onSubmit={handleSubmit}>
      <Input
        icon={FaUser}
        type="text"
        placeholder="full name"
        value={name}
        onChange ={(e)=>{
            console.log(e.target.value)
            setName(e.target.value)}}
        />
        <Input
        icon={MdEmail}
        type="text"
        placeholder="email"
        value={email}
        onChange ={(e)=>{
            setEmail(e.target.value)
        }}

        />
        <Input
        icon={MdLock}
        type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>{
            SetPassword(e.target.value)
        }}
        />
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        {/* {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>} */}
        {/* password strengh  */}
        {/* <PasswordStrengthMeter password ={password}/> */}
        <motion.button
        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
        whileHover={{scale:1.02}}
        whileTap={{scale:0.98}}
        type='submit'
        // disabled={isLoading}
        >
            {isLoading ? <Loader className='w-6 h-6 mx-auto animate-spin'/>:"Signup"  }
                
        </motion.button>

      </form>
    </div>
        <div className='px-8 py-4 bg-gray-800 rounded-b-2xl bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>
                Already have an account{" "}
                <Link to={'/Login'} className='text-green-400 hover:underline hover:text-green-300'>
                Login
                </Link>
            </p>

        </div>
        
    </motion.div>
  )
}

export default Signup