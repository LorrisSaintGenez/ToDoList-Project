'use strict';

const server = require('../index.js');

module.exports = function(Board) {

  Board.createNewBoard = function (req, res) {
    let boardInformations = req.body;
    server.models.todoUser.findById(boardInformations.userid, function (err, ret) {
      if (err)
        throw err;
      console.log(ret);
      server.models.Board.create({
        name: boardInformations.name,
        owner: ret.id,
        isGlobal: boardInformations.isGlobal,
        authorizedUsers: boardInformations.authorizedUsers
      }, function (err2, cb) {
        if (err2)
          throw err2;
        res.status(200).send(cb);
      })
    })
  };

  Board.getBoardByOwnerId = function (userid, req, res) {
    server.models.board.find({where: {owner: userid}}, function (err, ret) {
        if (err)
          throw err;
        res.status(200).send(ret);
      }
    )
  };

  Board.remoteMethod('getBoardByOwnerId', {
    accepts: [{ arg: 'userid', type: 'number', http: { source: 'query' }},
      { arg: 'req', type: 'object', http: { source: 'req' }},
      { arg: 'res', type: 'object', http: { source: 'res' }}],
    http: {verb: 'get'}
  });

  Board.remoteMethod('createNewBoard', {
    accepts: [{ arg: 'req', type: 'object', http: { source: 'req' }},
    { arg: 'res', type: 'object', http: { source: 'res' }}],
    http: {verb: 'post'}
  });
};
