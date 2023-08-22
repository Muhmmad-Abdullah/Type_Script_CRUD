"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser');
const connection = require('./connection');
var app = (0, express_1.default)();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Welcome to the CRUD OPERATOR");
});
app.get('/employee', (req, res) => {
    connection.query("SELECT * FROM employee", (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(rows);
        }
    });
});
app.get('/employee/:id', (req, res) => {
    connection.query("SELECT * FROM employee WHERE id=?", [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(rows);
        }
    });
});
app.delete('/employee/:id', (req, res) => {
    connection.query("DELETE FROM employee WHERE id=?", [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(result);
        }
    });
});
app.post('/employee', (req, res) => {
    var emp = req.body;
    connection.query("INSERT INTO employee (id, name, email, position) VALUES (?, ?, ?, ?)", [emp.id, emp.name, emp.email, emp.position], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(result);
        }
    });
});
app.patch('/employee/:id', (req, res) => {
    var emp = req.body;
    connection.query("UPDATE employee SET name = ?, email = ?, position = ? WHERE id = ?", [emp.name, emp.email, emp.position, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(result);
        }
    });
});
app.put('/employee/:id', (req, res) => {
    var emp = req.body;
    connection.query("UPDATE employee SET name = ?, email = ?, position = ? WHERE id = ?", [emp.name, emp.email, emp.position, req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
        else {
            res.send(result);
        }
    });
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
