module.exports = (req, res, next) => {
  res
    .status(404)
    .send({ error: "the path that is being looked up does not exist" });
};
