import { Router } from "express";
import { RoommateController } from "../controllers.js/roommate.controller.js";

/**
 * Roommate Routes
 *
 *
 *
 * */

const router = Router();

// Get all Roommates
router.get("/", RoommateController.getAllRoommates);

// Get a single Roommate by ID
router.get("/:id", RoommateController.getRoommateById);

// Create a new Roommate
router.post("/", RoommateController.createRoommate);

// Update an Roommate
router.put("/:id", RoommateController.updateRoommate);

// Delete an Roommate
router.delete("/:id", RoommateController.deleteRoommate);

export default router;
