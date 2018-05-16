const mongoose = require('mongoose');
const Student = require('./app/models/students.model.js');
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const student = require('./app/controllers/students.controller.js');

const router = express.Router();
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use('/', router);
app.use('/assets', express.static('app/views/assets'));

// configuring the database connection
mongoose.connect(dbConfig.url);

mongoose.connection.on('error', () => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});
mongoose.connection.once('open', () => {
  console.log('Successfully connected to the database.');
})

// define a simple route
router.get('/api', (req, res) => {
  res.json({ "message": "Welcome to the students application REST-ful API" })
});

// find all students
router.get('/api/students', student.findAll);

// find one student
router.get('/api/student/:id', student.find);

// create a new student
router.post('/api/student', student.create);

// update a student
router.put('/api/student/:id', student.update);

// delete a student
router.delete('/api/student/:id', student.delete);

// web
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'app/views' })
})

// port listen
app.listen(9090, (err) => {
  if (err) throw err;
  console.error('Server started on port 9090');
});
