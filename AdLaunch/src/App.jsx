import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, 
  Megaphone, 
  BarChart3, 
  Settings, 
  Sparkles, 
  MessageCircle, 
  Users, 
  ShoppingBag, 
  Instagram,
  Copy, 
  Check, 
  ExternalLink,
  Plus,
  Share2,
  PieChart as PieChartIcon,
  MousePointer2,
  History,
  TrendingUp,
  Target,
  Bell,
  Mail,
  Search,
  User
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { generateShareLink, getPlatformTemplate } from './utils/bridge';

const performanceData = [
  { name: 'Jan', impressions: 4000, conversions: 2400 },
  { name: 'Feb', impressions: 3000, conversions: 1398 },
  { name: 'Mar', impressions: 2000, conversions: 9800 },
  { name: 'Apr', impressions: 2780, conversions: 3908 },
  { name: 'May', impressions: 1890, conversions: 4800 },
  { name: 'Jun', impressions: 2390, conversions: 3800 },
  { name: 'Jul', impressions: 3490, conversions: 4300 },
];

const audienceData = [
  { name: '18-24', value: 400, color: '#9d50bb' },
  { name: '25-34', value: 300, color: '#ff0080' },
  { name: '35-44', value: 300, color: '#00d2ff' },
  { name: '45+', value: 200, color: '#6366f1' },
];

