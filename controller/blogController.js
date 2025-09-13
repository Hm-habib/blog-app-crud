const { ObjectId } = require("mongodb");
const blogModel = require('../model/blogModel')
const express = require("express");
const router = express.Router();

const runStart =  (req, res) => {
    res.render('index')

}



module.exports= { runStart }