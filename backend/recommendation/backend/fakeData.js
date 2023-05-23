const faker = require("faker");
const User = require("./models/User");
const Video = require("./models/Video");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hackathon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Generate dummy data for users
const generateDummyUsers = async (count) => {
  try {
    const users = [];

    for (let i = 0; i < count; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: faker.date.recent(),
      });

      users.push(user);
    }

    await User.insertMany(users);
    console.log(`${count} dummy users generated successfully!`);
  } catch (error) {
    console.error("Error generating dummy users:", error);
  }
};

// Generate dummy data for videos
const generateDummyVideos = async (count) => {
  try {
    const videos = [];

    for (let i = 0; i < count; i++) {
      const video = new Video({
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        url: faker.internet.url(),
        createdAt: faker.date.recent(),
      });

      videos.push(video);
    }

    await Video.insertMany(videos);
    console.log(`${count} dummy videos generated successfully!`);
  } catch (error) {
    console.error("Error generating dummy videos:", error);
  }
};

// Generate dummy data
const generateDummyData = async () => {
  await generateDummyUsers(10); // Generate 10 dummy users
  await generateDummyVideos(10); // Generate 10 dummy videos

  // Close the database connection after generating dummy data
  mongoose.connection.close();
};

// Uncomment the following line to generate dummy data
generateDummyData();
