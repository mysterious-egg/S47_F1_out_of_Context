const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

let data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

app.get('/items', (req, res) => {
  res.json(data);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  data = data.map(item => (item.id === itemId ? { ...item, ...updatedItem } : item));

  res.json({ message: 'Item updated successfully' });
});

app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  data = data.filter(item => item.id !== itemId);

  res.json({ message: 'Item deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
