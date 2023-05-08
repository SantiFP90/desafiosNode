class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(title, description, price, img, code, stock) {
    if (!title || !description || !price || !img || !code || !stock) {
      console.error(
        "Debe incluir: Titulo, descripción, precio, imágen, código y stock."
      );
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error("Ya existe un producto con ese código");
      return;
    }

    const newProduct = {
      id: this.productIdCounter++,
      title,
      description,
      price,
      img,
      code,
      stock,
    };

    this.products = [...this.products, newProduct];
    console.log("Producto agregado correctamente");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("No existe un producto con ese ID");
      return null;
    }
  }
}

const manager = new ProductManager();

manager.addProduct(
  "producto prueba",
  "este es un producto de prueba",
  200,
  "sinimagen.jpg",
  "abc123",
  25
);

const products = manager.getProducts();
console.log("Array con el producto");
console.log(products);

const product1 = manager.getProductById(1);
console.log("Producto x Id");
console.log(product1);

console.log("Get de productos");
console.log(manager.getProducts());

manager.addProduct("SE AGREGOO??", "descrip", 20, "sinimg", "abc123", 25);
console.log("Ver si se agrego el de codigo repetido");
console.log(manager.getProducts());
