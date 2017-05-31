'use strict';

const server = require('../index.js');

module.exports = function(Itemboard) {
  Itemboard.getTaskOwner = function (taskid, req, res) {
    server.models.itemBoard.find({where: {id: taskid}}, function (err, ret) {
        if (err)
          throw err;
        server.models.todoUser.find({where: {id: ret[0].authorId}}, function(err2, ret2) {
          if (err2)
            throw err2;
          res.status(200).send(ret2);
        })
      }
    )
  };

  Itemboard.remoteMethod('getTaskOwner', {
    accepts: [{ arg: 'taskid', type: 'number', http: { source: 'query' }},
      { arg: 'req', type: 'object', http: { source: 'req' }},
      { arg: 'res', type: 'object', http: { source: 'res' }}],
    http: {verb: 'get'}
  });

};
