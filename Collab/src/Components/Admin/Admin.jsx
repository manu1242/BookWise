import React, { useEffect, useState } from "react";
import Sidebar from "../Admin/Admin/Sidebar/Sidebar";
import Header from "../Admin/Admin/Header/Header";
import Dashboard from "../Admin/Admin/Dashboard/Dashboard";
import AddListing from "../Admin/Admin/AddListing/AddListing";
import ViewListings from "../Admin/Admin/ViewListings/ViewListings";
import Payments from "../Admin/Admin/Payments/Payments";
import Categories from "../Admin/Admin/Categories/Categories";
import Profile from "../Admin/Admin/Profile/Profile";
import axios from "axios";
import "./app.css";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [revenue, setRevenue] = useState(0);

  // Fetch real backend data once
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings/dashboard`
      );

      setListings(res.data.AllBookings || []);
      setUsers(res.data.AllUsers || []);
      setRevenue(res.data.totalRevenue || 0);
      setCategories([...new Set(res.data.AllBookings?.map((b) => b.category))]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleAddListing = async (newListing) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings/create`,
        newListing
      );

      setListings([...listings, res.data]); // Push backend response
    } catch (err) {
      console.error("Error adding new listing:", err);
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`);
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleAddCategory = (newCategory) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            listings={listings}
            users={users}
            revenue={revenue}
            payments={payments}
          />
        );
      case "add-listing":
        return (
          <AddListing
            categories={categories}
            onAddListing={handleAddListing}
            onAddCategory={handleAddCategory}
          />
        );
      case "view-listings":
        return (
          <ViewListings
            listings={listings}
            onDeleteListing={handleDeleteListing}
          />
        );
      case "payments":
        return <Payments payments={payments} />;
      case "categories":
        return (
          <Categories
            categories={categories}
            listings={listings}
            onAddCategory={handleAddCategory}
          />
        );
      case "profile":
        return <Profile />;
      default:
        return (
          <Dashboard
            listings={listings}
            users={users}
            revenue={revenue}
            payments={payments}
          />
        );
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div
        className="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
      ></div>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="main-content">
        <Header
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Admin;
