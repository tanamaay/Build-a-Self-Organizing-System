const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const entryRoutes = require("./routes/entry.routes");
const analyticsRoutes = require("./routes/analytics.routes");


const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/entries", entryRoutes);
app.use("/api/analytics", analyticsRoutes);


// Health check
app.get("/", (req, res) => {
  res.send("Maketronics Backend Running");
});

module.exports = app;

