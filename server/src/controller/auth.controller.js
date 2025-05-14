import User from '../models/User.model.js';
import { registerService } from '../services/auth.service.js';
import { generateToken, isValidEmail } from '../utils/helper.utils.js';

//* Controller to register a new user
const registerUser = async (req, res) => {
  try {
    // Get fields from request body
    const { username, email, password } = req.body;

    // Register user
    const { newUser, token } = await registerService(username, email, password);

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
    console.error('Error in register route', error);
    res.status(400).json({
      message: error.message || 'Something went wrong',
      success: false,
    });
  }
};

//* Controller to login a user
const loginUser = async (req, res) => {
  try {
    // Get fields from request body
    const { email, password } = req.body;

    // Check if all fields are provided or not
    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
        success: false,
      });
    }

    // Check if email is valid or not
    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: 'Email is not valid',
        success: false,
      });
    }

    // Find the user based on email
    const user = await User.findOne({ email });

    // Check if user exists or not
    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials',
        success: false,
      });
    }

    // Check if password is correct or not
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
      return res.status(400).json({
        message: 'Invalid credentials',
        success: false,
      });

    const token = generateToken(user._id);

    // Send success response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
      message: 'User logged in successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error in login route', error);
    res.status(400).json({
      message: error.message || 'Something went wrong',
      success: false,
    });
  }
};

export { registerUser, loginUser };
