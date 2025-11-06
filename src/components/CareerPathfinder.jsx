import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Wand2, CheckCircle2, Loader2 } from 'lucide-react';
import ProcessingAnimation from './ProcessingAnimation.jsx';

export default function CareerPathfinder({ onProcessingToggle }) {
  const [phase, setPhase] = useState('idle'); // idle | processing | results
  const [fileName, setFileName] = useState('');
  const [matches, setMatches] = useState([]);
  const inputRef = useRef(null);

  const mockProcess = async (file) => {
    setPhase('processing');
    onProcessingToggle?.(true);

    // Simulate processing delay with staged UX
    await new Promise((r) => setTimeout(r, 2200));

    // Generate playful mock results
    const sample = [
      {
        title: 'AI Prototyping Engineer — Spatial Interfaces',
        company: 'Aurora Labs',
        tags: ['React', 'Three.js', 'LLMs', 'OpenCV'],
        score: 94,
        desc: 'Prototype human-in-the-loop spatial tools that blend LLMs with real‑time 3D interfaces.'
      },
      {
        title: 'Founding Engineer — Agentic Systems',
        company: 'Frontier Forge',
        tags: ['Python', 'FastAPI', 'Vector DB', 'RAG'],
        score: 91,
        desc: 'Own the stack for agent orchestration across research, data pipelines, and evals.'
      },
      {
        title: 'Creative Technologist — Synthetic Media',
        company: 'Neon Studio',
        tags: ['WebGL', 'Diffusion', 'Node Graphs', 'CUDA'],
        score: 88,
        desc: 'Design and ship real‑time, generative media systems with delightfully weird UX.'
      }
    ];

    setMatches(sample);
    setPhase('results');
    onProcessingToggle?.(false);
  };

  const onDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      await mockProcess(file);
    }
  };

  const onChange = async (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      await mockProcess(file);
    }
  };

  const reset = () => {
    setPhase('idle');
    setMatches([]);
    setFileName('');
  };

  return (
    <section id="pathfinder" className="relative max-w-6xl mx-auto px-6 py-14">
      <div className="absolute inset-0 -z-[0] bg-[radial-gradient(800px_400px_at_20%_10%,rgba(129,140,248,0.15),transparent),radial-gradient(700px_400px_at_90%_20%,rgba(236,72,153,0.14),transparent)]" />

      <div className="flex items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold">Career Pathfinder</h2>
          <p className="text-white/70 mt-2">Upload your resume and let films.blue AI map you to frontier roles.</p>
        </div>
        {phase !== 'idle' && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={reset}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm"
          >
            Reset
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="relative grid md:grid-cols-2"
            >
              {/* Dropzone */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 grid place-items-center">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Drop your resume (PDF)</h3>
                    <p className="text-white/60 text-sm">or click to select a file</p>
                  </div>
                </div>

                <button
                  onClick={() => inputRef.current?.click()}
                  className="mt-6 w-full md:w-auto px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 transition"
                >
                  Choose File
                </button>
                <input ref={inputRef} type="file" accept="application/pdf" onChange={onChange} className="hidden" />

                <ul className="mt-6 space-y-2 text-sm text-white/60">
                  <li className="flex items-center gap-2"><Wand2 className="h-4 w-4" /> We parse skills, projects, and impact.</li>
                  <li className="flex items-center gap-2"><FileText className="h-4 w-4" /> Private by default — stays in your session.</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Mapped to roles shaping the frontier.</li>
                </ul>

                {fileName && <p className="mt-4 text-sm text-white/70">Selected: {fileName}</p>}
              </div>

              {/* Visual panel */}
              <div className="relative min-h-[260px] md:min-h-[420px] bg-gradient-to-br from-violet-950/40 via-fuchsia-950/30 to-cyan-900/20">
                <div className="absolute inset-0 opacity-60">
                  <ProcessingAnimation ambientOnly />
                </div>
                <div className="relative h-full w-full flex flex-col items-center justify-center text-center p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="backdrop-blur-md rounded-xl border border-white/10 px-5 py-4 bg-black/30"
                  >
                    <p className="text-white/80">Drag & Drop your PDF here</p>
                    <p className="text-xs text-white/60">We’ll craft a role map just for you</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0"
          >
            <div className="p-6 md:p-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Synthesizing your trajectory</h3>
                <p className="text-white/70">Aligning skills with frontier demand signals</p>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Loader2 className="h-4 w-4 animate-spin" /> Processing
              </div>
            </div>
            <ProcessingAnimation />
          </motion.div>
        )}

        {phase === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <div className="p-6 md:p-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Your Matches</h3>
                <p className="text-white/70">Roles that resonate with your skills and signal potential</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={reset}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm"
              >
                Try another resume
              </motion.button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 p-6 md:p-8">
              {matches.map((m, idx) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="relative rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold leading-snug">{m.title}</h4>
                      <p className="text-white/70 text-sm">{m.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/70">Match</span>
                      <span className="px-2 py-1 text-sm rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-200">
                        {m.score}%
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-white/70 text-sm">{m.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {m.tags.map((t) => (
                      <span key={t} className="px-2 py-1 text-xs rounded bg-white/10 border border-white/10 text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Glow accent */}
                  <div className="absolute -inset-px rounded-xl pointer-events-none bg-gradient-to-br from-violet-500/0 via-fuchsia-500/0 to-cyan-500/0 [mask-image:radial-gradient(200px_140px_at_80%_0%,black,transparent)]" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About blurb */}
      <div id="about" className="mt-16 grid md:grid-cols-3 gap-6">
        <InfoCard
          title="Frontier‑first"
          text="We optimize for roles at the creative edge — where AI, spatial, and systems thinking collide."
        />
        <InfoCard
          title="Signal‑driven"
          text="We transform your experience into vectors and match against live demand signals."
        />
        <InfoCard
          title="Human‑in‑the‑loop"
          text="You stay in control — refine goals and we adapt the trajectory with you."
        />
      </div>

      <div id="contact" className="mt-12 text-center text-white/60 text-sm">Reach out: hello@films.blue</div>
    </section>
  );
}

function InfoCard({ title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <h4 className="font-medium">{title}</h4>
      <p className="text-white/70 text-sm mt-2">{text}</p>
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-violet-500/0 via-fuchsia-500/0 to-cyan-500/0 [mask-image:radial-gradient(400px_160px_at_80%_0%,black,transparent)]" />
    </motion.div>
  );
}
