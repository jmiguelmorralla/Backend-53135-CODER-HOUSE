class Service {
  constructor(manager) {
    this.manager = manager;
  }
  createService = async (data) => {
    try {
      const one = await this.manager.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readService = async (role) => {
    try {
      const all = await this.manager.read(role);
      return all;
    } catch (error) {
      throw error;
    }
  };

  paginateService = async ({ filter, opts }) => {
    try {
      const all = await this.manager.paginate({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  };

  readOneService = async (uid) => {
    try {
      const one = await this.manager.readOne(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateService = async (uid, data) => {
    try {
      const one = await this.manager.update(uid, data);
    } catch (error) {
      throw error;
    }
  };
  destroyService = async (uid) => {
    try {
      const one = await this.manager.destroy(uid);
    } catch (error) {
      throw error;
    }
  };
}

export default Service;
