import { useMemo } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Sparkles, Award, ShieldCheck, Brain, Code } from 'lucide-react'

function GlassCard({ children, className = '' }) {
  return (
    <div className={`relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl ${className}`}>
      {/* frosted highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-60" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default function App() {
  const navLinks = useMemo(
    () => [
      { href: '#home', label: 'Home' },
      { href: '#about', label: 'About' },
      { href: '#projects', label: 'Projects' },
      { href: '#skills', label: 'Skills' },
      { href: '#contact', label: 'Contact' },
    ],
    []
  )

  return (
    <div id="home" className="min-h-screen w-full text-white bg-[radial-gradient(1350px_750px_at_0%_10%,rgba(59,130,246,0.20),transparent),radial-gradient(800px_450px_at_100%_0%,rgba(168,85,247,0.25),transparent),linear-gradient(180deg,#0B1020_0%,#0A0E1A_100%)]">
      {/* Subtle noise and glow overlay */}
      <div className="pointer-events-none fixed inset-0 mix-blend-screen opacity-30 [background:radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_40%)]" />

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4">
              <a href="#home" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <Sparkles size={18} className="text-blue-300" />
                <span>Shreyash</span>
              </a>
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} className="text-white/80 hover:text-white transition-colors">
                    {l.label}
                  </a>
                ))}
                <div className="ml-2 flex items-center gap-3">
                  <a href="https://github.com/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
                    <Github size={18} />
                  </a>
                  <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
                    <Linkedin size={18} />
                  </a>
                  <a href="#contact" className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
                    <Mail size={18} />
                  </a>
                </div>
              </nav>
              <a href="#projects" className="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500/80 to-purple-500/80 px-4 py-2 text-sm font-medium shadow-lg hover:from-blue-500 hover:to-purple-500">
                View Work <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with 3D Spline */}
      <section className="relative pt-32 md:pt-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
            <GlassCard className="p-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                Building sleek, modern web experiences
              </h1>
              <p className="mt-4 text-white/80 text-lg">
                I craft fast, accessible interfaces with a focus on design systems, motion, and delightful details.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-5 py-3 text-sm font-semibold shadow-lg hover:shadow-xl">
                  Explore Projects <ExternalLink size={16} />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/20">
                  Contact Me <Mail size={16} />
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1"><ShieldCheck size={14} /> Glassmorphism</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1"><Brain size={14} /> Modern UX</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1"><Code size={14} /> React • Tailwind</span>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="order-1 lg:order-2 h-[380px] sm:h-[460px] md:h-[520px] rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
            <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </motion.div>
        </div>

        {/* gradient accents */}
        <div className="pointer-events-none absolute -top-24 left-0 right-0 -z-0">
          <div className="mx-auto h-72 max-w-5xl rounded-full bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-purple-500/30 blur-3xl" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <GlassCard className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="shrink-0 h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 p-[2px]">
                  <div className="h-full w-full rounded-2xl bg-slate-950/70 backdrop-blur-xl grid place-items-center text-2xl font-bold">
                    S
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">Hi, I’m Shreyash</h2>
                  <p className="mt-2 text-white/80">
                    Frontend developer passionate about clean design, smooth micro-interactions, and performant web apps. I enjoy turning ideas into delightful digital products.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative py-8 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12 flex items-center gap-3">
            <Award className="text-blue-300" />
            <h3 className="text-2xl md:text-3xl font-bold">Featured Projects</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* CertiSwift */}
            <motion.a initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 }} href="#" className="group">
              <GlassCard className="h-full overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-blue-500/40 to-purple-500/40">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.18),transparent_35%)]" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold">CertiSwift</h4>
                    <ExternalLink size={18} className="opacity-70 group-hover:opacity-100" />
                  </div>
                  <p className="mt-2 text-sm text-white/80">
                    Instant certificate generation and verification platform with a clean, glassmorphic interface.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/80">
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1">React</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1">Tailwind</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1">FastAPI</span>
                  </div>
                </div>
              </GlassCard>
            </motion.a>

            {/* QuizMaster */}
            <motion.a initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }} href="#" className="group">
              <GlassCard className="h-full overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-emerald-500/40 to-teal-500/40">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.22),transparent_40%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.18),transparent_35%)]" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold">QuizMaster</h4>
                    <ExternalLink size={18} className="opacity-70 group-hover:opacity-100" />
                  </div>
                  <p className="mt-2 text-sm text-white/80">
                    A modular quiz platform with categories, timers, and analytics. Smooth animations and blazing-fast UX.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/80">
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1">React</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1">Framer Motion</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1">MongoDB</span>
                  </div>
                </div>
              </GlassCard>
            </motion.a>

            {/* Another sample project */}
            <motion.a initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.15 }} href="#" className="group">
              <GlassCard className="h-full overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-pink-500/40 to-rose-500/40">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(255,255,255,0.22),transparent_40%),radial-gradient(circle_at_0%_100%,rgba(255,255,255,0.18),transparent_35%)]" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold">UI Motion Lab</h4>
                    <ExternalLink size={18} className="opacity-70 group-hover:opacity-100" />
                  </div>
                  <p className="mt-2 text-sm text-white/80">
                    A collection of polished UI motion experiments exploring micro-interactions and glassmorphism.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/80">
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1">Design</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1">Animation</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-1">UX</span>
                  </div>
                </div>
              </GlassCard>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative py-8 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12 flex items-center gap-3">
            <Code className="text-blue-300" />
            <h3 className="text-2xl md:text-3xl font-bold">Skills & Tools</h3>
          </div>

          <GlassCard className="p-6 md:p-8">
            <div className="flex flex-wrap gap-2 text-sm">
              {['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'FastAPI', 'MongoDB', 'TypeScript', 'Node', 'Git', 'Figma'].map((s) => (
                <span key={s} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white/90">
                  {s}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-8 md:py-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12 flex items-center gap-3">
            <Mail className="text-blue-300" />
            <h3 className="text-2xl md:text-3xl font-bold">Let’s collaborate</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="p-6 lg:col-span-2">
              <p className="text-white/85">Have a project in mind or want to say hi? Drop me a message.</p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input placeholder="Your name" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder:text-white/60" />
                <input placeholder="Email" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder:text-white/60" />
                <textarea rows={4} placeholder="Message" className="sm:col-span-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder:text-white/60" />
                <a href="mailto:hello@example.com" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 text-sm font-semibold shadow-lg hover:shadow-xl sm:col-span-2">
                  Send Message
                </a>
              </div>
            </GlassCard>

            <div className="space-y-6">
              <GlassCard className="p-6">
                <h4 className="font-semibold">Connect</h4>
                <div className="mt-4 flex items-center gap-3">
                  <a href="https://github.com/" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/10 hover:bg-white/20">
                    <Github size={18} />
                  </a>
                  <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/10 hover:bg-white/20">
                    <Linkedin size={18} />
                  </a>
                  <a href="mailto:hello@example.com" className="p-3 rounded-xl bg-white/10 hover:bg-white/20">
                    <Mail size={18} />
                  </a>
                </div>
              </GlassCard>
              <GlassCard className="p-6">
                <h4 className="font-semibold">Availability</h4>
                <p className="mt-2 text-white/80">Open to freelance and full-time opportunities.</p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10/20 py-8 text-center text-white/60">
        © {new Date().getFullYear()} Shreyash • Designed with glassmorphism and 3D
      </footer>
    </div>
  )
}
