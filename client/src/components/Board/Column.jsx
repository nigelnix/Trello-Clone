import React from "react";
import Card from "./Card"; // Make sure to create this component next!
import AddCardForm from "./AddCardForm"; // Make sure to create this component next!

// The Column component receives 'column' data and the 'onAddCard' function from BoardDetailPage
const Column = ({ column, onAddCard }) => {
  // This local handler wraps the 'onAddCard' function passed from the parent.
  // It ensures that when AddCardForm calls its 'onAddCard' prop,
  // it correctly passes the current column's ID along with the card title.
  const handleAddCardLocal = (cardTitle, cardDescription) => {
    onAddCard(column._id, cardTitle, cardDescription);
  };

  return (
    <div className="bg-gray-200 rounded-lg p-3 mx-2 flex-shrink-0 w-72 max-h-full flex flex-col shadow-md">
      {/* Column Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {column.title}
      </h3>

      {/* Cards Container */}
      {/*
        This div will later become a Droppable area for react-beautiful-dnd.
        For now, it's just a container for the cards.
      */}
      <div
        className="flex-grow overflow-y-auto pr-1"
        style={{ minHeight: "10px" }}
      >
        {column.cards && column.cards.length > 0 ? (
          column.cards.map((card, index) => (
            // Render each Card component, passing the card data and its index
            // The 'index' prop will be important for react-beautiful-dnd later
            <Card key={card._id} card={card} index={index} />
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">
            No cards in this column yet.
          </p>
        )}
      </div>

      {/* Add Card Form */}
      {/* Pass the local handler to the AddCardForm component */}
      <AddCardForm onAddCard={handleAddCardLocal} />
    </div>
  );
};

export default Column;
