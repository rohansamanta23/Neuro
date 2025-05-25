import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

const uploadCloudinary = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return null;
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.log("Error uploading to Cloudinary:", error);
    return null;
  } finally {
    // Clean up the file after upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export { uploadCloudinary };
