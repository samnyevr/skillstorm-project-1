import { Router } from "express";
import { InventoryController } from "../controllers.js/inventory.controller.js";

const router = Router();

/**
 * @route GET /api/inventories
 * @desc Get all inventory items
 * @access Public
 */
router.get("/", InventoryController.getAllInventory);

/**
 * @route GET /api/inventories/:id
 * @desc Get a single inventory item by its ID
 * @param {string} id - Inventory item ID
 * @access Public
 */
router.get("/:id", InventoryController.getInventoryById);

/**
 * @route GET /api/inventories/roommate/:roommateId
 * @desc Get all inventory items belonging to a specific roommate
 * @param {string} roommateId - Roommate ID
 * @access Public
 */
router.get("/roommate/:roommateId", InventoryController.getInventoryByRoommate);

/**
 * @route GET /api/inventories/find/:word
 * @desc Search inventory items by keyword
 * @param {string} word - Search keyword
 * @access Public
 */
router.get("/find/:word", InventoryController.getInventoryByFind);

/**
 * @route GET /api/inventories/filter
 * @desc Filter inventory items based on query parameters
 * @access Public
 */
router.get("/filter/filterword", InventoryController.getInventoryByFilter);

/**
 * @route POST /api/inventories
 * @desc Create a new inventory item
 * @body {Object} inventory - Inventory data
 * @access Public
 */
router.post("/", InventoryController.createInventory);

/**
 * @route PUT /api/inventories/:id
 * @desc Update an inventory item by ID
 * @param {string} id - Inventory item ID
 * @body {Object} inventory - Updated inventory data
 * @access Public
 */
router.put("/:id", InventoryController.updateInventory);

/**
 * @route DELETE /api/inventories/:id
 * @desc Delete an inventory item by ID
 * @param {string} id - Inventory item ID
 * @access Public
 */
router.delete("/:id", InventoryController.deleteInventory);

export default router;
