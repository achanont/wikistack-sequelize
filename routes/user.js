const express = require('express');
const router = express.Router();
const userList = require('../views/userList');
const userPages = require('../views/userPages');
const { User, Page } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const findAllPages = await User.findAll();
    res.send(userList(findAllPages));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  res.send('got to Post /user');
});
router.get('/add', async (req, res, next) => {
  res.send('got to Get /user/add');
});

router.get('/:id', async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      where: { id: req.params.id }
    });

    const findPage = await Page.findAll({
      where: { authorId: req.params.id }
    });

    res.send(userPages(findUser, findPage));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
