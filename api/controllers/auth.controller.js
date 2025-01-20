import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req,res,next) => {
    const {email, password} = req.body;
    try {
        // to check if the user is valid by checking email in DB
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,"User not found!"));
        }
        // else if email is valid then check password
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(404,"Invalid Credentials!"));
        } 

        // here we have destuctured the password and then send the data without pass
        const {password: pass, ...rest} = validUser._doc;
        // to store the session once logged in
        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET);
        res.cookie("access_token", token,{httpOnly: true}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};