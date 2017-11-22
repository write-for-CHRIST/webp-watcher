const fs = require('fs');
const path = require('path');

// Get absolute path to mock image file
let instructorFile = path.join(__dirname, 'instructor.txt');

fs.readFile(instructorFile, 'utf8', (err, content) => {
  if (err) {
    console.error(err);
    return;
  }
  let mockFile = path.join(__dirname, content);

  // Generate random new name for mock image file
  let randomName = Math.round(Math.random() * 100);
  let relPath = path.parse(mockFile).dir;
  let newFilePath = path.join(relPath, randomName + '-novcs.jpg');

  console.log('Change file: ', mockFile, 'to: ', newFilePath);
  fs.rename(mockFile, newFilePath, err => {
    if (err) {
      console.error(err);
    } else {
      let stripRootPath = newFilePath.substring(__dirname.length, 999);

      fs.writeFile(instructorFile, stripRootPath, err => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
});
