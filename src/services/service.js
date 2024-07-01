class Service {
  constructor(repository) {
    this.repository = repository;
  }
  createService = async (data) => {
    try {
      const one = await this.repository.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readService = async (role) => {
    try {
      const all = await this.repository.read(role);
      return all;
    } catch (error) {
      throw error;
    }
  };

  paginateService = async ({ filter, opts }) => {
    try {
      const all = await this.repository.paginate({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  };

  readOneService = async (uid) => {
    try {
      const one = await this.repository.readOne(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateService = async (uid, data) => {
    try {
      const one = await this.repository.update(uid, data);
    } catch (error) {
      throw error;
    }
  };
  destroyService = async (uid) => {
    try {
      const one = await this.repository.destroy(uid);
    } catch (error) {
      throw error;
    }
  };
}

export default Service;
