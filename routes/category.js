const express = require("express");
const router = express.Router();

const Category = require("../modals/Category");

router.post("/create", async (req, res) => {
  const { name, descrip, caption, img } = req.body;

  try {
    const newCategory = new Category({
      name,
      descrip,
      caption,
      img,
    });
    await newCategory.save();
    res.json("saved");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error2");
  }
});

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.put("/:id", async (req, res) => {
  const { name, descrip, caption, img } = req.body;
  // Build contact object
  const productFields = {};
  if (name) productFields.name = name;
  if (descrip) productFields.descrip = descrip;
  if (caption) productFields.caption = caption;
  if (img) productFields.img = img;

  try {
    let category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ msg: "category not found" });

    category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );
    res.json("updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error2");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ msg: "category not found" });

    await category.remove();
    res.json({ msg: "deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error2");
  }
});

module.exports = router;
