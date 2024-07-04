import express from "express"
import { getMe, login, logout, signup } from "../controllers/auth.js"
import jwt from "jsonwebtoken"
import User from "../models/user.js";
import cookieParser from "cookie-parser";
const router =express()
router.use(cookieParser())
const protectRoute = async (req, res, next) => {
    console.log("me",req.cookies.jwt)
	try {
		const token = req.cookies.jwt
		if (!token) {
			return res.status(401).json({ error: "Unauthorized: No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized: Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
		next();
	} catch (err) {
		console.log("Error in protectRoute middlewarer", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};


router.post("/signup",signup)
router.post("/login",login)
router.get("/me", protectRoute, getMe);
router.post("/logout",logout)



export default router