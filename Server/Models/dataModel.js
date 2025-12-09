const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    phoneNo: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const dataModel = mongoose.model("Data", dataSchema);

module.exports = dataModel;