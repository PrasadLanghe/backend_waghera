// import mongoose from "mongoose";

// const eventPhotoSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, maxlength: 1000 },
//     imageUrl: { type: String, required: true },
//     publicId: { type: String, required: true }
// }, { timestamps: true });

// const EventPhoto = mongoose.model("EventPhoto", eventPhotoSchema);

// export default EventPhoto;



import mongoose from "mongoose";

const eventPhotoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, maxlength: 1000 },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  { timestamps: true }
);

const EventPhoto = mongoose.model("EventPhoto", eventPhotoSchema);

export default EventPhoto;
