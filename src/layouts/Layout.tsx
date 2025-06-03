// src/layouts/Layout.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import "./Layout.css";

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      {/* ─────────── Sidebar ─────────── */}
      <nav className="sidebar">
        <Link to="/">Home</Link>
        <Link to="/image">Image Upload</Link>
        <Link to="/video">Video Upload</Link>
        <Link to="/camera">Live Camera</Link>
        <Link to="/feedbacks">Feedback Listesi</Link>
      </nav>

      {/* ─────────── Main Content ─────────── */}
      <div className="main-content">
        <Header title="Secure Image Masking Algorithm" logoUrl="/logo.jpg" />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
