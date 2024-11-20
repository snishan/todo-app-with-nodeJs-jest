const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = { verifyToken };
