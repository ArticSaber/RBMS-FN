"use client";
import styles from "@/styles/page.module.css";
import Navbar from "@/components/navbar/navbar";
import { usePathname } from "next/navigation";
import Role from "@/components/role";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/config";

const Wrapper = ({ children }) => {
  const [role, setRole] = useState("");
  const [add, setAdd] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    role: "",
    active: true,
  });
  const pathname = usePathname();

  const fetchRole = async () => {
    setRole(await Role());
  };
  useEffect(() => {
    fetchRole();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    // console.log(currentUser);
    try {
      const response = await fetch(`${BASE_URL}api/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            setAdd(false);
            setCurrentUser({
              email: "",
              password: "",
              role: "",
              active: true,
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
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
    <>
      {pathname.includes("login") ? (
        children
      ) : (
        <main className={styles.main}>
          <div className={styles["app-container"]}>
            <Navbar role={role} />
            <div className={styles["app-content"]}>{children}</div>
          </div>
          {add && (
            <div className={styles.modal}>
              <form className={styles["modal-content"]} onSubmit={handleAdd}>
                <div className={styles["modal-title"]}>Add User</div>
                <div className={styles["form-item"]}>
                  <label>Email Id:</label>
                  <input
                    type="email"
                    name="email"
                    value={currentUser.email}
                    onChange={handleInputChange}
                  />
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={currentUser.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles["form-item"]}>
                  <label>Status:</label>
                  <select
                    value={currentUser.active ? "Active" : "Inactive"}
                    onChange={handleActiveChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className={styles["form-item"]}>
                  <label>Role:</label>
                  <select
                    name="role"
                    value={currentUser.role}
                    onChange={handleInputChange}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    {role == "superadmin" && (
                      <option value="superadmin">superadmin</option>
                    )}
                  </select>
                </div>
                <div className={styles["nav-button-container"]}>
                  <button
                    className={styles["cancel-btn"]}
                    onClick={() => {
                      setAdd(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button className={styles["update-btn"]} type="submit">
                    Add
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
