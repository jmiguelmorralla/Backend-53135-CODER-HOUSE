import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.path = "./src/data/fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Created file.");
    } else {
      console.log("File already exists.");
    }
  }

  async create(data) {
    try {
      if (!data.title) {
        throw new Error("Not created product. Please complete TITLE.");
      } else {
        const one = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FfpvUvCBmocfYGwa-EdrH-GEnOaAfmS3aQ&usqp=CAU",
          category: data.category || "plastico",
          price: data.price || 1,
          stock: data.stock || 1,
        };

        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(one);
        console.log("Product created succesfully.");
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  async read(cat) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      cat && (all = all.filter((each) => each.category === cat));
      if (!all) {
        new Error("Error at reading array.");
      } else {
        return all;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);
      console.log(one);
      if (!one) {
        throw new Error("Product does not exist.");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, data) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
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

  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);
      if (!one) {
        const error = new Error("Product does not exist.");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("Deleted " + id + " product.");
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

async function testCreate() {
  const productManager = new ProductManager();

  await productManager.create({
    photo: "https://react-js-pf-morralla-juan-miguel.vercel.app/img/balancin.png",
    title: "Balancin",
    category: "madera",
    price: 15000,
    stock: 41,
  });

  await productManager.create({
    photo: "https://react-js-pf-morralla-juan-miguel.vercel.app/img/bloques.png",
    title: "Bloques",
    category: "plastico",
    price: 7000,
    stock: 36,
  });

  await productManager.create({
    photo:"https://ofelia.com.ar/images/origin/products/10178_23056_652c948726acd.jpg",
    title: "Casita",
    category: "madera",
    price: 6500,
    stock: 22,
  });

  await productManager.create({
    photo: "https://react-js-pf-morralla-juan-miguel.vercel.app/img/luna.png",
    title: "Luna",
    category: "madera",
    price: 7500,
    stock: 39,
  });

  await productManager.create({
    photo: "https://react-js-pf-morralla-juan-miguel.vercel.app/img/arcoiris.png",
    title: "Arcoiris",
    category: "madera",
    price: 7000,
    stock: 36,
  });

  await productManager.create({
    title: "Pajarito",
    category: "tela",
    price: 6,
    stock: 18,
  });

  await productManager.create({
    photo: "https://http2.mlstatic.com/D_NQ_NP_840175-MLA48011665500_102021-O.webp",
    title: "Piramide",
    category: "madera",
    price: 9500,
    stock: 21,
  });

  await productManager.create({
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31WdTStKnXn4-hNsvr39g8Kvi8hXXB6YPDg-bUs_5NQ&s",
    title: "Auto",
    category: "madera",
    price: 9900,
    stock: 12,
  });

  await productManager.create({
    photo: "https://blog.trapitos.com.ar/uploads/2018/10/titere-de-tela.jpg",
    title: "Titere",
    category: "tela",
    price: 4600,
    stock: 36,
  });

  await productManager.create({
    photo: "https://http2.mlstatic.com/D_NQ_NP_909544-MLA70900713407_082023-O.webp",
    title: "Serpiente",
    category: "tela",
    price: 7000,
    stock: 7,
  });

  await productManager.create({
    title: "Tobogan",
    category: "plastico",
    price: 45000,
    stock: 15,
  });

  await productManager.create({
    photo: "https://http2.mlstatic.com/D_NQ_NP_921581-MLA31085377150_062019-O.webp",
    title: "Muneca",
    category: "plastico",
    price: 7200,
    stock: 40,
  });

  await productManager.create({
    title: "Perro",
    category: "madera",
    price: 3500,
    stock: 20,
  });

  await productManager.create({
    photo: "https://http2.mlstatic.com/D_NQ_NP_710368-MLA28360118944_102018-O.webp",
    title: "Elefante",
    category: "madera",
    price: 8500,
    stock: 60,
  });

  await productManager.create({
    photo: "https://i5.walmartimages.com.mx/mg/gm/3pp/asr/0a98fabc-23c5-49f2-a418-041524a0b8d0.82dd9ce5243dedceb8847a32504d4816.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    title: "Tigre",
    category: "madera",
    price: 7000,
    stock: 7,
  });

  await productManager.create({
    photo: "https://c8.alamy.com/compes/bxrpjn/barco-de-juguete-azul-de-plastico-bxrpjn.jpg",
    title: "Barco",
    category: "plastico",
    price: 5000,
    stock: 25,
  });

  await productManager.create({
    title: "Bolitas",
    category: "vidrio",
    price: 3500,
    stock: 20,
  });

  await productManager.create({
    title: "Raton",
    category: "tela",
    price: 3000,
    stock: 10,
  });

  await productManager.create({
    title: "Kit medico",
    category: "plastico",
    price: 6600,
    stock: 3,
  });

  await productManager.create({
    photo: "https://acdn.mitiendanube.com/stores/991/977/products/amimal21-7ae67479bb99aff29616823429214437-1024-1024.png",
    title: "Animalitos",
    category: "plastico",
    price: 4600,
    stock: 15,
  });

  await productManager.create({
    title: "Muñeca de trapo",
    category: "tela",
    price: 7300,
    stock: 50,
  });

  await productManager.create({
    title: "Bloques de construccion",
    category: "madera",
    price: 8500,
    stock: 30,
  });

  await productManager.create({
    title: "Carro control remoto",
    category: "plastico",
    price: 6700,
    stock: 20,
  });

  await productManager.create({
    title: "Puzzle 1000 piezas",
    category: "madera",
    price: 9300,
    stock: 40,
  });

  await productManager.create({
    photo: "https://http2.mlstatic.com/D_NQ_NP_892380-MLA45428905628_042021-O.webp",
    title: "Pelota de futbol",
    category: "plastico",
    price: 5200,
    stock: 60,
  });

  await productManager.create({
    title: "Cocinita de juguete",
    category: "metal",
    price: 17600,
    stock: 25,
  });

  await productManager.create({
    photo: "https://http2.mlstatic.com/D_Q_NP_681873-MLU71108121856_082023-O.webp",
    title: "Avion de juguete",
    category: "plastico",
    price: 5800,
    stock: 35,
  });

  await productManager.create({
    title: "Muneco articulado",
    category: "metal",
    price: 14900,
    stock: 45,
  });

  await productManager.create({
    title: "Juego de te de juguete",
    category: "plastico",
    price: 7300,
    stock: 30,
  });

  await productManager.create({
    title: "Kit ciencia experimentos",
    category: "plastico",
    price: 12700,
    stock: 25,
  });

  await productManager.create({
    title: "Peluche de animal",
    category: "tela",
    price: 9200,
    stock: 40,
  });

  await productManager.create({
    title: "Juego de mesa clasico",
    category: "madera",
    price: 10100,
    stock: 35,
  });

  await productManager.create({
    title: "Robot transformable",
    category: "metal",
    price: 16200,
    stock: 20,
  });

  await productManager.create({
    title: "Tren de juguete",
    category: "metal",
    price: 8700,
    stock: 30,
  });

  await productManager.create({
    title: "Set de plastilina",
    category: "plastico",
    price: 5400,
    stock: 50,
  });

  await productManager.create({
    title: "Pelota de baloncesto",
    category: "plastico",
    price: 7800,
    stock: 40,
  });

  await productManager.create({
    title: "Dinosaurio de juguete",
    category: "plastico",
    price: 6900,
    stock: 55,
  });

  await productManager.create({
    title: "Set de pinturas y pinceles",
    category: "plastico",
    price: 6400,
    stock: 30,
  });

  await productManager.create({
    title: "Kit construccion vehiculos",
    price: 17800,
  });

  await productManager.create({
    title: "Instrumento musical juguete",
    category: "tela",
  });

  console.log(await productManager.read());
}

async function testRead() {
  const productManager = new ProductManager();
  await productManager.read();
  console.log(await productManager.read());
}

async function testReadOne() {
  const productManager = new ProductManager();
  await productManager.readOne("");
  console.log(await productManager.readOne());
}

async function testUpdate() {
  const productManager = new ProductManager();
  await productManager.update("");

}

async function testDestroy() {
  const productManager = new ProductManager();
  await productManager.destroy("e6cfba69d2ecebf2dea0c662");

}

// testCreate()
// testRead()
// testReadOne()
// testUpdate()
// testDestroy()

const productsManager = new ProductManager();
export default productsManager;
