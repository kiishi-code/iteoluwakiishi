import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Layers3, Menu, Moon, Palette, Sparkles, X, Sun, Mail, MapPin, Phone, MessageCircle, Check, Github, Linkedin, Globe, Send, Braces, ShoppingBag, PanelsTopLeft, Zap, ExternalLink } from 'lucide-react';

const projects = [
  { n:'01', title:'NOVA AI', type:'AI assistant', tag:'Web apps', desc:'A glassmorphism AI workspace with chat history and image-generation features, designed to make an AI assistant feel focused and approachable.', stack:['React','AI interface','Glassmorphism'], visual:'nova', url:'https://nova-ai-d40s9i.v2.appdeploy.ai/', outcome:'An interactive AI product with a dedicated live deployment.' },
  { n:'02', title:'GALAXY', type:'Messaging platform', tag:'Web apps', desc:'A galaxy-inspired messaging product focused on profiles, direct and group conversations, stories, and a built-in AI assistant.', stack:['Realtime UI','Responsive design','Glass UI'], visual:'galaxy', url:'https://galaxy-dopj43.v2.appdeploy.ai/#features', outcome:'A live messaging experience with a distinct visual identity.' },
  { n:'03', title:'StudyMate', type:'Study platform', tag:'Web apps', desc:'A study-focused web app designed to bring learning tools and study workflows into one accessible digital space.', stack:['Learning UI','Responsive design','Web app'], visual:'study', url:'https://studymate-g5drz2.v2.appdeploy.ai/', outcome:'A live study platform with its own dedicated deployment.' }
];
const services = [
  { icon:PanelsTopLeft, title:'Website design', text:'Distinctive, responsive interfaces shaped around your brand and the people using it.' },
  { icon:Code2, title:'Frontend development', text:'Clean, accessible interfaces built to feel fast, fluid, and intuitive on every screen.' },
  { icon:Braces, title:'Backend development', text:'Practical PHP functionality, server-side workflows, and database-connected experiences.' },
  { icon:ShoppingBag, title:'E-commerce', text:'Thoughtful product journeys and storefront experiences designed to help customers buy confidently.' },
  { icon:Layers3, title:'Website redesign', text:'A sharper visual system, clearer navigation, and a more useful experience for your audience.' },
  { icon:Zap, title:'Interactive experiences', text:'Purposeful interactions and motion that bring digital products to life without getting in the way.' }
];
const skills = [{name:'HTML',value:100,group:'FRONTEND'},{name:'CSS',value:90,group:'FRONTEND'},{name:'JavaScript',value:75,group:'FRONTEND'},{name:'PHP',value:80,group:'BACKEND'},{name:'Photoshop',value:55,group:'DESIGN'}];

