require('dotenv').config();
const mongoose = require("mongoose");
const url = process.env.DB_URL

const coonectDb = async () => {
    console.log(url, '6::')
    try {
        await mongoose.connect(url);
        console.log("succesfully connect  db", url)
    }
    catch (error) {
        console.log(error, '12::')
    }
}

module.exports = coonectDb;