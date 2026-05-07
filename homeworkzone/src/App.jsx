import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { BookOpen, GraduationCap, ArrowRight, UserCheck, ShieldCheck, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentQuiz from './pages/StudentQuiz';

// --- Student Dashboard (Mock for now) ---
const StudentDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 p-8 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex-center shadow-sm border border-slate-100">
              <UserCheck className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back, Jamie!</h2>
              <p className="text-sm text-slate-500 font-medium">You have <span className="text-accent font-bold">1 active assignment</span> waiting.</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm"></div>
        </header>

        <section className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Your Homework</h3>
          <div className="card flex items-center justify-between p-6 bg-white border-none shadow-xl shadow-slate-200/50 group">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 flex-center rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">Addition & Subtraction Mastery</p>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-0.5">Maths · Grade 3 · Assigned by Dr. Jenkins</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/quiz/sample')}
              className="btn btn-primary bg-emerald-600 hover:bg-emerald-700 h-12 px-8 rounded-xl shadow-lg shadow-emerald-600/20 gap-2"
            >
              Start Homework <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Landing Page ---
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="container flex items-center justify-between h-20 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary flex-center rounded-xl text-white shadow-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter">Homework<span className="text-primary">Zone</span></span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/login/student')} className="btn btn-outline">Student Login</button>
          <button onClick={() => navigate('/login/teacher')} className="btn btn-primary">Teacher Portal</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container pt-20 pb-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100"
          >
            <Globe className="w-4 h-4" /> Localized Curriculums for Grade 1-6
          </motion.div>
          
          <h1 className="text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            AI-Native Homework <br />
            <span className="text-primary">Built for Precision.</span>
          </h1>
          
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            The professional SAAS for teachers to generate, assign, and track personalized homework using their own AI logic. 
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div 
              onClick={() => navigate('/login/teacher')}
              className="card flex-1 max-w-[280px] p-8 text-left cursor-pointer group hover:border-primary"
            >
              <div className="w-12 h-12 bg-blue-50 text-primary flex-center rounded-2xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">For Teachers</h3>
              <p className="text-sm text-slate-500 mb-6">Generate curriculum-aligned papers and track class progress.</p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                Get Started <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => navigate('/login/student')}
              className="card flex-1 max-w-[280px] p-8 text-left cursor-pointer group hover:border-accent"
            >
              <div className="w-12 h-12 bg-emerald-50 text-accent flex-center rounded-2xl mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">For Students</h3>
              <p className="text-sm text-slate-500 mb-6">Access assignments and learn with real-time feedback.</p>
              <div className="flex items-center gap-2 text-accent font-bold text-sm">
                Enter Portal <ArrowRight className="w-4 h-4" />
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
    <div className="min-h-screen bg-white flex-center p-6">
      <div className="card max-w-md w-full p-10 space-y-8 shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black">{role === 'teacher' ? 'Teacher Login' : 'Student Portal'}</h2>
          <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">
            {role === 'teacher' ? 'Manage your classroom' : 'Ready to learn?'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400">Email Address</label>
            <input type="email" placeholder="name@school.com" className="input" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400">Password</label>
            <input type="password" placeholder="••••••••" className="input" />
          </div>
        </div>

        <button 
          onClick={() => navigate(role === 'teacher' ? '/dashboard/teacher' : '/dashboard/student')} 
          className="btn btn-primary w-full h-12 text-md"
        >
          Continue to Dashboard
        </button>

        <p className="text-center text-xs text-slate-400">
          Secure, institutional-grade authentication <ShieldCheck className="w-3 h-3 inline" />
        </p>
      </div>
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
