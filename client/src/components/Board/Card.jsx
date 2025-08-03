import React from "react";

const Card = ({ card, index, onClick }) => {
  return (
    <div
      className="bg-gray-50 rounded-md shadow p-3 mb-3 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => onClick(card)}
    >
      <p className="font-medium text-gray-800">{card.title}</p>
      {card.description && (
        <p className="text-sm text-gray-600 mt-1">{card.description}</p>
      )}
    </div>
  );
};

export default Card;
