const jwt = require("jsonwebtoken")
const jwtService = require("../services/JwtService")


// MIDDLEWARE AUTHENTIFICATION
module.exports = function (req, res, next) {

  // Récupère le token
  let bearerToken
  let bearerHeader = req.headers["authorization"]

  if (typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split(" ")
    bearerToken = bearer[1]

    if (bearer[0] !== "Bearer") {
      return res.forbidden("bearer not understood")
    }


    jwtService.verify(bearerToken, function (err, decoded) {

      if (err) {
        if (err.name === "TokenExpiredError")
          return res.forbidden("Session timed out, please login again")
        else
          return res.forbidden("Error authenticating, please login again")
      }

      // On passe le user grâce à son ID décodé dans la requête
      Users.findOne({
        where: {id: decoded.userId}
      })
        .then((user, error) => {
          if (error) return res.serverError(err)
          if (!user) return res.serverError("User not found")
          req.user = user
          next()
        })
    })


  } else {
    return res.forbidden("No token provided")
  }

}




