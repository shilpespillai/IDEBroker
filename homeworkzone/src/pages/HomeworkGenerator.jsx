import React, { useState } from 'react';
import { 
  Sparkles, 
  Globe, 
  BookOpen, 
  FlaskConical, 
  Calculator,
  ChevronRight,
  BrainCircuit,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CURRICULUMS = [
  { id: 'au', name: 'Australia', icon: '🇦🇺' },
  { id: 'uk', name: 'United Kingdom', icon: '🇬🇧' },
  { id: 'us', name: 'United States', icon: '🇺🇸' },
  { id: 'in', name: 'India', icon: '🇮🇳' },
];

const GRADES = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

const SUBJECTS = [
  { id: 'english', name: 'English', icon: <BookOpen className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
  { id: 'maths', name: 'Maths', icon: <Calculator className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
  { id: 'science', name: 'Science', icon: <FlaskConical className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
];

export default function HomeworkGenerator() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    country: 'au',
    grade: 'Grade 3',
    subject: 'maths',
    topic: '',
    questionCount: 5
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Mocking AI delay
    setTimeout(() => {
      setIsGenerating(false);
      setResult({
        title: `${config.subject.toUpperCase()}: ${config.topic || 'General Review'}`,
        questions: [
          { id: 1, text: "What is 12 + 15?", options: ["25", "27", "30", "22"], answer: "27" },
          { id: 2, text: "What is half of 50?", options: ["20", "25", "30", "15"], answer: "25" },
        ]
      });
      setStep(4);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-amber-50 text-amber-600 flex-center rounded-2xl shadow-sm">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI Homework Generator</h2>
          <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">Create personalized curriculum-aware papers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1: Curriculum & Grade */}
        <div className={`card space-y-6 transition-all ${step === 1 ? 'border-primary ring-4 ring-blue-50' : 'opacity-50'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 text-white flex-center rounded-lg text-xs font-bold">01</div>
            <h3 className="font-bold">Core Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select Country</label>
              <div className="grid grid-cols-2 gap-2">
                {CURRICULUMS.map(c => (
                  <div 
                    key={c.id}
                    onClick={() => setConfig({...config, country: c.id})}
                    className={`p-3 rounded-xl border text-sm font-medium cursor-pointer transition-all flex items-center gap-2 ${
                      config.country === c.id ? 'border-primary bg-blue-50 text-primary' : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span>{c.icon}</span> {c.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Target Grade</label>
              <select 
                value={config.grade}
                onChange={(e) => setConfig({...config, grade: e.target.value})}
                className="input font-bold"
              >
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          
          {step === 1 && <button onClick={() => setStep(2)} className="btn btn-primary w-full">Next Step</button>}
        </div>

        {/* Step 2: Subject & Topic */}
        <div className={`card space-y-6 transition-all ${step === 2 ? 'border-primary ring-4 ring-blue-50' : 'opacity-50'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 text-white flex-center rounded-lg text-xs font-bold">02</div>
            <h3 className="font-bold">Subject Matter</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {SUBJECTS.map(s => (
                <div 
                  key={s.id}
                  onClick={() => setConfig({...config, subject: s.id})}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    config.subject === s.id ? 'border-primary bg-blue-50 ring-2 ring-blue-100' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className={`w-10 h-10 flex-center rounded-xl ${s.color}`}>{s.icon}</div>
                  <span className="font-bold">{s.name}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Specific Topic (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. Fractions, Planets, Poetry" 
                value={config.topic}
                onChange={(e) => setConfig({...config, topic: e.target.value})}
                className="input"
              />
            </div>
          </div>

          {step === 2 && (
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="btn btn-outline flex-1 text-xs">Back</button>
              <button onClick={() => setStep(3)} className="btn btn-primary flex-[2]">Review AI</button>
            </div>
          )}
        </div>

        {/* Step 3: AI Generation */}
        <div className={`card space-y-6 transition-all ${step === 3 ? 'border-primary ring-4 ring-blue-50' : 'opacity-50'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 text-white flex-center rounded-lg text-xs font-bold">03</div>
            <h3 className="font-bold">AI Execution</h3>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-5 h-5 text-primary" />
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Selected Engine</p>
                <p className="text-xs font-bold">GPT-4o (Teacher's Key)</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Summary</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generating <span className="text-slate-900 font-bold">{config.questionCount} questions</span> for <span className="text-slate-900 font-bold">{config.grade}</span> ({config.country.toUpperCase()}) in <span className="text-slate-900 font-bold">{config.subject}</span>.
              </p>
            </div>
          </div>

          {step === 3 && (
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn btn-primary w-full h-14 text-md gap-3 bg-slate-900 hover:bg-black"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-amber-400" />}
              {isGenerating ? 'Generating Paper...' : 'Start Generation'}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {step === 4 && result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8 border-accent ring-4 ring-emerald-50"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold">Homework Generated Successfully</h3>
              </div>
              <div className="flex gap-3">
                <button className="btn btn-outline h-10">Preview Paper</button>
                <button className="btn btn-primary h-10 bg-accent hover:bg-emerald-600">Assign to Class</button>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
              <p className="font-bold text-slate-900">{result.title}</p>
              <div className="space-y-4">
                {result.questions.map(q => (
                  <div key={q.id} className="text-sm p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <p className="font-bold mb-2">{q.id}. {q.text}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map(opt => (
                        <div key={opt} className={`p-2 rounded-lg border text-xs ${opt === q.answer ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50'}`}>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
