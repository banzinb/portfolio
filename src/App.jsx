import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './App.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const NAV = [
  { id: 'about', label: '关于' },
  { id: 'projects', label: '项目' },
  { id: 'certs', label: '认证' },
  { id: 'skills', label: '技能' },
  { id: 'contact', label: '联系' },
]

const STATS = [
  { value: '4', unit: '个', label: '独立交付项目', note: '从需求到上线' },
  { value: '3', unit: 'Agent', label: '协同架构', note: '规划 / 执行 / 审核' },
  { value: '4', unit: '端', label: '跨平台经验', note: 'Web / App / 桌面' },
  { value: '100', unit: '%', label: '提醒到达率', note: '连续稳定运行' },
]

const PROJECTS = [
  { name: '多 Agent 协同任务管理 Web 平台', period: '2026 / 独立设计开发', problem: '把复杂任务拆给多个角色时，最难的是让规划、执行、审核之间形成闭环，而不是简单调用模型。', solution: '设计 planner / executor / reviewer 三角色，通过消息总线串起任务分发、结果回传和审核反馈。', outcome: '任务完成率提升 40%，人工检查压力明显下降。', stack: ['OpenAI API', '阿里云百炼', 'Agent 编排', 'HTML/CSS/JS'], metric: '40%', metricLabel: '完成率提升', accent: 'blue' },
  { name: '聚合音乐播放器 App', period: '跨平台播放器', problem: '不同音乐源接口分散、可用性不稳定，用户只想搜索和播放，不想关心平台差异。', solution: '用 Flutter 做统一界面，Node.js 代理层聚合网易云、QQ 音乐、酷我、酷狗等来源。', outcome: '搜索响应约 800ms，支持 Android / iOS / Web / 桌面多端。', stack: ['Flutter 3.x', 'Dart', 'Node.js', 'Express'], metric: '800ms', metricLabel: '搜索响应', accent: 'cyan' },
  { name: 'AI 学业管家系统', period: '自动化提醒系统', problem: '课程提醒容易漏发，人工维护多门课程的时间窗口很消耗精力。', solution: '为 8 门课程配置独立提醒规则，结合 WorkBuddy、SMTP 和 HTML 模板生成每日提醒。', outcome: '每日稳定触达，提醒准确率 100%。', stack: ['Python 3.13', 'WorkBuddy', 'SMTP', 'HTML'], metric: '100%', metricLabel: '提醒准确率', accent: 'green' },
  { name: '像素风互动叙事游戏', period: 'Godot 4 原型', problem: '叙事游戏的难点不只是美术，而是场景、对话和玩家选择之间的节奏。', solution: '用 Godot 信号驱动对话分支，结合 AI 生成像素风素材，快速搭建可玩的叙事节点。', outcome: '场景切换约 200ms，完成 4 类美术素材和核心交互。', stack: ['Godot 4.3', 'GDScript 2.0', 'GPT Image 2', 'AI 美术'], metric: '200ms', metricLabel: '场景切换', accent: 'amber' },
]

const STUDIO_PANELS = [
  { code: '01', title: 'Agent 协同平台', meta: 'planner / executor / reviewer', status: 'task loop ready' },
  { code: '02', title: '聚合音乐播放器', meta: 'Flutter + Node proxy', status: 'multi-source search' },
  { code: '03', title: '学业提醒系统', meta: 'Python + SMTP workflow', status: 'daily delivery' },
]

const HERO_LOGS = [
  '把模型调用接进真实流程',
  '从界面、接口到自动化脚本都自己跑通',
  '更关心稳定交付，而不是堆概念',
]

const CERTS = [
  { issuer: '阿里云', name: 'ACA 大模型工程师认证', badge: 'ACA', year: '2026', subtitle: '大模型工程化能力官方认证', image: '/certificates/aliyun-aca.png', imageAlt: '阿里云 ACA 大模型工程师认证证书', details: ['大模型原理与架构', 'Prompt 工程实践', '模型部署与调优'] },
  { issuer: '腾讯 × 北京师范大学', name: 'AI 训练营优秀证书', badge: 'Top 15%', year: '2026', subtitle: '大模型原理 / Prompt 工程 / 3 个实战项目', image: '/certificates/tencent-bnu-ai.png', imageAlt: '腾讯扣叮与北京师范大学人工智能教育培训荣誉证书', details: ['Transformer 与注意力机制', 'RLHF 与对齐基础', '完成 3 个实战项目'] },
]

