import { registerService } from '../services/auth.service.js';

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

const loginUser = async (req, res) => {
  // implement login logic
};

export { registerUser, loginUser };
