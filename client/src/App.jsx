import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectRoute.jsx";

// Lazy-loaded pages
import HomePage from "./pages/HomePage.jsx";
import BoardsOverviewPage from "./pages/BoardsOverviewPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import BoardDetailPage from "./pages/BoardDetailPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public Routes - these do NOT need ProtectedRoute or Layout (if Layout has Navbar with useAuth) */}
      {/* For HomePage, LoginPage, RegisterPage, they should render their own content directly.
          If they also need the Navbar, then the Navbar itself needs to be moved or made conditional.
          Given Navbar uses useAuth, it MUST be inside AuthProvider.
          Let's assume ALL pages need the Navbar.
      */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />{" "}
      {/* Wrap HomePage with Layout */}
      <Route
        path="/login"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />{" "}
      {/* Wrap LoginPage with Layout */}
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/boards"
          element={
            <Layout>
              <BoardsOverviewPage />
            </Layout>
          }
        />
        <Route
          path="/boards/:boardId"
          element={
            <Layout>
              <BoardDetailPage />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
}
