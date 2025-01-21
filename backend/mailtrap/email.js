import { sender, mailtrapClient } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";



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
        throw new Error(`error sending verification email: ${error}`);
    }
}

export const sendPasswordResetEmail =async(email , resetURL) =>{
    const recipient =[{email}];
    try{
        const response =await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"reset your password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category:"password Reset",
        })
        console.log("maiiltrap", response)
    }
     catch (error) {
        console.error("Error sending password reset email" ,error)
        throw new Error(`Error sending password reset email: ${error}`);
    }
}

export const sendSuccessResetEmail = async (email) =>{
    const recipient =[{email}];
    try{
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"passoword  reset successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"password reset"
        })
        console.log("passoword reset successfull", response)

    }
    catch(error){
        console.log(`Error sending passoword reset success Email`, error)
        throw new Error(`Error sending passoword reset success Email ${error}`)
    }
}