const SKILLS = [
  { title: '大模型工程', note: '能把模型接入真实业务，而不是停留在 Demo。', items: ['OpenAI API', '阿里云百炼 MaaS', 'Prompt 调优', '多 Agent 编排', '工具调用', 'RLHF 基础'] },
  { title: '全栈开发', note: '从界面、接口、脚本到跨端应用都有落地经验。', items: ['Python 3.13', 'JavaScript / Node.js', 'React', 'HTML / CSS', 'Flutter / Dart', 'RESTful API'] },
  { title: 'AI 内容生产', note: '把图片、视频和开发工作流连接进项目迭代。', items: ['Codex', 'Claude Code', 'WorkBuddy', 'GPT Image 2', 'SeedDance 2.0', 'AI 美术生成'] },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <nav className={'navbar' + (scrolled ? ' navbar--scrolled' : '')}><div className="navbar-inner"><a href="#hero" className="navbar-logo">FSX</a><ul className="navbar-links">{NAV.map((item) => <li key={item.id}><a href={'#' + item.id}>{item.label}</a></li>)}</ul></div></nav>
}

function FabTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 460)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <button className={'fab-top' + (show ? ' fab-top--show' : '')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="回到顶部">↑</button>
}

function OhziInteractionLayer() {
  const cursorRef = useRef(null)
  const holdTimerRef = useRef(null)
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const cursor = cursorRef.current
    const onPointerMove = (event) => {
      if (!cursor) return
      cursor.style.setProperty('--cursor-left', event.clientX + 'px')
      cursor.style.setProperty('--cursor-top', event.clientY + 'px')
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    onScroll()
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goExplore = () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  const startHold = () => {
    setHolding(true)
    holdTimerRef.current = window.setTimeout(goExplore, 680)
  }
  const stopHold = () => {
    setHolding(false)
    window.clearTimeout(holdTimerRef.current)
  }

  return <><div className="ohzi-cursor" ref={cursorRef} aria-hidden="true" /><button className={'ohzi-hold' + (holding ? ' ohzi-hold--active' : '')} onPointerDown={startHold} onPointerUp={stopHold} onPointerLeave={stopHold} onClick={goExplore} aria-label="按住或点击探索项目"><span className="ohzi-hold-halos"><i /><i /><i /><i /></span><strong>HOLD</strong><small>TO EXPLORE</small></button><div className="ohzi-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div></>
}

function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId
    let particles = []
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const count = prefersReduced ? 26 : 62
    const distance = 128
    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    class Particle {
      constructor() { this.x = Math.random() * window.innerWidth; this.y = Math.random() * window.innerHeight; this.vx = (Math.random() - 0.5) * 0.24; this.vy = (Math.random() - 0.5) * 0.24; this.r = Math.random() * 1.4 + 0.6; this.a = Math.random() * 0.28 + 0.12 }
      update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1; if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1 }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(78,168,222,' + this.a + ')'; ctx.fill() }
    }
    function reset() { resize(); particles = Array.from({ length: count }, () => new Particle()) }
    function animate() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      particles.forEach((p, i) => {
        if (!prefersReduced) p.update()
        p.draw()
        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < distance) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = 'rgba(78,168,222,' + 0.055 * (1 - d / distance) + ')'; ctx.lineWidth = 0.6; ctx.stroke() }
        }
      })
      if (!prefersReduced) rafId = requestAnimationFrame(animate)
    }
    reset(); animate(); window.addEventListener('resize', reset)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', reset) }
  }, [])
  return <canvas ref={canvasRef} className="hero-canvas" />
}

function SectionHead({ eyebrow, title, sub }) {
  return <div className="section-head panel-anim"><span className="section-eyebrow">{eyebrow}</span><h2>{title}</h2>{sub && <p>{sub}</p>}</div>
}

