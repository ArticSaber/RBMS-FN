import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/login";
// import DashboardPage from "./pages/DashboardPage/DashboardPage";
// import Signup from "./components/signup/signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  // {
  //   path: "/signup",
  //   element: <Signup/>,
  // },
  // {
  //   path: "/dashboard",
  //   element:<DashboardPage/>,
  // }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
