import { InventoryRepo } from "../repositories/inventory.repo.js";

/**
 * Service layer for inventory-related business logic.
 */
export const InventoryService = {
  /**
   * Get all inventory items.
   * @returns {Promise<{inventory: Array}>} Object containing array of all inventory items
   */
  getAllInventory: async () => {
    const inventory = await InventoryRepo.getAllInventory();
    return { inventory };
  },

  /**
   * Get a single inventory item by ID.
   * @param {string} inventoryId - Inventory item ID
   * @returns {Promise<{inventory: Object|null}>} Object containing the inventory item or null
   */
  getInventoryById: async (inventoryId) => {
    const inventory = await InventoryRepo.getInventoryById(inventoryId);
    return { inventory };
  },

  /**
   * Get all inventory items belonging to a specific roommate.
   * @param {string} roommateId - Roommate ID
   * @returns {Promise<{inventory: Array}>} Object containing the array of inventory items
   */
  getInventoryByRoommate: async (roommateId) => {
    const inventory = await InventoryRepo.getInventoryByRoommate(roommateId);
    return { inventory };
  },

  /**
   * Find inventory items by a search keyword.
   * @param {string} word - Keyword to search
   * @returns {Promise<{inventory: Array}>} Object containing matching inventory items
   */
  getInventoryByFind: async (word) => {
    const inventory = await InventoryRepo.getInventoryByFind(word);
    return { inventory };
  },

  /**
   * Filter inventory items by query parameters.
   * @param {Object} query - Query object for filtering inventory
   * @returns {Promise<{inventory: Array}>} Object containing filtered inventory items
   */
  getInventoryByFilter: async (query) => {
    const inventory = await InventoryRepo.getInventoryByFilter(query);
    return { inventory };
  },

  /**
   * Create a new inventory item.
   * @param {Object} inventoryData - Inventory data
   * @returns {Promise<{inventory: Object}>} Object containing the created inventory item
   */
  createInventory: async (inventoryData) => {
    const inventory = await InventoryRepo.createInventory(inventoryData);
    return { inventory };
  },

  /**
   * Update an inventory item by ID.
   * @param {string} inventoryId - Inventory item ID
   * @param {Object} inventoryData - Fields to update
   * @returns {Promise<{inventory: Object}>} Object containing the updated inventory item
   */
  updateInventory: async (inventoryId, inventoryData) => {
    const inventory = await InventoryRepo.updateInventory(
      inventoryId,
      inventoryData
    );
    return { inventory };
  },

  /**
   * Delete an inventory item by ID.
   * @param {string} inventoryId - Inventory item ID
   * @returns {Promise<{inventory: Object|null}>} Object containing the deleted inventory item or null
   */
  deleteInventory: async (inventoryId) => {
    const inventory = await InventoryRepo.deleteInventory(inventoryId);
    return { inventory };
  },
};
