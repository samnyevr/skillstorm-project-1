import { InventoryService } from "../services/inventory.service.js";

/**
 * Controller for handling inventory-related HTTP requests.
 */
export const InventoryController = {
  /**
   * Get all inventory items.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getAllInventory: async (req, res) => {
    const inventories = await InventoryService.getAllInventory();
    res.json(inventories);
  },

  /**
   * Get a single inventory item by ID.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {string} req.params.id - Inventory item ID
   */
  getInventoryById: async (req, res) => {
    const inventories = await InventoryService.getInventoryById(req.params.id);
    res.json(inventories);
  },

  /**
   * Get all inventory items for a specific roommate.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {string} req.params.roommateId - Roommate ID
   */
  getInventoryByRoommate: async (req, res) => {
    const inventories = await InventoryService.getInventoryByRoommate(
      req.params.roommateId
    );
    res.json(inventories);
  },

  /**
   * Find inventory items by keyword.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {string} req.params.word - Search keyword
   */
  getInventoryByFind: async (req, res) => {
    const inventories = await InventoryService.getInventoryByFind(
      req.params.word
    );
    res.json(inventories);
  },

  /**
   * Filter inventory items based on query parameters.
   * @param {import('express').Request} req - Request with query params
   * @param {import('express').Response} res - Response object
   */
  getInventoryByFilter: async (req, res) => {
    const inventories = await InventoryService.getInventoryByFind(req.query);
    res.json(inventories);
  },

  /**
   * Create a new inventory item.
   * @param {import('express').Request} req - Request with body {itemName, itemCount, itemDescription, belongsTo}
   * @param {import('express').Response} res - Response object
   */
  createInventory: async (req, res) => {
    const inventories = await InventoryService.createInventory(req.body);
    res.json(inventories);
  },

  /**
   * Update an inventory item by ID.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {string} req.params.id - Inventory item ID
   * @param {Object} req.body - Updated inventory fields
   */
  updateInventory: async (req, res) => {
    const inventories = await InventoryService.updateInventory(
      req.params.id,
      req.body
    );
    res.json(inventories);
  },

  /**
   * Delete an inventory item by ID.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {string} req.params.id - Inventory item ID
   */
  deleteInventory: async (req, res) => {
    const inventories = await InventoryService.deleteInventory(req.params.id);
    res.json(inventories);
  },
};
