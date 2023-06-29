const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    surname: {
      type: String,
      required: [true, "Surname is required."],
    },
    role: {
      type: String,
      enum: ["user", "student", "teacher"],
      required: true,
    },
    projects: {
      type: [],
    },
    notesList: {
      type: [],
    },
    pomodoro: {
      type: Number,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
