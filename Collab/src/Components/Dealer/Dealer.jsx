import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import "./Dealer.css";
import axios from "axios";

const Dealer = ({ onAddListing, onAddCategory }) => {
  const [newListing, setNewListing] = useState({
    providerName: "",
    phone: "",
    email: "",
    location: "",
    price: "",
    rating: "",
    category: "",
    description: "",
    image: null,
  });

  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}api/categories`
        );
        if (res.data.success) {
          setAvailableCategories(res.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}api/categories`,
          {
            name: newCategory,
          }
        );
        if (res.data.success) {
          setAvailableCategories((prev) => [...prev, res.data.category]);
        }
      } catch (err) {
        console.error("Error adding category", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("providerName", newListing.providerName);
    formData.append("phone", newListing.phone);
    formData.append("email", newListing.email);
    formData.append("price", newListing.price);
    formData.append("location", newListing.location);
    formData.append("category", newListing.category);
    formData.append("rating", newListing.rating);
    formData.append("description", newListing.description);
    formData.append("image", newListing.image);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/admin/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
        image: null,
      });
    } catch (err) {
      console.error("Error submitting booking:", err);
      alert("Error submitting booking");
    }
  };
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewListing({ ...newListing, image: file });
      setPreview(URL.createObjectURL(file));
    }
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
            type="email"
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
              required
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
              required
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
              required
            >
              <option value="">Select Category</option>
              {availableCategories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
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
              accept="image/*"
              onChange={handleImageChange}
              required
              id="image-upload"
            />
            <label htmlFor="image-upload" className="upload-btn">
              <Upload size={20} />
              Upload Image
            </label>
          </div>

          {/* ✅ Image Preview Section */}
          {preview && (
            <div className="image-preview">
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginTop: "10px",
                  border: "1px solid #ccc",
                }}
              />
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
            required
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

export default Dealer;