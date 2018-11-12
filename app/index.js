const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const layout     = require('express-layout');
const path       = require('path');
const CONFIG     = require('../config');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.resolve(__dirname, './assets')));

// setting view engine to ejs
app.set('view engine', 'ejs');

// setting view directory
app.set('views', path.resolve(__dirname, './views'));

// using layout for view
app.use(layout());

app.set('layouts', path.resolve(__dirname, './views/layouts'));

app.set('layout', 'default');

app.get('/', (req, res, next) => {
  res.render('greeting')
});

app.listen(CONFIG.APP.PORT, CONFIG.APP.HOSTNAME, function () {
  console.log(`Server listening at http://${CONFIG.APP.HOSTNAME}:${CONFIG.APP.PORT}/`);
});
