import Book from '../models/Book.model.js';
import { createBookService } from '../services/book.service.js';

//* Controller to create a new Book
const createBook = async (req, res) => {
  try {
    // Get all fields from request body
    const { title, caption, rating, image } = req.body;

    // Create a new book
    const newBook = await createBookService(title, caption, rating, image);

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

//* Controller to get all books (paginated)
const getAllBooks = async (req, res) => {
  try {
    // Get the page number and limit from query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    // Calculate the skip value
    const skip = (page - 1) * limit;

    // Get all books
    const books = await Book.find()
      .skip(skip)
      .limit(limit)
      .populate('user', 'username profileImage');

    // Calculate total books
    const totalBooks = await Book.countDocuments();

    // Send success response with pagination data
    res.status(200).json({
      books,
      totalBooks,
      currentOage: page,
      totalPages: Math.ceil(totalBooks / limit),
      message: 'Books fetched successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error in get all books route', error);
    res.status(400).json({
      message: error.message || 'Something went wrong',
      success: false,
    });
  }
};

export { createBook, getAllBooks };
