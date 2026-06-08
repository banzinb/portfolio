import { useState, useEffect, useRef } from 'react'
import './App.css'

function Reveal({children, delay=0, className=''}) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){setVis(true);obs.disconnect()} }, {threshold:0.15})
    obs.observe(el)
    return () => obs.disconnect()
  },[])
  const cls = 'reveal' + (vis?' reveal--visible':'') + (delay?' reveal--delay-'+delay:'') + (className?' '+className:'')
  return <div ref={ref} className={cls}>{children}</div>
}

function FabTop() {
  const [show,setShow] = useState(false)
  useEffect(()=>{ const h=()=>setShow(window.scrollY>400); window.addEventListener('scroll',h,{passive:true}); return()=>window.removeEventListener('scroll',h) },[])
  return <button className={'fab-top'+(show?' fab-top--show':'')} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top">↑</button>
}