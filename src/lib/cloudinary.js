const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dtygitdnz/upload";
const CLOUDINARY_UPLOAD_PRESET = "threadly-media";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Error uploading image ");
    }

    const data = await res.json();

    return data?.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary", error);
  }
};
