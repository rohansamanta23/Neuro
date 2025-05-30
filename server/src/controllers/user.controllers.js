import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

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
    avatar: avatar,
  });
  if (!user) {
    throw new ApiError(500, "User creation failed");
  }
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

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);
  console.log(accessToken, refreshToken);
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user, accessToken }, "Login successful"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }
  user.refreshToken = null;
  await user.save({ validateBeforeSave: false });
  res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, "Logout successful"));
});

export { registerUser, loginUser, logoutUser };
