import { sender, mailtrapClient } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";



export const sendVerificationEmail = async (email ,verificationToken) =>{
    const recipient =[{email}]


    try{
        const response =await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"you are awesome",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"email verification email"
        })
        console.log("email sent successfully", response)
    }catch(error){
        console.error(`Error sending verification`, error);
        throw new error(`error sending verification email: ${error}`);
    }
}