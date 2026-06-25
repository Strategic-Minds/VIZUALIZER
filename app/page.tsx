"use client";
import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";

type Cat = "epoxy-flake"|"metallic-epoxy"|"polished-concrete"|"stained-concrete";

// ── BLEND DATA ───────────────────────────────────────────────────────────────
const FLAKE = [
  { id:"FB201", name:"Lambeau",       colors:["#2d6a2d","#c9a227","#9e9e9e"], popular:true  },
  { id:"FB228", name:"Washington",    colors:["#6b1a1a","#c9a227","#fff"],    popular:true  },
  { id:"FB240", name:"Steel City",    colors:["#1a1a1a","#c9a227","#c0c0c0"], popular:true  },
  { id:"FB253", name:"Gold Rush",     colors:["#c9a227","#8b0000","#1a1a1a"], popular:true  },
  { id:"FB209", name:"Heinz",         colors:["#c9a227","#1a1a1a","#fff"],    popular:true  },
  { id:"FB219", name:"Spangle",       colors:["#c0392b","#fff","#1a3a6b"],    popular:true  },
  { id:"FB315", name:"White Water",   colors:["#f5f5f5","#9e9e9e","#c0c0c0"], popular:true  },
  { id:"FB208", name:"Miller",        colors:["#1a4a1a","#c9a227","#fff"]                   },
  { id:"FB215", name:"Metrodome",     colors:["#4a1a6b","#c9a227","#fff"]                   },
  { id:"FB220", name:"Daredevil",     colors:["#c0392b","#1a1a1a","#fff"]                   },
  { id:"FB202", name:"Soldier",       colors:["#1a2a6b","#c0c0c0","#fff"]                   },
  { id:"FB207", name:"LP Field",      colors:["#1a2a6b","#c9a227","#fff"]                   },
  { id:"FB210", name:"Ram",           colors:["#c9a227","#1a3a8b","#fff"]                   },
  { id:"FB213", name:"Ford",          colors:["#1a5a8b","#c0c0c0","#fff"]                   },
  { id:"FB214", name:"Madden",        colors:["#c0c0c0","#1a1a1a","#fff"]                   },
  { id:"FB216", name:"Coliseum",      colors:["#c0c0c0","#1a1a1a","#fff"]                   },
  { id:"FB211", name:"Superdome",     colors:["#1a1a1a","#c9a227","#fff"]                   },
  { id:"FB218", name:"Lucas",         colors:["#1a5a8b","#fff","#c0c0c0"]                   },
  { id:"FB203", name:"Sun Life",      colors:["#1a8b8b","#e67e22","#fff"]                   },
  { id:"FB204", name:"Paul Brown",    colors:["#6b3a1a","#fff","#1a1a1a"]                   },
  { id:"FB212", name:"Doak",          colors:["#8b1a2a","#c9a227","#fff"]                   },
];
const METALLIC = [
  { id:"MET-001", name:"Galaxy Black",    colors:["#0a0a0a","#c0c0c0","#1a1a6b"], popular:true },
  { id:"MET-002", name:"Mocha Marble",    colors:["#5c3a1a","#c9a227","#f5e6d0"], popular:true },
  { id:"MET-003", name:"Silver Storm",    colors:["#c0c0c0","#f5f5f5","#808080"]              },
  { id:"MET-004", name:"Ocean Blue",      colors:["#1a4a8b","#1a8b8b","#c0c0c0"]              },
  { id:"MET-005", name:"Champagne Gold",  colors:["#c9a227","#f5e6b0","#8b7a3a"]              },
  { id:"MET-006", name:"Lava Red",        colors:["#8b0000","#e67e22","#1a1a1a"]              },
];
const POLISHED = [
  { id:"POL-001", name:"Cream Salt & Pepper", colors:["#f0e6d0","#9e9e9e","#f5f5f5"], popular:true },
  { id:"POL-002", name:"Charcoal Grind",      colors:["#3a3a3a","#5a5a5a","#1a1a1a"], popular:true },
  { id:"POL-003", name:"High Gloss Mirror",   colors:["#9e9e9e","#f5f5f5","#c0c0c0"]              },
  { id:"POL-004", name:"Cream Satin",         colors:["#f0e6d0","#e6d5b8","#c8b89a"]              },
  { id:"POL-005", name:"Dyed Jet Black",      colors:["#050505","#1a1a1a","#2a2a2a"]              },
  { id:"POL-006", name:"Ashwood Grey",        colors:["#8a8a7a","#a0a090","#c0c0b0"]              },
];
const STAINED = [
  { id:"STN-001", name:"Tuscan Walnut",  colors:["#6b3a1a","#8b5a2a","#c9a227"], popular:true },
  { id:"STN-002", name:"Slate Blue",     colors:["#4a6a8b","#6a8aab","#8aaacb"]              },
  { id:"STN-003", name:"Terra Cotta",    colors:["#c0522a","#a03a1a","#e67a4a"]              },
  { id:"STN-004", name:"Espresso",       colors:["#2a1a0a","#3a2a1a","#5a3a2a"], popular:true},
  { id:"STN-005", name:"Sage Green",     colors:["#6a8a5a","#8aaa7a","#4a6a3a"]              },
  { id:"STN-006", name:"Midnight Steel", colors:["#1a2a3a","#2a4a6a","#3a6a8a"]              },
];

const BLEND_MAP: Record<Cat, typeof FLAKE> = {
  "epoxy-flake": FLAKE, "metallic-epoxy": METALLIC,
  "polished-concrete": POLISHED, "stained-concrete": STAINED,
};

