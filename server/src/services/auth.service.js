import { isStrongPassword, isValidEmail, generateToken } from '../utils/helper.utils.js';
import User from '../models/User.model.js';

//* Service to register a new user
const registerService = async (username, email, password) => {
  // Check if all fields are provided or not
  if (!username || !email || !password) {
    throw new Error('All fields are required');
  }

  // Check if email is valid or not
  if (!isValidEmail(email)) {
    throw new Error('Email is not valid');
  }

  // Check if password is strong or not
  if (!isStrongPassword(password)) {
    throw new Error('Password is not strong enough');
  }

  // Check if username is at least 3 characters long
  if (username.length < 3) {
    throw new Error('Username must be at least 3 characters long');
  }

  // Check if user already exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error('Email already exists');
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new Error('Username already exists');
  }

  // Set a random profile image for the user from https://avatars.dicebear.com
  const profileImage = `https://api.dicebear.com/9.x/open-peeps/svg?seed=${username}`;

  // Create a new user
  const newUser = await User.create({
    username,
    email,
    password,
    profileImage,
  });

  // Save the user to the database
  await newUser.save();

  // Generate a JWt token
  const token = generateToken(newUser._id);

  return { newUser, token };
};

//* Service to login a user
const loginService = async (email, password) => {
  // Check if all fields are provided or not
  if (!email || !password) {
    throw new Error('All fields are required');
  }

  // Check if email is valid or not
  if (!isValidEmail(email)) {
    throw new Error('Email is not valid');
  }

  // Find the user based on email
  const user = await User.findOne({ email });

  // Check if user exists or not
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check if password is correct or not
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new Error('Invalid credentials');

  const token = generateToken(user._id);

  return { user, token };
};

export { registerService, loginService };
