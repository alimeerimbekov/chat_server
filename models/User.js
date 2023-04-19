import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    post : {
        type: String
    }

}, {
    timestamps: true,
})

export default mongoose.model('User', UserSchema)