import axios from "axios";
import { API_URL } from "../constants.js";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    if (response.data.success) {
        console.log("ok");
      return response.data;
    } else {
      throw new Error(response.data.message || "Registration failed");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    } else {
      throw new Error("Network error or server not reachable");
    }
  }
};
