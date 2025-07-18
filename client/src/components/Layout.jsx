import React, { Suspense } from "react";
import Navbar from "./Navbar.jsx";

// Layout now accepts a 'children' prop
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;
