import React from "react";

// The Card component receives 'card' data and its 'index' from the Column component
const Card = ({ card, index }) => {
  // The 'index' prop is important for react-beautiful-dnd later, but not used visually here yet.

  return (
    <div className="bg-white rounded-md shadow p-3 mb-3 cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <p className="font-medium text-gray-800">{card.title}</p>
      {card.description && ( // Only show description if it exists
        <p className="text-sm text-gray-600 mt-1">{card.description}</p>
      )}
      {/*
        You can add more card details here later, like:
        - Due date: {card.dueDate ? new Date(card.dueDate).toLocaleDateString() : 'No due date'}
        - Assigned to: {card.assignedTo?.length > 0 ? card.assignedTo.map(user => user.username).join(', ') : 'Unassigned'}
        - Labels
        - Click handler for opening a card detail modal
      */}
    </div>
  );
};

export default Card;
