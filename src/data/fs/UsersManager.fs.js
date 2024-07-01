import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./src/data/fs/files/users.json";
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
      if (!data.email || !data.password) {
        throw new Error(
          "Not created user. Please complete EMAIL and PASSWORD."
        );
      } else {
        
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(data);
        console.log("User created succesfully.");
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return data;
      }
    } catch (error) {
      throw error;
    }
  }
  async read(rol) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      rol && (all = all.filter((each) => each.role === rol));
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
        throw new Error("User not found.");
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
        const error = new Error("Not user found.");
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
        const error = new Error("User does not exist.");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("Deleted " + id + " user.");
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

async function testCreate() {
  const usersManager = new UserManager();
  await usersManager.create({
    photo: "foto.jpg",
    email: "juan@gmail.com",
    password: "holapepito@",
    role: "1",
  });

  await usersManager.create({
    email: "cecilia@gmail.com",
    password: "Cecilia123",
    role: "0",
  });

  await usersManager.create({
    photo: "foto7.jpg",
    email: "carlos_m@gmail.com",
    password: "charly123",
    role: "0",
  });

  await usersManager.create({
    photo: "fotofrente.jpg",
    email: "donvictor@gmail.com",
    password: "vicky_@2",
    role: "0",
  });
  console.log(await usersManager.read());
}

async function testRead() {
  const usersManager = new UserManager();
  await usersManager.read();
  console.log(await usersManager.read());
}

async function testReadOne() {
  const usersManager = new UserManager();
  await usersManager.readOne("");
  console.log(await usersManager.readOne());
}

async function testDestroy() {
  const usersManager = new UserManager();
  await usersManager.destroy("");
  console.log(await usersManager.readOne());
}

// testCreate()
// testRead()
// testReadOne()
// testDestroy()

const usersManager = new UserManager();
export default usersManager;
