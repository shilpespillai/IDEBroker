import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Bell, 
  ChevronDown,
  LayoutGrid,
  BookOpen,
  PieChart,
  Settings,
  MoreVertical,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import HomeworkGenerator from './HomeworkGenerator';
import TeacherAnalytics from './TeacherAnalytics';
import { useAI } from '../context/AIContext';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#f0f7ff] font-sans">
      {/* --- Top Navigation --- */}
      <nav className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-10 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-red-500" />
               <div className="w-2 h-2 rounded-full bg-orange-400" />
               <div className="w-2 h-2 rounded-full bg-yellow-400" />
               <div className="w-2 h-2 rounded-full bg-blue-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-8">
             <NavItem label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
             <NavItem label="Prepare" active={activeTab === 'prepare'} onClick={() => setActiveTab('prepare')} />
             <NavItem label="Teach" active={activeTab === 'teach'} onClick={() => setActiveTab('teach')} />
             <NavItem label="Assess" active={activeTab === 'assess'} onClick={() => setActiveTab('assess')} />
             <NavItem label="Monitor" active={activeTab === 'monitor'} onClick={() => setActiveTab('monitor')} />
          </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-all">
              <Search className="w-4 h-4" />
           </div>
           <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-all">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-red-500 -ml-3 mb-3 border-2 border-white" />
           </div>
           <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                 <img src="https://i.pravatar.cc/150?u=teacher" alt="Teacher" />
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
           </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="container mx-auto py-10 px-8 space-y-12 max-w-[1400px]">
        
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            {/* Header */}
            <div className="flex items-end justify-between">
               <div className="space-y-2">
                  <h1 className="text-4xl font-bold text-slate-800">Dashboard</h1>
                  <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                     <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                        <Users className="w-4 h-4" /> Class 6A <ChevronDown className="w-4 h-4" />
                     </span>
                     <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                           <img key={i} className="w-7 h-7 rounded-full border-2 border-white" src={`https://i.pravatar.cc/150?u=kid${i}`} alt="Kid" />
                        ))}
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex-center text-[10px] font-bold text-slate-500">+12</div>
                     </div>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-100 text-xs font-bold text-slate-500 shadow-sm">
                     <AlertCircle className="w-4 h-4 text-red-500" /> Alerts <span className="w-5 h-5 bg-red-500 text-white rounded-full flex-center text-[10px]">2</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-slate-400">
                     <LayoutGrid className="w-4 h-4" />
                  </div>
               </div>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               {/* Left Big Card: Overall Score */}
               <div className="lg:col-span-5 bg-white rounded-[32px] p-10 border border-slate-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
                  <div className="space-y-6 relative z-10">
                     <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Overall Class Score</p>
                        <p className="text-6xl font-black text-slate-800">68%</p>
                     </div>
                     <div className="text-xs font-bold text-slate-400">
                        Grade average: <span className="text-slate-800">72%</span>
                     </div>
                  </div>
                  <div className="relative z-10 space-y-6 text-right">
                     <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Work Assigned</p>
                        <p className="text-6xl font-black text-slate-800">36</p>
                     </div>
                     <div className="text-xs font-bold text-slate-400">
                        Class average: <span className="text-slate-800">28%</span>
                     </div>
                  </div>
                  {/* Illustrations */}
                  <div className="absolute top-1/2 left-1/3 -translate-y-1/2 opacity-20 group-hover:scale-110 transition-transform">
                     <Trophy className="w-40 h-40 text-emerald-500" strokeWidth={1} />
                  </div>
                  <div className="absolute top-1/2 right-1/4 -translate-y-1/2 opacity-10 group-hover:rotate-12 transition-transform">
                     <PieChart className="w-32 h-32 text-orange-400" strokeWidth={1} />
                  </div>
               </div>

               {/* Right Section: Proficiency Segments */}
               <div className="lg:col-span-7 grid grid-cols-3 gap-4">
                  <ProficiencyBlock count="5" label="20% of class" sub="grade avg: 72%" color="bg-[#99d750]" icon={<CheckCircle2 className="w-6 h-6 text-white/50" />} />
                  <ProficiencyBlock count="10" label="40% of class" sub="grade avg: 52%" color="bg-[#ffbd33]" icon={<TrendingUp className="w-6 h-6 text-white/50" />} />
                  <ProficiencyBlock count="5" label="20% of class" sub="grade avg: 22%" color="bg-[#ff8066]" icon={<AlertCircle className="w-6 h-6 text-white/50" />} />
               </div>
            </div>

            {/* Students Proficiency Section */}
            <div className="space-y-6 pt-10">
               <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800">Students Proficiency</h2>
                  <div className="flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                     <span className="flex items-center gap-2 cursor-pointer text-slate-600"><div className="w-3 h-3 rounded-full border-2 border-slate-400" /> Learning Objectives</span>
                     <span className="cursor-pointer">All Strands</span>
                  </div>
               </div>

               <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                     <div className="col-span-3">Full Name</div>
                     <div className="col-span-2 text-center">Work Completed</div>
                     <div className="col-span-3 text-center">Average Score</div>
                     <div className="col-span-1 text-center">Attention</div>
                     <div className="col-span-2 text-center">Working Towards</div>
                     <div className="col-span-1 text-center">Mastered</div>
                  </div>

                  {/* Table Rows */}
                  <div className="space-y-4">
                     <StudentRow name="Sabine Klein" completion="33/36" score={23} attention={45} working={8} mastered={7} theme="red" avatar="https://i.pravatar.cc/150?u=s" />
                     <StudentRow name="Dante Podenzana" completion="31/36" score={53} attention={6} working={35} mastered={19} theme="yellow" avatar="https://i.pravatar.cc/150?u=d" />
                     <StudentRow name="Susan Chan" completion="27/36" score={82} attention={2} working={14} mastered={45} theme="green" avatar="https://i.pravatar.cc/150?u=c" />
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'prepare' && <HomeworkGenerator />}
        {activeTab === 'assess' && <TeacherAnalytics />}
      </main>
    </div>
  );
}

