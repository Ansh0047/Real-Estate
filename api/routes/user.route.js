import express from "express";
import { deleteUser,getUserListings, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();


// we will put the logic of req and res in another file i.e controller
// router.get('/test', (req,res) => {
//     res.json({
//         message: "Hi AK!",
//     });
// });

// this test is actually a function containing the logic for the req and res and it is imported from the user controller
router.get('/test',test);

// if the user if valid and it is verified using the token then it will be updtaed
router.post('/update/:id',verifyToken, updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);
router.get('/listings/:id',verifyToken,getUserListings);

export default router;