import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(
    "mongodb+srv://borhan:borhan88@cluster0.wzcd4.mongodb.net/happyLiving?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
