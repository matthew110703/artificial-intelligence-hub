import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./lib/connectDB.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
