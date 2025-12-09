const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
const appError = require("./Utils/appError");
app.use(express.json());



const routes = require("./Routes/routes");



app.use(morgan("dev"));
app.use('/api/v1/', routes);

app.use((err, req, res, next) => {
    err.message = err.message || "Something Went Wrong";
    err.statusCode = err.statusCode || 500;
    if (err.code === 11000) {
        console.log(err);
        const statusCode = 400;
        const message = "Duplicate Field Value Entered";
        err = new appError(message, statusCode);
    }

    if (err.name === "JsonWebTokenError") {
        const statusCode = 400;
        const message = "Invalid JSON web token";
        err = new appError(message, statusCode);
    }

    if (err.name === "TokenExpiredError") {
        const statusCode = 400;
        const message = "Expired JSON web token";
        err = new appError(message, statusCode);
    }

    if (err.name === "CastError") {
        const statusCode = 400;
        const message = `Resource Not Found. Invalid Path : ${err.path}`;
        err = new appError(message, statusCode);
    } else {
        const statusCode = err.statusCode || 401;
        const message = err.message || "Something went wrong !!";
        err = new appError(message, statusCode);
    }
    const errorMessage = err.errors
        ? Object.values(err.errors)
            .map((error) => error.message)
            .join(" ")
        : err.message;

    res.status(err.statusCode).json({
        status: "Failed",
        message: errorMessage,
    });
});

module.exports = app;