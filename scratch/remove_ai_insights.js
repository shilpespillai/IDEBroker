const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'homeworkzone', 'src', 'pages', 'TeacherDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const startSearch = "case 'AI Insights':";
const startIdxSub = content.indexOf(startSearch);
if (startIdxSub === -1) {
    console.error("AI Insights case not found!");
    process.exit(1);
}
const startIdx = content.lastIndexOf("\n", startIdxSub) + 1;

const endSearch = "case 'Class Goals':";
const endIdxSub = content.indexOf(endSearch);
if (endIdxSub === -1) {
    console.error("Class Goals case not found!");
    process.exit(1);
}
const endIdx = content.lastIndexOf("\n", endIdxSub) + 1;

const targetBlock = content.substring(startIdx, endIdx);
content = content.replace(targetBlock, "");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Redundant AI Insights switch case removed successfully! 🎉");
