import dbConnect from "../../database/dbConnect";
import Todo from "../../models/todoModels";

dbConnect();

export default async function todo(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const id = req.body.id;
        const note = await Todo.findOne({ _id: id });
        res.status(200).json({ success: true, data: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
