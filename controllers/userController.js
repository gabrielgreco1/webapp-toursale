const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
  );
  
exports.getAllUsers = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yer defined!"
    })
}
exports.createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yer defined!"
    })
}
exports.getUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yer defined!"
    })
}
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yer defined!"
    })
}
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yer defined!"
    })
}