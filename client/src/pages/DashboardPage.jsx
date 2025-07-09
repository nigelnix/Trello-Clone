import useAuth from "../hooks/useAuth";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-6 text-lg">Welcome, {user?.username || "User"}!</p>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
