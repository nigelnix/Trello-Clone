import React, { Suspense } from "react";
import Navbar from "./Navbar.jsx"; // Ensure .jsx extension
// import { Outlet } from "react-router-dom"; // <--- REMOVE Outlet import, as we're using children

// Layout now accepts a 'children' prop
const Layout = ({ children }) => {
  // <--- ADD { children } here
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {children} {/* <--- RENDER children instead of Outlet */}
      </main>
    </div>
  );
};

export default Layout;
