const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("./config/db");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

//* task route called.
const taskRoute = require("./routes/tasks-route");
const bookRoute = require("./routes/books-route");

app.use("/api/task/", taskRoute);
app.use("/api/book/", bookRoute);

app.listen(process.env.PORT, () =>
    console.log("server is running on port 2022..")
);