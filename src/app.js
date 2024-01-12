const express = require('express');
const ProductManager = require('./ProductManager'); // Asegúrate de tener la ruta correcta al archivo ProductManager

const app = express();
const port = 8080;

// Endpoint para obtener todos los productos o limitar según el query param
app.get('/products', (req, res) => {
  const limit = req.query.limit; // Obtener el valor del query param 'limit'
  
  try {
    const products = ProductManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Endpoint para obtener un producto específico por su id
app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid;

  try {
    const product = ProductManager.getProductById(productId);
    
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
