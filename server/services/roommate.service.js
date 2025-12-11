import { RoommateRepo } from "../repositories/roommate.repo.js";

export const RoommateService = {
  getAllRoommates: async () => {
    const roommates = await RoommateRepo.getAllRoommates();

    return {
      roommates,
    };
  },
  getRoommateById: async (roommateId) => {
    const roommates = await RoommateRepo.getRoommateById(roommateId);

    return {
      roommates,
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
