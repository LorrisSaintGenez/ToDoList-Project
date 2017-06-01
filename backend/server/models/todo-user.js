'use strict';

module.exports = function(Todouser) {
  Todouser.updatePassword = function (req, res) {
    server.models.todouser.find({where: {email: req.body.email}}, {password: req.body.password}, function (err, ret) {
      if (err)
        throw err;
      server.models.todouser.update({where: {id: ret.id}}, {password: req.body.password}, function(err2, ret2) {
        if (err2)
          throw err2;
        res.status(200).send(ret2);
      })}
    )
  };

  Todouser.remoteMethod('updatePassword', {
    accepts: [{ arg: 'req', type: 'object', http: { source: 'req' }},
      { arg: 'res', type: 'object', http: { source: 'res' }}],
    http: {verb: 'post'}
  });

};
