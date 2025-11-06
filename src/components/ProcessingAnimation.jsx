import { motion } from 'framer-motion';

export default function ProcessingAnimation({ ambientOnly = false }) {
  const container = (
    <div className={`relative ${ambientOnly ? 'fixed inset-0' : 'w-full h-72 rounded-2xl'} overflow-hidden`}>      
      {/* Nebula background */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(168,85,247,0.15),transparent),radial-gradient(800px_400px_at_80%_80%,rgba(34,211,238,0.12),transparent)]" />

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ backgroundPosition: ['0px 0px', '200px 120px', '0px 0px'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />

      {/* Orbiting nodes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_6px_rgba(34,211,238,0.35)]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 1, 0.2],
            x: [0, Math.sin(i) * 140, Math.cos(i) * -140, 0],
            y: [0, Math.cos(i) * 90, Math.sin(i) * -90, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 5 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: `${30 + i * 6}%`, left: `${20 + (i % 4) * 18}%` }}
        />
      ))}

      {/* Center pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-28 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 backdrop-blur-xl border border-white/10"
        animate={{ scale: [0.95, 1.05, 0.95], boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 70px rgba(167,139,250,0.45)', '0 0 0 rgba(0,0,0,0)'] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      />

      {/* Data beams */}
      {[...Array(4)].map((_, idx) => (
        <motion.div
          key={idx}
          className="absolute left-0 right-0 mx-auto h-[2px] w-0.5 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: ['0%', '90%', '0%'], opacity: [0, 1, 0] }}
          transition={{ duration: 2 + idx * 0.3, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
          style={{ top: `${30 + idx * 12}%` }}
        />
      ))}

      {!ambientOnly && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <motion.h3
            className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Parsing signals from your timeline…
          </motion.h3>
          <motion.p
            className="mt-2 text-white/70 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We translate your experience into vectors and map them to future‑forward roles.
          </motion.p>
        </div>
      )}
    </div>
  );

  return container;
}
