const JwtService = require('../services/JwtService')
const bcrypt = require('bcrypt')

module.exports = {

  login: function (req, res) {

    if (!_.has(req.body, 'email') || !_.has(req.body, 'password')) {
      return res.serverError("No field should be empty.")
    }

    Users.findOne({ email: req.body.email }).then((user, err) => {

      if (err) return res.serverError(err)
      if (!user) return res.serverError("User not found, please sign up.")

      let userId = user.id

      //check password
      bcrypt.compare(req.body.password, user.password, function (error, matched) {
        if (error) return res.serverError(error)
        if (!matched) return res.serverError("Invalid password.")
        let token = JwtService.issue({userId})
        res.ok(token)
      })

    })

  }

}

