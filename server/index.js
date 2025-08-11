const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));

// db connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// health route
app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
})

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`API server on http://localhost:${PORT}`);
});