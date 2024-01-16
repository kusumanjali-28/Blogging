const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const imageRouter = require('./PostRoute');
const RegRoute = require('./RegRoute');

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use('/api', imageRouter);
app.use('/api', RegRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://Anjali:Oneshot28@oneshot.7qa3wcj.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
