import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard.jsx";
import Error405 from "./components/error405/error405.jsx";
import { Navigate, useLocation } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const role = getCookie("role");

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: role ? (
      <Navigate to={`/${role}dashboard`} />
    ) : (
      <Navigate to="/login" />
    ),
  },
  {
    path: "/login",
    element: role ? <Navigate to={`/${role}dashboard`} /> : <App />,
  },
  {
    path: "/userdashboard",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <Dashboard user />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admindashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Dashboard admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/superadmindashboard",
    element: (
      <ProtectedRoute allowedRoles={["superadmin"]}>
        <Dashboard superadmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Error405 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
