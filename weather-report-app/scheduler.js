// scheduler.js
const cron = require('node-cron');
const User = require('./models/User');
const { getWeather } = require('./services/weatherService');
const { sendEmail } = require('./services/emailService');

cron.schedule('* * * * *', async () => {  // Run every minute for testing
  console.log('Running scheduled weather report task');
  const users = await User.find();
  for (const user of users) {
    try {
      const weather = await getWeather(user.location);
      const weatherText = `Current weather in ${user.location}: ${weather.weather[0].description}, Temperature: ${weather.main.temp}°C`;
      console.log(`Weather for ${user.email}: ${weatherText}`);

      // Send email to user
      const subject = `Weather Report for ${user.location}`;
      await sendEmail(user.email, subject, weatherText);
      console.log(`Weather report sent to ${user.email}`);
    } catch (error) {
      console.error(`Error fetching weather for ${user.email}:`, error);
    }
  }
});
