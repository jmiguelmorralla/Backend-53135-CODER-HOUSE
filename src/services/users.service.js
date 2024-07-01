import Service from "./service.js";
// import usersManager from "../data/fs/UsersManager.fs.js";
// import usersManager from "../data/memory/UsersManager.memory.js";
// import usersManager from "../data/mongo/managers/UsersManager.mongo.js";
// import dao from "../data/dao.factory.js";
// const { users } = dao

import usersRepository from "../repositories/users.rep.js"

const usersService = new Service(usersRepository);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = usersService;
