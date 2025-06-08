const apiUrl = 'http://localhost:5000/api'; // Your backend base URL

// --- Marks CRUD ---

const marksTableBody = document.querySelector('#marksTable tbody');
const markForm = document.getElementById('markForm');
const markIdInput = document.getElementById('markId');
const subjectInput = document.getElementById('subject');
const scoreInput = document.getElementById('score');
const cancelMarkEditBtn = document.getElementById('cancelMarkEdit');

function fetchMarks() {
  fetch(`${apiUrl}/marks`)
    .then(res => res.json())
    .then(data => {
      marksTableBody.innerHTML = '';
      data.forEach(mark => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${mark.subject}</td>
          <td>${mark.score}</td>
          <td>
            <button onclick="editMark('${mark._id}', '${mark.subject}', ${mark.score})">Edit</button>
            <button onclick="deleteMark('${mark._id}')">Delete</button>
          </td>
        `;
        marksTableBody.appendChild(tr);
      });
    });
}

markForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = markIdInput.value;
  const markData = {
    subject: subjectInput.value,
    score: Number(scoreInput.value)
  };
  if (id) {
    // Update
    fetch(`${apiUrl}/marks/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(markData)
    }).then(() => {
      resetMarkForm();
      fetchMarks();
    });
  } else {
    // Create
    fetch(`${apiUrl}/marks`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(markData)
    }).then(() => {
      resetMarkForm();
      fetchMarks();
    });
  }
});

function editMark(id, subject, score) {
  markIdInput.value = id;
  subjectInput.value = subject;
  scoreInput.value = score;
  cancelMarkEditBtn.style.display = 'inline';
}

cancelMarkEditBtn.addEventListener('click', () => {
  resetMarkForm();
});

function resetMarkForm() {
  markIdInput.value = '';
  subjectInput.value = '';
  scoreInput.value = '';
  cancelMarkEditBtn.style.display = 'none';
}

function deleteMark(id) {
  if (confirm('Delete this mark?')) {
    fetch(`${apiUrl}/marks/${id}`, { method: 'DELETE' })
      .then(() => fetchMarks());
  }
}

// --- Courses CRUD ---

const coursesTableBody = document.querySelector('#coursesTable tbody');
const courseForm = document.getElementById('courseForm');
const courseIdInput = document.getElementById('courseId');
const courseNameInput = document.getElementById('courseName');
const cancelCourseEditBtn = document.getElementById('cancelCourseEdit');

function fetchCourses() {
  fetch(`${apiUrl}/courses`)
    .then(res => res.json())
    .then(data => {
      coursesTableBody.innerHTML = '';
      data.forEach(course => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${course.name}</td>
          <td>
            <button onclick="editCourse('${course._id}', '${course.name}')">Edit</button>
            <button onclick="deleteCourse('${course._id}')">Delete</button>
          </td>
        `;
        coursesTableBody.appendChild(tr);
      });
    });
}

courseForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = courseIdInput.value;
  const courseData = { name: courseNameInput.value };
  if (id) {
    // Update
    fetch(`${apiUrl}/courses/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(courseData)
    }).then(() => {
      resetCourseForm();
      fetchCourses();
    });
  } else {
    // Create
    fetch(`${apiUrl}/courses`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(courseData)
    }).then(() => {
      resetCourseForm();
      fetchCourses();
    });
  }
});

function editCourse(id, name) {
  courseIdInput.value = id;
  courseNameInput.value = name;
  cancelCourseEditBtn.style.display = 'inline';
}

cancelCourseEditBtn.addEventListener('click', () => {
  resetCourseForm();
});

function resetCourseForm() {
  courseIdInput.value = '';
  courseNameInput.value = '';
  cancelCourseEditBtn.style.display = 'none';
}

function deleteCourse(id) {
  if (confirm('Delete this course?')) {
    fetch(`${apiUrl}/courses/${id}`, { method: 'DELETE' })
      .then(() => fetchCourses());
  }
}

// --- Initial load ---
fetchMarks();
fetchCourses();
