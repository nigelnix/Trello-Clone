import React, { useState } from "react";

// The AddColumnForm component receives the 'onAddColumn' function from the BoardDetailPage
const AddColumnForm = ({ onAddColumn }) => {
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false); // State to toggle form visibility

  // Handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      // Ensure title is not empty
      onAddColumn(title); // Call the parent's function with the column title
      setTitle(""); // Clear the title input
      setIsAdding(false); // Hide the form after submission
    } else {
      // If the user tries to submit an empty title, you might want to show a validation message
      alert("Column title cannot be empty."); // Basic validation
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-3 mx-2 flex-shrink-0 w-72 h-fit shadow-md">
      {isAdding ? (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
            placeholder="Enter column title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              // Hide form if title is empty and input loses focus
              if (!title.trim()) {
                setIsAdding(false);
              }
            }}
            autoFocus // Automatically focus when the form appears
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
                setTitle(""); // Clear input
                setIsAdding(false); // Hide the form
              }}
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)} // Show the form when button is clicked
          className="w-full p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition flex items-center justify-center"
        >
          <span className="mr-2 text-xl">+</span> Add another column
        </button>
      )}
    </div>
  );
};

export default AddColumnForm;
