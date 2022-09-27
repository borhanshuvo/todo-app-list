import dbConnect from "../../database/dbConnect";
import Todo from "../../models/todoModels";

dbConnect();

export default async function todo(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const notes = await Todo.find({}).sort({
          createdAt: -1,
        });
        res.status(200).json({ success: true, data: notes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const todo = new Todo(req.body);
        const note = await todo.save();

        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const id = req.body.id;
        const result = await Todo.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const id = req.body.id;
        const note = await Todo.findByIdAndDelete({
          _id: id,
        });
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
