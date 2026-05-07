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
  BrainCircuit,
  Gamepad2,
  Library,
  Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentQuiz from './pages/StudentQuiz';

// --- Student Dashboard (Kiddy Style) ---
const StudentDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#fffde7] pb-20">
      <div className="ribbon-nav">
        <div className="logo-box">STUDENT WORLD</div>
      </div>
      
      <div className="container mt-24 space-y-12">
        <header className="text-center space-y-4">
           <h2 className="text-5xl font-black text-slate-800 lowercase">Ready for a mission, Jamie?</h2>
           <p className="text-xl text-slate-500 font-bold">You have 1 active task today!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white p-12 rounded-[60px] shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-kiddy-blue/10 rounded-full -mr-16 -mt-16" />
           <div className="space-y-6">
              <span className="bg-orange-100 text-orange-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">Active Mission</span>
              <h3 className="text-4xl font-black text-slate-900 lowercase">Addition & Subtraction Mastery</h3>
              <p className="text-lg text-slate-500 font-bold">Grade 3 Maths · Mission by Dr. Jenkins</p>
              <button 
                onClick={() => navigate('/quiz/sample')}
                className="kiddy-btn text-xl px-12 py-5 bg-kiddy-blue shadow-[0_8px_0_0_#0288d1]"
              >
                Launch Mission!
              </button>
           </div>
           <div className="flex-center">
              <div className="w-64 h-64 bg-slate-100 rounded-full flex-center animate-bounce">
                 <Rocket className="w-32 h-32 text-kiddy-blue" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Landing Page (KIDDY Look) ---
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Ribbon Header */}
      <nav className="ribbon-nav">
        <div className="flex items-center gap-12 text-white font-black uppercase text-xs tracking-widest px-10">
           <span className="cursor-pointer hover:text-kiddy-yellow transition-colors">Features</span>
           <span className="cursor-pointer hover:text-kiddy-yellow transition-colors">Grade 1-6</span>
           <div className="logo-box">HOMEWORKZONE</div>
           <span className="cursor-pointer hover:text-kiddy-yellow transition-colors">Missions</span>
           <span onClick={() => navigate('/login/teacher')} className="cursor-pointer hover:text-kiddy-yellow transition-colors">Teacher Portal</span>
        </div>
      </nav>

      {/* Kiddy Hero */}
      <section className="kiddy-hero">
        <div className="container relative z-10">
           <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 text-left space-y-8">
                 <h1 className="text-7xl md:text-8xl text-white leading-[0.9] drop-shadow-lg">
                    Welcome to <br />
                    HomeworkZone!
                 </h1>
                 <p className="text-2xl text-white font-bold max-w-lg drop-shadow-md">
                    The perfect AI learning center for your students. Tailored for Grade 1-6.
                 </p>
                 <button 
                  onClick={() => navigate('/login/student')}
                  className="kiddy-btn bg-white text-kiddy-blue text-xl px-12 py-5 shadow-[0_8px_0_0_#e1f5fe]"
                 >
                   Enter Student Portal
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
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[100px]">
            <path d="M0,0 C150,110 300,110 450,0 C600,110 750,110 900,0 C1050,110 1200,110 1350,0 V120 H0 Z" fill="#fffde7"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#fffde7]">
         <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="kiddy-card">
                  <div className="w-20 h-20 bg-blue-50 text-kiddy-blue flex-center rounded-full mx-auto mb-8">
                    <Gamepad2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl mb-4 text-kiddy-blue">Interactive</h3>
                  <p className="text-sm text-slate-500 font-bold mb-8 leading-relaxed">Missions designed to feel like play, not work. Gamified learning for all grades.</p>
                  <button className="kiddy-btn bg-kiddy-yellow text-slate-700 shadow-[0_6px_0_0_#fbc02d]">Explore</button>
               </div>

               <div className="kiddy-card">
                  <div className="w-20 h-20 bg-orange-50 text-kiddy-orange flex-center rounded-full mx-auto mb-8">
                    <Palette className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl mb-4 text-kiddy-orange">Creative</h3>
                  <p className="text-sm text-slate-500 font-bold mb-8 leading-relaxed">AI tailors topics to student interests, making every paper unique and exciting.</p>
                  <button className="kiddy-btn shadow-[0_6px_0_0_#d35400]">Discover</button>
               </div>

               <div className="kiddy-card">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 flex-center rounded-full mx-auto mb-8">
                    <Library className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl mb-4 text-emerald-500">Education</h3>
                  <p className="text-sm text-slate-500 font-bold mb-8 leading-relaxed">Curriculum-aligned questions for UK, US, AU and India. Professional standards.</p>
                  <button className="kiddy-btn bg-kiddy-yellow text-slate-700 shadow-[0_6px_0_0_#fbc02d]">Learn More</button>
               </div>
            </div>
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
          className="kiddy-btn w-full py-5 text-xl bg-kiddy-blue shadow-[0_8px_0_0_#0288d1]"
        >
          Lets Go!
        </button>

        <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest">
           Secure School Link <ShieldCheck className="w-3 h-3 inline ml-1" />
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
