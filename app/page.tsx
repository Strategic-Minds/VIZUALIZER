"use client";
import { useState, useRef } from "react";

type FinishCategory = "epoxy-flake"|"metallic-epoxy"|"polished-concrete"|"stained-concrete";

const CATEGORIES: { id: FinishCategory; label: string; icon: string; desc: string }[] = [
  { id:"epoxy-flake",       label:"Epoxy Flake",       icon:"🎨", desc:"58 blends in 3 chip sizes. Most popular choice." },
  { id:"metallic-epoxy",    label:"Metallic Epoxy",    icon:"✨", desc:"Luxury swirl effect. No two floors look the same." },
  { id:"polished-concrete", label:"Polished Concrete", icon:"💎", desc:"Your existing slab ground to a mirror finish." },
  { id:"stained-concrete",  label:"Stained Concrete",  icon:"🌊", desc:"Acid or water-based stains that penetrate permanently." },
];

const FLAKE_BLENDS = [
  { id:"FB201", name:"Lambeau",       sku:"XPS-FB201", colors:["Green","Gold","Grey"],   popular:true  },
  { id:"FB208", name:"Miller",        sku:"XPS-FB208", colors:["Green","Gold","White"],  popular:true  },
  { id:"FB209", name:"Heinz",         sku:"XPS-FB209", colors:["Gold","Black","White"],  popular:true  },
  { id:"FB215", name:"Metrodome",     sku:"XPS-FB215", colors:["Purple","Gold","White"]               },
  { id:"FB219", name:"Spangle",       sku:"XPS-FB219", colors:["Red","White","Blue"],    popular:true  },
  { id:"FB220", name:"Daredevil",     sku:"XPS-FB220", colors:["Red","Black","White"]                 },
  { id:"FB228", name:"Washington",    sku:"XPS-FB228", colors:["Burgundy","Gold","White"],popular:true },
  { id:"FB240", name:"Steel City",    sku:"XPS-FB240", colors:["Black","Gold","Silver"], popular:true  },
  { id:"FB253", name:"Gold Rush",     sku:"XPS-FB253", colors:["Gold","Red","Black"],    popular:true  },
  { id:"FB315", name:"White Water",   sku:"XPS-FB315", colors:["White","Grey","Silver"], popular:true  },
  { id:"FB202", name:"Soldier",       sku:"XPS-FB202", colors:["Navy","Silver","White"]               },
  { id:"FB203", name:"Sun Life",      sku:"XPS-FB203", colors:["Teal","Orange","White"]               },
  { id:"FB204", name:"Paul Brown",    sku:"XPS-FB204", colors:["Brown","White","Black"]               },
  { id:"FB206", name:"Cam",           sku:"XPS-FB206", colors:["Black","Blue","Silver"]               },
  { id:"FB207", name:"LP Field",      sku:"XPS-FB207", colors:["Navy","Gold","White"]                 },
  { id:"FB210", name:"Ram",           sku:"XPS-FB210", colors:["Gold","Blue","White"]                 },
  { id:"FB211", name:"Superdome",     sku:"XPS-FB211", colors:["Black","Gold","White"]                },
  { id:"FB212", name:"Doak",          sku:"XPS-FB212", colors:["Garnet","Gold","White"]               },
  { id:"FB213", name:"Ford",          sku:"XPS-FB213", colors:["Blue","Silver","White"]               },
  { id:"FB214", name:"Madden",        sku:"XPS-FB214", colors:["Silver","Black","White"]              },
  { id:"FB216", name:"Coliseum",      sku:"XPS-FB216", colors:["Silver","Black","White"]              },
  { id:"FB218", name:"Lucas",         sku:"XPS-FB218", colors:["Blue","White","Silver"]               },
];

const METALLIC_BLENDS = [
  { id:"MET-001", name:"Galaxy Black",   sku:"", colors:["Black","Silver","Blue"], popular:true },
  { id:"MET-002", name:"Mocha Marble",   sku:"", colors:["Brown","Gold","Cream"],  popular:true },
  { id:"MET-003", name:"Silver Storm",   sku:"", colors:["Silver","White","Grey"]              },
  { id:"MET-004", name:"Ocean Blue",     sku:"", colors:["Blue","Teal","Silver"]               },
  { id:"MET-005", name:"Champagne Gold", sku:"", colors:["Gold","Cream","Bronze"]              },
  { id:"MET-006", name:"Lava Red",       sku:"", colors:["Red","Orange","Black"]               },
];

