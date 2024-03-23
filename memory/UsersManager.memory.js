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
        role: data.role,
      };

      if (!data.email || !data.password || !data.role) {
        console.log("Usuario no creado. Ingrese todos los datos requeridos.");
      } else {
        UserManager.#users.push(user);
        console.log("Usuario Creado.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      const users = UserManager.#users;
      if (!users) {
        throw new Error("ERROR EN LA LECTURA DEL ARRAY");
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
        throw new Error("NO EXISTE EL USUARIO.");
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
        throw new Error("NO EXISTEN USUARIOS CON ESE ID");
      } else {
        UserManager.#users = filtered;
        console.log("USUARIO " + id + " ELIMINADO");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeUsuarios = new UserManager();

gestorDeUsuarios.create({
  photo: "foto.jpg",
  email: "juan@gmail.com",
  password: "holapepito@",
  role: "admin",
});

gestorDeUsuarios.create({
  email: "cecilia@gmail.com",
  password: "Cecilia123",
  role: "user",
});

gestorDeUsuarios.create({
  photo: "foto7.jpg",
  email: "carlos_m@gmail.com",
  password: "charly123",
  role: "user",
});

gestorDeUsuarios.create({
  photo: "fotofrente.jpg",
  email: "donvictor@gmail.com",
  password: "vicky_@2",
  role: "admin",
});

console.log(gestorDeUsuarios.read());
