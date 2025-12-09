import { Inventory } from "../models/inventory.model.js";

export const InventoryRepo = {
  getAllInventory: () => Inventory.find(),
  getInventoryById: (inventoryId) => Inventory.findById(inventoryId),
  getInventoryByRoommate: (roommateId) =>
    Inventory.find({ belongsTo: roommateId }).populate("belongsTo"),
  createInventory: (data) => Inventory.create(data),
  updateInventory: (inventoryId, inventoryData) =>
    Inventory.findByIdAndUpdate(inventoryId, inventoryData).then((res) =>
      InventoryRepo.getInventoryById(res.id)
    ),
  deleteInventory: (inventoryId) => Inventory.findByIdAndDelete(inventoryId),
};
