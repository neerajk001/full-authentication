import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { MdLock } from 'react-icons/md';




function Signup() {
    const [name, setName] =useState("")
    const [email , setEmail] =useState("")
    const [password , Setpassword] =useState("")


    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log(e.target.value)
    }
  return (
    <motion.div
    initial={{opacity:0, y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    
>
    <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
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
            Setpassword(e.target.value)
        }}
        />


      </form>
    </div>
    </motion.div>
  )
}

export default Signup