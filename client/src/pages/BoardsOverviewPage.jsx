import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

import AddBoardModal from "../components/Board/AddBoardModal.jsx";

const BoardsOverviewPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(
    "BoardsOverviewPage: Rendered. User:",
    user,
    "Loading:",
    loading,
    "Error:",
    error
  );

  useEffect(() => {
    console.log("BoardsOverviewPage useEffect: Running fetchBoards.");
    const fetchBoards = async () => {
      try {
        console.log(
          "BoardsOverviewPage useEffect: Attempting axios.get('/api/boards')..."
        ); // NEW LOG
        const response = await axios.get("http://localhost:5000/api/boards");
        setBoards(response.data);
        console.log(
          "BoardsOverviewPage useEffect: Boards fetched successfully.",
          response.data
        );
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch boards.");
        console.error("BoardsOverviewPage: Error fetching boards:", err); // NEW LOG
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
  }, [logout]); // Dependencies for useEffect

  const handleCreateBoard = async (boardTitle, boardDescription) => {
    try {
      const res = await axios.post("http://localhost:5000/api/boards", {
        title: boardTitle,
        description: boardDescription,
      });
      setBoards((prevBoards) => [...prevBoards, res.data]);
      setIsModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to create board.");
      console.error(err);
    }
  };

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

  // This condition now correctly checks for an empty 'boards' array
  if (boards.length === 0 && !loading && !error) {
    return (
      <div className="min-h-screen p-8 text-gray-600 flex items-center justify-center flex-col">
        <p className="text-xl">
          You don't have any boards yet. Click "Create New Board" to get
          started!
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
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
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-4">Your Boards</h1>
      <p className="mb-6 text-lg">Welcome, {user?.username || "User"}!</p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
      >
        + Create New Board
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <Link
            key={board._id}
            to={`/boards/${board._id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-bold text-gray-800">{board.title}</h2>
            <p className="mt-2 text-gray-600">{board.description}</p>
          </Link>
        ))}
      </div>

      <AddBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateBoard}
      />

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
