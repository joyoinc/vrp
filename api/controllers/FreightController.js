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
  },

  all: function(req, res) {
    Freight.find({},{select:['id']}).exec(function(err, d){
      if(err) {
        console.log(err);
        return;
      }
      return res.json(d);
    });
  },

  recent: function(req, res) {
    var totalSecs = req.param('totalSecs');
    var count = req.param('count');
    var ts = new Date(Date.now() - totalSecs * 1000);
    Freight.find({createdAt: {"$gte": ts}}).exec(function(err, d){
      if(err) {
        console.log(err);
        return;
      }

      var bins = [];
      for(var i=0; i<count; i++) bins.push({priority:[]});
      d.forEach(function(elem){
        h_diff = parseInt((Date.now() - elem.createdAt) / 1000 / (totalSecs / count));
        var bin = bins[h_diff];
        if(bin.priority[elem.urgency])
          bin.priority[elem.urgency] ++;
        else
          bin.priority[elem.urgency] = 1;
      });
      return res.json(bins);
    });
  }
};

