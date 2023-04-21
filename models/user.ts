import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true,
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        minLength: [4, "Full name should be atleast 4 characters long"],
        maxLength: [30, "Full name should be less than 30 characters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    }
})

const User = models.User || model("User", UserSchema)

export default User