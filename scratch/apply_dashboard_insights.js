const fs = require('fs');
const path = require('path');

const fileDashboard = path.join(__dirname, '..', 'homeworkzone', 'src', 'pages', 'TeacherDashboard.jsx');
let content = fs.readFileSync(fileDashboard, 'utf8');

const codeInsights = fs.readFileSync(path.join(__dirname, 'code_dashboard_insights.txt'), 'utf8');

// Find start of case 'Dashboard':
const startSearch = "case 'Dashboard':";
const startIdxSub = content.indexOf(startSearch);
if (startIdxSub === -1) {
    console.error("Start search token not found!");
    process.exit(1);
}
// Go back to the beginning of the line
const startIdx = content.lastIndexOf("\n", startIdxSub) + 1;

// Find next case My Classes:
const endSearch = "case 'My Classes':";
const endIdxSub = content.indexOf(endSearch);
if (endIdxSub === -1) {
    console.error("End search token not found!");
    process.exit(1);
}
// Go back to the beginning of the line
const endIdx = content.lastIndexOf("\n", endIdxSub) + 1;

// Replace the target block
const targetBlock = content.substring(startIdx, endIdx);
content = content.replace(targetBlock, codeInsights + "\n");

fs.writeFileSync(fileDashboard, content, 'utf8');
console.log("Dashboard AI Gaps overhauling integration completed successfully! 🎉");
