import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
    res.json({
        message: "Hi ak, API route is working",
    });
};


// if the user is valid then we will update the user and also hash its password
export const updateUser = async (req,res) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, "You can only update your account!"));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        // updating the data to the mongodb by getting the id for the requested user
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }    // and here this is set to true so that the updated user is returned insted of old one
        );

        // destructuring the object and sending the data without password 
        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, "You can only delete your account!"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json("User has been deleted!");
    } catch (error) {
        next(error);
    }
};