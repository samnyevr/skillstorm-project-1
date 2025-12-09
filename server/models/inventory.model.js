import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemCount: {
    type: Number,
    required: true,
  },
  itemDescription: {
    type: String,
  },
  belongsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roommate",
  },
});

export const Inventory = mongoose.model("Inventory", inventorySchema);