function StudioHero() {
  const stageRef = useRef(null)

  const handlePointerMove = (event) => {
    const el = stageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--cursor-x', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--cursor-y', `${(y + 0.5) * 100}%`)
    el.style.setProperty('--tilt-x', `${y * -7}deg`)
    el.style.setProperty('--tilt-y', `${x * 9}deg`)
  }

  const resetPointer = () => {
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--cursor-x', '50%')
    el.style.setProperty('--cursor-y', '50%')
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }

  return <section id="hero" className="hero hero--studio"><ParticleCanvas /><div className="studio-noise" /><div className="studio-orbits" aria-hidden="true"><span /><span /><span /><b>SHIP</b><b>BUILD</b><b>TRACE</b></div><div className="studio-marquee" aria-hidden="true"><span>BUILD / SHIP / VERIFY / REPEAT / </span><span>BUILD / SHIP / VERIFY / REPEAT / </span></div><div className="studio-layout"><aside className="studio-index hero-piece"><span>Portfolio 2026</span><strong>FSX</strong><small>Dongguan / Remote</small></aside><main className="studio-copy hero-piece"><p className="studio-kicker">Independent Application Builder</p><h1 className="sr-only">冯诗鑫</h1><div className="studio-title" aria-hidden="true"><span>我做</span><span>能跑起来的工具</span></div><p className="studio-lede">把想法拆成页面、接口、自动化流程，再让它稳定交付。</p><div className="studio-actions"><a href="#projects" className="btn btn-primary">查看项目现场</a><a href="#certs" className="btn btn-ghost">查看证书凭证</a></div></main><div className="studio-stage hero-piece" ref={stageRef} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}><div className="studio-stage-inner"><div className="studio-scan" /><div className="studio-meter"><span /><span /><span /><span /><span /></div><div className="studio-terminal"><div className="studio-terminal-bar"><span /><span /><span /><strong>current-build.log</strong></div>{HERO_LOGS.map((line, index) => <p key={line}><span>{String(index + 1).padStart(2, '0')}</span>{line}</p>)}</div><div className="studio-panels">{STUDIO_PANELS.map((panel, index) => <article className="studio-panel" style={{ '--panel-index': index }} key={panel.code}><span>{panel.code}</span><h3>{panel.title}</h3><p>{panel.meta}</p><small>{panel.status}</small></article>)}</div><div className="studio-live"><i /> Live prototype surface</div></div></div></div><div className="studio-bottom hero-piece"><span>4 个完整项目</span><span>3 Agent 架构</span><span>100% 提醒到达</span><span>React + GSAP</span></div><div className="studio-explore-hint hero-piece"><span>DRAG / HOLD / SCROLL</span><strong>Explore the build</strong></div><div className="scroll-cue"><span /></div></section>
}

function Hero() {
  return <StudioHero />
}

function AboutSection() {
  return <section id="about" className="section about"><div className="container about-layout"><div className="about-copy panel-anim"><SectionHead eyebrow="ABOUT" title="不是包装一套词，而是把项目跑起来" /><p>我是冯诗鑫，本科在读，主要做 AI 应用开发和全栈落地。学习路径比较野：先从能不能把东西做出来开始，再回头补工程结构、交互体验和模型调用策略。</p><p>目前独立完成过多 Agent 协同平台、聚合音乐播放器、AI 学业管家和像素风互动叙事游戏。对我来说，项目最重要的不是“用了 AI”，而是它解决了什么问题、有没有稳定运行、交互能不能让人愿意继续用。</p><div className="about-note"><span>当前方向</span><strong>大模型应用工程 / Agent 工作流 / 跨平台工具</strong></div></div><div className="stats-grid">{STATS.map((stat) => <div className="stat-card glass-card card-anim" key={stat.label}><div className="stat-number"><span>{stat.value}</span><small>{stat.unit}</small></div><strong>{stat.label}</strong><p>{stat.note}</p></div>)}</div></div></section>
}

function CodeWindow() {
  return <div className="code-window panel-anim"><div className="code-bar"><span className="dot red" /><span className="dot yellow" /><span className="dot green" /><span>agent-loop.js</span></div><pre>{`const task = await planner.split(input)

for (const step of task.steps) {
  const draft = await executor.run(step)
  const checked = await reviewer.verify(draft)
  bus.commit(checked)
}

return report.withEvidence()`}</pre></div>
}

function ProjectsSection() {
  return <section id="projects" className="section projects"><div className="container"><SectionHead eyebrow="PROJECTS" title="项目不只列技术栈，先说明解决了什么" sub="把每个项目拆成问题、做法、结果，降低模板感，也更方便招聘方判断真实能力。" /><div className="projects-grid">{PROJECTS.map((project, index) => <article className={'project-card glass-card card-anim project-card--' + project.accent + (index === 0 ? ' project-card--feature' : '')} key={project.name}><div className="project-main"><div className="project-topline"><span className="project-index">{String(index + 1).padStart(2, '0')}</span><span>{project.period}</span></div><h3>{project.name}</h3><dl className="project-evidence"><div><dt>问题</dt><dd>{project.problem}</dd></div><div><dt>做法</dt><dd>{project.solution}</dd></div><div><dt>结果</dt><dd>{project.outcome}</dd></div></dl><div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div><div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>{index === 0 && <CodeWindow />}</article>)}</div></div></section>
}

