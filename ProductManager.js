class ProductManager {
  static #products = [];
  create(data) {
    const product = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };

    !data.stock || !data.title || !data.photo || !data.category || !data.price
      ? console.log("Producto no creado. Ingrese todos los datos.")
      : ProductManager.#products.push(product);
    console.log("Producto Creado");
  }
  read() {
    return ProductManager.#products;
  }
}

const gestorDeProductos = new ProductManager();

gestorDeProductos.create({
  photo: "foto55.jpg",
  title: "Balancin",
  category: "madera",
  price: 15000,
  stock: 41,
});

gestorDeProductos.create({
  photo: "foto7.jpg",
  title: "Bloques",
  category: "plastico",
  price: 7000,
  stock: 36,
});

gestorDeProductos.create({
  photo: "foto3.jpg",
  title: "Casita",
  category: "madera",
  price: 6500,
  stock: 22,
});

gestorDeProductos.create({
  photo: "luna4.jpg",
  title: "Luna",
  category: "madera",
  price: 7500,
  stock: 39,
});

gestorDeProductos.create({
  photo: "arcoiris.jpg",
  title: "Arcoiris",
  category: "madera",
  price: 7000,
  stock: 36,
});

console.log(gestorDeProductos.read());
