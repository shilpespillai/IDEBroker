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

// 1. Overhaul weakness calculation + add Dynamic learningGaps array
const targetCalc = `             const sortedByAvg = [...subjectAverages].sort((a, b) => a.average - b.average);
             const weakness = sortedByAvg[0] || { subject: 'None yet', average: 100 };

             const studentAverages = {};`;

const replacementCalc = `             const activeSubjectAverages = subjectAverages.filter(sa => sa.count > 0);
             const sortedByAvg = [...activeSubjectAverages].sort((a, b) => a.average - b.average);
             const weakness = sortedByAvg[0] || { subject: 'None yet', average: 100 };

             // Dynamic AI Learning Gaps Analysis based on actual student homework grades
             const learningGaps = [];
             subjectAverages.forEach(sa => {
                if (sa.count > 0 && sa.average < 75) {
                   // Find the homework in this subject with the lowest class average
                   const subjectHws = classHomeworks.filter(h => {
                      let subj = h.subject || 'General';
                      if (subj?.toLowerCase() === 'maths' || subj?.toLowerCase() === 'math') subj = 'Maths';
                      else if (subj?.toLowerCase() === 'science') subj = 'Science';
                      else if (subj?.toLowerCase() === 'english') subj = 'English';
                      return subj === sa.subject;
                   });

                   let worstHw = null;
                   let lowestAvg = 100;
                   subjectHws.forEach(hw => {
                      const hwSubs = classSubmissions.filter(sub => sub.homeworkId === hw.id);
                      if (hwSubs.length > 0) {
                         const avg = Math.round(hwSubs.reduce((a, b) => a + (b.score || 0), 0) / hwSubs.length);
                         if (avg < lowestAvg) {
                            lowestAvg = avg;
                            worstHw = hw;
                         }
                      }
                   });

                   let focusTopic = worstHw ? worstHw.title : 'General Concepts';
                   let tip = '';
                   if (sa.subject === 'Maths') {
                      tip = \`Review fraction partitioning and numerator/denominator definitions in the next lesson.\`;
                   } else if (sa.subject === 'Science') {
                      tip = \`Use orbital visual aids and reinforce planet order/distances.\`;
                   } else if (sa.subject === 'English') {
                      tip = \`Spend 10 minutes practicing core vocabulary rules and dictionary spelling checks.\`;
                   } else {
                      tip = \`Conduct a 5-minute warm-up quiz on recent content before lecturing.\`;
                   }

                   learningGaps.push({
                      subject: sa.subject,
                      average: sa.average,
                      topic: focusTopic,
                      tip: tip
                   });
                }
             });

             const studentAverages = {};`;

replaceToken(targetCalc, replacementCalc);

// 2. Overhaul right panel to render the new Gaps Indicator
const targetRender = `                      {/* Right: AI Teaching Co-Pilot Diagnostic Card */}
                      <div className="col-span-4 space-y-6">
                         {/* AI Co-Pilot Intervention */}
                         <div className="bg-gradient-to-br from-[#FAF2FF] to-[#F1E0FF] rounded-[32px] border border-[#E8C6FF] shadow-sm p-6 flex flex-col justify-between gap-4">
                            <div className="space-y-4">
                               <div className="flex items-center gap-3">
                                  <span className="text-3xl">🤖</span>
                                  <h3 className="text-xl font-black text-[#3C2E75] tracking-tight">AI Co-Pilot Diagnosis</h3>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm border border-[#E9E4FF] p-4 rounded-2xl space-y-3">
                                   <p className="text-sm font-black text-[#5C4D9F] leading-relaxed">
                                      {weakness.subject !== 'None yet' && weakness.average < 75 ? (
                                         <span>Learning gaps detected in <strong>{weakness.subject}</strong> (avg: {weakness.average}%). They would benefit from a revision challenge.</span>
                                      ) : (
                                         <span>Class averages are healthy! Mastery levels are high across subjects. Keep going!</span>
                                      )}
                                   </p>
                                   <div className="bg-[#FAF2FF] rounded-2xl p-4 border border-[#E8C6FF]/40">
                                      <span className="text-[9px] font-black uppercase text-purple-400 tracking-wider block mb-1">Recommended Mission</span>
                                      <p className="text-xs font-black text-purple-600 leading-tight">
                                         {weakness.subject !== 'None yet' && weakness.average < 75 
                                            ? \`Assign a 5-question conceptual review on \${weakness.subject}.\`
                                            : \`Assign a creative multidisciplinary challenge quest!\`
                                         }
                                      </p>
                                   </div>
                                </div>
                             </div>
                             <button 
                                onClick={() => setActiveTab('Homework')}
                                className="w-full bg-[#8A70FF] text-white py-4 rounded-3xl font-black text-xs hover:bg-[#7455FF] transition-all shadow-lg shadow-purple-100"
                             >
                                Generate Revision Mission 🚀
                             </button>
                          </div>`;

