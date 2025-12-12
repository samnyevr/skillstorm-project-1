import mongoose from "mongoose";
import { Roommate } from "../models/roommate.model.js";
import { Inventory } from "../models/inventory.model.js";

export const InventoryRepo = {
  getAllInventory: () => Inventory.find(),
  getInventoryById: (inventoryId) => Inventory.findById(inventoryId),
  getInventoryByRoommate: (roommateId) =>
    Inventory.find({ belongsTo: roommateId }).populate("belongsTo"),
  getInventoryByFind: async (word) => {
    const inventories = await Inventory.find({
      $or: [
        { itemName: { $regex: word, $options: "i" } },
        { itemDescription: { $regex: word, $options: "i" } },
      ],
    });
    return inventories;
  },
  getInventoryByFilter: async (query) => {},
  createInventory: async (data) => {
    // checking for duplicates
    const inventoryList = await Inventory.findOne({
      itemName: data.itemName,
      belongsTo: new mongoose.Types.ObjectId(data.belongsTo),
    });
    if (inventoryList) {
      return await InventoryRepo.updateInventory(inventoryList._id.toString(), {
        itemCount: Number(data.itemCount) + Number(inventoryList.itemCount),
      });
    }
    return Inventory.create(data);
  },
  updateInventory: (inventoryId, inventoryData) =>
    Inventory.findByIdAndUpdate(inventoryId, inventoryData).then((res) =>
      InventoryRepo.getInventoryById(res.id)
    ),
  deleteInventory: (inventoryId) => Inventory.findByIdAndDelete(inventoryId),
};
