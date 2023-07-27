const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
  title: { 
    type: String, 
    required: true 
},
  start: { 
    type: Date, 
    required: true 
},
  end: { 
    type: Date 
},
  location: { 
    type: String 
},
}
);

const Event = model("Event", eventSchema);

module.exports = Event;
