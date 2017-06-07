'use strict';

const server = require('../index.js');
const _ = require('lodash');

module.exports = function(Board) {

  Board.createNewBoard = function (req, res) {
    let boardInformations = req.body;
    server.models.todoUser.findById(boardInformations.authorId, function (err, ret) {
      if (err)
        throw err;
      server.models.Board.create({
        name: boardInformations.name,
        authorId: ret.id,
        isGlobal: boardInformations.isGlobal,
        authorizedUsers: boardInformations.authorizedUsers,
        sharedToken: boardInformations.sharedToken,
        history: boardInformations.history
      }, function (err2, cb) {
        if (err2)
          throw err2;
        res.status(200).send(null);
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

  Board.getBoardSharedWithUser = function (username, req, res) {
    server.models.board.find({}, function (err, ret) {
        if (err)
          throw err;
        let authorizedArray = [];
        _.forEach(ret, (value) => {
          _.forEach(value.authorizedUsers, (user) => {
            if (user.username === username) {
              authorizedArray.push(value);
              return false;
            }
          })
        });
        res.status(200).send(authorizedArray);
      }
    )
  };

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

  Board.getBoardWithToken = function (token, req, res) {
    server.models.board.find({where: {sharedToken: token}}, function (err, ret) {
        if (err)
          throw err;
        if (ret.length === 0)
          res.status(404).send(null);
        res.status(200).send(ret[0]);
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
    accepts: [{ arg: 'username', type: 'string', http: { source: 'query' }},
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

  Board.remoteMethod('getBoardWithToken', {
    accepts: [{ arg: 'token', type: 'string', http: { source: 'query' }},
      { arg: 'req', type: 'object', http: { source: 'req' }},
      { arg: 'res', type: 'object', http: { source: 'res' }}],
    http: {verb: 'get'}
  })
};
