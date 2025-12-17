// import mongoose from "mongoose";

// const contactSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, trim: true },
//     message: { type: String, required: true, trim: true, maxlength: 1000 },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Contact", contactSchema);



import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, trim: true },

    mobile: {
      type: String,
      required: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid mobile number"],
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
