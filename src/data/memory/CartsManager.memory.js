class CartManager {
  static #carts = [];
  create(data) {
    try {
      const one = {
        id: data.id,
        user_id: data.user_id,
        product_id: data.product_id,
        quantity: data.quantity,
        state: data.state,
        };

        CartManager.#carts.push(one);
        console.log("Cart created succesfully.");
        return one;

    } catch (error) {
      throw error;
    }
  }
  read() {
    try {
      const all = CartManager.#carts;
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
      const one = CartManager.#carts.find((each) => each.id === id);
      if (!one) {
        throw new Error("Cart not found.");
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  update(id, data) {
    try {
      let one = CartManager.#carts.find((each) => each.id === id);
      console.log(one);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        return one;
      } else {
        const error = new Error("Not cart found.");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  destroy(id) {
    try {
      const filtered = CartManager.#carts.filter((each) => each.id !== id);
      if (!id) {
        throw new Error("No ID carts found.");
      } else {
        CartManager.#carts = filtered;
        console.log("Deleted " + id + " cart.");
      }
    } catch (error) {
      throw error;
    }
  }
}

const cartsManager = new CartManager();

cartsManager.create({
  id: 15163513,
  user_id: 35435435,
  product_id: 454315,
  quantity: 20,
  state: "reserved",
});

cartsManager.create({
  id: "156asfwaf7",
  user_id: "fasf486463",
  product_id: "jh4634",
  quantity: 15,
  state: "paid",
});


// console.log(cartsManager.read());
// console.log(cartsManager.readOne(15163513));
// console.log(cartsManager.update(15163513, {state:"delivered"}));
console.log(cartsManager.destroy(15163513));