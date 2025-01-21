import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    // console.log(req.body);
    // res.json({
    //     message: "auth is working",
    // });

    // after signup we will save credentials to the database usigng the user model
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // to check if the user is valid by checking email in DB
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found!"));
        }
        // else if email is valid then check password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(404, "Invalid Credentials!"));
        }

        // here we have destuctured the password and then send the data without pass
        const { password: pass, ...rest } = validUser._doc;
        // to store the session once logged in
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};


export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        // if user already exists then autheticate the user else add the account
        if (user) {
            const { password: pass, ...rest } = user._doc;
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random();
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().
                    toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo
            });
            await newUser.save();
            const { password: pass, ...rest } = newUser._doc;
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const signOut = async(req,res,next)=>{
    try {
        res.clearCookie('access_token');
        res
        .status(200)
        .json('User has been Logged Out!')
    } catch (error) {
        next(error)
    }
}