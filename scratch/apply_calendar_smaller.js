const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'homeworkzone', 'src', 'pages', 'TeacherDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const calendarStartToken = "{/* Classroom Journey & Activities Calendar (May 2026) */}";
const startIdx = content.indexOf(calendarStartToken);
if (startIdx === -1) {
    console.error("Calendar start token not found!");
    process.exit(1);
}

const nextCaseToken = "case 'My Classes':";
const nextCaseIdx = content.indexOf(nextCaseToken);
if (nextCaseIdx === -1) {
    console.error("Next case 'My Classes' not found!");
    process.exit(1);
}

// Slicing out the old calendar container up to the return closing divs
const targetCalendarBlock = content.substring(startIdx, content.lastIndexOf("\n", nextCaseIdx));

const smallerCalendarBlock = `{/* Classroom Journey & Activities Calendar (May 2026) */}
                   <div className="max-w-2xl bg-gradient-to-br from-[#FCF8FF] to-[#F3EFFF] border border-[#E5DFFF] rounded-[24px] p-5 space-y-4 shadow-sm">
                      <div className="flex justify-between items-center border-b border-[#EBE4FF] pb-3">
                         <div className="space-y-0.5">
                            <h3 className="text-base font-black text-[#3B2B85] tracking-tight flex items-center gap-1.5">
                               <span>📅</span> Learning Calendar & Reminder Center
                            </h3>
                            <p className="text-[10px] font-bold text-[#7A69D6]">Click active quiz dates to review submissions and send reminder pings.</p>
                         </div>
                         <div className="bg-[#FFF0FA] border border-[#FFDDF5] rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                            <span className="text-[#C23C9F] text-[10px] font-black uppercase tracking-wider">May 2026</span>
                         </div>
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-2">
                         {/* Day headers */}
                         {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                            <div key={day} className={\`text-center text-[9px] font-black uppercase tracking-wider py-1 rounded-lg \${idx >= 5 ? 'bg-[#FFF0FA] text-[#C23C9F]' : 'bg-[#EEECFF] text-[#553EC9]'}\`}>{day}</div>
                         ))}

                         {/* Empty spacer days (May 1, 2026 was a Friday, so Mon-Thu empty) */}
                         {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={\`empty-\${idx}\`} className="aspect-square bg-[#FFF9F9]/40 border border-dashed border-[#FFE3E3] rounded-2xl" />
                         ))}

                         {/* Calendar days */}
                         {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                            const dayStr = day < 10 ? \`0\${day}\` : \`\${day}\`;
                            const activeHw = classHomeworks.find(hw => {
                               const hwDueDate = hw.dueDate || '';
                               return hwDueDate.includes(\`-05-\${dayStr}\`) || hwDueDate.includes(\`-5-\${day}\`);
                            });

                            // Vibrant kid-friendly pastel coloring by subject
                            let dayCardStyle = "bg-white border border-[#E9E4FF] text-[#5C4D9F] hover:bg-[#F9F8FF] hover:border-[#BA68C8]";
                            let tagStyle = "";

                            if (activeHw) {
                               const subj = activeHw.subject || 'General';
                               if (subj === 'Maths') {
                                  dayCardStyle = "bg-gradient-to-br from-[#FFF0EB] to-[#FFE0D6] border-[#FFCCBC] text-[#A83D23] shadow-md shadow-orange-50/50";
                                  tagStyle = "bg-[#FFCCBC] text-[#A83D23]";
                               } else if (subj === 'Science') {
                                  dayCardStyle = "bg-gradient-to-br from-[#EAFBF7] to-[#D1F7EC] border-[#BCEEE2] text-[#1E8A74] shadow-md shadow-teal-50/50";
                                  tagStyle = "bg-[#BCEEE2] text-[#1E8A74]";
                               } else if (subj === 'English') {
                                  dayCardStyle = "bg-gradient-to-br from-[#FFFCE8] to-[#FFF9C4] border-[#FCEE9D] text-[#8C761E] shadow-md shadow-yellow-50/50";
                                  tagStyle = "bg-[#FCEE9D] text-[#8C761E]";
                               } else {
                                  dayCardStyle = "bg-gradient-to-br from-[#FAF2FF] to-[#F1E0FF] border-[#E8C6FF] text-[#7828B4] shadow-md shadow-purple-50/50";
                                  tagStyle = "bg-[#E8C6FF] text-[#7828B4]";
                               }
                            }

                            return (
                               <div 
                                  key={day} 
                                  className={\`aspect-square rounded-2xl p-2 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden group hover:scale-[1.04] \${dayCardStyle}\`}
                                  onClick={() => {
                                     if (activeHw) {
                                        setSelectedCalendarHw(activeHw);
                                        setShowCalendarModal(true);
                                     }
                                  }}
                               >
                                  <span className="text-xs font-black">{day}</span>
                                  
                                  {activeHw && (
                                     <div className={\`px-1.5 py-0.5 rounded-lg text-[8px] font-black truncate shadow-sm mt-1 flex items-center gap-1 \${tagStyle}\`}>
                                        <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                                        \${activeHw.subject}
                                     </div>
                                  )}
                               </div>
                            );
                         })}
                      </div>
                   </div>
                </div>
             );
          }`;

// Check if LF or CRLF match
if (content.indexOf(targetCalendarBlock) !== -1) {
   content = content.replace(targetCalendarBlock, smallerCalendarBlock);
   console.log("Replaced Calendar block using LF!");
} else {
   const targetCalendarBlockCRLF = targetCalendarBlock.replace(/\n/g, '\r\n');
   const smallerCalendarBlockCRLF = smallerCalendarBlock.replace(/\n/g, '\r\n');
   if (content.indexOf(targetCalendarBlockCRLF) !== -1) {
      content = content.replace(targetCalendarBlockCRLF, smallerCalendarBlockCRLF);
      console.log("Replaced Calendar block using CRLF!");
   } else {
      console.error("Failed to replace Calendar block. Check spaces or line endings.");
   }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Calendar tightening complete!");
