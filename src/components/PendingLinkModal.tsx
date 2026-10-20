import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, Code2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PendingLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardTitle: string;
  variableName: 'PORTFOLIO_URL' | 'FORGOTTEN_DRAWER_URL' | 'EWASTE_DETECTIVE_URL';
  currentValue: string;
  onTestUrl?: (testUrl: string) => void;
}

export const PendingLinkModal: React.FC<PendingLinkModalProps> = ({
  isOpen,
  onClose,
  cardTitle,
  variableName,
  currentValue,
  onTestUrl,
}) => {
  const [testInput, setTestInput] = useState('');
  const [testSuccess, setTestSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRunTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput.trim()) return;
    const url = testInput.startsWith('http://') || testInput.startsWith('https://') 
      ? testInput 
      : `https://${testInput}`;
    
    if (onTestUrl) {
      onTestUrl(url);
    }
    window.open(url, '_blank', 'noopener,noreferrer');
    setTestSuccess(true);
    setTimeout(() => {
      setTestSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md rounded-2xl bg-[#FFFDF5] border border-[#2E8B57]/30 p-6 shadow-2xl text-[#263D32]"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#E8F7E8] text-[#2E8B57]">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#263D32]">
                  Link Pending Configuration
                </h3>
                <p className="text-xs text-[#647568]">
                  {cardTitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#647568] hover:text-[#263D32] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Explanation */}
          <div className="mt-4 space-y-3 text-xs leading-relaxed text-[#263D32]">
            <p>
              This card is reserved for your project destination. Navigation is currently disabled to prevent broken redirects until your URL is configured.
            </p>

            {/* Variable Box */}
            <div className="rounded-xl bg-white border border-[#2E8B57]/20 p-3 shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-[#647568] mb-1 font-mono">
                <span className="flex items-center gap-1 text-[#2E8B57] font-semibold">
                  <Code2 className="w-3.5 h-3.5" /> src/config/portfolioLinks.ts
                </span>
                <span>Config variable</span>
              </div>
              <div className="font-mono text-xs font-bold text-[#263D32] bg-[#E8F7E8] px-2.5 py-1.5 rounded-lg border border-[#2E8B57]/15 break-all">
                {variableName} = &quot;{currentValue || 'ADD_URL_HERE'}&quot;
              </div>
            </div>

            <p className="text-[#647568]">
              Once you set your URL in <code className="px-1 py-0.5 rounded bg-slate-100 font-mono text-[11px] text-[#263D32]">src/config/portfolioLinks.ts</code>, clicking this card will immediately open the destination in a new browser tab.
            </p>
          </div>

          {/* Live Link Test Form */}
          <form onSubmit={handleRunTest} className="mt-4 pt-4 border-t border-[#2E8B57]/15">
            <label className="block text-[11px] font-semibold text-[#263D32] mb-1">
              Want to test a destination right now?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://example.edu/my-project"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#2E8B57] bg-white"
              />
              <button
                type="submit"
                disabled={!testInput.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2E8B57] text-white text-xs font-semibold hover:bg-[#247045] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs shrink-0"
              >
                {testSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Opened!
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3.5 h-3.5" /> Test Link
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Dismiss button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-[#263D32] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
