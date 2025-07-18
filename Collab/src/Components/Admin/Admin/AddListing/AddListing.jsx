import React, { useState } from "react";
import { Upload } from "lucide-react";
import "./AddListing.css";
import axios from "axios";

const AddListing = ({ categories, onAddListing, onAddCategory }) => {
  const [newListing, setNewListing] = useState({
    providerName: "",
    phone: "",
    location: "",
    price: "",
    rating: "",
    category: "",
    description: "",
    images: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      providerName: newListing.providerName,
      phone: Number(newListing.phone),
      email: newListing.email,
      price: Number(newListing.price),
      location: newListing.location,
      category: newListing.category,
      images: newListing.images, // currently just URLs
      rating: Number(newListing.rating),
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings/create`,
        bookingData
      );

      console.log("Booking added:", res.data);
      alert("Booking added!");

      setNewListing({
        providerName: "",
        phone: "",
        email: "",
        location: "",
        price: "",
        rating: "",
        category: "",
        description: "",
        images: [],
      });
    } catch (err) {
      console.error("Error submitting booking:", err);
      alert("Error submitting booking");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setNewListing({
      ...newListing,
      images: [...newListing.images, ...imageUrls],
    });
  };

  const addCategory = () => {
    const newCategory = prompt("Enter new category name:");
    onAddCategory(newCategory);
  };

  return (
    <div className="add-listing">
      <h1>Add New Listing</h1>
      <form onSubmit={handleSubmit} className="listing-form">
        <div className="form-group">
          <label>Title / Name</label>
          <input
            type="text"
            value={newListing.providerName}
            onChange={(e) =>
              setNewListing({ ...newListing, providerName: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={newListing.phone}
            onChange={(e) =>
              setNewListing({ ...newListing, phone: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="tel"
            value={newListing.email}
            onChange={(e) =>
              setNewListing({ ...newListing, email: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={newListing.location}
            onChange={(e) =>
              setNewListing({ ...newListing, location: e.target.value })
            }
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={newListing.price}
              onChange={(e) =>
                setNewListing({ ...newListing, price: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={newListing.rating}
              onChange={(e) =>
                setNewListing({ ...newListing, rating: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Category</label>
          <div className="category-select">
            <select
              value={newListing.category}
              onChange={(e) =>
                setNewListing({ ...newListing, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addCategory}
              className="add-category-btn"
            >
              Add New
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Images</label>
          <div className="image-upload">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
            />
            <label htmlFor="image-upload" className="upload-btn">
              <Upload size={20} />
              Upload Images
            </label>
          </div>
          {newListing.images.length > 0 && (
            <div className="image-preview">
              {newListing.images.map((img, index) => (
                <img key={index} src={img} alt={`Preview ${index}`} />
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={newListing.description}
            onChange={(e) =>
              setNewListing({ ...newListing, description: e.target.value })
            }
            rows="4"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
