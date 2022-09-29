const asynchHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require("../model/User");

const authMiddlware = asynchHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization.startsWith('tiendat')); //This will return true
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('tiendat')
  ) {
    try {
      //Grab only the token
      // console.log(req.headers.authorization.split(' ')[1]);
      token = req.headers.authorization.split(' ')[1];
      //Decode the user
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decoded.id);
      //Find the user in DB
      const user = await User.findById(decoded.id);
      //add the user to the request object as req.user
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorised, token is fake');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorised, no token');
  }
});

module.exports = authMiddlware;