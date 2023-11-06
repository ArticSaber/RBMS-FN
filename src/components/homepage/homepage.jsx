import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { BASE_URL } from "../../../config";
function homepage({ user, admin, superadmin, isListView }) {
  console.log(user, admin, superadmin);
  const [Data, setData] = useState([]);
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/sup/delete/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    role: "",
    active: "",
  });
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (superadmin) {
      axios
        .get(BASE_URL + "/sup/getusers", {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [superadmin]);

  useEffect(() => {
    if (admin) {
      axios
        .get(BASE_URL + "/admin/getusers", {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [admin]);

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`${BASE_URL}/sup/update/${id}`, currentUser, {
        withCredentials: true,
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    setCurrentUser(null);
    setIsOpen(false);
  };

  const handleEdit = (userData) => {
    setCurrentUser(userData);
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleActiveChange = (e) => {
    setCurrentUser({
      ...currentUser,
      active: e.target.value === "Active" ? true : false,
    });
  };

  return (
    <div
      className={`products-area-wrapper ${
        isListView ? "tableView" : "gridView"
      }`}
    >
      {!user && (
        <div className="products-header">
          <div className="product-cell image">Name</div>
          <div className="product-cell status-cell">Status</div>
          <div className="product-cell sales">Create Date</div>
          <div className="product-cell stock">Type</div>
          <div className="product-cell price">Role</div>
          <div className="product-cell price">View</div>
          <div className="product-cell price">Delete</div>
        </div>
      )}
      {Data.map((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = `${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`;
        return (
          <div
            key={item._id}
            className={`products-row ${
              isListView ? "list active" : "grid active"
            }`}
          >
            <div className="product-cell flex">
              <img
                className="image"
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="product"
              />
              <span>{item.email}</span>
            </div>

            <div className="product-cell status-cell">
              <span className="cell-label">Status:</span>
              {item.active ? (
                <span className="status active ">Active</span>
              ) : (
                <span className="status disabled ">Disabled</span>
              )}
            </div>
            <div className="product-cell category">
              <span className="cell-label">Created Date:</span>
              {formattedDate}
            </div>
            <div className="product-cell sales">
              <span className="cell-label">Role:</span>
              {item.role}
            </div>
            <div className="product-cell price">
              <span className="cell-label">Role:</span>
              {item.role}
            </div>

            <div className="product-cell price">
              <button className="edit-button" onClick={() => handleEdit(item)}>
                View User
              </button>
            </div>

            <Dialog
              className="modal"
              open={isOpen}
              onClose={() => setIsOpen(!isOpen)}
            >
              <Dialog.Panel>
                <Dialog.Title className="modal-title">Edit User</Dialog.Title>
                <form
                  className="modal-content"
                  onSubmit={() => {
                    handleUpdate(currentUser.id);
                  }}
                >
                  <div className="form-item">
                    <input
                      type="email"
                      name="email"
                      value={currentUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-item">
                    <label>Status:</label>
                    <select
                      value={currentUser.active ? "Active" : "Inactive"}
                      onChange={handleActiveChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-item">
                    <label>Role:</label>
                    <select
                      name="role"
                      value={currentUser.role}
                      onChange={handleInputChange}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                      {superadmin && (
                        <option value="superadmin">superadmin</option>
                      )}
                    </select>
                  </div>
                  <div className="nav-button-container">
                    <button
                      className="cancel-btn"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button className="update-btn" type="submit">
                      Update
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Dialog>

            <div className="product-cell price">
              <button
                className="delete-button"
                onClick={() => handleDelete(item._id)}
              >
                Delete User
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default homepage;
