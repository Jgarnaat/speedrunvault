const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helmet = require('helmet'); // Added helmet for security headers
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.SESSION_SECRET || 'Super secret secret',
  cookie: {
    maxAge: 24 * 60* 60 * 1000,
    secure: false,
    // Set your cookie options here (e.g., secure: true, maxAge: ...)
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// Use helmet for security headers
app.use(session(sess));

app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
