// import { getAllTeamMembers, saveTeamMemberFormData } from "../services/teamService.js";

// export const fetchTeamMembers = async (req, res) => {
//     try {
//         const members = await getAllTeamMembers();
//         res.json(members);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// export const addTeamMember = async (req, res) => {
//     try {
//         const { name, role } = req.body;
//         if (!req.file) return res.status(400).json({ message: "Image file is required" });

//         const member = await saveTeamMemberFormData(name, role, req.file);
//         res.status(201).json(member);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };



import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from "../services/teamService.js";

// GET ALL
export const fetchTeamMembers = async (req, res) => {
  try {
    const members = await getAllTeamMembers();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ONE
export const fetchTeamMemberById = async (req, res) => {
  try {
    const member = await getTeamMemberById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE
export const addTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const member = await createTeamMember(name, role, req.file);
    res.status(201).json(member);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
export const editTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    const updated = await updateTeamMember(
      req.params.id,
      name,
      role,
      req.file
    );

    if (!updated)
      return res.status(404).json({ message: "Member not found" });

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
export const removeTeamMember = async (req, res) => {
  try {
    const deleted = await deleteTeamMember(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Member not found" });

    res.json({ message: "Team member deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
