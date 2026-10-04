import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Bot,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  GitPullRequest,
  Layers,
  Mail,
  MapPin,
  Maximize2,
  MonitorSmartphone,
  Music4,
  Satellite,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  X,
  Zap,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const asset = (path) => import.meta.env.BASE_URL + path

const MAIL = '2810075119@qq.com'
const GITHUB_URL = 'https://github.com/banzinb'
const QING_REPO = 'https://github.com/banzinb/Qing'
const HY3_REPO = 'https://github.com/Tencent-Hunyuan/Hy3'
const TDAI_REPO = 'https://github.com/TencentCloud/TencentDB-Agent-Memory'

const NAV = [
  { id: 'work', label: '项目' },
  { id: 'opensource', label: '开源' },
  { id: 'experience', label: '经历' },
  { id: 'capability', label: '能力' },
  { id: 'credentials', label: '认证' },
  { id: 'contact', label: '联系' },
]

const HERO_STATS = [
  { value: '3', label: '独立交付项目', note: '端侧 Agent / 遥感视觉 / 跨端应用' },
  { value: '17', label: '设备动作', note: 'Qing 端侧操作接口' },
  { value: '10 / 10', label: '单元测试', note: '农田助手核心路径' },
  { value: '8 / 8', label: 'MCP 测试', note: 'Hy3 Research Server' },
]

