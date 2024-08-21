import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {

        const { _id:userId } = req.user;

        const filteredUsers = await User.find({_id: { $ne: userId }}).select("-password"); // Finds all user not equal ($ne) to the logged user. the .select("-password") prevents the password from being passed

        res.status(200).json(filteredUsers);
        
    } catch (error) {
        console.log(`Error in getUsersForSideBar controller: ${error.message}`);
        res.status(500).json({message: "Internal Server Error."});
    }
}