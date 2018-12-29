let bcrypt = require('bcrypt')

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      columnType: 'varchar',
    },
    password: {
      type: 'string',
      columnType: 'varchar',
    },
  },

  customToJSON: function () {
    let obj = this//.toJSON();
    delete obj.password;
    return obj;
  },

  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.password = hash;
        next();
      })
    })
  },

  comparePassword : function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {
      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }

};

