import { InventoryRepo } from "../repositories/inventory.repo.js";

export const InventoryService = {
  getAllInventory: async () => {
    const inventory = await InventoryRepo.getAllInventory();

    return {
      inventory,
    };
  },
  getInventoryById: async (inventoryId) => {
    const inventory = await InventoryRepo.getInventoryById(inventoryId);

    return {
      inventory,
    };
  },
  getInventoryByRoommate: async (roommateId) => {
    const inventory = await InventoryRepo.getInventoryByRoommate(roommateId);
    console.log(inventory);
    return {
      inventory,
    };
  },
  createInventory: async (inventoryData) => {
    const inventory = await InventoryRepo.createInventory(inventoryData);

    return {
      inventory,
    };
  },
  updateInventory: async (inventoryId, inventoryData) => {
    const inventory = await InventoryRepo.updateInventory(
      inventoryId,
      inventoryData
    );

    return {
      inventory,
    };
  },
  deleteInventory: async (inventoryId) => {
    const inventory = await InventoryRepo.deleteInventory(inventoryId);

    return {
      inventory,
    };
  },
};
