const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { getNotes, createNotes, updateNote, deleteNote } = require("../controllers/notesController");



router.route("/dashboard").get(isAuthenticated, getNotes);
console.log('Request reached /dashboard endpoint');
router.route("/dashboard").post(isAuthenticated, createNotes);
console.log('Request reached /dashboard endpoint');
router.route("/dashboard/:id").put(isAuthenticated, updateNote).delete(isAuthenticated, deleteNote);
console.log('Request reached /dashboard endpoint');


module.export = router; 