import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateCookiesAndSetTokens } from "../utils/generateCookiesAndSetTokens.js";
import { sendVerificationEmail } from "../mailtrap/email.js";
// import { sendVerificationEmail } from "../mailtrap/email.js";
import { sendWelcomeEmail } from "../mailtrap/emailTemplate.js";



console.log(User)

export const signup =async(req ,res)=>{
    try{
        const {email , password , userName} =req.body;
        console.log('parse field', email ,password ,userName);

        // check all the fields 
        if(!email || !userName || !password){
            throw new Error ("all fields are required")
        }

        // checking for existing 

            const userExist =await User.findOne({email})
            if(userExist){
                res.status(400).json({
                    success:false,
                    messgae:"userAlredy exist"
                })
            }

            const hashedPassword =await bcrypt.hash(password , 10)

            // generating the verification code
            const generateVerificationCode = async() =>{
                return   Math.floor (100000+Math.random()*900000).toString();
            }

            const verificationToken =await generateVerificationCode();

            const user = new User({
                email, 
                password:hashedPassword,
                userName,
                verificationToken,
                verificationTokenExpireAt:Date.now()+24 *60 * 60 *1000 // 24 hrs

            })
            // saving the user in the database
            await user.save()
                console.log("save db")
            generateCookiesAndSetTokens(res , user._id)
            console.log("generated cookies")
            // email verification

            await sendVerificationEmail (user.email ,verificationToken)
                console.log("verification")
            res.status(200).json({
                success:true,
                message:"user created successfully",
                ...user._doc,
                password:undefined
            })
    }

    

    catch (error) {
        res.status(400).json({
            success: false,
            message: "user creation unsuccessful",
        });
    }
    
}

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
  