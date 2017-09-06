
class Unauthorized extends Error {

  constructor(message) {
    super(message);
    this.code = 401;
  }

}

export default Unauthorized;
