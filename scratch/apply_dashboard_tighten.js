const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'homeworkzone', 'src', 'pages', 'TeacherDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Helper to support CRLF and LF replacements
const replaceToken = (fromStr, toStr) => {
   if (content.indexOf(fromStr) !== -1) {
      content = content.replace(fromStr, toStr);
      console.log(`Replaced LF token: "${fromStr.substring(0, 40)}..."`);
   } else {
      const fromStrCRLF = fromStr.replace(/\n/g, '\r\n');
      const toStrCRLF = toStr.replace(/\n/g, '\r\n');
      if (content.indexOf(fromStrCRLF) !== -1) {
         content = content.replace(fromStrCRLF, toStrCRLF);
         console.log(`Replaced CRLF token: "${fromStr.substring(0, 40)}..."`);
      } else {
         console.warn(`Warning: Token not found: "${fromStr.substring(0, 40)}..."`);
      }
   }
};

// 1. Tighten Main Dashboard Container
replaceToken(
   `             return (\n                <div className="px-10 py-10 space-y-12 pb-40 relative min-h-[calc(100vh-64px)] bg-[#FAF9FF]">`,
   `             return (\n                <div className="px-6 py-6 space-y-6 pb-20 relative min-h-[calc(100vh-64px)] bg-[#FAF9FF]">`
);

// 2. Tighten Columns Grid
replaceToken(
   `                   <div className="grid grid-cols-12 gap-10">`,
   `                   <div className="grid grid-cols-12 gap-6">`
);

// 3. Tighten Left Column Outer Div
replaceToken(
   `                      <div className="col-span-8 space-y-10">`,
   `                      <div className="col-span-8 space-y-6">`
);

// 4. Tighten Class Academic Progress Card Padding & Spacing
replaceToken(
   `                         <div className="bg-white rounded-[40px] border border-[#E9E4FF] shadow-sm p-10 space-y-8">`,
   `                         <div className="bg-white rounded-[32px] border border-[#E9E4FF] shadow-sm p-6 space-y-4">`
);

// 5. Tighten Chart Graph Height and spacing
replaceToken(
   `                            <div className="h-64 flex items-end justify-between gap-2 pr-4 pb-8 border-b border-[#FAF2FF] relative">`,
   `                            <div className="h-48 flex items-end justify-between gap-2 pr-4 pb-4 border-b border-[#FAF2FF] relative">`
);

// 6. Tighten Goals Thermometer card padding
replaceToken(
   `                             <div className="bg-white rounded-[40px] border border-[#E9E4FF] shadow-sm p-10 space-y-6">`,
   `                             <div className="bg-white rounded-[32px] border border-[#E9E4FF] shadow-sm p-6 space-y-4">`
);

// 7. Tighten Right Column Outer Div
replaceToken(
   `                      <div className="col-span-4 space-y-10">`,
   `                      <div className="col-span-4 space-y-6">`
);

// 8. Tighten AI Diagnosis Card (remove fixed h-[360px] to make it close-knit)
replaceToken(
   `                         <div className="bg-gradient-to-br from-[#FAF2FF] to-[#F1E0FF] rounded-[40px] border border-[#E8C6FF] shadow-sm p-10 flex flex-col justify-between h-[360px]">`,
   `                         <div className="bg-gradient-to-br from-[#FAF2FF] to-[#F1E0FF] rounded-[32px] border border-[#E8C6FF] shadow-sm p-6 flex flex-col justify-between gap-4">`
);

// 9. Tighten AI recommendations sub-card padding
replaceToken(
   `                               <div className="bg-white/80 backdrop-blur-sm border border-[#E9E4FF] p-6 rounded-3xl space-y-4">`,
   `                               <div className="bg-white/80 backdrop-blur-sm border border-[#E9E4FF] p-4 rounded-2xl space-y-3">`
);

// 10. Tighten Support Roster card padding
replaceToken(
   `                         <div className="bg-white rounded-[40px] border border-[#E9E4FF] shadow-sm p-8 space-y-6">`,
   `                         <div className="bg-white rounded-[32px] border border-[#E9E4FF] shadow-sm p-6 space-y-4">`
);

// 11. Tighten Calendar card padding and space
replaceToken(
   `                   <div className="bg-gradient-to-br from-[#FCF8FF] to-[#F3EFFF] border border-[#E5DFFF] rounded-[40px] p-10 space-y-8 shadow-sm">`,
   `                   <div className="bg-gradient-to-br from-[#FCF8FF] to-[#F3EFFF] border border-[#E5DFFF] rounded-[32px] p-6 space-y-5 shadow-sm">`
);

// 12. Tighten Calendar Header spacing
replaceToken(
   `                      <div className="flex justify-between items-center border-b border-[#EBE4FF] pb-6">`,
   `                      <div className="flex justify-between items-center border-b border-[#EBE4FF] pb-4">`
);

// 13. Tighten Calendar day cards padding & rounded border
replaceToken(
   `                                 className={\`aspect-square rounded-[28px] p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden group hover:scale-[1.04] \${dayCardStyle}\`}`,
   `                                 className={\`aspect-square rounded-[20px] p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden group hover:scale-[1.04] \${dayCardStyle}\`}`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("TeacherDashboard.jsx tightened successfully! 🎉");
