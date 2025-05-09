import cloudinary from '../config/cloudinary.config.js';
import Book from '../models/Book.model.js';

//* Service to create a new book
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

//* Service to get paginated books
const getPaginatedBooksService = async (page, limit) => {
  // Calculate the skip value
  const skip = (page - 1) * limit;

  // Get all books
  const books = await Book.find().skip(skip).limit(limit).populate('user', 'username profileImage');

  // Calculate total books
  const totalBooks = await Book.countDocuments();

  // Return the books
  return { books, totalBooks };
};

export { createBookService, getPaginatedBooksService };
