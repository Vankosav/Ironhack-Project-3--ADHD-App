const express = require("express");
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const {isAuthenticated} = require('../middleware/jwt.middleware')
// const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { getNotes, createNotes, updateNote, deleteNote } = require("../controllers/notesController.js");

const { getProject, createProject, updateProject, deleteProject } = require("../controllers/projectController.js");




router.route("/notes").get(isAuthenticated, getNotes);
console.log('Request reached /dashboard endpoint');
router.route("/notes").post(isAuthenticated, createNotes);
console.log('Request reached /dashboard endpoint');
router.route("/notes/:id").put(isAuthenticated, updateNote).delete(isAuthenticated, deleteNote);
console.log('Request reached /dashboard endpoint');

router.route("/project").get(isAuthenticated, getProject);
console.log('Request reached /dashboard endpoint');
router.route("/project").post(isAuthenticated, createProject);
console.log('Request reached /dashboard endpoint');
router.route("/project/:id").put(isAuthenticated, updateProject).delete(isAuthenticated, deleteProject);
console.log('Request reached /dashboard endpoint');


module.exports = router;