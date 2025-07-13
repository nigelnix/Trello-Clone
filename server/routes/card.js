// backend/routes/card.js
import express from "express";
import protect from "../middleware/auth.js";
import {
  // createCard is now handled by column.js, so not imported here for creation
  getCards, // You might reconsider if this is truly needed or useful
  getCardById,
  updateCard,
  deleteCard,
} from "../controllers/cardController.js";

const router = express.Router();

// --- Card specific routes (mounted at /api/cards) ---
router.get("/", protect, getCards); // GET /api/cards
router.get("/:id", protect, getCardById); // GET /api/cards/:id
router.put("/:id", protect, updateCard); // PUT /api/cards/:id
router.delete("/:id", protect, deleteCard); // DELETE /api/cards/:id

export default router;
