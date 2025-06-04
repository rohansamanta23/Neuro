import axios from "axios";
import { API_URL } from "../constants.js";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Registration failed");
    }
  } catch (error) {
    const message = error.response?.data?.message || "Registration failed";
    throw new Error(message);
  }
};
