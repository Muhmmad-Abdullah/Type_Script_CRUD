import * as mysql from 'mysql2/promise'; // Import promise version

const mysqlConnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "abdullah@123",
  database: "employess_db"
});

// Use async/await to connect
async function connectToDatabase() {
  try {
    await (await mysqlConnection).connect();
    console.log('Database Connected Successfully!!');
  } catch (err) {
    console.log('Error Connection in Database :' + JSON.stringify(err, undefined, 2));
  }
}

export { mysqlConnection, connectToDatabase };
