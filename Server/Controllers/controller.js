const catchAsync = require("../Utils/catchAsync");
const model = require("../Models/dataModel");
const AppError = require("../Utils/appError");

exports.create = catchAsync(async (req, res, next) => {
    console.log(req.body.name);
    const dataModel = await model.create(req.body);
    if (!dataModel) {
        return next(new AppError("Please enter all fields", 400));
    }
    res.status(201).json({
        status: "success",
        data: dataModel
    });
});

exports.getData = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = await model.findById(id);
    console.log(data);
    if (!data) {
        res.status(401).json({
            status: 'fail',
            message: 'No data Found'
        });
    }
    else {
        res.status(201).json({
            status: "success",
            data
        })
    }
})

exports.getModel = catchAsync(async (req, res, next) => {
    const data = await model.find();
    res.status(201).json({
        status: "success",
        data
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = await model.findByIdAndUpdate(id, req.body);
    res.status(201).json({
        status: "success",
        data
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const data = await model.findByIdAndDelete(id);
    res.status(204).json({
        status: "success",
        data
    });
});