const campaigns = [
  { id: 1, name: 'Summer Sale 2024', platform: 'facebook', spend: '$19.5k', roi: '5.1x', status: 'Active' },
  { id: 2, name: 'Handmade Soap Launch', platform: 'etsy', spend: '$8.2k', roi: '4.2x', status: 'Active' },
  { id: 3, name: 'B2B Networking', platform: 'linkedin', spend: '$2.5k', roi: '3.8x', status: 'Paused' },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAds, setGeneratedAds] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['facebook', 'linkedin', 'etsy', 'instagram']);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      const ads = selectedPlatforms.map(p => ({
        platform: p,
        content: getPlatformTemplate(p, prompt),
        link: generateShareLink(p, getPlatformTemplate(p, prompt))
      }));
      setGeneratedAds(ads);
      setIsGenerating(false);
    }, 2000);
  };

  const togglePlatform = (id) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-spot-purple opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-spot-blue opacity-20 pointer-events-none" />

      {/* Main Dashboard Frame */}
      <div className="w-full h-screen bg-[#0a0a0c] overflow-hidden flex shadow-2xl relative z-10">
        
        {/* Sidebar */}
        <aside className="w-64 bg-black/40 backdrop-blur-3xl border-r border-white/5 p-8 flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shadow-lg shadow-brand-blue/20">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">AdLaunch</span>
          </div>

          <nav className="flex flex-col gap-3">
            {[
              { name: 'Overview', icon: Layout },
              { name: 'Campaigns', icon: Megaphone },
              { name: 'Analytics', icon: BarChart3 },
              { name: 'Creatives', icon: Sparkles },
              { name: 'AI Assistant', icon: Target },
              { name: 'Settings', icon: Settings },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  activeTab === item.name 
                    ? 'bg-white/10 text-white shadow-inner border border-white/10' 
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === item.name ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 border border-white/5 group cursor-pointer hover:border-white/20 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/10">
                  <User className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <p className="text-xs font-bold">Sarah K.</p>
                  <p className="text-[10px] text-white/40">Pro Account</p>
                </div>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-brand-blue to-brand-purple" />
              </div>
            </div>
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-black/20">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-white/40 text-sm mt-1">
                Your content is posted directly to your connected **Facebook Timeline**, **LinkedIn Feed**, **Instagram Profile**, and **Etsy Shop**.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-white/40">
                <Search className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                <Bell className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                <Mail className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              </div>
              <div className="h-8 w-px bg-white/10" />
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all">
                Last 30 Days
              </button>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6">
            
            {/* Performance Overview Chart */}
            <section className="col-span-8 glass-card p-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-lg">Performance Overview</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(0,210,255,0.5)]" />
                    <span className="text-xs text-white/60 uppercase tracking-widest font-bold">Impressions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(157,80,187,0.5)]" />
                    <span className="text-xs text-white/60 uppercase tracking-widest font-bold">Conversions</span>
                  </div>
                </div>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00d2ff" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9d50bb" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#9d50bb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#ffffff20" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#ffffff20" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#121214', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="impressions" stroke="#00d2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorImp)" />
                    <Area type="monotone" dataKey="conversions" stroke="#9d50bb" strokeWidth={3} fillOpacity={1} fill="url(#colorConv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Top Campaigns Table */}
            <section className="col-span-4 glass-card p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Top Campaigns</h3>
                <button className="text-white/40 hover:text-white transition-colors"><Plus className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                {campaigns.map((camp) => (
                  <div key={camp.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${camp.platform === 'facebook' ? 'bg-blue-600' : camp.platform === 'etsy' ? 'bg-orange-600' : 'bg-blue-800'}`}>
                        {camp.platform === 'facebook' ? <MessageCircle className="w-4 h-4" /> : camp.platform === 'etsy' ? <ShoppingBag className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold truncate w-24">{camp.name}</p>
                        <p className="text-[10px] text-white/40 uppercase font-bold">{camp.platform}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-green-400">{camp.roi}</p>
                      <p className="text-[10px] text-white/40">{camp.spend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Destination Map */}
            <section className="col-span-4 glass-card p-6">
               <h3 className="font-bold text-lg mb-4">Destination Map</h3>
               <div className="space-y-3">
                 {[
                   { name: 'Personal/Business Profile', platform: 'Facebook' },
                   { name: 'Professional Feed', platform: 'LinkedIn' },
                   { name: 'Bio & Stories', platform: 'Instagram' },
                   { name: 'Shop Updates', platform: 'Etsy' },
                 ].map((dest) => (
                   <div key={dest.platform} className="flex items-center gap-3 text-xs text-white/60 p-2 rounded-lg bg-white/[0.02]">
                     <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                     <span className="font-bold text-white/80">{dest.platform}:</span>
                     <span>{dest.name}</span>
                   </div>
                 ))}
               </div>
            </section>

            {/* Targeted Outreach (NEW) */}
            <section className="col-span-4 glass-card p-6 border-t-4 border-yellow-500/50">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="font-bold text-lg">Safe Growth Hub</h3>
                 <Target className="w-5 h-5 text-yellow-500" />
               </div>
               <p className="text-[10px] text-white/40 mb-4 leading-relaxed">
                 <span className="text-yellow-500 font-bold">WARNING:</span> Full automation on external pages leads to immediate account bans. Use these targeted links for safe manual outreach.
               </p>
               <div className="space-y-2">
                 {[
                   { name: 'Organic Soap Enthusiasts', type: 'FB Group', link: 'https://www.facebook.com/groups/search/' },
                   { name: 'Sustainable Biz Network', type: 'LinkedIn', link: 'https://www.linkedin.com/groups/' },
                   { name: 'Artisanal Makers', type: 'Etsy Forum', link: 'https://community.etsy.com/' },
                 ].map((target) => (
                   <a 
                     key={target.name}
                     href={target.link}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/10 transition-all group"
                   >
                     <div className="flex items-center gap-2">
                       <Plus className="w-3 h-3 text-yellow-500" />
                       <span className="text-[10px] font-bold">{target.name}</span>
                     </div>
                     <span className="text-[8px] text-white/20 uppercase font-bold group-hover:text-yellow-500 transition-colors">{target.type}</span>
                   </a>
                 ))}
               </div>
            </section>

            {/* Post Composer Section */}
            <section className="col-span-8 grid grid-cols-2 gap-6">
              <div className="glass-card p-6 flex flex-col gap-4">
                <h3 className="font-bold text-lg">Post Composer</h3>
                <div className="relative flex-1">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Craft your post here... #AdLaunch"
                    className="w-full h-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all resize-none custom-scrollbar"
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><Plus className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><MousePointer2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {['facebook', 'linkedin', 'etsy', 'instagram'].map(id => (
                      <button 
                        key={id}
                        onClick={() => togglePlatform(id)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          selectedPlatforms.includes(id) 
                            ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                            : 'bg-white/5 text-white/20 hover:text-white/40'
                        }`}
                      >
                        {id === 'facebook' ? <MessageCircle className="w-4 h-4" /> : 
                         id === 'linkedin' ? <Users className="w-4 h-4" /> : 
                         id === 'etsy' ? <ShoppingBag className="w-4 h-4" /> : 
                         <Instagram className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-xs font-bold shadow-lg shadow-brand-purple/20 hover:scale-105 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Draft'}
                  </button>
                </div>
              </div>

              <div className="glass-card p-6 flex flex-col gap-4 border-l-4 border-brand-purple/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">AI Suggestions</h3>
                  <Sparkles className="w-5 h-5 text-brand-purple" />
                </div>
                <div className="space-y-4">
                  {[
                    "Viral Hook: Use 'Stop Scrolling' for 40% higher Facebook engagement.",
                    "Peak Time: Thursday at 1 PM is the optimal window for LinkedIn reach.",
                    "Etsy Strategy: Use at least 5 artisanal hashtags for internal search visibility.",
                    "Instagram Growth: Carousels generate 2x more saves than single images.",
                    "Conversion Tip: Always place your website link in the first 2 lines of text.",
                    "Professional Reach: Tag 2 relevant industry leaders in your LinkedIn posts.",
                    "Community Growth: Post this copy in 'Organic Living' Facebook groups.",
                    "Comment Marketing: Use the 'Value Hook' to reply to popular niche posts.",
                    "Etsy Forums: Share your artisanal story in the 'Seller Show & Tell' thread."
                  ].map((s, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/60 hover:border-brand-purple/30 transition-colors group cursor-default">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <p>{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Audience Insights & Live Feed */}
            <section className="col-span-4 space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-bold text-lg mb-4">Ad Audience Insights</h3>
                <div className="h-[180px] flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={audienceData}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {audienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute flex flex-col items-center">
                    <p className="text-xl font-bold">1.2M</p>
                    <p className="text-[10px] text-white/40 uppercase font-bold">Reach</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {audienceData.map(item => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] text-white/40 font-bold">{item.name} groups</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Live Feed</h3>
                  <History className="w-4 h-4 text-white/20" />
                </div>
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {generatedAds ? (
                      generatedAds.map((ad, idx) => (
                        <motion.div 
                          key={ad.platform}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 relative group"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${ad.platform === 'facebook' ? 'bg-blue-600' : ad.platform === 'etsy' ? 'bg-orange-600' : ad.platform === 'linkedin' ? 'bg-blue-800' : 'bg-pink-600'}`}>
                            {ad.platform === 'facebook' ? <MessageCircle className="w-4 h-4" /> : 
                             ad.platform === 'etsy' ? <ShoppingBag className="w-4 h-4" /> : 
                             ad.platform === 'linkedin' ? <Users className="w-4 h-4" /> : 
                             <Instagram className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-white/60 uppercase truncate">{ad.platform} Preview</p>
                            <p className="text-[9px] text-white/30 truncate">{ad.content}</p>
                          </div>
                          <a 
                            href={ad.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-brand-purple/20 text-brand-purple opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-8 text-center border-2 border-dashed border-white/5 rounded-xl">
                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest leading-loose">Recent ad previews will appear here...</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
