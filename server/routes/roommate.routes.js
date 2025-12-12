import { Router } from "express";
import { RoommateController } from "../controllers.js/roommate.controller.js";

const router = Router();

/**
 * @route GET /api/roommates
 * @desc Get all roommates
 * @access Public
 */
router.get("/", RoommateController.getAllRoommates);

/**
 * @route GET /api/roommates/:id
 * @desc Get a single roommate by ID
 * @param {string} id - Roommate ID
 * @access Public
 */
router.get("/:id", RoommateController.getRoommateById);

/**
 * @route POST /api/roommates
 * @desc Create a new roommate
 * @body {Object} roommate - Roommate data
 * @access Public
 */
router.post("/", RoommateController.createRoommate);

/**
 * @route PUT /api/roommates/:id
 * @desc Update a roommate by ID
 * @param {string} id - Roommate ID
 * @body {Object} roommate - Updated roommate data
 * @access Public
 */
router.put("/:id", RoommateController.updateRoommate);

/**
 * @route DELETE /api/roommates/:id
 * @desc Delete a roommate by ID
 * @param {string} id - Roommate ID
 * @access Public
 */
router.delete("/:id", RoommateController.deleteRoommate);

export default router;
