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
  Rocket
} from 'lucide-react';
import { motion } from 'framer-motion';
import HomeworkGenerator from './HomeworkGenerator';
import TeacherAnalytics from './TeacherAnalytics';
import { useAI } from '../context/AIContext';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-[#f8f9fe]">
      {/* --- Sidebar --- */}
      <aside className="w-72 bg-white border-r-2 border-slate-100 flex flex-col p-8 space-y-10 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary flex-center rounded-[14px] text-white shadow-[0_5px_0_0_#6e48aa]">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter lowercase">homework<span className="text-primary">zone</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Dashboard" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <SidebarItem 
            icon={<PlusCircle className="w-5 h-5" />} 
            label="Generate Homework" 
            active={activeTab === 'generate'} 
            onClick={() => setActiveTab('generate')} 
          />
          <SidebarItem 
            icon={<TrendingUp className="w-5 h-5" />} 
            label="Analytics Hub" 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')} 
          />
          <SidebarItem 
            icon={<ClipboardList className="w-5 h-5" />} 
            label="Assignments" 
            active={activeTab === 'assignments'} 
            onClick={() => setActiveTab('assignments')} 
          />
          <SidebarItem 
            icon={<Users className="w-5 h-5" />} 
            label="Students" 
            active={activeTab === 'students'} 
            onClick={() => setActiveTab('students')} 
          />
          
          <div className="pt-6 mt-6 border-t-2 border-slate-50">
            <SidebarItem 
              icon={<BrainCircuit className="w-5 h-5 text-primary" />} 
              label="AI Configuration" 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
          </div>
        </nav>

        <div className="p-5 bg-primary/5 rounded-[24px] border-2 border-primary/10">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             <p className="text-[10px] font-black text-primary uppercase tracking-widest">AI Engine Active</p>
          </div>
          <p className="text-xs text-slate-600 font-bold">GPT-4o Legacy Key</p>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="blob-bg w-[600px] h-[600px] bg-primary/5 -top-64 -right-32" />
        
        {/* Header */}
        <header className="h-24 bg-transparent px-10 flex items-center justify-between shrink-0 relative z-10">
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full w-[400px] shadow-tactile border-2 border-slate-50">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search students or papers..." className="bg-transparent border-none outline-none text-sm w-full font-bold" />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-3 bg-white rounded-2xl shadow-tactile border-2 border-slate-50 text-slate-400 hover:text-primary transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-4 border-white"></span>
            </button>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-black text-slate-900 lowercase">Dr. Sarah Jenkins</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Head Teacher</p>
              </div>
              <div className="w-12 h-12 rounded-[18px] bg-white border-2 border-slate-100 shadow-bubble overflow-hidden flex-center font-black text-primary">
                SJ
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10 relative z-10">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight lowercase">morning, dr. jenkins!</h2>
                  <p className="text-md text-slate-500 font-bold lowercase">Your classroom is performing <span className="text-primary font-black">12% better</span> this week.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setActiveTab('analytics')} className="btn-bubble bg-white border-4 border-slate-100 text-slate-500 shadow-[0_6px_0_0_#f1f2f6] px-8">
                    <TrendingUp className="w-5 h-5" /> reports
                  </button>
                  <button onClick={() => setActiveTab('generate')} className="btn-bubble btn-primary px-8">
                    <PlusCircle className="w-5 h-5" /> new homework
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-8">
                <StatCard label="Students" value="28" icon={<Users className="w-5 h-5" />} color="bg-blue-50 text-blue-500" onClick={() => setActiveTab('students')} />
                <StatCard label="Papers" value="12" icon={<ClipboardList className="w-5 h-5" />} color="bg-emerald-50 text-emerald-500" onClick={() => setActiveTab('assignments')} />
                <StatCard label="Avg. Score" value="84%" icon={<Star className="w-5 h-5" />} color="bg-yellow-50 text-yellow-500" onClick={() => setActiveTab('analytics')} />
                <StatCard label="AI Tokens" value="4.2k" icon={<BrainCircuit className="w-5 h-5" />} color="bg-purple-50 text-primary" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Active Assignments */}
                <section className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Current Missions</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <AssignmentRow title="Maths: Quadratic Fractions" grade="Grade 6" completions="24/28" status="Active" color="maths" />
                    <AssignmentRow title="Science: Photosynthesis Lab" grade="Grade 4" completions="12/30" status="Draft" color="science" />
                    <AssignmentRow title="English: Shakespeare Intro" grade="Grade 5" completions="30/30" status="Completed" color="english" />
                  </div>
                </section>

                {/* Top Performers Preview */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Top Performers</h3>
                    <button onClick={() => setActiveTab('analytics')} className="text-xs font-black text-primary hover:underline lowercase">View All</button>
                  </div>
                  <div className="card-bubble space-y-6 bg-white border-none shadow-xl shadow-slate-200/40">
                     <TopStudent name="Jamie L." score="98%" progress="+5%" color="bg-yellow-100 text-yellow-600" />
                     <TopStudent name="Sarah K." score="94%" progress="+2%" color="bg-slate-100 text-slate-600" />
                     <TopStudent name="Marcus T." score="91%" progress="+1%" color="bg-orange-100 text-orange-600" />
                  </div>
                </section>
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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-12">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-primary/10 text-primary flex-center rounded-[24px] shadow-tactile border-2 border-primary/10">
          <BrainCircuit className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight lowercase">AI Engine Settings</h2>
          <p className="text-sm text-slate-500 uppercase font-black tracking-widest">Configure your own API keys</p>
        </div>
      </div>

      <div className="card-bubble space-y-10 border-none shadow-2xl shadow-slate-200/40">
        <div className="space-y-4">
          <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Select AI Provider</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-[24px] border-4 border-primary bg-primary/5 text-primary flex items-center justify-between">
              <span className="font-black">OpenAI (Recommended)</span>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="p-6 rounded-[24px] border-2 border-slate-100 text-slate-300 grayscale flex items-center justify-between cursor-not-allowed">
              <span className="font-black">Anthropic Claude</span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Soon</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-black uppercase text-slate-400 tracking-widest">OpenAI API Key</label>
          <input 
            type="password" 
            placeholder="sk-..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="input h-16 rounded-[20px] border-4 border-slate-50 font-mono text-lg" 
          />
          <p className="text-xs text-slate-400 font-bold">Your key is stored locally and never sent to our servers.</p>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Model Preference</label>
          <select 
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="input h-16 rounded-[20px] border-4 border-slate-50 font-black"
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

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 px-6 py-3.5 rounded-[20px] cursor-pointer transition-all ${
      active 
        ? 'bg-primary text-white font-black shadow-[0_6px_0_0_#6e48aa] translate-y-[-2px]' 
        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {icon}
    <span className="text-sm font-black lowercase">{label}</span>
  </div>
);

const TopStudent = ({ name, score, progress, color }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-4">
       <div className={`w-12 h-12 rounded-[18px] flex-center text-sm font-black group-hover:rotate-6 transition-all ${color}`}>{name[0]}</div>
       <span className="text-md font-black text-slate-700">{name}</span>
    </div>
    <div className="text-right">
       <p className="text-lg font-black text-slate-900">{score}</p>
       <p className="text-xs font-black text-emerald-500 lowercase">{progress} accuracy</p>
    </div>
  </div>
);

const StatCard = ({ label, value, icon, color, onClick }) => (
  <div 
    onClick={onClick}
    className={`card-bubble border-none shadow-xl shadow-slate-200/30 group relative overflow-hidden transition-all ${onClick ? 'cursor-pointer hover:translate-y-[-4px]' : ''}`}
  >
    <div className="flex items-center justify-between mb-6">
      <div className={`w-12 h-12 flex-center rounded-[18px] transition-all group-hover:rotate-12 ${color}`}>{icon}</div>
      <ArrowUpRight className="w-5 h-5 text-slate-200 group-hover:text-primary transition-colors" />
    </div>
    <p className="text-4xl font-black text-slate-900 tracking-tight">{value}</p>
    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-2">{label}</p>
  </div>
);

const AssignmentRow = ({ title, grade, completions, status, color }) => (
  <div className="card-bubble flex items-center justify-between py-6 bg-white border-none shadow-xl shadow-slate-200/30 hover:border-primary transition-all">
    <div className="flex items-center gap-5">
      <div className={`w-14 h-14 flex-center rounded-[20px] shadow-tactile text-white ${
        color === 'maths' ? 'bg-maths shadow-[0_5px_0_0_#d35400]' : 
        color === 'science' ? 'bg-science shadow-[0_5px_0_0_#1591a3]' : 'bg-english shadow-[0_5px_0_0_#b04c95]'
      }`}>
        {color === 'maths' ? <Rocket className="w-7 h-7" /> : color === 'science' ? <BrainCircuit className="w-7 h-7" /> : <BookOpen className="w-7 h-7" />}
      </div>
      <div>
        <p className="text-md font-black text-slate-900 lowercase">{title}</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{grade} · {status}</p>
      </div>
    </div>
    <div className="text-right">
        <p className="text-lg font-black text-slate-900">{completions}</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Students</p>
    </div>
  </div>
);

const CheckCircle2 = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);
