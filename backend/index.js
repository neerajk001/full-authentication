import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Db/connectDb.js";
import authroutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";  // ✅ Required for __dirname in ES modules

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend origin
    credentials: true, // Allow cookies and authentication headers
  })
);

const PORT = process.env.PORT || 5001;

// ✅ Manually define __dirname in ES module mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Parsing the body
app.use(cookieParser());
app.use("/api/auth", authroutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/auth-page/dist")));  // ✅ Go up one level
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../frontend/auth-page/dist/index.html"));  // ✅ Corrected path
    });
  }
  

app.listen(PORT, () => {
  connectDb();
  console.log(`Server running on port ${PORT}`);
});
