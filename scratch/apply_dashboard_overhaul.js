const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'homeworkzone', 'src', 'pages', 'TeacherDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace the entire case 'Dashboard': block
const targetStart = "case 'Dashboard':";
const targetIndex = content.indexOf(targetStart);
if (targetIndex === -1) {
    console.error("case 'Dashboard': not found!");
    process.exit(1);
}
const startIndex = content.lastIndexOf("\n", targetIndex) + 1;

const nextCaseIndex = content.indexOf("case 'My Classes':");
if (nextCaseIndex === -1) {
    console.error("Next case 'My Classes': not found!");
    process.exit(1);
}
const endIndex = content.lastIndexOf("\n", nextCaseIndex) + 1;

const codeToInsert = fs.readFileSync(path.join(__dirname, 'code_dashboard.txt'), 'utf8');
const originalDashboardBlock = content.substring(startIndex, endIndex);

content = content.replace(originalDashboardBlock, codeToInsert + "\n");
console.log("1. Case 'Dashboard' replaced in content memory!");

// 2. Remove the local calendar modal block from the 'Calendar' case to prevent double rendering
const calendarModalStart = content.indexOf("{/* Calendar Quick Action Drawer/Modal */}");
if (calendarModalStart !== -1) {
    const calendarModalEnd = content.indexOf("})()", calendarModalStart) + 4;
    content = content.replace(content.substring(calendarModalStart, calendarModalEnd), "");
    console.log("2. Local calendar modal removed from Case 'Calendar'!");
} else {
    console.warn("2. Warning: Local calendar modal in Case 'Calendar' not found (it might be already removed).");
}

// 3. Mount the calendar modal globally right after {renderContent()}
const renderContentCall = "{renderContent()}";
const renderContentIndex = content.indexOf(renderContentCall);
if (renderContentIndex === -1) {
    console.error("{renderContent()} not found in the main component return!");
    process.exit(1);
}

const modalInsertCode = `      {renderContent()}

      {/* Global Calendar Reminder Modal */}
      {showCalendarModal && selectedCalendarHw && (() => {
         const submissions = allSubmissions.filter(s => s.homeworkId === selectedCalendarHw.id && (!activeClassroom || s.classId === activeClassroom.id));
         const classStudents = allStudents.filter(s => s.classId === selectedCalendarHw.assignedClassId);
         const submittedStudentNames = new Set(submissions.map(s => s.studentName?.toLowerCase()));
         const pendingStudents = classStudents.filter(s => !submittedStudentNames.has(s.name?.toLowerCase()));

         const handleSendReminderPing = async (student) => {
            try {
               await addDoc(collection(db, 'messages'), {
                  teacherId: user.uid,
                  senderId: user.uid,
                  senderName: user.displayName || 'Teacher',
                  senderRole: 'teacher',
                  recipientType: 'student',
                  recipientId: student.name,
                  recipientName: student.name,
                  subject: \`⚠️ Reminder: \${selectedCalendarHw.title}\`,
                  content: \`Hi \${student.name}! Friendly reminder to finish your \${selectedCalendarHw.subject} quiz on "\${selectedCalendarHw.title}" as soon as possible! 🚀\`,
                  createdAt: new Date().toISOString()
               });
               alert(\`Reminder sent live to \${student.name}! 🚀\`);
            } catch (err) {
               console.error(err);
               alert("Failed to send reminder.");
            }
         };

         return (
            <div className="fixed inset-0 bg-[#3C2E75]/40 backdrop-blur-sm z-[200] flex-center p-6">
               <div className="max-w-2xl w-full bg-white rounded-[40px] p-10 space-y-8 shadow-2xl border-8 border-[#F3EFFF] relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-start">
                     <div>
                        <span className="text-[9px] font-black uppercase text-[#806BFF] tracking-wider">Mission Details</span>
                        <h3 className="text-2xl font-black text-[#3B2B85]">\${selectedCalendarHw.title}</h3>
                        <p className="text-xs font-bold text-[#7A69D6] italic">\${selectedCalendarHw.subject} • Due: \${selectedCalendarHw.dueDate}</p>
                     </div>
                     <button onClick={() => setShowCalendarModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={20} strokeWidth={3} />
                     </button>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-4">
                     {/* Submitted List */}
                     <div className="space-y-4">
                        <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                           <span>✅</span> Submitted (\${submissions.length})
                        </h4>
                        <div className="space-y-2 max-h-[250px] overflow-y-auto no-scrollbar">
                           {submissions.map(sub => (
                              <div key={sub.id} className="flex justify-between items-center bg-emerald-50/30 border border-emerald-50 p-3 rounded-2xl text-xs font-bold text-[#5C4D9F]">
                                 <span>{sub.studentName}</span>
                                 <span className="font-black text-emerald-500">{sub.score}%</span>
                              </div>
                           ))}
                           {submissions.length === 0 && (
                              <span className="text-xs text-blue-300 italic">No submissions yet.</span>
                           )}
                        </div>
                     </div>

                     {/* Pending List */}
                     <div className="space-y-4">
                        <h4 className="text-sm font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                           <span>⏳</span> Pending (\${pendingStudents.length})
                        </h4>
                        <div className="space-y-2 max-h-[250px] overflow-y-auto no-scrollbar">
                           {pendingStudents.map(student => (
                              <div key={student.id} className="flex justify-between items-center bg-amber-50/30 border border-amber-50 p-3 rounded-2xl text-xs font-bold text-[#5C4D9F]">
                                 <span>{student.name}</span>
                                 <button 
                                    onClick={() => handleSendReminderPing(student)}
                                    className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-white rounded-lg text-[9px] font-black transition-colors"
                                 >
                                    Send Ping 🔔
                                 </button>
                              </div>
                           ))}
                           {pendingStudents.length === 0 && (
                              <span className="text-xs text-emerald-500 font-black italic">Excellent! Everyone has submitted! 🎉</span>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         );
      })()}`;

content = content.replace(renderContentCall, modalInsertCode);
console.log("3. Mounted calendar modal globally!");

fs.writeFileSync(filePath, content, 'utf8');
console.log("TeacherDashboard.jsx updated successfully with global calendar dashboard Overhaul! 🎉");
