import mongoose from "mongoose";
import { Roommate } from "../models/roommate.model.js";
import { Inventory } from "../models/inventory.model.js";

export const RoommateRepo = {
  getAllRoommates: () => Roommate.find(),
  getRoommateById: async (roommateId) => {
    const inventories = await Inventory.find({
      belongsTo: new mongoose.Types.ObjectId(roommateId),
    });

    return { inventories, roommate: await Roommate.findById(roommateId) };
  },
  createRoommate: (data) => Roommate.create(data),
  updateRoommate: (roommateId, roommateData) =>
    Roommate.findByIdAndUpdate(roommateId, roommateData).then((res) =>
      RoommateRepo.getRoommateById(res.id)
    ),
  deleteRoommate: async (roommateId) => {
    let inv = await Inventory.deleteMany({
      belongsTo: new mongoose.Types.ObjectId(roommateId),
    });
    return Roommate.findByIdAndDelete(roommateId);
  },
};
