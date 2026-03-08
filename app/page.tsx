<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>En Búsqueda de Bitcoin — Juego Educativo</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');

:root {
  --ink: #1a0a2e;
  --paper: #fdf6e3;
  --gold: #f7c948;
  --orange: #ff6b35;
  --blue: #2563eb;
  --red: #dc2626;
  --green: #16a34a;
  --purple: #7c3aed;
  --teal: #0891b2;
  --panel-shadow: 4px 4px 0 #1a0a2e;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: var(--ink); font-family: 'Comic Neue', cursive; overflow-x: hidden; min-height: 100vh; }

/* ═══ SCREENS ═══ */
.screen { display: none; min-height: 100vh; }
.screen.active { display: flex; flex-direction: column; }

/* ═══ WORLD MAP ═══ */
#screen-map {
  background: var(--ink);
  align-items: center;
  padding: 1.5rem 1rem;
  position: relative;
  overflow: hidden;
}
#screen-map::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 70%, rgba(247,201,72,0.08) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(37,99,235,0.08) 0%, transparent 50%);
}
.map-title {
  font-family: 'Bangers', cursive;
  font-size: clamp(2rem,6vw,3.5rem);
  color: var(--gold);
  letter-spacing: 4px;
  text-shadow: 4px 4px 0 var(--orange);
  text-align: center;
  margin-bottom: 0.3rem;
  position: relative;
  z-index: 2;
}
.map-subtitle {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.5);
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}
.chapters-path {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 2;
}
.path-line {
  width: 3px;
  height: 20px;
  background: rgba(255,255,255,0.15);
  margin: 0 auto;
  border-radius: 2px;
}
.chapter-node {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.04);
  border: 2px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}
