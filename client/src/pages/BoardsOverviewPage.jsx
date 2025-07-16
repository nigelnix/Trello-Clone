import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import AddBoardModal from "../components/Board/AddBoardModal"; // <--- Import the AddBoardModal

const BoardsOverviewPage = () => {
  const { user, logout } = useAuth();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // <--- New state for modal visibility

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/boards"); // Use your full backend URL
        setBoards(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch boards.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []); // Empty dependency array means this runs once on mount

  // <--- New function to handle board creation from the modal
  const handleCreateBoard = async (boardTitle, boardDescription) => {
    try {
      const res = await axios.post("http://localhost:5000/api/boards", {
        title: boardTitle,
        description: boardDescription, // Ensure your backend accepts description
      });
      setBoards((prevBoards) => [...prevBoards, res.data]); // Add new board to state
      setIsModalOpen(false); // Close the modal on success
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to create board."); // Use a better alert system later
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading boards...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen p-8 text-red-600">
          <p>Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-3xl font-semibold mb-4">Your Boards</h1>
        <p className="mb-6 text-lg">Welcome, {user?.username || "User"}!</p>

        {/* <--- "Create New Board" button */}
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal when clicked
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
        >
          + Create New Board
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.length > 0 ? (
            boards.map((board) => (
              <Link
                key={board._id}
                to={`/boards/${board._id}`}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-bold text-gray-800">
                  {board.title}
                </h2>
                <p className="mt-2 text-gray-600">{board.description}</p>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">
              You don't have any boards yet. Click "Create New Board" to get
              started!
            </p>
          )}
        </div>

        {/* <--- Render the AddBoardModal component */}
        <AddBoardModal
          isOpen={isModalOpen} // Pass state to control visibility
          onClose={() => setIsModalOpen(false)} // Callback to close modal
          onCreate={handleCreateBoard} // Callback to handle actual board creation
        />

        <button
          onClick={logout}
          className="mt-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default BoardsOverviewPage;
