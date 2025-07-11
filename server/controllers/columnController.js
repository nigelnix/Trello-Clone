import Board from "../models/Board.js";
import Column from "../models/Column.js";

// CREATE
export const createColumn = async (req, res) => {
  const { title, description, boardId } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ msg: "Board not found" });

    const column = await Column.create({
      title,
      description,
      board: board._id,
      owner: req.user._id,
    });

    res.status(201).json(column);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// READ - GET ALL COLUMNS FOR USER
export const getColumns = async (req, res) => {
  try {
    const columns = await Column.find({
      owner: req.user._id,
    });
    res.json(columns);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// READ - GET SINGLE USER BY ID
export const getColumnById = async (req, res) => {
  try {
    const column = await Column.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!column) return res.status(404).json({ msg: "Column not found" });
    res.json(column);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// UPDATE
export const updateColumn = async (req, res) => {
  const { title, description } = req.body;

  try {
    const column = await Column.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      { title, description },
      { new: true }
    );
    if (!column) return res.status(404).json({ msg: "Column not found" });
    res.json(column);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// DELETE
export const deleteColumn = async (req, res) => {
  try {
    const column = await Column.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!column) return res.status(404).json({ msg: "Column not found" });
    res.json({ msg: "Column deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
