const { Schema, model } = require("mongoose");

const notesSchema = new Schema(
  {
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
      type: String,
      enum: ["Private", "School", "Work", "Other"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Notes = model("Notes", notesSchema);

module.exports = Notes;