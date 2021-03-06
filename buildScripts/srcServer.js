// var express require('express');
// var path = require('path');
// var open = require('open');
import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

// var port = 3000;
// var app = express();
const port = 3000;
const app = express();
const compiler =  webpack(config);

app.use (require ('webpack-dev-middleware') ( compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res) {
  // hard coding for now, pretent this hits a real database
  res.json([
    {"id": 1, "firstName": "Bob", "lastName":"Smith", "email": "a@b.com"},
    {"id": 2, "firstName": "Sam", "lastName":"Stosor", "email": "c@g.com"},
    {"id": 3, "firstName": "Andy", "lastName":"Marray", "email": "b@d.com"}
  ]);
});

app.listen(port,function(err) {
  if (err) {
    console.log(err);// eslint-disable-line no-console
  } else {
    open ('http://localhost:' + port);
  }
});
