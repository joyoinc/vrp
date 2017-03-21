/**
 * ProbController
 *
 * @description :: Server-side logic for managing probs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  pickone: function(req,res) {
    Prob.find().limit(1).exec(function(err, d){
      if(err) {
        console.log(err);
        return;
      }
      return res.json(d);
    });
  }
};

