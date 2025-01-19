import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json()); // to allow the json to the server as input

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB succesfully");
    })
    .catch((err) => {
        console.log(err);
    });

// instead of making all the routes here we will create another file for that and import them here
// app.get('/', (req,res) => {
//     res.json({
//         message: "Hi, AK!",
//     });
// });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// middleware for handling errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
