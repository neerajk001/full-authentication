import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateCookiesAndSetTokens } from "../utils/generateCookiesAndSetTokens.js";



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
                verificationToken

            })
            // saving the user in the database
            await user.save()

            generateCookiesAndSetTokens(res , user._id)

            res.status(200).json({
                success:true,
                message:"user created successfully"
            })
    }

    

    catch (error) {
        res.status(400).json({
            success: false,
            message: "user creation unsuccessful",
        });
    }
    
}