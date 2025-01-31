const createUser = (req, res) => {
  res.send("hello post user");
};

const getUsers = (req, res) => {
  res.send("Hello get User");
};

module.exports = {
  createUser,
  getUsers,
};
