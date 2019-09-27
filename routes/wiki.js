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
    // const page = new Page({
    //   title: req.body.title,
    //   content: req.body.content,
    //   status: req.body.status
    // });

    //we use page (as an instance/row) variable to define a new row on our Page table. Then we can manipulate this new row(by calling page variable) however we want
    const page = await Page.create(req.body);

    //findOrCreate return an array of things. First one (we assigned it as user) is an object that has submission data. Second one (assigned as wasCreated) is True/False
    const [user, wasCreated] = await User.findOrCreate({
      where: { name: req.body.name, email: req.body.email }
    });

    await page.setAuthor(user);

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
    // console.log(page);
    // const page = await Page.create();
    // console.log('PAGEEEEEE', page);
    // console.log(typeof page);
    // console.log('PROTTTTOOOOO', page.__proto__);
    // console.log('findAuthor HEREERERE', findAuthor);

    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    console.log('HERE IS TITLE', page.title);
    const author = await page.getAuthor();
    console.log('HERE IS author', author);

    res.send(wikipage(page, author));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
