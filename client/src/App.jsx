import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectRoute";
// import { lazy } from "react";

// Lazy-loaded pages
import HomePage from "./pages/HomePage";
import BoardsOverviewPage from "./pages/BoardsOverviewPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/boards"
          element={
            <ProtectedRoute>
              <BoardsOverviewPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/boards/:boardId"
          element={
            <ProtectedRoute>
              <BoardDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
