// import {
//     uploadAndSave,
//     getAllPhotos,
//     getPhotoById,
//     deletePhoto
// } from "../services/eventPhotoService.js";

// export const uploadPhoto = async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         if (!req.file) return res.status(400).json({ message: "File is required" });

//         const photo = await uploadAndSave(req.file, title, description);
//         res.status(201).json(photo);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// export const getPhotos = async (req, res) => {
//     const photos = await getAllPhotos();
//     res.json(photos);
// };

// export const getPhoto = async (req, res) => {
//     const photo = await getPhotoById(req.params.id);
//     if (!photo) return res.status(404).json({ message: "Photo not found" });
//     res.json(photo);
// };

// export const removePhoto = async (req, res) => {
//     const photo = await deletePhoto(req.params.id);
//     if (!photo) return res.status(404).json({ message: "Photo not found" });
//     res.status(204).send();
// };




import {
  uploadAndSave,
  getAllPhotos,
  getPhotoById,
  deletePhoto,
  updatePhotoDetails
} from "../services/eventPhotoService.js";

export const uploadPhoto = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const data = await uploadAndSave(req.file, title, description);

    res.status(201).json({
      message: "Photo uploaded successfully",
      photo: data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPhotos = async (req, res) => {
  const photos = await getAllPhotos();
  res.json(photos);
};

export const getPhoto = async (req, res) => {
  const photo = await getPhotoById(req.params.id);
  if (!photo) {
    return res.status(404).json({ message: "Photo not found" });
  }
  res.json(photo);
};

export const removePhoto = async (req, res) => {
  const deleted = await deletePhoto(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Photo not found" });
  }
  res.status(200).json({ message: "Photo deleted successfully" });
};

// UPDATE title, description
export const updatePhoto = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updated = await updatePhotoDetails(req.params.id, {
      title,
      description,
    });

    if (!updated) {
      return res.status(404).json({ message: "Photo not found" });
    }

    res.json({
      message: "Photo updated successfully",
      photo: updated
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
