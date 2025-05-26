import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  // Validate user input
  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }
  //check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }
  //check for avatar
  const avatarLocalPath = req.file?.path;

  let avatar = "";
  if (avatarLocalPath !== null) {
    avatar = await uploadCloudinary(avatarLocalPath);
  }
  //create user object
  const user = await User.create({
    fullName,
    email,
    password,
    avatar: avatar.url,
  });
  //remove password from user object before sending response
  const userResponse = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  //user creation failled
  if (!userResponse) {
    throw new ApiError(500, "User creation failed");
  }
  //send response
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", userResponse));
});

export { registerUser };
