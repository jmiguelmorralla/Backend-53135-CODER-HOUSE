import Service from "./service.js";
// import cartsManager from "../data/mongo/managers/CartsManager.mongo.js";
import dao from "../data/dao.factory.js";

const { carts } = dao

const cartsService = new Service(carts);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = cartsService;
