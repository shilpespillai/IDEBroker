const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'homeworkzone', 'src', 'pages', 'TeacherDashboard.jsx');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('homeworkSubject') || line.includes('HomeworkGenerator')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
});
