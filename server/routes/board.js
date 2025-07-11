import express from "express";
import protect from "../middleware/auth.js";
import {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController.js";

const router = express.Router();

router.post("/create", protect, createBoard);
router.get("/", protect, getBoards);
router.get("/:id", protect, getBoardById);
router.put("/:id", protect, updateBoard);
router.delete("/:id", protect, deleteBoard);

export default router;
