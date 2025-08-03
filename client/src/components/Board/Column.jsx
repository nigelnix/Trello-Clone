import React from "react";
import Card from "./Card.jsx";
import AddCardForm from "./AddCardForm.jsx";

const Column = ({ column, onAddCard, onCardClick, onColumnClick }) => {
  const handleAddCardLocal = (cardTitle, cardDescription) => {
    onAddCard(column._id, cardTitle, cardDescription);
  };

  return (
    <div
      className="bg-white rounded-lg p-3 mx-2 flex-shrink-0 w-72 max-h-full flex flex-col shadow-md"
      // Removed: style={{ backgroundColor: 'red', border: '2px solid purple' }}
    >
      <h3
        className="text-lg font-semibold text-gray-800 mb-3 cursor-pointer hover:text-blue-700 transition-colors"
        onClick={() => onColumnClick(column)}
      >
        {column.title}
      </h3>

      <div
        className="flex-grow overflow-y-auto pr-1"
        style={{ minHeight: "10px" }}
      >
        {column.cards && column.cards.length > 0 ? (
          column.cards.map((card, index) => (
            <Card
              key={card._id}
              card={card}
              index={index}
              onClick={onCardClick}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">
            No cards in this column yet.
          </p>
        )}
      </div>

      <AddCardForm onAddCard={handleAddCardLocal} />
    </div>
  );
};

export default Column;
