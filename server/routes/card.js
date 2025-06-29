import express from "express";
import protect from "../middleware/auth.js";
import {
  createCard,
  getCards,
  getCardById,
  updateCard,
  deleteCard,
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/create", protect, createCard);
router.get("/", protect, getCards);
router.get("/:id", protect, getCardById);
router.put("/:id", protect, updateCard);
router.delete("/:id", protect, deleteCard);

export default router;
