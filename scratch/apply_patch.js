const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'homeworkzone', 'src', 'pages', 'TeacherDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const codeToInsert = fs.readFileSync(path.join(__dirname, 'code.txt'), 'utf8');

const targetIndex = content.indexOf("case 'AI Hub':");
if (targetIndex === -1) {
    console.error("case 'AI Hub': not found!");
    process.exit(1);
}

// Find start of the line (last index of \n before targetIndex)
const startIndex = content.lastIndexOf("\n", targetIndex) + 1;

const endIndex = content.indexOf(");", targetIndex);
if (endIndex === -1) {
    console.error("Ending ); not found!");
    process.exit(1);
}

const patchLength = ");".length;
const originalAiHubBlock = content.substring(startIndex, endIndex + patchLength);

content = content.replace(originalAiHubBlock, codeToInsert);
fs.writeFileSync(filePath, content, 'utf8');
console.log("TeacherDashboard.jsx patched successfully! 🎉");
