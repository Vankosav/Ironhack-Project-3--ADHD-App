const { Schema, model } = require("mongoose");

/* const noteSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
  );
   */

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const projectSchema = new Schema(
  {
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name:{
      type: String,
      required: true

    },
    lowPriority: {
      type: Array,
      timestamps: true
    },
    mediumPriority: {
        type: Array,
        timestamps: true
    },
    hightPriority:{
        type: Array,
        timestamps: true
    },
    notes: {
      type: Array,
      },
    teacherMessages:{
      type: String
    }
    

  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;