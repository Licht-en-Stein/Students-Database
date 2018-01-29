const Student = require('../models/students.model.js');

// read statement all
exports.findAll = (req, res) => {
    Student.find((err, data) => {
      
      console.log(data);
      res.send(data);
    });
  };

// read statement one
exports.find = (req, res) => {
    Student.findById(req.params.id, (err, student) => {

      if (!student) {
        return res.send({ err: 'student not found' });
      }
      console.log(student);
      res.send(student);
    });
};

// create statement
exports.create = (req, res) => {

    const newStudent = new Student(req.body);
    newStudent.save((err) => {
      if (err) {
        return res.send(err);
      }
      console.log('new student has been saved successfully');
      return res.send({ newStudent: req.body })
    })
};

// update statement
exports.update = (req, res) => {
  
    Student.findById(req.params.id, (err, student) => {
      if (!student) {
        return res.send({ err: 'student not found' });
      }
      // check all params that are set in req.body and attach/overwrite the student object
      for (attr in req.body) {
        Student[attr] = req.body[attr];
      }
      student.save((err) => {
        if (err) {
          return res.send(err);
        }

        console.log('student has been updated successfully');
        return res.send(student);
      });
    });
};

// delete statement
exports.delete = (req, res) => {
    Student.findById(req.params.id, (err, student) => {
      if (!student) {
        return res.send({ err: 'student not found' });
      }
      student.remove((err) => {
        if (err) {
          return res.send(err);
        }
        console.log('student deleted');
        return res.send(student);
      });
    });
};
