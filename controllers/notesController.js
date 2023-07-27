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
  const { title, content, date } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = await User.findById(decoded._id).select("-password");

    const sentences = content.split('\n').map(sentence => sentence.trim());

    const note = new Notes({ owner: req.user._id, title, content: sentences, date });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

/*const getOneNote = asyncHandler(async (req, res) => {
  const note = await Notes.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message : "Note not found!"})
  }
});*/

const updateNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
    const note = await Notes.findById(req.params.id);
  
    if (note.owner.toString() !== req.user._id.toString()) {
      res.status(401);
    throw new Error("You can't perform this action")
    }
    if (note) {
        note.title = title;
        note.content = content; 

        const updatedNote = await note.save();
        res.json(updatedNote); 
    }
  })
  
  const deleteNote = asyncHandler(async (req, res) => {
    const note = await Notes.findById(req.params.id);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
  
    if (note.owner.toString() !== req.user._id.toString()) {
        res.status(401);
      throw new Error("You can't perform this action")
      }
      if (note) {
        await note.deleteOne();
        res.json({ message : "Note Removed"})
      }
  })

module.exports = { getNotes, createNotes, updateNote, deleteNote };
