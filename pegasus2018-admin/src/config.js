module.exports = {
  SERVER_URL:
    process.env.NODE_ENV === "production"
      ? "https://pegasus2018-server.herokuapp.com"
      : "http://localhost:8081"
};
