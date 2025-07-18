import React from 'react';
import { 
  LayoutDashboard, 
  Plus, 
  List, 
  CreditCard, 
  Tags, 
  User, 
  X
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-listing', label: 'Add Listing', icon: Plus },
    { id: 'view-listings', label: 'View Listings', icon: List },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'categories', label: 'Categories', icon: Tags },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>BookingAdmin</h2>
        <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;