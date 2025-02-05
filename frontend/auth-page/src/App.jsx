import React from 'react'
import { useEffect } from 'react'
import FloatingShapes from './components/FloatingShapes'
import { Navigate, Route,Routes } from 'react-router'
import Signup from './pages/Signup'
import LoginPage from './pages/LoginPage'
import EmailVerificationpage from './pages/EmailVerificationPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import Dashboard from './pages/Dashboard'
import LoadingSpinner from './components/LoadingSpinner'
import ForgotPassword from './pages/ForgotPasswordPage'

function App() {

 // protect routes which require authentication 
  const ProtectedRoutes = ({children}) =>{
    const {isAuthenticated, user}= useAuthStore();
    // console.log("protected user",user)
    if(!isAuthenticated){
      return <Navigate to="/login" replace/>

    }
    if(!user.isVerified){
      console.log(user)
      return <Navigate to='/verify-email' replace/>
    }

    return children;

  }



  //redirect authenticated users to the home page 
  const RedirecAuthenticatedUser =({children }) =>{
    const {isAuthenticated, user } = useAuthStore();
    // console.log("redirectuser", user)
    if(isAuthenticated && user && user.isVerified){
      console.log("user",user.isVerified)
      console.log("isredirected to home page")
      return <Navigate to="/" replace />
    }
    return children;
  }


  const { isCheckingAuth, checkAuth, } = useAuthStore();

  

  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuth(); // Waits for checkAuth to complete before moving forward
    };

    fetchAuth();
  }, [checkAuth]);

  if(isCheckingAuth){
    return <LoadingSpinner/>
  }
  // console.log("isauthenticated", isAuthenticated);
  // console.log("user", user);

  return (
    <>
<div className='min-h-screen bg-gradient-to-br from-indigo-900 via-sky-700 to-cyan-900 flex items-center justify-center overflow-hidden text-white'>
  
  <FloatingShapes color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
  <FloatingShapes color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5}/>
  <FloatingShapes color="bg-lime-500" size="w-32 h-32" top="40%" left="10%" delay={2}/>

    <Routes>
     <Route path='/'element={<ProtectedRoutes>
      <Dashboard/>
     </ProtectedRoutes>}/>
      <Route path='/signup'element=
                              {
                                <RedirecAuthenticatedUser>
                                  <Signup/>
                                </RedirecAuthenticatedUser>
                              }/>
      <Route path='/login'element={<RedirecAuthenticatedUser>
                                  <LoginPage/>
                                </RedirecAuthenticatedUser>}/>
      <Route path='/verify-email'element={<EmailVerificationpage/>}/>
      <Route
					path='/forgot-password'
					element={
						<RedirecAuthenticatedUser>
              <ForgotPassword/>
            </RedirecAuthenticatedUser>
					}
				/>

    </Routes>
    <Toaster/>








</div>
    </>
  )
}

export default App
