import mongoose from "mongoose";

const GroupsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    members: {
        type: Array
    },
    admin: {
        type: String
    },
    image: {
        type: String
    },
    post: {
        type: String
    }
}, {
    timestamps: true,
})

export default mongoose.model('Groups', GroupsSchema)