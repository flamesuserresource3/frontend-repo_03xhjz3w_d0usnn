import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md/30 bg-black/20 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="absolute inset-0 blur-md bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-60" />
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 grid place-items-center shadow-[0_8px_30px_rgb(93,0,255,0.45)]">
              <Rocket className="h-5 w-5" />
            </div>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-wide">films.blue</span>
              <Sparkles className="h-4 w-4 text-fuchsia-300" />
            </div>
            <span className="text-xs text-white/60">AI for Frontier Builders</span>
          </div>
        </motion.a>

        <nav className="hidden md:flex items-center gap-6 text-white/70">
          <a href="#pathfinder" className="hover:text-white transition-colors">Career Pathfinder</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        <motion.a
          href="#pathfinder"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 transition-colors"
        >
          Launch App
        </motion.a>
      </div>
    </header>
  );
}
