import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import './Categories.css';

const Categories = ({ categories, listings, onAddCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="categories">
      <div className="categories-header">
        <h1>Categories</h1>
        <button onClick={() => setIsModalOpen(true)} className="add-category-btn">
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="categories-grid">
        {categories.map(category => (
          <div key={category} className="category-card">
            <h3>{category}</h3>
            <p>{listings.filter(l => l.category === category).length} listings</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
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
