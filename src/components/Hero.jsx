import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full">
      {/* 3D Spline scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0b0f1a] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0f1a] to-transparent pointer-events-none" />

      {/* Headline */}
      <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-3/4"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Build for the Frontier with
            <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300">films.blue AI</span>
          </h1>
          <p className="mt-4 text-white/70 md:text-lg">
            A creative engine for developers exploring the edge of possibility. Upload a resume and we map your trajectory into cutting‑edge roles across AI, spatial, and cybernetic tech.
          </p>
          <motion.a
            href="#pathfinder"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_10px_40px_rgba(93,0,255,0.35)]"
          >
            Start Career Pathfinder
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
