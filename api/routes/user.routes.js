import express from "express";
import { test } from "../controllers/user.controller.js";
const router = express.Router();


// we will put the logic of req and res in another file i.e controller
// router.get('/test', (req,res) => {
//     res.json({
//         message: "Hi AK!",
//     });
// });

// this test is actually a function conataining the logic for the req and res and it is imported from the user controller
router.get('/test',test);

export default router;