module.exports = (app) => {
  app.datasources['todolist'].autoupdate(['board'], err => {
    if (err)
      throw err;
  });

  app.datasources['todolist'].autoupdate(['itemBoard'], err => {
    if (err)
      throw err;
  })
};
