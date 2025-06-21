// src/index.ts
import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import ItemModel from "./models/item";

const app = express();
const PORT = 5000;
const uploadDir = path.join(__dirname, "uploads");

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://mohitbharde:dtSc8BpD5EtpcgpY@cluster0.i1nehjc.mongodb.net/itemsdb"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

app.post(
  "/items",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const { name, type, description } = req.body;
      const cover = (req.files as any)["cover"][0];
      const images = (req.files as any)["images"] || [];

      const newItem = new ItemModel({
        name,
        type,
        description,
        cover: `/uploads/${cover.filename}`,
        images: images.map(
          (img: Express.Multer.File) => `/uploads/${img.filename}`
        ),
      });

      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      console.error("Error saving item:", error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

app.get("/items", async (_req, res) => {
  try {
    const items = await ItemModel.find();
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
