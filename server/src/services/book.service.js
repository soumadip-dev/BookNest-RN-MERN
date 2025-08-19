import cloudinary from '../config/cloudinary.config.js';
import Book from '../models/Book.model.js';
const createBookService = async (title, caption, rating, image) => {
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

  return newBook;
};

export { createBookService };
