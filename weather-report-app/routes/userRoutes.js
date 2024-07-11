const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to store user details
router.post('/add', async (req, res) => {
  const { email, location } = req.body;
  try {
    const user = new User({ email, location, weatherData: [] });
    await user.save();
    res.status(201).send('User added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route to update user location
router.put('/update-location/:email', async (req, res) => {
  const { email } = req.params;
  const { location } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, { location }, { new: true });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route to get user's weather data for a given day
router.get('/weather/:email/:date', async (req, res) => {
  const { email, date } = req.params;
  try {
    const user = await User.findOne({ email });
    const weatherData = user.weatherData.find(data => data.date === date);
    res.status(200).send(weatherData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
