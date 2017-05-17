const loopback = require('loopback')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs');

const app = loopback();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'))
});


app.listen(4242, () => {
  console.log('Listening on 4242');
})
