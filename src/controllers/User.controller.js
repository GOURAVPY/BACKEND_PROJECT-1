import { Apierror } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.models.js';
import { uploadoncloudinary } from '../utils/filleUplode.js';
import { ApiResponse } from '../utils/apoResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  //get user data from frantend
  //validation - not empty
  const { fullname, email, username, password } = req.body;
  console.log('email', email);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === '')
  ) {
    throw new Apierror(400, 'all fields are required');
  }

  //check is user aleady exists usename, email

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new Apierror(409, 'user whit email or username already exists');
  }
  //check for images, check for avatar

  const avatarLocalpath = req.files?.avatar[0]?.path;
  const coverImageLocalpath = req.files?.coverImage[0]?.path;

  if (!avatarLocalpath) {
    throw new Apierror(400, 'avatar is required');
  }

  //upload them to cloudinary ,avatar
  const avatar = await uploadoncloudinary(avatarLocalpath);
  const coverimage = await uploadoncloudinary(coverImageLocalpath);

  if (!avatar) {
    throw new Apierror(400, 'avatar is required');
  }
  //create user object - create entry in db
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverimage?.url || '',
    email,
    password,
    username: username.toLowercase(),
  });

  //remove passward and refresh token from response
  const idUserCreated = await User.findById(user._id).select(
    '-password -refreshToken'
  );
  //chech for user creation
  if (!idUserCreated) {
    throw new Apierror(500, 'Something want wrong while registrig the user ');
  }
  //return res
  return res
    .status(201)
    .json(new ApiResponse(200, idUserCreated, 'User registered Succesfully'));
});

export { registerUser };
