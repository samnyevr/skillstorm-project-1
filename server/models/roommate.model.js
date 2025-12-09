import mongoose from "mongoose";

const roommateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalStorage: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

export const Roommate = mongoose.model("Roommate", roommateSchema);