.chapter-node.unlocked { border-color: rgba(247,201,72,0.4); cursor: pointer; }
.chapter-node.unlocked:hover { background: rgba(247,201,72,0.08); border-color: var(--gold); transform: translateX(6px); }
.chapter-node.completed { border-color: rgba(22,163,74,0.5); background: rgba(22,163,74,0.05); }
.chapter-node.locked { opacity: 0.35; cursor: not-allowed; }
.node-number {
  width: 52px; height: 52px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Bangers', cursive;
  font-size: 1.5rem;
  letter-spacing: 1px;
  flex-shrink: 0;
  border: 3px solid currentColor;
}
.chapter-node.unlocked .node-number { background: rgba(247,201,72,0.15); color: var(--gold); }
.chapter-node.completed .node-number { background: rgba(22,163,74,0.2); color: #4ade80; }
.chapter-node.locked .node-number { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); }
.node-info { flex: 1; }
.node-title { font-family: 'Bangers', cursive; font-size: 1.2rem; letter-spacing: 1px; color: white; margin-bottom: 0.2rem; }
.chapter-node.completed .node-title { color: #4ade80; }
.node-desc { font-size: 0.78rem; color: rgba(255,255,255,0.5); line-height: 1.4; }
.node-badge {
  font-size: 0.65rem;
  font-family: 'Space Mono', monospace;
  letter-spacing: 1px;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
}
.node-badge.done { background: rgba(22,163,74,0.2); color: #4ade80; border: 1px solid #16a34a; }
.node-badge.go { background: rgba(247,201,72,0.2); color: var(--gold); border: 1px solid var(--gold); }
.node-badge.lock { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.1); }
.map-progress {
  margin-top: 1.5rem;
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 2;
}
.map-progress-label { font-size: 0.75rem; color: rgba(255,255,255,0.5); font-family: 'Space Mono', monospace; letter-spacing: 1px; margin-bottom: 0.4rem; text-align: center; }
.map-progress-bar { height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; }
.map-progress-fill { height: 100%; background: linear-gradient(90deg, var(--gold), var(--orange)); border-radius: 4px; transition: width 0.8s ease; }

/* ═══ COMIC SCREEN ═══ */
#screen-comic { background: var(--paper); padding: 1rem; align-items: center; }
.chapter-header {
  font-family: 'Bangers', cursive;
  font-size: 2rem;
  color: var(--ink);
  letter-spacing: 3px;
  text-align: center;
  padding: 0.7rem 1.5rem;
  background: var(--gold);
  border: 4px solid var(--ink);
  box-shadow: var(--panel-shadow);
  margin-bottom: 1.2rem;
  width: 100%;
  max-width: 900px;
}
.comic-grid {
  display: grid;
  gap: 8px;
  max-width: 900px;
  width: 100%;
  margin-bottom: 1.2rem;
}
.panel {
  background: white;
  border: 3px solid var(--ink);
  box-shadow: var(--panel-shadow);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
.panel-art {
  width: 100%;
  aspect-ratio: 16/7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.panel-caption {
  background: var(--ink);
  color: var(--gold);
  font-family: 'Bangers', cursive;
  font-size: 0.75rem;
  letter-spacing: 1px;
  padding: 0.25rem 0.5rem;
  position: absolute;
  top: 6px; left: 6px;
  border-radius: 2px;
  z-index: 5;
}
.speech-bubble {
  background: white;
  border: 2.5px solid var(--ink);
  border-radius: 14px;
  padding: 0.4rem 0.7rem;
  font-weight: 700;
  font-size: 0.72rem;
  color: var(--ink);
  position: absolute;
  max-width: 70%;
  line-height: 1.4;
  z-index: 10;
  box-shadow: 2px 2px 0 var(--ink);
}
.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -11px; left: 18px;
  width: 0; height: 0;
  border-left: 7px solid transparent;
  border-right: 4px solid transparent;
  border-top: 11px solid var(--ink);
}
.speech-bubble.right::after { left:auto; right:18px; }
.narr {
  background: var(--gold);
  border: 2px solid var(--ink);
  padding: 0.35rem 0.7rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--ink);
  position: absolute;
  bottom: 7px; left: 7px; right: 7px;
  z-index: 10;
  line-height: 1.4;
}
.panel-text {
  padding: 0.5rem 0.7rem;
  font-size: 0.78rem;
  color: var(--ink);
  font-weight: 700;
  line-height: 1.5;
  border-top: 2px solid var(--ink);
}
.continue-btn {
  font-family: 'Bangers', cursive;
  font-size: 1.4rem;
  letter-spacing: 2px;
  background: var(--orange);
  color: white;
  border: 4px solid var(--ink);
  padding: 0.65rem 2.2rem;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: var(--panel-shadow);
  transition: transform 0.1s, box-shadow 0.1s;
}
.continue-btn:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--ink); }
.back-btn {
  font-family: 'Bangers', cursive;
  font-size: 1rem;
  color: rgba(0,0,0,0.4);
  background: transparent;
  border: 2px solid rgba(0,0,0,0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 0.8rem;
  align-self: flex-start;
}

/* ═══ QUESTION ═══ */
#screen-question {
  background: var(--ink);
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.question-box { max-width: 580px; width: 100%; text-align: center; }
.question-badge {
  font-family: 'Bangers', cursive;
  font-size: 0.95rem;
  letter-spacing: 3px;
  color: var(--ink);
  background: var(--orange);
  display: inline-block;
  padding: 0.3rem 1.5rem;
  border: 3px solid var(--ink);
  box-shadow: var(--panel-shadow);
  margin-bottom: 1.2rem;
}
.question-text {
  font-family: 'Bangers', cursive;
  font-size: clamp(1.3rem,3.5vw,1.9rem);
  color: white;
  letter-spacing: 1px;
  line-height: 1.35;
  margin-bottom: 0.6rem;
  background: rgba(255,255,255,0.05);
  border: 3px solid rgba(255,255,255,0.15);
  padding: 1.2rem;
  border-radius: 8px;
}
.question-hint { color: rgba(255,255,255,0.45); font-size: 0.8rem; margin-bottom: 1.5rem; font-style: italic; }
.answer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; margin-bottom: 1.2rem; }
.answer-btn {
  font-family: 'Comic Neue', cursive;
  font-weight: 700;
  font-size: 0.9rem;
  background: rgba(255,255,255,0.07);
  color: white;
  border: 2.5px solid rgba(255,255,255,0.2);
  padding: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  line-height: 1.4;
}
.answer-btn:hover { background: rgba(247,201,72,0.12); border-color: var(--gold); color: var(--gold); transform: translateX(3px); }
.answer-btn.correct { background: rgba(22,163,74,0.25); border-color: var(--green); color: #4ade80; }
.answer-btn.wrong { background: rgba(220,38,38,0.25); border-color: var(--red); color: #f87171; animation: shake 0.4s ease; }
@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
.feedback-msg { font-family: 'Bangers', cursive; font-size: 1.2rem; letter-spacing: 2px; padding: 0.7rem 1.2rem; border-radius: 6px; display: none; margin-bottom: 0.8rem; }
.feedback-msg.show { display: block; }
.feedback-msg.correct { background: rgba(22,163,74,0.18); color: #4ade80; border: 2px solid var(--green); }
.feedback-msg.wrong { background: rgba(220,38,38,0.18); color: #f87171; border: 2px solid var(--red); }

/* ═══ SCENE ═══ */
#screen-scene { background: #1a0a2e; align-items: center; padding: 1rem; }
.scene-header { width:100%; max-width:900px; display:flex; align-items:center; justify-content:space-between; margin-bottom:0.6rem; flex-wrap:wrap; gap:0.5rem; }
.scene-title { font-family:'Bangers',cursive; font-size:1.4rem; color:var(--gold); letter-spacing:2px; }
.objects-counter { font-family:'Space Mono',monospace; font-size:0.8rem; color:white; background:rgba(255,255,255,0.1); padding:0.3rem 0.7rem; border-radius:4px; border:1px solid rgba(255,255,255,0.15); }
.attempts-counter { font-family:'Space Mono',monospace; font-size:0.8rem; color:white; background:rgba(220,38,38,0.2); padding:0.3rem 0.7rem; border-radius:4px; border:1px solid rgba(220,38,38,0.4); }
.scene-mission { font-size:0.85rem; color:rgba(255,255,255,0.65); background:rgba(247,201,72,0.08); border:1px solid rgba(247,201,72,0.25); padding:0.5rem 1rem; border-radius:4px; width:100%; max-width:900px; margin-bottom:0.7rem; text-align:center; }
.scene-wrapper { position:relative; width:100%; max-width:900px; border:4px solid var(--ink); box-shadow:0 0 40px rgba(247,201,72,0.12); overflow:hidden; border-radius:4px; cursor:crosshair; }
.room { width:100%; min-height:380px; position:relative; overflow:hidden; }
.deco { position:absolute; z-index:5; pointer-events:none; }
.hidden-obj { position:absolute; cursor:pointer; transition:filter 0.2s; z-index:20; user-select:none; }
/* REMOVIDO: hover que ilumina los objetos */
.hidden-obj.found { filter:drop-shadow(0 0 20px #4ade80) brightness(1.5); animation:foundPop 0.5s ease; pointer-events:none; }
@keyframes foundPop { 0%{transform:scale(1)} 40%{transform:scale(1.3)} 100%{transform:scale(1.1)} }
.objects-pane { width:100%; max-width:900px; margin-top:0.7rem; display:flex; gap:0.5rem; flex-wrap:wrap; }
.obj-item { display:flex; align-items:center; gap:0.5rem; background:rgba(255,255,255,0.05); border:2px solid rgba(255,255,255,0.1); border-radius:6px; padding:0.4rem 0.7rem; font-size:0.78rem; color:rgba(255,255,255,0.55); transition:all 0.3s; flex:1; min-width:130px; }
.obj-item.collected { background:rgba(22,163,74,0.12); border-color:var(--green); color:#4ade80; }
.obj-item .obj-icon { font-size:1.1rem; }
.obj-item .obj-check { margin-left:auto; opacity:0; transition:opacity 0.3s; }
.obj-item.collected .obj-check { opacity:1; }

/* ═══ GAME OVER ═══ */
#screen-gameover { background:var(--ink); align-items:center; justify-content:center; padding:2rem; }
.gameover-content { text-align:center; max-width:500px; }
.gameover-emoji { font-size:4rem; margin-bottom:1rem; }
.gameover-title { font-family:'Bangers',cursive; font-size:2.5rem; color:var(--red); letter-spacing:3px; text-shadow:3px 3px 0 rgba(0,0,0,0.3); margin-bottom:1rem; }
.gameover-message { color:rgba(255,255,255,0.7); font-size:1rem; line-height:1.6; margin-bottom:1.5rem; }
.btn-retry { font-family:'Bangers',cursive; font-size:1.3rem; letter-spacing:2px; background:var(--orange); color:white; border:3px solid var(--ink); padding:0.6rem 1.5rem; border-radius:4px; cursor:pointer; box-shadow:4px 4px 0 var(--ink); margin:0.5rem; transition:transform 0.1s; }
.btn-retry:hover { transform:translate(-2px,-2px); box-shadow:6px 6px 0 var(--ink); }
.btn-map { font-family:'Bangers',cursive; font-size:1.1rem; letter-spacing:2px; background:transparent; color:var(--gold); border:2px solid var(--gold); padding:0.5rem 1.2rem; border-radius:4px; cursor:pointer; margin:0.5rem; }

/* ═══ VICTORY ═══ */
#screen-victory { background:var(--ink); align-items:center; justify-content:center; padding:2rem; }
.confetti-area { position:fixed; inset:0; pointer-events:none; z-index:1; }
.confetti-piece { position:absolute; width:10px; height:10px; animation:confettiFall linear infinite; opacity:0; }
@keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
.victory-content { text-align:center; max-width:580px; position:relative; z-index:2; }
.victory-emoji { font-size:3.5rem; display:block; margin-bottom:0.8rem; animation:bounce 1s ease-in-out infinite; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
.victory-title { font-family:'Bangers',cursive; font-size:2.8rem; color:var(--gold); letter-spacing:4px; text-shadow:4px 4px 0 var(--orange); margin-bottom:0.8rem; }
.victory-message { background:rgba(255,255,255,0.04); border:3px solid var(--gold); border-radius:8px; padding:1.2rem; margin-bottom:1.2rem; }
.verdict-text { font-family:'Bangers',cursive; font-size:1.4rem; color:var(--gold); letter-spacing:1px; margin-bottom:0.4rem; }
.verdict-body { color:rgba(255,255,255,0.8); font-size:0.95rem; line-height:1.7; }
.fact-highlight { background:var(--gold); color:var(--ink); font-weight:700; padding:0.15rem 0.45rem; border-radius:3px; }
.facts-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; margin-bottom:1.2rem; }
.fact-card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.12); border-radius:6px; padding:0.7rem; text-align:center; }
.fact-card-icon { font-size:1.3rem; margin-bottom:0.2rem; }
.fact-card-label { font-size:0.65rem; color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:1px; }
.fact-card-value { font-family:'Bangers',cursive; font-size:1rem; color:white; letter-spacing:1px; }
.btn-primary { font-family:'Bangers',cursive; font-size:1.6rem; letter-spacing:3px; background:var(--gold); color:var(--ink); border:4px solid var(--ink); padding:0.75rem 2.5rem; border-radius:4px; cursor:pointer; box-shadow:5px 5px 0 var(--ink); transition:transform 0.1s,box-shadow 0.1s; }
.btn-primary:hover { transform:translate(-2px,-2px); box-shadow:7px 7px 0 var(--ink); }
.btn-secondary { font-family:'Bangers',cursive; font-size:1.2rem; letter-spacing:2px; background:transparent; color:var(--gold); border:2px solid var(--gold); padding:0.5rem 1.5rem; border-radius:4px; cursor:pointer; margin-top:0.8rem; transition:all 0.15s; }
.btn-secondary:hover { background:rgba(247,201,72,0.1); }
.next-chapter-hint { color:rgba(255,255,255,0.35); font-size:0.75rem; margin-top:1rem; font-family:'Space Mono',monospace; }

/* Tooltip */
.obj-tooltip { position:fixed; background:var(--ink); color:var(--gold); border:2px solid var(--gold); padding:0.35rem 0.7rem; font-size:0.78rem; font-weight:700; border-radius:4px; pointer-events:none; z-index:1000; display:none; max-width:190px; text-align:center; }
.click-ripple { position:fixed; width:38px; height:38px; border:3px solid var(--gold); border-radius:50%; pointer-events:none; z-index:999; animation:rippleOut 0.45s ease-out forwards; transform:translate(-50%,-50%); }
@keyframes rippleOut { from{transform:translate(-50%,-50%) scale(0);opacity:1} to{transform:translate(-50%,-50%) scale(3);opacity:0} }
.wrong-flash { position:fixed; inset:0; background:rgba(220,38,38,0.15); pointer-events:none; z-index:999; animation:flashRed 0.35s ease forwards; }
@keyframes flashRed { from{opacity:1} to{opacity:0} }

/* INTRO SCREEN */
#screen-intro { background:var(--ink); align-items:center; justify-content:center; padding:2rem; position:relative; overflow:hidden; }
#screen-intro::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 20% 80%,rgba(247,201,72,0.12) 0%,transparent 50%), radial-gradient(circle at 80% 20%,rgba(37,99,235,0.12) 0%,transparent 50%); }
.intro-content { text-align:center; position:relative; z-index:2; max-width:560px; }
.bitcoin-logo { font-size:4.5rem; animation:float 3s ease-in-out infinite; display:block; margin-bottom:0.8rem; }
@keyframes float { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-14px) rotate(5deg)} }
.intro-title { font-family:'Bangers',cursive; font-size:clamp(2.5rem,7vw,4rem); color:var(--gold); letter-spacing:3px; text-shadow:4px 4px 0 var(--orange); line-height:1; margin-bottom:0.4rem; }
.intro-subtitle { font-family:'Bangers',cursive; font-size:clamp(1rem,2.5vw,1.5rem); color:white; letter-spacing:2px; margin-bottom:1.5rem; opacity:0.75; }
.intro-desc { background:rgba(255,255,255,0.04); border:2px solid var(--gold); border-radius:8px; padding:1.2rem; color:rgba(255,255,255,0.8); font-size:0.9rem; line-height:1.7; margin-bottom:1.8rem; text-align:left; }
.intro-steps { display:grid; gap:0.5rem; margin-bottom:0.5rem; }
.step-row { display:flex; align-items:center; gap:0.6rem; font-size:0.88rem; }
.step-icon { font-size:1.1rem; width:28px; flex-shrink:0; }
.attempts-warning { background:rgba(220,38,38,0.15); border:1px solid rgba(220,38,38,0.4); border-radius:6px; padding:0.5rem 0.8rem; margin-top:0.8rem; }
.attempts-warning-text { color:#f87171; font-size:0.8rem; font-weight:700; }
</style>
</head>
<body>

<div class="obj-tooltip" id="tooltip"></div>

<!-- ═══════════════ INTRO ═══════════════ -->
<div class="screen active" id="screen-intro">
  <div class="intro-content">
    <span class="bitcoin-logo">₿</span>
    <div class="intro-title">EN BÚSQUEDA DE BITCOIN</div>
    <div class="intro-subtitle">LA AVENTURA CÓMICA</div>
    <div class="intro-desc">
      <strong style="color:var(--gold)">¿Cómo funciona este juego?</strong>
      <div class="intro-steps" style="margin-top:0.8rem">
        <div class="step-row"><span class="step-icon">📖</span><span>Lee el <strong>cómic</strong> de cada capítulo</span></div>
        <div class="step-row"><span class="step-icon">❓</span><span>Responde la <strong>pregunta</strong> de control</span></div>
        <div class="step-row"><span class="step-icon">🔍</span><span>Encuentra los <strong>objetos ocultos</strong> en el escenario</span></div>
        <div class="step-row"><span class="step-icon">🏆</span><span>¡Desbloquea el siguiente capítulo!</span></div>
      </div>
      <div class="attempts-warning">
        <div class="attempts-warning-text">⚠️ ¡CUIDADO! Solo tienes 3 intentos de error por nivel</div>
      </div>
    </div>
    <button class="btn-primary" onclick="goTo('screen-map')">¡COMENZAR LA AVENTURA! ⚡</button>
  </div>
</div>

<!-- ═══════════════ MAPA ═══════════════ -->
<div class="screen" id="screen-map">
  <div class="map-title">MAPA DEL VIAJE</div>
  <div class="map-subtitle">TU DIPLOMA BITCOIN — 5 CAPÍTULOS</div>

  <div class="chapters-path" id="chapters-path">
    <!-- Generated by JS -->
  </div>

  <div class="map-progress" style="margin-top:1.5rem">
    <div class="map-progress-label" id="progress-label">PROGRESO: 0 / 5 CAPÍTULOS</div>
    <div class="map-progress-bar"><div class="map-progress-fill" id="progress-fill" style="width:0%"></div></div>
  </div>
</div>

<!-- ═══════════════ COMIC ═══════════════ -->
<div class="screen" id="screen-comic">
  <button class="back-btn" onclick="goTo('screen-map')" style="align-self:flex-start;margin:0.5rem">← MAPA</button>
  <div class="chapter-header" id="comic-header">CAPÍTULO</div>
  <div class="comic-grid" id="comic-grid"></div>
  <button class="continue-btn" id="comic-continue-btn" onclick="goToQuestion()">¿LISTO? RESPONDE LA PREGUNTA ➜</button>
</div>

<!-- ═══════════════ PREGUNTA ═══════════════ -->
<div class="screen" id="screen-question">
  <div class="question-box">
    <div class="question-badge" id="q-badge">⚡ CHECKPOINT ⚡</div>
    <div class="question-text" id="q-text"></div>
    <div class="question-hint" id="q-hint">💡 Recuerda lo que leíste en el cómic</div>
    <div class="answer-grid" id="answer-grid"></div>
    <div class="feedback-msg" id="feedback-msg"></div>
  </div>
</div>

<!-- ═══════════════ ESCENARIO ═══════════════ -->
<div class="screen" id="screen-scene">
  <div class="scene-header">
    <div class="scene-title" id="scene-title">🔍 ESCENARIO</div>
    <div style="display:flex;gap:0.5rem">
      <div class="attempts-counter" id="attempts-counter">❤️ Intentos: 3</div>
      <div class="objects-counter" id="objects-counter">Objetos: 0 / 4</div>
    </div>
  </div>
  <div class="scene-mission" id="scene-mission">🎯 Misión: Encuentra los objetos ocultos relacionados con lo que leíste.</div>
  <div class="scene-wrapper" id="scene-wrapper">
    <div class="room" id="room"></div>
  </div>
  <div class="objects-pane" id="objects-pane"></div>
</div>

<!-- ═══════════════ GAME OVER ═══════════════ -->
<div class="screen" id="screen-gameover">
  <div class="gameover-content">
    <div class="gameover-emoji">💔</div>
    <div class="gameover-title">¡SIN INTENTOS!</div>
    <div class="gameover-message">
      Te quedaste sin intentos para encontrar los objetos.<br>
      ¡No te preocupes! Puedes intentarlo de nuevo.
    </div>
    <button class="btn-retry" onclick="retryScene()">🔄 REINTENTAR NIVEL</button>
    <br>
    <button class="btn-map" onclick="goTo('screen-map')">🗺️ VOLVER AL MAPA</button>
  </div>
</div>

<!-- ═══════════════ VICTORIA ═══════════════ -->
<div class="screen" id="screen-victory">
  <div class="confetti-area" id="confetti-area"></div>
  <div class="victory-content">
    <span class="victory-emoji" id="v-emoji">🏆</span>
    <div class="victory-title" id="v-title">¡COMPLETADO!</div>
    <div class="victory-message">
      <div class="verdict-text">✅ ¡Lo aprendiste todo!</div>
      <div class="verdict-body" id="v-body"></div>
    </div>
    <div class="facts-grid" id="v-facts"></div>
    <button class="btn-primary" id="v-next-btn" onclick="nextChapter()">SIGUIENTE CAPÍTULO ➜</button>
    <br>
    <button class="btn-secondary" onclick="goTo('screen-map')">🗺️ VER MAPA</button>
    <div class="next-chapter-hint" id="v-hint"></div>
  </div>
</div>

<script>
// ═══════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════
let currentChapter = 0;
let foundObjects = new Set();
let completedChapters = new Set();
let attemptsLeft = 3;
const MAX_ATTEMPTS = 3;

// ═══════════════════════════════════════════════════
// CHAPTER DATA
// ═══════════════════════════════════════════════════
const chapters = [

// ─────────────────────────────────────────────────
// CAP 1: EL ORIGEN DE BITCOIN
// ─────────────────────────────────────────────────
{
  id: 1,
  mapTitle: "EL NACIMIENTO DE BITCOIN",
  mapDesc: "Satoshi Nakamoto y el año 2008",
  mapIcon: "₿",
  comicTitle: "CAPÍTULO 1: EL NACIMIENTO DE BITCOIN",
  comicColor: "#f7c948",
  panels: [
    {
      bg: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
      caption: "2008 — EL MUNDO",
      aspect: "3/2",
      artHTML: `
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.4rem;padding:0.8rem">
          <div style="display:flex;gap:0.5rem;font-size:1.6rem">💸🏦💸📉</div>
          <div style="font-family:'Space Mono',monospace;font-size:0.7rem;color:#ff6666;text-align:center">WALL STREET: -40%<br>BANCOS COLAPSANDO</div>
        </div>
        <div class="speech-bubble" style="bottom:8px;right:8px;max-width:58%">¡Los bancos nos fallaron... otra vez! 😤</div>`,
      text: "El año 2008. Una crisis financiera sacude al mundo. Los bancos imprimían dinero sin control. Alguien observaba y tenía un plan."
    },
    {
      bg: "linear-gradient(135deg,#1a0a2e,#16213e)",
      caption: "EL MISTERIOSO SATOSHI",
      aspect: "3/2",
      artHTML: `
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.3rem">
          <div style="font-size:3rem;filter:drop-shadow(0 0 12px rgba(247,201,72,0.8))">🥷</div>
          <div style="font-family:'Bangers',cursive;font-size:1.1rem;color:#f7c948;letter-spacing:2px">SATOSHI NAKAMOTO</div>
          <div style="font-size:0.6rem;color:rgba(255,255,255,0.4);font-family:'Space Mono',monospace">IDENTIDAD: DESCONOCIDA</div>
        </div>`,
      text: "Satoshi Nakamoto — quizás un seudónimo, quizás un grupo. Nadie sabe. Pero en 2008, este personaje cambiaría el mundo."
    },
    {
      bg: "linear-gradient(135deg,#0d0d0d,#1a0a2e)",
      caption: "31 OCT 2008",
      aspect: "3/2",
      artHTML: `
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.4rem">
          <div style="font-size:2rem">📄</div>
          <div style="background:rgba(247,201,72,0.1);border:1px solid #f7c948;padding:0.3rem 0.7rem;text-align:center">
            <div style="font-family:'Bangers',cursive;font-size:0.85rem;color:#f7c948">BITCOIN WHITEPAPER</div>
            <div style="font-size:0.55rem;color:rgba(255,255,255,0.6);font-family:'Space Mono',monospace;line-height:1.5">A Peer-to-Peer<br>Electronic Cash System</div>
          </div>
          <div class="speech-bubble" style="position:relative;bottom:auto;right:auto;font-size:0.65rem">Dinero sin bancos ni gobiernos... 💡</div>
        </div>`,
      text: "El 31 de octubre de 2008: Satoshi publica el Whitepaper de Bitcoin. 9 páginas que proponen dinero digital directo entre personas."
    },
    {
      bg: "linear-gradient(135deg,#0f3460,#16213e)",
      caption: "3 ENERO 2009 — BLOQUE GÉNESIS",
      aspect: "3/2",
      artHTML: `
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:1rem;padding:0.8rem">
          <div style="font-size:3rem;filter:drop-shadow(0 0 20px #f7c948);animation:glow 2s ease-in-out infinite">₿</div>
          <div style="font-family:'Space Mono',monospace;font-size:0.58rem;color:rgba(247,201,72,0.85);line-height:1.9">
            BLOQUE #0<br>"The Times 03/Jan/2009<br>Banks bailout..."<br>RECOMPENSA: 50 BTC
          </div>
        </div>
        <style>@keyframes glow{0%,100%{filter:drop-shadow(0 0 10px #f7c948)}50%{filter:drop-shadow(0 0 25px #f7c948)}}</style>
        <div class="speech-bubble" style="bottom:8px;left:8px">¡El primer Bitcoin existe! 🎉</div>`,
      text: "El 3 de enero de 2009: Satoshi mina el Bloque Génesis. Dejó un mensaje: el titular de un periódico sobre el rescate bancario. Un mensaje claro."
    }
  ],
  question: {
    text: "¿En qué año publicó Satoshi Nakamoto el Whitepaper de Bitcoin?",
    hint: "💡 Fue durante una gran crisis financiera mundial",
    answers: [
      { text: "📅 2005 — Tras el boom de internet", correct: false },
      { text: "📅 2010 — Un año después de la crisis", correct: false },
      { text: "📅 2008 — En plena crisis financiera global", correct: true },
      { text: "📅 2013 — Cuando Bitcoin ya era famoso", correct: false }
    ]
  },
  scene: {
    title: "🔍 EL CUARTO DE SATOSHI",
    mission: "Encuentra los 4 objetos relacionados con el origen de Bitcoin",
    bgColor: "linear-gradient(180deg,#0d0020 0%,#1a0535 40%,#0f1a2e 100%)",
    objects: [
      { id:1, icon:"🖼️", label:"Retrato de Satoshi", tip:"¡El retrato misterioso de Satoshi!", style:"top:55px;left:18%", render: `<div style="width:52px;height:62px;background:linear-gradient(135deg,#1a0a10,#2d1520);border:5px solid #6b4020;border-radius:1px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:3px 3px 8px rgba(0,0,0,0.5);position:relative"><div style="font-size:1.5rem">🥷</div><div style="font-family:'Space Mono',monospace;font-size:0.3rem;color:rgba(247,201,72,0.7);margin-top:1px">SATOSHI</div><div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);width:3px;height:10px;background:#6b4020"></div></div>` },
      { id:2, icon:"🕰️", label:"Reloj año 2008", tip:"¡El reloj marca el año 2008!", style:"top:42px;right:22%", render: `<div style="width:48px;height:48px;background:radial-gradient(circle,#2a2a2a 60%,#111 100%);border:3px solid #888;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 8px rgba(0,0,0,0.5);position:relative"><div style="font-size:0.65rem;color:#f7c948;font-family:'Space Mono',monospace;font-weight:700;line-height:1.2;text-align:center">20<br>08</div></div>` },
      { id:3, icon:"📄", label:"El Whitepaper", tip:"¡El Whitepaper original de Bitcoin!", style:"bottom:90px;left:12%", render: `<div style="width:40px;height:52px;background:#fdf6e3;border:2px solid #aaa;border-radius:1px;padding:3px;box-shadow:2px 2px 5px rgba(0,0,0,0.4);transform:rotate(3deg)"><div style="font-size:0.35rem;color:#000;font-family:'Space Mono',monospace;font-weight:bold;border-bottom:1px solid #ccc;margin-bottom:1px;text-align:center">₿BITCOIN</div><div style="font-size:0.3rem;color:#444;line-height:1.4">Peer-to-Peer<br>Cash System<br>S.Nakamoto<br>Oct 2008</div></div>` },
      { id:4, icon:"📰", label:"The Times newspaper", tip:"¡El periódico del Bloque Génesis!", style:"bottom:72px;right:20%", render: `<div style="width:46px;height:33px;background:#f5f0e0;border:1px solid #aaa;padding:2px 3px;box-shadow:1px 1px 4px rgba(0,0,0,0.5);transform:rotate(-4deg)"><div style="font-size:0.32rem;color:#000;font-family:'Space Mono',monospace;font-weight:bold;border-bottom:1px solid #999;margin-bottom:1px">THE TIMES</div><div style="font-size:0.27rem;color:#333;line-height:1.3">03/Jan/2009<br>Banks bailout...</div></div>` }
    ],
    decorHTML: `
      <div class="deco" style="top:50px;left:55px;width:120px;height:80px;background:linear-gradient(135deg,#0d1b4b,#1a3a7a);border:5px solid #4a2c0a;overflow:hidden">
        <div style="position:absolute;left:50%;top:0;bottom:0;width:3px;background:#4a2c0a;transform:translateX(-50%)"></div>
        <div style="position:absolute;top:50%;left:0;right:0;height:3px;background:#4a2c0a;transform:translateY(-50%)"></div>
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:rgba(255,255,255,0.2)">🌙</div>
      </div>
      <div class="deco" style="bottom:68px;left:50%;transform:translateX(-50%);width:52%;height:10px;background:linear-gradient(180deg,#4a2c0a,#2d1a05);border:2px solid #6b3d0f;border-radius:2px;box-shadow:0 4px 16px rgba(0,0,0,0.4)"></div>
      <div class="deco" style="bottom:78px;left:50%;margin-left:-30px;width:72px;height:50px;background:#0d0020;border:2px solid #333;border-radius:2px;display:flex;align-items:center;justify-content:center">
        <div style="width:90%;height:80%;background:linear-gradient(135deg,#001a33,#003366);font-size:0.38rem;color:#00ff88;font-family:'Space Mono',monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.4">bitcoin.org<br><span style="color:#ffff00;font-size:0.35rem">GENESIS</span></div>
      </div>
      <div class="deco" style="bottom:65px;right:30px;opacity:0.12;font-size:2.5rem">🥷</div>`
  },
  victory: {
    emoji: "🏆",
    title: "¡CAPÍTULO 1 COMPLETADO!",
    body: `<span class="fact-highlight">Satoshi Nakamoto</span> publicó el Whitepaper de Bitcoin en <span class="fact-highlight">octubre de 2008</span>, como respuesta a la crisis financiera global. El primer bloque fue minado el <span class="fact-highlight">3 de enero de 2009</span>.`,
    facts: [
      { icon:"🥷", label:"Creador", value:"SATOSHI NAKAMOTO" },
      { icon:"📅", label:"Whitepaper", value:"31 OCT 2008" },
      { icon:"⛏️", label:"Bloque Génesis", value:"3 ENE 2009" },
      { icon:"₿", label:"Primera recompensa", value:"50 BTC" }
    ]
  }
},

// ─────────────────────────────────────────────────
// CAP 2: ¿POR QUÉ NECESITAMOS DINERO?
// ─────────────────────────────────────────────────
{
  id: 2,
  mapTitle: "¿POR QUÉ NECESITAMOS DINERO?",
  mapDesc: "Del trueque a las monedas — historia del dinero",
  mapIcon: "💰",
  comicTitle: "CAPÍTULO 2: ¿POR QUÉ NECESITAMOS DINERO?",
  comicColor: "#ff6b35",
  panels: [
    {
      bg: "linear-gradient(135deg,#1a0a00,#3d1f00)",
      caption: "9,000 A.C. — EL TRUEQUE",
      aspect: "3/2",
      artHTML: `
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:0.8rem;flex-wrap:wrap;padding:0.8rem">
          <div style="text-align:center"><div style="font-size:2rem">🐄</div><div style="font-size:0.55rem;color:rgba(255,255,255,0.6)">3 vacas</div></div>
          <div style="font-family:'Bangers',cursive;color:#ff6b35;font-size:1.5rem">⟷</div>
          <div style="text-align:center"><div style="font-size:2rem">🌾</div><div style="font-size:0.55rem;color:rgba(255,255,255,0.6)">100 sacos</div></div>
          <div style="font-family:'Bangers',cursive;color:#ff6b35;font-size:1.5rem">⟷</div>
          <div style="text-align:center"><div style="font-size:2rem">🔨</div><div style="font-size:0.55rem;color:rgba(255,255,255,0.6)">1 hacha</div></div>
        </div>
        <div class="speech-bubble" style="bottom:8px;left:8px;font-size:0.65rem">¡Pero yo no quiero tu hacha! 😤</div>`,
      text: "Hace 11,000 años la gente intercambiaba cosas directamente: trueque. ¡Pero imagina intentar comprar pan con una vaca si solo quieres una rebanada!"
    },
    {
      bg: "linear-gradient(135deg,#1a1000,#3d2800)",
      caption: "EL PROBLEMA DEL TRUEQUE",
      aspect: "3/2",
      artHTML: `
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.5rem;padding:0.8rem">
          <div style="display:flex;gap:1rem">
            <div style="text-align:center;font-size:1.8rem">👨‍🌾</div>
            <div style="display:flex;flex-direction:column;justify-content:center;gap:0.2rem">
              <div style="background:rgba(255,107,53,0.2);border:1px solid #ff6b35;padding:0.2rem 0.5rem;font-size:0.58rem;color:#ffaa80;font-weight:700">Tiene: 🌾 trigo</div>
              <div style="background:rgba(37,99,235,0.2);border:1px solid #2563eb;padding:0.2rem 0.5rem;font-size:0.58rem;color:#93c5fd;font-weight:700">Quiere: 🐟 pez</div>
            </div>
            <div style="text-align:center;font-size:1.8rem">👨‍🦯</div>
          </div>
          <div style="font-size:0.62rem;color:rgba(255,255,255,0.7);text-align:center;max-width:80%;line-height:1.5">¿Qué pasa si el pescador<br>no quiere trigo? 🤔</div>
          <div style="font-family:'Bangers',cursive;color:#ff6b35;font-size:1.2rem;letter-spacing:2px">DOBLE COINCIDENCIA DE DESEOS</div>
        </div>`,
      text: "El problema del trueque: necesitas que la otra persona tenga lo que tú quieres, Y que quiera lo que tú ofreces. ¡Casi imposible!"
    },
    {
      bg: "linear-gradient(135deg,#002200,#004400)",
      caption: "LA SOLUCIÓN: MONEDAS DE METAL",
      aspect: "3/2",
      artHTML: `
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:0.6rem;flex-wrap:wrap;padding:0.8rem">
          <div style="font-size:2.5rem;filter:drop-shadow(0 0 8px gold)">🪙</div>
          <div style="text-align:left">
            <div style="font-family:'Bangers',cursive;color:#f7c948;font-size:1.1rem;letter-spacing:1px">EL ORO Y LA PLATA</div>
            <div style="font-size:0.6rem;color:rgba(255,255,255,0.7);line-height:1.6;margin-top:0.3rem">✓ Escaso y difícil de falsificar<br>✓ Aceptado por todos<br>✓ Divisible en monedas<br>✓ Durable — no se echa a perder</div>
          </div>
        </div>
        <div class="narr" style="font-size:0.65rem">700 a.C. — Lidia (actual Turquía) acuña las primeras monedas oficiales</div>`,
      text: "La solución: metales preciosos como el oro y la plata. Escasos, durables y aceptados por todos. ¡El primer dinero \"real\"!"
    },
    {
      bg: "linear-gradient(135deg,#0d0d1a,#1a1a3d)",
      caption: "EL DINERO COMO HERRAMIENTA",
      aspect: "3/2",
      artHTML: `
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:0.7rem;padding:0.8rem;flex-wrap:wrap">
          <div style="text-align:center;background:rgba(247,201,72,0.1);border:2px solid rgba(247,201,72,0.4);border-radius:8px;padding:0.5rem 0.8rem">
            <div style="font-size:1.3rem">📦</div>
            <div style="font-family:'Bangers',cursive;font-size:0.7rem;color:#f7c948;letter-spacing:1px">RESERVA DE VALOR</div>
            <div style="font-size:0.52rem;color:rgba(255,255,255,0.6);margin-top:0.2rem">Guarda riqueza</div>
          </div>
          <div style="text-align:center;background:rgba(37,99,235,0.1);border:2px solid rgba(37,99,235,0.4);border-radius:8px;padding:0.5rem 0.8rem">
            <div style="font-size:1.3rem">🔄</div>
            <div style="font-family:'Bangers',cursive;font-size:0.7rem;color:#93c5fd;letter-spacing:1px">MEDIO DE CAMBIO</div>
            <div style="font-size:0.52rem;color:rgba(255,255,255,0.6);margin-top:0.2rem">Facilita compras</div>
          </div>
          <div style="text-align:center;background:rgba(22,163,74,0.1);border:2px solid rgba(22,163,74,0.4);border-radius:8px;padding:0.5rem 0.8rem">
            <div style="font-size:1.3rem">📏</div>
            <div style="font-family:'Bangers',cursive;font-size:0.7rem;color:#4ade80;letter-spacing:1px">UNIDAD DE CUENTA</div>
            <div style="font-size:0.52rem;color:rgba(255,255,255,0.6);margin-top:0.2rem">Mide precios</div>
          </div>
        </div>`,
      text: "El dinero cumple 3 funciones clave: RESERVAR valor para el futuro, FACILITAR intercambios y MEDIR precios. Sin esto, nuestra economía sería caos."
    }
  ],
  question: {
    text: "¿Cuál era el gran problema del sistema de trueque?",
    hint: "💡 Piensa en lo difícil que era encontrar a alguien que quisiera exactamente lo que tú ofrecías",
    answers: [
      { text: "🐄 Las vacas eran demasiado pesadas para cargar", correct: false },
      { text: "🤝 Necesitabas que ambas partes quieran lo que la otra tiene", correct: true },
      { text: "🌾 Los alimentos se echaban a perder muy rápido", correct: false },
      { text: "📏 No había forma de medir las distancias", correct: false }
    ]
  },
  scene: {
    title: "🔍 EL MERCADO ANTIGUO",
    mission: "Encuentra los 4 objetos que representan las funciones del dinero",
    bgColor: "linear-gradient(180deg,#1a0a00 0%,#2d1a00 40%,#0f0d00 100%)",
    objects: [
      { id:1, icon:"🪙", label:"Moneda de oro", tip:"¡Reserva de valor — el oro fue el primer dinero real!", style:"top:60px;left:20%", render:`<div style="width:45px;height:45px;background:radial-gradient(circle at 35% 35%,#ffd700,#b8860b 60%,#8b6914);border-radius:50%;border:2px solid #b8860b;display:flex;align-items:center;justify-content:center;font-size:1.3rem;box-shadow:2px 2px 6px rgba(0,0,0,0.6)">⚜️</div>` },
      { id:2, icon:"🌾", label:"Saco de trigo", tip:"¡El trueque — intercambio sin dinero!", style:"bottom:90px;left:15%", render:`<div style="font-size:2rem;filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.6))">🌾</div>` },
      { id:3, icon:"⚖️", label:"Balanza del mercader", tip:"¡Unidad de cuenta — medir el valor justo!", style:"top:65px;right:20%", render:`<div style="font-size:2.2rem;filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.6))">⚖️</div>` },
      { id:4, icon:"🐟", label:"Pez para trueque", tip:"¡El trueque en acción — ¿quién quiere este pez?", style:"bottom:85px;right:18%", render:`<div style="font-size:2rem;filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.6))">🐟</div>` }
    ],
    decorHTML: `
      <div class="deco" style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(139,100,20,0.05) 0%,transparent 50%),url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\"><rect width=\"60\" height=\"60\" fill=\"none\" stroke=\"rgba(255,200,100,0.04)\" stroke-width=\"1\"/></svg>')"></div>
      <div class="deco" style="bottom:0;left:0;right:0;height:70px;background:linear-gradient(180deg,transparent,rgba(0,0,0,0.3))"></div>
      <div class="deco" style="bottom:65px;left:40%;width:20%;height:8px;background:#4a3000;border-radius:1px;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>
      <div class="deco" style="bottom:73px;left:38%;width:24%;height:4px;background:#5a4010;border-radius:1px"></div>
      <div class="deco" style="bottom:72px;left:46%;width:2px;height:30px;background:#3a2000"></div>
      <div class="deco" style="font-size:1.5rem;top:40px;left:42%;opacity:0.12">🏛️</div>`
  },
  victory: {
    emoji: "💰",
    title: "¡CAPÍTULO 2 COMPLETADO!",
    body: `El trueque tenía un problema fatal: la <span class="fact-highlight">doble coincidencia de deseos</span>. Las monedas de <span class="fact-highlight">oro y plata</span> resolvieron esto siendo aceptadas por todos. El dinero necesita 3 funciones: <span class="fact-highlight">reservar valor, facilitar intercambios y medir precios</span>.`,
    facts: [
      { icon:"🔄", label:"Problema del trueque", value:"DOBLE COINCIDENCIA" },
      { icon:"🪙", label:"1er dinero real", value:"ORO Y PLATA" },
      { icon:"📅", label:"Primeras monedas", value:"700 A.C." },
      { icon:"📦", label:"Funciones del dinero", value:"3 FUNCIONES CLAVE" }
    ]
  }
},

// CAP 3, 4, 5 (abreviados para el archivo, pero incluyo la estructura completa)
{
  id: 3,
  mapTitle: "LA INFLACIÓN — EL LADRÓN INVISIBLE",
  mapDesc: "El dinero fiat y cómo te roba el poder adquisitivo",
  mapIcon: "📉",
  comicTitle: "CAPÍTULO 3: LA INFLACIÓN — EL LADRÓN INVISIBLE",
  comicColor: "#dc2626",
  panels: [
    {
      bg: "linear-gradient(135deg,#1a0000,#3d0000)",
      caption: "¿QUÉ ES EL DINERO FIAT?",
      aspect: "3/2",
      artHTML: `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:0.7rem;padding:0.8rem"><div style="text-align:center"><div style="font-size:2rem">🏛️</div><div style="font-size:0.55rem;color:rgba(255,255,255,0.5)">BANCO CENTRAL</div></div><div style="font-size:1.5rem;color:#dc2626">→</div><div style="text-align:center"><div style="font-size:2rem">🖨️</div><div style="font-size:0.55rem;color:rgba(255,255,255,0.5)">IMPRIME</div></div><div style="font-size:1.5rem;color:#dc2626">→</div><div style="text-align:center"><div style="font-size:2rem">💵</div><div style="font-size:0.55rem;color:rgba(255,255,255,0.5)">DINERO DE PAPEL</div></div></div><div class="narr" style="font-size:0.62rem">Dinero fiat: papel impreso por gobiernos sin respaldo en oro ni plata</div>`,
      text: "El dinero fiat (peso, dólar, euro) no está respaldado por nada físico. El gobierno puede imprimir cuanto quiera... ¿y qué pasa cuando lo hace?"
    },
    {
      bg: "linear-gradient(135deg,#0d0000,#2d0a0a)",
      caption: "LA INFLACIÓN EN ACCIÓN",
      aspect: "3/2",
      artHTML: `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.4rem;padding:0.8rem"><div style="display:flex;gap:1.5rem;align-items:center"><div style="text-align:center"><div style="font-size:0.6rem;color:rgba(255,255,255,0.5);margin-bottom:0.2rem">ANTES (1970)</div><div style="font-size:1.5rem">🍞</div><div style="font-family:'Bangers',cursive;color:#4ade80;font-size:1rem">$0.18</div></div><div style="font-size:2rem;color:#dc2626">→</div><div style="text-align:center"><div style="font-size:0.6rem;color:rgba(255,255,255,0.5);margin-bottom:0.2rem">AHORA</div><div style="font-size:1.5rem">🍞</div><div style="font-family:'Bangers',cursive;color:#f87171;font-size:1rem">$3.50</div></div></div><div style="font-family:'Bangers',cursive;color:#dc2626;font-size:1.5rem;letter-spacing:2px">+1,844% DE INFLACIÓN</div></div>`,
      text: "La inflación es el \"ladrón invisible\". Tu dinero pierde valor sin que nadie te lo robe físicamente. Un pan que costaba $0.18 en 1970 hoy cuesta $3.50."
    },
    {
      bg: "linear-gradient(135deg,#0a0a1a,#1a1a3d)",
      caption: "¿QUIÉN SE BENEFICIA?",
      aspect: "3/2",
      artHTML: `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:1rem;padding:0.8rem;flex-wrap:wrap"><div style="text-align:center;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.4);border-radius:8px;padding:0.5rem 0.7rem"><div style="font-size:1.5rem">🏦</div><div style="font-size:0.58rem;color:#f87171;font-weight:700">Bancos y gobiernos<br>imprimen primero</div><div style="font-size:0.5rem;color:rgba(255,255,255,0.5)">↑ Poder adquisitivo</div></div><div style="font-family:'Bangers',cursive;color:#dc2626;font-size:2rem">VS</div><div style="text-align:center;background:rgba(22,163,74,0.1);border:1px solid rgba(22,163,74,0.4);border-radius:8px;padding:0.5rem 0.7rem"><div style="font-size:1.5rem">👨‍👩‍👧</div><div style="font-size:0.58rem;color:#86efac;font-weight:700">Ciudadanos normales<br>reciben el dinero tarde</div><div style="font-size:0.5rem;color:rgba(255,255,255,0.5)">↓ Poder adquisitivo</div></div></div>`,
      text: "Los que imprimen el dinero se benefician. Los ciudadanos comunes, que lo reciben tarde, lo reciben ya devaluado. ¡Esto se llama \"Efecto Cantillon\"!"
    },
    {
      bg: "linear-gradient(135deg,#0a1a00,#1a3400)",
      caption: "BITCOIN ES ESCASO",
      aspect: "3/2",
      artHTML: `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:0.8rem;padding:0.8rem"><div><div style="font-family:'Bangers',cursive;color:#dc2626;font-size:0.9rem;letter-spacing:1px;margin-bottom:0.5rem">DINERO FIAT</div><div style="background:rgba(220,38,38,0.1);border:1px solid #dc2626;border-radius:6px;padding:0.4rem 0.7rem"><div style="font-size:0.58rem;color:#f87171;line-height:1.5">Oferta: INFINITA<br>¿Límite? NINGUNO<br>¿Quién decide? GOB.</div></div></div><div style="font-family:'Bangers',cursive;font-size:2rem;color:rgba(255,255,255,0.3)">VS</div><div><div style="font-family:'Bangers',cursive;color:#f7c948;font-size:0.9rem;letter-spacing:1px;margin-bottom:0.5rem">BITCOIN</div><div style="background:rgba(247,201,72,0.1);border:1px solid #f7c948;border-radius:6px;padding:0.4rem 0.7rem"><div style="font-size:0.58rem;color:rgba(247,201,72,0.9);line-height:1.5">Oferta: 21 MILLONES<br>¿Límite? FIJO<br>¿Quién decide? CÓDIGO</div></div></div></div>`,
      text: "Bitcoin tiene un límite fijo: 21 millones de monedas. NUNCA más. Nadie — ni gobiernos ni bancos — puede imprimir más Bitcoin. ¡Es anti-inflacionario por diseño!"
    }
  ],
  question: {
    text: "¿Cuántos Bitcoin pueden existir en total — para siempre?",
    hint: "💡 Este número está programado en el código de Bitcoin y nadie puede cambiarlo",
    answers: [
      { text: "💰 100 millones de Bitcoin", correct: false },
      { text: "₿ 21 millones de Bitcoin", correct: true },
      { text: "💵 1 billón de Bitcoin", correct: false },
      { text: "🔢 No tiene límite, como el peso", correct: false }
    ]
  },
  scene: {
    title: "🔍 EL BANCO CENTRAL",
    mission: "Encuentra los 4 objetos que muestran cómo funciona la inflación",
    bgColor: "linear-gradient(180deg,#0a0000 0%,#1a0505 40%,#0d0d00 100%)",
    objects: [
      { id:1, icon:"🖨️", label:"La impresora de dinero", tip:"¡La impresora del banco central que crea inflación!", style:"top:50px;left:22%", render:`<div style="font-size:2.2rem;filter:drop-shadow(2px 2px 8px rgba(220,38,38,0.5))">🖨️</div>` },
      { id:2, icon:"📉", label:"Gráfica de inflación", tip:"¡El poder adquisitivo cayendo con el tiempo!", style:"top:55px;right:22%", render:`<div style="width:55px;height:45px;background:rgba(0,0,0,0.5);border:1px solid rgba(220,38,38,0.5);border-radius:3px;display:flex;align-items:flex-end;padding:3px"><svg width="100%" height="100%" viewBox="0 0 50 35"><polyline points="0,5 12,8 25,18 38,25 50,32" fill="none" stroke="#dc2626" stroke-width="2"/></svg></div>` },
      { id:3, icon:"🍞", label:"Pan con inflación", tip:"¡El precio del pan subiendo por la inflación!", style:"bottom:88px;left:18%", render:`<div style="position:relative"><div style="font-size:1.8rem">🍞</div><div style="position:absolute;top:-8px;right:-8px;background:#dc2626;color:white;font-family:'Bangers',cursive;font-size:0.5rem;padding:1px 3px;border-radius:2px">+1844%</div></div>` },
      { id:4, icon:"₿", label:"Bitcoin — límite de 21M", tip:"¡21 millones de Bitcoin: el límite fijo anti-inflación!", style:"bottom:82px;right:22%", render:`<div style="width:42px;height:42px;background:radial-gradient(circle at 35% 35%,#ffd700,#b8860b 60%,#8b6914);border-radius:50%;border:2px solid #b8860b;display:flex;align-items:center;justify-content:center;font-size:1.4rem;box-shadow:0 0 10px rgba(247,201,72,0.4)">₿</div>` }
    ],
    decorHTML: `<div class="deco" style="top:40px;left:45%;width:100px;height:70px;background:rgba(0,0,0,0.4);border:2px solid rgba(255,255,255,0.1);display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:0.5rem;color:rgba(255,255,255,0.3);text-align:center">RESERVA FEDERAL<br>OFERTA MONETARIA<br><span style="color:#dc2626;font-size:0.6rem">∞ SIN LÍMITE</span></div></div><div class="deco" style="bottom:65px;left:0;right:0;height:8px;background:linear-gradient(180deg,rgba(220,38,38,0.2),transparent)"></div>`
  },
  victory: {
    emoji: "📉",
    title: "¡CAPÍTULO 3 COMPLETADO!",
    body: `La inflación es cuando el gobierno imprime más dinero y tus ahorros valen <span class="fact-highlight">menos</span>. Bitcoin tiene un límite fijo de <span class="fact-highlight">21 millones</span> de monedas para siempre. Nadie puede imprimirlo. ¡Es el <span class="fact-highlight">antídoto contra la inflación</span>!`,
    facts: [
      { icon:"🖨️", label:"Dinero fiat", value:"SIN LÍMITE" },
      { icon:"₿", label:"Límite de Bitcoin", value:"21 MILLONES" },
      { icon:"📉", label:"$1 en 1913 vale ahora", value:"$0.03 HOY" },
      { icon:"🔒", label:"Quien protege el límite", value:"EL CÓDIGO" }
    ]
  }
},

// CAP 4 y 5 similares (omitidos por espacio, pero siguen la misma estructura)
{
  id: 4,
  mapTitle: "BITCOIN COMO DINERO SÓLIDO",
  mapDesc: "Propiedades, descentralización y la blockchain",
  mapIcon: "🔗",
  comicTitle: "CAPÍTULO 4: BITCOIN — DINERO SÓLIDO DIGITAL",
  comicColor: "#2563eb",
  panels: [
    { bg: "linear-gradient(135deg,#001433,#001f5c)", caption: "LA RED DESCENTRALIZADA", aspect: "3/2", artHTML: `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><div style="font-size:3rem;filter:drop-shadow(0 0 20px #f7c948)">🌐</div></div>`, text: "Bitcoin no tiene un servidor central. Corre en miles de computadoras alrededor del mundo. ¡Imposible de apagar!" },
    { bg: "linear-gradient(135deg,#0d0020,#1a003d)", caption: "LA BLOCKCHAIN", aspect: "3/2", artHTML: `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:0.3rem">${[1,2,3,4,5].map(()=>`<div style="width:40px;height:50px;background:rgba(124,58,237,0.2);border:2px solid rgba(124,58,237,0.5);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#a78bfa">₿</div>`).join('<div style="color:#7c3aed">→</div>')}</div>`, text: "La blockchain es un libro contable gigante que guarda TODAS las transacciones. Es público e inalterable." },
    { bg: "linear-gradient(135deg,#001a0d,#003320)", caption: "PROPIEDADES DEL DINERO SÓLIDO", aspect: "3/2", artHTML: `<div style="position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.3rem;padding:0.6rem;align-items:center">${[{icon:"💪",label:"DURADERO"},{icon:"✂️",label:"DIVISIBLE"},{icon:"🌍",label:"PORTABLE"},{icon:"👁️",label:"VERIFICABLE"},{icon:"🔒",label:"ESCASO"},{icon:"🔄",label:"FUNGIBLE"}].map(p=>`<div style="background:rgba(22,163,74,0.1);border:1px solid rgba(22,163,74,0.3);border-radius:4px;padding:0.3rem;text-align:center"><div style="font-size:1rem">${p.icon}</div><div style="font-family:'Bangers',cursive;font-size:0.55rem;color:#4ade80">${p.label}</div></div>`).join('')}</div>`, text: "Bitcoin tiene TODAS las propiedades del dinero sólido, pero en versión digital." },
    { bg: "linear-gradient(135deg,#1a0a00,#2d1500)", caption: "LOS JUGADORES DE LA RED", aspect: "3/2", artHTML: `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:0.6rem;padding:0.8rem"><div style="text-align:center"><div style="font-size:1.4rem">⛏️</div><div style="font-family:'Bangers',cursive;font-size:0.65rem;color:#f7c948">MINEROS</div></div><div style="text-align:center"><div style="font-size:1.4rem">💻</div><div style="font-family:'Bangers',cursive;font-size:0.65rem;color:#93c5fd">NODOS</div></div><div style="text-align:center"><div style="font-size:1.4rem">👤</div><div style="font-family:'Bangers',cursive;font-size:0.65rem;color:#a78bfa">USUARIOS</div></div></div>`, text: "La red Bitcoin funciona como una orquesta: mineros, nodos y usuarios trabajan juntos sin un director." }
  ],
  question: {
    text: "¿Cuántas copias del libro contable de Bitcoin existen?",
    hint: "💡 Piensa en la red descentralizada",
    answers: [
      { text: "🏦 Una sola copia en un servidor central", correct: false },
      { text: "📋 3 copias en 3 países diferentes", correct: false },
      { text: "💻 Miles de copias en computadoras de todo el mundo", correct: true },
      { text: "🔐 Solo Satoshi tiene la copia original", correct: false }
    ]
  },
  scene: {
    title: "🔍 LA SALA DE SERVIDORES BITCOIN",
    mission: "Encuentra los 4 componentes que hacen funcionar la red Bitcoin",
    bgColor: "linear-gradient(180deg,#000d1a 0%,#001033 50%,#000d0d 100%)",
    objects: [
      { id:1, icon:"⛏️", label:"Minero de Bitcoin", tip:"¡Los mineros validan las transacciones!", style:"top:55px;left:18%", render:`<div style="font-size:2rem">⛏️</div>` },
      { id:2, icon:"🔗", label:"Bloque de la cadena", tip:"¡Un bloque de la blockchain!", style:"top:50px;right:20%", render:`<div style="width:50px;height:40px;background:rgba(124,58,237,0.2);border:2px solid rgba(124,58,237,0.6);border-radius:3px;display:flex;align-items:center;justify-content:center"><div style="font-family:'Bangers',cursive;font-size:0.55rem;color:#a78bfa">BLOQUE</div></div>` },
      { id:3, icon:"🔑", label:"Clave privada", tip:"¡Tu clave privada — la llave de tu Bitcoin!", style:"bottom:90px;left:20%", render:`<div style="font-size:2rem">🔑</div>` },
      { id:4, icon:"📱", label:"Billetera Bitcoin", tip:"¡La billetera donde guardas tus Bitcoin!", style:"bottom:82px;right:18%", render:`<div style="width:35px;height:55px;background:linear-gradient(180deg,#1a1a2e,#0d0d1a);border:2px solid rgba(247,201,72,0.5);border-radius:6px;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:1rem">₿</div></div>` }
    ],
    decorHTML: `<div class="deco" style="top:30px;left:42%;font-size:1.5rem;opacity:0.15">🌐</div>`
  },
  victory: {
    emoji: "🔗",
    title: "¡CAPÍTULO 4 COMPLETADO!",
    body: `Bitcoin corre en <span class="fact-highlight">miles de computadoras</span> simultáneamente. Su libro contable, la <span class="fact-highlight">blockchain</span>, es público e inalterable.`,
    facts: [
      { icon:"🌍", label:"Nodos Bitcoin", value:"+19,000 NODOS" },
      { icon:"🔗", label:"Bloques generados", value:"CADA 10 MIN" },
      { icon:"💪", label:"Propiedades del dinero", value:"6/6 CUMPLE" },
      { icon:"🔒", label:"Resistente a censura", value:"SÍ, TOTALMENTE" }
    ]
  }
},

{
  id: 5,
  mapTitle: "CÓMO USAR BITCOIN",
  mapDesc: "Billeteras, transacciones y Lightning Network",
  mapIcon: "⚡",
  comicTitle: "CAPÍTULO 5: TU BILLETERA BITCOIN",
  comicColor: "#16a34a",
  panels: [
    { bg: "linear-gradient(135deg,#001a0d,#00330d)", caption: "¿QUÉ ES UNA BILLETERA?", aspect: "3/2", artHTML: `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:0.8rem"><div style="text-align:center"><div style="font-size:2.5rem">👛</div><div style="font-size:0.6rem;color:rgba(255,255,255,0.5)">BILLETERA FÍSICA</div></div><div style="font-family:'Bangers',cursive;font-size:1.8rem;color:rgba(255,255,255,0.3)">≠</div><div style="text-align:center"><div style="font-size:2.5rem">📱</div><div style="font-size:0.6rem;color:rgba(255,255,255,0.5)">BILLETERA BITCOIN</div></div></div>`, text: "Una billetera Bitcoin no guarda tus monedas. Guarda tus LLAVES para acceder a ellos en la blockchain." },
    { bg: "linear-gradient(135deg,#0a001a,#1a003d)", caption: "CLAVE PÚBLICA Y PRIVADA", aspect: "3/2", artHTML: `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:0.7rem"><div style="text-align:center"><div style="font-size:1.8rem">🔓</div><div style="font-family:'Bangers',cursive;font-size:0.7rem;color:#93c5fd">CLAVE PÚBLICA</div></div><div style="font-family:'Bangers',cursive;font-size:2rem;color:rgba(255,255,255,0.2)">+</div><div style="text-align:center"><div style="font-size:1.8rem">🔒</div><div style="font-family:'Bangers',cursive;font-size:0.7rem;color:#f87171">CLAVE PRIVADA</div></div></div>`, text: "La PÚBLICA compártela para recibir. La PRIVADA ¡NUNCA la compartas! Perderla = perder tus Bitcoin." },
    { bg: "linear-gradient(135deg,#001a1a,#00333d)", caption: "TRANSACCIÓN", aspect: "3/2", artHTML: `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:0.5rem"><div style="font-size:1.3rem">👩</div><div style="background:rgba(22,163,74,0.15);border:1px solid rgba(22,163,74,0.4);padding:0.2rem 0.5rem;font-size:0.55rem;color:#4ade80">0.5 BTC →</div><div style="font-size:1.3rem">👨</div></div>`, text: "Enviar Bitcoin: firmas con tu clave privada → nodos verifican → minero confirma → ¡grabado para siempre!" },
    { bg: "linear-gradient(135deg,#1a1000,#3d2800)", caption: "⚡ RED LIGHTNING", aspect: "3/2", artHTML: `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:0.6rem"><div style="text-align:center;background:rgba(247,201,72,0.08);border:1px solid rgba(247,201,72,0.3);border-radius:8px;padding:0.5rem"><div style="font-size:1.3rem">⛓️</div><div style="font-family:'Bangers',cursive;font-size:0.65rem;color:#f7c948">BLOCKCHAIN</div><div style="font-size:0.5rem;color:rgba(255,255,255,0.5)">~10 min</div></div><div style="font-family:'Bangers',cursive;font-size:1.8rem;color:rgba(255,255,255,0.3)">+</div><div style="text-align:center;background:rgba(255,107,53,0.1);border:1px solid rgba(255,107,53,0.4);border-radius:8px;padding:0.5rem"><div style="font-size:1.3rem">⚡</div><div style="font-family:'Bangers',cursive;font-size:0.65rem;color:#ff6b35">LIGHTNING</div><div style="font-size:0.5rem;color:rgba(255,255,255,0.5)">Instantáneo</div></div></div>`, text: "La Red Lightning permite pagos instantáneos y ultra baratos. Perfecta para café o compras del día." }
  ],
  question: {
    text: "¿Qué guarda realmente una billetera Bitcoin?",
    hint: "💡 Tu Bitcoin no está 'dentro' de la billetera...",
    answers: [
      { text: "💰 Los Bitcoin directamente", correct: false },
      { text: "🔑 Tus claves privadas para acceder a tu Bitcoin", correct: true },
      { text: "🏦 Una conexión al banco", correct: false },
      { text: "📋 Una lista de precios", correct: false }
    ]
  },
  scene: {
    title: "🔍 LA TIENDA DE EL SALVADOR",
    mission: "Encuentra los 4 objetos del ecosistema Bitcoin cotidiano",
    bgColor: "linear-gradient(180deg,#001a00 0%,#003300 40%,#0d1a00 100%)",
    objects: [
      { id:1, icon:"📱", label:"App de billetera", tip:"¡La app de billetera Bitcoin!", style:"top:55px;left:20%", render:`<div style="width:38px;height:58px;background:linear-gradient(180deg,#1a2e1a,#0d1a0d);border:2px solid rgba(22,163,74,0.6);border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:1.2rem">₿</div></div>` },
      { id:2, icon:"⚡", label:"Código QR Lightning", tip:"¡El código QR para pagar con Lightning!", style:"top:50px;right:22%", render:`<div style="width:48px;height:48px;background:white;border:2px solid #333;border-radius:3px;display:flex;align-items:center;justify-content:center"><div style="font-size:1.5rem">📱</div></div>` },
      { id:3, icon:"🔑", label:"Frase semilla", tip:"¡Las 12 palabras de tu frase semilla!", style:"bottom:90px;left:18%", render:`<div style="width:55px;height:38px;background:#fdf6e3;border:1px solid #aaa;border-radius:2px;padding:3px"><div style="font-size:0.32rem;color:#000;font-weight:bold">FRASE SEMILLA 🔑</div></div>` },
      { id:4, icon:"☕", label:"Pago en café con Bitcoin", tip:"¡Pagando el café con Lightning!", style:"bottom:85px;right:20%", render:`<div style="position:relative"><div style="font-size:2rem">☕</div><div style="position:absolute;top:-10px;right:-10px;background:rgba(22,163,74,0.9);color:white;font-family:'Bangers',cursive;font-size:0.45rem;padding:1px 4px;border-radius:3px">⚡ PAGADO</div></div>` }
    ],
    decorHTML: `<div class="deco" style="top:30px;left:42%;font-size:1.8rem;opacity:0.15">🏪</div>`
  },
  victory: {
    emoji: "⚡",
    title: "¡CAPÍTULO 5 COMPLETADO!",
    body: `Una billetera Bitcoin guarda tus <span class="fact-highlight">claves privadas</span>, no tus Bitcoin. La Red <span class="fact-highlight">Lightning</span> permite pagos instantáneos y baratos.`,
    facts: [
      { icon:"🔑", label:"Claves privadas", value:"¡NUNCA COMPARTAS!" },
      { icon:"⚡", label:"Lightning — velocidad", value:"INSTANTÁNEO" },
      { icon:"💸", label:"Comisión Lightning", value:"~$0.001" },
      { icon:"🌍", label:"Sin fronteras", value:"FUNCIONA EN TODO" }
    ]
  }
}

]; // end chapters array

// ═══════════════════════════════════════════════════
// RENDER MAP
// ═══════════════════════════════════════════════════
function renderMap() {
  const path = document.getElementById('chapters-path');
  path.innerHTML = '';
  const total = chapters.length;
  const done = completedChapters.size;

  chapters.forEach((ch, idx) => {
    if (idx > 0) {
      const line = document.createElement('div');
      line.className = 'path-line';
      path.appendChild(line);
    }

    const node = document.createElement('div');
    const isDone = completedChapters.has(idx);
    const isUnlocked = idx === 0 || completedChapters.has(idx - 1);
    const isLocked = !isUnlocked;

    node.className = `chapter-node ${isDone ? 'completed' : isLocked ? 'locked' : 'unlocked'}`;
    if (!isLocked) node.onclick = () => startChapter(idx);

    const badge = isDone ? '<span class="node-badge done">✅ COMPLETADO</span>' :
                  isLocked ? '<span class="node-badge lock">🔒 BLOQUEADO</span>' :
                  '<span class="node-badge go">▶ JUGAR</span>';

    node.innerHTML = `
      <div class="node-number">${isDone ? '✓' : ch.mapIcon}</div>
      <div class="node-info">
        <div class="node-title">CAP. ${ch.id}: ${ch.mapTitle}</div>
        <div class="node-desc">${ch.mapDesc}</div>
      </div>
      ${badge}
    `;
    path.appendChild(node);
  });

  const pct = Math.round((done / total) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `PROGRESO: ${done} / ${total} CAPÍTULOS COMPLETADOS`;
}

// ═══════════════════════════════════════════════════
// START CHAPTER
// ═══════════════════════════════════════════════════
function startChapter(idx) {
  currentChapter = idx;
  foundObjects = new Set();
  attemptsLeft = MAX_ATTEMPTS;
  renderComic();
  goTo('screen-comic');
}

// ═══════════════════════════════════════════════════
// RENDER COMIC
// ═══════════════════════════════════════════════════
function renderComic() {
  const ch = chapters[currentChapter];
  document.getElementById('comic-header').textContent = ch.comicTitle;
  document.getElementById('comic-header').style.background = ch.comicColor || 'var(--gold)';

  const grid = document.getElementById('comic-grid');
  grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
  grid.innerHTML = '';

  ch.panels.forEach((p, i) => {
    const panel = document.createElement('div');
    panel.className = 'panel';
    if (ch.panels.length === 4 && i === 3) {
      panel.style.gridColumn = '1 / -1';
    }
    panel.innerHTML = `
      <div class="panel-art" style="background:${p.bg};aspect-ratio:${p.aspect || '3/2'}">
        ${p.caption ? `<div class="panel-caption">${p.caption}</div>` : ''}
        ${p.artHTML || ''}
      </div>
      <div class="panel-text">${p.text}</div>
    `;
    grid.appendChild(panel);
  });
}

// ═══════════════════════════════════════════════════
// QUESTION
// ═══════════════════════════════════════════════════
function goToQuestion() {
  const ch = chapters[currentChapter];
  const q = ch.question;

  document.getElementById('q-text').textContent = q.text;
  document.getElementById('q-hint').textContent = q.hint || '💡 Recuerda lo que leíste en el cómic';

  const grid = document.getElementById('answer-grid');
  grid.innerHTML = '';
  q.answers.forEach(a => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = a.text;
    btn.onclick = () => checkAnswer(btn, a.correct);
    grid.appendChild(btn);
  });

  document.getElementById('feedback-msg').className = 'feedback-msg';
  goTo('screen-question');
}

function checkAnswer(btn, isCorrect) {
  document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
  const fb = document.getElementById('feedback-msg');

  if (isCorrect) {
    btn.classList.add('correct');
    fb.textContent = '✅ ¡CORRECTO! ¡Ahora a explorar el escenario!';
    fb.className = 'feedback-msg show correct';
    setTimeout(() => renderAndGoScene(), 1600);
  } else {
    btn.classList.add('wrong');
    fb.textContent = '❌ ¡Incorrecto! Vuelve a intentarlo...';
    fb.className = 'feedback-msg show wrong';
    setTimeout(() => {
      btn.classList.remove('wrong');
      document.querySelectorAll('.answer-btn').forEach(b => b.disabled = false);
      fb.className = 'feedback-msg';
    }, 2000);
  }
}

// ═══════════════════════════════════════════════════
// SCENE — CON SISTEMA DE INTENTOS
// ═══════════════════════════════════════════════════
function renderAndGoScene() {
  const ch = chapters[currentChapter];
  const sc = ch.scene;
  foundObjects = new Set();
  attemptsLeft = MAX_ATTEMPTS;

  document.getElementById('scene-title').textContent = sc.title;
  document.getElementById('scene-mission').innerHTML = `🎯 <strong>Misión:</strong> ${sc.mission}`;
  document.getElementById('objects-counter').textContent = `Objetos: 0 / ${sc.objects.length}`;
  updateAttemptsDisplay();

  const room = document.getElementById('room');
  room.style.background = sc.bgColor;
  room.innerHTML = sc.decorHTML || '';

  sc.objects.forEach(obj => {
    const el = document.createElement('div');
    el.className = 'hidden-obj';
    el.id = `obj-scene-${obj.id}`;
    el.style.cssText = obj.style;
    el.setAttribute('data-id', obj.id);
    el.setAttribute('data-tip', obj.tip);
    el.innerHTML = obj.render;
    el.onclick = (e) => {
      e.stopPropagation();
      collectObject(el, e);
    };
    room.appendChild(el);
  });

  const pane = document.getElementById('objects-pane');
  pane.innerHTML = '';
  sc.objects.forEach(obj => {
    const item = document.createElement('div');
    item.className = 'obj-item';
    item.id = `item-scene-${obj.id}`;
    item.innerHTML = `<span class="obj-icon">${obj.icon}</span><span>${obj.label}</span><span class="obj-check">✅</span>`;
    pane.appendChild(item);
  });

  room.onclick = handleWrongClick;
  goTo('screen-scene');
}

function updateAttemptsDisplay() {
  const counter = document.getElementById('attempts-counter');
  let hearts = '';
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    hearts += i < attemptsLeft ? '❤️' : '🖤';
  }
  counter.textContent = hearts;
}

function handleWrongClick(e) {
  const isObj = e.target.closest('.hidden-obj');
  if (isObj) return; // No contar si hizo click en objeto

  attemptsLeft--;
  updateAttemptsDisplay();

  // Flash rojo
  const flash = document.createElement('div');
  flash.className = 'wrong-flash';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 350);

  if (attemptsLeft <= 0) {
    // Game Over
    setTimeout(() => {
      goTo('screen-gameover');
    }, 500);
  }
}

function collectObject(el, e) {
  const id = el.getAttribute('data-id');
  const ch = chapters[currentChapter];
  if (foundObjects.has(id)) return;
  foundObjects.add(id);

  el.classList.add('found');
  showTooltip(el.getAttribute('data-tip'), e);
  createRipple(e.clientX, e.clientY);

  const item = document.getElementById(`item-scene-${id}`);
  if (item) item.classList.add('collected');

  const total = ch.scene.objects.length;
  document.getElementById('objects-counter').textContent = `Objetos: ${foundObjects.size} / ${total}`;

  if (foundObjects.size === total) {
    completedChapters.add(currentChapter);
    setTimeout(() => {
      launchConfetti();
      renderVictory();
      goTo('screen-victory');
    }, 1000);
  }
}

function retryScene() {
  renderAndGoScene();
}

// ═══════════════════════════════════════════════════
// VICTORY
// ═══════════════════════════════════════════════════
function renderVictory() {
  const ch = chapters[currentChapter];
  const v = ch.victory;
  document.getElementById('v-emoji').textContent = v.emoji;
  document.getElementById('v-title').textContent = v.title;
  document.getElementById('v-body').innerHTML = v.body;

  const facts = document.getElementById('v-facts');
  facts.innerHTML = v.facts.map(f => `
    <div class="fact-card">
      <div class="fact-card-icon">${f.icon}</div>
      <div class="fact-card-label">${f.label}</div>
      <div class="fact-card-value">${f.value}</div>
    </div>
  `).join('');

  const nextBtn = document.getElementById('v-next-btn');
  const hint = document.getElementById('v-hint');
  const nextIdx = currentChapter + 1;

  if (nextIdx < chapters.length) {
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = `CAP. ${chapters[nextIdx].id}: ${chapters[nextIdx].mapTitle.slice(0,20)}... ➜`;
    hint.textContent = '';
  } else {
    nextBtn.style.display = 'none';
    hint.textContent = '🏆 ¡HAS COMPLETADO TODOS LOS CAPÍTULOS! ¡ERES UN MAESTRO BITCOIN!';
  }
}

function nextChapter() {
  const nextIdx = currentChapter + 1;
  if (nextIdx < chapters.length) {
    startChapter(nextIdx);
  } else {
    goTo('screen-map');
  }
}

// ═══════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
  if (screenId === 'screen-map') renderMap();
}

function showTooltip(text, e) {
  const t = document.getElementById('tooltip');
  t.textContent = text;
  t.style.display = 'block';
  t.style.left = Math.min(e.clientX + 10, window.innerWidth - 210) + 'px';
  t.style.top = (e.clientY - 50) + 'px';
  setTimeout(() => t.style.display = 'none', 2500);
}

function createRipple(x, y) {
  const r = document.createElement('div');
  r.className = 'click-ripple';
  r.style.left = x + 'px';
  r.style.top = y + 'px';
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 450);
}

function launchConfetti() {
  const colors = ['#f7c948','#ff6b35','#2563eb','#16a34a','#dc2626','#ffffff','#7c3aed'];
  const area = document.getElementById('confetti-area');
  area.innerHTML = '';
  for (let i = 0; i < 55; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?'50%':'0'};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()}s;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;`;
    area.appendChild(p);
  }
}

// Init
renderMap();
</script>
</body>
</html>
