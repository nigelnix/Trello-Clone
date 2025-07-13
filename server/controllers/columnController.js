import Board from "../models/Board.js";
import Column from "../models/Column.js";
import Card from "../models/Card.js";

// CREATE
export const createColumn = async (req, res) => {
  const { title, description } = req.body;
  const { boardId } = req.params;

  try {
    const board = await Board.findById(boardId);

    if (!board || board.owner.toString() !== req.user._id.toString()) {
      return res.status(404).json({ msg: "Board not found or Unauthorized" });
    }

    const column = await Column.create({
      title,
      description,
      board: board._id,
      owner: req.user._id,
    });

    // 2. Add the new column's ID to the board's columns array
    board.columns.push(column._id);
    await board.save(); // Save the updated board

    res.status(201).json(column);
  } catch (err) {
    console.error(err); // Log for debugging//
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
    }).populate({
      // Populate the board to check its owner
      path: "board",
      select: "owner", // Only need the owner field from the board
    });
    // Additional security check: ensure the column's board is owned by the user
    if (
      !column.board ||
      column.board.owner.toString() !== req.user._id.toString()
    ) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Column does not belong to your board." });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// UPDATE
export const updateColumn = async (req, res) => {
  const { title, description } = req.body;

  try {
    const column = await Column.findOne({
      _id: req.params.id,
      owner: req.user._id,
    }).populate({ path: "board", select: "owner" }); // Populate for security check

    if (!column) return res.status(404).json({ msg: "Column not found" });
    if (
      !column.board ||
      column.board.owner.toString() !== req.user._id.toString()
    ) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Column does not belong to your board." });
    }

    // Now update the column
    column.title = title || column.title;
    if (description !== undefined) column.description = description; // Only update if provided

    await column.save(); // Use save instead of findOneAndUpdate if you have pre/post hooks or complex logic

    res.json(column);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// DELETE
export const deleteColumn = async (req, res) => {
  try {
    const column = await Column.findOne({
      _id: req.params.id,
      owner: req.user._id,
    }).populate({ path: "board", select: "owner" });
    if (!column) return res.status(404).json({ msg: "Column not found" });
    if (
      !column.board ||
      column.board.owner.toString() !== req.user._id.toString()
    ) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Column does not belong to your board." });
    }

    const board = await Board.findById(column.board._id);
    if (board) {
      // Remove the column ID from the board's columns array
      board.columns = board.columns.filter(
        (colId) => colId.toString() !== column._id.toString()
      );
      await board.save();
    }

    // Delete all cards associated with this column (optional, but good for cleanup)
    await Card.deleteMany({ column: column._id }); // Make sure to import Card model

    // Finally, delete the column itself
    await Column.deleteOne({ _id: req.params.id }); // Use deleteOne for clarity

    res.json({ msg: "Column and its cards deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
