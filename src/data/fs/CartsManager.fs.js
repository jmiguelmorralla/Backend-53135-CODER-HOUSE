import fs from "fs";

class CartManager {
  constructor() {
    this.path = "./src/data/fs/files/carts.json";
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
        const one = {
          id: data.id,
          user_id: data.user_id,
          product_id: data.product_id,
          quantity: data.quantity,
          state: data.state,
        };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(one);
        console.log("Cart created succesfully.");
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return one;
      
    } catch (error) {
      throw error;
    }
  }
  async read(status) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      status && (all = all.filter((each) => each.state === status));
      if (!all) {
        new Error("Fail at reading array.");
      } else {
        return all;
      }
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);
      console.log(one);
      if (!one) {
        throw new Error("Cart not found.");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      throw error;
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
        const error = new Error("No cart found.");
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
      console.log(one)
      if (!one) {
        const error = new Error("Cart does not exist.");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("Deleted " + id + " cart.");
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

async function testCreate() {
  const cartsManager = new CartManager();
  await cartsManager.create({
    id: "13543643",
    user_id: "15341fsfasg",
    product_id: "sfads35147",
    quantity: 7,
    state: "paid",
  });

  await cartsManager.create({
    id: "68746843",
    user_id: "4f648",
    product_id: "fsagf45",
    quantity: 11,
    state: "reserved",
  });
  console.log(await cartsManager.read());
}

async function testRead() {
  const cartsManager = new CartManager();
  await cartsManager.read();
  console.log(await cartsManager.read());
}

async function testReadOne() {
  const cartsManager = new CartManager();
  await cartsManager.readOne("");
  console.log(await cartsManager.readOne());
}

async function testDestroy() {
  const cartsManager = new CartManager();
  await cartsManager.destroy("");
  console.log(await cartsManager.readOne());
}

// testCreate()
// testRead()
// testReadOne()
// testDestroy()


const cartsManager = new CartManager();
export default cartsManager;
