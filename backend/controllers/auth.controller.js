import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
    try {
        
        const { username, password } = req.body;

        const user = await User.findOne({username});

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({message: "Invalid username or password."});
        }

        generateTokenAndSetCookie(user._id, res);
        
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log(`Error in logging: ${error.message}`);
        res.status(500).json({message: error.message});
    }
};

export const logout = (req, res) => {
    try {
        
        res.cookie("jwt", "", {maxAge: 0});

        res.status(200).json({message: "Logged out successfully!"});

    } catch (error) {
        console.log(`Error in logging: ${error.message}`);
        res.status(500).json({message: error.message});
    }
};

export const signup = async (req, res) => {
    try {
        
        const { fullName, username, password, confirmPassword, gender } = req.body;

        // verify that the passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords don't match."});
        }

        // verify that the username is unique
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({error: "This username already exists."});
        }

        // hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // generates the profile pic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // save the user on database
        const newUser = await User.create({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        // generate JWT token
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json(newUser);

    } catch (error) {
        console.log(`Error in signup controller: ${error.message}`);
        res.status(500).json({message: "Internal Server Error."});
    }
};