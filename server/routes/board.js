import express from "express";
import protect from "../middleware/auth.js";
import {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController.js";

import { createColumn } from "../controllers/columnController.js";

const router = express.Router();

router.post("/", protect, createBoard);
router.get("/", protect, getBoards);
router.get("/:id", protect, getBoardById);
router.put("/:id", protect, updateBoard);
router.delete("/:id", protect, deleteBoard);

// Nested routes for columns belonging to a board
// POST /api/boards/:boardId/columns
router.post("/:boardId/columns", protect, createColumn); // NEW: Nested column creation

export default router;
