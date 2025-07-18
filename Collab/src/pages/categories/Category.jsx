import React from "react";
import "./Category.css";

const categories = [
  {
    title: "Real-Time Collaboration",
    description:
      "Communicate instantly with team members using built-in chat and live Kanban updates through Socket.IO.",
  },
  {
    title: "Kanban Boards",
    description:
      "Organize your projects using a Trello-style board. Create boards, lists, and cards with drag-and-drop features.",
  },
  {
    title: "Markdown Editor",
    description:
      "Document your project clearly using GitHub-style markdown support via React Markdown and SimpleMDE.",
  },
  {
    title: "Authentication & Security",
    description:
      "JWT-based login system with secure storage using localStorage or cookies, and password hashing with bcrypt.",
  },
  {
    title: "Project Management",
    description:
      "Manage ideas, teams, tasks, and timelines in one place. Great for students, developers, and hackathon teams.",
  },
  {
    title: "Tech Stack (MERN)",
    description:
      "Built with React, Node.js, Express, and MongoDB. Axios for API, Tailwind CSS for styling, and Socket.IO for real-time updates.",
  },
];

const Category = () => {
  return (
    <div className="category-container">
      <h1 id="text">Platform Features</h1>
      <div className="cards-wrapper">
        {categories.map((cat, index) => (
          <div className="card" key={index}>
            <h2>{cat.title}</h2>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
