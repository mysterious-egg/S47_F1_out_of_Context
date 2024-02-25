const express = require('express');
const app = express();
const env=require('dotenv').config()
const mongoose = require('mongoose');
const URI = process.env.URII
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/',(req,res)=>{
  mongoose.connect(URI).then(()=>{
    res.json({status:"connected"})
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
