const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'shhhhhh',
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 1000 }
}));

// Monitor Session
app.use((req, res, next) => {
  if ( !req.session.user ) {
    if ( !req.body.user ) {
      res.send({ error: 'No user information to store on session. Access denied. Please provide an email and first name before trying to use this server.' });
    } else {
      req.session.user = req.body.user;
      next();
    }
  } else {
    next();
  }
});

app.get('/profile/:id', (req, res) => {

});

app.put('/profile/:id', (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

app.listen(3000, () => console.log('Server initiated on port 3000.'));