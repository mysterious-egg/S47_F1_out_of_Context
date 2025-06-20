const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.URII;
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());
const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/check', (req, res) => {
  res.json({ status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Accept token from either 'Bearer <token>' or directly as token
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.get('/data', authenticateToken, async (req, res) => {
  try {
    const collection = await mongoose.connection.collection('dataset');
    const result = await collection.find({}).toArray();
    res.send(result);
    console.log('Result:', result);
  } catch (err) {
    console.error('Error querying MongoDB:', err);
    res.status(500).json({ error: 'Error querying database' });
  }
});

app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });

    const collection2 = await mongoose.connection.collection('validation');
    await collection2.insertOne({ email, password: hashedPassword });

    res.status(200).json({ email, token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const collection3 = await mongoose.connection.collection('validation');
    const user = await collection3.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/addEntity', authenticateToken, async (req, res) => {
  try {
    const schema = Joi.object({
      Explanation_of_Clip: Joi.string().required(),
      genre: Joi.string().required(),
      Links_To_the_clips: Joi.string().uri().required(),
      created_by: Joi.string(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { Explanation_of_Clip, Genre, Links_To_the_clips } = req.body;

    const collection = await mongoose.connection.collection('dataset');

    await collection.insertOne({ Explanation_of_Clip, Genre, Links_To_the_clips });

    res.status(200).json({ message: 'Entity added successfully' });
  } catch (error) {
    console.error('Error adding entity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteEntity/:id', authenticateToken, async (req, res) => {
  try {
    const entityId = req.params.id;

    const collection = await mongoose.connection.collection('dataset');

    await collection.deleteOne({ _id: new mongoose.Types.ObjectId(entityId) });

    res.status(200).json({ message: 'Entity deleted successfully' });
  } catch (error) {
    console.error('Error deleting entity:', error);
    res.status(500).json({ error: `Error deleting entity: ${error.message}` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});