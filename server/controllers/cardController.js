import Card from "../models/Card.js";
import Column from "../models/Column.js";
import Board from "../models/Board.js";

// CREATE
export const createCard = async (req, res) => {
  const { title, description } = req.body; // title and description from body
  const { columnId } = req.params; // <--- Get columnId from URL parameters

  try {
    const column = await Column.findById(columnId).populate({
      path: "board", // Populate the board associated with the column
      select: "owner", // Only need the owner field from the board
    });

    // 1. Verify column exists AND its associated board belongs to the authenticated user
    if (
      !column ||
      !column.board ||
      column.board.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(404).json({ msg: "Column not found or unauthorized." });
    }
    const card = await Card.create({
      title,
      description,
      column: column._id,
      board: column.board._id,
      owner: req.user._id,
    });

    // 2. Add the new card's ID to the column's cards array
    column.cards.push(card._id);
    await column.save(); // Save the updated column

    res.status(201).json(card);
  } catch (err) {
    console.error(err); // Log for debugging
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// READ - GET ALL BOARDS FOR USER
export const getCards = async (req, res) => {
  try {
    const { columnId } = req.query; // Expect columnId as a query parameter
    let query = { owner: req.user._id };
    if (columnId) {
      query.column = columnId;
    }

    const cards = await Card.find(query); // No population needed here unless you want column/board details
    res.json(cards);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// READ - GET SINGLE USER BY ID
export const getCardById = async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.id,
      owner: req.user._id,
    }).populate({
      // Populate the column to check its board
      path: "column",
      populate: {
        // And within the column, populate its board to check ownership
        path: "board",
        select: "owner", // Only need the owner field from the board
      },
    });

    if (!card) return res.status(404).json({ msg: "Card not found" });

    // 1. Check if card belongs to a column
    if (!card.column) {
      return res
        .status(400)
        .json({ msg: "Card is not associated with a column." });
    }
    // 2. Check if the column has a board AND that board belongs to the authenticated user
    if (
      !card.column.board ||
      card.column.board.owner.toString() !== req.user._id.toString()
    ) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Card does not belong to your board." });
    }

    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// UPDATE
export const updateCard = async (req, res) => {
  const { title, description } = req.body;
  try {
    const card = await Card.findOne({
      _id: req.params.id,
      owner: req.user._id,
    }).populate({
      // Populate for security check
      path: "column",
      populate: {
        path: "board",
        select: "owner",
      },
    });

    if (!card) return res.status(404).json({ msg: "Card not found" });
    if (
      !card.column ||
      !card.column.board ||
      card.column.board.owner.toString() !== req.user._id.toString()
    ) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Card does not belong to your board." });
    }

    // Update card fields
    card.title = title || card.title; // Only update if provided
    if (description !== undefined) card.description = description; // Allow description to be explicitly null/empty

    await card.save(); // Use save if you have pre/post hooks or complex logic

    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// DELETE
export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.id,
      owner: req.user._id,
    }).populate({
      // Populate for security check
      path: "column",
      populate: {
        path: "board",
        select: "owner",
      },
    });

    if (!card) return res.status(404).json({ msg: "Card not found" });
    if (
      !card.column ||
      !card.column.board ||
      card.column.board.owner.toString() !== req.user._id.toString()
    ) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Card does not belong to your board." });
    }

    const column = await Column.findById(card.column._id);
    if (column) {
      // Remove the card ID from the column's cards array
      column.cards = column.cards.filter(
        (cardId) => cardId.toString() !== card._id.toString()
      );
      await column.save();
    }

    // Delete the card itself
    await Card.deleteOne({ _id: req.params.id });

    res.json({ msg: "Card deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
