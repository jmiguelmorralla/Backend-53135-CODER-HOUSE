const crypto = require("crypto");

class UserManager {
  static #users = [];
  create(data) {
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
        UserManager.#users.push(user);
        console.log("User created succesfully.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      const users = UserManager.#users;
      if (!users) {
        throw new Error("Fail at reading array");
      } else {
        return users;
      }
    } catch (error) {
      console.log(error);
    }
  }

  readOne(id) {
    try {
      const user = UserManager.#users.find((each) => each.id === id);
      if (!user) {
        throw new Error("User not found.");
      } else {
        return user;
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
