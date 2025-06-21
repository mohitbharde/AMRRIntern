import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String, required: true },
  images: { type: [String], default: [] },
});

const ItemModel = mongoose.model("Item", ItemSchema);
export default ItemModel;
