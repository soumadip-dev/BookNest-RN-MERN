import cloudinary from '../config/cloudinary.config.js';

//* Controller to create a new Book
const createBook = async (req, res) => {
  try {
    // Get all fields from request body
    const { title, caption, rating, image } = req.body;

    // Check if all fields are present or not
    if (!title || !caption || !rating || !image) {
      throw new Error('All fields are required');
    }

    // Upload the image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    // Create a new book
    const newBook = await Book.create({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id,
    });

    // Save the book to the database
    await newBook.save();

    // Send success response
    res.status(201).json({
      book: newBook,
      message: 'Book created successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error in create book route', error);
    res.status(400).json({
      message: error.message || 'Something went wrong',
      success: false,
    });
  }
};
