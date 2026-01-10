import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/index.css";

// Get the root element
const container = document.getElementById("root");

// Ensure container exists
if (!container) throw new Error("Root container not found");

// Create React root and render
const root = createRoot(container);
root.render(<App />);
