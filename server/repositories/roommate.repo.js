import mongoose from "mongoose";
import { Roommate } from "../models/roommate.model.js";
import { Inventory } from "../models/inventory.model.js";

/**
 * Repository layer for roommate data access.
 */
export const RoommateRepo = {
  /**
   * Get all roommates.
   * @returns {Promise<Array>} Array of roommate documents
   */
  getAllRoommates: () => Roommate.find(),

  /**
   * Get a roommate by ID along with their inventory items.
   * @param {string} roommateId - Roommate ID
   * @returns {Promise<Object>} Object containing { roommate, inventories }
   */
  getRoommateById: async (roommateId) => {
    const inventories = await Inventory.find({
      belongsTo: new mongoose.Types.ObjectId(roommateId),
    });

    return { inventories, roommate: await Roommate.findById(roommateId) };
  },

  /**
   * Create a new roommate.
   * @param {Object} data - Roommate data { name, location, description, totalStorage }
   * @returns {Promise<Object>} Created roommate document
   */
  createRoommate: (data) => Roommate.create(data),

  /**
   * Update a roommate by ID.
   * @param {string} roommateId - Roommate ID
   * @param {Object} roommateData - Fields to update
   * @returns {Promise<Object>} Updated roommate document along with their inventories
   */
  updateRoommate: (roommateId, roommateData) =>
    Roommate.findByIdAndUpdate(roommateId, roommateData).then((res) =>
      RoommateRepo.getRoommateById(res.id)
    ),

  /**
   * Delete a roommate by ID along with all their inventory items.
   * @param {string} roommateId - Roommate ID
   * @returns {Promise<Object|null>} Deleted roommate document or null if not found
   */
  deleteRoommate: async (roommateId) => {
    await Inventory.deleteMany({
      belongsTo: new mongoose.Types.ObjectId(roommateId),
    });
    return Roommate.findByIdAndDelete(roommateId);
  },
};
