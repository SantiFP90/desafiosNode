const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.productIdCounter = 1;
    this.products = [];
    // this.writeProducts(this.products);
  }

  writeProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products));
  }

  readProductos = async () => {
    try {
      const contenido = await fs.promises.readFile(this.path, "utf8");
      this.products = JSON.parse(contenido);
      return this.products;
    } catch (e) {
      throw new Error(
        "Hubo un error de lectura. El path actual es: " + this.path
      );
    }
  };

  async addProduct(title, description, price, img, code, stock) {
    try {
      await this.readProductos();
      if (!title || !description || !price || !img || !code || !stock) {
        ("Debe incluir: Titulo, descripción, precio, imágen, código y stock.");
        return;
      }
      if (this.products.some((product) => product.code === code)) {
        return console.error("Ya existe un producto con ese código");
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
      // products.push(newProduct);
      this.writeProducts(this.products);
      console.log("Producto agregado correctamente");
    } catch (e) {
      console.log("Hay un error al agregar los productos: " + e.message);
    }
  }

  async getProducts() {
    await this.readProductos();
    console.log(this.products);
    return this.products;
  }

  async getProductById(id) {
    await this.readProductos();
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      return "No existe un producto con el ID: " + id;
    }
  }

  async getProductByCode(code) {
    await this.readProductos();
    const product = this.products.find((p) => p.code === code);
    if (product) {
      console.log(product);
      return product;
    } else {
      return "No existe un producto con el code: " + code;
    }
  }

  // Al igual que el add, le pido todo lo necesario par actualizar el producto
  async updateProduct(id, title, description, price, img, code, stock) {
    await this.readProductos();
    const exist = this.products.find((p) => p.id === id);
    //guardar indice, para identificarlo luego en el array que leemos
    const index = this.products.findIndex((p) => p.id === id);
    if (!exist) {
      console.log("Ese ID no existe");
      return "No existe un producto con el ID: " + id;
    }

    const newProduct = {
      title,
      description,
      price,
      img,
      code,
      stock,
    };

    this.products[index] = {
      ...newProduct,
      id: id,
    };
    this.writeProducts(this.products);
    console.log("Actualizado");
    return "Producto actualizado con exito!";
  }

  async deleteProduct(id) {
    await this.readProductos();
    const exist = this.products.find((p) => p.id === id);
    const index = this.products.findIndex((p) => p.id === id);
    if (!exist) {
      console.log("Ese ID no existe");
      return "No existe un producto con el ID: " + id;
    }
    const deleted = this.products.splice(index, 1)[0];
    this.writeProducts(this.products);
    return deleted;
  }
}

module.exports = ProductManager;

// const path = "./prueba.txt";
// const manager = new ProductManager(path);
// manager.getProductByCode("abc22123125425424");
// manager.addProduct(
//   "producto prueba definitivo",
//   "este es un producto de prueba definitivo",
//   999,
//   "sinimagen.jpg",
//   "abc22123125425424",
//   3
// );
// manager.addProduct(
//   "Tercero producto prueba",
//   "este es un producto de prueba 3",
//   2210,
//   "sinimagen.jpg",
//   "abc123123123567",
//   29
// );

// // manager.getProducts();
// manager.deleteProduct(2);
// manager.updateProduct(
//   2,
//   "xd probando para el seba",
//   "ojala ande",
//   99,
//   "no img",
//   "lol12",
//   9
// );
