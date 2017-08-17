import NotFound from '../exceptions/NotFound';

class Repository {

  constructor(Model) {
    this.Model = Model;
  }

  find(where) {
    return this.Model.find(where);
  }

  create(data) {
    var model = new this.Model(data);
    return model.save();
  }

  findOne(where) {
    return this.Model.findOne(where);
  }

  findOneOrFail(where) {
    return this.findOne(where).then(model => {
      if (!model) {
        throw new NotFound('Model does not exists.');
      }
      return model;
    });
  }

  update(where, data) {
    return this.Model.findOneAndUpdate(where, data, {new: true});
  }

  delete(where) {
    return this.Model.remove(where);
  }
}

export default Repository;
