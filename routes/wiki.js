const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const layout = require('../views/layout');
const { Page, User } = require('../models');
//const { addPage } = require("../views");
const wikipage = require('../views/wikipage');
const mainPage = require('../views/main');

router.get('/', async (req, res, next) => {
  try {
    const findAllPages = await Page.findAll();
    res.send(mainPage(findAllPages));
  } catch (err) {
    console.log(err);
  }
});

// router.post('/', async (req, res, next) => {
//   try {
//     // res.send(layout('got to Post /wiki'));
//     res.json(req.body);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post('/', async (req, res, next) => {
  try {
    const page = new Page({
      // name: req.body.name,
      // email: req.body.email,
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });

    const [user, wasCreated] = await User.findOrCreate({
      where: { name: req.body.name, email: req.body.email }
    });

    // console.log(page.__proto__);
    // page.setAuthor(user);

    await page.save();

    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', async (req, res, next) => {
  try {
    res.send(addPage());
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const findSlug = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.send(wikipage(findSlug));
    // res.send(`hit dynamic route at ${req.params.slug}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
