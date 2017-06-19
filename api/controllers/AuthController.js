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

      var a = new Date(d.goodtill)
      var b = new Date()
      if(b-a > 0) {
        return res.json({isLoggedIn: false})
      }

      req.session.me = id
      res.json({id: id, isLoggedIn: true})
    });

  },
  changePassword: function(req, res) {
    var md5 = require("../helpers/md5")

    var id = req.session.me
    var crypt = md5(req.param('newSecret')).toUpperCase()

    Auth.update({cid:id},{token:crypt}).exec(function(err, d){
      if(err) {
        return res.serverError(err);
      }

      res.json({id: id, result:"ok"})
    });

  }
};

