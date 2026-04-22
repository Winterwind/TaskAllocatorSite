var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ────────────────────────────────────────────────────────────────────

app.get('/', function (req, res) {
  res.redirect('/login');
});

app.get('/login', function (req, res) {
  res.render('login', { title: 'Sign In', hideNav: true, bodyClass: 'auth-page' });
});

app.get('/register', function (req, res) {
  res.render('register', { title: 'Register', hideNav: true, bodyClass: 'auth-page' });
});

app.get('/profile', function (req, res) {
  res.render('profile', { title: 'ariandjahed' });
});

app.get('/project/:id', function (req, res) {
  res.render('project', { title: 'Brand Refresh 2026' });
});

app.get('/task/:id', function (req, res) {
  res.render('task', { title: 'Task #1' });
});

app.get('/solution/:id', function (req, res) {
  res.render('solution', { title: 'Solution #1' });
});

// ── Error handling ────────────────────────────────────────────────────────────

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
