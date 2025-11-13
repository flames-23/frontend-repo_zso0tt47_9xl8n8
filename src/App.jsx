import { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Sparkles, Award, ShieldCheck, Brain, Code, CheckCircle2, XCircle, RefreshCw, Info } from 'lucide-react'

function GlassCard({ children, className = '' }) {
  return (
    <div className={`relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 to-transparent opacity-60" />
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

  // Spline scene swapping
  const defaultScene = 'https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode'
  const envScene = import.meta.env.VITE_SPLINE_SCENE || ''
  const [sceneUrl, setSceneUrl] = useState(() => localStorage.getItem('splineScene') || envScene || defaultScene)
  const [customScene, setCustomScene] = useState('')

  useEffect(() => {
    // keep localStorage in sync
    if (sceneUrl) localStorage.setItem('splineScene', sceneUrl)
  }, [sceneUrl])

  const applyCustomScene = () => {
    const url = customScene.trim()
    if (!url) return
    setSceneUrl(url)
  }

  const toggleScene = () => {
    // quick swap between default and env/custom
    if (sceneUrl === defaultScene && (envScene || localStorage.getItem('splineScene'))) {
      setSceneUrl(envScene || localStorage.getItem('splineScene') || defaultScene)
    } else {
      setSceneUrl(defaultScene)
    }
  }

  // Contact form + health check
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)
  const [status, setStatus] = useState(null) // {type, message}
  const [loading, setLoading] = useState(false)

  const [emailHealth, setEmailHealth] = useState(null)
  const [checkingHealth, setCheckingHealth] = useState(false)

  const handleCheckEmail = async () => {
    const base = import.meta.env.VITE_BACKEND_URL || ''
    try {
      setCheckingHealth(true)
      const res = await fetch(`${base}/api/contact/health`)
      const data = await res.json()
      setEmailHealth(data)
    } catch (e) {
      setEmailHealth({ error: 'Unable to reach backend health endpoint.' })
    } finally {
      setCheckingHealth(false)
    }
  }

  const handleSend = async () => {
    const name = nameRef.current?.value?.trim()
    const email = emailRef.current?.value?.trim()
    const msg = messageRef.current?.value?.trim()

    if (!name || !email || !msg) {
      setStatus({ type: 'error', message: 'Please fill in your name, email, and message.' })
      return
    }

    setLoading(true)
    setStatus(null)

    const base = import.meta.env.VITE_BACKEND_URL || ''
    try {
      const res = await fetch(`${base}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: msg }),
      })
      const data = await res.json()
      if (res.ok && data?.ok) {
        if (data.email_dispatched) {
          setStatus({ type: 'ok', message: 'Message sent! Check your inbox.' })
        } else if (data.error === 'SMTP not configured') {
          setStatus({ type: 'error', message: 'Saved to inbox queue. Email not sent because SMTP is not configured.' })
        } else {
          setStatus({ type: 'error', message: 'Saved, but email delivery failed. You can use the mail app fallback below.' })
        }
        if (nameRef.current) nameRef.current.value = ''
        if (emailRef.current) emailRef.current.value = ''
        if (messageRef.current) messageRef.current.value = ''
      } else {
        throw new Error(data?.error || 'Failed to send')
      }
    } catch (e) {
      const subject = `Collaboration request from ${name}`
      const body = [`Name: ${name}`, `Email: ${email}`, '', 'Message:', msg].join('\n')
      const mailto = `mailto:shreyash@certiswift.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailto
      setStatus({ type: 'error', message: 'Direct send failed – opening your email client.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="home" className="min-h-screen w-full text-white bg-[radial-gradient(1350px_750px_at_0%_10%,rgba(239,68,68,0.20),transparent),radial-gradient(800px_450px_at_100%_0%,rgba(244,63,94,0.25),transparent),linear-gradient(180deg,#070709_0%,#0A0A0B_100%)]">
      <div className="pointer-events-none fixed inset-0 mix-blend-screen opacity-30 [background:radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.10),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.06),transparent_40%)]" />

      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4">
              <a href="#home" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <Sparkles size={18} className="text-red-300" />
                <span>Shreyash Tailor</span>
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
              <a href="#projects" className="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500/80 to-rose-500/80 px-4 py-2 text-sm font-medium shadow-lg hover:from-red-500 hover:to-rose-500">
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
                Crafting bold, modern web experiences
              </h1>
              <p className="mt-4 text-white/80 text-lg">
                I design and build fast, accessible interfaces with a focus on motion and delightful details.
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

          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="order-1 lg:order-2 h-[380px] sm:h-[460px] md:h-[520px] rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden relative">
            <Spline scene={sceneUrl} style={{ width: '100%', height: '100%' }} />

            {/* Quick swap controls */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row gap-2">
              <button onClick={toggleScene} className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs hover:bg-black/40">
                <RefreshCw size={14} /> Swap Scene
              </button>
              <div className="flex-1 flex items-stretch gap-2">
                <input value={customScene} onChange={(e) => setCustomScene(e.target.value)} placeholder="Paste Spline scene URL and Apply" className="flex-1 rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-xs placeholder:text-white/60" />
                <button onClick={applyCustomScene} className="rounded-lg bg-gradient-to-r from-red-500 to-rose-600 px-3 py-2 text-xs font-medium">Apply</button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute -top-24 left-0 right-0 -z-0">
          <div className="mx-auto h-72 max-w-5xl rounded-full bg-gradient-to-r from-red-500/30 via-rose-500/20 to-amber-500/20 blur-3xl" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <GlassCard className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="shrink-0 h-20 w-20 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-[2px]">
                  <div className="h-full w-full rounded-2xl bg-black/60 backdrop-blur-xl grid place-items-center text-xl font-bold tracking-tight">
                    ST
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">Hi, I’m Shreyash Tailor</h2>
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
            <Award className="text-red-300" />
            <h3 className="text-2xl md:text-3xl font-bold">Featured Projects</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* CertiSwift */}
            <motion.a initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 }} href="#" className="group">
              <GlassCard className="h-full overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-red-500/40 to-rose-600/40">
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
                <div className="relative h-40 bg-gradient-to-br from-rose-500/40 to-amber-600/30">
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
                <div className="relative h-40 bg-gradient-to-br from-neutral-700/50 to-neutral-900/40">
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
            <Code className="text-red-300" />
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
            <Mail className="text-red-300" />
            <h3 className="text-2xl md:text-3xl font-bold">Let’s collaborate</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="p-6 lg:col-span-2">
              <p className="text-white/85">Have a project in mind or want to say hi? Drop me a message.</p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input ref={nameRef} placeholder="Your name" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder:text-white/60" />
                <input ref={emailRef} placeholder="Email" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder:text-white/60" />
                <textarea ref={messageRef} rows={4} placeholder="Message" className="sm:col-span-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 outline-none placeholder:text-white/60" />
                <button disabled={loading} onClick={handleSend} className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-lg hover:shadow-xl sm:col-span-2 ${loading ? 'opacity-70 cursor-not-allowed bg-gradient-to-r from-neutral-600 to-neutral-700' : 'bg-gradient-to-r from-red-500 to-rose-600'}`}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                {status?.type && (
                  <div className={`sm:col-span-2 mt-1 flex items-center gap-2 text-sm ${status.type === 'ok' ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {status.type === 'ok' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    <span>{status.message}</span>
                  </div>
                )}

                {/* Email setup checker */}
                <div className="sm:col-span-2 mt-2 flex flex-col gap-2">
                  <button onClick={handleCheckEmail} disabled={checkingHealth} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs hover:bg-white/20">
                    <Info size={14} /> {checkingHealth ? 'Checking email setup...' : 'Check email setup'}
                  </button>
                  {emailHealth && (
                    <div className="text-xs text-white/80">
                      <div>SMTP configured: {String(emailHealth.smtp_configured || false)}</div>
                      {emailHealth.target_email && <div>Target: {emailHealth.target_email}</div>}
                      {emailHealth.from_email && <div>From: {emailHealth.from_email}</div>}
                      {emailHealth.mode && <div>Mode: {emailHealth.mode}</div>}
                      {emailHealth.error && <div className="text-rose-300">{emailHealth.error}</div>}
                    </div>
                  )}
                </div>
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
                  <a href="mailto:shreyash@certiswift.in" className="p-3 rounded-xl bg-white/10 hover:bg-white/20">
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
        © {new Date().getFullYear()} Shreyash Tailor • Red & Black theme with glassmorphism and 3D
      </footer>
    </div>
  )
}
