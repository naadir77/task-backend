const express = require("express");
const router = express.Router();
const task = require("../controllers/task");

router.post("/create", task.create);
router.get("/list", task.list);
router.put("/update/:id", task.update);
router.delete("/delete/:id", task.del);

module.exports = router;