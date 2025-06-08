const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/studentapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Models
const Mark = mongoose.model('Mark', new mongoose.Schema({
  subject: String,
  score: Number
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String
}));

const Attendance = mongoose.model('Attendance', new mongoose.Schema({
  student: String,
  date: Date,
  status: { type: String, enum: ['Present', 'Absent'] }
}));

// Routes

// Marks
app.get('/marks', async (req, res) => {
  const marks = await Mark.find();
  res.json(marks);
});

app.post('/marks', async (req, res) => {
  const { subject, score } = req.body;
  const mark = new Mark({ subject, score });
  await mark.save();
  res.json(mark);
});

app.put('/marks/:id', async (req, res) => {
  const { id } = req.params;
  const { subject, score } = req.body;
  const updatedMark = await Mark.findByIdAndUpdate(id, { subject, score }, { new: true });
  res.json(updatedMark);
});

app.delete('/marks/:id', async (req, res) => {
  await Mark.findByIdAndDelete(req.params.id);
  res.json({ message: 'Mark deleted' });
});

// Courses
app.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.post('/courses', async (req, res) => {
  const { name } = req.body;
  const course = new Course({ name });
  await course.save();
  res.json(course);
});

app.put('/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCourse = await Course.findByIdAndUpdate(id, { name }, { new: true });
  res.json(updatedCourse);
});

app.delete('/courses/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: 'Course deleted' });
});

// Attendance
app.get('/attendance', async (req, res) => {
  const attendance = await Attendance.find();
  res.json(attendance);
});

app.post('/attendance', async (req, res) => {
  const { student, date, status } = req.body;
  const attendance = new Attendance({ student, date, status });
  await attendance.save();
  res.json(attendance);
});

app.put('/attendance/:id', async (req, res) => {
  const { id } = req.params;
  const { student, date, status } = req.body;
  const updatedAttendance = await Attendance.findByIdAndUpdate(id, { student, date, status }, { new: true });
  res.json(updatedAttendance);
});

app.delete('/attendance/:id', async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);
  res.json({ message: 'Attendance deleted' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
