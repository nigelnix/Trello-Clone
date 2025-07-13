import Board from "../models/Board.js";

// CREATE
export const createBoard = async (req, res) => {
  const { title, description } = req.body;

  try {
    const board = await Board.create({
      title,
      description,
      owner: req.user._id,
    });

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// READ - GET ALL BOARDS FOR USER
export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user._id });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// READ - GET SINGLE USER BY ID
export const getBoardById = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      owner: req.user._id,
    }).populate({
      // Populate the 'columns' field
      path: "columns",
      populate: {
        // And within each column, populate the 'cards' field
        path: "cards",
      },
    });
    if (!board)
      return res.status(404).json({
        msg: "Board not found",
      });
    res.json(board);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// UPDATE
export const updateBoard = async (req, res) => {
  const { title, description } = req.body;

  try {
    const board = await Board.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      { title, description },
      { new: true }
    );
    if (!board) return res.status(404).json({ msg: "Board not found" });
    res.json(board);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// DELETE
export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!board) return res.status(404).json({ msg: "Board not found" });
    res.json({ msg: "Board deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
