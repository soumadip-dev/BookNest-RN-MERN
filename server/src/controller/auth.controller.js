import { isStrongPassword, isValidEmail, generateToken } from '../utils/helper.utils.js';
import User from '../models/User.model.js';

//* Controller to register a new user
const registerUser = async (req, res) => {
  try {
    // Get fields from request body
    const { username, email, password } = req.body;

    // Check if all fields are provided or not
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    // Check if email is valid or not
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Email is not valid', success: false });
    }

    // Check if password is strong or not
    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password is not strong enough', success: false });
    }

    // Check if username is at least 3 characters long
    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: 'Username must be at least 3 characters long', success: false });
    }

    // Check if user already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists', success: false });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists', success: false });
    }

    // Set a random profile image for the user from https://avatars.dicebear.com
    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password,
      profileImage,
    });

    if (!newUser) {
      return res.status(400).json({ message: 'User cannot be created', success: false });
    }

    // Save the user to the database
    await newUser.save();

    // Generate a JWt token
    const token = generateToken(newUser._id);

    // Send success response
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profileImage: newUser.profileImage,
        createdAt: newUser.createdAt,
      },
      message: 'User registered successfully',
      success: true,
    });
  } catch (error) {
    console.log('Error in register route', error);
    res.status(400).json({ message: error.message || 'Something went wrong', success: false });
  }
};

//* Controller to login a user
const loginUser = async (req, res) => {};

export { registerUser, loginUser };