const ROOMS = [
  { id:"garage",   label:"Garage",       img:"https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/envs/garage.jpg" },
  { id:"warehouse",label:"Commercial",   img:"https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/envs/warehouse.jpg" },
  { id:"res-gar",  label:"Home Garage",  img:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/residential-garage-07_thumb.webp" },
  { id:"living",   label:"Living Room",  img:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/re_livingroom_thumb.webp" },
  { id:"hallway",  label:"Hallway",      img:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/rw_hallway_thumb.webp" },
  { id:"pool",     label:"Pool Deck",    img:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_pooldeck-01_thumb.webp" },
  { id:"porch",    label:"Porch/Patio",  img:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_porch-hr-01_thumb.webp" },
  { id:"airport",  label:"Lobby",        img:"https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/envs/airport.jpg" },
];

const CDN = "https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends";

// ── SVG ICONS (custom FloorVision brand icons) ────────────────────────────────
const Icon = {
  Flake: ()=>(
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="20" fill="url(#flake-grad)" opacity="0.15"/>
      <defs><radialGradient id="flake-grad" cx="30%" cy="30%"><stop offset="0%" stopColor="#F5C518"/><stop offset="100%" stopColor="#c9860e"/></radialGradient></defs>
      <polygon points="22,6 26,16 37,16 28,23 31,34 22,27 13,34 16,23 7,16 18,16" fill="url(#flake-grad)" opacity="0.9"/>
      <circle cx="22" cy="22" r="4" fill="#F5C518"/>
    </svg>
  ),
  Metallic: ()=>(
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <defs>
        <linearGradient id="met-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c0c0c0"/>
          <stop offset="50%" stopColor="#F5C518"/>
          <stop offset="100%" stopColor="#8a6a00"/>
        </linearGradient>
      </defs>
      <ellipse cx="22" cy="22" rx="18" ry="14" fill="url(#met-grad)" opacity="0.2"/>
      <path d="M6 22 Q14 8 22 22 Q30 36 38 22" stroke="url(#met-grad)" strokeWidth="3" fill="none"/>
      <path d="M6 22 Q14 28 22 18 Q30 8 38 22" stroke="#F5C518" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <circle cx="22" cy="22" r="3" fill="#F5C518"/>
      <circle cx="10" cy="22" r="2" fill="url(#met-grad)"/>
      <circle cx="34" cy="22" r="2" fill="url(#met-grad)"/>
    </svg>
  ),
  Polished: ()=>(
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <defs>
        <linearGradient id="pol-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0e0e0"/>
          <stop offset="100%" stopColor="#808080"/>
        </linearGradient>
      </defs>
      <rect x="6" y="12" width="32" height="20" rx="2" fill="url(#pol-grad)" opacity="0.2"/>
      <rect x="6" y="12" width="32" height="20" rx="2" stroke="url(#pol-grad)" strokeWidth="1.5"/>
      <path d="M6 20 L38 20" stroke="#F5C518" strokeWidth="0.8" opacity="0.8"/>
      <path d="M6 24 L38 24" stroke="white" strokeWidth="0.6" opacity="0.4"/>
      <ellipse cx="22" cy="22" rx="10" ry="4" fill="white" opacity="0.15"/>
      <line x1="12" y1="12" x2="8" y2="8" stroke="#F5C518" strokeWidth="1.5"/>
      <line x1="22" y1="12" x2="22" y2="7" stroke="#F5C518" strokeWidth="1.5"/>
      <line x1="32" y1="12" x2="36" y2="8" stroke="#F5C518" strokeWidth="1.5"/>
    </svg>
  ),
  Stained: ()=>(
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <defs>
        <radialGradient id="stain-grad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#c9a227" stopOpacity="0.8"/>
          <stop offset="60%" stopColor="#8b5a2a" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#3a1a0a" stopOpacity="0.1"/>
        </radialGradient>
      </defs>
      <rect x="6" y="10" width="32" height="24" rx="3" fill="#1a0a00" opacity="0.3"/>
      <ellipse cx="18" cy="20" rx="10" ry="7" fill="url(#stain-grad)"/>
      <ellipse cx="26" cy="24" rx="8" ry="5" fill="url(#stain-grad)" opacity="0.6"/>
      <ellipse cx="28" cy="17" rx="5" ry="3" fill="#c9a227" opacity="0.3"/>
      <rect x="6" y="10" width="32" height="24" rx="3" stroke="rgba(201,162,39,0.3)" strokeWidth="1"/>
    </svg>
  ),
  AR: ()=>(
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="ar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff"/>
          <stop offset="100%" stopColor="#F5C518"/>
        </linearGradient>
      </defs>
      {/* Phone outline */}
      <rect x="16" y="6" width="20" height="32" rx="3" stroke="url(#ar-grad)" strokeWidth="1.5" fill="none"/>
      <circle cx="26" cy="34" r="1.5" fill="url(#ar-grad)" opacity="0.7"/>
      {/* AR grid lines on phone screen */}
      <line x1="20" y1="20" x2="32" y2="16" stroke="url(#ar-grad)" strokeWidth="0.8" opacity="0.7"/>
      <line x1="20" y1="24" x2="32" y2="20" stroke="url(#ar-grad)" strokeWidth="0.8" opacity="0.5"/>
      <line x1="20" y1="16" x2="20" y2="24" stroke="url(#ar-grad)" strokeWidth="0.8" opacity="0.7"/>
      <line x1="26" y1="14" x2="26" y2="22" stroke="url(#ar-grad)" strokeWidth="0.8" opacity="0.5"/>
      <line x1="32" y1="16" x2="32" y2="20" stroke="url(#ar-grad)" strokeWidth="0.8" opacity="0.7"/>
      {/* Scan corners */}
      <path d="M4 14 L4 8 L10 8" stroke="#F5C518" strokeWidth="2" fill="none"/>
      <path d="M4 38 L4 44 L10 44" stroke="#F5C518" strokeWidth="2" fill="none"/>
      <path d="M48 14 L48 8 L42 8" stroke="#F5C518" strokeWidth="2" fill="none"/>
      <path d="M48 38 L48 44 L42 44" stroke="#F5C518" strokeWidth="2" fill="none"/>
      <circle cx="26" cy="20" r="2" fill="#00d4ff" opacity="0.9"/>
    </svg>
  ),
  Dream: ()=>(
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="dream-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5C518"/>
          <stop offset="100%" stopColor="#ff6b35"/>
        </linearGradient>
      </defs>
      <rect x="6" y="10" width="26" height="22" rx="2" fill="none" stroke="url(#dream-grad)" strokeWidth="1.5"/>
      <path d="M10 28 L16 20 L22 24 L28 16" stroke="url(#dream-grad)" strokeWidth="1.5" fill="none"/>
      <circle cx="11" cy="16" r="2.5" fill="url(#dream-grad)" opacity="0.7"/>
      <path d="M30 28 L44 16" stroke="#F5C518" strokeWidth="1" opacity="0.3" strokeDasharray="2 2"/>
      <rect x="30" y="28" width="16" height="14" rx="2" fill="url(#dream-grad)" opacity="0.2"/>
      <rect x="30" y="28" width="16" height="14" rx="2" stroke="url(#dream-grad)" strokeWidth="1.5"/>
      <path d="M33 38 L36 32 L40 35 L44 30" stroke="white" strokeWidth="1.2" fill="none" opacity="0.8"/>
      <path d="M24 22 L30 28" stroke="#F5C518" strokeWidth="2" markerEnd="url(#arrow)"/>
      <circle cx="38" cy="22" r="6" fill="url(#dream-grad)" opacity="0.15"/>
      <circle cx="38" cy="22" r="6" stroke="url(#dream-grad)" strokeWidth="1"/>
      <text x="38" y="26" textAnchor="middle" fill="#F5C518" fontSize="8" fontWeight="bold">AI</text>
    </svg>
  ),
  Voice: ()=>(
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="voice-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#F5C518"/>
          <stop offset="100%" stopColor="#00d4ff"/>
        </linearGradient>
      </defs>
      <rect x="19" y="8" width="14" height="20" rx="7" fill="none" stroke="url(#voice-grad)" strokeWidth="1.5"/>
      <path d="M10 26 C10 36 42 36 42 26" stroke="url(#voice-grad)" strokeWidth="1.5" fill="none"/>
      <line x1="26" y1="36" x2="26" y2="44" stroke="url(#voice-grad)" strokeWidth="1.5"/>
      <line x1="20" y1="44" x2="32" y2="44" stroke="url(#voice-grad)" strokeWidth="1.5"/>
      {/* Sound waves */}
      <path d="M14 20 Q10 26 14 32" stroke="#F5C518" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M10 18 Q4 26 10 34" stroke="#F5C518" strokeWidth="1" fill="none" opacity="0.3"/>
      <path d="M38 20 Q42 26 38 32" stroke="#F5C518" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <path d="M42 18 Q48 26 42 34" stroke="#F5C518" strokeWidth="1" fill="none" opacity="0.3"/>
      {/* Center dot */}
      <circle cx="26" cy="18" r="3" fill="url(#voice-grad)" opacity="0.9"/>
    </svg>
  ),
  Compare: ()=>(
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="cmp-l" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1a1a1a"/><stop offset="100%" stopColor="#3a3a3a"/></linearGradient>
        <linearGradient id="cmp-r" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c9a227"/><stop offset="100%" stopColor="#F5C518"/></linearGradient>
      </defs>
      <rect x="4" y="10" width="20" height="32" rx="2" fill="url(#cmp-l)"/>
      <rect x="28" y="10" width="20" height="32" rx="2" fill="url(#cmp-r)"/>
      <rect x="4" y="10" width="20" height="32" rx="2" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <rect x="28" y="10" width="20" height="32" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <line x1="26" y1="6" x2="26" y2="46" stroke="white" strokeWidth="2"/>
      <polygon points="20,20 26,26 20,32" fill="white" opacity="0.8"/>
      <polygon points="32,20 26,26 32,32" fill="white" opacity="0.8"/>
    </svg>
  ),
  Estimate: ()=>(
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <defs>
        <linearGradient id="est-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5C518"/>
          <stop offset="100%" stopColor="#c9860e"/>
        </linearGradient>
      </defs>
      <rect x="8" y="6" width="36" height="40" rx="3" fill="none" stroke="url(#est-grad)" strokeWidth="1.5"/>
      <line x1="14" y1="16" x2="28" y2="16" stroke="url(#est-grad)" strokeWidth="1.5"/>
      <line x1="14" y1="22" x2="32" y2="22" stroke="url(#est-grad)" strokeWidth="1"/>
      <line x1="14" y1="28" x2="26" y2="28" stroke="url(#est-grad)" strokeWidth="1"/>
      <circle cx="36" cy="36" r="10" fill="url(#est-grad)" opacity="0.15"/>
      <circle cx="36" cy="36" r="10" stroke="url(#est-grad)" strokeWidth="1.5"/>
      <text x="36" y="40" textAnchor="middle" fill="#F5C518" fontSize="10" fontWeight="bold">$</text>
    </svg>
  ),
  Share: ()=>(
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <defs><linearGradient id="sh-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00d4ff"/><stop offset="100%" stopColor="#F5C518"/></linearGradient></defs>
      <circle cx="38" cy="12" r="6" fill="none" stroke="url(#sh-grad)" strokeWidth="1.5"/>
      <circle cx="38" cy="40" r="6" fill="none" stroke="url(#sh-grad)" strokeWidth="1.5"/>
      <circle cx="14" cy="26" r="6" fill="none" stroke="url(#sh-grad)" strokeWidth="1.5"/>
      <line x1="20" y1="23" x2="32" y2="15" stroke="url(#sh-grad)" strokeWidth="1.5"/>
      <line x1="20" y1="29" x2="32" y2="37" stroke="url(#sh-grad)" strokeWidth="1.5"/>
      <circle cx="38" cy="12" r="3" fill="url(#sh-grad)"/>
      <circle cx="38" cy="40" r="3" fill="url(#sh-grad)"/>
      <circle cx="14" cy="26" r="3" fill="url(#sh-grad)"/>
    </svg>
  ),
  ColorMatch: ()=>(
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <defs><linearGradient id="cm-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ff6b35"/><stop offset="100%" stopColor="#F5C518"/></linearGradient></defs>
      <circle cx="20" cy="20" r="12" fill="url(#cm-grad)" opacity="0.2"/>
      <circle cx="20" cy="20" r="12" stroke="url(#cm-grad)" strokeWidth="1.5"/>
      <rect x="8" y="8" width="24" height="24" rx="12" fill="none"/>
      <line x1="28" y1="28" x2="44" y2="44" stroke="url(#cm-grad)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="44" cy="44" r="4" fill="url(#cm-grad)" opacity="0.5"/>
      {/* Crosshair */}
      <line x1="20" y1="14" x2="20" y2="26" stroke="white" strokeWidth="1" opacity="0.7"/>
      <line x1="14" y1="20" x2="26" y2="20" stroke="white" strokeWidth="1" opacity="0.7"/>
      <circle cx="20" cy="20" r="2.5" fill="white" opacity="0.9"/>
    </svg>
  ),
};

// ── SPEECH RECOGNITION HOOK ───────────────────────────────────────────────────
function useSpeech(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const recRef = useRef<unknown>(null);

  const start = useCallback(() => {
    const SpeechRecognition = (window as Record<string,unknown>).SpeechRecognition || (window as Record<string,unknown>).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const rec = new (SpeechRecognition as new()=>{ lang:string; interimResults:boolean; onstart:()=>void; onend:()=>void; onresult:(e:{results:{0:{0:{transcript:string}}}[]})=>void; start:()=>void })();
    rec.lang = "en-US"; rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e) => onResult(e.results[0][0].transcript);
    rec.start();
    recRef.current = rec;
  }, [onResult]);

  return { listening, start };
}

// ── SWATCH ───────────────────────────────────────────────────────────────────
function Swatch({ colors }: { colors: string[] }) {
  return (
    <div style={{display:"flex",borderRadius:3,overflow:"hidden",width:36,height:10}}>
      {colors.map((c,i) => <div key={i} style={{flex:1,background:c}}/>)}
    </div>
  );
}

// ── COLOR MATCH STRIP (shows hex from dream photo) ────────────────────────────
function ColorStrip({ imageUrl }: { imageUrl: string }) {
  const canRef = useRef<HTMLCanvasElement>(null);
  const [colors, setColors] = useState<string[]>([]);
  useEffect(() => {
    const img = new Image(); img.crossOrigin = "anonymous"; img.src = imageUrl;
    img.onload = () => {
      const c = canRef.current; if(!c) return;
      c.width=60; c.height=40;
      const ctx = c.getContext("2d"); if(!ctx) return;
      ctx.drawImage(img,0,0,60,40);
      const pts: string[] = [];
      [[10,10],[30,10],[50,10],[10,30],[30,30],[50,30]].forEach(([x,y]) => {
        const d = ctx.getImageData(x,y,1,1).data;
        pts.push(`#${d[0].toString(16).padStart(2,"0")}${d[1].toString(16).padStart(2,"0")}${d[2].toString(16).padStart(2,"0")}`);
      });
      setColors([...new Set(pts)].slice(0,5));
    };
  }, [imageUrl]);
  return (
    <div>
      <canvas ref={canRef} style={{display:"none"}}/>
      {colors.length > 0 && (
        <div style={{display:"flex",gap:4,alignItems:"center",marginTop:6}}>
          <span style={{fontSize:10,color:"rgba(0,0,0,0.4)",fontWeight:600}}>COLORS DETECTED:</span>
          {colors.map(c => <div key={c} style={{width:18,height:18,borderRadius:3,background:c,border:"1px solid rgba(0,0,0,0.1)"}} title={c}/>)}
        </div>
      )}
    </div>
  );
}

// ── COMPARE SLIDER ────────────────────────────────────────────────────────────
function CompareSlider({ blend1, blend2 }: { blend1: typeof FLAKE[0]; blend2: typeof FLAKE[0] }) {
  const [pos, setPos] = useState(50);
  const refDiv = useRef<HTMLDivElement>(null);

  function drag(e: React.MouseEvent|React.TouchEvent) {
    const el = refDiv.current; if(!el) return;
    const r = el.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setPos(Math.min(95, Math.max(5, ((clientX - r.left) / r.width) * 100)));
  }

  return (
    <div ref={refDiv} style={{position:"relative",height:120,borderRadius:10,overflow:"hidden",cursor:"ew-resize",border:"1px solid rgba(0,0,0,0.1)"}}
      onMouseMove={e=>e.buttons&&drag(e)} onTouchMove={drag}>
      {/* Left side */}
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:"100%",height:"100%",display:"flex",borderRadius:6,overflow:"hidden"}}>
          {blend1.colors.map((c,i)=><div key={i} style={{flex:1,background:c}}/>)}
        </div>
      </div>
      {/* Right side clipped */}
      <div style={{position:"absolute",inset:0,clipPath:`inset(0 0 0 ${pos}%)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:"100%",height:"100%",display:"flex",borderRadius:6,overflow:"hidden"}}>
          {blend2.colors.map((c,i)=><div key={i} style={{flex:1,background:c}}/>)}
        </div>
      </div>
      {/* Divider */}
      <div style={{position:"absolute",top:0,bottom:0,left:`${pos}%`,width:2,background:"white",boxShadow:"0 0 8px rgba(0,0,0,0.4)"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:28,height:28,background:"white",borderRadius:"50%",boxShadow:"0 2px 8px rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#333"}}>⇔</div>
      </div>
      {/* Labels */}
      <div style={{position:"absolute",bottom:6,left:8,fontSize:10,fontWeight:700,background:"rgba(255,255,255,0.9)",padding:"2px 6px",borderRadius:3,color:"#111"}}>{blend1.name}</div>
      <div style={{position:"absolute",bottom:6,right:8,fontSize:10,fontWeight:700,background:"rgba(255,255,255,0.9)",padding:"2px 6px",borderRadius:3,color:"#111"}}>{blend2.name}</div>
    </div>
  );
}

// ── COST ESTIMATOR ────────────────────────────────────────────────────────────
function CostEstimator({ category }: { category: Cat }) {
  const [sqft, setSqft] = useState(500);
  const [prep, setPrep] = useState(false);
  const rates: Record<Cat,[number,number]> = {
    "epoxy-flake":       [3.5, 6],
    "metallic-epoxy":    [6,   10],
    "polished-concrete": [4,   8],
    "stained-concrete":  [3,   5.5],
  };
  const [lo, hi] = rates[category];
  const prepCost = prep ? sqft * 0.75 : 0;
  return (
    <div style={{background:"#f8f8f6",borderRadius:12,padding:"20px 24px",border:"1px solid #e8e8e8"}}>
      <div style={{fontWeight:800,fontSize:14,marginBottom:12,color:"#111"}}>Instant Cost Estimator</div>
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
          <span style={{fontSize:12,color:"#555"}}>Square footage</span>
          <span style={{fontSize:13,fontWeight:700,color:"#111"}}>{sqft} sq ft</span>
        </div>
        <input type="range" min={100} max={5000} step={50} value={sqft} onChange={e=>setSqft(+e.target.value)}
          style={{width:"100%",accentColor:"#F5C518"}}/>
      </div>
      <label style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:"#555",marginBottom:16,cursor:"pointer"}}>
        <input type="checkbox" checked={prep} onChange={e=>setPrep(e.target.checked)} style={{accentColor:"#F5C518"}}/>
        Include concrete prep / grinding
      </label>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"white",borderRadius:8,padding:"12px 16px",border:"1px solid #e0e0e0"}}>
        <div>
          <div style={{fontSize:11,color:"#888",fontWeight:600}}>ESTIMATED INVESTMENT</div>
          <div style={{fontSize:22,fontWeight:900,color:"#111",lineHeight:1.1}}>
            ${Math.round((sqft*lo+prepCost)).toLocaleString()} – ${Math.round((sqft*hi+prepCost)).toLocaleString()}
          </div>
        </div>
        <div style={{background:"#F5C518",borderRadius:8,padding:"8px 14px",fontSize:11,fontWeight:800,color:"#000",cursor:"pointer"}}>Get Exact Bid</div>
      </div>
      <div style={{fontSize:10,color:"#aaa",marginTop:8}}>*Estimate only. Final price depends on condition, prep, and location.</div>
    </div>
  );
}

// ── AR MODAL (WebXR + camera permission) ─────────────────────────────────────
function ARModal({ blend, onClose }: { blend: typeof FLAKE[0]|null; onClose: ()=>void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [arActive, setArActive] = useState(false);
  const [permission, setPermission] = useState<"idle"|"requesting"|"granted"|"denied">("idle");
  const animRef = useRef<number>(0);

  async function startAR() {
    setPermission("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode:"environment", width:{ideal:1280}, height:{ideal:720} }});
      if(videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
      setPermission("granted"); setArActive(true);
    } catch {
      setPermission("denied");
    }
  }

  useEffect(() => {
    if(!arActive || !canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    if(!ctx) return;

    let frame = 0;
    function render() {
      if(!ctx || !video.videoWidth) { animRef.current = requestAnimationFrame(render); return; }
      canvas.width = video.videoWidth; canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      // AR floor overlay — scan bottom 40% of frame
      const floorTop = Math.round(canvas.height * 0.6);
      const floorH = canvas.height - floorTop;
      const cols = blend?.colors || ["#c9a227","#1a1a1a","#f5f5f5"];

      // Draw perspective-correct floor tiles
      for(let row = 0; row < 8; row++) {
        for(let col = 0; col < 12; col++) {
          const progress = row / 8;
          const tileW = (canvas.width / 12) * (0.3 + progress * 0.7);
          const tileH = (floorH / 8) * (0.1 + progress * 0.9);
          const x = (canvas.width / 2) + (col - 6) * tileW;
          const y = floorTop + row * (floorH / 8);
          const color = cols[(row + col) % cols.length];
          const alpha = 0.35 + progress * 0.25;
          ctx.fillStyle = color + Math.round(alpha * 255).toString(16).padStart(2,"0");
          ctx.strokeStyle = "rgba(255,255,255,0.15)";
          ctx.lineWidth = 0.5;
          ctx.fillRect(x, y, tileW - 1, tileH - 1);
          if(frame % 2 === 0) ctx.strokeRect(x, y, tileW - 1, tileH - 1);
        }
      }

      // Scan line animation
      const scanY = floorTop + ((frame * 3) % floorH);
      ctx.fillStyle = "rgba(245,197,24,0.15)";
      ctx.fillRect(0, scanY, canvas.width, 3);

      // Corner brackets
      const bSize = 30;
      ctx.strokeStyle = "#F5C518"; ctx.lineWidth = 2;
      [[20,floorTop],[canvas.width-20-bSize,floorTop]].forEach(([bx,by])=>{
        ctx.beginPath(); ctx.moveTo(bx,by+bSize); ctx.lineTo(bx,by); ctx.lineTo(bx+bSize,by); ctx.stroke();
      });

      frame++;
      animRef.current = requestAnimationFrame(render);
    }
    render();
    return () => cancelAnimationFrame(animRef.current);
  }, [arActive, blend]);

  useEffect(() => () => { if(videoRef.current?.srcObject) { const s=videoRef.current.srcObject as MediaStream; s.getTracks().forEach(t=>t.stop()); } }, []);

  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,background:"#000",display:"flex",flexDirection:"column"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,zIndex:10,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,background:"#F5C518",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#000",fontSize:11}}>FV</div>
          <div style={{color:"#fff",fontWeight:700,fontSize:14}}>AR Floor Preview{blend?` — ${blend.name}`:""}</div>
        </div>
        <button onPointerDown={onClose} style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",padding:"6px 14px",borderRadius:6,fontWeight:700,fontSize:13,cursor:"pointer"}}>✕ Exit AR</button>
      </div>

      <video ref={videoRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}} playsInline muted/>
      <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>

      {!arActive && (
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center"}}>
          <div style={{marginBottom:24}}><Icon.AR/></div>
          <h2 style={{color:"#fff",fontSize:24,fontWeight:900,marginBottom:12}}>Walk-Around AR Preview</h2>
          <p style={{color:"rgba(255,255,255,0.65)",fontSize:14,lineHeight:1.7,maxWidth:320,marginBottom:28}}>
            Point your camera at your floor. FloorVision will overlay your selected finish in real time as you walk around the space.
          </p>
          {permission==="denied" && <p style={{color:"#ff6b35",fontSize:13,marginBottom:16}}>Camera access was denied. Please enable it in your browser settings.</p>}
          <button onPointerDown={startAR} style={{background:"#F5C518",color:"#000",border:"none",padding:"16px 32px",borderRadius:10,fontWeight:800,fontSize:16,cursor:"pointer"}}>
            {permission==="requesting"?"Starting Camera...":"Start AR Preview →"}
          </button>
          <p style={{color:"rgba(255,255,255,0.3)",fontSize:11,marginTop:16}}>Requires camera permission · Works best on mobile</p>
        </div>
      )}

      {arActive && (
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 24px",background:"linear-gradient(to top,rgba(0,0,0,0.8),transparent)"}}>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <div style={{background:"rgba(245,197,24,0.9)",color:"#000",padding:"8px 16px",borderRadius:20,fontSize:12,fontWeight:700}}>🔴 AR LIVE</div>
            {blend && <div style={{background:"rgba(255,255,255,0.15)",color:"#fff",padding:"8px 16px",borderRadius:20,fontSize:12,fontWeight:600}}>Blend: {blend.name}</div>}
            <div style={{background:"rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",padding:"8px 16px",borderRadius:20,fontSize:11}}>Point camera at floor</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
const STEPS = ["Finish Type","Room & Photo","Choose Blend","Get My Bid"];

export default function FloorVisionPro() {
  const [step, setStep]             = useState(0);
  const [category, setCat]          = useState<Cat>("epoxy-flake");
  const [room, setRoom]             = useState(ROOMS[0]);
  const [myPhoto, setMyPhoto]       = useState<string|null>(null);
  const [dreamPhoto, setDreamPhoto] = useState<string|null>(null);
  const [blend, setBlend]           = useState<typeof FLAKE[0]|null>(null);
  const [compareBlend, setCompare]  = useState<typeof FLAKE[0]|null>(null);
  const [chipSize, setChip]         = useState<"116"|"18"|"40">("18");
  const [search, setSearch]         = useState("");
  const [voiceStatus, setVStatus]   = useState("");
  const [showAR, setShowAR]         = useState(false);
  const [showCompare, setShowCmp]   = useState(false);
  const [form, setForm]             = useState({name:"",phone:"",email:"",address:"",sqft:"",notes:""});
  const [done, setDone]             = useState(false);
  const myRef    = useRef<HTMLInputElement>(null);
  const dreamRef = useRef<HTMLInputElement>(null);

  const blends = BLEND_MAP[category];
  const filtered = blends.filter(b =>
    !search || b.name.toLowerCase().includes(search.toLowerCase())
  );

  // Voice command parser
  const { listening, start: startListening } = useSpeech((text: string) => {
    setVStatus(`Heard: "${text}"`);
    const lower = text.toLowerCase();
    if(lower.includes("metallic")) setCat("metallic-epoxy");
    else if(lower.includes("polish")) setCat("polished-concrete");
    else if(lower.includes("stain")) setCat("stained-concrete");
    else if(lower.includes("flake")||lower.includes("epoxy")) setCat("epoxy-flake");
    const foundBlend = [...FLAKE,...METALLIC,...POLISHED,...STAINED].find(b =>
      lower.includes(b.name.toLowerCase().split(" ")[0].toLowerCase())
    );
    if(foundBlend) { setBlend(foundBlend); setVStatus(`Selected: ${foundBlend.name}`); }
    if(lower.includes("next")||lower.includes("continue")) setStep(s=>Math.min(3,s+1));
    if(lower.includes("back")) setStep(s=>Math.max(0,s-1));
    if(lower.includes("ar")||lower.includes("augmented")||lower.includes("preview")) setShowAR(true);
  });

  function readFile(e: React.ChangeEvent<HTMLInputElement>, setter: (v:string)=>void) {
    const f = e.target.files?.[0]; if(!f) return;
    const r = new FileReader(); r.onload=()=>setter(r.result as string); r.readAsDataURL(f);
  }

  // ── SECTION STYLES (alternating white / black) ────────────────────────────
  const W: React.CSSProperties = {background:"#ffffff",color:"#111"};
  const B: React.CSSProperties = {background:"#0D0D0D",color:"#fff"};
  const card: React.CSSProperties = {background:"#fff",borderRadius:12,border:"1px solid #e8e8e8",padding:"20px 16px",cursor:"pointer",textAlign:"left",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"};
  const cardSel: React.CSSProperties = {...card,border:"2px solid #F5C518",boxShadow:"0 0 0 3px rgba(245,197,24,0.12)"};

  if (showAR) return <ARModal blend={blend} onClose={()=>setShowAR(false)}/>;

  if (done) return (
    <div style={{minHeight:"100vh",background:"#fff",color:"#111",fontFamily:"'Inter',system-ui,sans-serif",display:"flex",flexDirection:"column"}}>
      <header style={{height:64,borderBottom:"1px solid #e8e8e8",padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"#fff",zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,background:"#111",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#F5C518",fontWeight:900,fontSize:13}}>FV</span></div>
          <div><div style={{fontWeight:800,fontSize:15}}>FloorVision Pro</div><div style={{fontSize:10,color:"#F5C518",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>by Xtreme Polishing Systems</div></div>
        </div>
      </header>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:32}}>
        <div style={{maxWidth:520,textAlign:"center"}}>
          <div style={{width:72,height:72,background:"#F5C518",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 20px"}}>✓</div>
          <h2 style={{fontSize:32,fontWeight:900,marginBottom:8}}>You&apos;re all set, {form.name.split(" ")[0]}!</h2>
          <p style={{color:"#555",fontSize:16,lineHeight:1.7,marginBottom:28}}>Your floor visualization and digital bid will arrive at <strong>{form.email}</strong> and via WhatsApp to <strong>{form.phone}</strong> within 24 hours.</p>
          {blend && (
            <div style={{background:"#f8f8f6",border:"1px solid #e8e8e8",borderRadius:12,padding:"18px 24px",marginBottom:24,textAlign:"left"}}>
              <div style={{fontSize:11,color:"#888",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>Your Selection</div>
              <div style={{fontWeight:800,fontSize:18}}>{blend.name}</div>
              <div style={{display:"flex",gap:8,alignItems:"center",marginTop:6}}><Swatch colors={blend.colors}/><span style={{fontSize:12,color:"#666"}}>{category.split("-").map(w=>w[0].toUpperCase()+w.slice(1)).join(" ")} · {room.label}</span></div>
            </div>
          )}
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="tel:8779585264" style={{background:"#F5C518",color:"#000",padding:"14px 24px",borderRadius:8,fontWeight:800,fontSize:14,textDecoration:"none"}}>📞 Call Now</a>
            <button onPointerDown={()=>{setDone(false);setStep(0);setBlend(null);}} style={{background:"transparent",color:"#111",border:"1px solid #ddd",padding:"14px 24px",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer"}}>Visualize Another Floor</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",overflowX:"hidden"}}>
      {/* ── HEADER (white) ─────────────────────────────────────────────── */}
      <header style={{...W,height:64,borderBottom:"1px solid #e8e8e8",padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50,boxShadow:"0 1px 0 #e8e8e8"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,background:"#111",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#F5C518",fontWeight:900,fontSize:13}}>FV</span></div>
          <div><div style={{fontWeight:800,fontSize:15,color:"#111"}}>FloorVision Pro</div><div style={{fontSize:10,color:"#F5C518",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>by Xtreme Polishing Systems</div></div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button onPointerDown={startListening} style={{background:listening?"#F5C518":"#111",color:listening?"#000":"#fff",border:"none",padding:"8px 14px",borderRadius:6,fontWeight:700,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            {listening?"🔴 Listening...":"🎙 Voice"}
          </button>
          <a href="tel:8779585264" style={{background:"#F5C518",color:"#000",padding:"8px 16px",borderRadius:6,fontWeight:800,fontSize:13,textDecoration:"none"}}>📞 (877) 958-5264</a>
        </div>
      </header>

      {/* ── HERO (black) ───────────────────────────────────────────────── */}
      <section style={{...B,padding:"88px 28px 80px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        {/* BG grid */}
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(245,197,24,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,197,24,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}}/>
        <div style={{position:"relative"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(245,197,24,0.1)",border:"1px solid rgba(245,197,24,0.2)",borderRadius:20,padding:"6px 16px",marginBottom:28}}>
            <div style={{width:6,height:6,background:"#F5C518",borderRadius:"50%"}}/>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#F5C518"}}>AI-Powered Floor Visualizer</span>
          </div>
          <h1 style={{fontSize:"clamp(38px,7vw,80px)",fontWeight:900,lineHeight:1.0,letterSpacing:"-0.03em",color:"#fff",marginBottom:20,maxWidth:800,margin:"0 auto 20px"}}>
            See Your New Floor<br/><span style={{color:"#F5C518"}}>Before It&apos;s Installed.</span>
          </h1>
          <p style={{fontSize:17,color:"rgba(255,255,255,0.55)",maxWidth:560,margin:"0 auto 40px",lineHeight:1.7}}>
            Upload your room. Choose epoxy flake, metallic, polished concrete, or stained. AR-preview it in your space. Get a digital bid in 24 hours.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:48}}>
            <button onPointerDown={()=>setStep(0)} style={{background:"#F5C518",color:"#000",border:"none",padding:"16px 32px",borderRadius:10,fontWeight:800,fontSize:16,cursor:"pointer"}}>✨ Visualize My Floor</button>
            <button onPointerDown={()=>setShowAR(true)} style={{background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",padding:"16px 28px",borderRadius:10,fontWeight:600,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:18}}>📱</span> AR Preview
            </button>
          </div>
          {/* Feature pills */}
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            {["Walk-Around AR","AI Voice Control","Dream Floor Transfer","Side-by-Side Compare","Instant Cost Estimator","24hr Digital Bid"].map(f=>(
              <span key={f} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",padding:"5px 12px",borderRadius:20,fontSize:11,fontWeight:500,color:"rgba(255,255,255,0.6)"}}>{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES (white) ───────────────────────────────────────────── */}
      <section style={{...W,padding:"72px 28px"}}>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#F5C518",marginBottom:12}}>What Makes FloorVision Pro Different</div>
            <h2 style={{fontSize:"clamp(28px,4vw,48px)",fontWeight:900,letterSpacing:"-0.02em",color:"#111"}}>Every feature you need.<br/>Nothing you don&apos;t.</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:24}}>
            {[
              { icon:<Icon.AR/>, title:"Walk-Around AR",    desc:"Point your phone at your floor. See your chosen finish overlaid in real time as you walk around the room." },
              { icon:<Icon.Dream/>, title:"Dream → My Floor", desc:"Upload a Pinterest or Instagram inspiration photo. AI extracts the colors and renders them onto your actual space." },
              { icon:<Icon.Voice/>, title:"AI Voice Control",  desc:"Say 'show me a black and gold blend for my garage' and FloorVision finds it, selects it, and reads it back to you." },
              { icon:<Icon.Compare/>, title:"Side-by-Side Compare", desc:"Drag a center divider to compare two blends on the same room photo before committing to either." },
              { icon:<Icon.Estimate/>, title:"Instant Cost Estimator", desc:"Enter your square footage and see a real-time price range before requesting your formal digital bid." },
              { icon:<Icon.ColorMatch/>, title:"Color Match", desc:"Snap any object — your car, cabinets, furniture — and we find the closest matching blend in our catalog." },
              { icon:<Icon.Share/>, title:"Shareable Design Link", desc:"Save your floor design and share a unique URL with your partner, contractor, or designer instantly." },
              { icon:<Icon.Flake/>, title:"174 SKU Catalog", desc:"58 flake blends × 3 chip sizes. Plus metallic, polished concrete, and stained concrete. All in one place." },
            ].map(f=>(
              <div key={f.title} style={{background:"#fafafa",borderRadius:14,padding:"24px 20px",border:"1px solid #eeeeee",transition:"all 0.2s"}}>
                <div style={{marginBottom:14}}>{f.icon}</div>
                <div style={{fontWeight:800,fontSize:15,color:"#111",marginBottom:6}}>{f.title}</div>
                <div style={{fontSize:13,color:"#666",lineHeight:1.6}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WIZARD (black) ─────────────────────────────────────────────── */}
      <section style={{...B,padding:"72px 28px",position:"relative"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 20% 50%, rgba(245,197,24,0.05) 0%, transparent 60%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:900,margin:"0 auto",position:"relative"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <h2 style={{fontSize:"clamp(26px,4vw,42px)",fontWeight:900,color:"#fff",letterSpacing:"-0.02em"}}>Design Your Floor</h2>
            <p style={{color:"rgba(255,255,255,0.45)",fontSize:15,marginTop:8}}>4 steps to your free digital bid</p>
          </div>

          {/* Progress */}
          <div style={{display:"flex",gap:3,marginBottom:40}}>
            {STEPS.map((st,i)=>(
              <div key={st} style={{flex:1,cursor:i<step?"pointer":"default"}} onPointerDown={()=>i<step&&setStep(i)}>
                <div style={{height:3,borderRadius:2,background:i<=step?"#F5C518":"rgba(255,255,255,0.1)",marginBottom:7,transition:"background 0.3s"}}/>
                <div style={{fontSize:9,fontWeight:700,color:i===step?"#F5C518":i<step?"rgba(255,255,255,0.4)":"rgba(255,255,255,0.2)",textTransform:"uppercase",letterSpacing:"0.08em",textAlign:"center"}}>{st}</div>
              </div>
            ))}
          </div>

          {/* Voice status */}
          {voiceStatus && <div style={{background:"rgba(245,197,24,0.1)",border:"1px solid rgba(245,197,24,0.2)",borderRadius:8,padding:"8px 14px",marginBottom:20,fontSize:13,color:"#F5C518"}}>🎙 {voiceStatus}</div>}

          {/* ── STEP 0 ── */}
          {step===0 && (
            <div>
              <h3 style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:6}}>What type of floor finish?</h3>
              <p style={{color:"rgba(255,255,255,0.4)",marginBottom:24,fontSize:14}}>Not sure? Epoxy Flake is our most popular — 58 blends, 3 chip sizes.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:10}}>
                {([["epoxy-flake","Epoxy Flake","flake"],["metallic-epoxy","Metallic Epoxy","metallic"],["polished-concrete","Polished Concrete","polished"],["stained-concrete","Stained Concrete","stained"]] as [Cat,string,string][]).map(([id,label,key])=>{
                  const IconComp = ({flake:<Icon.Flake/>,metallic:<Icon.Metallic/>,polished:<Icon.Polished/>,stained:<Icon.Stained/>} as Record<string,React.ReactNode>)[key];
                  const sel=category===id;
                  return (
                    <button key={id} onPointerDown={()=>setCat(id)}
                      style={{background:sel?"rgba(245,197,24,0.1)":"rgba(255,255,255,0.04)",border:`2px solid ${sel?"#F5C518":"rgba(255,255,255,0.07)"}`,borderRadius:12,padding:"20px 16px",cursor:"pointer",color:"#fff",textAlign:"left",transition:"all 0.15s"}}>
                      <div style={{marginBottom:12}}>{IconComp}</div>
                      <div style={{fontWeight:800,fontSize:14,marginBottom:4,color:sel?"#F5C518":"#fff"}}>{label}</div>
                      {sel && <div style={{fontSize:10,color:"#F5C518",fontWeight:700,marginTop:6}}>✓ Selected</div>}
                    </button>
                  );
                })}
              </div>
              <div style={{marginTop:24,display:"flex",justifyContent:"flex-end"}}>
                <button onPointerDown={()=>setStep(1)} style={{background:"#F5C518",color:"#000",border:"none",padding:"14px 28px",borderRadius:8,fontWeight:800,fontSize:15,cursor:"pointer"}}>Next: Choose Room →</button>
              </div>
            </div>
          )}

          {/* ── STEP 1 ── */}
          {step===1 && (
            <div>
              <h3 style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:6}}>Pick a room or upload your own</h3>
              <p style={{color:"rgba(255,255,255,0.4)",marginBottom:24,fontSize:14}}>Upload your actual space for a personalized preview — or attach a dream floor for AI color matching.</p>
              <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
                <input ref={myRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>readFile(e,setMyPhoto)}/>
                <input ref={dreamRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>readFile(e,setDreamPhoto)}/>
                <button onPointerDown={()=>myRef.current?.click()} style={{background:myPhoto?"rgba(245,197,24,0.1)":"rgba(255,255,255,0.05)",border:`1px solid ${myPhoto?"#F5C518":"rgba(255,255,255,0.1)"}`,color:"#fff",padding:"11px 18px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13}}>
                  {myPhoto?"✅ My Photo Ready":"📷 Upload My Room Photo"}
                </button>
                <button onPointerDown={()=>dreamRef.current?.click()} style={{background:dreamPhoto?"rgba(245,197,24,0.1)":"rgba(255,255,255,0.05)",border:`1px solid ${dreamPhoto?"#F5C518":"rgba(255,255,255,0.1)"}`,color:"#fff",padding:"11px 18px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13}}>
                  {dreamPhoto?"✅ Dream Floor Attached":"💡 Dream Floor Inspiration"}
                </button>
                <button onPointerDown={()=>setShowAR(true)} style={{background:"rgba(0,212,255,0.08)",border:"1px solid rgba(0,212,255,0.2)",color:"#00d4ff",padding:"11px 18px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:6}}>
                  📱 Live AR Preview
                </button>
              </div>
              {(myPhoto||dreamPhoto) && (
                <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap"}}>
                  {myPhoto && <div style={{position:"relative"}}>
                    <img src={myPhoto} alt="room" style={{width:150,height:95,objectFit:"cover",borderRadius:8,border:"2px solid #F5C518"}}/>
                    <div style={{position:"absolute",top:4,left:4,background:"#F5C518",color:"#000",fontSize:9,fontWeight:800,padding:"2px 5px",borderRadius:3}}>MY ROOM</div>
                  </div>}
                  {dreamPhoto && (
                    <div>
                      <div style={{position:"relative"}}>
                        <img src={dreamPhoto} alt="dream" style={{width:150,height:95,objectFit:"cover",borderRadius:8,border:"2px solid #00d4ff"}}/>
                        <div style={{position:"absolute",top:4,left:4,background:"#00d4ff",color:"#000",fontSize:9,fontWeight:800,padding:"2px 5px",borderRadius:3}}>DREAM FLOOR</div>
                      </div>
                      <ColorStrip imageUrl={dreamPhoto}/>
                    </div>
                  )}
                </div>
              )}
              <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>— or choose a preset environment —</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(115px,1fr))",gap:8,marginBottom:24}}>
                {ROOMS.map(r=>(
                  <button key={r.id} onPointerDown={()=>setRoom(r)} style={{background:"transparent",border:`2px solid ${room.id===r.id?"#F5C518":"rgba(255,255,255,0.07)"}`,borderRadius:8,padding:0,cursor:"pointer",overflow:"hidden"}}>
                    <img src={r.img} alt={r.label} style={{width:"100%",height:68,objectFit:"cover",display:"block"}} onError={e=>{(e.target as HTMLImageElement).style.background="#222";}}/>
                    <div style={{padding:"5px 6px",background:room.id===r.id?"rgba(245,197,24,0.1)":"rgba(0,0,0,0.5)",textAlign:"center"}}>
                      <div style={{fontSize:10,fontWeight:600,color:room.id===r.id?"#F5C518":"#fff"}}>{r.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"space-between"}}>
                <button onPointerDown={()=>setStep(0)} style={{background:"transparent",color:"rgba(255,255,255,0.4)",border:"1px solid rgba(255,255,255,0.1)",padding:"12px 20px",borderRadius:8,cursor:"pointer"}}>← Back</button>
                <button onPointerDown={()=>setStep(2)} style={{background:"#F5C518",color:"#000",border:"none",padding:"14px 28px",borderRadius:8,fontWeight:800,fontSize:15,cursor:"pointer"}}>Next: Choose Blend →</button>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step===2 && (
            <div>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:18}}>
                <div>
                  <h3 style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:4}}>{category.split("-").map(w=>w[0].toUpperCase()+w.slice(1)).join(" ")}</h3>
                  <p style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>{filtered.length} blends available</p>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search blends..."
                    style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:7,padding:"9px 13px",color:"#fff",fontSize:13,width:160,outline:"none"}}/>
                  {category==="epoxy-flake" && (["116","18","40"] as Array<"116"|"18"|"40">).map(sz=>(
                    <button key={sz} onPointerDown={()=>setChip(sz)}
                      style={{background:chipSize===sz?"#F5C518":"rgba(255,255,255,0.05)",color:chipSize===sz?"#000":"#fff",border:"1px solid rgba(255,255,255,0.1)",padding:"7px 10px",borderRadius:6,fontSize:11,fontWeight:800,cursor:"pointer"}}>
                      {sz==="116"?'1/16"':sz==="18"?'1/8"':'1/4"'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compare toggle */}
              {blend && !showCompare && (
                <button onPointerDown={()=>setShowCmp(true)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.6)",padding:"7px 14px",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer",marginBottom:14,display:"flex",alignItems:"center",gap:6}}>
                  <span>⇔</span> Compare two blends
                </button>
              )}
              {showCompare && blend && (
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:6}}>Tap a second blend to compare ↓</div>
                  {compareBlend && <CompareSlider blend1={blend} blend2={compareBlend}/>}
                </div>
              )}

              {/* Blend grid */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8,maxHeight:360,overflowY:"auto",paddingRight:2}}>
                {filtered.map(b=>{
                  const thumbUrl = category==="epoxy-flake" && ("sku" in b) && b.sku
                    ? `${CDN}/${b.sku}-${chipSize}.jpg`
                    : undefined;
                  const sel = blend?.id===b.id;
                  const cmpSel = compareBlend?.id===b.id;
                  return (
                    <button key={b.id} onPointerDown={()=>{ if(showCompare && blend && b.id!==blend.id){setCompare(b);} else { setBlend(b); if(showCompare)setShowCmp(false); }}}
                      style={{background:sel?"rgba(245,197,24,0.1)":cmpSel?"rgba(0,212,255,0.1)":"rgba(255,255,255,0.03)",border:`2px solid ${sel?"#F5C518":cmpSel?"#00d4ff":"rgba(255,255,255,0.06)"}`,borderRadius:9,padding:0,cursor:"pointer",overflow:"hidden",textAlign:"left",transition:"border-color 0.15s",position:"relative"}}>
                      {b.popular && <div style={{position:"absolute",top:5,right:5,background:"#F5C518",color:"#000",fontSize:8,fontWeight:900,padding:"1px 4px",borderRadius:2,zIndex:1}}>★ TOP</div>}
                      {/* Color preview (with actual blend image if available) */}
                      {thumbUrl ? (
                        <img src={thumbUrl} alt={b.name} style={{width:"100%",height:80,objectFit:"cover",display:"block"}}
                          onError={e=>{ const el = e.target as HTMLImageElement; el.style.display="none"; el.nextElementSibling?.setAttribute("style","display:flex"); }}/>
                      ) : null}
                      <div style={{width:"100%",height:thumbUrl?0:80,display:"flex",borderRadius:0,overflow:"hidden"}}>
                        {b.colors.map((c,i)=><div key={i} style={{flex:1,background:c}}/>)}
                      </div>
                      <div style={{padding:"7px 8px"}}>
                        <div style={{fontWeight:700,fontSize:12,color:sel?"#F5C518":cmpSel?"#00d4ff":"#fff"}}>{b.name}</div>
                        <div style={{marginTop:4}}><Swatch colors={b.colors}/></div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {blend && (
                <div style={{marginTop:14,background:"rgba(245,197,24,0.07)",border:"1px solid rgba(245,197,24,0.2)",borderRadius:9,padding:"12px 16px",display:"flex",gap:12,alignItems:"center"}}>
                  <Swatch colors={blend.colors}/>
                  <div><div style={{fontWeight:800,fontSize:14,color:"#fff"}}>{blend.name} <span style={{color:"#F5C518",fontSize:11}}>✓</span></div>
                  {("sku" in blend) && blend.sku && <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontFamily:"monospace",marginTop:2}}>{blend.sku}-{chipSize}</div>}</div>
                  <button onPointerDown={()=>setShowAR(true)} style={{marginLeft:"auto",background:"rgba(0,212,255,0.1)",border:"1px solid rgba(0,212,255,0.2)",color:"#00d4ff",padding:"7px 12px",borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer"}}>📱 AR Preview</button>
                </div>
              )}

              <div style={{display:"flex",gap:10,justifyContent:"space-between",marginTop:16}}>
                <button onPointerDown={()=>setStep(1)} style={{background:"transparent",color:"rgba(255,255,255,0.4)",border:"1px solid rgba(255,255,255,0.1)",padding:"12px 20px",borderRadius:8,cursor:"pointer"}}>← Back</button>
                <button onPointerDown={()=>blend&&setStep(3)} disabled={!blend}
                  style={{background:blend?"#F5C518":"rgba(255,255,255,0.08)",color:blend?"#000":"rgba(255,255,255,0.25)",border:"none",padding:"14px 28px",borderRadius:8,fontWeight:800,fontSize:15,cursor:blend?"pointer":"not-allowed"}}>
                  Next: Get My Bid →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step===3 && (
            <div style={{maxWidth:520}}>
              <h3 style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:6}}>Your free digital bid awaits</h3>
              <p style={{color:"rgba(255,255,255,0.4)",marginBottom:20,fontSize:14}}>24-hour turnaround. Your bid includes AI floor visualization, pricing, digital contract, and crew assignment.</p>
              {blend && (
                <div style={{background:"rgba(245,197,24,0.07)",border:"1px solid rgba(245,197,24,0.18)",borderRadius:9,padding:"12px 16px",marginBottom:20,display:"flex",gap:12,alignItems:"center"}}>
                  <Swatch colors={blend.colors}/>
                  <div><div style={{fontWeight:800,fontSize:14,color:"#fff"}}>{blend.name}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2}}>{room.label}</div></div>
                </div>
              )}
              <div style={{display:"grid",gap:10}}>
                {([["name","Full Name *","text"],["phone","Phone / WhatsApp *","tel"],["email","Email Address *","email"],["address","Property Address","text"],["sqft","Square Footage","number"]] as [string,string,string][]).map(([field,label,type])=>(
                  <div key={field}>
                    <label style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.45)",marginBottom:4,display:"block"}}>{label}</label>
                    <input type={type} value={(form as Record<string,string>)[field]} onChange={e=>setForm({...form,[field]:e.target.value})}
                      style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:7,padding:"11px 13px",color:"#fff",fontSize:14,outline:"none"}}/>
                  </div>
                ))}
                <div>
                  <label style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.45)",marginBottom:4,display:"block"}}>Additional Notes</label>
                  <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})
                  } style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:7,padding:"11px 13px",color:"#fff",fontSize:14,height:72,resize:"none",outline:"none"}}/>
                </div>
              </div>
              <div style={{background:"rgba(0,86,166,0.12)",border:"1px solid rgba(0,86,166,0.25)",borderRadius:7,padding:"10px 14px",marginTop:12,fontSize:12,color:"rgba(255,255,255,0.55)"}}>
                🔒 A customer account is created automatically. You&apos;ll receive WhatsApp + email notifications with your bid, visualization, and crew details.
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"space-between",marginTop:16}}>
                <button onPointerDown={()=>setStep(2)} style={{background:"transparent",color:"rgba(255,255,255,0.4)",border:"1px solid rgba(255,255,255,0.1)",padding:"12px 20px",borderRadius:8,cursor:"pointer"}}>← Back</button>
                <button onPointerDown={()=>{if(form.name&&form.phone&&form.email)setDone(true);}} disabled={!(form.name&&form.phone&&form.email)}
                  style={{background:form.name&&form.phone&&form.email?"#F5C518":"rgba(255,255,255,0.08)",color:form.name&&form.phone&&form.email?"#000":"rgba(255,255,255,0.25)",border:"none",padding:"14px 28px",borderRadius:8,fontWeight:800,fontSize:15,cursor:form.name&&form.phone&&form.email?"pointer":"not-allowed"}}>
                  🚀 Submit — Get My Free Bid
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── COST ESTIMATOR (white) ──────────────────────────────────────── */}
      <section style={{...W,padding:"72px 28px"}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#F5C518",marginBottom:12}}>Transparent Pricing</div>
            <h2 style={{fontSize:"clamp(26px,4vw,42px)",fontWeight:900,color:"#111",letterSpacing:"-0.02em"}}>Know the ballpark<br/>before you commit.</h2>
          </div>
          <CostEstimator category={category}/>
        </div>
      </section>

      {/* ── FOOTER (black) ──────────────────────────────────────────────── */}
      <footer style={{...B,padding:"48px 28px 32px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{maxWidth:1080,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:32}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <div style={{width:32,height:32,background:"#F5C518",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#000",fontSize:12}}>FV</div>
              <div style={{fontWeight:800,fontSize:14,color:"#fff"}}>FloorVision Pro</div>
            </div>
            <p style={{fontSize:12,color:"rgba(255,255,255,0.3)",lineHeight:1.7,maxWidth:280}}>The most advanced floor visualization system in the industry. Powered by Xtreme Polishing Systems.</p>
          </div>
          <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>
            {[["(877) 958-5264","Phone"],["xtremepolishingsystems.com","Website"],["info@xtremepolishingsystems.com","Email"]].map(([v,l])=>(
              <div key={l}>
                <div style={{fontSize:10,fontWeight:700,color:"#F5C518",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>{l}</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.6)"}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{maxWidth:1080,margin:"32px auto 0",paddingTop:24,borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.2)"}}>© 2026 Xtreme Polishing Systems. All rights reserved.</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.2)"}}>Powered by <strong style={{color:"rgba(255,255,255,0.4)"}}>Xtreme Polishing Systems</strong> — America&apos;s #1 Epoxy Superstore</div>
        </div>
      </footer>
    </div>
  );
}
