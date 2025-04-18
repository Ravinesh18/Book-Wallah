import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"

export const verifyJWT =  asyncHandler(async(req,_,next)=>{
    try {
        const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();
        if (!token) {
            throw new ApiError(401, "Unauthorized Request!");
        }
        
        // Log the token for debugging purposes
        console.log(`Token: ${token} ${typeof(token)}`);

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Log the decoded token for debugging purposes
        console.log(`Decoded Token: ${JSON.stringify(decodedToken)}`);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token!");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        throw new ApiError(401, "Invalid Access Token");
    }
})
