import express from "express";
import { default as Category } from "../models/Category.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorize,
} from "./verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    console.log(err);
    res(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL categories
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let categories;

    if (qNew) {
      categories = await Category.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      categories = await Category.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      categories = await Category.find();
    }

    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
export default router;
