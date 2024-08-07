import { Book } from "../models/book.models.js";
import { User } from "../models/user.models.js";
import { Genre } from "../models/genre.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponses.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createBook = asyncHandler(async (req, res) => {
  const { bookName, ownerName, description, authorName, genre } = req.body;
  console.log(bookName, ownerName, description, authorName, "hereeee");

  //validate
  if (!bookName || !ownerName || !description || !authorName || !genre) {
    throw new ApiError(400, "All Fields are required!");
  }

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover Image required!");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage) {
    throw new ApiError(400, "Cover Image required!");
  }

  const owner = await User.findById(ownerName);
  if (!owner) {
    throw new ApiError(400, "Owner does not exist !");
  }
  console.log(genre)
  let existingGenre = await Genre.findOne({genreName:genre});
  console.log(existingGenre)
  if (!existingGenre) {
    const newGenre = new Genre({genreName:genre});
    const existingGenre = await newGenre.save();
  }
  console.log(existingGenre)
  const newBook = await Book.create({
    bookName,
    ownerName,
    description,
    coverImage: coverImage?.url || "",
    authorName,
    genre: existingGenre._id,
  });

  await newBook.save();

  const updatedUser = await User.findByIdAndUpdate(
    { _id: ownerName },
    { $push: { book: newBook } },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, createBook, updatedUser, "Book Created Successfully")
    );
});

const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(400, "Book not found!");
  }

  await Book.findByIdAndDelete(id);

  await User.findByIdAndUpdate(
    book.ownerName,
    { $pull: { books: id } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Book deleted succcessfully!"));
});

const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    bookName,
    authorName,
    description,
    coverImage,
    publishDate,
    status,
    genre,
  } = req.body;

  const updatedBook = await Book.findByIdAndUpdate(
    id,
    {
      bookName,
      authorName,
      description,
      coverImage,
      publishDate,
      status,
      genre,
    },
    { new: true }
  );

  if (!updatedBook) {
    throw new ApiError(200, "Book not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedBook, "Book updated succesfully"));
});

const getBookByItsID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    throw new ApiError(400, "Book not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, book, "Book fetched successfully!"));
});

const getAllBooks = asyncHandler(async (req, res) => {});

export { createBook, deleteBook, updateBook, getBookByItsID, getAllBooks };
