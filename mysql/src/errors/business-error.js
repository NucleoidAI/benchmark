class BusinessError extends Error {
  constructor(description) {
    super();
    this.description = description;
  }
}

module.exports = BusinessError;
