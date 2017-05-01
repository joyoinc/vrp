/**
 * ProbController
 *
 * @description :: Server-side logic for managing probs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  peekat: function(req, res){
    Prob.find({id: req.param('id')}).exec(function(err, d){
      if(err) {
        console.log(err);
        return;
      }
      res.view("probDetail", { solution: d[0].solution } )
    });
  },

  pickone: function(req,res) {
    Prob.find({ where: {stat:"todo"}, limit: 1}).exec(function(err, d){
      if(err) {
        console.log(err);
        return;
      }
      return res.json(d);
    });
  }
};

