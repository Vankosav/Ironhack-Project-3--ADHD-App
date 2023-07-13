const jwt = require("jsonwebtoken");
const Notes = require("../models/Notes.model");
const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");

const getNotes = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = await User.findById(decoded._id).select("-password");
    const notes = await Notes.find({ owner: req.user._id }); 
    res.json(notes);
});

const createNotes = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = await User.findById(decoded._id).select("-password");

    const note = new Notes({ owner: req.user._id, title, content });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

module.exports = { getNotes, createNotes };
