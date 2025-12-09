import { Roommate } from "../models/roommate.model.js";

export const RoommateRepo = {
  getAllRoommates: () => Roommate.find(),
  getRoommateById: (roommateId) => Roommate.findById(roommateId),
  createRoommate: (data) => Roommate.create(data),
  updateRoommate: (roommateId, roommateData) =>
    Roommate.findByIdAndUpdate(roommateId, roommateData).then((res) =>
      RoommateRepo.getRoommateById(res.id)
    ),
  deleteRoommate: (roommateId) => Roommate.findByIdAndDelete(roommateId),
};
