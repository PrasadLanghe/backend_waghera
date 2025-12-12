import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
