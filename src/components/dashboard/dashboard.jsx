import React, { useState, useEffect } from "react";
import "../../App.css";
import Navbar from "../navbar/navbar";
import Homepage from "../homepage/homepage";
import { Link } from "react-router-dom";
function dashboard({ user, admin, superadmin }) {
  const [isListView, setIsListView] = useState(true);
  const [isGridView, setIsGridView] = useState(false);
  
  const switchToGrid = () => {
    setIsGridView(true);
    setIsListView(!isListView);
  };

  const switchToList = () => {
    setIsListView(true);
    setIsGridView(!isGridView);
  };
  console.log(user, admin, superadmin);
  if (user) {
    return (
      <div className="app-container">
        {user && <Navbar user />}
        <div className="app-content"> {user && <Homepage user />}</div>
      </div>
    );
  }

  return (
    <>
      <div className="app-container">
        {admin && <Navbar admin />}
        {superadmin && <Navbar superadmin />}
        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Products</h1>
            <button className="app-content-headerButton">Add User</button>
          </div>
          <div className="app-content-actions">
            <input className="search-bar" placeholder="Search..." type="text" />
            <div className="app-content-actions-wrapper">
              <button
                className={`action-button ${!isGridView ? "list" : "grid"}`}
                onClick={switchToList}
                title="List View"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-list"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
              <button
                className={`action-button ${isGridView ? "list" : "grid"}`}
                onClick={switchToGrid}
                title="Grid View"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-grid"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
            </div>
          </div>

          {admin && <Homepage admin isListView={isListView} />}
          {superadmin && <Homepage superadmin isListView={isListView} />}
        </div>
      </div>
    </>
  );
}

export default dashboard;
