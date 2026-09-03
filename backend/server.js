const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username, email and password are required'
    });
  }

  return res.status(201).json({
    success: true,
    message: 'Sign up successful',
    user: {
      user_id: 2,
      username: username,
      email: email,
      profile_image: 'https://picsum.photos/id/1005/200/200'
    }
  });
});

app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Sign in successful',
    user: {
      user_id: 1,
      username: 'dummy_user',
      email: email,
      profile_image: 'https://picsum.photos/id/1011/200/200'
    }
  });
});

app.listen(PORT, () => {
  console.log('Backend server running on port ' + PORT);
});