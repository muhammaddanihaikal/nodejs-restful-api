class ResponseError extends Error {
  constructor(status, message) {
    super(message); // panggil constructor superclass (Error) dengan pesan
    this.status = status; // tambahkan properti status pada error
  }
}

export { ResponseError };