function CertLightbox({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [cert, onClose])

  if (!cert) return null
  return <div className="cert-lightbox" role="dialog" aria-modal="true" aria-label={cert.imageAlt} onClick={onClose}><div className="cert-lightbox-panel" onClick={(event) => event.stopPropagation()}><button className="cert-lightbox-close" onClick={onClose} aria-label="关闭证书预览">×</button><img src={cert.image} alt={cert.imageAlt} /><div className="cert-lightbox-caption"><strong>{cert.name}</strong><span>{cert.issuer} / {cert.year}</span></div></div></div>
}

function CertsSection() {
  const [activeCert, setActiveCert] = useState(null)
  return <section id="certs" className="section certs"><div className="container"><SectionHead eyebrow="CERTIFICATIONS" title="认证保留动效，但让它像凭证而不是海报" sub="证书原图作为可验证附件出现，默认只露出缩略图，点击后查看完整凭证。" /><div className="certs-grid">{CERTS.map((cert) => <article className="cert-card card-anim" key={cert.name}><div className="cert-sheen" /><div className="cert-content"><div className="cert-top"><span className="cert-badge">{cert.badge}</span><span className="cert-year">{cert.year}</span></div><p className="cert-issuer">{cert.issuer}</p><h3>{cert.name}</h3><p className="cert-subtitle">{cert.subtitle}</p><ul>{cert.details.map((item) => <li key={item}>{item}</li>)}</ul></div><button className="cert-proof" type="button" onClick={() => setActiveCert(cert)} aria-label={'查看' + cert.name + '证书'}><span className="cert-proof-label">CERTIFICATE</span><img src={cert.image} alt="" loading="lazy" /><span className="cert-proof-cta">点击查看完整证书</span></button></article>)}</div></div><CertLightbox cert={activeCert} onClose={() => setActiveCert(null)} /></section>
}

function SkillsSection() {
  return <section id="skills" className="section skills"><div className="container"><SectionHead eyebrow="SKILLS" title="技能矩阵改成工作能力说明" sub="少一点标签堆砌，多一点“我能负责哪部分”。" /><div className="skills-grid">{SKILLS.map((group) => <article className="skill-card glass-card card-anim" key={group.title}><h3>{group.title}</h3><p>{group.note}</p><div className="skill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div><a className="cert-link panel-anim" href="#certs">查看完整认证</a></div></section>
}

function ContactSection() {
  return <section id="contact" className="section contact"><div className="container"><SectionHead eyebrow="CONTACT" title="可以聊项目、实习和协作机会" sub="如果你需要一个能把想法拆成页面、接口和模型调用的人，可以直接联系我。" /><div className="contact-grid"><a className="contact-card glass-card card-anim" href="mailto:2810075119@qq.com"><span>邮箱</span><strong>2810075119@qq.com</strong></a><div className="contact-card glass-card card-anim"><span>微信</span><strong>17881952835</strong></div><a className="contact-card glass-card card-anim" href="tel:19899396313"><span>手机</span><strong>19899396313</strong></a></div></div><footer className="footer">© 2026 冯诗鑫 · Built with React, GSAP and real projects</footer></section>
}

export default function App() {
  const appRef = useRef(null)
  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.timeline({ defaults: { ease: 'power3.out' } }).from('.navbar', { y: -24, opacity: 0, duration: 0.7 }).from('.hero-piece', { y: 34, opacity: 0, duration: 0.82, stagger: 0.09 }, '-=0.2').from('.studio-panel', { y: 38, opacity: 0, rotateX: -10, rotateY: 10, duration: 0.85, stagger: 0.08 }, '-=0.42').from('.studio-orbits b', { scale: 0, opacity: 0, duration: 0.55, stagger: 0.08 }, '-=0.45')
    if (!reduceMotion) {
      gsap.to('.studio-copy', { y: -42, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 } })
      gsap.to('.studio-noise', { opacity: 0.42, y: 70, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.to('.studio-stage', { y: 70, rotateZ: -1.5, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
    }
    gsap.utils.toArray('.section-head, .panel-anim').forEach((el) => {
      gsap.from(el, { y: 34, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%', toggleActions: 'play none none reverse' } })
    })
    ScrollTrigger.batch('.card-anim', { start: 'top 86%', interval: 0.08, batchMax: 4, onEnter: (batch) => gsap.fromTo(batch, { y: 42, opacity: 0, scale: 0.985 }, { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out', overwrite: true }), onLeaveBack: (batch) => gsap.to(batch, { y: 24, opacity: 0.35, duration: 0.35, stagger: 0.04, overwrite: true }) })
  }, { scope: appRef })
  return <div ref={appRef}><div className="noise-overlay" /><Navbar /><FabTop /><OhziInteractionLayer /><Hero /><AboutSection /><ProjectsSection /><CertsSection /><SkillsSection /><ContactSection /></div>
}







