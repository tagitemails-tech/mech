
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Settings, 
  ShieldCheck, 
  Wrench, 
  ArrowRight, 
  ChevronRight, 
  MessageSquare, 
  Send, 
  Grid, 
  Layers, 
  Factory, 
  CheckCircle2, 
  Table as TableIcon,
  ChevronLeft,
  Users,
  Search,
  BookOpen,
  Image as ImageIcon,
  Cpu,
  Activity,
  Zap
} from 'lucide-react';
import { ChatMessage } from './types';
import { getGeminiResponse } from './geminiService';

// --- Types & Constants ---
type View = 'home' | 'about' | 'technical' | 'availability' | 'gallery' | 'contact';

const COLORS = {
  blue: '#0c3c8c',
  orange: '#f37021',
  lightBlue: '#eef2ff'
};

const HERO_IMAGES = [
  "https://aradhyainteriors.co.in/1/s1.jpg",
  "https://aradhyainteriors.co.in/1/s2.jpg",
  "https://aradhyainteriors.co.in/1/s3.jpg",
  "https://aradhyainteriors.co.in/1/s4.jpg",
  "https://aradhyainteriors.co.in/1/s5.jpg"
];

// --- Sub-Components ---

const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const containerClass = size === "lg" ? "w-80 h-80 md:w-[32rem] md:h-[32rem]" : size === "md" ? "w-72 h-72 md:w-[28rem] md:h-[28rem]" : "w-24 h-24 md:w-32 md:h-32";
  const logoUrl = "https://aradhyainteriors.co.in/1/1/log.jpeg";
  
  return (
    <div className="flex flex-col items-center">
      <div className={`${containerClass} bg-white rounded-full overflow-hidden shadow-xl flex items-center justify-center transform transition-all duration-500 hover:scale-[1.05] border-4 border-white/50`}>
        <img 
          src={logoUrl} 
          alt="Mech-Sphere Logo" 
          className="w-full h-full object-contain scale-[1.15]"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

// --- Page Views ---

const HomeView = ({ setView }: { setView: (v: View) => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      <section className="relative h-screen overflow-hidden bg-slate-950">
        <AnimatePresence>
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
              src={HERO_IMAGES[currentSlide]} 
              alt="Hydraulic" 
              className="w-full h-full object-cover object-center" 
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Minimal Overlays for maximum image clarity while maintaining text readability */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10"></div>
        <div className="absolute inset-0 blue-grid-bg opacity-10 z-10"></div>

        <div className="relative z-40 h-full flex items-center justify-center text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <Logo size="lg" />
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-6xl md:text-9xl font-oswald font-bold text-white mt-8 mb-4 tracking-tighter uppercase leading-none drop-shadow-2xl"
            >
              MECH-SPHERE<br />INDUSTRIES
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="inline-block bg-[#f37021] text-white px-8 py-3 font-bold text-xl md:text-2xl uppercase tracking-[0.2em] rounded shadow-2xl mb-10"
            >
              PRICE MEETS QUALITY: FEEL THE DIFFERENCE
            </motion.div>
            <div className="flex flex-wrap justify-center gap-8 mt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('technical')} 
                className="bg-white text-[#0c3c8c] px-10 py-4 rounded font-bold uppercase tracking-widest flex items-center space-x-3 shadow-xl hover:bg-slate-50 transition-colors"
              >
                <BookOpen size={20} />
                <span>Explore Catalog</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('contact')} 
                className="bg-[#f37021] text-white px-10 py-4 rounded font-bold uppercase tracking-widest flex items-center space-x-3 shadow-xl hover:bg-[#d65d1a] transition-colors"
              >
                <Phone size={20} />
                <span>Request Quote</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-10 z-40 hidden md:block">
          <div className="flex items-center space-x-4 text-white/40 text-[10px] font-black tracking-[0.5em] uppercase">
            <span className="w-12 h-px bg-white/20"></span>
            <span>Est. 2022</span>
            <span className="w-12 h-px bg-white/20"></span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-12 bg-white clip-path-hero-bottom z-30"></div>
        <div className="absolute bottom-12 left-0 w-full h-1 bg-[#f37021] z-30"></div>
      </section>

      <section className="py-32 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#0c3c8c] text-4xl md:text-5xl font-oswald font-bold uppercase tracking-[0.2em] mb-4">Manufacturers of Excellence</h2>
              <div className="w-24 h-2 bg-[#f37021] mx-auto mb-8"></div>
              <div className="flex flex-wrap justify-center gap-6 text-slate-400 font-bold uppercase tracking-[0.3em] text-sm">
                 <span className="hover:text-[#0c3c8c] transition-colors cursor-default">HYDRAULIC FITTINGS</span>
                 <span className="text-[#f37021]">/</span>
                 <span className="hover:text-[#0c3c8c] transition-colors cursor-default">HOSE PIPE FITTINGS</span>
                 <span className="text-[#f37021]">/</span>
                 <span className="hover:text-[#0c3c8c] transition-colors cursor-default">CNC PRECISION COMPONENTS</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: <Cpu className="text-[#f37021]" />, title: "CNC Precision", desc: "High-accuracy turned components for critical applications." },
              { icon: <Activity className="text-[#f37021]" />, title: "Hydraulic Power", desc: "Robust fittings designed for extreme pressure environments." },
              { icon: <Zap className="text-[#f37021]" />, title: "Quick Delivery", desc: "Efficient manufacturing cycles to meet your tight deadlines." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-2xl hover:bg-white transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-oswald font-bold text-[#0c3c8c] uppercase mb-4 tracking-wider">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[1, 2, 3].map((num) => (
              <motion.div 
                key={`home-card-${num}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: num * 0.2 }}
                className="rounded-3xl overflow-hidden shadow-xl aspect-video relative group"
              >
                <img 
                  src={`https://aradhyainteriors.co.in/1/1/home (${num}).jpeg`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={`Highlight ${num}`} 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 30 }, (_, i) => i + 10)
              .filter(num => num !== 28)
              .map((num, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="aspect-square bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-[#f37021] transition-colors"></div>
                <img 
                  src={`https://aradhyainteriors.co.in/1/1/1 (${num}).jpeg`} 
                  className="w-full h-full object-contain transition-all duration-500" 
                  alt="Component" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 text-[8px] font-black text-slate-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Part No. MS-{1000 + i}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutView = () => (
  <motion.div 
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="pt-32 pb-24 px-4 bg-slate-50"
  >
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-[#f37021] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-5xl font-oswald font-bold uppercase relative z-10">About Mech-Sphere</h2>
          <p className="mt-2 text-orange-100 uppercase tracking-widest font-bold relative z-10">Established on 25 Feb 2022 at Greater Bengaluru</p>
        </div>
        <div className="p-8 md:p-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-2xl font-bold text-slate-800 leading-relaxed mb-8">
                Mech-Sphere is a successful startup company and founded by <span className="text-[#f37021]">“Young Couple”</span> with keeping vision to serve mechanical industries in an elite way.
              </p>
              <div className="italic text-3xl font-oswald text-[#0c3c8c] border-l-8 border-[#f37021] pl-8 mb-12">
                “Mech moves the world”: we do trust and have respect on mechanical industrial companies.
              </div>
              <h3 className="text-2xl font-bold text-[#0c3c8c] uppercase mb-6 flex items-center space-x-3">
                <Users className="text-[#f37021]" />
                <span>Our Strengths</span>
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {[
                  "More than 10 years of products knowledge",
                  "Expertise in CNC precision turned components",
                  "Strong in Steel, Stainless Steel, Brass and Aluminium jobs",
                  "Expertised with thread standards: BSP, BSPT, Metric, NPT, UNF",
                  "Use EN8 Standard Carbon Steel and SS304, SS316 Material",
                  "Precision for Straight, Elbow, Branch and Swivel T"
                ].map((s, i) => (
                  <motion.li 
                    key={s} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 text-slate-600"
                  >
                    <CheckCircle2 size={18} className="text-[#f37021] flex-shrink-0" />
                    <span className="font-medium">{s}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-[#0c3c8c] p-8 rounded-3xl text-white shadow-xl"
              >
                 <h4 className="font-bold uppercase text-xl mb-6 border-b border-white/20 pb-2">In-House Machines:</h4>
                 <div className="grid grid-cols-2 gap-4">
                    {["CNC Turning", "Band-Saw", "Nut Crimping", "Hose Crimping", "Grinding", "Tapping", "DRO Machine"].map(m => (
                      <div key={m} className="flex items-center space-x-2 text-sm opacity-90">
                        <ChevronRight size={14} className="text-[#f37021]" />
                        <span>{m}</span>
                      </div>
                    ))}
                 </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group"
              >
                <Factory className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform" size={160} />
                <h4 className="font-bold uppercase text-xl mb-6 border-b border-white/20 pb-2">Services:</h4>
                <ul className="space-y-3 text-sm opacity-90 relative z-10">
                   <li>• Precision Turning Works in 2, 3, 4 Jaws</li>
                   <li>• Customized hydraulic fittings and hose end</li>
                   <li>• Undertake Drilling and Tapping works</li>
                   <li>• Hose crimping assembly from 1/8 to 2"</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const TechnicalView = () => {
  const images = Array.from({ length: 8 }, (_, i) => `https://aradhyainteriors.co.in/1/1/m${i + 1}.jpg`);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 px-4 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-2 border-slate-100 pb-8">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
           >
              <h2 className="text-5xl font-oswald font-bold text-[#0c3c8c] uppercase">Technical Catalog</h2>
              <p className="text-[#f37021] font-bold tracking-[0.4em] mt-2 uppercase">Product Specifications & Details</p>
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {images.map((img, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden hover:border-[#0c3c8c] transition-colors"
            >
              <img src={img} alt={`Technical Catalog Page ${i + 1}`} className="w-full h-auto object-contain" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const AvailabilityView = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="pt-32 pb-24 px-4 bg-slate-50"
  >
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-oswald font-bold text-[#0c3c8c] uppercase"
        >
          Products Availability
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.5 }}
          className="h-2 bg-[#f37021] mx-auto mt-4"
        ></motion.div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-[#0c3c8c]"
        >
          <h3 className="text-2xl font-oswald font-bold text-[#0c3c8c] mb-8 uppercase border-b-2 border-slate-100 pb-4">Main Categories</h3>
          <ul className="space-y-4">
            {[
              "Hydraulic Fittings (Dowty, O-Ring)",
              "Straight, Elbow, T and Banjo Types",
              "Metal Fittings 1/8' to 3\" Sizes",
              "Hydraulic Hose Bare Pipes",
              "DKO Nuts (6L to 42L)",
              "Hydraulic Valves & Adapters",
              "High-Pressure Pipes (R1 & R2)",
              "Zinc Plating / Phosphating Options"
            ].map((item, idx) => (
              <motion.li 
                key={item} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 text-slate-700"
              >
                <ChevronRight size={16} className="text-[#f37021]" />
                <span className="font-semibold">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-xl border-t-8 border-[#f37021]"
        >
          <h3 className="text-2xl font-oswald font-bold text-[#f37021] mb-8 uppercase border-b-2 border-slate-100 pb-4">Straight Couplings</h3>
          <ul className="space-y-4">
            {[
              "Hex Nipple", "Male to Male Adapters", "Male – Female Adapters", "Reducer Adapters",
              "Hydraulic Bush type", "Stand-Pipe Adaptors", "Step Bush- Weldable", "Bulk-head Couplings",
              "Hose Nipples up to 2\"", "Gauge adapters"
            ].map((item, idx) => (
              <motion.li 
                key={item} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 text-slate-700"
              >
                <ChevronRight size={16} className="text-[#0c3c8c]" />
                <span className="font-semibold">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-[#0c3c8c] p-10 rounded-[2.5rem] shadow-xl text-white"
        >
          <h3 className="text-2xl font-oswald font-bold text-[#f37021] mb-8 uppercase border-b-2 border-white/10 pb-4">Reference Standards</h3>
          <div className="space-y-8">
            <div>
              <p className="text-[#f37021] font-black text-xs uppercase tracking-widest mb-4">Metric Tube Standards:</p>
              <ul className="space-y-2 text-sm opacity-80">
                <li>• ISO 8434-1 : 24° Cone Bite</li>
                <li>• BS 5200 : 60° Hose End</li>
                <li>• IS 8805 : 24° Cone Bite</li>
                <li>• DIN 2353 : 24° Cone Bite</li>
              </ul>
            </div>
            <div>
              <p className="text-[#f37021] font-black text-xs uppercase tracking-widest mb-4">Port Connector Standards:</p>
              <ul className="space-y-2 text-sm opacity-80">
                <li>• SAE J 1926/1 : SAE 'O' Ring</li>
                <li>• ISO 1179 : BSPP Flat Face</li>
                <li>• BS 5380 : BSPP 'O' Ring Seal</li>
                <li>• ISO 6149 : Metric 'O' Ring Seal</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const GalleryView = () => {
  const images = Array.from({ length: 30 }, (_, i) => i + 10)
    .filter(num => num !== 28)
    .map((num, i) => ({
      url: `https://aradhyainteriors.co.in/1/1/1 (${num}).jpeg`,
      title: `Facility View ${i + 1}`
    }));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 px-4 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl font-oswald font-bold text-[#0c3c8c] uppercase">Facility Gallery</h2>
            <p className="text-[#f37021] font-bold tracking-[0.4em] mt-2 uppercase">Inside Mech-Sphere Industries</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-[#eef2ff] p-4 rounded-2xl flex items-center space-x-3 mt-6 md:mt-0"
          >
             <div className="w-10 h-10 bg-[#0c3c8c] rounded-xl flex items-center justify-center text-white"><ImageIcon size={20} /></div>
             <span className="text-[#0c3c8c] font-black uppercase tracking-widest text-xs">29 Certified Views</span>
          </motion.div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg cursor-pointer"
            >
               <img src={img.url} className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110" alt={img.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity"></div>
               <div className="absolute bottom-0 left-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white font-oswald font-bold text-xl uppercase tracking-wider">{img.title}</p>
                  <p className="text-[#f37021] font-black text-[10px] uppercase tracking-widest mt-1">Verified Unit - Bengaluru</p>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ContactView = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Enquiry from Mech-Sphere Website*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Specifications Required:* ${formData.message}`;
    window.open(`https://wa.me/919902322017?text=${text}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-24 px-4 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="blue-grid-bg rounded-[3rem] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f37021] -translate-y-32 translate-x-32 rotate-45 opacity-20"></div>
          <div className="p-12 md:p-24 text-white grid lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-7xl font-oswald font-bold mb-10 leading-none tracking-tighter uppercase"
              >
                MECH-SPHERE<br /><span className="text-[#f37021]">INDUSTRIES</span>
              </motion.h2>
              <div className="space-y-10">
                <motion.a 
                  href="https://maps.app.goo.gl/3r8oTLDM2ckaxn4L7?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start space-x-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-[#f37021] transition-colors"><MapPin size={24} /></div>
                  <div className="flex-1">
                    <p className="text-[#f37021] font-black text-[10px] uppercase tracking-[0.3em] mb-1">Our Location</p>
                    <p className="text-xl font-medium leading-relaxed mb-4 group-hover:text-[#f37021] transition-colors">B446, Ground Floor, 1st Cross, Peenya Industrial Estate, Peenya 1st Stage, Bengaluru 560058</p>
                    <div className="w-full h-48 rounded-2xl overflow-hidden border-2 border-white/10">
                      <iframe 
                        src="https://maps.google.com/maps?q=B446,+Ground+Floor,+1st+Cross,+Peenya+Industrial+Estate,+Peenya+1st+Stage,+Bengaluru+560058&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </motion.a>
                <motion.a 
                  href="tel:+919902322017"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center space-x-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-[#f37021] transition-colors"><Phone size={24} /></div>
                  <div>
                    <p className="text-[#f37021] font-black text-[10px] uppercase tracking-[0.3em] mb-1">Call Technical Support</p>
                    <p className="text-3xl font-oswald font-bold group-hover:text-[#f37021] transition-colors">+91 9902322017</p>
                  </div>
                </motion.a>
                <motion.a 
                  href="mailto:mechsphere.industries@gmail.com"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center space-x-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-[#f37021] transition-colors"><Mail size={24} /></div>
                  <div>
                    <p className="text-[#f37021] font-black text-[10px] uppercase tracking-[0.3em] mb-1">Email Inquiry</p>
                    <p className="text-xl font-medium group-hover:text-[#f37021] transition-colors">mechsphere.industries@gmail.com</p>
                  </div>
                </motion.a>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-inner"
            >
              <h4 className="text-[#0c3c8c] text-3xl font-oswald font-bold mb-8 uppercase text-center">Enquire Now</h4>
              <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-[#0c3c8c] uppercase tracking-widest ml-1">Full Name</label>
                   <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#f37021] transition-all text-black" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-[#0c3c8c] uppercase tracking-widest ml-1">Email Address</label>
                   <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#f37021] transition-all text-black" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-[#0c3c8c] uppercase tracking-widest ml-1">Specifications Required</label>
                   <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#f37021] transition-all text-black"></textarea>
                 </div>
                 <motion.button 
                   type="submit"
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   className="w-full bg-[#f37021] text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#0c3c8c] transition-all flex justify-center items-center space-x-2"
                 >
                   <span>Submit via WhatsApp</span>
                   <MessageSquare size={18} />
                 </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your Technical Assistant for Mech-Sphere Industries. How can I help you navigate our hydraulic fittings catalog today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Sync scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    const aiResponse = await getGeminiResponse(userMsg, chatMessages.slice(-5));
    setIsTyping(false);
    setChatMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
  };

  const navItems: { id: View; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'technical', label: 'Technical Catalog' },
    { id: 'availability', label: 'Availability' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      {/* Dynamic Navbar */}
      <nav className="fixed w-full z-[200] bg-[#0c3c8c] border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('home')}>
              <Logo size="sm" />
              <div>
                <span className="text-xl md:text-2xl font-oswald font-bold text-white tracking-wider">MECH-SPHERE</span>
                <span className="block text-[10px] font-bold text-[#f37021] tracking-widest uppercase">INDUSTRIES</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-1 items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded ${
                    view === item.id 
                      ? 'text-white bg-[#f37021] shadow-lg' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white p-2">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[210] lg:hidden animate-in slide-in-from-right-full duration-500">
             <div className="absolute inset-0 bg-[#0c3c8c]/95 backdrop-blur-xl">
               <div className="flex justify-between p-6 items-center">
                 <Logo size="sm" />
                 <button onClick={() => setIsMenuOpen(false)} className="text-white p-2"><X size={32} /></button>
               </div>
               <div className="flex flex-col space-y-4 p-8">
                 {navItems.map((item) => (
                   <button
                     key={item.id}
                     onClick={() => { setView(item.id); setIsMenuOpen(false); }}
                     className={`text-2xl font-oswald font-bold uppercase tracking-widest text-left p-4 border-b border-white/10 ${
                       view === item.id ? 'text-[#f37021]' : 'text-white'
                     }`}
                   >
                     {item.label}
                   </button>
                 ))}
               </div>
             </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main>
        {view === 'home' && <HomeView setView={setView} />}
        {view === 'about' && <AboutView />}
        {view === 'technical' && <TechnicalView />}
        {view === 'availability' && <AvailabilityView />}
        {view === 'gallery' && <GalleryView />}
        {view === 'contact' && <ContactView />}
      </main>

      {/* Global Footer */}
      <footer className="bg-[#0c3c8c] pt-20 pb-10 text-white relative overflow-hidden">
        <div className="blue-grid-bg absolute inset-0 opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="flex flex-col items-center md:items-start">
              <Logo size="sm" />
              <p className="mt-6 text-white/70 text-sm leading-relaxed text-center md:text-left">
                Mech-Sphere Industries is a premier manufacturer of high-precision hydraulic fittings and CNC components, dedicated to quality and engineering excellence since 2022.
              </p>
              <div className="flex space-x-4 mt-8">
                <a href="tel:+919902322017" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#f37021] transition-colors cursor-pointer">
                  <Phone size={18} />
                </a>
                <a href="mailto:mechsphere.industries@gmail.com" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#f37021] transition-colors cursor-pointer">
                  <Mail size={18} />
                </a>
                <a href="https://maps.app.goo.gl/3r8oTLDM2ckaxn4L7?g_st=aw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#f37021] transition-colors cursor-pointer">
                  <MapPin size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[#f37021] font-oswald font-bold uppercase tracking-widest mb-8 text-lg">Quick Navigation</h4>
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => setView(item.id)}
                      className="text-white/60 hover:text-white hover:translate-x-2 transition-all flex items-center space-x-2 uppercase text-xs font-bold tracking-widest"
                    >
                      <ChevronRight size={14} className="text-[#f37021]" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products & Services */}
            <div>
              <h4 className="text-[#f37021] font-oswald font-bold uppercase tracking-widest mb-8 text-lg">Our Expertise</h4>
              <ul className="space-y-4">
                {[
                  "Hydraulic Fittings",
                  "Hose Pipe Fittings",
                  "CNC Precision Parts",
                  "Custom Adaptors",
                  "Crimping Services",
                  "Technical Consulting"
                ].map((item) => (
                  <li key={item} className="text-white/60 flex items-center space-x-2 uppercase text-xs font-bold tracking-widest">
                    <div className="w-1.5 h-1.5 bg-[#f37021] rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-[#f37021] font-oswald font-bold uppercase tracking-widest mb-8 text-lg">Get In Touch</h4>
              <div className="space-y-6">
                <a href="https://maps.app.goo.gl/3r8oTLDM2ckaxn4L7?g_st=aw" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 hover:opacity-80 transition-opacity">
                  <MapPin size={20} className="text-[#f37021] flex-shrink-0 mt-1" />
                  <p className="text-white/60 text-xs leading-relaxed font-bold uppercase tracking-wider">
                    B446, Ground Floor, 1st Cross, Peenya Industrial Estate, Peenya 1st Stage, Bengaluru 560058
                  </p>
                </a>
                <a href="tel:+919902322017" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <Phone size={20} className="text-[#f37021] flex-shrink-0" />
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">+91 9902322017</p>
                </a>
                <a href="mailto:mechsphere.industries@gmail.com" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <Mail size={20} className="text-[#f37021] flex-shrink-0" />
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">mechsphere.industries@gmail.com</p>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-[0.5em] text-white/30">
             <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0">
               <span>Mech-Sphere Industries © {new Date().getFullYear()}</span>
               <span className="hidden md:inline text-white/10">|</span>
               <span>Registered MSME | ISO Standard Shop</span>
             </div>
             <span className="mt-6 md:mt-0 text-white/40">Design & Precision by "Young Couple"</span>
          </div>
        </div>
      </footer>

      {/* AI Assistant Chat Bubble */}
      <div className="fixed bottom-8 right-8 z-[250]">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-20 h-20 bg-[#f37021] text-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(243,112,33,0.4)] hover:scale-110 transition-transform group border-4 border-white animate-bounce-slow"
          >
            <MessageSquare size={32} />
          </button>
        ) : (
          <div className="w-80 sm:w-[450px] bg-white rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-500">
            <div className="bg-[#0c3c8c] p-8 flex justify-between items-center relative overflow-hidden">
              <div className="blue-grid-bg absolute inset-0 opacity-10"></div>
              <div className="flex items-center space-x-5 relative z-10">
                <div className="w-14 h-14 bg-[#f37021] rounded-2xl flex items-center justify-center shadow-lg">
                  <Settings size={24} className="text-white animate-spin-slow" />
                </div>
                <div>
                  <h5 className="text-white font-oswald font-bold text-xl tracking-widest uppercase leading-none">Technical AI</h5>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-white/60 text-[10px] uppercase font-black tracking-widest">Mech Life Support</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/60 hover:text-white p-2 relative z-10"><X size={28} /></button>
            </div>
            
            <div className="h-[450px] overflow-y-auto p-8 space-y-6 bg-slate-50/50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-6 py-4 rounded-3xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#0c3c8c] text-white rounded-tr-none shadow-xl font-medium' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 px-6 py-4 rounded-3xl rounded-tl-none shadow-sm">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-[#f37021] rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-[#f37021] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-[#f37021] rounded-full animate-bounce [animation-delay:-0.5s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-8 bg-white border-t border-slate-100 flex items-center space-x-4">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about thread sizes..."
                className="flex-1 bg-slate-100 border-none rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#f37021] transition-all"
              />
              <button 
                type="submit"
                disabled={!chatInput.trim() || isTyping}
                className="w-14 h-14 bg-[#0c3c8c] text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-[#f37021] transition-all"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 left-8 z-[150] flex flex-col space-y-4">
        <motion.a
          href="https://wa.me/919902322017"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/20 transition-all border-4 border-white"
          title="WhatsApp Us"
        >
          <MessageSquare size={32} />
        </motion.a>
        <motion.a
          href="tel:+919902322017"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-[#0c3c8c] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/20 transition-all border-4 border-white"
          title="Call Us"
        >
          <Phone size={32} />
        </motion.a>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .clip-path-hero-bottom {
          clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 100%);
        }
      `}</style>
    </div>
  );
};

export default App;
