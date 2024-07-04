import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/user.js";
import  {getUserProfile,followUnfollowUser,getSuggestedUsers}  from "../controllers/user.js";
import { updateUser } from "../controllers/user.js";
const router =express()

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

router.get("/profile/:username", protectRoute, getUserProfile);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/update", protectRoute, updateUser);
export default router