var express = require("express");
var Product = require("../models/product");
var Review = require("../models/review");

var router = express.Router();

router.get("/", function (req, res) {
  res.send("You have landed on Mintroad API. Start building your awesome app!");
});

router.get("/product", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

router.post("/product", async (req, res) => {
  const product = new Product(req.body);
  product.save();
  res.json(product);
});

router.put("/product/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json(product);
});

router.delete("/product/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  res.json(product);
});

router.post("/product/:id/review", async (req, res) => {
  const product = await Product.findById(req.params.id);
  const review = new Review(req.body);
  review.product = product;
  review.save();

  const reviews = await Review.find({ product: req.params.id });
  console.log(reviews);
  let average = 0;
  reviews.forEach((r) => (average += r.rating));
  average = average / reviews.length;

  product.rating = average.toFixed(2);
  product.save();

  console.log("AVERAGE RAting", average);

  res.json(review);
});

router.get("/product/:id/review", async (req, res) => {
  const reviews = await Review.find({ product: req.params.id });
  res.json(reviews);
});

module.exports = router;
