const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'homeworkzone', 'src', 'pages', 'TeacherDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const replaceToken = (fromStr, toStr) => {
   if (content.indexOf(fromStr) !== -1) {
      content = content.replace(fromStr, toStr);
      console.log(`Replaced LF token!`);
   } else {
      const fromStrCRLF = fromStr.replace(/\n/g, '\r\n');
      const toStrCRLF = toStr.replace(/\n/g, '\r\n');
      if (content.indexOf(fromStrCRLF) !== -1) {
         content = content.replace(fromStrCRLF, toStrCRLF);
         console.log(`Replaced CRLF token!`);
      } else {
         console.warn(`Warning: Token not found!`);
      }
   }
};

// 1. Add fetchAllStudents() inside handleAddStudent
const targetAdd = `      setNewStudentName('');
      setNewStudent('');
      fetchStudents();
    } catch (err) {`;

const replacementAdd = `      setNewStudentName('');
      setNewStudent('');
      fetchStudents();
      fetchAllStudents();
    } catch (err) {`;

replaceToken(targetAdd, replacementAdd);

// 2. Overhaul students fetch useEffect hook
const targetEffect = `  useEffect(() => {
    if (activeTab === 'Students' || activeTab === 'Messages') {
       fetchAllStudents();
    }
  }, [activeTab, classrooms]);`;

const replacementEffect = `  useEffect(() => {
    if (user && classrooms.length > 0) {
       fetchAllStudents();
    }
  }, [user, classrooms]);`;

replaceToken(targetEffect, replacementEffect);

fs.writeFileSync(filePath, content, 'utf8');
console.log("TeacherDashboard.jsx student aggregation overhauled successfully! 🎉");
