const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Simulated user data (replace this with a database)
const user = {
    username : 'tr',
    password : 'Trr@1234'
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (user.username === username && user.password === password) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
