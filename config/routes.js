
module.exports.routes = {

  '/': {
    view: 'pages/homepage'
  },

  'post /users/signup': 'UsersController.create',
  'post /login': 'AuthController.login',

};
