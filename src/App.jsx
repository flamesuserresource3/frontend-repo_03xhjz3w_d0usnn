import { motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import CareerPathfinder from './components/CareerPathfinder.jsx';
import ProcessingAnimation from './components/ProcessingAnimation.jsx';
import { useState } from 'react';

export default function App() {
  const [isProcessingVisual, setIsProcessingVisual] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0b10] via-[#0b0f1a] to-[#0a0b10] text-white overflow-x-hidden">
      <Navbar />

      <main className="relative">
        <Hero />

        {/* Subtle divider with glow */}
        <div className="relative h-px w-11/12 max-w-6xl mx-auto my-10 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full" />

        <section className="relative z-10">
          <CareerPathfinder onProcessingToggle={setIsProcessingVisual} />
        </section>

        {/* Ambient processing visual overlay when active */}
        {isProcessingVisual && (
          <div className="fixed inset-0 pointer-events-none">
            <ProcessingAnimation ambientOnly />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative mt-24 py-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(93,0,255,0.12),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white/70"
          >
            © {new Date().getFullYear()} films.blue AI — Building for the Frontier.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 text-sm text-white/60"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_18px_4px_rgba(16,185,129,0.35)]" />
            Systems Operational
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
