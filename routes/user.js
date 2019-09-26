const express = require('express');
const router = express.Router();
const userList = require('../views/userList');
const userPages = require('../views/userPages');
const { User } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const findAllPages = await User.findAll();
    res.send(userList(findAllPages));
  } catch (err) {
    next(err);
  }
});

// MUST FIX AUTHOR-ID FOREIGN KEY FIRST TO MAKE THIS BELOW FUNCTION WORKS
// router.get('/:id', async (req, res, next) => {
//   try {
//     const findOne = await User.findOne({where:{id = req.params.id}} )
//     res.send(userPages(findOne))
//   } catch (err) {
//     next(err);
//   }
// });

router.post('/', async (req, res, next) => {
  res.send('got to Post /user');
});
router.get('/add', async (req, res, next) => {
  res.send('got to Get /user/add');
});

module.exports = router;
