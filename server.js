const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/formDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


const formSchema = new mongoose.Schema({
  name: String,
  impactArea: String,
  category: String,
  location: String
});


const Form = mongoose.model('Form', formSchema);


const app = express();
app.use(cors());

app.use(bodyParser.json());


app.post('/submit', async (req, res) => {
  try {
    
    const newForm = new Form(req.body);

    await newForm.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while submitting the form' });
  }
});

const uri = 'mongodb://localhost:27017/'; 
const dbName = 'formDB'; 
const collectionName = 'forms'; 

app.get('/api/data', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = process.env.PORT || 5000;
const apiKey = 'd930c9c94aa6418c96a1185e3fbfc464';
app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get(
      'https://newsapi.org/v2/everything', {
        params: {
          q: 'NGO',
          apiKey: apiKey,
          language: 'en',
          qInTitle: 'NGO'
        }
      }
    );
    res.json(response.data.articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
});



// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

