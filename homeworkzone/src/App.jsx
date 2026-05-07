import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  ArrowRight, 
  UserCheck, 
  ShieldCheck, 
  Globe,
  Star,
  Sparkles,
  Rocket,
  BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentQuiz from './pages/StudentQuiz';

// --- Student Dashboard ---
const StudentDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f8f9fe] p-8 md:p-12 relative overflow-hidden">
      <div className="blob-bg w-[500px] h-[500px] bg-science/20 -top-64 -right-32" />
      
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-[24px] flex-center shadow-bubble border-2 border-slate-50">
              <UserCheck className="w-8 h-8 text-science" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight lowercase">welcome back, jamie!</h2>
              <p className="text-sm text-slate-500 font-bold lowercase">You have <span className="text-science font-black">1 homework task</span> waiting for you!</p>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-white border-4 border-white shadow-bubble overflow-hidden">
             <div className="w-full h-full bg-slate-200" />
          </div>
        </header>

        <section className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">your active mission</h3>
          <div className="card-bubble flex flex-col md:flex-row items-center justify-between p-8 bg-white group border-none shadow-2xl shadow-slate-200/40">
            <div className="flex items-center gap-8 mb-6 md:mb-0">
              <div className="w-20 h-20 bg-maths text-white flex-center rounded-[32px] shadow-[0_8px_0_0_#d35400] group-hover:rotate-6 transition-all">
                <Rocket className="w-10 h-10" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 lowercase">addition & subtraction mastery</p>
                <p className="text-sm font-black uppercase tracking-widest text-maths mt-1">Maths · Grade 3 · Assigned by Dr. Jenkins</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/quiz/sample')}
              className="btn-bubble btn-maths px-10 h-14 text-lg"
            >
              start mission! <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-bubble p-6 bg-white border-none shadow-xl">
             <Star className="w-8 h-8 text-yellow-400 mb-4 fill-yellow-400" />
             <p className="text-2xl font-black text-slate-900">12</p>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stars Earned</p>
          </div>
          <div className="card-bubble p-6 bg-white border-none shadow-xl">
             <Award className="w-8 h-8 text-primary mb-4" />
             <p className="text-2xl font-black text-slate-900">Gold</p>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Rank</p>
          </div>
          <div className="card-bubble p-6 bg-white border-none shadow-xl">
             <CheckCircle2 className="w-8 h-8 text-accent mb-4" />
             <p className="text-2xl font-black text-slate-900">85%</p>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg. Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Landing Page ---
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="blob-bg w-[800px] h-[800px] bg-primary/10 -top-96 -left-32" />
      <div className="blob-bg w-[600px] h-[600px] bg-science/10 -bottom-32 -right-32" />

      {/* Navbar */}
      <nav className="container flex items-center justify-between h-24 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary flex-center rounded-[18px] text-white shadow-[0_5px_0_0_#6e48aa]">
            <BookOpen className="w-7 h-7" />
          </div>
          <span className="text-2xl font-black tracking-tighter lowercase">homework<span className="text-primary">zone</span></span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/login/student')} className="text-sm font-black text-slate-500 hover:text-primary transition-colors lowercase">student login</button>
          <button onClick={() => navigate('/login/teacher')} className="btn-bubble btn-primary h-12 text-sm px-8">teacher portal</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container pt-20 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest border-2 border-blue-100 shadow-sm"
          >
            <Sparkles className="w-4 h-4" /> homework made magical
          </motion.div>
          
          <h1 className="text-7xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tight lowercase">
            The playground <br />
            <span className="text-primary">for learning.</span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-bold lowercase leading-relaxed">
            AI-native homework tailored to Grade 1-6. <br />
            Teachers build the engine. Students lead the mission.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
            <div 
              onClick={() => navigate('/login/teacher')}
              className="card-bubble flex-1 max-w-[320px] p-10 text-left cursor-pointer group hover:border-primary border-none bg-white shadow-2xl shadow-slate-200/50"
            >
              <div className="w-16 h-16 bg-blue-50 text-primary flex-center rounded-[24px] mb-8 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_6px_0_0_#6e48aa] transition-all">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-3 lowercase">for teachers</h3>
              <p className="text-sm text-slate-400 font-bold mb-8 leading-relaxed">Generate papers and track student progress with AI.</p>
              <div className="flex items-center gap-2 text-primary font-black text-sm lowercase">
                start portal <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => navigate('/login/student')}
              className="card-bubble flex-1 max-w-[320px] p-10 text-left cursor-pointer group hover:border-science border-none bg-white shadow-2xl shadow-slate-200/50"
            >
              <div className="w-16 h-16 bg-emerald-50 text-science flex-center rounded-[24px] mb-8 group-hover:bg-science group-hover:text-white group-hover:shadow-[0_6px_0_0_#1591a3] transition-all">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-3 lowercase">for students</h3>
              <p className="text-sm text-slate-400 font-bold mb-8 leading-relaxed">Missions tailored for your grade and curriculum.</p>
              <div className="flex items-center gap-2 text-science font-black text-sm lowercase">
                enter world <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Mock Login Pages ---
const LoginPage = ({ role }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f8f9fe] flex-center p-6 relative overflow-hidden">
      <div className="blob-bg w-[500px] h-[500px] bg-primary/10 -top-32 -left-32" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-bubble max-w-md w-full p-12 space-y-10 shadow-2xl border-none bg-white relative z-10"
      >
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-black lowercase tracking-tight">{role === 'teacher' ? 'teacher login' : 'student portal'}</h2>
          <p className="text-xs text-slate-400 uppercase font-black tracking-[0.25em]">
            {role === 'teacher' ? 'Manage your classroom' : 'Ready for a mission?'}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.1em]">Email Address</label>
            <input type="email" placeholder="name@school.com" className="input h-14 rounded-2xl border-2 border-slate-100" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.1em]">Password</label>
            <input type="password" placeholder="••••••••" className="input h-14 rounded-2xl border-2 border-slate-100" />
          </div>
        </div>

        <button 
          onClick={() => navigate(role === 'teacher' ? '/dashboard/teacher' : '/dashboard/student')} 
          className="btn-bubble btn-primary w-full h-14 text-lg"
        >
          continue mission!
        </button>

        <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest">
           institutional-grade security <ShieldCheck className="w-3 h-3 inline ml-1" />
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
