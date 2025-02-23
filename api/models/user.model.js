import mongoose from "mongoose";

// models to define the schema of the data
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-avatar-human-man-people-person-profile-user-abstract-circl-png-image_1983926.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
