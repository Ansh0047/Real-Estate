import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req,res,next) => {
    // console.log(req.body);
    // res.json({
    //     message: "auth is working",
    // });

    // after signup we will save credentials to the database usigng the user model
    const {username, email, password} = req.body;

    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save();
    res.status(201).json('User created succesfully');
    } catch (error) {
        // res.status(500).json(error.message);
        // error handling using middleware
        next(error);
        // next(errorHandler(550,"error from the function"));      // manually created error - custom error handler 
    }
    
};