import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Timer, 
  Award,
  AlertCircle,
  GraduationCap,
  XCircle,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_QUIZ = {
  title: "Grade 3 Maths: Addition & Subtraction Mastery",
  subject: "Maths",
  questions: [
    { id: 1, text: "Sarah has 45 apples. She gives 18 to Ben. How many apples does Sarah have left?", options: ["25", "27", "33", "23"], answer: "27" },
    { id: 2, text: "What is 150 + 275?", options: ["425", "375", "450", "415"], answer: "425" },
    { id: 3, text: "Which number is even?", options: ["13", "27", "44", "51"], answer: "44" },
    { id: 4, text: "If a triangle has 3 sides, how many sides do 4 triangles have?", options: ["7", "10", "12", "14"], answer: "12" },
  ]
};

export default function StudentQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const currentQuestion = MOCK_QUIZ.questions[currentIdx];
  const progress = ((currentIdx + 1) / MOCK_QUIZ.questions.length) * 100;

  const handleSelect = (option) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    MOCK_QUIZ.questions.forEach(q => {
      if (answers[q.id] === q.answer) correctCount++;
    });
    setScore(correctCount);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    const percentage = (score / MOCK_QUIZ.questions.length) * 100;
    return <QuizResults score={score} total={MOCK_QUIZ.questions.length} percentage={percentage} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 flex flex-col">
      {/* Header & Progress */}
      <header className="max-w-4xl mx-auto w-full space-y-6 mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 flex-center rounded-xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">{MOCK_QUIZ.title}</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{MOCK_QUIZ.subject} · {MOCK_QUIZ.questions.length} Questions</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            <Timer className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold text-slate-700">04:12</span>
          </div>
        </div>

        <div className="h-2 w-full bg-white border border-slate-200 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
          />
        </div>
      </header>

      {/* Question Area */}
      <main className="max-w-3xl mx-auto w-full flex-1">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Question {currentIdx + 1} of {MOCK_QUIZ.questions.length}</span>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">
                {currentQuestion.text}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, i) => {
                const isSelected = answers[currentQuestion.id] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`group p-6 text-left rounded-2xl border-2 transition-all active:scale-[0.98] flex items-center justify-between ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-50' 
                        : 'border-white bg-white hover:border-slate-200 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 flex-center rounded-lg text-xs font-black transition-colors ${
                        isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className={`text-lg font-bold ${isSelected ? 'text-emerald-900' : 'text-slate-700'}`}>
                        {option}
                      </span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Actions */}
      <footer className="max-w-4xl mx-auto w-full py-8 flex items-center justify-between shrink-0">
        <button 
          onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          className="btn btn-outline h-12 gap-2 px-8 disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>

        {currentIdx === MOCK_QUIZ.questions.length - 1 ? (
          <button 
            onClick={handleSubmit}
            className="btn btn-primary h-12 px-12 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 text-md gap-3"
          >
            Submit Exam <CheckCircle2 className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={() => setCurrentIdx(prev => Math.min(MOCK_QUIZ.questions.length - 1, prev + 1))}
            className="btn btn-primary h-12 px-12 text-md gap-3"
          >
            Next Question <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </footer>
    </div>
  );
}

const QuizResults = ({ score, total, percentage }) => {
  const isPassed = percentage >= 70;

  return (
    <div className="min-h-screen bg-white flex-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-xl w-full p-12 text-center space-y-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border-none ring-1 ring-slate-100"
      >
        <div className="relative mx-auto w-32 h-32">
          <div className={`w-full h-full flex-center rounded-[40px] rotate-12 shadow-2xl ${isPassed ? 'bg-emerald-500' : 'bg-rose-500'}`}>
            {isPassed ? <Trophy className="w-16 h-16 text-white -rotate-12" /> : <AlertCircle className="w-16 h-16 text-white -rotate-12" />}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-xl border border-slate-50">
            <Award className={`w-8 h-8 ${isPassed ? 'text-amber-400' : 'text-slate-300'}`} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            {isPassed ? 'Stellar Work!' : 'Keep Practicing!'}
          </h1>
          <p className="text-slate-500 font-medium">You completed the Addition & Subtraction Mastery exam.</p>
        </div>

        <div className="flex items-center justify-center gap-12 py-6 border-y border-slate-50">
          <div className="text-center">
            <p className="text-4xl font-black text-slate-900">{score}/{total}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Score</p>
          </div>
          <div className="w-px h-12 bg-slate-100"></div>
          <div className="text-center">
            <p className="text-4xl font-black text-slate-900">{Math.round(percentage)}%</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Accuracy</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <button className="btn btn-outline h-12" onClick={() => window.location.reload()}>Try Again</button>
          <button className="btn btn-primary h-12" onClick={() => window.location.href = '/dashboard/student'}>Back to Portal</button>
        </div>
      </motion.div>
    </div>
  );
};
