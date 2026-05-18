const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'homeworkzone', 'src', 'pages', 'TeacherDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `                      </div>
                   </div>

                   }
                </div>`;

if (content.indexOf(targetStr) === -1) {
   // Let's search with CRLF just in case
   const targetStrCRLF = targetStr.replace(/\n/g, '\r\n');
   if (content.indexOf(targetStrCRLF) !== -1) {
      content = content.replace(targetStrCRLF, `                      </div>
                   </div>
                </div>`.replace(/\n/g, '\r\n'));
      console.log("Stray bracket replaced with CRLF!");
   } else {
      // Let's do a simple replace with less strict spaces
      const startIdx = content.indexOf("case 'Calendar':");
      if (startIdx !== -1) {
         const nextBraceIdx = content.indexOf("}", startIdx + 1000); // look ahead
         // We can just find the first occurrence of "}" before "</div>\r\n             );"
         const strayBracketIdx = content.indexOf("}\r\n                </div>\r\n             );", startIdx);
         if (strayBracketIdx !== -1) {
            content = content.replace("}\r\n                </div>\r\n             );", "</div>\r\n             );");
            console.log("Stray bracket replaced via method 2!");
         } else {
            const strayBracketIdxLF = content.indexOf("}\n                </div>\n             );", startIdx);
            if (strayBracketIdxLF !== -1) {
               content = content.replace("}\n                </div>\n             );", "</div>\n             );");
               console.log("Stray bracket replaced via method 2 LF!");
            } else {
               console.error("Method 2 failed to locate the stray bracket block.");
            }
         }
      }
   }
} else {
   content = content.replace(targetStr, `                      </div>
                   </div>
                </div>`);
   console.log("Stray bracket replaced with LF!");
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Done fixing bracket!");
