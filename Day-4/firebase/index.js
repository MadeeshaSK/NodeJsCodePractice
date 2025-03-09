//with mysql

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '8015',
  database: 'test1'
});

db.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL');
  }
});

app.post('/create', (req, res) => {
  const {id, name, address, salary} = req.body;
  const sql = "INSERT INTO customer VALUES(?, ?, ?, ?)";
  db.query(sql, [id, name, address, salary], (err, result) => {
    if (err) {
      return res.status(500).send({error: err.message});
    } else {
      res.status(201).send({message: 'Data inserted successfully'});
    }
  });
});

app.get('/find-all', (req, res) => {
  const sql = "SELECT * FROM customer";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send({error: err.message});
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/find-by-id/:id', (req, res) => {
  const {id} = req.params;
  const sql = "SELECT * FROM customer WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send({error: err.message});
    }
    if (result.length === 0) {
      return res.status(404).send({message: 'Data not found!', data:null});
    } else {
      res.status(200).send({message: 'Data found!', data: result[0]});
    } 
  });
});

app.put('/update-by-id/:id', (req, res) => {
  const {id} = req.params;
  const {name, address, salary} = req.body;
  const sql = "UPDATE customer SET name = ?, address = ?, salary = ? WHERE id = ?";
  db.query(sql, [name, address, salary, id], (err, result) => {
    if (err) {
      return res.status(500).send({error: err.message});
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({message: 'Data not found!', data:null});
    } else {
      res.status(201).send({message: 'Data updated successfully'});
    }
  });
});

app.delete('/delete-by-id/:id', (req, res) => {
  const {id} = req.params;
  const sql = "DELETE FROM customer WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send({error: err.message});
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({message: 'Data not found!', data:null});
    } else {
      res.status(204).send({message: 'Data deleted successfully'});
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
