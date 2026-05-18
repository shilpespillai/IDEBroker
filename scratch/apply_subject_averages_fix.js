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

// 1. Replace the subject stats math to pre-populate core subjects and map synonyms
const targetMath = `             // Calculate subject averages
             const subjectStats = {};
             classSubmissions.forEach(sub => {
                const hw = allHomeworks.find(h => h.id === sub.homeworkId);
                const subject = hw ? hw.subject : 'General';
                if (!subjectStats[subject]) subjectStats[subject] = { total: 0, count: 0 };
                subjectStats[subject].total += sub.score || 0;
                subjectStats[subject].count += 1;
             });

             const subjectAverages = Object.entries(subjectStats).map(([subj, data]) => ({
                subject: subj,
                average: Math.round(data.total / data.count),
                count: data.count
             }));`;

const replacementMath = `             // Calculate subject averages (always pre-populate the three core areas)
             const subjectStats = {
                'Maths': { total: 0, count: 0 },
                'Science': { total: 0, count: 0 },
                'English': { total: 0, count: 0 }
             };
             classSubmissions.forEach(sub => {
                const hw = allHomeworks.find(h => h.id === sub.homeworkId);
                let subject = hw ? hw.subject : 'General';
                if (subject?.toLowerCase() === 'maths' || subject?.toLowerCase() === 'math') subject = 'Maths';
                else if (subject?.toLowerCase() === 'science') subject = 'Science';
                else if (subject?.toLowerCase() === 'english') subject = 'English';
                else subject = 'General';

                if (!subjectStats[subject]) subjectStats[subject] = { total: 0, count: 0 };
                subjectStats[subject].total += sub.score || 0;
                subjectStats[subject].count += 1;
             });

             const subjectAverages = Object.entries(subjectStats)
                .map(([subj, data]) => ({
                   subject: subj,
                   average: data.count > 0 ? Math.round(data.total / data.count) : 0,
                   count: data.count
                }))
                .filter(sa => ['Maths', 'Science', 'English'].includes(sa.subject) || sa.count > 0);`;

replaceToken(targetMath, replacementMath);

// 2. Replace the render logic to handle 0-submission states gracefully (displaying N/A instead of 0% and No submissions yet)
const targetRender = `                                   return (
                                      <div key={sa.subject} className={\`p-4 rounded-2xl border \${cardBg} space-y-2 flex flex-col justify-between\`}>
                                         <div className="flex justify-between items-center">
                                            <span className="text-xs font-black text-[#3C2E75]">{sa.subject}</span>
                                            <span className={\`text-xs font-black \${textColor}\`}>{sa.average}%</span>
                                         </div>
                                         <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-slate-100">
                                            <div className={\`h-full rounded-full \${barColor}\`} style={{ width: \`\${sa.average}%\` }} />
                                         </div>
                                         <span className="text-[8px] font-bold text-slate-400 block text-right">{sa.count} assignments</span>
                                      </div>
                                   );`;

const replacementRender = `                                   return (
                                      <div key={sa.subject} className={\`p-4 rounded-2xl border \${cardBg} space-y-2 flex flex-col justify-between\`}>
                                         <div className="flex justify-between items-center">
                                            <span className="text-xs font-black text-[#3C2E75]">{sa.subject}</span>
                                            <span className={\`text-xs font-black \${textColor}\`}>{sa.count > 0 ? \`\${sa.average}%\` : 'N/A'}</span>
                                         </div>
                                         <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-slate-100">
                                            <div className={\`h-full rounded-full \${barColor}\`} style={{ width: \`\${sa.average}%\` }} />
                                         </div>
                                         <span className="text-[8px] font-bold text-slate-400 block text-right">
                                            {sa.count > 0 ? \`\${sa.count} assignment\${sa.count > 1 ? 's' : ''}\` : 'No submissions yet'}
                                         </span>
                                      </div>
                                   );`;

replaceToken(targetRender, replacementRender);

fs.writeFileSync(filePath, content, 'utf8');
console.log("TeacherDashboard.jsx subject averages pre-population completed successfully! 🎉");
