import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateCookiesAndSetTokens } from "../utils/generateCookiesAndSetTokens.js";
import { sendVerificationEmail } from "../mailtrap/email.js";
// import { sendVerificationEmail } from "../mailtrap/email.js";
import { sendWelcomeEmail } from "../mailtrap/emailTemplate.js";
import crypto, { randomBytes } from 'crypto'
import { sendPasswordResetEmail } from "../mailtrap/email.js";
import { sendSuccessResetEmail } from "../mailtrap/email.js";




console.log(User)

export const signup = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    console.log('parse field', email, password, userName);

    // Check all fields
    if (!email || !userName || !password) {
      throw new Error('All fields are required');
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification code
    const generateVerificationCode = async () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };
    const verificationToken = await generateVerificationCode();

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
      userName,
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hrs
    });

    // Save the user in the database
    await user.save();
    console.log('Saved to DB');

    // Set cookies and tokens
    generateCookiesAndSetTokens(res, user._id);
    console.log('Generated cookies');

    // Send verification email (this is async but doesn't need to block response)
    await sendVerificationEmail(user.email, verificationToken);
    console.log('Verification email sent');

    // Send the response with user details
    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      ...user._doc,
      password: undefined,
    });

  } catch (error) {
    console.log("Error in signup:", error);
    return res.status(400).json({
      success: false,
      message: "User creation unsuccessful",
    });
  }
};


export const verifyEmail = async (req, res) => {
    const { code } = req.body;
  
    try {
      // Find user with the matching verification token
      const existingUser = await User.findOne({
        verificationToken: code,
        verificationTokenExpireAt: { $gt: Date.now() },
      });
  
      // Check if user is found and token is not expired
      if (!existingUser) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired code",
        });
      }
  
      // Mark user as verified and clear token fields
      existingUser.isVerified = true;
      existingUser.verificationToken = undefined;
      existingUser.verificationTokenExpireAt = undefined;
      await existingUser.save();
  
      // Send welcome email
      await sendWelcomeEmail(existingUser.email, existingUser.name);
  
      // Send success response
      res.status(200).json({
        success: true,
        message: "user is verified",
        ...existingUser._doc,


      });
    } catch (error) {
      console.error("The email verification failed:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  export const login = async ( req ,res) =>{
    try{
        const {password , email} =req.body
    const user = await User.findOne({email})
    if(!user){
       return  res.status(400).json({
            success:false,
            message:"invalid credentials"
        })
    }

        const isPasswordValid = await bcrypt.compare(password ,user.password)
        if(!isPasswordValid){
           return res.status(400).json({
                message:"password Incorrect"
            })
        }

        // generating the tokens 
        generateCookiesAndSetTokens(res , user._id)
    
    user.lastLogin = new Date();

    await user.save()

    res.status(200).json({
        success:true,
        messgae:"user login successfully",
        user:{
            ...user._doc,
            password:undefined
        },
        
    })
    }
    catch(error){
        console.log("error in login function" ,error);
        res.status(400).json({
            success:false,
            message:"login failed"

        })
    }
  }

  export const logout =async (req ,res) =>{
    res.clearCookie('authTokens');
    res.status(200).json({
        success:true,
        message:"logout successfull"
    })
  }
  
  export const forgotPassoword  = async(req ,res) =>{
    const {email} =req.body;
    try{
        const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found"
        })

    }
          // generate reset tokens 
        const resetToken =crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt   =Date.now() +1*60*60*1000;

        user.resetPasswordToken =resetToken;
        user.resetPasswordExpiredAt =resetTokenExpiresAt
        
        await user.save() // saving in the database

        await sendPasswordResetEmail (user.email ,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        res.status(200).json({
            success:true,
            message:"passoword reset link sent to your email"
        })

    }
    catch(error){
        console.log("Error in forgotPassoword",error);
        res.status(400).json({success:false,message:error.message})
    }


  }

  export const resetPassoword  =async (req ,res) =>{
    try{
        const {token} =req.params;
        const {password} =req.body;
        const user  =await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiredAt:{$gt:Date.now()+300000}
        })

        if(!user){
           return res.status(400).json({
                success:false,
                message:"Invalid or expired tokens"
            })
        }

        // updating the password
        const hashedPassword =await bcrypt.hash(password ,10)

        user.password =hashedPassword;
        user.resetPasswordToken =undefined;
        user.resetPasswordExpiredAt =undefined;

        await user.save()

        await sendSuccessResetEmail(user.email)
        res.status(200).json({
            success:true,
            messgae:"password reset successfull"

        })
    }
    catch(error){
        console.log("error in reset password", error);
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
  }

  export const checkAuth =async(req , res) =>{

    try{
        const user =await User.findById(req.userId).select("-password")
        
        
        if(!user){
           return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        res.status(200).json({
            success:true,
            ...user._doc,
            password:undefined
        })
    }catch(error){
        console.log("Error in checkAuth", error);
       return  res.status(400).json({success:false ,message:error.message})
    }
  }