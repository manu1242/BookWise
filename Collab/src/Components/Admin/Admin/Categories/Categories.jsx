import React, { useState, useEffect } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import "./Categories.css";
import axios from "axios";
import { toast } from "react-toastify";

const Categories = ({ listings }) => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}api/categories`
      );
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}api/categories/add`,
          {
            name: newCategory.trim(),
          }
        );

        if (res.data.success) {
          setCategories([...categories, res.data.category]); // full object
          setNewCategory("");
          setIsModalOpen(false);
        }
      } catch (err) {
        toast.success(err.response?.data?.message || "Failed to add category");
      }
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}api/categories/${categoryId}`
        );
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category", error);
      }
    }
  };

  return (
    <div className="categories">
      <div className="categories-header">
        <h1>Categories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="add-category-btn"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category._id} className="category-card">
            <h3>{category.name}</h3>
            <p>
              {
                listings.filter(
                  (l) =>
                    l.category?.toLowerCase() === category.name?.toLowerCase()
                ).length
              }{" "}
              listings
            </p>

            <button
              onClick={() => handleDeleteCategory(category._id)}
              className="delete-btn"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} />
            </button>
            <h2>Add New Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="modal-input"
            />
            <button onClick={handleAddCategory} className="modal-submit">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
