import { randomBytes } from "crypto";

class UserManager {
  static #users = [];
  create(data) {
    try {
      if (!data.email || !data.password) {
        throw new Error(
          "Not created user. Please complete EMAIL and PASSWORD."
        );
      } else {
        UserManager.#users.push(data);
        console.log("User created succesfully.");
        return data;
      }
    } catch (error) {
      throw error;
    }
  }
  read() {
    try {
      const all = UserManager.#users;
      if (!all) {
        throw new Error("Fail at reading array");
      } else {
        return all;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("User not found.");
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  update(id, data) {
    try {
      let one = UserManager.#users.find((each) => each.id === id);
      console.log(one);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
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

  destroy(id) {
    try {
      const filtered = UserManager.#users.filter((each) => each.id !== id);
      if (!id) {
        throw new Error("No ID users found.");
      } else {
        UserManager.#users = filtered;
        console.log("Deleted " + id + " user.");
      }
    } catch (error) {
      throw error;
    }
  }
}

const usersManager = new UserManager();

usersManager.create({
  photo: "foto.jpg",
  email: "juan@gmail.com",
  password: "holapepito@",
  role: "1",
});

usersManager.create({
  email: "cecilia@gmail.com",
  password: "Cecilia123",
  role: "0",
});

usersManager.create({
  photo: "foto7.jpg",
  email: "carlos_m@gmail.com",
  password: "charly123",
  role: "0",
});

usersManager.create({
  photo: "fotofrente.jpg",
  email: "donvictor@gmail.com",
  password: "vicky_@2",
  role: "0",
});

console.log(usersManager.read());
