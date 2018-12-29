const jwt = require('jsonwebtoken')
let secretKey = "MyUnbelievableSecretKeyOfDoom"

module.exports = {

  // fourni un token avec comme contenu l'ID du user
  issue: (payload) => {
    return jwt.sign(payload, secretKey, {algorithm: 'HS256'})
  },

  // Vérifie que le token passé est correct
  verify: (token, callback) => {
    return jwt.verify(token, secretKey, callback)
  }

}
