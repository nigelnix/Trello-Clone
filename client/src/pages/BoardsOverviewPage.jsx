import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

import AddBoardModal from "../components/Board/AddBoardModal.jsx";
import BoardDetailModal from "../components/Board/BoardDetailModal.jsx"; // <--- NEW IMPORT

const BoardsOverviewPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false); // Renamed for clarity

  // --- NEW STATE FOR BOARD DETAIL MODAL ---
  const [isBoardDetailModalOpen, setIsBoardDetailModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  // --- END NEW STATE ---

  console.log(
    "BoardsOverviewPage: Rendered. User:",
    user,
    "Loading:",
    loading,
    "Error:",
    error,
    "isAddBoardModalOpen:",
    isAddBoardModalOpen, // Log new state
    "isBoardDetailModalOpen:",
    isBoardDetailModalOpen // Log new state
  );

  useEffect(() => {
    console.log("BoardsOverviewPage useEffect: Running fetchBoards.");
    const fetchBoards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/boards");
        setBoards(response.data);
        console.log(
          "BoardsOverviewPage useEffect: Boards fetched successfully.",
          response.data
        );
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch boards.");
        console.error("Error fetching boards:", err);

        if (err.response && err.response.status === 401) {
          console.log(
            "BoardsOverviewPage useEffect: 401 received. Logging out."
          );
          logout();
        }
      } finally {
        setLoading(false);
        console.log("BoardsOverviewPage useEffect: Loading set to false.");
      }
    };

    fetchBoards();
  }, [logout]);

  const handleCreateBoard = async (boardTitle, boardDescription) => {
    try {
      const res = await axios.post("http://localhost:5000/api/boards", {
        title: boardTitle,
        description: boardDescription,
      });
      setBoards((prevBoards) => [...prevBoards, res.data]);
      setIsAddBoardModalOpen(false); // Close add modal
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to create board.");
      console.error(err);
    }
  };

  // --- NEW HANDLERS FOR BOARD DETAIL MODAL ---
  const handleBoardClick = (board) => {
    setSelectedBoard(board);
    setIsBoardDetailModalOpen(true);
  };

  const handleCloseBoardDetailModal = () => {
    setSelectedBoard(null);
    setIsBoardDetailModalOpen(false);
  };

  const handleUpdateBoard = async (updatedBoardData) => {
    console.log(
      "BoardsOverviewPage: handleUpdateBoard called with data:",
      updatedBoardData
    );
    try {
      const response = await axios.put(
        `http://localhost:5000/api/boards/${updatedBoardData._id}`,
        updatedBoardData
      );
      const updatedBoard = response.data;
      console.log(
        "BoardsOverviewPage: Board updated successfully. Response:",
        updatedBoard
      );

      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board._id === updatedBoard._id ? updatedBoard : board
        )
      );
      handleCloseBoardDetailModal(); // Close modal after update
    } catch (err) {
      console.error("BoardsOverviewPage: Error updating board:", err);
      alert(err.response?.data?.msg || "Failed to update board.");
    }
  };

  const handleDeleteBoard = async (boardId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this board? This will also delete all its columns and cards."
      )
    ) {
      try {
        await axios.delete(`http://localhost:5000/api/boards/${boardId}`);
        setBoards((prevBoards) =>
          prevBoards.filter((board) => board._id !== boardId)
        );
        handleCloseBoardDetailModal(); // Close modal after delete
      } catch (err) {
        console.error("BoardsOverviewPage: Error deleting board:", err);
        alert(err.response?.data?.msg || "Failed to delete board.");
      }
    }
  };
  // --- END NEW HANDLERS ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading boards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 text-red-600 flex items-center justify-center flex-col">
        <p className="text-xl">Error: {error}</p>
        <button
          onClick={logout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  if (boards.length === 0 && !loading && !error) {
    return (
      <div className="min-h-screen p-8 text-gray-600 flex items-center justify-center flex-col">
        <p className="text-xl">
          You don't have any boards yet. Click "Create New Board" to get
          started!
        </p>
        <button
          onClick={() => setIsAddBoardModalOpen(true)} // Use new state name
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
        >
          + Create New Board
        </button>
        <button
          onClick={logout}
          className="mt-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
        <AddBoardModal
          key="add-board-modal-empty-state"
          isOpen={isAddBoardModalOpen} // Use new state name
          onClose={() => setIsAddBoardModalOpen(false)} // Use new state name
          onCreate={handleCreateBoard}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-4">Your Boards</h1>
      <p className="mb-6 text-lg">Welcome, {user?.username || "User"}!</p>

      <button
        onClick={() => setIsAddBoardModalOpen(true)} // Use new state name
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
      >
        + Create New Board
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          // Change Link to a div with an onClick handler for the modal
          <div
            key={board._id}
            onClick={() => handleBoardClick(board)} // <--- NEW onClick HANDLER
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer" // <--- ADD cursor-pointer
          >
            <h2 className="text-xl font-bold text-gray-800">{board.title}</h2>
            <p className="mt-2 text-gray-600">{board.description}</p>
          </div>
          // If you still want to navigate to the board detail page, you'll need a separate button/icon
          // or modify this logic to open modal AND navigate. For now, this replaces navigation.
          // <Link
          //   key={board._id}
          //   to={`/boards/${board._id}`}
          //   className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          // >
          //   <h2 className="text-xl font-bold text-gray-800">{board.title}</h2>
          //   <p className="mt-2 text-gray-600">{board.description}</p>
          // </Link>
        ))}
      </div>

      <AddBoardModal
        isOpen={isAddBoardModalOpen} // Use new state name
        onClose={() => setIsAddBoardModalOpen(false)} // Use new state name
        onCreate={handleCreateBoard}
      />

      {/* --- RENDER BOARD DETAIL MODAL --- */}
      {selectedBoard && (
        <BoardDetailModal
          isOpen={isBoardDetailModalOpen}
          onClose={handleCloseBoardDetailModal}
          board={selectedBoard}
          onUpdate={handleUpdateBoard}
          onDelete={handleDeleteBoard}
        />
      )}
      {/* --- END RENDER BOARD DETAIL MODAL --- */}

      <button
        onClick={logout}
        className="mt-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default BoardsOverviewPage;
