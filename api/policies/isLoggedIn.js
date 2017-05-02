/**
 * isLoggedIn
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.me) {
    return next();
  }

  return res.forbidden('You have not logged in yet !');
};
