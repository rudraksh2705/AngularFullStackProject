const mongoose = require("mongoose");
const app = require("./index");
console.log(process.env.PORT , " end");
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});

mongoose.connect("mongodb://127.0.0.1:27017/InfoDatabase").then(console.log("MongoDB connected"));