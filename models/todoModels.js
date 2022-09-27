import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a text"],
    unique: true,
    maxlength: [40, "Title cannot be more than 40 characters"],
  },
});

module.exports = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
