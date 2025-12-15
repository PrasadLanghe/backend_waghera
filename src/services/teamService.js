// import cloudinary from "cloudinary";
// import TeamMember from "../models/TeamMember.js";

// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// export const getAllTeamMembers = async () => {
//     return TeamMember.find();
// };

// export const saveTeamMemberFormData = async (name, role, file) => {
//     // Upload image to Cloudinary
//     const result = await cloudinary.v2.uploader.upload(file.path, { folder: "team_members" });

//     const member = new TeamMember({
//         name,
//         role,
//         imageUrl: result.secure_url
//     });

//     return member.save();
// };




import cloudinary from "cloudinary";
import fs from "fs";
import TeamMember from "../models/TeamMember.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// READ ALL
export const getAllTeamMembers = async () => {
  return TeamMember.find().sort({ createdAt: -1 });
};

// READ SINGLE
export const getTeamMemberById = async (id) => {
  return TeamMember.findById(id);
};

// CREATE
export const createTeamMember = async (name, role, file) => {
  const result = await cloudinary.v2.uploader.upload(file.path, {
    folder: "team_members"
  });

  fs.unlinkSync(file.path);

  const member = new TeamMember({
    name,
    role,
    imageUrl: result.secure_url,
    publicId: result.public_id
  });

  return member.save();
};

// UPDATE
export const updateTeamMember = async (id, name, role, file) => {
  const member = await TeamMember.findById(id);
  if (!member) return null;

  // Replace image if new one uploaded
  if (file) {
    await cloudinary.v2.uploader.destroy(member.publicId);

    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "team_members"
    });

    fs.unlinkSync(file.path);

    member.imageUrl = result.secure_url;
    member.publicId = result.public_id;
  }

  member.name = name || member.name;
  member.role = role || member.role;

  return member.save();
};

// DELETE
export const deleteTeamMember = async (id) => {
  const member = await TeamMember.findById(id);
  if (!member) return null;

  await cloudinary.v2.uploader.destroy(member.publicId);
  return TeamMember.findByIdAndDelete(id);
};
