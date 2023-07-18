const jwt = require("jsonwebtoken");
const Notes = require("../models/Notes.model");
const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");
const Project = require("../models/Projects.model");

const getProject = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("im at least trying")

    req.user = await User.findById(decoded._id).select("-password");
    const project = await Project.find({ owner: req.user._id }); 
    res.json(project);
});

const createProject = asyncHandler(async (req, res) => {
  const { name,lowPriority, mediumPriority, hightPriority, } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = await User.findById(decoded._id).select("-password");

    const project = new Project({ owner: req.user._id, name, lowPriority, mediumPriority, hightPriority, });

    const createdNote = await project.save();

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

const updateProject = asyncHandler(async (req, res) => {
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
  
  const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
    console.log("im at least trying")
    if (project.owner.toString() !== req.user._id.toString()) {
        res.status(401);
        console.log("im at least erroring there")
      throw new Error("You can't perform this action")
      }
      if (project) {
        console.log("im at least almost there")
        await project.deleteOne();
        res.json({ message : "Note Removed"})
      }
  })

module.exports = { getProject, createProject, updateProject, deleteProject };
