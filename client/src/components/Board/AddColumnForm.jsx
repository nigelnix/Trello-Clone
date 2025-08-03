import React, { useState } from "react";

const AddColumnForm = ({ onAddColumn }) => {
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddColumn(title);
      setTitle("");
      setIsAdding(false);
    } else {
      alert("Column title cannot be empty.");
    }
  };

  return (
    <div className="flex-shrink-0 w-72 bg-gray-100 rounded-lg p-3 mx-2 shadow-md">
      {isAdding ? (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
            placeholder="Enter column title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              if (!title.trim()) {
                setIsAdding(false);
              }
            }}
            autoFocus
          />
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add Column
            </button>
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setIsAdding(false);
              }}
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
        >
          <span className="mr-2 text-xl">+</span> Add another column
        </button>
      )}
    </div>
  );
};

export default AddColumnForm;
