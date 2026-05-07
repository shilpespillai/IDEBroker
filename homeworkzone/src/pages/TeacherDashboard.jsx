import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Search, 
  Bell, 
  Heart, 
  ChevronDown, 
  ArrowRight,
  AlertCircle,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans pb-20">
      {/* --- Top Navigation --- */}
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
           <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
           </div>
        </div>

        <nav className="flex items-center gap-10">
          <NavLink label="Dashboard" active />
          <NavLink label="Prepare" />
          <NavLink label="Teach" />
          <NavLink label="Assess" />
          <NavLink label="Monitor" />
        </nav>

        <div className="flex items-center gap-6">
           <Heart className="w-5 h-5 text-slate-300 cursor-pointer hover:text-rose-500 transition-colors" />
           <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-slate-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white" />
           </div>
           <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=teacher" alt="Teacher" className="w-full h-full object-cover" />
           </div>
        </div>
      </header>

      {/* --- Dashboard Header --- */}
      <div className="px-10 py-10 flex items-center justify-between">
         <div className="flex items-center gap-6">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
               <span className="text-sm font-bold text-slate-600">Class A</span>
               <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-center -space-x-3 ml-4">
               {[1, 2, 3, 4, 5].map(i => (
                 <img key={i} src={`https://i.pravatar.cc/150?u=student${i}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="Student" />
               ))}
               <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-white flex-center shadow-sm cursor-pointer hover:bg-slate-100 transition-all">
                  <ArrowRight className="w-4 h-4 text-slate-400" />
               </div>
            </div>
         </div>

         <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-rose-500 bg-rose-50 px-4 py-2 rounded-full border border-rose-100 font-bold text-xs uppercase tracking-widest">
               <AlertCircle className="w-4 h-4" /> Alerts 0
            </div>
            <div className="p-2 text-slate-300 cursor-pointer hover:text-slate-600">
               <Settings className="w-5 h-5" />
            </div>
         </div>
      </div>

      {/* --- Primary KPI Grid --- */}
      <div className="px-10 grid grid-cols-12 gap-8">
         {/* Overall Score & Work Assigned */}
         <div className="col-span-6 grid grid-cols-2 gap-8">
            <KPICard title="Overall Class Score" value="68%" subtitle="Grade Average 72%" icon="/teacher_kpis.png" />
            <KPICard title="Work Assigned" value="36" subtitle="Grade Average 30%" icon="/teacher_kpis.png" isAlt />
         </div>

         {/* Class Split Blocks */}
         <div className="col-span-6 flex gap-4">
            <StatusBlock count="5" label="25% of class" avg="grade avg 75%" color="bg-[#94d82d]" />
            <StatusBlock count="10" label="50% of class" avg="grade avg 52%" color="bg-[#fab005]" active />
            <StatusBlock count="5" label="25% of class" avg="grade avg 75%" color="bg-[#ff8787]" />
         </div>
      </div>

      {/* --- Students Proficiency Section --- */}
      <div className="px-10 mt-16 space-y-8">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 tracking-tight italic">Students Proficiency</h3>
            <div className="flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <span className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"><div className="w-2 h-2 rounded-full border-2 border-slate-300" /> Learning Objectives</span>
               <span className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">All Strands <ChevronDown className="w-3 h-3" /></span>
            </div>
         </div>

         <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-6">
            <div className="grid grid-cols-12 px-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
               <div className="col-span-3">Full Name</div>
               <div className="col-span-2 text-center">Work Completed</div>
               <div className="col-span-3 text-center">Average Score</div>
               <div className="col-span-4 flex justify-around">
                  <span>Needing Attention</span>
                  <span>Working Towards</span>
                  <span>Mastered</span>
               </div>
            </div>

            <div className="space-y-4">
               <ProficiencyRow 
                 name="Sabine Klein" 
                 avatar="https://i.pravatar.cc/150?u=sabine" 
                 completed="33/36" 
                 score={23} 
                 attention={45} 
                 working={8} 
                 mastered={7} 
                 color="bg-rose-50"
               />
               <ProficiencyRow 
                 name="Dante Podenzana" 
                 avatar="https://i.pravatar.cc/150?u=dante" 
                 completed="31/36" 
                 score={53} 
                 attention={6} 
                 working={35} 
                 mastered={19} 
                 color="bg-amber-50"
               />
               <ProficiencyRow 
                 name="Susan Chan" 
                 avatar="https://i.pravatar.cc/150?u=susan" 
                 completed="27/36" 
                 score={82} 
                 attention={0} 
                 working={14} 
                 mastered={45} 
                 color="bg-emerald-50"
               />
            </div>
         </div>
      </div>
    </div>
  );
};

const NavLink = ({ label, active }) => (
  <span className={`text-sm font-bold cursor-pointer transition-all ${active ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
    {label}
  </span>
);

const KPICard = ({ title, value, subtitle, icon, isAlt }) => (
  <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all relative overflow-hidden h-52">
    <div className="space-y-2 relative z-10">
       <h4 className="text-sm font-black text-slate-900 tracking-tight">{title}</h4>
       <p className="text-5xl font-black text-slate-900 tracking-tighter">{value}</p>
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subtitle}</p>
    </div>
    <div className="w-28 h-28 relative">
       <div className={`absolute inset-0 overflow-hidden ${isAlt ? 'clip-path-custom-2' : 'clip-path-custom-1'}`}>
          <img src={icon} className={`w-full h-full object-cover transform scale-150 ${isAlt ? 'translate-x-4' : '-translate-x-14'}`} alt="KPI" />
       </div>
    </div>
  </div>
);

const StatusBlock = ({ count, label, avg, color, active }) => (
  <div className={`flex-1 ${color} rounded-[40px] p-8 text-white space-y-4 relative overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer ${active ? 'ring-4 ring-white/30' : ''}`}>
     <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex-center">
        <img src="https://i.pravatar.cc/150" className="w-8 h-8 rounded-full opacity-80" alt="Avatar" />
     </div>
     <div className="space-y-1">
        <p className="text-6xl font-black leading-none">{count}</p>
        <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{label}</p>
        <p className="text-[10px] font-black uppercase tracking-[0.2em]">{avg}</p>
     </div>
  </div>
);

const ProficiencyRow = ({ name, avatar, completed, score, attention, working, mastered, color }) => (
  <div className={`${color} rounded-[32px] p-6 grid grid-cols-12 items-center group hover:scale-[1.01] transition-all cursor-pointer border border-white shadow-sm`}>
     <div className="col-span-3 flex items-center gap-4">
        <img src={avatar} className="w-10 h-10 rounded-full border-2 border-white" alt={name} />
        <span className="text-sm font-black text-slate-800">{name}</span>
     </div>
     
     <div className="col-span-2 text-center text-sm font-bold text-slate-500">
        {completed}
     </div>

     <div className="col-span-3 flex-center px-10">
        <div className="w-full h-10 bg-white/50 rounded-full overflow-hidden flex items-center p-1 border border-white">
           <div className={`h-full rounded-full ${score > 70 ? 'bg-emerald-400' : score > 40 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${score}%` }} />
           <span className="ml-4 text-xs font-black text-slate-800">{score}%</span>
        </div>
     </div>

     <div className="col-span-4 flex items-center justify-around">
        <CircleIndicator value={attention} color="bg-rose-500" />
        <CircleIndicator value={working} color="bg-amber-400" />
        <CircleIndicator value={mastered} color="bg-emerald-500" isLarge />
     </div>
  </div>
);

const CircleIndicator = ({ value, color, isLarge }) => (
  <div className={`${color} ${isLarge ? 'w-14 h-14' : value > 20 ? 'w-12 h-12' : 'w-8 h-8'} rounded-full flex-center text-white text-xs font-black shadow-lg border-4 border-white/20 transform transition-transform group-hover:scale-110`}>
     {value}
  </div>
);

export default TeacherDashboard;
