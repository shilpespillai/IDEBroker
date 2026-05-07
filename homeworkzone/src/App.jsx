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
  Rocket
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

// --- Student Dashboard (Premium EdTech Style) ---
const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeCourse, setActiveCourse] = useState('Maths');

  return (
    <div className="flex min-h-screen bg-[#5e5ce6] font-sans overflow-hidden">
      {/* --- Sidebar --- */}
      <aside className="w-64 flex flex-col p-6 text-white space-y-10">
        <div className="text-3xl font-black tracking-tight mb-4">e-Class.</div>
        
        <nav className="flex-1 space-y-2">
          <StudentSidebarItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active />
          <StudentSidebarItem icon={<BookOpen className="w-5 h-5" />} label="Classes" />
          <StudentSidebarItem icon={<Library className="w-5 h-5" />} label="Resources" />
          <StudentSidebarItem icon={<ClipboardList className="w-5 h-5" />} label="Learning Plan" />
          <StudentSidebarItem icon={<MessageSquare className="w-5 h-5" />} label="Chat" count={5} />
          <StudentSidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" />
        </nav>

        <div className="bg-white/10 rounded-3xl p-6 space-y-4 relative overflow-hidden">
           <div className="relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex-center mb-4">
                 <Rocket className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-bold">Upgrade to Pro</p>
              <p className="text-[10px] text-white/60 mb-4">For more missions & AI tools!</p>
              <button className="bg-[#00c2ff] text-white w-full py-2 rounded-xl text-xs font-bold shadow-lg shadow-[#00c2ff]/30">Upgrade Now</button>
           </div>
        </div>

        <button onClick={() => navigate('/')} className="flex items-center gap-3 text-white/60 hover:text-white transition-all text-sm font-bold pl-4">
           <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 bg-white my-4 mr-4 rounded-[40px] p-10 overflow-y-auto flex gap-10 shadow-2xl relative z-10">
        <div className="flex-1 space-y-10">
          {/* Welcome Header */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-orange-50 rounded-full overflow-hidden flex-center shadow-inner">
                 <img src="/student_avatar.png" alt="Avatar" className="w-20 h-20" />
              </div>
              <div className="space-y-1">
                 <h2 className="text-4xl font-bold text-slate-800 tracking-tight">Welcome back!</h2>
                 <p className="text-slate-400 font-medium text-sm">You've learned <span className="text-slate-800 font-bold">80%</span> of your goal this week! <br/> Keep it up and improve your results!</p>
              </div>
            </div>
            <div className="text-right space-y-1">
               <div className="flex items-center gap-2 justify-end text-sm font-bold text-slate-400">
                  <span>Thu, July 29, 2021</span>
                  <Sun className="w-4 h-4 text-orange-400" />
               </div>
               <p className="text-2xl font-black text-slate-800">10:48 AM</p>
            </div>
          </header>

          {/* Your Courses Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-bold text-slate-800">Your Missions</h3>
               <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-xs w-32 font-bold" />
               </div>
            </div>
            
            <div className="flex items-center gap-8 text-xs font-bold text-slate-400 border-b border-slate-50 pb-2">
               {['Maths', 'English', 'Science', 'History', 'Art'].map(c => (
                 <span 
                  key={c} 
                  onClick={() => setActiveCourse(c)}
                  className={`cursor-pointer transition-all pb-2 border-b-2 ${activeCourse === c ? 'text-orange-500 border-orange-500' : 'border-transparent hover:text-slate-600'}`}
                 >
                   {c} I
                 </span>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <CourseCard title="Space Review" hours="2 Hours" progress={20} icon={<Rocket className="w-5 h-5 text-red-500" />} color="bg-red-50" />
               <CourseCard title="Reflections" hours="3 Hours" progress={50} icon={<Sparkles className="w-5 h-5 text-purple-500" />} color="bg-purple-50" />
               <CourseCard title="Patterns" hours="2.5 Hours" progress={0} icon={<Award className="w-5 h-5 text-amber-500" />} color="bg-amber-50" status="Start" />
            </div>
          </section>

          {/* Academic Progress Chart */}
          <section className="bg-[#fff9f2] rounded-3xl p-8 space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">Academic Progress</h3>
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <div className="w-2 h-2 rounded-full bg-purple-500" /> Exams
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <div className="w-2 h-2 rounded-full bg-orange-400" /> Assignments
                   </div>
                   <select className="bg-white border border-slate-100 rounded-lg px-4 py-2 text-xs font-bold text-slate-500 outline-none">
                      <option>Monthly Progress</option>
                   </select>
                </div>
             </div>
             
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={PROGRESS_DATA}>
                      <defs>
                         <linearGradient id="colorExams" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                         </linearGradient>
                         <linearGradient id="colorAss" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fef3e7" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="exams" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorExams)" />
                      <Area type="monotone" dataKey="assignments" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorAss)" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </section>
        </div>

        {/* Right Stats Panel */}
        <div className="w-72 space-y-10 shrink-0">
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-sm font-black text-slate-800">Claire A. McHaggen</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student</p>
                </div>
                <div className="relative">
                   <Bell className="w-5 h-5 text-slate-300" />
                   <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </div>
             </div>
          </div>

          <div className="space-y-6">
             <div className="text-center space-y-4 relative py-10 border-b border-slate-50">
                <p className="text-sm font-bold text-slate-400">Maths (B.A)<br/><span className="text-[10px] font-medium tracking-tight">Until Dec 14, 2021</span></p>
                <div className="relative flex-center">
                   <svg className="w-40 h-40 transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="440" strokeDashoffset={440 - (440 * 65) / 100} className="text-[#5e5ce6]" />
                   </svg>
                   <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-black text-slate-800">65%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Semester I</span>
                   </div>
                </div>
             </div>

             <div className="space-y-6 pt-4">
                <MiniCourseRow title="Drawing I" teacher="Kayla Williams" progress={80} credits="3 credits" />
                <MiniCourseRow title="Art History" teacher="Kevin Lee" progress={40} credits="3 credits" />
                <MiniCourseRow title="Maths I" teacher="Krystal G." progress={65} credits="1 credit" active />
                <MiniCourseRow title="Painting I" teacher="Kayla Williams" progress={10} credits="1 credit" />
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StudentSidebarItem = ({ icon, label, active, count }) => (
  <div className={`flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all ${active ? 'bg-[#ff9500] text-white shadow-lg shadow-[#ff9500]/30' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
    <div className="flex items-center gap-4">
      {icon}
      <span className="text-sm font-bold">{label}</span>
    </div>
    {count && <span className="bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex-center">{count}</span>}
  </div>
);

const CourseCard = ({ title, hours, progress, icon, color, status = "Continue" }) => (
  <div className="bg-white border border-slate-100 rounded-[32px] p-6 space-y-6 hover:shadow-xl transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
       <div className={`w-10 h-10 rounded-xl flex-center ${color}`}>{icon}</div>
       <div>
          <p className="text-sm font-bold text-slate-800 tracking-tight">{title}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{hours}</p>
       </div>
    </div>
    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Master the core concepts of this subject with AI-native missions.</p>
    <div className="space-y-2">
       <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>Progress</span>
          <span>{progress}%</span>
       </div>
       <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-50 shadow-inner">
          <div className="h-full bg-[#5e5ce6] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
       </div>
    </div>
    <button className={`w-full py-3 rounded-xl text-xs font-bold transition-all border-2 ${status === 'Start' ? 'bg-[#5e5ce6] text-white border-[#5e5ce6] shadow-lg shadow-[#5e5ce6]/20' : 'border-slate-100 text-slate-600 hover:bg-slate-50'}`}>
       {status}
    </button>
  </div>
);

const MiniCourseRow = ({ title, teacher, progress, credits, active }) => (
  <div className={`p-4 rounded-2xl flex items-center justify-between gap-4 transition-all ${active ? 'bg-[#5e5ce6] text-white shadow-xl shadow-[#5e5ce6]/30' : 'hover:bg-slate-50'}`}>
     <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex-center ${active ? 'bg-white/20' : 'bg-slate-100'}`}>
           <BookOpen className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
        </div>
        <div className="space-y-0.5">
           <p className={`text-[11px] font-black ${active ? 'text-white' : 'text-slate-800'}`}>{title}</p>
           <p className={`text-[9px] font-bold ${active ? 'text-white/60' : 'text-slate-400'}`}>Teacher: {teacher}</p>
        </div>
     </div>
     <div className="text-right">
        <p className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-white/60' : 'text-slate-400'}`}>{credits}</p>
        <div className={`h-1 w-16 mt-1 rounded-full overflow-hidden ${active ? 'bg-white/20' : 'bg-slate-100'}`}>
           <div className={`h-full ${active ? 'bg-white' : 'bg-orange-500'}`} style={{ width: `${progress}%` }} />
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
