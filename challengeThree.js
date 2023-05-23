const express = require("express");
const app = express();
const ProductManager = require("./challengeTwo");
const { log } = require("console");

const path = "./prueba.txt";
const manager = new ProductManager(path);

const PORT = 8080;

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const products = await manager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/products/id/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const prod = await manager.getProductById(productId);

    if (!prod) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(prod);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
