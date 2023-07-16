const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //Authentication logic...
  console.log(req.headers);
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({
      status: "Failed",
      message: "Authorization failed! you must be logged in",
    });
    return;
  }

  //Check auth header
  const token = authorizationHeader.split("Bearer ")[1];
  try {
    const checkToken = jwt.verify(token, process.env.jwt_salt);
    req.user = checkToken;
  } catch (e) {
    res.status(401).json({
      status: "Failed",
      message: "Authorization failed! Invalid Token",
    });
    return;
  }

  next();
};

module.exports = auth;