const NavItem = ({ label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`px-4 h-16 flex items-center cursor-pointer font-bold text-sm transition-all border-b-2 ${
      active ? 'text-slate-800 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'
    }`}
  >
    {label}
  </div>
);

const ProficiencyBlock = ({ count, label, sub, color, icon }) => (
  <div className={`${color} rounded-[40px] p-8 flex flex-col justify-between text-white shadow-lg shadow-black/5 group cursor-pointer hover:scale-[1.02] transition-all`}>
     <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-full bg-white/20 flex-center overflow-hidden">
           <img src="https://i.pravatar.cc/150?u=student" alt="Group" className="opacity-80" />
        </div>
        {icon}
     </div>
     <div className="space-y-1">
        <p className="text-6xl font-black">{count}</p>
        <div>
           <p className="text-sm font-bold opacity-80">{label}</p>
           <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{sub}</p>
        </div>
     </div>
  </div>
);

const StudentRow = ({ name, completion, score, attention, working, mastered, theme, avatar }) => {
  const themes = {
    red: "bg-[#fff2f0]",
    yellow: "bg-[#fffdf2]",
    green: "bg-[#f2fcf0]"
  };
  const bars = {
    red: "bg-[#ff8066]",
    yellow: "bg-[#ffbd33]",
    green: "#99d750"
  };

  return (
    <div className={`${themes[theme]} rounded-2xl p-4 grid grid-cols-12 gap-4 items-center group cursor-pointer hover:shadow-md transition-all border border-transparent hover:border-slate-100`}>
       <div className="col-span-3 flex items-center gap-4">
          <img src={avatar} className="w-10 h-10 rounded-full" alt={name} />
          <span className="font-bold text-slate-700">{name}</span>
       </div>
       <div className="col-span-2 text-center font-bold text-slate-500">{completion}</div>
       <div className="col-span-3">
          <div className="bg-white rounded-lg h-10 flex items-center overflow-hidden border border-slate-100">
             <div className="h-full flex items-center justify-end pr-3 font-black text-slate-800" style={{ width: `${score}%`, backgroundColor: theme === 'green' ? '#99d750' : theme === 'yellow' ? '#ffbd33' : '#ff8066' }}>
                {score}%
             </div>
          </div>
       </div>
       <div className="col-span-1 flex-center">
          <div className="w-10 h-10 rounded-full bg-[#ff8066] text-white flex-center font-bold text-xs shadow-sm">{attention}</div>
       </div>
       <div className="col-span-2 flex-center">
          <div className="w-10 h-10 rounded-full bg-[#ffbd33] text-white flex-center font-bold text-xs shadow-sm">{working}</div>
       </div>
       <div className="col-span-1 flex-center">
          <div className={`rounded-full bg-[#99d750] text-white flex-center font-bold text-xs shadow-sm ${mastered > 40 ? 'w-14 h-14' : 'w-10 h-10'}`}>
            {mastered}
          </div>
       </div>
    </div>
  );
};

const TrendingUp = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);
