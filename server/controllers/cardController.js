import Card from "../models/Card.js";
import Column from "../models/Column.js";

// CREATE
export const createCard = async (req, res) => {
  const { title, description, columnId } = req.body;

  try {
    const column = await Column.findById(columnId);
    if (!column) return res.status(404).json({ msg: "Column not found" });

    const card = await Card.create({
      title,
      description,
      column: column._id,
      board: column.board,
      owner: req.user._id,
    });

    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// READ - GET ALL BOARDS FOR USER
export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({
      owner: req.user._id,
    });
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
    });
    if (!card) return res.status(404).json({ msg: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// UPDATE
export const updateCard = async (req, res) => {
  const { title, description } = req.body;

  try {
    const card = await Card.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      { title, description },
      { new: true }
    );
    if (!card) return res.status(404).json({ msg: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// DELETE
export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!card) return res.status(404).json({ msg: "Card not found" });
    res.json({ msg: "Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
