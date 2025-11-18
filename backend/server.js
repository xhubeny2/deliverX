const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const deliveriesRouter = require("./routes/deliveries");

const app = express();

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  }),
);

app.get("/api/test", (req, res) => {
  try {
    res.status(200).json({ message: "API is working fine - v0.1" });
  } catch {
    res.status(500).json({ message: "error.message" });
  }
});

app.use("/api/deliveries", deliveriesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server is up and running on port ${PORT} 🚀`),
);
