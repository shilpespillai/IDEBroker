import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Award, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const CLASS_TREND_DATA = [
  { week: 'W1', score: 65 },
  { week: 'W2', score: 72 },
  { week: 'W3', score: 68 },
  { week: 'W4', score: 81 },
  { week: 'W5', score: 84 },
  { week: 'W6', score: 89 },
];

const STUDENT_COMPARISON_DATA = [
  { name: 'Jamie L.', score: 94, progress: '+5%' },
  { name: 'Sarah K.', score: 88, progress: '+2%' },
  { name: 'Marcus T.', score: 82, progress: '-1%' },
  { name: 'Elena V.', score: 76, progress: '+8%' },
  { name: 'Alex P.', score: 71, progress: '+4%' },
  { name: 'Zoe M.', score: 65, progress: '-3%' },
];

const SUBJECT_PERFORMANCE = [
  { subject: 'English', score: 88 },
  { subject: 'Maths', score: 74 },
  { subject: 'Science', score: 92 },
];

export default function TeacherAnalytics() {
  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex-center rounded-2xl shadow-sm">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Classroom Analytics</h2>
            <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">Performance Insights & Student Comparison</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="btn btn-outline h-10 text-xs font-bold gap-2">
            <Filter className="w-4 h-4" /> Filter by Grade
          </button>
          <button className="btn btn-primary h-10 text-xs font-bold">Export Report</button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Class Velocity (Trend) */}
        <div className="card md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">Class Performance Trend</h3>
              <p className="text-xs text-slate-400">Average score trajectory over the last 6 weeks</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">
              <ArrowUpRight className="w-3 h-3" /> 12% Growth
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CLASS_TREND_DATA}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 900, marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="card space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900">Subject Mastery</h3>
            <p className="text-xs text-slate-400">Avg. score by core curriculum</p>
          </div>

          <div className="space-y-6 pt-4">
            {SUBJECT_PERFORMANCE.map((item, idx) => (
              <div key={item.subject} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                  <span>{item.subject}</span>
                  <span className="text-slate-900">{item.score}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ delay: idx * 0.1 }}
                    className={`h-full rounded-full ${
                      idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-emerald-500' : 'bg-purple-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex-center shadow-sm">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                <span className="text-slate-900 font-bold">Recommendation:</span> Focus more on Maths fractions this week to boost average.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Comparison Matrix */}
      <div className="card space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900">Student Comparison Matrix</h3>
            <p className="text-xs text-slate-400">Benchmarking individual performance across the classroom</p>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Top 25%</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Average</span>
             </div>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={STUDENT_COMPARISON_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={40}>
                {STUDENT_COMPARISON_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.score >= 85 ? '#10b981' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison List Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {STUDENT_COMPARISON_DATA.slice(0, 4).map((student, idx) => (
             <div key={student.name} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex-center font-black text-xs text-slate-400 border border-slate-100 group-hover:border-primary transition-colors">
                    {student.name.split(' ')[0][0]}{student.name.split(' ')[1][0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{student.name}</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Grade 6 · Honors</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{student.score}%</p>
                  <p className={`text-[10px] font-black flex items-center gap-1 ${student.progress.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {student.progress.includes('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {student.progress}
                  </p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
