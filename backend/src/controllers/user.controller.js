import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponses.js";
import {OTP} from "../models/otp.models.js";
import otpGenerator from "otp-generator"

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      401,
      "Something went wrong while generating Access and Refresh Token !"
    );
  }
};
const sendOtp = async (req, res) => {
  try {
      const { email } = req.body;

      //check if user already exists
      const checkUserPresent = await User.findOne({ email: email })

      if (checkUserPresent) {
          return res.status(401).json({
              success: false,
              message: 'User already exists'
          })
      }
      var otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false
      })
      console.log("OTP generated successfully: ", otp);

      //check if it is unique or not 
      const result = await OTP.findOne({ otp: otp });

      while (result) {
          otp = otpGenerator.generate(6, {
              upperCaseAlphabets: false,
              lowerCaseAlphabets: false,
              specialChars: false
          })
           result=await OTP.findOne({ otp: otp });
      }
      //create an entry for OTP
      const otpPayload = { email, otp }
      const otpBody = await OTP.create(otpPayload)
   //return response 
      res.status(200).json({
          success: true,
          message: 'OTP sent successfully',
          otpBody
      })
  }
  catch (e) {
      console.log(e),
          res.status(500).json({
              success: false,
              message: e.message
          })
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password,favouriteGenre, otp } = req.body;
  console.log(username)
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist !");
  }

  let profileImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.profileImage) &&
    req.files.profileImage.length > 0
  ) {
    profileImageLocalPath = req.files.profileImage[0].path;
  }

  const profileImage = await uploadOnCloudinary(profileImageLocalPath);

  const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
  console.log(recentOtp)
  //validate otp
  if (recentOtp.length == 0) {
    return res.status(400).json({
      success: false,
      message: "OTP not found"
    });

  }
  else if (otp !== recentOtp[0].otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP"
    });
  }

  const user = await User.create({
    fullname,
    profileImage: profileImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
    favouriteGenre
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or Email required !");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User Not Found !");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (res, req) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorised Request !");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used !");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accesssToken", accessToken, options)
      .cookie("rereshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken, newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassowrd, newPassword } = req.body

  const user = await User.findById(req.user?._id)

  const isPassowrdCorrect = await user.isPassowrdCorrect(oldPassowrd)


  if (!isPassowrdCorrect) {
    throw new ApiError(400, "Invalid Old Password !")
  }

  user.password = new password

  await user.save({ validateBeforeSave: false })

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed successfully !"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(
      200, req.user, "User Fetched Successfully!"
    ))
})


const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body

  if (!fullname || !email) {
    throw new ApiError(400, "All fields are required !")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email: email
      }
    },
    { new: true }
  ).select("-password")


  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const updateProfileImageDetails = asyncHandler(async (req, res) => {
  const profileImageLocalPath = req.file?.path

  if (!profileImageLocalPath) {
    throw new ApiError(400, "Profile Image file is missing!")
  }

  const profileImage = await uploadOnCloudinary(profileImageLocalPath)

  if (!profileImage.url) {
    throw new ApiError(400, "Error while uploading on profile image")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id, {
    $set: {
      profileImage: profileImage.url
    }
  },
    { new: true }
  ).select("-password")

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "Profile Image updated successfully !")
    )
})

export { registerUser, loginUser, logoutUser, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateProfileImageDetails, refreshAccessToken, sendOtp };
