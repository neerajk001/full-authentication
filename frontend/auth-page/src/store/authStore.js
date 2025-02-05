import {create} from 'zustand'
import axios from 'axios'
// import { logout } from '../../../../backend/controller/auth.controller';
// import { checkAuth } from '../../../../backend/controller/auth.controller';
// import { verifyEmail } from '../../../../backend/controller/auth.controller';


axios.defaults.withCredentials = true;
const API_URL ='http://localhost:5001/api/auth';

export const useAuthStore =create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    signup:async(email ,password, userName) =>{
        set({isLoading:true,
             error:null})
        try{
           const response = await axios.post(`${API_URL}/signup`,{email,password,userName});
            set({user:response.data.user,
                isAuthenticated:true, 
                isLoading:false })
        }catch(error){
            set({
                error:error.response.data.message || 'Error signing up', isLoading:false
            })

            throw error;
        }
    },
    login:async(email ,password) =>{
        set({isLoading:true,
             error:null})
        try{
           const response = await axios.post(`${API_URL}/login`,{email,password});
            set({user:response.data.user,
                isAuthenticated:true, 
                isLoading:false })
        }catch(error){
            set({
                error:error.response.data.message || 'Error signing up', isLoading:false
            })

            throw error;
        }
    },

    logout:async () =>{
        set({isLoading:true, error:null});
        try{
            await axios.post(`${API_URL}/logout`)
            set({
                user:null,
                isAuthenticated:false,
                error:null,
                isLoading:false
            })
        }catch(error){
            set({
                error:"error logging out",
                isLoading:false
            })
            throw error
        }
    },

    verifyEmail: async (code) =>{
        set({isLoading:true, error:null});
        try{
            const response =await axios.post(`${API_URL}/verify-email`,{code});
            set({user:response.data.user, isAuthenticated:true, isLoading:false});
            return response.data
        }catch(error){
            set({
                error:error.response.data.message ||
                "error verifying email", isLoading:false
            })
        }
    },

    forgotpassword:async(email)=>{
        set({isLoading:true,error:null ,message:null})

        try{
           const response = await axios.post(`${API_URL}/forgot`,{email});
            set({
                
                    message:response.data.message, isLoading:false
            
            })
        }
        catch(error){
            set({isLoading:false,
                error:error.response.data.message || "error sending reset password email"

            }
                
            )
            
            throw error
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            // console.log("Check Auth Response:", response.data); // Debug log
            
            if (response.data && response.data._id) {
                // Ensure you're setting the user object correctly
                set({
                    user: response.data,
                    isAuthenticated: true,
                    isCheckingAuth: false,
                });
                // console.log("user", response.data); // Debug log
            } else {
                // If no valid user data, consider setting isAuthenticated to false
                set({
                    user: null,
                    isAuthenticated: false,
                    isCheckingAuth: false,
                });
            }
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error checking authentication",
                isCheckingAuth: false,
                isAuthenticated: false,
            });
        }
    }
    
}))