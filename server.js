const express = require("express");
const morgan = require("morgan");
// const cors = require("cors");
// require("./config/db");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
// app.use(cors());

const port = process.env.PORT || 5000;

//* task route called.
// const taskRoute = require("./routes/tasks-route");
// const bookRoute = require("./routes/books-route");

// app.use("/api/task/", taskRoute);
// app.use("/api/book/", bookRoute);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () =>
    console.log(`server is running on port ${process.env.PORT}`)
);