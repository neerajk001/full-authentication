import jwt from 'jsonwebtoken'

export const verifyToken = async(req , res , next) =>{
    const token =req.cookies.authTokens
    
    const token2  =req.cookies.token
    

    
    if(!token){
        return res.status(401).json({
            success:false,
            message:"unauthorized - no token provided"
        })
    }
   try{
    
    const decoded =jwt.verify(token , process.env.JWT_SECRET);
    // console.log("token1", token)
    if(!decoded){
        return res.status(401).json({
             success:false,
            message:"unauthorized - invalid token"
        })
    }

    req.userId = decoded.userId;
    next()

   }catch(error){
    // console.log("error in verifyToken" , error);
    return res.status(500).json({
        success:false,
        message:"server error"
    })
   }
}