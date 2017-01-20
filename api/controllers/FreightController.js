/**
 * FreightController
 *
 * @description :: Server-side logic for managing freights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  pickup: function(req, res) {
    //console.log(req.body);
    var vid = req.param('vid');
    var fids = req.param('fids');

    Freight.update({fid: {"$in": fids} },
      {stat: 1, carrier: vid}).exec(function(err, d){
      if(err) {
        console.log(err);
        return;
      }
    });

    res.send('done');
  },

  unassigned: function(req, res) {
    Freight.find({stat:0}).exec(function(err, d){
      if(err) {
        console.log(err);
        return;
      }
      return res.json(d);
    });
  }
};

