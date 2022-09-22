const { model } = require("mongoose");
const {Author, Book} = require("../model/model");

const authorController = {
    //ADD AUTHOR
    addAuthor: async(req, res) =>{
        try {
            const newAuthor = new Author(req.body);
            const saveAuthor = await newAuthor.save();
            res.status(200).json(saveAuthor);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //get all author
    getAllAuthors: async(req,res) => {
        try {
            const authors = await Author.find();
            res.status(200).json(authors);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //get an author
    getAnAuthor: async(req, res) => {
        try {
            const author = await Author.findById(req.params.id).populate("books");
            res.status(200).json(author);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //update author
    updateAuthor: async(req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            await author.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (err) {
            res.status(500).json(err);
            throw new Error('Update failed');
        }
    },
    deleteAuthor: async(req, res) => {
        try {
            await Book.updateMany({author: req.params.id}, {author: null});
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = authorController;