import express from "express"
// import { Router } from "express"
import { forgotPassoword, signup ,verifyEmail } from "../controller/auth.controller.js";
import { login } from "../controller/auth.controller.js";
import { logout } from "../controller/auth.controller.js";
// import { forgotPassoword } from "../controller/auth.controller.js";
import { resetPassoword } from "../controller/auth.controller.js";



const router =express.Router()

router.post('/signup' ,signup);
router.post('/verify-email', verifyEmail)
router.post('/login' , login)
router.post('/logout', logout)
router.post('/forgot' ,forgotPassoword)
router.post('/reset-password/:token', resetPassoword)





export default router;