import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  ClipboardList, 
  Settings, 
  Bell, 
  Search,
  ArrowUpRight,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  Star,
  Rocket,
  ChevronDown,
  MoreVertical,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  PieChart as PieIcon,
  ChevronRight,
  Target
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';
import HomeworkGenerator from './HomeworkGenerator';
import TeacherAnalytics from './TeacherAnalytics';
import { useAI } from '../context/AIContext';

// --- Chart Data ---
const PROFICIENCY_DATA = [
  { name: 'Advanced', value: 30, color: '#4f46e5' },
  { name: 'Intermediate', value: 40, color: '#3b82f6' },
  { name: 'Basic', value: 20, color: '#f59e0b' },
  { name: 'Proficient', value: 10, color: '#10b981' },
];

const GAUGE_DATA = [
  { name: 'Value', value: 60, color: '#3b82f6' },
  { name: 'Remaining', value: 40, color: '#f1f5f9' },
];

export default function TeacherDashboard() {
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
          <SidebarItem icon={<PlusCircle className="w-4 h-4" />} label="Create Homework" active={activeTab === 'generate'} onClick={() => setActiveTab('generate')} />
          <SidebarItem icon={<Users className="w-4 h-4" />} label="Students" />
          <SidebarItem icon={<ClipboardList className="w-4 h-4" />} label="Assignments" />
          <SidebarItem icon={<TrendingUp className="w-4 h-4" />} label="Analytics" />
          <SidebarItem icon={<Settings className="w-4 h-4" />} label="Settings" />
        </nav>

        {/* Sidebar CTA Card */}
        <div className="p-6">
           <div className="bg-blue-600 rounded-2xl p-6 text-white space-y-4 shadow-xl shadow-blue-600/20 relative overflow-hidden">
              <div className="relative z-10">
                 <p className="text-sm font-bold">New Version Available</p>
                 <p className="text-[10px] opacity-70 leading-relaxed font-medium">Check out the new AI grading engine in the dashboard.</p>
                 <button className="bg-white text-blue-600 w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest mt-4">Update Now</button>
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
            <input type="text" placeholder="Search class records, students..." className="bg-transparent border-none outline-none text-xs w-full font-medium" />
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
                <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">Dr. Sarah Jenkins</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Head Teacher</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-center font-bold text-blue-600 shadow-sm">
                SJ
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-10 space-y-10 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1500px] mx-auto">
              
              {/* A. Class Statistics */}
              <DashboardCard title="Class Statistics">
                 <div className="grid grid-cols-3 gap-6 pt-4">
                    <KPIMetric label="Total Students" value="28" icon={<Users className="w-5 h-5" />} color="bg-blue-50 text-blue-600" />
                    <KPIMetric label="Struggling" value="5" icon={<AlertCircle className="w-5 h-5" />} color="bg-orange-50 text-orange-600" />
                    <KPIMetric label="Excelling" value="8" icon={<CheckCircle2 className="w-5 h-5" />} color="bg-emerald-50 text-emerald-600" />
                 </div>
                 <div className="space-y-3 mt-10">
                    <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-widest">
                       <span>Class Progress</span>
                       <span className="text-blue-600">30%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                       <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '30%' }} />
                    </div>
                 </div>
              </DashboardCard>

              {/* B. Overall Class Performance */}
              <DashboardCard title="Overall Class Performance">
                 <div className="flex gap-8 items-center h-[280px]">
                    <div className="w-48 h-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                             <Pie data={PROFICIENCY_DATA} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                                {PROFICIENCY_DATA.map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                             </Pie>
                             <Tooltip />
                          </PieChart>
                       </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-3">
                       {PROFICIENCY_DATA.map(item => (
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
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-full">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Top Students</p>
                       <StudentMiniRow name="Jamie L." status="Ahead" color="text-blue-500 bg-blue-50" />
                       <StudentMiniRow name="Sarah K." status="Ahead" color="text-blue-500 bg-blue-50" />
                       <StudentMiniRow name="Marcus T." status="Lagging" color="text-orange-500 bg-orange-50" />
                    </div>
                 </div>
              </DashboardCard>

              {/* C. Struggling & Excelling */}
              <DashboardCard title="Struggling & Excelling">
                 <div className="grid grid-cols-2 gap-10 divide-x divide-slate-100">
                    <section className="space-y-6">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Bottom 3 (Intervention)</h4>
                       <div className="space-y-4">
                          <InterventionRow name="Marcus T." subject="Physics, Maths" avatar="https://i.pravatar.cc/150?u=m" />
                          <InterventionRow name="Elena V." subject="Chemistry" avatar="https://i.pravatar.cc/150?u=e" />
                          <InterventionRow name="Dante P." subject="History" avatar="https://i.pravatar.cc/150?u=d" />
                       </div>
                    </section>
                    <section className="space-y-6 pl-10">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Top 3 (Leading)</h4>
                       <div className="space-y-4">
                          <InterventionRow name="Jamie L." subject="All Subjects" avatar="https://i.pravatar.cc/150?u=j" />
                          <InterventionRow name="Sarah K." subject="Maths, Bio" avatar="https://i.pravatar.cc/150?u=s" />
                          <InterventionRow name="Sabine K." subject="Literature" avatar="https://i.pravatar.cc/150?u=sa" />
                       </div>
                    </section>
                 </div>
              </DashboardCard>

              {/* D. Performance Summary */}
              <DashboardCard title="Performance Summary">
                 <div className="flex flex-col h-full justify-between">
                    <div className="flex-1 flex flex-col items-center justify-center pt-8">
                       <div className="w-64 h-40 relative">
                          <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                                <Pie 
                                  data={GAUGE_DATA} 
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
                             <p className="text-3xl font-black text-slate-900">60%</p>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Proficient</p>
                          </div>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                       <GridData label="Advanced" value="20 Students" percent="20%" />
                       <GridData label="Proficient" value="45 Students" percent="45%" />
                       <GridData label="Basic" value="15 Students" percent="15%" />
                       <GridData label="Below" value="20 Students" percent="20%" />
                    </div>
                 </div>
              </DashboardCard>

            </div>
          )}

          {activeTab === 'generate' && <HomeworkGenerator />}
          {activeTab === 'analytics' && <TeacherAnalytics />}
        </div>
      </main>
    </div>
  );
}

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

const StudentMiniRow = ({ name, status, color }) => (
  <div className="flex items-center justify-between gap-4">
     <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-lg bg-slate-100 text-[10px] font-black flex-center">{name[0]}</div>
        <span className="text-[11px] font-bold text-slate-700">{name}</span>
     </div>
     <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest ${color}`}>{status}</span>
  </div>
);

const InterventionRow = ({ name, subject, avatar }) => (
  <div className="flex items-center justify-between group hover:bg-slate-50 p-2 rounded-xl transition-all">
     <div className="flex items-center gap-4">
        <img src={avatar} className="w-9 h-9 rounded-xl border border-slate-100" alt={name} />
        <div>
           <p className="text-xs font-bold text-slate-800">{name}</p>
           <p className="text-[10px] font-medium text-slate-400">{subject}</p>
        </div>
     </div>
     <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100">View</button>
  </div>
);

const GridData = ({ label, value, percent }) => (
  <div className="text-center space-y-1">
     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
     <p className="text-xs font-black text-slate-900">{value}</p>
     <p className="text-[10px] font-bold text-blue-600">{percent}</p>
  </div>
);
