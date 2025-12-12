import { RoommateService } from "../services/roommate.service.js";

export const RoommateController = {
  getAllRoommates: async (req, res) => {
    const roommates = await RoommateService.getAllRoommates();
    res.json(roommates);
  },
  getRoommateById: async (req, res) => {
    const roommates = await RoommateService.getRoommateById(req.params.id);
    res.json(roommates);
  },
  createRoommate: async (req, res) => {
    try {
      const roommates = await RoommateService.createRoommate(req.body);
      res.status(201).json(roommates);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  updateRoommate: async (req, res) => {
    try {
      const roommates = await RoommateService.updateRoommate(
        req.params.id,
        req.body
      );
      res.status(200).json(roommates);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  deleteRoommate: async (req, res) => {
    try {
      const roommates = await RoommateService.deleteRoommate(req.params.id);
      res.json(roommates);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};
