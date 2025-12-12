/**
 * Entry point for the React application.
 * Sets up the router configuration and renders the root React component.
 */

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import AddRoommatePage from "./pages/AddRoommatePage";
import AddInventoryPage from "./pages/AddInventoryPage";
import MainPage from "./pages/MainPage";

import "./index.css";

/**
 * Defines the application's route structure using React Router v6+.
 *
 * Routes:
 * - "/" → Main layout (App) with MainPage.
 * - "/createroomate" → Form to create a roommate.
 * - "/editroomate/:id" → Form to edit an existing roommate.
 * - "/createinventory/:roommateId" → Form to create an inventory item for a specific roommate.
 * - "/editinventory/:roommateId/:inventoryId" → Form to edit an inventory item for a specific roommate.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
  {
    path: "/createroomate",
    element: <App />,
    children: [
      {
        path: "/createroomate",
        element: <AddRoommatePage />,
      },
    ],
  },
  {
    path: "/editroomate/:id",
    element: <App />,
    children: [
      {
        path: "/editroomate/:id",
        element: <AddRoommatePage />,
      },
    ],
  },
  {
    path: "/createinventory/:roommateId",
    element: <App />,
    children: [
      {
        path: "/createinventory/:roommateId",
        element: <AddInventoryPage />,
      },
    ],
  },
  {
    path: "/editinventory/:roommateId/:inventoryId",
    element: <App />,
    children: [
      {
        path: "/editinventory/:roommateId/:inventoryId",
        element: <AddInventoryPage />,
      },
    ],
  },
]);

/**
 * Mounts the root React application to the DOM and initializes routing.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
