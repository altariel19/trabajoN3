const express = require('express');

const ProductManager = require('./ProductManager'); 

const app = express();

const port = 8080;

const productManager = new ProductManager('./productos.json');

app.get('/products', (req, res) => {
  const limit = req.query.limit;

  let products = productManager.getAllProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit, 10));
  }

  res.json({ products });
});

app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log('Server is running on port ${port}');
});


