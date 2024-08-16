// test-file-read.js

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'timetable.xlsx');

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
  } else {
    console.log('File read successfully');
  }
});
