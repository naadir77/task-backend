const mongoose = require("mongoose");
try {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connected To Database");
        })
        .catch((err) => console.log("Unable To Connect...!", err));
} catch (error) {
    console.log("500 erro occurs in the server", error);
}