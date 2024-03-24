import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./fs/files/users.json";
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
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo:
          data.photo ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueick0BA5tVSQJFjPJ49GPHAl30OzLnSjvRT_rpGv784YF5bCSHJ7V_qFVQ3aDkM2qlQ&usqp=CAU",
        email: data.email,
        password: data.password,
        role: data.role || "0",
      };

      if (!data.email || !data.password || !data.role) {
        console.log("Not created user. Please complete required data.");
      } else {
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        console.log("User created succesfully.");
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read(rol = "0") {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      users = users.filter(each=>each.role===rol)
      if (!users) {
        new Error("Fail at reading array.");
      } else {
        return users;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let user = users.find((each) => each.id === id);
      console.log(user)
      if (!user) {
        throw new Error("User not found.");
      } else {
        console.log(user)
      return user};

    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let user = users.find((each) => each.id === id)
      if (!user) {
        throw new Error("No ID users found.");
      } else {
        let filtered = users.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2)
        await fs.promises.writeFile(this.path, filtered);
        console.log("Deleted " + id + " user.");
      }
    } catch (error) {
      console.log(error);
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
  await usersManager.read()
  console.log(await usersManager.read())
}

async function testReadOne() {
  const usersManager = new UserManager();
  await usersManager.readOne("")
  console.log(await usersManager.readOne())
}

async function testDestroy() {
  const usersManager = new UserManager();
  await usersManager.destroy("")
  console.log(await usersManager.readOne())
}

// testCreate()
// testRead()
// testReadOne()
// testDestroy()


const usersManager = new UserManager()
export default usersManager