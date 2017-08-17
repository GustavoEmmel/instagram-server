
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

  update(where, data) {
    return this.Model.findOneAndUpdate(where, data, {new: true});
  }

  delete(where) {
    return this.Model.remove(where);
  }
}

export default Repository;
