/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { HeroSection } from './components/HeroSection';
import { ThreeCardsSection } from './components/ThreeCardsSection';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#FFFDF5] text-[#263D32] selection:bg-[#E8F7E8] selection:text-[#2E8B57] overflow-x-hidden">
      {/* Botanical & Electronic Ambient Layer */}
      <AmbientBackground />

      <main className="relative z-10 flex flex-col">
        {/* SECTION 1 — CINEMATIC E-WASTE HERO SECTION WITH JOURNEY VIDEO */}
        <HeroSection />

        {/* SECTION 2 — THREE LINKED CARDS */}
        <ThreeCardsSection />
      </main>
    </div>
  );
}
