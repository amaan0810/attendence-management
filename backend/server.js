// Main server entry point
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config(); // Loads environment variables
connectDB(); // Connects to MongoDB

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace this with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // HTTP methods allowed
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    credentials: true, // Allow cookies if needed,
    optionSuccessStatus: 200,
  })
);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/admin", require("./routes/admin"));

app.get("/", (req, res) => {
  // Send the HTML file as the response
  res.send("Hello World");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
