import React, { useState } from 'react'
// import React from 'react'
import {Mail ,Lock ,Loader} from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import Input from '../components/Input'
import { useAuthStore } from '../store/authStore'


function LoginPage() {
    const [email ,setEmail] =useState("")
    const[password ,SetPassword] =useState("")
    const {isLoading, login, error} =useAuthStore()

    const handleLogin=async(e)=>{
      console.log('handlelogin')
        e.preventDefault()
        console.log("handle login")
        console.log('email',email ,"password",password);
        await login (email, password);
        console.log("password")
        console.log(password)
        console.log(email)

    }
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Welcome Back
				</h2>
                <form onSubmit={handleLogin}>
                    <Input
                    icon={Mail}
                    type="text"
                    placeholder="email address"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}

                    />

<Input
                    type="text"
                    icon={Lock}
                    placeholder="passoword"
                    value={password}
                    onChange={(e)=>{SetPassword(e.target.value)}}


                    />

                  <div className='flex items-center mb-6'>
                  <Link to="/forgot-password" className="text-sm text-green-400 hover:underline hover:text-green-300">
                      Forgot Password?
                      </Link>
                      {error && <p className="text-red-500 font-semibold text-center mt-4">{error}</p>}


                  </div>
                  <motion.button
                          className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                          whileHover={{scale:1.02}}
                          whileTap={{scale:0.98}}
                          type='submit'
                          disabled ={isLoading}
                          >
                            {isLoading ? <Loader className='h-6 w-6 animate-spin mx-auto'/>:"Login"}
                                
                          </motion.button>

                </form>

            </div>
                 <div className='px-8 py-4 bg-gray-800 rounded-b-2xl bg-opacity-50 flex justify-center'>
                           <p className='text-sm text-gray-400'>
                               Dont have an account{" "}
                               <Link to={'/signup'} className='text-green-400 hover:underline hover:text-green-300'>
                               Signup
                               </Link>
                           </p>
               
                       </div> 
    

    </motion.div>
  )
}

export default LoginPage