export default function App() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [light,setLight] = useState(() => { try { return localStorage.getItem('yusuf-portfolio-theme') === 'light'; } catch { return false; } });
  const [filter,setFilter] = useState('All');
  const [sent,setSent] = useState(false);
  const [submitting,setSubmitting] = useState(false);
  const [submitError,setSubmitError] = useState('');
  const [form,setForm] = useState({name:'',email:'',type:'Website design',details:''});
  const [website,setWebsite] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    try { localStorage.setItem('yusuf-portfolio-theme',light?'light':'dark'); } catch {}
  },[light]);

  async function submitForm(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSubmitError(''); setSent(false);
    if (submitting) return;
    const payload = {name:form.name.trim(),email:form.email.trim(),projectType:form.type,message:form.details.trim(),website};
    if (!payload.name || !payload.email || payload.message.length < 10) { setSubmitError('Please complete every field and write at least 10 characters about your project.'); return; }
    setSubmitting(true);
    try {
      const response = await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      if (!response.ok) throw new Error('Submission failed');
      setSent(true); setForm({name:'',email:'',type:'Website design',details:''}); setWebsite('');
    } catch {
      setSubmitError('The hosted contact backend is not available in this local copy. Please email kiishiyusuf@gmail.com or use WhatsApp.');
    } finally { setSubmitting(false); }
  }

  const visibleProjects = projects.filter(p => filter === 'All' || p.tag === filter);
  const closeMenu = () => setMenuOpen(false);

  return <div className="site-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="ambient ambient-three"/>
    <header className="topbar">
      <a href="#home" className="brand" onClick={closeMenu} aria-label="Yusuf Iteoluwakiishi home">
        <span className="brand-mark">Y<span>.</span></span><span className="brand-name">YUSUF ITEOLUWAKIISHI<small>DESIGN × DEVELOPMENT</small></span>
      </a>
      <nav className={menuOpen?'nav-links open':'nav-links'} aria-label="Main navigation">
        {['About','Services','Work','Skills'].map(item=><a key={item} href={'#'+item.toLowerCase()} onClick={closeMenu}>{item}</a>)}
        <a href="#contact" className="nav-contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={14}/></a>
      </nav>
      <div className="top-actions">
        <button className="theme-toggle" onClick={()=>setLight(v=>!v)} aria-label={light?'Switch to dark theme':'Switch to light theme'}>{light?<Moon size={17}/>:<Sun size={17}/>}</button>
        <button className="menu-toggle" onClick={()=>setMenuOpen(v=>!v)} aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen}>{menuOpen?<X/>:<Menu/>}</button>
      </div>
    </header>
    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot"/> AVAILABLE FOR WEB DESIGN WORK <span className="eyebrow-line"/></div>
          <p className="hero-pretitle">Independent web designer &amp; developer</p>
          <h1>Ideas into<br/><span className="gradient-text">digital impact.</span></h1>
          <p className="hero-description">I’m Yusuf — I design and build thoughtful digital experiences where <strong>good design meets purposeful code.</strong></p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={17}/></a><a className="button button-quiet" href="#contact">Start a project <ArrowRight size={16}/></a></div>
          <div className="hero-footnote"><span className="tiny-cross">✳</span> Thoughtfully designed. Carefully built. <span className="footnote-divider"/> Based in Abeokuta, NG.</div>
        </div>
        <div className="hero-art" aria-label="Abstract glass artwork representing design and code">
          <div className="art-orbit orbit-a"/><div className="art-orbit orbit-b"/>
          <div className="art-glass art-back"><span className="art-label">CREATIVE SYSTEMS / 001</span><div className="art-grid"/></div>
          <div className="art-glass art-main"><div className="art-topline"><span>YI®</span><span>INDEPENDENT / 2026</span></div><div className="art-symbol"><span className="symbol-ring"/><span className="symbol-core"/><span className="symbol-spark">✳</span></div><div className="art-bottom"><div><span className="art-caption">DESIGN WITH INTENT</span><strong>Make it mean<br/>something.</strong></div><div className="art-arrow"><ArrowDown size={23}/></div></div></div>
          <div className="floating-chip chip-code"><Code2 size={15}/><span>Clean code</span><i/></div><div className="floating-chip chip-design"><Palette size={15}/><span>Clear design</span><i/></div><div className="art-coordinate">07°09' N<br/>03°20' E</div>
        </div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
      </section>
      <div className="ticker" aria-label="Design, develop, deliver"><div className="ticker-track">{Array.from({length:4},(_,i)=><span key={i}>DESIGN WITH INTENT <b>✳</b> DEVELOP WITH CARE <b>✳</b> DELIVER WITH IMPACT <b>✳</b></span>)}</div></div>
      <section className="section-wrap about-section" id="about">
        <div className="section-kicker"><span>01 / A LITTLE ABOUT ME</span><span className="kicker-rule"/></div>
        <div className="about-grid"><div><h2>Design-minded.<br/><span className="muted-heading">Code-driven.</span></h2></div><div className="about-copy"><p className="large-copy">I turn ideas into digital experiences that look considered, feel intuitive, and work the way people expect.</p><p>From focused brochure websites to richer e-commerce experiences, I bring design thinking and practical development together to make the web more useful — one project at a time.</p><a className="text-link" href="#contact">A project on your mind? <ArrowUpRight size={16}/></a></div></div>
        <div className="stat-grid"><div className="stat-card glass"><span className="stat-number">21<span>+</span></span><span className="stat-label">PROJECTS COMPLETED</span><span className="stat-detail">Experience through making</span></div><div className="stat-card glass"><span className="stat-number">05</span><span className="stat-label">CERTIFICATE SUBJECTS</span><span className="stat-detail">A foundation for lifelong learning</span></div><div className="stat-card glass"><span className="stat-number">04</span><span className="stat-label">CORE WEB TECHNOLOGIES</span><span className="stat-detail">From structure to server-side</span></div><div className="stat-note"><Sparkles size={19}/><p>Curiosity is part of the process. Every project is a chance to make something clearer, smarter, and more human.</p></div></div>
      </section>
      <section className="services-section" id="services"><div className="section-wrap"><div className="section-kicker"><span>02 / WHAT I DO</span><span className="kicker-rule"/></div><div className="section-heading-row"><h2>Useful by design.<br/><span className="muted-heading">Beautiful by nature.</span></h2><p>From first sketch to final interaction, I help ideas find their place on the web.</p></div><div className="service-grid">{services.map((s,i)=>{const Icon=s.icon;return <article className="service-card glass" key={s.title}><div className="service-card-top"><span>{String(i+1).padStart(2,'0')}</span><Icon size={21} strokeWidth={1.5}/></div><h3>{s.title}</h3><p>{s.text}</p><div className="service-card-line"/></article>})}</div></div></section>
      <section className="section-wrap work-section" id="work"><div className="section-kicker"><span>03 / SELECTED WORK</span><span className="kicker-rule"/></div><div className="section-heading-row work-heading"><div><h2>Made with purpose.<br/><span className="muted-heading">Built to matter.</span></h2><p className="work-subtitle">A glimpse into my approach to digital experiences.</p></div><span className="work-count">PORTFOLIO / 2026</span></div>
        <div className="filter-row" role="group" aria-label="Filter projects">{['All','Websites','Commerce','Web apps'].map(f=><button key={f} className={filter===f?'filter active':'filter'} onClick={()=>setFilter(f)}>{f}</button>)}</div>
        <div className="project-grid">{visibleProjects.map(p=><article className="project-card" key={p.n}><a className={'project-visual '+p.visual} href={p.url} target="_blank" rel="noreferrer" aria-label={'Open '+p.title}><div className="project-visual-glow"/><span className="project-number">{p.n} / PROJECT</span><div className="project-preview"><div className="preview-top"><span className="preview-logo">{p.title==='StudyMate'?'S':p.title[0]}</span><span>{p.title}</span><span className="preview-menu">•••</span></div><div className="preview-content"><span className="preview-kicker">{p.type.toUpperCase()}</span><strong>{p.title==='NOVA AI'?'A little more intelligent.':p.title==='GALAXY'?'Your universe. Your people.':'Make learning click.'}</strong><p>{p.title==='NOVA AI'?'A thoughtful space for ideas and creation.':p.title==='GALAXY'?'Bring your conversations together.':'A better space to study and grow.'}</p><span className="preview-button">{p.title==='NOVA AI'?'Start a conversation':p.title==='GALAXY'?'Explore messages':'Start studying'} <ArrowUpRight size={12}/></span></div></div><span className="open-project"><ExternalLink size={17}/></span></a><div className="project-info"><div className="project-title-row"><div><span className="project-type">{p.type}</span><h3>{p.title}</h3></div><a href={p.url} target="_blank" rel="noreferrer" className="project-arrow" aria-label={'Visit '+p.title}><ArrowUpRight size={19}/></a></div><p>{p.desc}</p><div className="project-tags">{p.stack.map(s=><span key={s}>{s}</span>)}</div><small className="project-outcome">{p.outcome}</small></div></article>)}</div>
      </section>
      <section className="skills-section" id="skills"><div className="section-wrap"><div className="section-kicker"><span>04 / TOOLS I WORK WITH</span><span className="kicker-rule"/></div><div className="skills-layout"><div><h2>Built on curiosity.<br/><span className="muted-heading">Sharpened by practice.</span></h2><p className="skills-intro">A growing toolkit for turning thoughtful ideas into useful digital products. Skill levels are self-reported.</p><div className="cert-card glass"><div className="cert-icon"><Check size={20}/></div><div><strong>Certificates</strong><p>C++ · HTML · CSS · PHP · JavaScript</p></div></div></div><div className="skills-panel glass">{skills.map(s=><div className="skill-row" key={s.name}><div className="skill-label"><span>{s.name}</span><span>{s.value}%</span></div><div className="skill-track"><span style={{width:s.value+'%'}}/></div><small>{s.group}</small></div>)}</div></div></div></section>
      <section className="process-section section-wrap"><div className="section-kicker"><span>05 / HOW I WORK</span><span className="kicker-rule"/></div><div className="section-heading-row"><h2>A clear process.<br/><span className="muted-heading">A better outcome.</span></h2><p>Good work comes from asking the right questions, making deliberate choices, and testing the details.</p></div><div className="process-grid">{[{n:'01',title:'Discover',text:'Understand the goal, the audience, and what success should look like.'},{n:'02',title:'Design',text:'Shape the structure, visual language, and key interactions.'},{n:'03',title:'Build',text:'Turn the approved direction into a responsive working experience.'},{n:'04',title:'Refine',text:'Check the details, fix issues, and prepare for launch.'}].map(s=><article className="process-step" key={s.n}><span className="process-number">{s.n}</span><div className="process-connector"/><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>
      <section className="contact-section" id="contact"><div className="section-wrap"><div className="section-kicker"><span>06 / LET'S MAKE SOMETHING</span><span className="kicker-rule"/></div><div className="contact-grid"><div className="contact-copy"><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let's build<br/><span className="gradient-text">something useful.</span></h2><p>Tell me what you're working on. I’ll be happy to discuss your idea and possible next steps.</p><div className="contact-methods"><a href="mailto:kiishiyusuf@gmail.com"><Mail size={17}/>kiishiyusuf@gmail.com</a><a href="tel:+2349030226152"><Phone size={17}/>+234 903 022 6152</a><span><MapPin size={17}/>Abeokuta, Ogun State, Nigeria</span></div><div className="social-row"><a href="https://wa.me/2349030226152" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a><a href="mailto:kiishiyusuf@gmail.com" aria-label="Email"><Send/></a><a href="https://www.google.com/search?q=Yusuf+Iteoluwakiishi+portfolio" target="_blank" rel="noreferrer" aria-label="Web"><Globe/></a></div></div>
        <form className="contact-form glass" onSubmit={submitForm}><div className="form-heading"><span>PROJECT ENQUIRY</span><span className="form-step">01 — 04</span></div><label>Your name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required maxLength={100} placeholder="Name"/></label><label>Email address<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required maxLength={254} placeholder="you@example.com"/></label><label>What do you need?<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Website design</option><option>Frontend development</option><option>Backend development</option><option>E-commerce</option><option>Website redesign</option><option>Other</option></select></label><label>Tell me about the project<textarea value={form.details} onChange={e=>setForm({...form,details:e.target.value})} required minLength={10} maxLength={5000} rows={4} placeholder="A little about your idea, timeline, and goals…"/></label><label className="honeypot" aria-hidden="true">Leave this field empty<input tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)}/></label><button className="button button-primary submit-button" disabled={submitting} type="submit">{submitting?'Submitting…':'Send project enquiry'} <ArrowUpRight size={17}/></button>{sent&&<p className="form-status success">Thanks — your enquiry has been submitted.</p>}{submitError&&<p className="form-status error">{submitError}</p>}<p className="form-privacy">Your details are used only to respond to your enquiry. Prefer direct contact? <a href="mailto:kiishiyusuf@gmail.com">Email me instead.</a></p></form></div></div></section>
    </main>
    <footer className="section-wrap footer"><a href="#home" className="brand footer-brand"><span className="brand-mark">Y<span>.</span></span><span className="brand-name">YUSUF ITEOLUWAKIISHI<small>DESIGN × DEVELOPMENT</small></span></a><span className="footer-note">MADE WITH INTENT <span>✳</span> BUILT WITH CARE</span><span className="footer-copy">© 2026 YI / ALL RIGHTS RESERVED</span><a href="#home" className="back-top" aria-label="Back to top"><ArrowUpRight size={17}/></a></footer>
    <a className="whatsapp-float" href="https://wa.me/2349030226152" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={20}/><span>Let's chat</span></a>
  </div>;
}