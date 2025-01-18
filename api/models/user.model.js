import mongoose from "mongoose";


// models to define the schema of the data
const userSchema = new mongoose.Schema({
    usename:{
        type:String,required: true,unique:true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
},{timestamps: true}
);

const User = mongoose.model('User',userSchema);

export default User;