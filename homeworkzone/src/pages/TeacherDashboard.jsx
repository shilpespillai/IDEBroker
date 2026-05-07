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
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import HomeworkGenerator from './HomeworkGenerator';
import { useAI } from '../context/AIContext';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary flex-center rounded-lg text-white shadow-md">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-lg font-black tracking-tighter">Homework<span className="text-primary">Zone</span></span>
        </div>

        <nav className="flex-1 space-y-1">
          <SidebarItem 
            icon={<LayoutDashboard className="w-4 h-4" />} 
            label="Dashboard" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <SidebarItem 
            icon={<PlusCircle className="w-4 h-4" />} 
            label="Generate Homework" 
            active={activeTab === 'generate'} 
            onClick={() => setActiveTab('generate')} 
          />
          <SidebarItem 
            icon={<ClipboardList className="w-4 h-4" />} 
            label="Assignments" 
            active={activeTab === 'assignments'} 
            onClick={() => setActiveTab('assignments')} 
          />
          <SidebarItem 
            icon={<Users className="w-4 h-4" />} 
            label="Students" 
            active={activeTab === 'students'} 
            onClick={() => setActiveTab('students')} 
          />
          <div className="pt-4 mt-4 border-t border-slate-100">
            <SidebarItem 
              icon={<BrainCircuit className="w-4 h-4 text-primary" />} 
              label="AI Configuration" 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
          </div>
        </nav>

        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-1">AI Engine Active</p>
          <p className="text-xs text-blue-600 font-medium">Using GPT-4o Legacy Key</p>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-xl w-96 border border-slate-200/60">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search students or papers..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-6 bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-black text-slate-900">Dr. Sarah Jenkins</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Head Teacher</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm"></div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Morning, Dr. Jenkins</h2>
                  <p className="text-sm text-slate-500">Your classroom is performing <span className="text-accent font-bold">12% better</span> this week.</p>
                </div>
                <button onClick={() => setActiveTab('generate')} className="btn btn-primary h-10 gap-2">
                  <PlusCircle className="w-4 h-4" /> New Homework
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-6">
                <StatCard label="Total Students" value="28" icon={<Users className="w-4 h-4" />} />
                <StatCard label="Active Papers" value="12" icon={<ClipboardList className="w-4 h-4" />} />
                <StatCard label="Avg. Score" value="84%" icon={<TrendingUp className="w-4 h-4 text-accent" />} />
                <StatCard label="AI Tokens Used" value="4.2k" icon={<BrainCircuit className="w-4 h-4 text-primary" />} />
              </div>

              {/* Active Assignments */}
              <section className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Current Assignments</h3>
                <div className="grid grid-cols-1 gap-4">
                  <AssignmentRow title="Maths: Quadratic Fractions" grade="Grade 6" completions="24/28" status="Active" />
                  <AssignmentRow title="Science: Photosynthesis Lab" grade="Grade 4" completions="12/30" status="Draft" />
                  <AssignmentRow title="English: Shakespeare Intro" grade="Grade 5" completions="30/30" status="Completed" />
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'generate' && <HomeworkGenerator />}
          
          {activeTab === 'settings' && <AISettings />}
        </div>
      </main>
    </div>
  );
}

const AISettings = () => {
  const { apiKey, setApiKey, model, setModel } = useAI();
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-50 text-primary flex-center rounded-2xl shadow-sm">
          <BrainCircuit className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI Engine Settings</h2>
          <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">Configure your own API keys for homework generation</p>
        </div>
      </div>

      <div className="card space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select AI Provider</label>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-4 rounded-xl border-primary bg-blue-50 text-primary flex items-center justify-between">
              <span className="font-bold">OpenAI (Recommended)</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-xl border border-slate-100 text-slate-400 grayscale flex items-center justify-between cursor-not-allowed">
              <span className="font-bold">Anthropic Claude</span>
              <span className="text-[8px] font-black uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">Coming Soon</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">OpenAI API Key</label>
          <input 
            type="password" 
            placeholder="sk-..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="input font-mono" 
          />
          <p className="text-[10px] text-slate-400">Your key is stored locally and never sent to our servers.</p>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Model Preference</label>
          <select 
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="input font-bold"
          >
            <option value="gpt-4o">GPT-4o (High Precision)</option>
            <option value="gpt-4-turbo">GPT-4 Turbo (Balanced)</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast/Cheap)</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

const CheckCircle2 = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
      active 
        ? 'bg-blue-50 text-primary font-bold shadow-sm shadow-blue-100/50' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

const StatCard = ({ label, value, icon }) => (
  <div className="card">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-400">{icon}</div>
      <ArrowUpRight className="w-4 h-4 text-slate-300" />
    </div>
    <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{label}</p>
  </div>
);

const AssignmentRow = ({ title, grade, completions, status }) => (
  <div className="card flex items-center justify-between py-4 hover:border-slate-300 transition-all">
    <div className="flex items-center gap-4">
      <div className={`w-2 h-2 rounded-full ${
        status === 'Active' ? 'bg-emerald-500 animate-pulse' : 
        status === 'Draft' ? 'bg-slate-300' : 'bg-primary'
      }`}></div>
      <div>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{grade}</p>
      </div>
    </div>
    <div className="flex items-center gap-8">
      <div className="text-right">
        <p className="text-sm font-bold text-slate-900">{completions}</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Completed</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
        status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
        status === 'Draft' ? 'bg-slate-100 text-slate-600' : 'bg-blue-50 text-primary'
      }`}>
        {status}
      </div>
    </div>
  </div>
);
