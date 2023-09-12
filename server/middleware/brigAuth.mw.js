require("dotenv").config();
const jwt = require("jsonwebtoken");
const Brigadista = require("../models/brigadista.model");

module.exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //se obtiene el token (p.ej., Bearer DJDHFHFHHFHFHF#%>%)
      token = req.headers.authorization;
      console.log("Token recibido-con Bearer: ", token);
      token = token.split(" ")[1];
      console.log("Token extraído: ", token);

      //se verifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //agregamos a cada petición información del usuario - excepto el password (recuperado con base en el _id
      //contenido en el payload del token)
      req.brigadista = await Brigadista.findOne({ _id: decoded.id }).select(
        "-password"
      );

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized!" });
    }
  }

  //si no se tienen un token de portador, entonces no estará autorizado
  if (!token) {
    res.status(401).json({ message: "Not authorized, missed token!" });
  }
};
