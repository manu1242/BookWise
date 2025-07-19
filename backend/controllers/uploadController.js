exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // Cloudinary URL is available as req.file.path
    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: req.file.path,
      publicId: req.file.filename, // useful if you want to delete it later
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
};
