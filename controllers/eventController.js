const jwt = require("jsonwebtoken");
const Event = require("../models/Events.model");
const asyncHandler = require("express-async-handler");
const User = require("../models/User.model");

/*const getOneEvent = asyncHandler(async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  
      req.user = await User.findById(decoded._id).select("-password");
  
      const eventId = req.params.eventId;
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });*/
  


const getEvents = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = await User.findById(decoded._id).select("-password");
    const events = await Event.find({ owner: req.user._id }); 
    res.json(events);
});

const createEvents = asyncHandler(async (req, res) => {
  const { title, start, end, location } = req.body;

  if (!title || !start) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = await User.findById(decoded._id).select("-password");

    const event = new Event({ owner: req.user._id, title, start, end, location });

    const createdEvent = await event.save();

    res.status(201).json(createdEvent);
  }
});

const getOneEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message : "Note not found!"})
  }
});

const updateEvent = asyncHandler(async (req, res) => {
    const { title, start, end, location } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
  
    const event = await Event.findById(req.params.id);
  
    if (event.owner.toString() !== req.user._id.toString()) {
        res.status(401);
      throw new Error("You can't perform this action")
      }
      if (event) {
          event.title = title;
          event.start = start; 
          event.end = end;
          event.location = location; 
  
          const updatedEvent = await event.save();
          res.json(updatedEvent); 
      }
    })
  
  
  
  const deleteEvent = asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
  
    if (event.owner.toString() !== req.user._id.toString()) {
        res.status(401);
      throw new Error("You can't perform this action")
      }
      if (event) {
        await event.deleteOne();
        res.json({ message : "Event Deleted"})
      }
  })

module.exports = { getEvents, getOneEvent, createEvents, updateEvent, deleteEvent };
