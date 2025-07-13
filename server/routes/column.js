// backend/routes/column.js
import express from "express";
import protect from "../middleware/auth.js";
import {
  createColumn, // Keep if createColumn is also handled here, otherwise remove
  updateColumn,
  deleteColumn,
  getColumnById, // If you want to keep single column fetch
} from "../controllers/columnController.js";

import { createCard } from "../controllers/cardController.js"; // Import createCard

const router = express.Router();

// Column-specific routes (e.g., update, delete)
// Note: If you moved createColumn to board.js, you'd remove it from here too
router.get("/:id", protect, getColumnById); // If keeping this route
router.put("/:id", protect, updateColumn);
router.delete("/:id", protect, deleteColumn);

// Nested routes for cards belonging to a column
// POST /api/columns/:columnId/cards
router.post("/:columnId/cards", protect, createCard); // NEW: Nested card creation

// Might need routes for reordering/moving cards here later
// router.put("/:columnId/cards/reorder", protect, reorderCardsInColumn);
// router.put("/cards/move", protect, moveCardBetweenColumns); // This one might be top-level card route
// Depends how complex I want to make the app

export default router;
