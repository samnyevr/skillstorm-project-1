import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AddRoommatePage from "./pages/AddRoommatePage";
import AddInventoryPage from "./pages/AddInventoryPage";
import MainPage from "./pages/MainPage";
import "./index.css";

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
