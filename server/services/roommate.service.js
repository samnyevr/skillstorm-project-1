import { RoommateRepo } from "../repositories/roommate.repo.js";

export const RoommateService = {
  getAllRoommates: async () => {
    const roommates = await RoommateRepo.getAllRoommates();

    return {
      roommates,
    };
  },
  getRoommateById: async (roommateId) => {
    const { inventories, roommate } = await RoommateRepo.getRoommateById(
      roommateId
    );

    const quantity = inventories.reduce((acc, cur) => acc + cur.itemCount, 0);

    return {
      quantity,
      roommate,
    };
  },

  createRoommate: async (roommateData) => {
    const roommates = await RoommateRepo.createRoommate(roommateData);

    return {
      roommates,
    };
  },

  updateRoommate: async (roommateId, roommateData) => {
    const roommates = await RoommateRepo.updateRoommate(
      roommateId,
      roommateData
    );

    return {
      roommates,
    };
  },

  deleteRoommate: async (roommateId) => {
    const roommates = await RoommateRepo.deleteRoommate(roommateId);

    return {
      roommates,
    };
  },
};
