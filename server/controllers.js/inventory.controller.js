import { InventoryService } from "../services/inventory.service.js";

export const InventoryController = {
  getAllInventory: async (req, res) => {
    const inventories = await InventoryService.getAllInventory();
    res.json(inventories);
  },
  getInventoryById: async (req, res) => {
    const inventories = await InventoryService.getInventoryById(req.params.id);
    res.json(inventories);
  },
  getInventoryByRoommate: async (req, res) => {
    const inventories = await InventoryService.getInventoryByRoommate(
      req.params.roommateId
    );
    res.json(inventories);
  },
  getInventoryByFind: async (req, res) => {
    const inventories = await InventoryService.getInventoryByFind(
      req.params.word
    );
    res.json(inventories);
  },
  getInventoryByFilter: async (req, res) => {
    const inventories = await InventoryService.getInventoryByFind(req.query);
    res.json();
  },
  createInventory: async (req, res) => {
    const inventories = await InventoryService.createInventory(req.body);
    res.json(inventories);
  },
  updateInventory: async (req, res) => {
    const inventories = await InventoryService.updateInventory(
      req.params.id,
      req.body
    );
    res.json(inventories);
  },
  deleteInventory: async (req, res) => {
    const inventories = await InventoryService.deleteInventory(req.params.id);
    res.json(inventories);
  },
};
