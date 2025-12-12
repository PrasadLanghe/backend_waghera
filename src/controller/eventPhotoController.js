import {
    uploadAndSave,
    getAllPhotos,
    getPhotoById,
    deletePhoto
} from "../services/eventPhotoService.js";

export const uploadPhoto = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!req.file) return res.status(400).json({ message: "File is required" });

        const photo = await uploadAndSave(req.file, title, description);
        res.status(201).json(photo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPhotos = async (req, res) => {
    const photos = await getAllPhotos();
    res.json(photos);
};

export const getPhoto = async (req, res) => {
    const photo = await getPhotoById(req.params.id);
    if (!photo) return res.status(404).json({ message: "Photo not found" });
    res.json(photo);
};

export const removePhoto = async (req, res) => {
    const photo = await deletePhoto(req.params.id);
    if (!photo) return res.status(404).json({ message: "Photo not found" });
    res.status(204).send();
};
