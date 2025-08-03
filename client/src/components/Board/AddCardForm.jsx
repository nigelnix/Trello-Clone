import React, { useState } from "react";

const AddCardForm = ({ onAddCard }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddCard(title, description);
      setTitle("");
      setDescription("");
      setIsAdding(false);
    } else {
      alert("Card title cannot be empty.");
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
              if (!title.trim()) {
                setIsAdding(false);
              }
            }}
            autoFocus
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
              className="px-3 py-1 bg-teal-200 text-gray-800 rounded hover:bg-teal-300 transition" // Changed to bg-teal-200
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md" // Changed to bg-teal-200
        >
          <span className="mr-2">+</span> Add a card
        </button>
      )}
    </div>
  );
};
export default AddCardForm;
