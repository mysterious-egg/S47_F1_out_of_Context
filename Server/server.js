const express = require('express');
const app = express();
const mongoose = require('mongoose');
const URI = "mongodb+srv://manvesht:jam020130@clustermv.wrduj4w.mongodb.net/?retryWrites=true&w=majority&appName=Clustermv"
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/',(req,res)=>{
  mongoose.connect(URI).then(()=>{
    res.json({status:"connect"})
  }).catch((err)=>{
    res.json({status:"disconnected"})
  })
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
