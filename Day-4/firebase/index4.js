// with firebase
const express = require('express');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://console.firebase.google.com/u/0/project/fir-afc77/firestore/databases/-default-/data"
});

const db = admin.firestore();
const app = express();
app.use(bodyParser.json());

const collection = 'customers';

app.post('/create', async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection(collection).add(data);
    res.status(201).json({message:'saved!', id: docRef.id});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.get('/find-all', async (req, res) => {
  try {
    const snapshot = await db.collection(collection).get();
    if (snapshot.empty) {
      return res.status(404).json({message: 'No data found'});
    }
    const result = [];
    snapshot.forEach(doc => {
      result.push({id: doc.id, ...doc.data()});
    });
    res.status(200).json({message: 'Data found!', dataList: result});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

app.get('/find-by-id/:id', async (req, res) => {
    const docId = req.params.id;
    try {
      const docRef = db.collection(collection).doc(docId);
      const doc = await docRef.get();
      if (!doc.exists) {
        return res.status(404).json({message: 'No data found', data : null});
      }
      res.status(200).json({message: 'Data found!', data: {id: doc.id, ...doc.data()}});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

app.put('/update-by-id/:id', async (req, res) => {
    const docId = req.params.id;
    const data = req.body;
    try {
      const docRef = db.collection(collection).doc(docId);
      await docRef.update(data);
      res.status(201).json({message: 'Data updated!'});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

app.delete('/delete-by-id/:id', async (req, res) => {
    const docId = req.params.id;
    try {
      await db.collection(collection).doc(docId).delete();
      res.status(200).json({message: 'Data deleted!'});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});