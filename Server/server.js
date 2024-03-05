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

// Define User model
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

app.get('/data', async (req, res) => {
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

    // Log the received email and password
    console.log('Received email:', email);
    console.log('Received password:', password);

    // Validate the received data (add your own validation logic here)
    
   

    // Save the email and hashed password to MongoDB
    const collection2 = await mongoose.connection.collection('validation');
    await collection2.insertOne({ email, password , token});

    // Generate a JWT
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
  

    // Send the email and JWT back to the client
    res.status(200).json({ email, token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in MongoDB
    const collection3 = await mongoose.connection.collection('validation');
    // const user = await collection3.findOne({ email });
    const user = await collection3.findOne({ email });
    console.log(user);
    console.log({email,password});
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log(hashedPassword);

    if (!user || !(password === user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });

    // Send the JWT and user data back to the client
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/addEntity', async (req, res) => {
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

app.delete('/deleteEntity/:id', async (req, res) => {
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