const replacementRender = `                      {/* Right: AI Teaching Co-Pilot Diagnostic Card */}
                      <div className="col-span-4 space-y-6">
                         {/* AI Co-Pilot Intervention */}
                         <div className="bg-gradient-to-br from-[#FAF2FF] to-[#F1E0FF] rounded-[32px] border border-[#E8C6FF] shadow-sm p-6 space-y-4">
                            <div className="flex items-center gap-3">
                               <span className="text-3xl">🤖</span>
                               <div className="space-y-0.5">
                                  <h3 className="text-xl font-black text-[#3C2E75] tracking-tight">AI Co-Pilot Diagnosis</h3>
                                  <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Real-time conceptual learning gaps</p>
                               </div>
                            </div>
                            
                            <div className="space-y-3">
                               {learningGaps.length > 0 ? (
                                  learningGaps.map(gap => {
                                     let textColor = "text-[#7828B4]";
                                     let badgeBg = "bg-[#FAF2FF] border-[#E8C6FF]/40";
                                     let progressColor = "bg-[#CE93D8]";
                                     if (gap.subject === 'Maths') {
                                        textColor = "text-[#C64F33]";
                                        badgeBg = "bg-[#FFF0EB] border-[#FFD2C4]/40";
                                        progressColor = "bg-[#FF7043]";
                                     } else if (gap.subject === 'Science') {
                                        textColor = "text-[#1E8A74]";
                                        badgeBg = "bg-[#EAFBF7] border-[#BCEEE2]/40";
                                        progressColor = "bg-[#26A69A]";
                                     } else if (gap.subject === 'English') {
                                        textColor = "text-[#8C761E]";
                                        badgeBg = "bg-[#FFFCE8] border-[#FCEE9D]/40";
                                        progressColor = "bg-[#FFCA28]";
                                     }
                                     
                                     return (
                                        <div key={gap.subject} className="bg-white/95 backdrop-blur-sm border border-[#EBE4FF] p-4 rounded-2xl space-y-3 shadow-[0_2px_8px_-3px_rgba(122,105,214,0.1)]">
                                           <div className="flex justify-between items-center">
                                              <div className="flex items-center gap-2">
                                                 <span className={\`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg border \${badgeBg} \${textColor}\`}>{gap.subject}</span>
                                                 <span className="text-[10px] font-black text-[#3C2E75] truncate max-w-[140px]" title={gap.topic}>"{gap.topic}"</span>
                                              </div>
                                              <span className={\`text-xs font-black \${textColor}\`}>{gap.average}% Mastery</span>
                                           </div>
                                           <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                              <div className={\`h-full rounded-full \${progressColor}\`} style={{ width: \`\${gap.average}%\` }} />
                                           </div>
                                           <div className="bg-[#FAF2FF] rounded-xl p-3 border border-[#E8C6FF]/30">
                                              <span className="text-[8px] font-black uppercase text-purple-400 tracking-wider block mb-0.5">💡 Teacher Prep Hint</span>
                                              <p className="text-[11px] font-bold text-[#5C4D9F] leading-snug">{gap.tip}</p>
                                           </div>
                                        </div>
                                     );
                                  })
                               ) : (
                                  <div className="bg-white/80 backdrop-blur-sm border border-[#E9E4FF] p-5 rounded-2xl text-center space-y-2">
                                     <span className="text-2xl block">🎉</span>
                                     <p className="text-xs font-black text-[#3C2E75]">All clear! No active learning gaps</p>
                                     <p className="text-[10px] font-bold text-slate-400 leading-snug">
                                        {activeSubjectAverages.length > 0 
                                           ? "Classroom averages are healthy (75%+). Students are demonstrating solid mastery!" 
                                           : "No student submission data is available yet to diagnose learning gaps."
                                        }
                                     </p>
                                  </div>
                                )}
                            </div>
                         </div>`;

replaceToken(targetRender, replacementRender);

fs.writeFileSync(filePath, content, 'utf8');
console.log("TeacherDashboard.jsx overhauled with beautiful AI Learning Gaps Indicator successfully! 🚀");
