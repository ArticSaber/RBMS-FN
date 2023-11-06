export const BASE_URL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "http://localhost:3000/auth"
    : "";
