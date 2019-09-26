const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   isEmpty: false,
    // },
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   isEmpty: false,
    // },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
    // validate: {
    //   isEmpty: false,
    // },
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
    // allowNull: false,
    // defaultValue: 'closed',
    // validate: {
    //   isEmpty: false,
    // },
  }
});

function generateSlug(title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

Page.beforeValidate(page => {
  page.slug = generateSlug(page.title);
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.belongsTo(User, { as: 'author' });

db.authenticate().then(() => {
  console.log('connected to the database');
});

module.exports = { db, Page, User };
// module.exports = models;
