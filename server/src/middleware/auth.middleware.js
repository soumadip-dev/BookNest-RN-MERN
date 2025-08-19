import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config.js';
import User from '../models/User.model.js';

//* Middleware for user authentication
const protectRoute = async (req, res, next) => {
  try {
    // Get the token
    const token = req.header('Authorization').replace('Bearer ', '');

    // If no token is present, respond with 401 Unauthorized
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. Login again', success: false });
    }
    // Verify the token using the secret key
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    // If the token is not valid, respond with 401 Unauthorized
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized. Login again', success: false });
    }

    // Find the user in the database based on the user ID in the token
    const user = await User.findById(decoded.userId).select('-password');

    // If the user is not found, respond with 401 Unauthorized
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized. Login again', success: false });
    }

    // Attach the user object to the request object for later use in the route handler
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in auth middleware', error);
    res.status(400).json({ message: error.message || 'Something went wrong', success: false });
  }
};

export { protectRoute };
