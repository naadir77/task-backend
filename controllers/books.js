const Book = require("../models/books");
const _ = require("lodash");

const create = async(req, res) => {
    console.log(req.body);
    const book = await new Book(
        _.pick(req.body, ["bookTitle", "bookPrice", "description"])
    );
    try {
        await book.save();
        return res
            .status(201)
            .send(_.pick(book, ["bookTitle", "bookPrice", "description"]));
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

const list = async(req, res) => {
    //* we use it only we want to show single Book /per use.
    // const _id = req.params.id;
    // { _id }

    try {
        const book = await Book.find();
        if (!book) return res.status(400).json({ msg: "Book not found" });

        return res.status(200).json({ book });
    } catch (error) {
        return res.status(500).json({ message: "Book could not found", error });
    }
};

const update = async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["bookTitle", "bookPrice", "description"];
    const isValidUpdate = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    const _id = req.params.id;

    if (!isValidUpdate)
        return res.status(400).send({ Error: "Invalid updates.!" });

    try {
        const book = await Book.findOne({ _id });
        if (!book) return res.status(400).send("Oops Not founded !!");

        updates.forEach((update) => (book[update] = req.body[update]));
        await book.save();
        res
            .status(200)
            .send(_.pick(book, ["bookTitle", "bookPrice", "description"]));
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

const del = async(req, res) => {
    const _id = req.params.id;
    try {
        const book = await Book.findByIdAndRemove({ _id });
        if (!book) return res.status(200).json({ message: "Book not found" });

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(400).json(err.message);
    }
};

module.exports = {
    create,
    list,
    update,
    del,
};