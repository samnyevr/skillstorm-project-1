import mongoose from "mongoose";
import { Inventory } from "../models/inventory.model.js";

/**
 * Repository layer for inventory data access.
 */
export const InventoryRepo = {
  /**
   * Get all inventory items.
   * @returns {Promise<Array>} Array of all inventory documents
   */
  getAllInventory: () => Inventory.find(),

  /**
   * Get a single inventory item by ID.
   * @param {string} inventoryId - Inventory item ID
   * @returns {Promise<Object|null>} Inventory document or null if not found
   */
  getInventoryById: (inventoryId) => Inventory.findById(inventoryId),

  /**
   * Get all inventory items belonging to a specific roommate.
   * @param {string} roommateId - Roommate ID
   * @returns {Promise<Array>} Array of inventory documents with populated `belongsTo` field
   */
  getInventoryByRoommate: (roommateId) =>
    Inventory.find({ belongsTo: roommateId }).populate("belongsTo"),

  /**
   * Find inventory items by a search keyword (name or description).
   * @param {string} word - Keyword to search
   * @returns {Promise<Array>} Array of matching inventory documents
   */
  getInventoryByFind: async (word) => {
    const inventories = await Inventory.find({
      $or: [
        { itemName: { $regex: word, $options: "i" } },
        { itemDescription: { $regex: word, $options: "i" } },
      ],
    });
    return inventories;
  },

  /**
   * Filter inventory items by query parameters.
   * @param {Object} query - Query object (field/value pairs)
   * @returns {Promise<Array>} Array of filtered inventory documents
   */
  getInventoryByFilter: async (query) => {
    const inventories = await Inventory.find({
      itemCount: { $gt: query },
    });
    console.log(inventories);
    return inventories;
  },

  /**
   * Create a new inventory item. If an item with the same name exists for the roommate, it updates the count.
   * @param {Object} data - Inventory data { itemName, itemCount, itemDescription, belongsTo }
   * @returns {Promise<Object>} Created or updated inventory document
   */
  createInventory: async (data) => {
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

  /**
   * Update an inventory item by ID.
   * @param {string} inventoryId - Inventory item ID
   * @param {Object} inventoryData - Fields to update
   * @returns {Promise<Object>} Updated inventory document
   */
  updateInventory: (inventoryId, inventoryData) =>
    Inventory.findByIdAndUpdate(inventoryId, inventoryData).then((res) =>
      InventoryRepo.getInventoryById(res.id)
    ),

  /**
   * Delete an inventory item by ID.
   * @param {string} inventoryId - Inventory item ID
   * @returns {Promise<Object|null>} Deleted inventory document or null if not found
   */
  deleteInventory: (inventoryId) => Inventory.findByIdAndDelete(inventoryId),
};
