// eslint-disable-next-line no-unused-expressions, arrow-body-style
module.exports = fn => {
  // eslint-disable-next-line no-unused-expressions
   return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
