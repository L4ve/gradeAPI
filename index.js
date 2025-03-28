const express = require('express');
const pg = require('pg');
const app = express();
const client = new pg.Client({
    user: 'user15', // Nazwa użytkownika bazy danych
    host: '192.168.0.207', // Adres hosta bazy danych
    database: 'user15_db', // Nazwa bazy danych
    password: 'UCD14YUT', // Hasło użytkownika bazy danych
    port: 5432, // Port, na którym działa serwer PostgreSQL
});


app.use(express.json()); // Middleware to parse JSON request bodies
//app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/grades/:student_id/', async (req, res) => {
    const studentId = req.params.student_id;
    console.log("Student ID:", studentId);
    const query = 'SELECT * FROM grades WHERE student_id = ' + studentId;
    const result = await client.query(query);
    console.log("Query Result:");
    console.table(result.rows);
    res.end();
});
app.post('/grades/:student_id/', async (req, res) => {
    const studentId = req.params.student_id;
    console.log("Student ID:", studentId);
    console.log("Request Body:", req.body);
    res.end();
});
app.listen(3000, async () => {
    await client.connect(); // Connect to the database
    console.log('Connected to the database');
    console.log('Server is running on port 3000');
}); 
app.on('close', async () => {
    await client.connect(); // Disconnect from the database when the server closes
    console.log('Disconnected from the database');
});