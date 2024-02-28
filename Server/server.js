
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const env = require('dotenv').config();
// const mongoose = require('mongoose');
// const URI = process.env.URII;
// app.use(cors())

// mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// app.get('/ping', (req, res) => {
//   res.send('pong');
// });

// app.get('/check', (req, res) => {
//   // The connection status is checked automatically during the startup process
//   res.json({ status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
// });

// app.get('/data', async (req, res) => {
//   try {
//     // Assuming 'S47_F1_out_of_context.dataset' is the name of your collection
//     const collection = await mongoose.connection.collection('dataset');
//     const result = await collection.find({}).toArray(); 
//     res.send(result);
//     console.log('Result:', result);
//   } catch (err) {
//     console.error('Error querying MongoDB:', err);
//     res.status(500).json({ error: 'Error querying database' });
//   }
// });



// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });
const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.URII;
app.use(cors());
app.use(express.json()); // Use the express.json() middleware for parsing JSON in request bodies

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

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

// New route to add an entity
app.post('/addEntity', async (req, res) => {
  try {
    const {Explanation_of_Clip, Genre,Links_To_the_clips} = req.body;

    // Assuming 'S47_F1_out_of_context.dataset' is the name of your collection
    const collection = await mongoose.connection.collection('dataset');
    
    // Insert the new entity into the collection
    await collection.insertOne({ Explanation_of_Clip, Genre,Links_To_the_clips });

    res.status(200).json({ message: 'Entity added successfully' });
  } catch (error) {
    console.error('Error adding entity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
