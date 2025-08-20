import Book from '../models/Book.model.js';
import { createBookService, getPaginatedBooksService } from '../services/book.service.js';

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

    // Get paginated books
    const { books, totalBooks } = await getPaginatedBooksService(page, limit);

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

//* Controller to delete all books
const deleteBook = async (req, res) => {
  try {
    // Get the id from request params
    const { id } = req.params;

    // Check if id is provided or not
    if (!id) {
      throw new Error('Id is required');
    }

    // find the book by id
    const book = await Book.findById(id);

    // Check if book is found or not
    if (!book) {
      throw new Error('Book not found');
    }

    // Check if the user is the owner of the book or not
    if (book.user.toString() !== req.user._id.toString()) {
      throw new Error('Unauthorized');
    }

    // Delete the image from cloudinary
    if (book.image && book.image.includes('cloudinary')) {
      try {
        const publicId = book.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (delError) {
        console.error('Error in deleting image from cloudinary', delError);
      }
    }
    // Delete the book
    await book.deleteOne();

    // Send success response
    res.status(200).json({ message: 'All books deleted successfully', success: true });
  } catch (error) {
    console.error('Error in delete all books route', error);
    res.status(400).json({ message: error.message || 'Something went wrong', success: false });
  }
};

export { createBook, getAllBooks, deleteBook };
