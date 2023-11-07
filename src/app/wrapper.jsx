"use client";
import styles from "@/styles/page.module.css";
import Navbar from "@/components/navbar/navbar";
import classNames from "classnames";

import { usePathname } from "next/navigation";
import Role from "@/components/role";
import { useEffect, useState } from "react";

const Wrapper = ({ children }) => {
  const [role, setRole] = useState("");
  const [add, setAdd] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    role: "",
    active: "",
  });
  const pathname = usePathname();

  const fetchRole = async () => {
    setRole(await Role());
  };
  useEffect(() => {
    fetchRole();
  }, []);

  return (
    <>
      {pathname.includes("login") ? (
        children
      ) : (
        <main className={styles.main}>
          <div className={styles["app-container"]}>
            <Navbar role={role} />
            <div className={styles["app-content"]}>
              <div className={styles["app-content-header"]}>
                <h1 className={styles["app-content-headerText"]}>Products</h1>
                <button className={styles["app-content-headerButton"]} onClick={() => setAdd(true)}>
                  Add User
                </button>
              </div>
              <div className={styles["app-content-actions"]}>
                <input className={styles["search-bar"]} placeholder="Search..." type="text" />
              </div>
              {children}
            </div>
          </div>
          {add && (
            <div className={styles.modal}>
              <form
                className={styles["modal-content"]}
                onSubmit={() => {
                  handleUpdate(currentUser._id);
                }}
              >
                <div className={styles["modal-title"]}>Add User</div>
                <div className={styles["form-item"]}>
                  <input
                    type="email"
                    name="email"
                    value={currentUser.email}
                    // onChange={handleInputChange}
                  />
                </div>
                <div className={styles["form-item"]}>
                  <label>Status:</label>
                  <select
                    value={currentUser.active ? "Active" : "Inactive"}
                    // onChange={handleActiveChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className={styles["form-item"]}>
                  <label>Role:</label>
                  <select name="role" value={currentUser.role}
                  //  onChange={handleInputChange}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    {role == "superadmin" && <option value="superadmin">superadmin</option>}
                  </select>
                </div>
                <div className={styles["nav-button-container"]}>
                  <button
                    className={styles["cancel-btn"]}
                    onClick={() => {
                      setEdit(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button className={styles["update-btn"]} type="submit">
                    Update
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default Wrapper;
