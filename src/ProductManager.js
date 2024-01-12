const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = this.loadProducts();
        this.nextId = this.calculateNextId();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data) || [];
        } catch (error) {
            return [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.filePath, data);
    }

    calculateNextId() {
        if (this.products.length === 0) {
            return 1;
        }
        const maxId = Math.max(...this.products.map(product => product.id));
        return maxId + 1;
    }

    getProducts() {
        return this.products;
    }

    addProduct(productData) {
        if (!this.products.some(product => product.code === productData.code)) {
            const newProduct = { id: this.nextId++, ...productData };
            this.products.push(newProduct);
            this.saveProducts();
            console.log(`El producto ${productData.title} fue agregado correctamente`);
        } else {
            console.log(`Ya existe un producto con el código ${productData.code}`);
        }
    }

    getProductById(productId) {
        const product = this.products.find(product => product.id === productId);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado");
            return null;
        }
    }

    updateProduct(productId, updatedData) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedData, id: productId };
            this.saveProducts();
            console.log(`El producto con ID ${productId} fue actualizado correctamente`);
        } else {
            console.log("Producto no encontrado");
        }
    }

    deleteProduct(productId) {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            console.log(`El producto con ID ${productId} fue eliminado correctamente`);
        } else {
            console.log("Producto no encontrado");
        }
    }
}


const productManager = new ProductManager('productos.json');

productManager.addProduct({ title: "Remera", description: "Color Blanco", price: 14000, thumbnail: "/images/remera1.jpg", code: "1", stock: "10" });
productManager.addProduct({ title: "Pantalon", description: "Color Gris", price: 24000, thumbnail: "/images/pantalon1.jpg", code: "2", stock: "20" });
productManager.addProduct({ title: "Campera", description: "Color Negra", price: 4000, thumbnail: "/images/campera1.jpg", code: "3", stock: "30" });
productManager.addProduct({ title: "Remera", description: "Color Blanco", price: 14000, thumbnail: "/images/remera1.jpg", code: "1", stock: "10" });

console.log(productManager.getProducts());

const productById = productManager.getProductById(2);
console.log(productById);

productManager.updateProduct(2, { price: 50000, stock: 15 });
console.log(productManager.getProducts());

productManager.deleteProduct(1);
console.log(productManager.getProducts());
