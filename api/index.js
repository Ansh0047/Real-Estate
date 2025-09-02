import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config({ path: "./api/.env" });

const app = express();
app.use(express.json()); // to allow the json to the server as input
app.use(cookieParser());

const uri = process.env.MONGO_URI;
mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to MongoDB succesfully");
    })
    .catch((err) => {
        console.log(err);
    });

// instead of making all the routes here we will create another file for that and import them here
app.get('/', (req,res) => {
    res.json({
        message: "Hi, AK!",
    });
});

const __dirname = path.resolve();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
});

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
