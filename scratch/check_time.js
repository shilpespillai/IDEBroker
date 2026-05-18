const subTime = 1779068125 * 1000;
const subDate = new Date(subTime);
console.log("Submission Date UTC:", subDate.toUTCString());
console.log("Submission Date Local:", subDate.toString());

const now = new Date("2026-05-18T16:22:48+10:00");
console.log("Current Date Local:", now.toString());

const diffMs = now - subDate;
console.log("Difference in Hours:", diffMs / (1000 * 60 * 60));
