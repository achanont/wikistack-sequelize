const morgan = require('morgan');
const express = require('express');
// const bodyParser = require('body-parser')
const { db, Page, User } = require('./models/index');
const models = require('./models');
const userRouter = require('./routes/user');
const wikiRouter = require('./routes/wiki');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', async (req, res, next) => {
  res.redirect('/wiki');
  // res.send(layout(''));
});

const PORT = 3000;
const init = async () => {
  await db.sync({ force: false });
  app.listen(3000, () => {
    console.log(`listening on ${PORT}`);
  });
};

init();
