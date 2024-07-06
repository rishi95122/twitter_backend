import express from "express"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import postRoutes from "./routes/post.js"
import cors from "cors"
import notificationRoutes from "./routes/notification.js";
import dotenv from "dotenv"
import {v2 as cloudinary} from "cloudinary"
dotenv.config()
import { connectMongodb } from "./db/mongo.js"
import cookieParser from "cookie-parser"

cloudinary.config({

    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})


const app=express()
app.use(express.json())
app.use(cookieParser())
const corsOptions = {
 origin:"https://localhost:3000",
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/notifications", notificationRoutes);
app.listen(8000,()=>{
    console.log("server started")
    connectMongodb()
})