const POLISHED_BLENDS = [
  { id:"POL-001", name:"Cream Salt & Pepper", sku:"", colors:["Cream","Grey","White"], popular:true },
  { id:"POL-002", name:"Charcoal Grind",      sku:"", colors:["Dark","Grey","Black"],  popular:true },
  { id:"POL-003", name:"High Gloss Mirror",   sku:"", colors:["Grey","White","Silver"]             },
  { id:"POL-004", name:"Cream Satin",         sku:"", colors:["Cream","Beige","Warm"]              },
  { id:"POL-005", name:"Dyed Jet Black",      sku:"", colors:["Black","Dark"]                      },
  { id:"POL-006", name:"Ashwood Grey",        sku:"", colors:["Grey","Warm","Neutral"]             },
];

const STAINED_BLENDS = [
  { id:"STN-001", name:"Tuscan Walnut", sku:"", colors:["Brown","Warm","Gold"], popular:true },
  { id:"STN-002", name:"Slate Blue",   sku:"", colors:["Blue","Grey","Cool"]               },
  { id:"STN-003", name:"Terra Cotta",  sku:"", colors:["Orange","Red","Warm"]              },
  { id:"STN-004", name:"Espresso",     sku:"", colors:["Dark","Brown","Black"], popular:true},
  { id:"STN-005", name:"Sage Green",   sku:"", colors:["Green","Grey","Natural"]           },
  { id:"STN-006", name:"Midnight Steel",sku:"",colors:["Dark","Blue","Steel"]              },
];

const BLEND_MAP: Record<FinishCategory, typeof FLAKE_BLENDS> = {
  "epoxy-flake":       FLAKE_BLENDS,
  "metallic-epoxy":    METALLIC_BLENDS,
  "polished-concrete": POLISHED_BLENDS,
  "stained-concrete":  STAINED_BLENDS,
};

