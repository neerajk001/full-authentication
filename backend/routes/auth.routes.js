import express from "express"
// import { Router } from "express"
import { signup ,verifyEmail } from "../controller/auth.controller.js";
import { login } from "../controller/auth.controller.js";
import { logout } from "../controller/auth.controller.js";



const router =express.Router()

router.post('/signup' ,signup);
router.post('/verify-email', verifyEmail)
router.post('/login' , login)
router.post('/logout', logout)




export default router;