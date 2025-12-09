import { RoommateRepo } from "../repositories/roommate.repo.js";

export const RoommateService = {
  getAllRoommates: async () => {
    const roommates = await RoommateRepo.getAllRoommates();

    return {
      roommates,
    };
  },
  getRoommateById: async (roommateId) => {
    const roomamtes = await RoommateRepo.getRoommateById(roommateId);

    return {
      roomamtes,
    };
  },

  createRoommate: async (roommateData) => {
    const roomamtes = await RoommateRepo.createRoommate(roommateData);

    return {
      roomamtes,
    };
  },

  updateRoommate: async (roommateId, roommateData) => {
    const roomamtes = await RoommateRepo.updateRoommate(
      roommateId,
      roommateData
    );

    return {
      roomamtes,
    };
  },

  deleteRoommate: async (roommateId) => {
    const roomamtes = await RoommateRepo.deleteRoommate(roommateId);

    return {
      roomamtes,
    };
  },
};
