import { loginService, registerService } from '../services/auth.service.js';

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

    // Login User
    const { user, token } = await loginService(email, password);

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
