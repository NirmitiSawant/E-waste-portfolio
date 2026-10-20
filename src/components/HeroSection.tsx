import React from 'react';
import { motion } from 'motion/react';
import { EWasteJourneyVideo } from './EWasteJourneyVideo';
import { ArrowDown, Sparkles, Leaf, Cpu, Recycle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToCards = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('choose-your-journey');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative z-10 w-full min-h-[92vh] flex flex-col justify-between pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Bar (Single-Row 3-Zone Contract) */}
      <div className="w-full flex items-center justify-between gap-6 pb-6 border-b border-[#2E8B57]/15">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#2E8B57] text-white flex items-center justify-center shadow-xs">
            <Recycle className="w-5 h-5 animate-spin-slow" />
          </div>
          <span className="font-display font-bold text-lg sm:text-xl text-[#263D32] tracking-tight whitespace-nowrap">
            EcoPortfolio
          </span>
        </div>

        {/* Zone 2: Quiet Text Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#647568]">
          <a
            href="#journey-video"
            className="hover:text-[#2E8B57] transition-colors whitespace-nowrap"
          >
            Environmental Journey
          </a>
          <a
            href="#choose-your-journey"
            className="hover:text-[#2E8B57] transition-colors whitespace-nowrap"
          >
            Choose Your Journey
          </a>
        </nav>

        {/* Zone 3: Primary Jump Action */}
        <button
          onClick={scrollToCards}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#2E8B57] text-white hover:bg-[#247045] transition-all cursor-pointer shadow-xs whitespace-nowrap"
        >
          View Cards ↓
        </button>
      </div>

      {/* Main Hero Split Grid: Text Column & Video Player Column */}
      <div className="my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column (5 cols on lg): Typographic Content */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          
          {/* Environmental Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#2E8B57] tracking-wider uppercase mb-3"
          >
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E8F7E8] border border-[#2E8B57]/20">
              <Leaf className="w-3.5 h-3.5" />
              Academic E-Portfolio
            </span>
          </motion.div>

          {/* Main Heading: E-WASTE & ENVIRONMENTAL MANAGEMENT */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] font-extrabold tracking-tight text-[#263D32]"
            style={{ textWrap: 'balance' }}
          >
            E-WASTE & ENVIRONMENTAL MANAGEMENT
          </motion.h1>

          {/* Subtitle: Transforming E-Waste into Environmental Awareness */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg sm:text-xl font-medium text-[#2E8B57]"
            style={{ textWrap: 'balance' }}
          >
            Transforming E-Waste into Environmental Awareness
          </motion.h2>

          {/* Small Introductory Text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-sm sm:text-base text-[#647568] leading-relaxed max-w-xl"
          >
            Every electronic device has a story. Discover how responsible choices can create a greener future.
          </motion.p>

          {/* Academic Highlights & Environmental Keys (Unboxed metadata with separators) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-2 text-xs text-[#647568]"
          >
            <span className="flex items-center gap-1 text-[#263D32] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" /> Circular Tech
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1 text-[#263D32] font-medium">
              <Cpu className="w-3.5 h-3.5 text-[#3A9DCC]" /> Resource Recovery
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1 text-[#263D32] font-medium">
              <Recycle className="w-3.5 h-3.5 text-[#2E8B57]" /> Ecological Balance
            </span>
          </motion.div>

          {/* Scroll Indicator: EXPLORE THE EXPERIENCE ↓ */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 pt-4"
          >
            <a
              href="#choose-your-journey"
              onClick={scrollToCards}
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E8B57] hover:text-[#247045] transition-colors"
            >
              <span>EXPLORE THE EXPERIENCE ↓</span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="w-7 h-7 rounded-full bg-[#E8F7E8] flex items-center justify-center text-[#2E8B57] group-hover:bg-[#2E8B57] group-hover:text-white transition-colors"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.span>
            </a>
          </motion.div>

        </div>

        {/* Right Column (7 cols on lg): The Animated Journey Video */}
        <div id="journey-video" className="lg:col-span-7 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Soft Ambient Sunlight Halo Behind Player */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#2E8B57]/15 via-[#FFD166]/15 to-[#3A9DCC]/15 blur-lg opacity-80 pointer-events-none" />

            {/* Video Component */}
            <EWasteJourneyVideo />
          </motion.div>
        </div>

      </div>
    </header>
  );
};
