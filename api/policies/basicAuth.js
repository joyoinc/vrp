/**
 * basicAuth
 */
module.exports = function(req, res, next) {

   var allowed = ["e9723rafq", "z8323nsaf", "m4871dsfd"];
  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (allowed.indexOf(req.headers.authorization.replace("Basic ", "")) >= 0) {
    req.session.me = "bot"
    return next();
  }
  /*
  */

  return res.forbidden('Basic Auth Authentication failure');
};
