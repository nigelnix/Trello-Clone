import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
// We'll add react-beautiful-dnd imports later when we implement DND
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Import placeholder components for now, you'll create/update these next
import Column from "../components/Board/Column.jsx";
import AddColumnForm from "../components/Board/AddColumnForm.jsx";

const BoardDetailPage = () => {
  const { boardId } = useParams(); // Get boardId from the URL (e.g., /boards/123)
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function for unauthorized errors

  const [board, setBoard] = useState(null); // State to hold the fetched board data (with populated columns and cards)
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error messages

  // useEffect to fetch the specific board details when the component mounts or boardId changes
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        // Make API call to get a single board by ID
        // Your backend's getBoardById should populate columns and cards
        const response = await axios.get(
          `http://localhost:5000/api/boards/${boardId}`
        );
        setBoard(response.data); // Set the fetched board data to state
      } catch (err) {
        // Handle errors, including unauthorized (401) or not found (404)
        setError(err.response?.data?.msg || "Failed to fetch board.");
        console.error("Error fetching board:", err);

        if (err.response && err.response.status === 401) {
          // If unauthorized, log out the user and redirect to login
          logout();
          navigate("/login");
        } else if (err.response && err.response.status === 404) {
          // If board not found, redirect to the boards overview page
          navigate("/boards");
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchBoard();
  }, [boardId, logout, navigate]); // Dependencies: re-run if boardId, logout, or navigate changes

  // Function to handle adding a new column to this board
  const handleAddColumn = async (columnTitle, columnDescription = "") => {
    try {
      // API call to create a new column, using the nested route
      const response = await axios.post(
        `http://localhost:5000/api/boards/${boardId}/columns`,
        {
          title: columnTitle,
          description: columnDescription, // Pass description if your column model has it
        }
      );
      const newColumn = response.data;

      // Optimistically update the board state with the new column
      setBoard((prevBoard) => {
        if (!prevBoard) return null; // Defensive check
        return {
          ...prevBoard,
          columns: [...prevBoard.columns, newColumn], // Add the new column to the existing array
        };
      });
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add column."); // Use a better alert system later
      console.error("Error adding column:", err);
    }
  };

  // Function to handle adding a new card to a specific column
  const handleAddCardToColumn = async (
    columnId,
    cardTitle,
    cardDescription = ""
  ) => {
    try {
      // API call to create a new card, using the nested route
      const response = await axios.post(
        `http://localhost:5000/api/columns/${columnId}/cards`,
        {
          title: cardTitle,
          description: cardDescription, // Pass description if your card model has it
        }
      );
      const newCard = response.data;

      // Optimistically update the board state by finding the correct column and adding the card
      setBoard((prevBoard) => {
        if (!prevBoard) return null; // Defensive check
        return {
          ...prevBoard,
          columns: prevBoard.columns.map((col) =>
            col._id === columnId
              ? { ...col, cards: [...col.cards, newCard] } // Add card to the specific column
              : col
          ),
        };
      });
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add card."); // Use a better alert system later
      console.error("Error adding card:", err);
    }
  };

  // --- Conditional Rendering for Loading, Error, and Not Found states ---
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-700">Loading board...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen p-8 text-red-600 flex items-center justify-center">
          <p className="text-xl">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  // If board is null after loading (e.g., 404 handled by redirect, but good defensive check)
  if (!board) {
    return (
      <Layout>
        <div className="min-h-screen p-8 text-gray-600 flex items-center justify-center">
          <p className="text-xl">Board not found.</p>
        </div>
      </Layout>
    );
  }

  // --- Main Board Display ---
  return (
    <Layout>
      <div className="flex flex-col h-screen bg-blue-100 p-4">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">{board.title}</h1>
        {/*
          DragDropContext will wrap your droppable areas (columns and cards).
          We'll add this when implementing DND.
          For now, we'll just render the columns directly.
        */}
        <div className="flex overflow-x-auto overflow-y-hidden items-start h-full pb-4">
          {board.columns.length > 0 ? (
            board.columns.map((column, index) => (
              <Column
                key={column._id}
                column={column}
                index={index}
                // Pass the card addition handler down to each Column
                onAddCard={handleAddCardToColumn}
              />
            ))
          ) : (
            <p className="text-gray-600 mx-2">No columns yet. Add one!</p>
          )}

          {/* Add Column Form */}
          <AddColumnForm onAddColumn={handleAddColumn} />
        </div>
      </div>
    </Layout>
  );
};

export default BoardDetailPage;
