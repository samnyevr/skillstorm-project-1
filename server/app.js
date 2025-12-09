import express from "express";
import inventoryRoutes from "./routes/inventory.routes.js";
import roommateRoutes from "./routes/roommate.routes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/roommates", roommateRoutes);
app.use("/api/inventories", inventoryRoutes);

export default app;
