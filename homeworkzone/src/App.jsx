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
  CloudSun,
  Target,
  GraduationCap,
  HelpCircle,
  TrendingUp,
  BrainCircuit,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Star
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentQuiz from './pages/StudentQuiz';

// --- Chart Data ---
const SUBJECT_MASTERY = [
  { name: 'Maths', value: 40, color: '#4f46e5' },
  { name: 'Science', value: 30, color: '#3b82f6' },
  { name: 'English', value: 20, color: '#f59e0b' },
  { name: 'History', value: 10, color: '#10b981' },
];

const GRADE_GAUGE = [
  { name: 'Value', value: 85, color: '#3b82f6' },
  { name: 'Remaining', value: 15, color: '#f1f5f9' },
];

// --- Student Dashboard (Technical Breakdown Redesign) ---
const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] font-sans">
      {/* --- Sidebar (25% Width Rail) --- */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 sticky top-0 h-screen z-50">
        <div className="p-8 flex items-center gap-3">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex-center text-white">
              <GraduationCap className="w-5 h-5" />
           </div>
           <span className="text-xl font-black text-slate-900 tracking-tighter italic">HomeworkZone</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarItem icon={<Rocket className="w-4 h-4" />} label="My Missions" />
          <SidebarItem icon={<Library className="w-4 h-4" />} label="Resources" />
          <SidebarItem icon={<Award className="w-4 h-4" />} label="Achievements" />
          <SidebarItem icon={<MessageSquare className="w-4 h-4" />} label="Chat Hub" />
          <SidebarItem icon={<Settings className="w-4 h-4" />} label="Settings" />
        </nav>

        {/* Sidebar CTA Card (Technical Spec) */}
        <div className="p-6">
           <div className="bg-blue-600 rounded-2xl p-6 text-white space-y-4 shadow-xl shadow-blue-600/20 relative overflow-hidden">
              <div className="relative z-10">
                 <p className="text-sm font-bold">New Mission Pack</p>
                 <p className="text-[10px] opacity-70 leading-relaxed font-medium">Unlock the AI-powered Science adventure today!</p>
                 <button className="bg-white text-blue-600 w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest mt-4">Unlock Now</button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full" />
           </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-20 bg-white px-10 flex items-center justify-between shrink-0 border-b border-slate-100 sticky top-0 z-40">
          <div className="flex items-center gap-4 bg-slate-50 px-6 py-2.5 rounded-xl border border-slate-200 w-[450px]">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search missions, topics..." className="bg-transparent border-none outline-none text-xs w-full font-medium" />
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
               <button className="p-2 text-slate-400 hover:text-blue-600 transition-all relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-4 border-white" />
               </button>
               <button className="p-2 text-slate-400 hover:text-blue-600 transition-all"><HelpCircle className="w-5 h-5" /></button>
            </div>
            <div className="h-8 w-px bg-slate-100" />
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">Claire A. McHaggen</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Student</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-center shadow-sm">
                 <img src="/student_avatar.png" alt="Avatar" className="w-8 h-8" />
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-10 space-y-10 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1500px] mx-auto">
              
              {/* A. My Learning Statistics */}
              <DashboardCard title="Learning Statistics">
                 <div className="grid grid-cols-3 gap-6 pt-4">
                    <KPIMetric label="Missions Done" value="24" icon={<ClipboardList className="w-5 h-5" />} color="bg-blue-50 text-blue-600" />
                    <KPIMetric label="Strengths" value="3" icon={<Sparkles className="w-5 h-5" />} color="bg-purple-50 text-purple-600" />
                    <KPIMetric label="XP Earned" value="4.2k" icon={<Star className="w-5 h-5" />} color="bg-emerald-50 text-emerald-600" />
                 </div>
                 <div className="space-y-3 mt-10">
                    <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest">
                       <span>Weekly Goal Progress</span>
                       <span className="text-blue-600">80%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                       <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '80%' }} />
                    </div>
                 </div>
              </DashboardCard>

              {/* B. Subject Mastery */}
              <DashboardCard title="Subject Mastery">
                 <div className="flex gap-8 items-center h-[280px]">
                    <div className="w-48 h-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                             <Pie data={SUBJECT_MASTERY} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                                {SUBJECT_MASTERY.map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                             </Pie>
                             <Tooltip />
                          </PieChart>
                       </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-3">
                       {SUBJECT_MASTERY.map(item => (
                         <div key={item.name} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-all">
                            <div className="flex items-center gap-3">
                               <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                               <span className="text-xs font-bold text-slate-500">{item.name}</span>
                            </div>
                            <span className="text-xs font-black text-slate-900">{item.value}%</span>
                         </div>
                       ))}
                    </div>
                    <div className="w-[1px] h-32 bg-slate-100" />
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-full text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Top Missions</p>
                       <StatusRow label="Space Quiz" score="100%" color="text-emerald-500 bg-emerald-50" />
                       <StatusRow label="Fractions" score="92%" color="text-emerald-500 bg-emerald-50" />
                       <StatusRow label="Poetry" score="45%" color="text-orange-500 bg-orange-50" />
                    </div>
                 </div>
              </DashboardCard>

              {/* C. Mission Journal */}
              <DashboardCard title="Mission Journal">
                 <div className="grid grid-cols-2 gap-10 divide-x divide-slate-100">
                    <section className="space-y-6">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">To Do (Adventures)</h4>
                       <div className="space-y-4">
                          <MissionJournalRow name="Plant Cells" subject="Science" icon={<Rocket className="w-4 h-4" />} />
                          <MissionJournalRow name="Division 2" subject="Maths" icon={<Target className="w-4 h-4" />} />
                          <MissionJournalRow name="Solar System" subject="Science" icon={<CloudSun className="w-4 h-4" />} />
                       </div>
                    </section>
                    <section className="space-y-6 pl-10">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Completed (Mastered)</h4>
                       <div className="space-y-4">
                          <MissionJournalRow name="Subtraction" subject="Maths" completed icon={<CheckCircle2 className="w-4 h-4" />} />
                          <MissionJournalRow name="Verbs Lab" subject="English" completed icon={<Sparkles className="w-4 h-4" />} />
                          <MissionJournalRow name="Art Basics" subject="Creative" completed icon={<Award className="w-4 h-4" />} />
                       </div>
                    </section>
                 </div>
              </DashboardCard>

              {/* D. Academic Grade Summary */}
              <DashboardCard title="Achievement Summary">
                 <div className="flex flex-col h-full justify-between">
                    <div className="flex-1 flex flex-col items-center justify-center pt-8">
                       <div className="w-64 h-40 relative">
                          <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                                <Pie 
                                  data={GRADE_GAUGE} 
                                  startAngle={180} 
                                  endAngle={0} 
                                  innerRadius={70} 
                                  outerRadius={100} 
                                  paddingAngle={0} 
                                  dataKey="value"
                                >
                                   <Cell key="cell-0" fill="#3b82f6" />
                                   <Cell key="cell-1" fill="#f1f5f9" />
                                </Pie>
                             </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                             <p className="text-3xl font-black text-slate-900">85%</p>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">A- Grade</p>
                          </div>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                       <GridData label="Questions" value="1,240" percent="Total" />
                       <GridData label="Correct" value="1,080" percent="87%" />
                       <GridData label="Streak" value="12 Days" percent="Active" />
                       <GridData label="XP Boost" value="x1.5" percent="Active" />
                    </div>
                 </div>
              </DashboardCard>

            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all border-2 ${
      active 
        ? 'bg-blue-50 text-blue-600 border-blue-100 font-bold' 
        : 'text-slate-400 border-transparent hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {icon}
    <span className="text-sm tracking-tight">{label}</span>
  </div>
);

