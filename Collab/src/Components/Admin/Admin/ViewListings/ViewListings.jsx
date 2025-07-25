import React, { useState } from "react";
import { Search, MapPin, Phone, Star, Edit, Trash2 } from "lucide-react";
import "./ViewListings.css";

const ViewListings = ({ listings, onDeleteListing }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter listings based on search input
  const filteredListings = listings.filter((listing) =>
    listing.providerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-listings">
      <div className="listings-header">
        <h1>All Listings</h1>
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="listings-grid">
        {filteredListings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <img
              src={
                listing.images && listing.images.length > 0
                  ? listing.images[0]
                  : "/placeholder.jpg"
              }
              alt={listing.providerName}
            />
            <div className="listing-content">
              <h3>{listing.providerName}</h3>

              <p className="location">
                <MapPin size={16} />
                {listing.location}
              </p>

              <p className="phone">
                <Phone size={16} />
                {listing.phone}
              </p>

              <div className="listing-meta">
                <span className="price">₹{listing.price}</span>
                <div className="rating">
                  <Star size={16} />
                  <span>{listing.rating}</span>
                </div>
              </div>

              <p className="category">{listing.category}</p>

              {listing.description && (
                <p className="description">{listing.description}</p>
              )}

              <div className="listing-actions">
                <button className="edit-btn">
                  <Edit size={16} />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this listing?")) {
                      onDeleteListing(listing._id);
                    }
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredListings.length === 0 && (
          <p className="no-results">No listings found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewListings;