const PROJECTS = [
  {
    id: 'qing',
    index: '01',
    name: '青 · Qing',
    latin: 'Qing',
    kicker: 'Android AI Agent',
    tagline: '把一个完整的 Agent 运行时塞进单个 APK',
    year: '2026',
    accent: 'jade',
    summary:
      '手机上的 AI 助手大多停在聊天窗口：能回答问题，却碰不到设备本身。要让模型真正替用户操作手机，运行时环境、权限链路、操作接口和风险控制必须同时成立。',
    points: [
      { icon: Terminal, text: '单 APK 内置 proot + Alpine，无需 root 即可拿到完整 Linux 运行时，模型可以直接执行命令与脚本。' },
      { icon: Smartphone, text: '17 个设备动作走同一条动作总线，配合 AccessibilityService 完成点击、输入、滑动与应用跳转。' },
      { icon: Compass, text: '池化 WebView 让 Agent 在真实页面里浏览和取数，多任务复用同一组实例，省掉反复冷启动。' },
      { icon: ShieldCheck, text: '审批门 + 审计日志：高风险动作先弹确认，每一步操作留痕可回溯。' },
      { icon: Database, text: 'Room 记忆层保存对话、任务与长期偏好，应用重启后仍能接着做。' },
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'TypeScript Bridge', 'proot / Alpine', 'AccessibilityService', 'Room'],
    facts: [
      { value: '3', label: '个公开 Release' },
      { value: '17', label: '个设备动作' },
      { value: '1', label: '单 APK 运行时' },
    ],
    link: { href: QING_REPO + '/releases', label: '查看 Release（v1.1.0 / v1.5.1 / v1.5.2）' },
    deck: {
      mode: 'pair',
      images: [
        { src: 'projects/qing/browser.png', alt: '青 Qing 在浏览器中读取网页内容' },
        { src: 'projects/qing/selfcheck.png', alt: '青 Qing 的运行环境与权限自检面板' },
      ],
    },
    media: {
      layout: 'pair',
      shots: [
        { src: 'projects/qing/browser.png', alt: '青 Qing 调用浏览器读取并总结网页内容', kind: 'tall' },
        { src: 'projects/qing/selfcheck.png', alt: '青 Qing 的自检面板：模型、运行环境、权限与记忆状态', kind: 'tall' },
      ],
    },
  },
  {
    id: 'farm',
    index: '02',
    name: '吉林一号农田助手',
    latin: 'Farmland',
    kicker: '遥感 · 计算机视觉 · QGIS 插件',
    tagline: '把卫星影像变成可以下钻的地块边界',
    year: '2026',
    accent: 'leaf',
    summary:
      '地块提取长期依赖人工勾画，影像分辨率与时间成本互相牵制；直接让多模态模型画边界，结果又常常贴不住斜向田埂。',
    points: [
      { icon: Layers, text: 'QGIS 插件把影像选片、候选生成、模型推理和结果入库收进一个界面，作业员不用离开作业环境。' },
      { icon: Satellite, text: '吉林一号影像配合本地候选生成：先用轻量方法产出候选地块，再交给模型精细化。' },
      { icon: Cpu, text: 'VLM 负责判断、分割模型负责边界，Geo-SAM / SAM2.1 Tiny 处理斜向田埂这类难点。' },
      { icon: BadgeCheck, text: '候选生成、坐标换算、结果写回等核心路径均有测试覆盖，10/10 通过。' },
    ],
    stack: ['Python', 'QGIS', 'Geo-SAM', 'SAM2.1 Tiny', 'VLM 分类', '遥感影像处理'],
    facts: [
      { value: '10 / 10', label: '单元测试通过' },
      { value: '3056×1560', label: '单张影像尺寸' },
      { value: '≈1.77s', label: 'CPU 单块推理' },
    ],
    link: null,
    deck: {
      mode: 'cover',
      images: [{ src: 'projects/jl1/hybrid.jpg', alt: '农田地块分割叠加在卫星影像上' }],
    },
    media: {
      layout: 'feature',
      shots: [
        { src: 'projects/jl1/hybrid.jpg', alt: '地块分割结果叠加显示在吉林一号卫星影像上', kind: 'wide', span: 2 },
        { src: 'projects/jl1/geosam.png', alt: 'Geo-SAM 工具在 QGIS 中运行并输出推理耗时', kind: 'wide' },
        { src: 'projects/jl1/qgis.png', alt: 'QGIS 工程界面与插件加载环境', kind: 'wide' },
      ],
    },
  },
  {
    id: 'music',
    index: '03',
    name: '聚合音乐 App',
    latin: 'Music',
    kicker: 'Flutter · 多音源聚合',
    tagline: '从界面到代理层，一个人写完整条链路',
    year: '2026',
    accent: 'coral',
    summary:
      '想听一首歌，往往要在几个平台之间来回找；每个源的接口、可用性和返回结构都不一样，客户端不该为此买单。',
    points: [
      { icon: Music4, text: 'Flutter 单套代码实现跨端界面，播放器状态、歌单与下载逻辑全部自研。' },
      { icon: Zap, text: 'just_audio 作为播放内核，处理播放、进度、歌词同步与后台播放。' },
      { icon: Layers, text: 'Node.js 聚合代理把多个音乐源的搜索、详情与排行榜统一成一套数据结构。' },
      { icon: Check, text: '搜索、播放、歌词、缓存、下载、歌单、排行榜形成完整闭环，不是单页 Demo。' },
    ],
    stack: ['Flutter', 'Dart', 'just_audio', 'Node.js', 'RESTful API'],
    facts: [
      { value: '跨端', label: 'Flutter 单套代码' },
      { value: '多源', label: '统一聚合接口' },
      { value: '端到端', label: '播放到下载闭环' },
    ],
    link: null,
    deck: {
      mode: 'contain',
      images: [{ src: 'projects/music/icon.png', alt: '聚合音乐 App 应用图标' }],
    },
    media: {
      layout: 'single',
      shots: [{ src: 'projects/music/logo.png', alt: '聚合音乐 App 品牌标识', kind: 'brand' }],
    },
  },
]

const OPEN_SOURCE = [
  {
    name: 'Hy3 Research MCP Server',
    meta: 'Tencent Hunyuan Hy3 · 犀牛鸟 2026 Issue #3',
    status: 'PR #227 · open',
    icon: Bot,
    href: HY3_REPO,
    body: '用 TypeScript MCP SDK 把 Hy3 的检索与推理能力做成一套可复用的工具服务：hy3_search、hy3_analyze、hy3_research、hy3_format_report 四个工具，stdio 传输，可选 Tavily 数据源，兼容 Chat Completions 与 Responses 两种官方接口协议。',
    bullets: ['4 个 MCP 工具', '8 / 8 测试通过', '提供 CodeBuddy / Cursor / Cline 配置示例'],
  },
  {
    name: 'TencentDB Agent Memory',
    meta: 'TencentCloud · Agent 记忆模块',
    status: 'Fork 贡献',
    icon: Database,
    href: TDAI_REPO,
    body: '为 Agent 记忆模块补齐 Gemini CLI 适配，并清理会话历史里遗留的 recall 注入：把不该继续出现在上下文里的历史片段剥离出来，让长会话的记忆读取更干净。',
    bullets: ['Gemini CLI adapter', 'legacy recall 清理', '会话历史处理'],
  },
]

