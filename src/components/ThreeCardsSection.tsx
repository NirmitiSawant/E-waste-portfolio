import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, BookOpen, Archive, Search, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_CONFIG, isUrlConfigured } from '../config/portfolioLinks';
import { PendingLinkModal } from './PendingLinkModal';

// High-Fidelity Domain Illustrations generated for each card
const CARD_IMAGES = {
  portfolio: "/src/assets/images/card_portfolio_illustration_1792506009021.jpg",
  drawer: "/src/assets/images/card_drawer_illustration_1792506010639.jpg",
  detective: "/src/assets/images/card_detective_illustration_1792506011387.jpg",
};

interface CardData {
  id: 'portfolio' | 'drawer' | 'detective';
  title: string;
  category: string;
  description: string;
  buttonText: string;
  variableName: 'PORTFOLIO_URL' | 'FORGOTTEN_DRAWER_URL' | 'EWASTE_DETECTIVE_URL';
  url: string;
  imageSrc: string;
  imageAlt: string;
  accentColor: string;
  accentBorder: string;
  accentBadgeBg: string;
  accentBadgeText: string;
  accentButton: string;
  ringColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ThreeCardsSection: React.FC = () => {
  const [activeModal, setActiveModal] = useState<{
    isOpen: boolean;
    cardTitle: string;
    variableName: 'PORTFOLIO_URL' | 'FORGOTTEN_DRAWER_URL' | 'EWASTE_DETECTIVE_URL';
    currentValue: string;
  }>({
    isOpen: false,
    cardTitle: '',
    variableName: 'PORTFOLIO_URL',
    currentValue: '',
  });

  const cards: CardData[] = [
    {
      id: 'portfolio',
      title: 'Explore My Portfolio',
      category: 'Academic Portfolio',
      description: 'Explore my academic assignments, reports, activities and E-Waste learning journey.',
      buttonText: 'Explore Portfolio →',
      variableName: 'PORTFOLIO_URL',
      url: PORTFOLIO_CONFIG.PORTFOLIO_URL,
      imageSrc: CARD_IMAGES.portfolio,
      imageAlt: 'Academic notebook with environmental research reports, modern laptop, and intertwining botanical green leaves',
      accentColor: '#2E8B57', // Leaf green
      accentBorder: 'border-[#2E8B57]/30 hover:border-[#2E8B57]',
      accentBadgeBg: 'bg-[#E8F7E8]',
      accentBadgeText: 'text-[#2E8B57]',
      accentButton: 'bg-[#2E8B57] group-hover:bg-[#247045] text-white shadow-[#2E8B57]/20',
      ringColor: 'focus-visible:ring-[#2E8B57]',
      icon: BookOpen,
    },
    {
      id: 'drawer',
      title: 'The Forgotten Drawer',
      category: 'Interactive E-Waste Game',
      description: 'Discover forgotten electronics and uncover the hidden stories behind unused gadgets.',
      buttonText: 'Open the Drawer →',
      variableName: 'FORGOTTEN_DRAWER_URL',
      url: PORTFOLIO_CONFIG.FORGOTTEN_DRAWER_URL,
      imageSrc: CARD_IMAGES.drawer,
      imageAlt: 'Vintage open drawer packed with forgotten smartphones, tangled charger cables, and circuit boards',
      accentColor: '#3A9DCC', // Sky blue / Ocean blue
      accentBorder: 'border-[#3A9DCC]/30 hover:border-[#3A9DCC]',
      accentBadgeBg: 'bg-[#DDF2FF]',
      accentBadgeText: 'text-[#3A9DCC]',
      accentButton: 'bg-[#3A9DCC] group-hover:bg-[#2e82ab] text-white shadow-[#3A9DCC]/20',
      ringColor: 'focus-visible:ring-[#3A9DCC]',
      icon: Archive,
    },
    {
      id: 'detective',
      title: 'E-Waste Detective',
      category: 'Environmental Mystery Game',
      description: 'Investigate an animated city, discover electronic waste, follow clues and solve environmental mysteries.',
      buttonText: 'Start Investigation →',
      variableName: 'EWASTE_DETECTIVE_URL',
      url: PORTFOLIO_CONFIG.EWASTE_DETECTIVE_URL,
      imageSrc: CARD_IMAGES.detective,
      imageAlt: 'Friendly environmental detective with magnifying glass examining e-waste components in a green city',
      accentColor: '#FF8A65', // Sunshine yellow & Coral accents
      accentBorder: 'border-[#FF8A65]/40 hover:border-[#FF8A65]',
      accentBadgeBg: 'bg-[#FFF4E5]',
      accentBadgeText: 'text-[#FF8A65]',
      accentButton: 'bg-gradient-to-r from-[#FF8A65] to-[#FFD166] text-[#263D32] group-hover:opacity-95 font-bold shadow-[#FF8A65]/20',
      ringColor: 'focus-visible:ring-[#FF8A65]',
      icon: Search,
    },
  ];

  return (
    <section id="choose-your-journey" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        {/* Section Heading: CHOOSE YOUR JOURNEY */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#263D32]"
        >
          CHOOSE YOUR JOURNEY
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-base sm:text-lg text-[#647568] max-w-2xl mx-auto font-normal"
        >
          Explore my academic work or experience e-waste through interactive games.
        </motion.p>
      </div>

      {/* Exactly Three Beautiful Animated Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {cards.map((card, index) => {
          const isConfigured = isUrlConfigured(card.url);
          const Icon = card.icon;

          return (
            <motion.a
              key={card.id}
              href={isConfigured ? card.url : '#'}
              target={isConfigured ? "_blank" : undefined}
              rel={isConfigured ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`group flex flex-col justify-between rounded-2xl bg-white border-2 ${card.accentBorder} p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden text-left focus:outline-hidden focus-visible:ring-3 ${card.ringColor} focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFFDF5]`}
              onClick={(e) => {
                if (!isConfigured) {
                  e.preventDefault();
                  setActiveModal({
                    isOpen: true,
                    cardTitle: card.title,
                    variableName: card.variableName,
                    currentValue: card.url,
                  });
                }
              }}
              aria-label={`${card.title}: ${card.description} (opens in a new tab)`}
            >
              {/* Top Accent Glow on Card */}
              <div
                className="absolute top-0 inset-x-0 h-1.5 transition-all duration-300"
                style={{ backgroundColor: card.accentColor }}
              />

              {/* Card Content Top Zone */}
              <div>
                {/* Meta and Status Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${card.accentBadgeBg} ${card.accentBadgeText} flex items-center gap-1.5`}>
                    <Icon className="w-3 h-3" />
                    {card.category}
                  </span>

                  {/* Connected Status indicator */}
                  <span className="flex items-center gap-1 text-[11px] text-[#2E8B57] font-medium" title="Live Website Connected">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Connected</span>
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#263D32] group-hover:text-[#2E8B57] transition-colors duration-200">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="mt-2 text-sm text-[#647568] leading-relaxed">
                  {card.description}
                </p>

                {/* Artwork / Illustration Container with floating effect */}
                <div className="mt-5 relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FFFDF5] border border-slate-200 shadow-inner">
                  {/* Floating reacting image */}
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Fallback SVG container behind image */}
                  <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#FFFDF5] to-[#E8F7E8] text-[#2E8B57]">
                    <Icon className="w-12 h-12 mb-2 opacity-50" />
                    <span className="text-xs font-semibold">{card.title}</span>
                  </div>

                  {/* Subtle botanical border vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>

              {/* Card Action Button (accessible child styled button) */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div
                  className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${card.accentButton}`}
                >
                  <span>{card.buttonText}</span>
                  <ExternalLink className="w-4 h-4 ml-0.5 opacity-90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Link Configuration Helper Dialog (fallback if config is edited) */}
      <PendingLinkModal
        isOpen={activeModal.isOpen}
        onClose={() => setActiveModal((prev) => ({ ...prev, isOpen: false }))}
        cardTitle={activeModal.cardTitle}
        variableName={activeModal.variableName}
        currentValue={activeModal.currentValue}
      />
    </section>
  );
};
