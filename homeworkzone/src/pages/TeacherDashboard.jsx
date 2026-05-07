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
    <div className="flex min-h-screen bg-[#fffde7]">
      {/* --- Sidebar --- */}
      <aside className="w-72 bg-white border-r-4 border-slate-100 flex flex-col relative z-20 shadow-xl">
        <div className="ribbon-nav !h-24 !shadow-none !bg-kiddy-blue">
           <div className="logo-box !text-sm !p-2 !border-2 !shadow-sm !translate-y-0 font-black">HQ</div>
        </div>
        
        <div className="p-8 space-y-10">
          <nav className="flex-1 space-y-3">
            <SidebarItem 
              icon={<LayoutDashboard className="w-5 h-5" />} 
              label="Dashboard" 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')} 
            />
            <SidebarItem 
              icon={<PlusCircle className="w-5 h-5" />} 
              label="Generator" 
              active={activeTab === 'generate'} 
              onClick={() => setActiveTab('generate')} 
            />
            <SidebarItem 
              icon={<TrendingUp className="w-5 h-5" />} 
              label="Analytics" 
              active={activeTab === 'analytics'} 
              onClick={() => setActiveTab('analytics')} 
            />
            <SidebarItem 
              icon={<ClipboardList className="w-5 h-5" />} 
              label="Assignments" 
              active={activeTab === 'assignments'} 
              onClick={() => setActiveTab('assignments')} 
            />
            
            <div className="pt-6 mt-6 border-t-4 border-slate-50">
              <SidebarItem 
                icon={<BrainCircuit className="w-5 h-5 text-kiddy-blue" />} 
                label="AI Config" 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')} 
              />
            </div>
          </nav>

          <div className="p-5 bg-kiddy-blue/10 rounded-[24px] border-4 border-white shadow-sm">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 rounded-full bg-kiddy-blue animate-pulse" />
               <p className="text-[10px] font-black text-kiddy-blue uppercase tracking-widest">AI Engine Active</p>
            </div>
            <p className="text-xs text-slate-600 font-bold">GPT-4o Engine</p>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-24 bg-white px-10 flex items-center justify-between shrink-0 relative z-10 border-b-4 border-slate-50">
          <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-full w-[400px] border-2 border-slate-100">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search students..." className="bg-transparent border-none outline-none text-sm w-full font-bold" />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-3 bg-white rounded-2xl border-2 border-slate-100 text-slate-400 hover:text-kiddy-blue transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-4 border-white"></span>
            </button>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">Dr. Sarah Jenkins</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Head Teacher</p>
              </div>
              <div className="w-12 h-12 rounded-[18px] bg-white border-4 border-slate-50 shadow-sm overflow-hidden flex-center font-black text-kiddy-blue">
                SJ
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12 relative z-10">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight lowercase">morning, dr. jenkins!</h2>
                  <p className="text-lg text-slate-500 font-bold lowercase">Your class is performing <span className="text-kiddy-blue font-black">12% better</span> today.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setActiveTab('generate')} className="kiddy-btn px-8">
                    <PlusCircle className="w-5 h-5" /> new homework
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-8">
                <StatCard label="Students" value="28" icon={<Users className="w-6 h-6" />} color="text-kiddy-blue" />
                <StatCard label="Missions" value="12" icon={<ClipboardList className="w-6 h-6" />} color="text-kiddy-orange" />
                <StatCard label="Avg Score" value="84%" icon={<Star className="w-6 h-6" />} color="text-kiddy-green" />
                <StatCard label="Tokens" value="4.2k" icon={<BrainCircuit className="w-6 h-6" />} color="text-purple-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Active Assignments */}
                <section className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Live Missions</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <AssignmentRow title="Maths: Quadratic Fractions" grade="Grade 6" completions="24/28" status="Active" icon={<Rocket className="w-6 h-6" />} />
                    <AssignmentRow title="Science: Photosynthesis Lab" grade="Grade 4" completions="12/30" status="Draft" icon={<BrainCircuit className="w-6 h-6" />} />
                  </div>
                </section>

                {/* Top Performers Preview */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">Top Adventurers</h3>
                    <button onClick={() => setActiveTab('analytics')} className="text-xs font-black text-kiddy-blue hover:underline">View All</button>
                  </div>
                  <div className="kiddy-card !p-8 !rounded-[40px] space-y-6 !shadow-sm">
                     <TopStudent name="Jamie L." score="98%" progress="+5%" />
                     <TopStudent name="Sarah K." score="94%" progress="+2%" />
                     <TopStudent name="Marcus T." score="91%" progress="+1%" />
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
      <h2 className="text-4xl font-black text-slate-900 lowercase">AI Engine Control</h2>
      <div className="kiddy-card !p-10 !rounded-[40px] space-y-10 border-none !shadow-xl">
        <div className="space-y-4 text-left">
          <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-2">OpenAI Key</label>
          <input 
            type="password" 
            placeholder="sk-..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-5 rounded-[20px] border-4 border-slate-50 font-mono text-lg outline-none focus:border-kiddy-blue" 
          />
        </div>
        <div className="space-y-4 text-left">
          <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-2">Preferred Model</label>
          <select 
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-5 rounded-[20px] border-4 border-slate-50 font-black text-lg outline-none focus:border-kiddy-blue"
          >
            <option value="gpt-4o">GPT-4o (High precision)</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 px-6 py-4 rounded-[20px] cursor-pointer transition-all ${
      active 
        ? 'bg-kiddy-blue text-white font-black shadow-[0_6px_0_0_#0288d1] translate-y-[-2px]' 
        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {icon}
    <span className="text-md font-bold lowercase">{label}</span>
  </div>
);

const TopStudent = ({ name, score, progress }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-4">
       <div className="w-12 h-12 rounded-[18px] bg-slate-50 flex-center text-sm font-black group-hover:rotate-6 transition-all">{name[0]}</div>
       <span className="text-md font-black text-slate-700">{name}</span>
    </div>
    <div className="text-right">
       <p className="text-lg font-black text-slate-900">{score}</p>
       <p className="text-[10px] font-black text-emerald-500 lowercase">{progress}</p>
    </div>
  </div>
);

const StatCard = ({ label, value, icon, color }) => (
  <div className="kiddy-card !p-8 !rounded-[40px] !shadow-sm group">
    <div className={`w-14 h-14 flex-center rounded-[20px] bg-slate-50 mb-6 transition-all group-hover:rotate-12 ${color}`}>{icon}</div>
    <p className="text-4xl font-black text-slate-900 tracking-tight">{value}</p>
    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-2">{label}</p>
  </div>
);

const AssignmentRow = ({ title, grade, completions, status, icon }) => (
  <div className="kiddy-card !p-6 !rounded-[32px] flex items-center justify-between !shadow-sm">
    <div className="flex items-center gap-5">
      <div className="w-14 h-14 bg-slate-50 text-kiddy-blue flex-center rounded-[20px] border-2 border-white shadow-sm">
        {icon}
      </div>
      <div className="text-left">
        <p className="text-md font-black text-slate-900 lowercase">{title}</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{grade} · {status}</p>
      </div>
    </div>
    <div className="text-right font-black">
        <p className="text-lg">{completions}</p>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Students</p>
    </div>
  </div>
);
