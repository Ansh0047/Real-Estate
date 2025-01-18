import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB succesfully");
}).catch((err) => {
    console.log(err);
});


// instead of making all the routes here we will create another file for that and import them here
// app.get('/', (req,res) => {
//     res.json({
//         message: "Hi, AK!",
//     });
// });
app.use('/api/user', userRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
