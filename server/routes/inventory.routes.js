import { Router } from "express";
import { InventoryController } from "../controllers.js/inventory.controller.js";

const router = Router();

// Get all inventory items
router.get("/", InventoryController.getAllInventory);

// Get a single item by ID
router.get("/:id", InventoryController.getInventoryById);

// Get all items belonging to a specific roommate
router.get("/roommate/:roommateId", InventoryController.getInventoryByRoommate);

// Create a new inventory item
router.post("/", InventoryController.createInventory);

// Update an inventory item
router.put("/:id", InventoryController.updateInventory);

// Delete an inventory item
router.delete("/:id", InventoryController.deleteInventory);

export default router;
