const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'homeworkzone', 'src', 'pages', 'TeacherDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const replaceToken = (fromStr, toStr) => {
   if (content.indexOf(fromStr) !== -1) {
      content = content.replace(new RegExp(fromStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), toStr);
      console.log(`Replaced LF token!`);
   } else {
      const fromStrCRLF = fromStr.replace(/\n/g, '\r\n');
      const toStrCRLF = toStr.replace(/\n/g, '\r\n');
      if (content.indexOf(fromStrCRLF) !== -1) {
         content = content.replace(new RegExp(fromStrCRLF.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), toStrCRLF);
         console.log(`Replaced CRLF token!`);
      } else {
         console.warn(`Warning: Token not found!`);
      }
   }
};

const target = "const classSubmissions = allSubmissions.filter(sub => !activeClassroom || sub.classId === activeClassroom.id);";
const replacement = `const classSubmissions = allSubmissions.filter(sub => {
                if (!activeClassroom) return true;
                const hw = allHomeworks.find(h => h.id === sub.homeworkId);
                const subClassId = sub.classId || hw?.assignedClassId;
                return subClassId === activeClassroom.id;
             });`;

replaceToken(target, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("TeacherDashboard.jsx class submissions fallback applied successfully! 🎉");
