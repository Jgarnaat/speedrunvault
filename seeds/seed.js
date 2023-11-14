const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const blogData = require('./blogData.json');
const commentData = require('./commentData.json');
const userData = require('./userData.json');


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    // Create users and store them in an array
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Create blogs with random user IDs
    for (const blog of blogData) {
      const randomUserId = users[Math.floor(Math.random() * users.length)].id;
      await Blog.create({ ...blog, user_id: randomUserId });
    }

    // Create comments
    await Comment.bulkCreate(commentData, {
      returning: true,
    });

    console.log('Database seeding completed.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
