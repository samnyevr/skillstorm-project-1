import { RoommateService } from "../services/roommate.service.js";

/**
 * Controller for handling roommate-related HTTP requests.
 */
export const RoommateController = {
  /**
   * Get all roommates.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getAllRoommates: async (req, res) => {
    const roommates = await RoommateService.getAllRoommates();
    res.json(roommates);
  },

  /**
   * Get a single roommate by ID.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {string} req.params.id - Roommate ID
   */
  getRoommateById: async (req, res) => {
    const roommates = await RoommateService.getRoommateById(req.params.id);
    res.json(roommates);
  },

  /**
   * Create a new roommate.
   * @param {import('express').Request} req - Request with body {name, location, description, totalStorage}
   * @param {import('express').Response} res
   */
  createRoommate: async (req, res) => {
    try {
      const roommates = await RoommateService.createRoommate(req.body);
      res.status(201).json(roommates);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Update a roommate by ID.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {string} req.params.id - Roommate ID
   * @param {Object} req.body - Updated roommate fields
   */
  updateRoommate: async (req, res) => {
    try {
      const roommates = await RoommateService.updateRoommate(
        req.params.id,
        req.body
      );
      res.status(200).json(roommates);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Delete a roommate by ID.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {string} req.params.id - Roommate ID
   */
  deleteRoommate: async (req, res) => {
    try {
      const roommates = await RoommateService.deleteRoommate(req.params.id);
      res.json(roommates);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
