import axios from "axios";

export const uploadFilesRequest = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/messages/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

				return response.data
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

