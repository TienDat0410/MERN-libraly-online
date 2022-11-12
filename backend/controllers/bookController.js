const { model } = require("mongoose");
const { Author, Book } = require("../model/model");
const asynchHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const authMiddlware = require('../middlewares/authMiddleware');
const authTokenGenerator = require('../utils/generateToken');
const cloudinary = require('cloudinary').v2;

const bookController = {
    //add a book
    addABook: async (req, res) => {
        try {
            //Grab the user from the req.user
            const userId = req.user._id;
            //
            let book_img = [];
            if (typeof req.body.book_img === "string") {
                book_img.push(req.body.book_img);
            } else {
                book_img = req.body.book_img;
            }

            let bookImgLinks = [];
            let result;

            for (let i = 0; i < book_img.length; i++) {
                result = await cloudinary.uploader.upload(book_img[i], {
                    folder: "books",
                });

                bookImgLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            req.body.book_img = bookImgLinks;

            const book = await Book.create({
                book_name: req.body.book_name,
                publishedDate: req.body.publishedDate,
                genres: req.body.genres,
                author: req.body.author,
                unitPrice: req.body.unitPrice,
                stock: req.body.stock,
                book_img: [{
                    public_id: result.public_id,
                    url: result.secure_url,
                }],
                createdBy: userId,
            });
            // const book = await Book.create(req.body);

            if (req.body.author) {
                // const author = Author.find({_id: req.body.author});
                const author = Author.findById(req.body.author);
                await author.updateOne({ $push: { books: book._id } });
            }
            res.status(201).json({
                success: true,
                book,
            });
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    //get all book
    getAllBooks: async (req, res) => {
        try {
            const allBooks = await Book.find();
            res.status(200).json(allBooks);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //get a book detail
    getABook: async (req, res) => {
        try {
            // const book = await Book.findById(req.params.id).populate("author");
            const book = await Book.findById(req.params.id).populate("author");
            res.status(200).json({
                success: true,
                book,
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //update book
    updateBook: async (req, res, next) => {
        try {
            let book = await Book.findById(req.params.id);

            if (!book) {
                return next(new ErrorHandler("book not found", 404));
            }

            let book_img = [];
            if (typeof req.body.book_img === "string") {
                book_img.push(req.body.book_img);
            } else {
                book_img = req.body.book_img;
            }

            if (book_img !== undefined) {
                // Deleting book_img associated with the product
                for (let i = 0; i < book.book_img.length; i++) {
                  const result = await cloudinary.uploader.destroy(
                    book.book_img[i].public_id
                  );
                }
            
                let imagesLinks = [];
            
                for (let i = 0; i < book_img.length; i++) {
                  const result = await cloudinary.uploader.upload(book_img[i], {
                    folder: "books",
                  });
            
                  imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                  });
                }
            
                req.body.book_img = imagesLinks;
              }



            // const book = await Book.findById(req.params.id);
            book = await Book.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            });

            // await book.updateOne({$set: req.body});
            res.status(200).json({
                success: true,
                book,
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteBook: async (req, res) => {
        try {
            await Author.updateMany({ books: req.params.id },
                { $pull: { books: req.params.id } });
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = bookController;