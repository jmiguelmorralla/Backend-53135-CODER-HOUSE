import { randomBytes } from "crypto";

class ProductManager {
  static #products = [];
  create(data) {
    try {
      const one = {
        id: data.id || randomBytes(12).toString("hex"),
        title: data.title,
        photo:
          data.photo ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FfpvUvCBmocfYGwa-EdrH-GEnOaAfmS3aQ&usqp=CAU",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };

      if (!data.title) {
        console.log("Not created file. Please complete TITLE.");
      } else {
        ProductManager.#products.push(one);
        console.log("Created Product.");
      }
    } catch (error) {
      throw error;
    }
  }
  read() {
    try {
      const all = ProductManager.#products;
      if (!all) {
        throw new Error("Error at reading array.");
      } else {
        return all;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      console.log(one);
      if (!one) {
        throw new Error("Product does not exist.");
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  update(id, data) {
    try {
      let one = ProductManager.#products.find((each) => each.id === id);
      console.log(one);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        return one;
      } else {
        const error = new Error("Not product found.");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  destroy(id) {
    try {
      const filtered = ProductManager.#products.filter(
        (each) => each.id !== id
      );
      if (!id) {
        throw new Error("Product does not exist.");
      } else {
        ProductManager.#products = filtered;
        console.log("Deleted " + id + " product.");
      }
    } catch (error) {
      throw error;
    }
  }
}

const productManager = new ProductManager();

productManager.create({
  photo: "foto55.jpg",
  title: "Balancin",
  category: "madera",
  price: 15000,
  stock: 41,
});

productManager.create({
  photo: "foto7.jpg",
  title: "Bloques",
  category: "plastico",
  price: 7000,
  stock: 36,
});

productManager.create({
  title: "Casita",
  category: "madera",
  price: 6500,
  stock: 22,
});

productManager.create({
  photo: "luna4.jpg",
  title: "Luna",
  category: "madera",
  price: 7500,
  stock: 39,
});

productManager.create({
  photo: "arcoiris.jpg",
  title: "Arcoiris",
  category: "madera",
  price: 7000,
  stock: 36,
});

productManager.create({
  title: "Pajarito",
  category: "tela",
  price: 6,
  stock: 18,
});

productManager.create({
  photo: "foto1.jpg",
  title: "Piramide",
  category: "madera",
  price: 9500,
  stock: 21,
});

productManager.create({
  photo: "foto344.jpg",
  title: "Auto",
  category: "madera",
  price: 9900,
  stock: 12,
});

productManager.create({
  photo: "Titere.jpg",
  title: "Titere",
  category: "tela",
  price: 4600,
  stock: 36,
});

productManager.create({
  photo: "serpiente.jpg",
  title: "Serpiente",
  category: "tela",
  price: 7000,
  stock: 7,
});

productManager.create({
  photo: "foto5.jpg",
  title: "Tobogan",
  category: "plastico",
  price: 45000,
  stock: 15,
});

productManager.create({
  photo: "fotom.jpg",
  title: "Muneca",
  category: "plastico",
  price: 7200,
  stock: 40,
});

productManager.create({
  title: "Perro",
  category: "madera",
  price: 3500,
  stock: 20,
});

productManager.create({
  photo: "Elefante.jpg",
  title: "Elefante",
  category: "madera",
  price: 8500,
  stock: 60,
});

productManager.create({
  photo: "Tigre.jpg",
  title: "Tigre",
  category: "madera",
  price: 7000,
  stock: 7,
});

productManager.create({
  title: "Barco",
  category: "plastico",
  price: 5000,
  stock: 25,
});

productManager.create({
  photo: "foto13244.jpg",
  title: "Bolitas",
  category: "vidrio",
  price: 3500,
  stock: 20,
});

productManager.create({
  photo: "foto34111.jpg",
  title: "Raton",
  category: "tela",
  price: 3000,
  stock: 10,
});

productManager.create({
  photo: "doctor.jpg",
  title: "Kit medico",
  category: "plastico",
  price: 6600,
  stock: 3,
});

productManager.create({
  photo: "animales.jpg",
  title: "Animalitos",
  category: "plastico",
  price: 4600,
  stock: 15,
});

productManager.create({
  photo: "toy1.jpg",
  title: "Muneca de trapo",
  category: "tela",
  price: 7300,
  stock: 50,
});

productManager.create({
  photo: "toy2.jpg",
  title: "Bloques de construccion",
  category: "madera",
  price: 8500,
  stock: 30,
});

productManager.create({
  photo: "toy3.jpg",
  title: "Carro control remoto",
  category: "plastico",
  price: 6700,
  stock: 20,
});

productManager.create({
  photo: "toy4.jpg",
  title: "Puzzle 1000 piezas",
  category: "madera",
  price: 9300,
  stock: 40,
});

productManager.create({
  photo: "toy5.jpg",
  title: "Pelota de futbol",
  category: "plastico",
  price: 5200,
  stock: 60,
});

productManager.create({
  photo: "toy6.jpg",
  title: "Cocinita de juguete",
  category: "metal",
  price: 17600,
  stock: 25,
});

productManager.create({
  photo: "toy7.jpg",
  title: "Avion de juguete",
  category: "plastico",
  price: 5800,
  stock: 35,
});

productManager.create({
  photo: "toy8.jpg",
  title: "Muneco articulado",
  category: "metal",
  price: 14900,
  stock: 45,
});

productManager.create({
  photo: "toy9.jpg",
  title: "Juego de te de juguete",
  category: "plastico",
  price: 7300,
  stock: 30,
});

productManager.create({
  photo: "toy10.jpg",
  title: "Kit ciencia experimentos",
  category: "plastico",
  price: 12700,
  stock: 25,
});

productManager.create({
  photo: "toy11.jpg",
  title: "Peluche de animal",
  category: "tela",
  price: 9200,
  stock: 40,
});

productManager.create({
  photo: "toy12.jpg",
  title: "Juego de mesa clasico",
  category: "madera",
  price: 10100,
  stock: 35,
});

productManager.create({
  photo: "toy13.jpg",
  title: "Robot transformable",
  category: "metal",
  price: 16200,
  stock: 20,
});

productManager.create({
  photo: "toy14.jpg",
  title: "Tren de juguete",
  category: "metal",
  price: 8700,
  stock: 30,
});

productManager.create({
  photo: "toy15.jpg",
  title: "Set de plastilina",
  category: "plastico",
  price: 5400,
  stock: 50,
});

productManager.create({
  photo: "toy16.jpg",
  title: "Pelota de baloncesto",
  category: "plastico",
  price: 7800,
  stock: 40,
});

productManager.create({
  photo: "toy17.jpg",
  title: "Dinosaurio de juguete",
  category: "plastico",
  price: 6900,
  stock: 55,
});

productManager.create({
  photo: "toy18.jpg",
  title: "Set de pinturas y pinceles",
  category: "plastico",
  price: 6400,
  stock: 30,
});

productManager.create({
  photo: "toy19.jpg",
  title: "Kit construccion vehiculos",
  price: 17800,
});

productManager.create({
  title: "Instrumento musical juguete",
  category: "tela",
});

console.log(productManager.read());
