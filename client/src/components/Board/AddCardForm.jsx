import React, { useState } from "react";

// The AddCardForm component receives the 'onAddCard' function from the Column component
const AddCardForm = ({ onAddCard }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // State for card description
  const [isAdding, setIsAdding] = useState(false); // State to toggle form visibility

  // Handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      // Ensure title is not empty
      onAddCard(title, description); // Call the parent's function with title and description
      setTitle(""); // Clear the title input
      setDescription(""); // Clear the description input
      setIsAdding(false); // Hide the form after submission
    } else {
      alert("Card title cannot be empty."); // Basic validation
    }
  };

  return (
    <div className="mt-3">
      {isAdding ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-3 rounded-md shadow-inner"
        >
          <textarea
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 resize-none"
            placeholder="Enter a title for this card..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              // Hide form if title is empty and input loses focus
              if (!title.trim()) {
                setIsAdding(false);
              }
            }}
            rows="3"
            autoFocus // Automatically focus when the form appears
          />
          <textarea
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 resize-none"
            placeholder="Add a more detailed description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add Card
            </button>
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
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
          onClick={() => setIsAdding(true)} // Show the form when button is clicked
          className="w-full p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition flex items-center justify-center"
        >
          <span className="mr-2">+</span> Add a card
        </button>
      )}
    </div>
  );
};

export default AddCardForm;
