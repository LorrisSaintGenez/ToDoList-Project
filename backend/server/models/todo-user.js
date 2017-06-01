'use strict';

const server = require('../index.js');

module.exports = function(Todouser) {
  Todouser.getUserByUsername = function (username, req, res) {
    server.models.todoUser.find({where: {username: username}}, function (err, ret) {
        if (err)
          throw err;
        if (ret.length === 0)
          res.status(404).send(null);
        else
          res.status(200).send(ret);
      }
    )
  };

  Todouser.remoteMethod('getUserByUsername', {
    accepts: [{ arg: 'username', type: 'string', http: { source: 'query' }},
      { arg: 'req', type: 'object', http: { source: 'req' }},
      { arg: 'res', type: 'object', http: { source: 'res' }}],
    http: {verb: 'get'}
  });

};