const EXPERIENCE = [
  {
    role: 'AI 内容与工具开发实习',
    org: '地理数据内容工作室',
    period: '2026.08 — 至今',
    mode: '远程',
    icon: ScanSearch,
    lines: [
      '搭起公众号发布链路：从选题、成稿、排版到定时发布，把重复动作沉淀成可复用流程。',
      '开发 Next.js 地理工具箱，把常用的地理数据处理环节做成网页入口。',
      '推进城市期刊 AI 工作流 v1 到 v5，逐版收敛题摘初筛、全文交接与写作辅助的边界。',
    ],
    tech: ['Next.js', 'Python', 'AI 工作流', 'Vitest', 'Playwright'],
  },
  {
    role: '猎头实习生 · AI / 科技方向',
    org: '新大瀚人力资源',
    period: '2026.07 — 2026.09',
    mode: '实习',
    icon: Briefcase,
    lines: [
      '负责 AI 与科技岗位的人才寻访，完成候选人筛选、沟通与推荐全流程。',
      '评估候选人 150+，沉淀岗位画像与候选人画像的匹配标准。',
      '用 Python 做批量人才检索与去重，把重复的检索整理交给脚本，最终完成成功推荐与出单。',
    ],
    tech: ['人才寻访', '候选人评估', 'Python 自动化'],
  },
]

const CAPABILITY = [
  {
    icon: Bot,
    title: 'Agent 工程',
    note: '让模型具备可执行的手，而不只是会说话。',
    items: ['MCP 协议与工具调用', '多步任务编排', '审批门与审计日志', '记忆与上下文管理'],
  },
  {
    icon: MonitorSmartphone,
    title: '移动与跨端',
    note: '端侧运行的权限、后台与性能问题，实际踩过一遍。',
    items: ['Kotlin / Jetpack Compose', 'Flutter / Dart', 'just_audio 播放内核', 'Android 权限与后台保活'],
  },
  {
    icon: ScanSearch,
    title: 'GIS 与视觉',
    note: '把影像、模型和作业界面串成一条可用的工具链。',
    items: ['QGIS 插件开发', '遥感影像处理', 'Geo-SAM / SAM2.1', 'VLM 分类与语义分割'],
  },
  {
    icon: Layers,
    title: '全栈交付',
    note: '从界面、接口到测试，一个人能把项目推到能用。',
    items: ['React / Next.js', 'Node.js / Python', 'RESTful API 设计', '单元测试与 CI'],
  },
]

const CREDENTIALS = [
  {
    issuer: '阿里云',
    name: 'ACA 大模型工程师认证',
    badge: 'ACA',
    year: '2026 — 2028',
    subtitle: 'Alibaba Cloud Certified Associate · LLM',
    image: 'certificates/aliyun-aca.png',
    alt: '阿里云 ACA 大模型工程师认证证书',
    details: ['大模型原理与架构', 'Prompt 工程实践', '模型部署与调优'],
  },
  {
    issuer: '腾讯 × 北京师范大学',
    name: 'AI 训练营优秀证书',
    badge: 'Top 15%',
    year: '2026',
    subtitle: '大模型原理 / Prompt 工程 / 实战项目',
    image: 'certificates/tencent-bnu-ai.png',
    alt: '腾讯与北京师范大学人工智能教育培训荣誉证书',
    details: ['Transformer 与注意力机制', 'RLHF 与对齐基础', '完成 3 个实战项目'],
  },
]

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

function GithubMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.4-3.88-1.4-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.09 1.77 1.2 1.77 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.76.4-1.27.73-1.56-2.55-.29-5.24-1.29-5.24-5.72 0-1.27.44-2.3 1.17-3.11-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.19a10.8 10.8 0 0 1 5.74 0c2.18-1.5 3.14-1.19 3.14-1.19.62 1.59.23 2.77.12 3.06.73.81 1.17 1.84 1.17 3.11 0 4.44-2.7 5.42-5.26 5.71.41.36.78 1.08.78 2.18v3.24c0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12.02C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  )
}

function Starfield({ reduced, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame = 0
    let width = 0
    let height = 0
    let dpr = 1
    let stars = []
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((width * height) / 13000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.25,
        base: Math.random() * 0.42 + 0.12,
        speed: Math.random() * 0.0016 + 0.0004,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.85 + 0.15,
      }))
    }

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height)
      pointer.x += (pointer.tx - pointer.x) * 0.045
      pointer.y += (pointer.ty - pointer.y) * 0.045
      const drift = reduced ? 0 : time / 1000
      stars.forEach((star) => {
        const flicker = reduced ? 1 : 0.62 + 0.38 * Math.sin(star.phase + drift * 1.6)
        ctx.beginPath()
        ctx.fillStyle = `rgba(226,232,240,${(star.base * flicker).toFixed(3)})`
        ctx.arc(
          star.x + pointer.x * star.depth * 26,
          star.y + pointer.y * star.depth * 18,
          star.r,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      })
      if (!reduced) frame = requestAnimationFrame(draw)
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const observer = new ResizeObserver(() => {
      build()
      if (reduced) draw()
    })
    observer.observe(canvas)
    build()
    draw()
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className={'starfield ' + className} aria-hidden="true" />
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['hero', ...NAV.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={'nav' + (scrolled ? ' nav--scrolled' : '')}>
      <div className="nav-inner">
        <a href="#hero" className="nav-brand" onClick={() => setMenuOpen(false)}>
          <span className="nav-brand-mark">FSX</span>
          <span className="nav-brand-text">冯诗鑫</span>
        </a>

        <nav className="nav-links" aria-label="页面导航">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={'#' + item.id}
              className={active === item.id ? 'is-active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="nav-icon" href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub 主页" title="GitHub">
            <GithubMark size={17} />
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <span className="nav-toggle-bars" />}
          </button>
        </div>
      </div>

      <div className={'nav-drawer' + (menuOpen ? ' is-open' : '')}>
        {NAV.map((item) => (
          <a key={item.id} href={'#' + item.id} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
          GitHub
        </a>
      </div>
    </header>
  )
}

function ProjectDeck({ reduced }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const deckRef = useRef(null)
  const total = PROJECTS.length

  useEffect(() => {
    if (reduced || paused) return undefined
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % total), 5200)
    return () => window.clearTimeout(timer)
  }, [active, paused, reduced, total])

  const handlePointerMove = useCallback((event) => {
    const deck = deckRef.current
    if (!deck) return
    const rect = deck.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    deck.style.setProperty('--mx', x.toFixed(3))
    deck.style.setProperty('--my', y.toFixed(3))
  }, [])

  const resetPointer = useCallback(() => {
    const deck = deckRef.current
    if (!deck) return
    deck.style.setProperty('--mx', '0')
    deck.style.setProperty('--my', '0')
  }, [])

  const step = useCallback(
    (delta) => setActive((value) => (value + delta + total) % total),
    [total],
  )

  const current = PROJECTS[active]

  return (
    <div
      className={'deck' + (paused ? ' is-paused' : '')}
      ref={deckRef}
      data-accent={current.accent}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="deck-glow" aria-hidden="true" data-accent={current.accent} />

      <div className="deck-stage">
        {PROJECTS.map((project, index) => {
          const offset = (index - active + total) % total
          const layer = offset === 0 ? 'front' : offset === 1 ? 'second' : 'third'
          return (
            <button
              type="button"
              key={project.id}
              className={'deck-card deck-card--' + layer + ' deck-card--' + project.accent}
              onClick={() => (offset === 0 ? undefined : setActive(index))}
              aria-label={offset === 0 ? project.name : '切换到 ' + project.name}
              aria-hidden={offset !== 0}
              tabIndex={offset === 0 ? 0 : -1}
            >
              <span className="deck-card-inner">
                <span className="deck-frame">
                  {project.deck.mode !== 'cover' ? (
                    <img
                      src={asset(project.deck.images[0].src)}
                      alt=""
                      aria-hidden="true"
                      className="deck-backdrop"
                      draggable="false"
                    />
                  ) : null}
                  <span className={'deck-frames deck-frames--' + project.deck.mode}>
                    {project.deck.images.map((image) => (
                      <img
                        key={image.src}
                        src={asset(image.src)}
                        alt={image.alt}
                        className={'deck-image deck-image--' + project.deck.mode}
                        draggable="false"
                      />
                    ))}
                  </span>
                  <span className="deck-frame-glare" aria-hidden="true" />
                </span>
              </span>
            </button>
          )
        })}

        <div className="deck-progress" aria-hidden="true">
          <span key={active} style={{ animationPlayState: paused ? 'paused' : 'running' }} />
        </div>
      </div>

      <div className="deck-meter">
        <div className="deck-current">
          <span className="deck-count">
            {String(active + 1).padStart(2, '0')}
            <i>/</i>
            {String(total).padStart(2, '0')}
          </span>
          <strong>{current.name}</strong>
          <small>{current.kicker}</small>
        </div>

        <div className="deck-controls">
          <div className="deck-dots">
            {PROJECTS.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={index === active ? 'is-active' : ''}
                onClick={() => setActive(index)}
                aria-label={'显示 ' + project.name}
              />
            ))}
          </div>
          <div className="deck-arrows">
            <button type="button" onClick={() => step(-1)} aria-label="上一个项目" title="上一个">
              <ChevronLeft size={16} />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="下一个项目" title="下一个">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero({ reduced }) {
  return (
    <section className="hero" id="hero">
      <Starfield reduced={reduced} />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-spot" aria-hidden="true" />

      <div className="container hero-inner">
        <p className="hero-eyebrow">
          <Sparkles size={14} />
          AI 应用开发 · 独立交付
          <span className="hero-dot" aria-hidden="true" />
          <MapPin size={13} />
          Dongguan / Remote
        </p>

        <h1 className="hero-name">冯诗鑫</h1>
        <p className="hero-line">
          把模型接进真实设备，
          <br />
          把想法做成能跑起来的产品。
        </p>
        <p className="hero-lede">
          从 Android 端侧 Agent、遥感视觉工具到跨端音乐应用，一个人完成选题、架构、开发和发布。
        </p>

        <div className="hero-actions">
          <a className="btn btn--primary" href="#work">
            查看项目
            <ArrowUpRight size={16} />
          </a>
          <a className="btn btn--ghost" href={GITHUB_URL} target="_blank" rel="noreferrer">
            <GithubMark size={16} />
            GitHub
          </a>
          <a className="btn btn--ghost" href={QING_REPO + '/releases'} target="_blank" rel="noreferrer">
            <Download size={16} />
            下载 Qing
          </a>
        </div>

        <ProjectDeck reduced={reduced} />

        <dl className="hero-stats">
          {HERO_STATS.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.value}</dt>
              <dd>
                {stat.label}
                <small>{stat.note}</small>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero-fade" aria-hidden="true" />
    </section>
  )
}

function SectionHead({ index, eyebrow, title, sub }) {
  return (
    <header className="section-head" data-reveal>
      <p className="section-eyebrow">
        <span>{index}</span>
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {sub ? <p className="section-sub">{sub}</p> : null}
    </header>
  )
}

function WorkMedia({ media }) {
  return (
    <div className={'work-media work-media--' + media.layout}>
      {media.shots.map((shot) => (
        <figure
          key={shot.src}
          className={'shot shot--' + shot.kind}
          style={shot.span ? { gridColumn: 'span ' + shot.span } : undefined}
        >
          <img src={asset(shot.src)} alt={shot.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  )
}

function Work() {
  return (
    <section className="section section--work" id="work">
      <div className="container">
        <SectionHead
          index="01"
          eyebrow="SELECTED WORK"
          title="三个自己从零做完的项目"
          sub="每个项目都跑到了能被别人使用的程度：有发布版本、有测试、有真实的作业界面。"
        />

        <div className="work-list">
          {PROJECTS.map((project) => (
            <article className={'work work--' + project.accent} key={project.id} data-reveal>
              <header className="work-head">
                <span className="work-index">{project.index}</span>
                <div className="work-title">
                  <h3>{project.name}</h3>
                  <p>{project.tagline}</p>
                </div>
                <span className="work-meta">
                  {project.kicker}
                  <i aria-hidden="true" />
                  {project.year}
                </span>
              </header>

              <div className="work-body">
                <div className="work-visual">
                  <WorkMedia media={project.media} />
                </div>

                <div className="work-copy">
                  <p className="work-summary">{project.summary}</p>
                  <ul className="work-points">
                    {project.points.map((point) => {
                      const Icon = point.icon
                      return (
                        <li key={point.text}>
                          <span className="work-point-icon">
                            <Icon size={15} />
                          </span>
                          <span>{point.text}</span>
                        </li>
                      )
                    })}
                  </ul>

                  <div className="chips">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <dl className="work-facts">
                    {project.facts.map((fact) => (
                      <div key={fact.label}>
                        <dt>{fact.value}</dt>
                        <dd>{fact.label}</dd>
                      </div>
                    ))}
                  </dl>

                  {project.link ? (
                    <a className="text-link" href={project.link.href} target="_blank" rel="noreferrer">
                      {project.link.label}
                      <ArrowUpRight size={15} />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function OpenSource() {
  return (
    <section className="section section--alt" id="opensource">
      <div className="container">
        <SectionHead
          index="02"
          eyebrow="OPEN SOURCE"
          title="在别人的项目里改代码"
          sub="不只是提 issue：读源码、改实现、补测试，然后走一遍上游的评审流程。"
        />

        <div className="os-grid">
          {OPEN_SOURCE.map((item) => {
            const Icon = item.icon
            return (
              <a
                className="os-card"
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                data-reveal
              >
                <div className="os-card-top">
                  <span className="os-icon">
                    <Icon size={18} />
                  </span>
                  <span className="os-status">{item.status}</span>
                </div>
                <h3>{item.name}</h3>
                <p className="os-meta">{item.meta}</p>
                <p className="os-body">{item.body}</p>
                <ul className="os-bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Check size={14} />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <span className="os-open">
                  打开仓库
                  <ExternalLink size={15} />
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHead
          index="03"
          eyebrow="EXPERIENCE"
          title="两段实习，两种训练"
          sub="一段在内容和工具之间做产品，一段在人和岗位之间做匹配。"
        />

        <div className="exp-list">
          {EXPERIENCE.map((item) => {
            const Icon = item.icon
            return (
              <article className="exp-item" key={item.org} data-reveal>
                <div className="exp-side">
                  <span className="exp-icon">
                    <Icon size={17} />
                  </span>
                  <p className="exp-period">{item.period}</p>
                  <p className="exp-mode">{item.mode}</p>
                </div>
                <div className="exp-main">
                  <h3>{item.role}</h3>
                  <p className="exp-org">{item.org}</p>
                  <ul className="exp-lines">
                    {item.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <div className="chips chips--sm">
                    {item.tech.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Capability() {
  return (
    <section className="section section--alt" id="capability">
      <div className="container">
        <SectionHead
          index="04"
          eyebrow="CAPABILITY"
          title="我能接住哪一段"
          sub="比起罗列工具，更想说明白：什么问题交给我，能推到什么程度。"
        />

        <div className="cap-grid">
          {CAPABILITY.map((item) => {
            const Icon = item.icon
            return (
              <article className="cap-card" key={item.title} data-reveal>
                <span className="cap-icon">
                  <Icon size={18} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.note}</p>
                <ul>
                  {item.items.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Credentials() {
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    if (openIndex === null) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpenIndex(null)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openIndex])

  const active = openIndex === null ? null : CREDENTIALS[openIndex]

  return (
    <section className="section" id="credentials">
      <div className="container">
        <SectionHead
          index="05"
          eyebrow="CREDENTIALS"
          title="可以核验的凭证"
          sub="证书只说明基础，真正的验证还是在项目里。点击可以看原图。"
        />

        <div className="cert-grid">
          {CREDENTIALS.map((cert, index) => (
            <button
              type="button"
              className="cert-card"
              key={cert.name}
              onClick={() => setOpenIndex(index)}
              data-reveal
            >
              <span className="cert-media">
                <img src={asset(cert.image)} alt={cert.alt} loading="lazy" decoding="async" />
                <span className="cert-zoom">
                  <Maximize2 size={15} />
                </span>
              </span>
              <span className="cert-body">
                <span className="cert-issuer">
                  <Award size={14} />
                  {cert.issuer}
                  <i aria-hidden="true" />
                  {cert.year}
                </span>
                <strong>{cert.name}</strong>
                <small>{cert.subtitle}</small>
                <span className="cert-details">
                  {cert.details.map((detail) => (
                    <em key={detail}>{detail}</em>
                  ))}
                </span>
                <span className="cert-badge">
                  <BadgeCheck size={14} />
                  {cert.badge}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setOpenIndex(null)}
            aria-label="关闭"
          >
            <X size={20} />
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={asset(active.image)} alt={active.alt} />
            <figcaption>
              <strong>{active.name}</strong>
              <span>
                {active.issuer} · {active.year}
              </span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)

  const copyMail = async () => {
    try {
      await navigator.clipboard.writeText(MAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="section section--contact" id="contact">
      <div className="container">
        <SectionHead
          index="06"
          eyebrow="CONTACT"
          title="需要这样的人，可以直接找我"
          sub="AI 应用开发、端侧 Agent、跨端开发相关的实习与项目合作都欢迎。"
        />

        <div className="contact-grid">
          <div className="contact-card contact-card--mail" data-reveal>
            <span className="contact-icon">
              <Mail size={17} />
            </span>
            <span className="contact-label">邮箱</span>
            <a className="contact-value" href={'mailto:' + MAIL}>
              {MAIL}
            </a>
            <button type="button" className="contact-copy" onClick={copyMail} aria-label="复制邮箱" title="复制邮箱">
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>

          <a className="contact-card" href={GITHUB_URL} target="_blank" rel="noreferrer" data-reveal>
            <span className="contact-icon">
              <GithubMark size={17} />
            </span>
            <span className="contact-label">GitHub</span>
            <span className="contact-value">github.com/banzinb</span>
            <span className="contact-arrow">
              <ArrowUpRight size={15} />
            </span>
          </a>

          <a
            className="contact-card"
            href={QING_REPO + '/releases'}
            target="_blank"
            rel="noreferrer"
            data-reveal
          >
            <span className="contact-icon">
              <GitPullRequest size={17} />
            </span>
            <span className="contact-label">Qing</span>
            <span className="contact-value">3 个公开 Release 可下载</span>
            <span className="contact-arrow">
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>

        <footer className="footer">
          <span>© 2026 冯诗鑫 · 东莞 / 远程</span>
          <span>React · GSAP · 真实项目素材</span>
        </footer>
      </div>
    </section>
  )
}

export default function App() {
  const reduced = useReducedMotion()
  const rootRef = useRef(null)

  useGSAP(
    () => {
      if (reduced) return

      gsap.from('.hero-eyebrow, .hero-name, .hero-line, .hero-lede, .hero-actions', {
        y: 26,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.1,
      })

      gsap.from('.deck', {
        y: 46,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.45,
      })

      gsap.from('.hero-stats > div', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.7,
      })

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 32,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray('.work-visual img').forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.06 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <div className="app" ref={rootRef}>
      <a className="skip-link" href="#work">
        跳到项目
      </a>
      <Nav />
      <main>
        <Hero reduced={reduced} />
        <Work />
        <OpenSource />
        <Experience />
        <Capability />
        <Credentials />
        <Contact />
      </main>
    </div>
  )
}
