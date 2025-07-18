import React, { useState } from "react";

const AddBoardModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // This function handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Board title is required.");
      return;
    }
    // Call the function passed down from the parent (BoardsOverviewPage)
    // and pass the form data to it
    onCreate(title, description);
  };

  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Board</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="board-title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </label>
            <input
              id="board-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Project Alpha"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="board-description"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description (Optional)
            </label>
            <textarea
              id="board-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A brief description of your board."
              rows="3"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBoardModal;
