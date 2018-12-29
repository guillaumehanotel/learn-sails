const JwtService = require('../services/JwtService')


module.exports = {

  create: async function (req, res) {

    let data = _.pick(req.body, ["email", "password"])

    Users.create(data).exec((err, user) => {
      if (err) {
        return res.serverError(err)
      }
      // If user created successfuly we return user and token as response
      if (user) {
        res.status(200).json({
          user: user,
          token: JwtService.issue({id: user.id})
        });
      }
    });
  }


}

