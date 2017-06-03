'use strict';

const server = require('../index.js');

module.exports = function(Board) {

  Board.createNewBoard = function (req, res) {
    let boardInformations = req.body;
    server.models.todoUser.findById(boardInformations.authorId, function (err, ret) {
      if (err)
        throw err;
      console.log(ret);
      server.models.Board.create({
        name: boardInformations.name,
        authorId: ret.id,
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
    server.models.board.find({where: {authorId: userid}}, function (err, ret) {
        if (err)
          throw err;
        res.status(200).send(ret);
      }
    )
  };

  // TODO : Filter in array
  /*Board.getBoardSharedWithUser = function (userid, req, res) {
    let filter = {where: }
    server.models.board.find({where: {}, function (err, ret) {
        if (err)
          throw err;
        res.status(200).send(ret);
      }
    )
  };*/

  Board.getBoardOwner = function (boardid, req, res) {
    server.models.board.find({where: {id: boardid}}, function (err, ret) {
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

  Board.remoteMethod('createNewBoard', {
    accepts: [{ arg: 'req', type: 'object', http: { source: 'req' }},
    { arg: 'res', type: 'object', http: { source: 'res' }}],
    http: {verb: 'post'}
  });

  Board.remoteMethod('getBoardByOwnerId', {
    accepts: [{ arg: 'userid', type: 'number', http: { source: 'query' }},
      { arg: 'req', type: 'object', http: { source: 'req' }},
      { arg: 'res', type: 'object', http: { source: 'res' }}],
    http: {verb: 'get'}
  });

  Board.remoteMethod('getBoardSharedWithUser', {
    accepts: [{ arg: 'userid', type: 'number', http: { source: 'query' }},
      { arg: 'req', type: 'object', http: { source: 'req' }},
      { arg: 'res', type: 'object', http: { source: 'res' }}],
    http: {verb: 'get'}
  });

  Board.remoteMethod('getBoardOwner', {
    accepts: [{ arg: 'boardid', type: 'number', http: { source: 'query' }},
      { arg: 'req', type: 'object', http: { source: 'req' }},
      { arg: 'res', type: 'object', http: { source: 'res' }}],
    http: {verb: 'get'}
  });
};