const ROOMS = [
  { id:"garage",   label:"Garage",       thumb:"https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/envs/garage.jpg" },
  { id:"warehouse",label:"Commercial",   thumb:"https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/envs/warehouse.jpg" },
  { id:"airport",  label:"Lobby",        thumb:"https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/envs/airport.jpg" },
  { id:"pool",     label:"Pool Deck",    thumb:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_pooldeck-01_thumb.webp" },
  { id:"res-gar",  label:"Home Garage",  thumb:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/residential-garage-07_thumb.webp" },
  { id:"living",   label:"Living Room",  thumb:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/re_livingroom_thumb.webp" },
  { id:"hallway",  label:"Hallway",      thumb:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/rw_hallway_thumb.webp" },
  { id:"porch",    label:"Porch",        thumb:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_porch-hr-01_thumb.webp" },
];

const STEPS = ["Finish Type","Room & Photo","Choose Blend","Get My Bid"];

const CDN = "https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends";

export default function FloorVisionPro() {
  const [step, setStep]           = useState(0);
  const [category, setCategory]   = useState<FinishCategory>("epoxy-flake");
  const [selectedRoom, setRoom]   = useState(ROOMS[0]);
  const [myPhoto, setMyPhoto]     = useState<string|null>(null);
  const [dreamPhoto, setDreamPhoto] = useState<string|null>(null);
  const [blend, setBlend]         = useState<typeof FLAKE_BLENDS[0]|null>(null);
  const [chipSize, setChipSize]   = useState<"116"|"18"|"40">("18");
  const [search, setSearch]       = useState("");
  const [form, setForm]           = useState({ name:"",phone:"",email:"",address:"",sqft:"",notes:"" });
  const [done, setDone]           = useState(false);
  const myRef   = useRef<HTMLInputElement>(null);
  const dreamRef = useRef<HTMLInputElement>(null);

  const blends = BLEND_MAP[category];
  const filtered = blends.filter(b =>
    !search || b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.colors.some(c => c.toLowerCase().includes(search.toLowerCase()))
  );

  function readFile(e: React.ChangeEvent<HTMLInputElement>, setter: (v:string)=>void) {
    const f = e.target.files?.[0]; if(!f) return;
    const r = new FileReader();
    r.onload = () => setter(r.result as string);
    r.readAsDataURL(f);
  }

  const s: React.CSSProperties & Record<string,unknown> = {};
  void s;

  const canNext = [true, true, !!blend, !!(form.name&&form.phone&&form.email)];

  if (done) return (
    <div style={{minHeight:"100vh",background:"#0D0D0D",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"system-ui,sans-serif",padding:24}}>
      <div style={{maxWidth:520,textAlign:"center"}}>
        <div style={{fontSize:64,marginBottom:16}}>🎉</div>
        <h2 style={{fontSize:32,fontWeight:900,marginBottom:12}}>You&apos;re in, {form.name.split(" ")[0]}!</h2>
        <p style={{color:"rgba(255,255,255,0.6)",fontSize:16,lineHeight:1.7,marginBottom:28}}>
          Your floor visualization + digital bid will hit <strong style={{color:"#F5C518"}}>{form.email}</strong> and WhatsApp <strong style={{color:"#F5C518"}}>{form.phone}</strong> within 24 hours.
        </p>
        {blend && (
          <div style={{background:"rgba(245,197,24,0.08)",border:"1px solid rgba(245,197,24,0.2)",borderRadius:12,padding:"18px 24px",marginBottom:24,textAlign:"left"}}>
            <div style={{fontSize:11,color:"#F5C518",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Your Selection</div>
            <div style={{fontWeight:800,fontSize:18}}>{blend.name}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:4}}>{category.replace("-"," ")} · {selectedRoom.label} · {chipSize==="116"?'1/16"':chipSize==="18"?'1/8"':'1/4"'}</div>
          </div>
        )}
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="tel:8779585264" style={{background:"#F5C518",color:"#000",padding:"14px 24px",borderRadius:8,fontWeight:800,fontSize:14,textDecoration:"none"}}>📞 Call Us Now</a>
          <button onClick={()=>{setDone(false);setStep(0);setBlend(null);}} style={{background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",padding:"14px 24px",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer"}}>Visualize Another Floor</button>
        </div>
        <div style={{marginTop:32,fontSize:11,color:"rgba(255,255,255,0.25)"}}>Powered by Xtreme Polishing Systems — America&apos;s #1 Epoxy Superstore</div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#0D0D0D",color:"#fff",fontFamily:"system-ui,sans-serif"}}>
      {/* HEADER */}
      <header style={{background:"rgba(13,13,13,0.96)",borderBottom:"1px solid rgba(255,255,255,0.08)",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,backdropFilter:"blur(12px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,background:"#F5C518",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#000",fontSize:14}}>FV</div>
          <div>
            <div style={{fontWeight:800,fontSize:15,letterSpacing:"-0.02em"}}>FloorVision Pro</div>
            <div style={{fontSize:10,color:"#F5C518",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase"}}>by Xtreme Polishing Systems</div>
          </div>
        </div>
        <a href="tel:8779585264" style={{background:"#F5C518",color:"#000",padding:"8px 16px",borderRadius:6,fontWeight:700,fontSize:13,textDecoration:"none"}}>📞 (877) 958-5264</a>
      </header>

      <div style={{maxWidth:1000,margin:"0 auto",padding:"32px 16px"}}>
        {/* PROGRESS */}
        <div style={{display:"flex",gap:4,marginBottom:36}}>
          {STEPS.map((st,i)=>(
            <div key={st} style={{flex:1,textAlign:"center",cursor:i<step?"pointer":"default"}} onClick={()=>i<step&&setStep(i)}>
              <div style={{height:3,background:i<=step?"#F5C518":"rgba(255,255,255,0.1)",borderRadius:2,marginBottom:6,transition:"background 0.3s"}}/>
              <div style={{fontSize:10,fontWeight:600,color:i===step?"#F5C518":i<step?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.25)",textTransform:"uppercase",letterSpacing:"0.08em"}}>{st}</div>
            </div>
          ))}
        </div>

        {/* STEP 0: Finish Type */}
        {step===0 && (
          <div>
            <h2 style={{fontSize:28,fontWeight:900,marginBottom:6}}>What type of floor finish?</h2>
            <p style={{color:"rgba(255,255,255,0.45)",marginBottom:28,fontSize:15}}>Not sure? Start with Epoxy Flake — our most popular.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
              {CATEGORIES.map(cat=>{
                const sel = category===cat.id;
                return (
                  <button key={cat.id} onPointerDown={()=>setCategory(cat.id)}
                    style={{background:sel?"rgba(245,197,24,0.12)":"rgba(255,255,255,0.04)",border:`2px solid ${sel?"#F5C518":"rgba(255,255,255,0.07)"}`,borderRadius:12,padding:"20px 16px",cursor:"pointer",color:"#fff",textAlign:"left",transition:"all 0.15s"}}>
                    <div style={{fontSize:30,marginBottom:10}}>{cat.icon}</div>
                    <div style={{fontWeight:700,fontSize:15,marginBottom:5}}>{cat.label}</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",lineHeight:1.5}}>{cat.desc}</div>
                    {sel && <div style={{marginTop:10,fontSize:11,color:"#F5C518",fontWeight:700}}>✓ Selected</div>}
                  </button>
                );
              })}
            </div>
            <div style={{marginTop:28,display:"flex",justifyContent:"flex-end"}}>
              <button onPointerDown={()=>setStep(1)} style={{background:"#F5C518",color:"#000",border:"none",padding:"14px 32px",borderRadius:8,fontWeight:800,fontSize:15,cursor:"pointer"}}>Next: Choose Room →</button>
            </div>
          </div>
        )}

        {/* STEP 1: Room & Photo */}
        {step===1 && (
          <div>
            <h2 style={{fontSize:28,fontWeight:900,marginBottom:6}}>Pick a room — or upload your own</h2>
            <p style={{color:"rgba(255,255,255,0.45)",marginBottom:24,fontSize:15}}>Upload your actual space for a personalized preview. You can also attach a &quot;dream floor&quot; image for inspiration.</p>
            <div style={{display:"flex",gap:10,marginBottom:24,flexWrap:"wrap"}}>
              <input ref={myRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>readFile(e,setMyPhoto)}/>
              <input ref={dreamRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>readFile(e,setDreamPhoto)}/>
              <button onPointerDown={()=>myRef.current?.click()} style={{background:myPhoto?"rgba(245,197,24,0.12)":"rgba(255,255,255,0.05)",border:`1px solid ${myPhoto?"#F5C518":"rgba(255,255,255,0.12)"}`,color:"#fff",padding:"11px 18px",borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:13}}>
                {myPhoto?"✅ My Photo Ready":"📷 Upload My Room Photo"}
              </button>
              <button onPointerDown={()=>dreamRef.current?.click()} style={{background:dreamPhoto?"rgba(245,197,24,0.12)":"rgba(255,255,255,0.05)",border:`1px solid ${dreamPhoto?"#F5C518":"rgba(255,255,255,0.12)"}`,color:"#fff",padding:"11px 18px",borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:13}}>
                {dreamPhoto?"✅ Dream Floor Attached":"💡 Attach Dream Floor Inspiration"}
              </button>
            </div>
            {(myPhoto||dreamPhoto) && (
              <div style={{display:"flex",gap:12,marginBottom:24,flexWrap:"wrap"}}>
                {myPhoto && <div style={{position:"relative"}}><img src={myPhoto} alt="My room" style={{width:160,height:100,objectFit:"cover",borderRadius:8,border:"2px solid #F5C518"}}/><div style={{position:"absolute",top:4,left:4,background:"#F5C518",color:"#000",fontSize:9,fontWeight:800,padding:"2px 5px",borderRadius:3}}>MY ROOM</div></div>}
                {dreamPhoto && <div style={{position:"relative"}}><img src={dreamPhoto} alt="Dream" style={{width:160,height:100,objectFit:"cover",borderRadius:8,border:"2px solid #0056A6"}}/><div style={{position:"absolute",top:4,left:4,background:"#0056A6",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 5px",borderRadius:3}}>DREAM FLOOR</div></div>}
              </div>
            )}
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:12}}>— or choose a preset environment —</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:8,marginBottom:24}}>
              {ROOMS.map(room=>(
                <button key={room.id} onPointerDown={()=>setRoom(room)}
                  style={{background:"transparent",border:`2px solid ${selectedRoom.id===room.id?"#F5C518":"rgba(255,255,255,0.07)"}`,borderRadius:8,padding:0,cursor:"pointer",overflow:"hidden"}}>
                  <img src={room.thumb} alt={room.label} style={{width:"100%",height:75,objectFit:"cover",display:"block"}} onError={e=>{(e.target as HTMLImageElement).style.background="#222";}}/>
                  <div style={{padding:"5px 8px",background:selectedRoom.id===room.id?"rgba(245,197,24,0.12)":"rgba(0,0,0,0.5)",textAlign:"center"}}>
                    <div style={{fontSize:11,fontWeight:600,color:selectedRoom.id===room.id?"#F5C518":"#fff"}}>{room.label}</div>
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

        {/* STEP 2: Choose Blend */}
        {step===2 && (
          <div>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:20}}>
              <div>
                <h2 style={{fontSize:28,fontWeight:900,marginBottom:4}}>{CATEGORIES.find(c=>c.id===category)?.label}</h2>
                <p style={{color:"rgba(255,255,255,0.4)",fontSize:14}}>{filtered.length} options</p>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."
                  style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:7,padding:"9px 13px",color:"#fff",fontSize:13,width:160}}/>
                {category==="epoxy-flake" && ["116","18","40"].map(sz=>(
                  <button key={sz} onPointerDown={()=>setChipSize(sz as "116"|"18"|"40")}
                    style={{background:chipSize===sz?"#F5C518":"rgba(255,255,255,0.05)",color:chipSize===sz?"#000":"#fff",border:"1px solid rgba(255,255,255,0.1)",padding:"7px 11px",borderRadius:6,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                    {sz==="116"?'1/16"':sz==="18"?'1/8"':'1/4"'}
                  </button>
                ))}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8,maxHeight:380,overflowY:"auto",paddingRight:2}}>
              {filtered.map(b=>{
                const thumb = category==="epoxy-flake" && b.sku
                  ? `${CDN}/${b.sku}-${chipSize}.jpg`
                  : "https://xtremepolishingsystems.com/cdn/shop/articles/polished-concrete-floor_1200x.jpg";
                const sel = blend?.id===b.id;
                return (
                  <button key={b.id} onPointerDown={()=>setBlend(b)}
                    style={{background:sel?"rgba(245,197,24,0.1)":"rgba(255,255,255,0.03)",border:`2px solid ${sel?"#F5C518":"rgba(255,255,255,0.06)"}`,borderRadius:9,padding:0,cursor:"pointer",overflow:"hidden",textAlign:"left",position:"relative",transition:"border-color 0.15s"}}>
                    {b.popular && <div style={{position:"absolute",top:5,right:5,background:"#F5C518",color:"#000",fontSize:8,fontWeight:800,padding:"2px 4px",borderRadius:2,zIndex:1}}>★</div>}
                    <img src={thumb} alt={b.name} style={{width:"100%",height:90,objectFit:"cover",display:"block"}}
                      onError={e=>{(e.target as HTMLImageElement).src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='90'%3E%3Crect width='150' height='90' fill='%23222'/%3E%3C/svg%3E";}}/>
                    <div style={{padding:"7px 9px"}}>
                      <div style={{fontWeight:700,fontSize:12,color:sel?"#F5C518":"#fff"}}>{b.name}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",marginTop:2}}>{b.colors.slice(0,2).join(" · ")}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            {blend && (
              <div style={{marginTop:14,background:"rgba(245,197,24,0.07)",border:"1px solid rgba(245,197,24,0.2)",borderRadius:9,padding:"13px 17px"}}>
                <div style={{fontWeight:800,fontSize:15}}>{blend.name} <span style={{color:"#F5C518",fontSize:12}}>✓ Selected</span></div>
                {blend.sku && <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:3,fontFamily:"monospace"}}>SKU: {blend.sku}-{chipSize}</div>}
              </div>
            )}
            <div style={{display:"flex",gap:10,justifyContent:"space-between",marginTop:18}}>
              <button onPointerDown={()=>setStep(1)} style={{background:"transparent",color:"rgba(255,255,255,0.4)",border:"1px solid rgba(255,255,255,0.1)",padding:"12px 20px",borderRadius:8,cursor:"pointer"}}>← Back</button>
              <button onPointerDown={()=>blend&&setStep(3)} disabled={!blend}
                style={{background:blend?"#F5C518":"rgba(255,255,255,0.08)",color:blend?"#000":"rgba(255,255,255,0.25)",border:"none",padding:"14px 28px",borderRadius:8,fontWeight:800,fontSize:15,cursor:blend?"pointer":"not-allowed"}}>
                Next: Get My Bid →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contact / Bid */}
        {step===3 && (
          <div style={{maxWidth:520}}>
            <h2 style={{fontSize:28,fontWeight:900,marginBottom:6}}>Your free digital bid awaits</h2>
            <p style={{color:"rgba(255,255,255,0.45)",marginBottom:20,fontSize:15}}>24-hour turnaround guaranteed. Your bid includes AI floor visualization, pricing breakdown, digital contract, and crew assignment.</p>
            {blend && (
              <div style={{background:"rgba(245,197,24,0.07)",border:"1px solid rgba(245,197,24,0.18)",borderRadius:9,padding:"13px 17px",marginBottom:20,display:"flex",gap:12,alignItems:"center"}}>
                {category==="epoxy-flake" && blend.sku && <img src={`${CDN}/${blend.sku}-18.jpg`} alt="" style={{width:52,height:52,borderRadius:6,objectFit:"cover"}} onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>}
                <div><div style={{fontWeight:800,fontSize:15}}>{blend.name}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:2}}>{CATEGORIES.find(c=>c.id===category)?.label} · {selectedRoom.label}</div></div>
              </div>
            )}
            <div style={{display:"grid",gap:10}}>
              {([["name","Full Name *","John Smith","text"],["phone","Phone / WhatsApp *","(555) 123-4567","tel"],["email","Email Address *","john@example.com","email"],["address","Property Address","123 Main St, Phoenix AZ","text"],["sqft","Approximate Sq Footage","e.g. 600","number"]] as const).map(([field,label,placeholder,type])=>(
                <div key={field}>
                  <label style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:4,display:"block"}}>{label}</label>
                  <input type={type} value={(form as Record<string,string>)[field]} onChange={e=>setForm({...form,[field]:e.target.value})} placeholder={placeholder}
                    style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:7,padding:"11px 13px",color:"#fff",fontSize:14,outline:"none"}}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:4,display:"block"}}>Additional Notes</label>
                <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Current floor condition, questions, or special requests..."
                  style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:7,padding:"11px 13px",color:"#fff",fontSize:14,height:80,resize:"none",outline:"none"}}/>
              </div>
            </div>
            <div style={{background:"rgba(0,86,166,0.12)",border:"1px solid rgba(0,86,166,0.25)",borderRadius:7,padding:"11px 15px",marginTop:14,fontSize:12,color:"rgba(255,255,255,0.6)"}}>
              🔒 A secure customer account is created automatically. You&apos;ll get WhatsApp + email notifications with your bid, floor visualization, and crew details.
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"space-between",marginTop:18}}>
              <button onPointerDown={()=>setStep(2)} style={{background:"transparent",color:"rgba(255,255,255,0.4)",border:"1px solid rgba(255,255,255,0.1)",padding:"12px 20px",borderRadius:8,cursor:"pointer"}}>← Back</button>
              <button onPointerDown={()=>{if(form.name&&form.phone&&form.email)setDone(true);}} disabled={!(form.name&&form.phone&&form.email)}
                style={{background:form.name&&form.phone&&form.email?"#F5C518":"rgba(255,255,255,0.08)",color:form.name&&form.phone&&form.email?"#000":"rgba(255,255,255,0.25)",border:"none",padding:"14px 28px",borderRadius:8,fontWeight:800,fontSize:15,cursor:form.name&&form.phone&&form.email?"pointer":"not-allowed"}}>
                🚀 Submit — Get My Free Bid
              </button>
            </div>
          </div>
        )}
      </div>

      <footer style={{textAlign:"center",padding:"28px 24px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:48,fontSize:11,color:"rgba(255,255,255,0.2)"}}>
        Powered by <strong style={{color:"rgba(255,255,255,0.5)"}}>Xtreme Polishing Systems</strong> — America&apos;s #1 Epoxy Superstore · (877) 958-5264
      </footer>
    </div>
  );
}
