import express from "express";
import protect from "../middleware/auth.js";
import {
  createColumn,
  getColumns,
  getColumnById,
  updateColumn,
  deleteColumn,
} from "../controllers/columnController.js";

const router = express.Router();

router.post("/create", protect, createColumn);
router.get("/", protect, getColumns);
router.get("/:id", protect, getColumnById);
router.put("/:id", protect, updateColumn);
router.delete("/:id", protect, deleteColumn);

export default router;
