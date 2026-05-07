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
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import HomeworkGenerator from './HomeworkGenerator';
import TeacherAnalytics from './TeacherAnalytics';
import { useAI } from '../context/AIContext';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans">
      {/* --- Sidebar (Institutional Slate) --- */}
      <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col relative z-20 shadow-2xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex-center text-white">
              <GraduationCap className="w-5 h-5" />
           </div>
           <span className="text-lg font-bold text-white tracking-tight">HomeworkZone</span>
        </div>
        
        <div className="p-4 flex-1">
          <nav className="space-y-1">
            <SidebarItem 
              icon={<LayoutDashboard className="w-4 h-4" />} 
              label="Dashboard" 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')} 
            />
            <SidebarItem 
              icon={<PlusCircle className="w-4 h-4" />} 
              label="Generator" 
              active={activeTab === 'generate'} 
              onClick={() => setActiveTab('generate')} 
            />
            <SidebarItem 
              icon={<TrendingUp className="w-4 h-4" />} 
              label="Analytics" 
              active={activeTab === 'analytics'} 
              onClick={() => setActiveTab('analytics')} 
            />
            <SidebarItem 
              icon={<ClipboardList className="w-4 h-4" />} 
              label="Assignments" 
              active={activeTab === 'assignments'} 
              onClick={() => setActiveTab('assignments')} 
            />
            <SidebarItem 
              icon={<Users className="w-4 h-4" />} 
              label="Student List" 
              active={activeTab === 'students'} 
              onClick={() => setActiveTab('students')} 
            />
          </nav>

          <div className="mt-8 pt-8 border-t border-slate-800">
            <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">System</p>
            <SidebarItem 
              icon={<BrainCircuit className="w-4 h-4" />} 
              label="AI Configuration" 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
            <SidebarItem 
              icon={<Settings className="w-4 h-4" />} 
              label="Workspace Settings" 
              active={activeTab === 'workspace'} 
              onClick={() => setActiveTab('workspace')} 
            />
          </div>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase">Sovereign AI Active</span>
             </div>
             <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Engine: GPT-4o Legacy<br/>Region: Australia South</p>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white px-8 flex items-center justify-between shrink-0 relative z-10 border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg w-[400px] border border-slate-200">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search student records, assignments..." className="bg-transparent border-none outline-none text-xs w-full font-medium text-slate-600" />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Bell className="w-5 h-5" /></button>
               <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Settings className="w-5 h-5" /></button>
            </div>
            <div className="h-8 w-px bg-slate-200 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">Dr. Sarah Jenkins</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Head of Science</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-center font-bold text-blue-600">
                SJ
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-[1400px] mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Classroom Overview</h2>
                  <p className="text-sm text-slate-500 font-medium">Class 6B performance metrics for May 2026</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setActiveTab('generate')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
                    <PlusCircle className="w-4 h-4" /> Generate Homework
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard label="Active Students" value="28" change="+4" trend="up" icon={<Users className="w-5 h-5" />} />
                <MetricCard label="Assignments" value="12" change="+2" trend="up" icon={<ClipboardList className="w-5 h-5" />} />
                <MetricCard label="Avg. Score" value="84%" change="-2%" trend="down" icon={<Star className="w-5 h-5" />} />
                <MetricCard label="Completion Rate" value="92%" change="+5%" trend="up" icon={<CheckCircle2 className="w-5 h-5" />} />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Active Assignments List */}
                <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Active Assignments</h3>
                    <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <AssignmentRow title="Maths: Quadratic Fractions" grade="Grade 6" completions="24/28" status="Active" date="Due tomorrow" />
                    <AssignmentRow title="Science: Photosynthesis Lab" grade="Grade 4" completions="12/30" status="Draft" date="Created 2d ago" />
                    <AssignmentRow title="English: Poetry Analysis" grade="Grade 5" completions="30/30" status="Completed" date="Completed" />
                  </div>
                </div>

                {/* Performance Analytics Preview */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Student Velocity</h3>
                  <div className="space-y-6">
                     <StudentRank name="Jamie L." score="98%" trend="+5%" color="bg-emerald-500" />
                     <StudentRank name="Sarah K." score="94%" trend="+2%" color="bg-blue-500" />
                     <StudentRank name="Marcus T." score="91%" trend="-1%" color="bg-amber-500" />
                     <StudentRank name="Elena V." score="88%" trend="+4%" color="bg-slate-400" />
                  </div>
                  <button onClick={() => setActiveTab('analytics')} className="w-full py-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all flex-center gap-2">
                    Open Analytics Hub <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'generate' && <HomeworkGenerator />}
          {activeTab === 'analytics' && <TeacherAnalytics />}
          {activeTab === 'settings' && <AISettings />}
        </div>
      </main>
    </div>
  );
}

const AISettings = () => {
  const { apiKey, setApiKey, model, setModel } = useAI();
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">AI Engine Configuration</h2>
        <p className="text-sm text-slate-500 font-medium">Manage your sovereign AI keys and engine preferences</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Provider</label>
            <div className="p-4 bg-slate-50 border-2 border-blue-600 rounded-xl flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">OpenAI</span>
              <div className="w-5 h-5 bg-blue-600 rounded-full flex-center text-white"><CheckCircle2 className="w-3 h-3" /></div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Model Engine</label>
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="gpt-4o">GPT-4o (Standard)</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">API Endpoint Key</label>
          <input 
            type="password" 
            placeholder="sk-..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
          />
          <p className="text-[10px] text-slate-400 font-medium italic">Keys are encrypted and stored in your browser's private storage context.</p>
        </div>
        
        <div className="pt-6 border-t border-slate-100 flex justify-end">
           <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20">Save Configuration</button>
        </div>
      </div>
    </motion.div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
      active 
        ? 'bg-blue-600/10 text-blue-500 font-bold' 
        : 'hover:bg-slate-800/50 hover:text-white'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const MetricCard = ({ label, value, change, trend, icon }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group hover:border-blue-200 transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-lg flex-center group-hover:text-blue-500 transition-colors">{icon}</div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {change} {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3 rotate-90" />}
      </div>
    </div>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
    <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest">{label}</p>
  </div>
);

const AssignmentRow = ({ title, grade, completions, status, date }) => (
  <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all group cursor-pointer">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg flex-center border border-slate-200 ${
        status === 'Active' ? 'bg-blue-50 text-blue-600' : 
        status === 'Draft' ? 'bg-slate-50 text-slate-400' : 'bg-emerald-50 text-emerald-600'
      }`}>
        <ClipboardList className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">{grade}</span>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
             <Clock className="w-3 h-3" /> {date}
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-12">
      <div className="text-right">
        <p className="text-sm font-bold text-slate-900">{completions}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</p>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500" />
    </div>
  </div>
);

const StudentRank = ({ name, score, trend, color }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
       <div className={`w-2 h-8 rounded-full ${color}`} />
       <div>
         <p className="text-sm font-bold text-slate-800">{name}</p>
         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Velocity {trend}</p>
       </div>
    </div>
    <div className="text-right">
       <p className="text-sm font-bold text-slate-900">{score}</p>
    </div>
  </div>
);
