
module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

   '*': ['isAuth'],

  UsersController: {
    'create': true
  },

  AuthController: {
    '*': true
  }


}