const DashboardCard = ({ title, children }) => (
  <section className="bg-white rounded-[24px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group flex flex-col h-full">
     <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{title}</h3>
        <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><MoreVertical className="w-4 h-4" /></button>
     </div>
     <div className="flex-1">
        {children}
     </div>
  </section>
);

const KPIMetric = ({ label, value, icon, color }) => (
  <div className="space-y-4 group">
     <div className={`w-12 h-12 rounded-2xl flex-center ${color} shadow-sm transition-transform group-hover:scale-110`}>
        {icon}
     </div>
     <div className="space-y-1">
        <p className="text-3xl font-black text-slate-900">{value}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
     </div>
  </div>
);

const StatusRow = ({ label, score, color }) => (
  <div className="flex items-center justify-between gap-4">
     <span className="text-[11px] font-bold text-slate-700">{label}</span>
     <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest ${color}`}>{score}</span>
  </div>
);

const MissionJournalRow = ({ name, subject, icon, completed }) => (
  <div className="flex items-center justify-between group hover:bg-slate-50 p-2 rounded-xl transition-all">
     <div className="flex items-center gap-4">
        <div className={`w-9 h-9 rounded-xl flex-center ${completed ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400'}`}>
           {icon}
        </div>
        <div>
           <p className="text-xs font-bold text-slate-800">{name}</p>
           <p className="text-[10px] font-medium text-slate-400">{subject}</p>
        </div>
     </div>
     <button className={`text-[10px] font-black uppercase tracking-widest border px-3 py-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${completed ? 'text-slate-400 border-slate-200' : 'text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white'}`}>
        {completed ? 'Review' : 'Play'}
     </button>
  </div>
);

const GridData = ({ label, value, percent }) => (
  <div className="text-center space-y-1">
     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
     <p className="text-xs font-black text-slate-900">{value}</p>
     <p className="text-[10px] font-bold text-blue-600">{percent}</p>
  </div>
);

// --- Landing Page ---
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
