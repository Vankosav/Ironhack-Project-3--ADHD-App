const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    body: {
      type: String
    },
    urgency:{
        type:Number,
        required: true
    }
  });
  

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const projectSchema = new Schema(
  {
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toDo: {
      type: Array,
      timestamps: true
    },
    pending: {
        type: Array,
        timestamps: true
    },
    completed:{
        type: Array,
        timestamps: true
    },
    notes: {
        type: [noteSchema],
      },
    teacherMessages:{
      type: String
    }
    

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;
