const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const dns = require("dns");

dns.setServers(["1.1.1.1" , "8.8.8.8"]);

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");

dotenv.config();

console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();


// Connect Database
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/document", documentRoutes);


// Test Route
app.get("/", (req, res) => {
    res.send("Document Verification API is Running...");
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});