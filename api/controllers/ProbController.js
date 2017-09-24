/**
 * ProbController
 *
 * @description :: Server-side logic for managing probs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  genRandom: function(req, res){
    res.view("appV2")
  },

  getRange: function(req, res) {
    Prob.find({createdAt: {'>=': req.param('from'), '<=': req.param('to')} , sort: 'createdAt desc'}).exec(function(err, d){
      if(err) {
        console.log(err);
        return;
      }
      return res.json(d)
    });
  },

  viewPath: function(req, res) {
    res.render("map-2", {problemId: req.param('id')});
  },

  peekAt: function(req, res){
    Prob.find({id: req.param('id')}).exec(function(err, d){
      if(err) {
        console.log(err);
        return;
      }
      var a = new Date(d[0].createdAt)
      var b = new Date()
      res.view("probDetail", { solution: d[0].solution, elaps: (b-a)/1000, id: d[0].id } )
    });
  },

  doneOne: function(req,res) {
    Prob.update({id: req.param('id')}, {stat:"done", solution:req.param('solution')}).exec(function(err, d){
      if(err) {
        console.log(err);
        return;
      }
      return res.json(d);
    });
  },

  pickOne: function(req,res) {
    Prob.find({ where: {stat:"todo"}, limit: 1}).exec(function(err, d){
      if(err) {
        console.log(err);
        return;
      }
      return res.json(d);
    });
  }
};

