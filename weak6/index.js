const express = require('express');

const app = express();

app.use(express.json());

const users = [];

// Generate a random token of length 32
function generateToken() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if the user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  users.push({ username, password });
  res.json({ message: 'You have signed up.' });
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    const token = generateToken();
    user.token = token;
    res.json({ token });
    console.log(users);
  } else {
    res.status(403).json({ message: 'Invalid username or password.' });
  }
});

const PORT = 5500;
