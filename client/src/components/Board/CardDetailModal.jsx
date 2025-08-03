import React, { useState, useEffect } from "react";

const CardDetailModal = ({ isOpen, onClose, card, onUpdate, onDelete }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Update local state when the 'card' prop changes
  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description || ""); // Ensure description is not null
    }
  }, [card]);

  // If the modal is not open, don't render anything
  if (!isOpen || !card) {
    return null;
  }

  const handleSave = (e) => {
    e.preventDefault();
    console.log("CardDetailModal: handleSave called."); // <--- ADD THIS LOG
    if (!title.trim()) {
      alert("Card title cannot be empty.");
      return;
    }
    const updatedCardData = { ...card, title, description };
    console.log(
      "CardDetailModal: Calling onUpdate with data:",
      updatedCardData
    ); // <--- ADD THIS LOG
    // Call the onUpdate prop with the updated card data
    onUpdate(updatedCardData);
    // setIsEditing(false); // We'll let onUpdate (in parent) handle closing/exiting edit mode
  };

  const handleDeleteClick = () => {
    console.log("CardDetailModal: Delete button clicked for card:", card._id); // <--- ADD THIS LOG
    // Call the onDelete prop, passing card ID and its column ID
    onDelete(card._id, card.column);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Card Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times; {/* Times symbol for close button */}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label
                htmlFor="card-title"
                className="block text-gray-700 font-semibold mb-2"
              >
                Title
              </label>
              <input
                id="card-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="card-description"
                className="block text-gray-700 font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="card-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-700 mb-4">
              {card.description || "No description provided."}
            </p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetailModal;
