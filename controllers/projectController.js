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

    console.log("im at least trying to update")
    const { arrayName, index , projectIdD, moveTo } = req.body;
    console.log(arrayName, index , projectIdD, moveTo)
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
    const project = await Project.findById(projectIdD);

    console.log(project)
  
    if (project.owner.toString() !== req.user._id.toString()) {
      res.status(401);
    throw new Error("You can't perform this action")
    }
    if (project) {
        if(arrayName=="lowPriority"&& moveTo=="R" ){

            const elementToMove = project.lowPriority[index]
            project.lowPriority.splice(index, 1)
            project.mediumPriority.push(elementToMove);

        }
        if(arrayName=="mediumPriority"&& moveTo=="R" ){

            const elementToMove = project.mediumPriority[index]
            project.mediumPriority.splice(index, 1)
            project.hightPriority.push(elementToMove);

        }
        if(arrayName=="mediumPriority"&& moveTo=="L" ){

            const elementToMove = project.mediumPriority[index]
            project.mediumPriority.splice(index, 1)
            project.lowPriority.push(elementToMove);

        }
        if(arrayName=="hightPriority"&& moveTo=="L" ){

            const elementToMove = project.hightPriority[index]
            project.hightPriority.splice(index, 1)
            project.mediumPriority.push(elementToMove);

        }



    

        const updatedNote = await project.save();
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