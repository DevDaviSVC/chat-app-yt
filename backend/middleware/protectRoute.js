import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const protectRoute = async (req, res, next) => {
    try {
        
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({message: "Unauthorized - No token provided."});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).json({message: "Unauthorized: Invalid token."});
        }

        const user = await User.findById(decodedToken.userId).select("-password");

        if (!user) {
            return res.status(404).json({message: "User not found."});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protect route middleware: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export default protectRoute;