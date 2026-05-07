import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Library, 
  ClipboardList, 
  MessageSquare, 
  Settings, 
  LogOut,
  Search,
  Bell,
  Sun,
  ChevronRight,
  Play,
  Award,
  Sparkles,
  Rocket,
  MoreVertical,
  CloudSun
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentQuiz from './pages/StudentQuiz';

// --- Academic Progress Data ---
const PROGRESS_DATA = [
  { name: 'Feb', exams: 30, assignments: 40 },
  { name: 'Mar', exams: 45, assignments: 70 },
  { name: 'Apr', exams: 35, assignments: 60 },
  { name: 'May', exams: 80, assignments: 40 },
  { name: 'June', exams: 40, assignments: 60 },
  { name: 'July', exams: 50, assignments: 45 },
];

// --- Student Dashboard (High Fidelity e-Class Style) ---
const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeCourse, setActiveCourse] = useState('Photography');

  return (
    <div className="flex min-h-screen bg-[#4c49ed] font-sans overflow-hidden">
      {/* --- Sidebar (Indigo-Violet) --- */}
      <aside className="w-72 flex flex-col p-8 text-white space-y-12 shrink-0">
        <div className="text-3xl font-black tracking-tighter flex items-center gap-2">
           e-Class<span className="text-orange-400">.</span>
        </div>
        
        <nav className="flex-1 space-y-3">
          <StudentSidebarItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active />
          <StudentSidebarItem icon={<BookOpen className="w-5 h-5" />} label="Classes" />
          <StudentSidebarItem icon={<Library className="w-5 h-5" />} label="Resources" />
          <StudentSidebarItem icon={<ClipboardList className="w-5 h-5" />} label="Learning Plan" />
          <StudentSidebarItem icon={<MessageSquare className="w-5 h-5" />} label="Chat" count={5} />
          <StudentSidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" />
        </nav>

        {/* Upgrade Card with 3D Mascot */}
        <div className="bg-white/10 rounded-[32px] p-6 pt-16 relative overflow-visible mt-20">
           <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 drop-shadow-2xl">
              <img src="/rocket_mascot.png" alt="Mascot" className="w-full" />
           </div>
           <div className="relative z-10 text-center space-y-4">
              <div className="space-y-1">
                 <p className="text-sm font-black">Upgrade to Pro</p>
                 <p className="text-[10px] text-white/50 leading-relaxed font-bold uppercase tracking-widest">For more resources!</p>
              </div>
              <button className="bg-[#00c2ff] text-white w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#00c2ff]/30 hover:scale-105 transition-all">Upgrade Now</button>
           </div>
        </div>

        <button onClick={() => navigate('/')} className="flex items-center gap-3 text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest pl-4">
           <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>

      {/* --- Main Content Area (Spread Across Page) --- */}
      <main className="flex-1 bg-white my-4 mr-4 rounded-[48px] p-12 overflow-y-auto flex gap-12 shadow-2xl relative z-10">
        
        {/* Left Side: Feed (70%) */}
        <div className="flex-[2] space-y-12">
          {/* Welcome Header */}
          <header className="flex items-center justify-between border-b border-slate-50 pb-10">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 bg-orange-50 rounded-full overflow-hidden flex-center border-4 border-white shadow-xl">
                 <img src="/student_avatar.png" alt="Avatar" className="w-20 h-20" />
              </div>
              <div className="space-y-1">
                 <h2 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back!</h2>
                 <p className="text-slate-400 font-bold text-sm leading-relaxed">
                   You've learned <span className="text-slate-900 font-black">80%</span> of your goal this week!<br/> 
                   Keep it up and improve your results!
                 </p>
              </div>
            </div>
            <div className="text-right space-y-1">
               <div className="flex items-center gap-2 justify-end text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Thu, July 29, 2021</span>
                  <CloudSun className="w-4 h-4 text-orange-400" />
               </div>
               <p className="text-2xl font-black text-slate-900">10:48 AM</p>
            </div>
          </header>

          {/* Your Courses Section (Spaced Out) */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Your Courses</h3>
               <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search your missions..." className="bg-transparent border-none outline-none text-xs w-48 font-bold" />
               </div>
            </div>
            
            <div className="flex items-center gap-10 text-[10px] font-black text-slate-400 border-b border-slate-50 pb-4 uppercase tracking-[0.1em]">
               {['Drawing', 'Art History', 'Photography', 'Painting', 'Contemporary'].map(c => (
                 <span 
                  key={c} 
                  onClick={() => setActiveCourse(c)}
                  className={`cursor-pointer transition-all pb-4 border-b-4 ${activeCourse === c ? 'text-orange-500 border-orange-500' : 'border-transparent hover:text-slate-600'}`}
                 >
                   {c} I
                 </span>
               ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
               <CourseCard title="Space Review" hours="2 Hours" progress={20} icon={<Rocket className="w-5 h-5 text-red-500" />} color="bg-red-50" />
               <CourseCard title="Reflections" hours="3 Hours" progress={50} icon={<Sparkles className="w-5 h-5 text-purple-500" />} color="bg-purple-50" />
               <CourseCard title="Patterns" hours="2.5 Hours" progress={0} icon={<Award className="w-5 h-5 text-amber-500" />} color="bg-amber-50" status="Start" />
            </div>
          </section>

          {/* Academic Progress Chart (Full Width) */}
          <section className="bg-[#fffcf7] rounded-[40px] p-10 space-y-8 border border-[#fff5e6]">
             <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Academic Progress</h3>
                <div className="flex items-center gap-8">
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" /> Exams
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" /> Assignments
                   </div>
                   <select className="bg-white border border-slate-100 rounded-xl px-5 py-3 text-[10px] font-black text-slate-500 outline-none shadow-sm appearance-none">
                      <option>Monthly Progress</option>
                   </select>
                </div>
             </div>
             
             <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={PROGRESS_DATA}>
                      <defs>
                         <linearGradient id="colorExams" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                         </linearGradient>
                         <linearGradient id="colorAss" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fff0de" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Area type="monotone" dataKey="exams" stroke="#8b5cf6" strokeWidth={5} fillOpacity={1} fill="url(#colorExams)" />
                      <Area type="monotone" dataKey="assignments" stroke="#f59e0b" strokeWidth={5} fillOpacity={1} fill="url(#colorAss)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </section>
        </div>

        {/* Right Side: Stats Panel (30%) */}
        <div className="flex-1 w-80 space-y-12 shrink-0 border-l border-slate-50 pl-12">
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-base font-black text-slate-900">Claire A. McHaggen</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Student</p>
                </div>
                <div className="relative p-2 bg-slate-50 rounded-xl">
                   <Bell className="w-5 h-5 text-slate-400" />
                   <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                </div>
             </div>
          </div>

          <div className="space-y-10">
             <div className="text-center space-y-6 relative py-12 bg-slate-50/30 rounded-[40px] border border-slate-50">
                <div className="space-y-1">
                   <p className="text-lg font-black text-slate-900">Art (B.A)</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Until Dec 14, 2021</p>
                </div>
                
                <div className="relative flex-center">
                   <svg className="w-48 h-48 transform -rotate-90">
                      <circle cx="96" cy="96" r="85" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                      <circle cx="96" cy="96" r="85" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="534" strokeDashoffset={534 - (534 * 65) / 100} className="text-[#4c49ed]" strokeLinecap="round" />
                   </svg>
                   <div className="absolute flex flex-col items-center">
                      <span className="text-4xl font-black text-slate-900">65%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Semester I</span>
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">My Schedule</h4>
                <MiniCourseRow title="Drawing I" teacher="Kayla Williams" progress={80} credits="3 credits" />
                <MiniCourseRow title="Art History" teacher="Kevin Lee" progress={40} credits="3 credits" />
                <MiniCourseRow title="Photography 1" teacher="Krystal G." progress={65} credits="1 credit" active />
                <MiniCourseRow title="Painting I" teacher="Kayla Williams" progress={10} credits="1 credit" />
                <MiniCourseRow title="Contemporary Art" teacher="Mayra Wu" progress={90} credits="2 credits" />
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StudentSidebarItem = ({ icon, label, active, count }) => (
  <div className={`flex items-center justify-between px-6 py-4 rounded-[20px] cursor-pointer transition-all ${active ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/30' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
    <div className="flex items-center gap-4">
      {icon}
      <span className="text-sm font-black tracking-tight">{label}</span>
    </div>
    {count && <span className="bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex-center border-2 border-[#4c49ed]">{count}</span>}
  </div>
);

const CourseCard = ({ title, hours, progress, icon, color, status = "Continue" }) => (
  <div className="bg-white border border-slate-100 rounded-[40px] p-8 space-y-6 hover:shadow-2xl transition-all cursor-pointer group hover:-translate-y-2">
    <div className="flex items-center justify-between">
       <div className={`w-12 h-12 rounded-2xl flex-center ${color} shadow-sm group-hover:rotate-12 transition-transform`}>{icon}</div>
       <MoreVertical className="w-4 h-4 text-slate-300" />
    </div>
    <div className="space-y-1">
       <p className="text-lg font-black text-slate-900 tracking-tight">{title}</p>
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{hours} Duration</p>
    </div>
    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Master core concepts with our premium AI-native mission set.</p>
    <div className="space-y-3">
       <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>Progress</span>
          <span className="text-slate-900">{progress}%</span>
       </div>
       <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-50 shadow-inner">
          <div className="h-full bg-[#4c49ed] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
       </div>
    </div>
    <button className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${status === 'Start' ? 'bg-[#4c49ed] text-white border-[#4c49ed] shadow-lg shadow-[#4c49ed]/20' : 'border-slate-100 text-slate-600 hover:bg-slate-50'}`}>
       {status}
    </button>
  </div>
);

const MiniCourseRow = ({ title, teacher, progress, credits, active }) => (
  <div className={`p-5 rounded-[24px] flex items-center justify-between gap-4 transition-all border ${active ? 'bg-[#4c49ed] text-white shadow-2xl border-[#4c49ed]' : 'bg-white border-slate-50 hover:border-slate-200'}`}>
     <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex-center ${active ? 'bg-white/20' : 'bg-slate-50'}`}>
           <BookOpen className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} />
        </div>
        <div className="space-y-1">
           <p className={`text-xs font-black ${active ? 'text-white' : 'text-slate-900'}`}>{title}</p>
           <p className={`text-[10px] font-bold ${active ? 'text-white/60' : 'text-slate-400'}`}>Teacher: {teacher}</p>
        </div>
     </div>
     <div className="text-right">
        <p className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-white/60' : 'text-slate-400'}`}>{credits}</p>
        <div className={`h-1.5 w-16 mt-2 rounded-full overflow-hidden ${active ? 'bg-white/20' : 'bg-slate-50'}`}>
           <div className={`h-full ${active ? 'bg-white' : 'bg-orange-400'}`} style={{ width: `${progress}%` }} />
        </div>
     </div>
  </div>
);

// --- Landing Page (Unchanged) ---
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Ribbon Header */}
      <div className="pt-8">
        <nav className="ribbon-nav">
          <div className="ribbon-tail left" />
          <div className="ribbon-main">
             <div className="ribbon-segment">Home</div>
             <div className="ribbon-segment">Features</div>
             <div className="ribbon-segment">Grades</div>
             <div className="logo-box">HOMEWORKZONE</div>
             <div className="ribbon-segment">Mission</div>
             <div onClick={() => navigate('/login/teacher')} className="ribbon-segment">Teacher</div>
             <div onClick={() => navigate('/login/student')} className="ribbon-segment">Student</div>
          </div>
          <div className="ribbon-tail right" />
        </nav>
      </div>

      {/* Kiddy Hero */}
      <section className="kiddy-hero">
        <div className="container relative z-10">
           <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-left space-y-6">
                 <h1 className="text-6xl md:text-7xl text-white leading-[1] drop-shadow-lg">
                    Welcome to <br />
                    HomeworkZone!
                 </h1>
                 <p className="text-xl text-white font-bold max-w-md drop-shadow-md">
                    AI learning center for students. Grades 1-6.
                 </p>
                 <button 
                  onClick={() => navigate('/login/student')}
                  className="kiddy-btn bg-white text-kiddy-blue text-lg px-10 py-4 shadow-[0_6px_0_0_#e1f5fe]"
                 >
                   Enter Portal
                 </button>
              </div>
              <div className="flex-1">
                 <motion.img 
                  initial={{ rotate: -5, scale: 0.9 }}
                  animate={{ rotate: 5, scale: 1 }}
                  transition={{ repeat: Infinity, duration: 4, repeatType: 'reverse' }}
                  src="/kiddy_hero_kids.png" 
                  className="sticker-photo" 
                  alt="Happy Kids" 
                 />
              </div>
           </div>
        </div>
        
        {/* Scalloped Edge Divider */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px]">
            <path d="M0,0 C150,110 300,110 450,0 C600,110 750,110 900,0 C1050,110 1200,110 1350,0 V120 H0 Z" fill="#fffde7"></path>
          </svg>
        </div>
      </section>
    </div>
  );
};

// --- Mock Login Pages ---
const LoginPage = ({ role }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fffde7] flex-center p-6 relative overflow-hidden">
      <div className="ribbon-nav absolute top-0 w-full">
         <div className="logo-box">{role === 'teacher' ? 'TEACHER LOGIN' : 'STUDENT PORTAL'}</div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="kiddy-card max-w-md w-full p-12 space-y-10 border-none bg-white relative z-10"
      >
        <div className="text-center space-y-3">
          <p className="text-xs text-slate-400 uppercase font-black tracking-[0.25em]">
            {role === 'teacher' ? 'Manage your world' : 'Start your adventure'}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.1em] block text-left ml-2">Email Address</label>
            <input type="email" placeholder="name@school.com" className="w-full p-4 rounded-2xl border-4 border-slate-50 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.1em] block text-left ml-2">Password</label>
            <input type="password" placeholder="••••••••" className="w-full p-4 rounded-2xl border-4 border-slate-50 outline-none" />
          </div>
        </div>

        <button 
          onClick={() => navigate(role === 'teacher' ? '/dashboard/teacher' : '/dashboard/student')} 
          className="kiddy-btn w-full py-5 text-xl bg-[#5e5ce6] shadow-[0_8px_0_0_#4a48cc]"
        >
          Lets Go!
        </button>

        <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest">
           Secure School Link
        </p>
      </motion.div>
    </div>
  );
};

// --- App Router ---
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/teacher" element={<LoginPage role="teacher" />} />
        <Route path="/login/student" element={<LoginPage role="student" />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/quiz/sample" element={<StudentQuiz />} />
      </Routes>
    </Router>
  );
}
