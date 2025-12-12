import cloudinary from "cloudinary";
import TeamMember from "../models/TeamMember.js";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const getAllTeamMembers = async () => {
    return TeamMember.find();
};

export const saveTeamMemberFormData = async (name, role, file) => {
    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.path, { folder: "team_members" });

    const member = new TeamMember({
        name,
        role,
        imageUrl: result.secure_url
    });

    return member.save();
};
