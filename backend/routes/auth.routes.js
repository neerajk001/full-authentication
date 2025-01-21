import express from "express"
// import { Router } from "express"
import { forgotPassoword, signup ,verifyEmail } from "../controller/auth.controller.js";
import { login } from "../controller/auth.controller.js";
import { logout } from "../controller/auth.controller.js";
// import { forgotPassoword } from "../controller/auth.controller.js";
import { resetPassoword ,checkAuth} from "../controller/auth.controller.js";
import cookieParser from "cookie-parser";
import { verifyToken } from "../middleWare/verifyToken.js";


const router =express.Router()


router.get("/check-auth",verifyToken , checkAuth)
router.post('/signup' ,signup);
router.post('/verify-email', verifyEmail)
router.post('/login' , login)
router.post('/logout', logout)
router.post('/forgot' ,forgotPassoword)
router.post('/reset-password/:token', resetPassoword)





export default router;