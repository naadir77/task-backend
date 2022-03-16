const express = require("express");
const router = express.Router();
const book = require("../controllers/books");

router.post("/create", book.create);
router.get("/list", book.list);
router.put("/update/:id", book.update);
router.delete("/delete/:id", book.del);

module.exports = router;