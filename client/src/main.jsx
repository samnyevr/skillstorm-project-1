import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import RoommateRecord from "./components/RoommateRecord";
import InventoryRecord from "./components/InventoryRecord";
import RecordList from "./components/RecordList";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/createroomate",
    element: <App />,
    children: [
      {
        path: "/createroomate",
        element: <RoommateRecord />,
      },
    ],
  },
  {
    path: "/editroomate/:id",
    element: <App />,
    children: [
      {
        path: "/editroomate/:id",
        element: <RoommateRecord />,
      },
    ],
  },
  {
    path: "/createinventory",
    element: <App />,
    children: [
      {
        path: "/createinventory",
        element: <InventoryRecord />,
      },
    ],
  },
  {
    path: "/editinventory/:id",
    element: <App />,
    children: [
      {
        path: "/editinventory/:id",
        element: <InventoryRecord />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
