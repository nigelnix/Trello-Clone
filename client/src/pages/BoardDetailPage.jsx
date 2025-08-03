import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

import Column from "../components/Board/Column.jsx";
import AddColumnForm from "../components/Board/AddColumnForm.jsx";
import CardDetailModal from "../components/Board/CardDetailModal.jsx";
import ColumnDetailModal from "../components/Board/ColumnDetailModal.jsx";

const BoardDetailPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCardDetailModalOpen, setIsCardDetailModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isColumnDetailModalOpen, setIsColumnDetailModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/boards/${boardId}`
        );
        setBoard(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch board.");
        console.error("Error fetching board:", err);

        if (err.response && err.response.status === 401) {
          logout();
          navigate("/login");
        } else if (err.response && err.response.status === 404) {
          navigate("/boards");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId, logout, navigate]);

  const handleAddColumn = async (columnTitle, columnDescription = "") => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/boards/${boardId}/columns`,
        {
          title: columnTitle,
          description: columnDescription,
        }
      );
      const newColumn = response.data;

      setBoard((prevBoard) => {
        if (!prevBoard) return null;
        return {
          ...prevBoard,
          columns: [...prevBoard.columns, newColumn],
        };
      });
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add column.");
      console.error("Error adding column:", err);
    }
  };

  const handleAddCardToColumn = async (
    columnId,
    cardTitle,
    cardDescription = ""
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/columns/${columnId}/cards`,
        {
          title: cardTitle,
          description: cardDescription,
        }
      );
      const newCard = response.data;

      setBoard((prevBoard) => {
        if (!prevBoard) return null;
        return {
          ...prevBoard,
          columns: prevBoard.columns.map((col) =>
            col._id === columnId
              ? { ...col, cards: [...col.cards, newCard] }
              : col
          ),
        };
      });
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add card.");
      console.error("Error adding card:", err);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsCardDetailModalOpen(true);
  };

  const handleCloseCardDetailModal = () => {
    setSelectedCard(null);
    setIsCardDetailModalOpen(false);
  };

  const handleUpdateCard = async (updatedCardData) => {
    console.log(
      "BoardDetailPage: handleUpdateCard called with data:",
      updatedCardData
    );
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cards/${updatedCardData._id}`,
        updatedCardData
      );
      const updatedCard = response.data;
      console.log(
        "BoardDetailPage: Card updated successfully. Response:",
        updatedCard
      );

      setBoard((prevBoard) => {
        if (!prevBoard) return null;
        const newBoard = {
          ...prevBoard,
          columns: prevBoard.columns.map((col) => {
            if (col._id === updatedCard.column._id) {
              return {
                ...col,
                cards: col.cards.map((card) =>
                  card._id === updatedCard._id ? updatedCard : card
                ),
              };
            }
            return col;
          }),
        };
        return newBoard;
      });
      handleCloseCardDetailModal();
    } catch (err) {
      console.error("BoardDetailPage: Error updating card:", err);
      alert(err.response?.data?.msg || "Failed to update card.");
    }
  };

  const handleDeleteCard = async (cardId, columnId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cards/${cardId}`);

        setBoard((prevBoard) => {
          if (!prevBoard) return null;
          return {
            ...prevBoard,
            columns: prevBoard.columns.map((col) =>
              col._id === columnId
                ? {
                    ...col,
                    cards: col.cards.filter((card) => card._id !== cardId),
                  }
                : col
            ),
          };
        });
        handleCloseCardDetailModal();
      } catch (err) {
        alert(err.response?.data?.msg || "Failed to delete card.");
        console.error("Error deleting card:", err);
      }
    }
  };

  const handleColumnClick = (column) => {
    setSelectedColumn(column);
    setIsColumnDetailModalOpen(true);
  };

  const handleCloseColumnDetailModal = () => {
    setSelectedColumn(null);
    setIsColumnDetailModalOpen(false);
  };

  const handleUpdateColumn = async (updatedColumnData) => {
    console.log(
      "BoardDetailPage: handleUpdateColumn called with data:",
      updatedColumnData
    );
    try {
      const response = await axios.put(
        `http://localhost:5000/api/columns/${updatedColumnData._id}`,
        updatedColumnData
      );
      const updatedColumn = response.data;
      console.log(
        "BoardDetailPage: Column updated successfully. Response:",
        updatedColumn
      );

      setBoard((prevBoard) => {
        if (!prevBoard) return null;
        return {
          ...prevBoard,
          columns: prevBoard.columns.map((col) =>
            col._id === updatedColumn._id ? updatedColumn : col
          ),
        };
      });
      handleCloseColumnDetailModal();
    } catch (err) {
      console.error("BoardDetailPage: Error updating column:", err);
      alert(err.response?.data?.msg || "Failed to update column.");
    }
  };

  const handleDeleteColumn = async (columnId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this column? This will also delete all its cards."
      )
    ) {
      try {
        await axios.delete(`http://localhost:5000/api/columns/${columnId}`);
        setBoard((prevBoard) => {
          if (!prevBoard) return null;
          return {
            ...prevBoard,
            columns: prevBoard.columns.filter((col) => col._id !== columnId),
          };
        });
        handleCloseColumnDetailModal();
      } catch (err) {
        console.error("BoardDetailPage: Error deleting column:", err);
        alert(err.response?.data?.msg || "Failed to delete column.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading board...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 text-red-600 flex items-center justify-center">
        <p className="text-xl">Error: {error}</p>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="min-h-screen p-8 text-gray-600 flex items-center justify-center">
        <p className="text-xl">Board not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">{board.title}</h1>
      <div className="flex overflow-x-auto overflow-y-hidden items-start h-full pb-4">
        {/* Render columns if they exist, otherwise show a message */}
        {board.columns.length > 0 ? (
          board.columns.map((column, index) => (
            <Column
              key={column._id}
              column={column}
              index={index}
              onAddCard={handleAddCardToColumn}
              onCardClick={handleCardClick}
              onColumnClick={handleColumnClick}
            />
          ))
        ) : (
          <p className="text-gray-600 mx-2">No columns yet. Add one!</p>
        )}

        {/* This is the ONLY place AddColumnForm should be rendered */}
        <AddColumnForm onAddColumn={handleAddColumn} />
      </div>

      {selectedCard && (
        <CardDetailModal
          isOpen={isCardDetailModalOpen}
          onClose={handleCloseCardDetailModal}
          card={selectedCard}
          onUpdate={handleUpdateCard}
          onDelete={handleDeleteCard}
        />
      )}

      {selectedColumn && (
        <ColumnDetailModal
          isOpen={isColumnDetailModalOpen}
          onClose={handleCloseColumnDetailModal}
          column={selectedColumn}
          onUpdate={handleUpdateColumn}
          onDelete={handleDeleteColumn}
        />
      )}
    </div>
  );
};

export default BoardDetailPage;
