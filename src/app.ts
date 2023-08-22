import { Request, Response } from 'express';
import { mysqlConnection, connectToDatabase } from './connection';
import express from 'express';
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

// Use the connectToDatabase function to establish the connection
connectToDatabase()
  .then(async () => {
    console.log('Database connection established.');

    app.get('/', (req: Request, res: Response) => {
      res.send("Welcome to the CRUD OPERATOR");
    });

    app.get('/employee', async (req: Request, res: Response) => {
      try {
        const connection = await mysqlConnection;
        const [rows] = await connection.query("SELECT * FROM employee");
        res.send(rows);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get('/employee/:id', async (req: Request, res: Response) => {
      try {
        const connection = await mysqlConnection;
        const [rows] = await connection.query("SELECT * FROM employee WHERE id=?", [req.params.id]);
        res.send(rows);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });

    app.delete('/employee/:id', async (req: Request, res: Response) => {
      try {
        const connection = await mysqlConnection;
        const [result] = await connection.query("DELETE FROM employee WHERE id=?", [req.params.id]);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });

    app.post('/employee', async (req: Request, res: Response) => {
      var emp = req.body;
      try {
        const connection = await mysqlConnection;
        const [result] = await connection.query(
          "INSERT INTO employee (id, name, email, position) VALUES (?, ?, ?, ?)",
          [emp.id, emp.name, emp.email, emp.position]
        );
        res.send(result);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });

    app.patch('/employee/:id', async (req: Request, res: Response) => {
      var emp = req.body;
      try {
        const connection = await mysqlConnection;
        const [result] = await connection.query(
          "UPDATE employee SET name = ?, email = ?, position = ? WHERE id = ?",
          [emp.name, emp.email, emp.position, req.params.id]
        );
        res.send(result);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });

    app.put('/employee/:id', async (req: Request, res: Response) => {
      var emp = req.body;
      try {
        const connection = await mysqlConnection;
        const [result] = await connection.query(
          "UPDATE employee SET name = ?, email = ?, position = ? WHERE id = ?",
          [emp.name, emp.email, emp.position, req.params.id]
        );
        res.send(result);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });

    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
  });
