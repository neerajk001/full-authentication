import jwt from  'jsonwebtoken'

export const generateCookiesAndSetTokens =(res ,userId) =>{
    const token = jwt.sign({userId} ,process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("authTokens" ,token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:'strict'
    })
    return token
}