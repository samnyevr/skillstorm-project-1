import { RoommateRepo } from "../repositories/roommate.repo.js";

/**
 * Service layer for roommate-related business logic.
 */
export const RoommateService = {
  /**
   * Get all roommates.
   * @returns {Promise<{roommates: Array}>} Object containing array of all roommates
   */
  getAllRoommates: async () => {
    const roommates = await RoommateRepo.getAllRoommates();
    return { roommates };
  },

  /**
   * Get a roommate by ID and calculate the total quantity of their inventory items.
   * @param {string} roommateId - Roommate ID
   * @returns {Promise<{quantity: number, roommate: Object|null}>} Object containing roommate and total inventory quantity
   */
  getRoommateById: async (roommateId) => {
    const { inventories, roommate } = await RoommateRepo.getRoommateById(
      roommateId
    );
    const quantity = inventories.reduce((acc, cur) => acc + cur.itemCount, 0);
    return { quantity, roommate };
  },

  /**
   * Create a new roommate.
   * @param {Object} roommateData - Roommate data
   * @returns {Promise<{roommates: Object}>} Object containing the created roommate
   */
  createRoommate: async (roommateData) => {
    const roommates = await RoommateRepo.createRoommate(roommateData);
    return { roommates };
  },

  /**
   * Update a roommate by ID.
   * @param {string} roommateId - Roommate ID
   * @param {Object} roommateData - Fields to update
   * @returns {Promise<{roommates: Object}>} Object containing the updated roommate
   */
  updateRoommate: async (roommateId, roommateData) => {
    const roommates = await RoommateRepo.updateRoommate(
      roommateId,
      roommateData
    );
    return { roommates };
  },

  /**
   * Delete a roommate by ID along with all their inventory items.
   * @param {string} roommateId - Roommate ID
   * @returns {Promise<{roommates: Object|null}>} Object containing the deleted roommate or null
   */
  deleteRoommate: async (roommateId) => {
    const roommates = await RoommateRepo.deleteRoommate(roommateId);
    return { roommates };
  },
};
