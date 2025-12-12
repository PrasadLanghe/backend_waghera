import { getAllTeamMembers, saveTeamMemberFormData } from "../services/teamService.js";

export const fetchTeamMembers = async (req, res) => {
    try {
        const members = await getAllTeamMembers();
        res.json(members);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const addTeamMember = async (req, res) => {
    try {
        const { name, role } = req.body;
        if (!req.file) return res.status(400).json({ message: "Image file is required" });

        const member = await saveTeamMemberFormData(name, role, req.file);
        res.status(201).json(member);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
