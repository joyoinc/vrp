/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  local: function(req, res) {
    var md5 = require("../helpers/md5")

    var id = req.param('userId')
    var crypt = md5(req.param('userSecret')).toUpperCase()

    Auth.findOne({cid:id,token:crypt}).exec(function(err, d){
      if(err) {
        return res.serverError(err);
      }

      if(!d) {
        return res.json({isLoggedIn: false})
      }

      req.session.me = id
      res.json({id: id, isLoggedIn: true})
    });

  }
};

