"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import type { Blend, FinishCategory } from "../lib/blends";
import { ALL_BLENDS, FLAKE_BLENDS, METALLIC_BLENDS, POLISHED_BLENDS, STAINED_BLENDS, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from "../lib/blends";

// ── Room environments ────────────────────────────────────────────
const ROOMS = [
  { id:"garage",  label:"Garage",     thumb:"https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/envs/garage.jpg" },
  { id:"warehouse",label:"Commercial",thumb:"https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/envs/warehouse.jpg" },
  { id:"airport", label:"Airport/Lobby",thumb:"https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/envs/airport.jpg" },
  { id:"pool",    label:"Pool Deck",  thumb:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_pooldeck-01_thumb.webp" },
  { id:"porch",   label:"Porch",      thumb:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/custom/fw_porch-hr-01_thumb.webp" },
  { id:"res-gar", label:"Home Garage",thumb:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/residential-garage-07_thumb.webp" },
  { id:"living",  label:"Living Room",thumb:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/re_livingroom_thumb.webp" },
  { id:"hallway", label:"Hallway",    thumb:"https://cdn.floor-wiz.com/organisations/xtreme_polishing_systems/visualisers/300/new/rw_hallway_thumb.webp" },
];

const STEPS = ["Finish Type","Room & Photo","Choose Blend","Your Details","Get My Bid"];

export default function FloorVisionPro() {
  const [step, setStep]           = useState(0);
  const [category, setCategory]   = useState<FinishCategory>("epoxy-flake");
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [userPhoto, setUserPhoto] = useState<string|null>(null);
  const [dreamPhoto, setDreamPhoto] = useState<string|null>(null);
  const [selectedBlend, setSelectedBlend] = useState<Blend|null>(null);
  const [chipSize, setChipSize]   = useState('1/8"');
  const [colorFilter, setColorFilter] = useState<string|null>(null);
  const [search, setSearch]       = useState("");
  const [showViz, setShowViz]     = useState(false);
  const [form, setForm]           = useState({ name:"", phone:"", email:"", address:"", sqft:"", notes:"", useFloorWiz: false });
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const dreamRef = useRef<HTMLInputElement>(null);

  // Filter blends by category + search + color
  const categoryBlends = {
    "epoxy-flake": FLAKE_BLENDS,
    "metallic-epoxy": METALLIC_BLENDS,
    "polished-concrete": POLISHED_BLENDS,
    "stained-concrete": STAINED_BLENDS,
    "solid-color-epoxy": FLAKE_BLENDS.filter(b=>b.colorFamily.includes("White")||b.colorFamily.includes("Grey")).slice(0,6),
    "quartz-broadcast": FLAKE_BLENDS.filter(b=>b.colorFamily.includes("Neutral")||b.colorFamily.includes("Grey")).slice(0,6),
  || FLAKE_BLENDS;

  const filteredBlends = categoryBlends.filter(b => {
    const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.colorFamily.some(c=>c.toLowerCase().includes(search.toLowerCase()));
    const matchColor = !colorFilter || b.colorFamily.some(c=>c.toLowerCase().includes(colorFilter.toLowerCase()));
    return matchSearch && matchColor;
  });

  const allColorFamilies = [...new Set(categoryBlends.flatMap(b=>b.colorFamily))].slice(0,10);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>, type: "user"|"dream") {
    const f = e.target.files?.[0]; if(!f) return;
    const r = new FileReader();
    r.onload = () => {
      if(type==="user") { setUserPhoto(r.result as string); }
      else { setDreamPhoto(r.result as string); }
    };
    r.readAsDataURL(f);
  }

  async function handleSubmit() {
    if(!form.name||!form.phone||!form.email) return;
    setSubmitted(true);
  }

  const canAdvance = [
    true,                           // step 0 — always
    selectedRoom !== null,          // step 1 — room selected
    selectedBlend !== null,         // step 2 — blend selected
    !!(form.name&&form.phone&&form.email), // step 3 — form filled
    false,
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0D0D0D",color:"#fff",fontFamily:"system-ui,sans-serif"}}>
      {/* ── TOP BAR ───────────────────────────────────────────── */}
      <header style={{background:"rgba(13,13,13,0.95)",borderBottom:"1px solid rgba(255,255,255,0.08)",padding:"0 24px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,backdropFilter:"blur(12px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,background:"#F5C518",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#000",fontSize:16}}>FV</div>
          <div>
            <div style={{fontWeight:800,fontSize:15,letterSpacing:"-0.02em"}}>FloorVision Pro</div>
            <div style={{fontSize:10,color:"#F5C518",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase"}}>by Xtreme Polishing Systems</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <a href="tel:8779585264" style={{background:"#F5C518",color:"#000",padding:"8px 16px",borderRadius:6,fontWeight:700,fontSize:13,textDecoration:"none"}}>📞 Call Now</a>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────────── */}
      {step===0 && !showViz && (
        <section style={{padding:"80px 24px 60px",maxWidth:900,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#F5C518",marginBottom:16}}>AI-Powered Floor Visualizer</div>
          <h1 style={{fontSize:"clamp(36px,6vw,72px)",fontWeight:900,lineHeight:1.05,letterSpacing:"-0.03em",marginBottom:20}}>
            See Your New Floor<br/><span style={{color:"#F5C518"}}>Before It&apos;s Installed.</span>
          </h1>
          <p style={{fontSize:18,color:"rgba(255,255,255,0.65)",maxWidth:600,margin:"0 auto 40px",lineHeight:1.6}}>
            Upload your room photo or pick from our preset environments. Choose epoxy flake, metallic, polished concrete, or stained concrete. Get an instant visual — then receive your digital bid within 24 hours.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>setShowViz(true)} style={{background:"#F5C518",color:"#000",border:"none",padding:"16px 32px",borderRadius:10,fontWeight:800,fontSize:16,cursor:"pointer"}}>
              ✨ Visualize My Floor
            </button>
            <button onClick={()=>{setShowViz(true);setStep(3);}} style={{background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,0.25)",padding:"16px 32px",borderRadius:10,fontWeight:600,fontSize:16,cursor:"pointer"}}>
              Get Free Bid
            </button>
          </div>
          {/* ── Feature pills */}
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:48}}>
            {["58+ Blend Options","Polished Concrete","Metallic Epoxy","Stained Concrete","Upload Your Photo","24hr Digital Bid","Your Floor. Visualized."].map(f=>(
              <span key={f} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:500}}>{f}</span>
            ))}
          </div>
        </section>
      )}

      {/* ── VISUALIZER WIZARD ─────────────────────────────────── */}
      {(showViz || step > 0) && (
        <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 16px"}}>
          {/* Progress bar */}
          <div style={{display:"flex",gap:4,marginBottom:32}}>
            {STEPS.map((s,i)=>(
              <div key={s} style={{flex:1,textAlign:"center"}}>
                <div style={{height:4,background:i<=step?"#F5C518":"rgba(255,255,255,0.1)",borderRadius:2,marginBottom:8,transition:"background 0.3s"}}/>
                <div style={{fontSize:10,fontWeight:600,color:i===step?"#F5C518":i<step?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:"0.08em"}}>{s}</div>
              </div>
            ))}
          </div>

          {/* ── STEP 0: Finish Type ── */}
          {step===0 && (
            <div>
              <h2 style={{fontSize:28,fontWeight:800,marginBottom:8}}>What type of floor finish?</h2>
              <p style={{color:"rgba(255,255,255,0.5)",marginBottom:28,fontSize:15}}>Choose a category to see your options. Not sure? Start with Epoxy Flake.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
                {(["epoxy-flake","metallic-epoxy","polished-concrete","stained-concrete"] as FinishCategory[]).map(cat=>{
                  const icons: Record<string,string> = {"epoxy-flake":"🎨","metallic-epoxy":"✨","polished-concrete":"💎","stained-concrete":"🌊","solid-color-epoxy":"⬛","quartz-broadcast":"🪨"};
                  const selected = category===cat;
                  return (
                    <button key={cat} onClick={()=>{setCategory(cat);setSelectedBlend(null);}}
                      style={{background:selected?"rgba(245,197,24,0.15)":"rgba(255,255,255,0.04)",border:`2px solid ${selected?"#F5C518":"rgba(255,255,255,0.08)"}`,borderRadius:12,padding:"20px 16px",cursor:"pointer",color:"#fff",textAlign:"left",transition:"all 0.2s"}}>
                      <div style={{fontSize:28,marginBottom:8}}>{icons[cat]}</div>
                      <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{CATEGORY_LABELS[cat]}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.5}}>{CATEGORY_DESCRIPTIONS[cat]}</div>
                      {selected && <div style={{marginTop:10,fontSize:11,color:"#F5C518",fontWeight:700}}>✓ Selected</div>}
                    </button>
                  );
                })}
              </div>
              <div style={{marginTop:24,textAlign:"right"}}>
                <button onClick={()=>{setShowViz(true);setStep(1);}} style={{background:"#F5C518",color:"#000",border:"none",padding:"14px 28px",borderRadius:8,fontWeight:800,fontSize:15,cursor:"pointer"}}>
                  Next: Choose Room →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 1: Room & Photo ── */}
          {step===1 && (
            <div>
              <h2 style={{fontSize:28,fontWeight:800,marginBottom:8}}>Pick a room — or upload your own photo</h2>
              <p style={{color:"rgba(255,255,255,0.5)",marginBottom:24,fontSize:15}}>Select a preset environment or upload an actual photo of your space for a personalized visualization.</p>
              
              {/* Upload buttons */}
              <div style={{display:"flex",gap:12,marginBottom:24,flexWrap:"wrap"}}>
                <button onClick={()=>fileRef.current?.click()} style={{background:userPhoto?"rgba(245,197,24,0.15)":"rgba(255,255,255,0.06)",border:`1px solid ${userPhoto?"#F5C518":"rgba(255,255,255,0.15)"}`,color:"#fff",padding:"12px 20px",borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:14}}>
                  {userPhoto?"✅ Your Photo Uploaded":"📷 Upload My Room Photo"}
                </button>
                <button onClick={()=>dreamRef.current?.click()} style={{background:dreamPhoto?"rgba(245,197,24,0.15)":"rgba(255,255,255,0.06)",border:`1px solid ${dreamPhoto?"#F5C518":"rgba(255,255,255,0.15)"}`,color:"#fff",padding:"12px 20px",borderRadius:8,cursor:"pointer",fontWeight:600,fontSize:14}}>
                  {dreamPhoto?"✅ Dream Floor Attached":"💡 Attach Dream Floor Inspiration"}
                </button>
                <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleFile(e,"user")}/>
                <input ref={dreamRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleFile(e,"dream")}/>
              </div>

              {userPhoto && (
                <div style={{marginBottom:24,position:"relative",display:"inline-block"}}>
                  <img src={userPhoto} alt="Your room" style={{maxWidth:320,maxHeight:200,borderRadius:8,border:"2px solid #F5C518"}}/>
                  <div style={{position:"absolute",top:8,left:8,background:"#F5C518",color:"#000",fontSize:10,fontWeight:700,padding:"2px 6px",borderRadius:4}}>YOUR ROOM</div>
                </div>
              )}

              {/* Preset rooms */}
              <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:12}}>— or choose a preset environment —</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10}}>
                {ROOMS.map(room=>(
                  <button key={room.id} onClick={()=>setSelectedRoom(room)}
                    style={{background:"transparent",border:`2px solid ${selectedRoom.id===room.id?"#F5C518":"rgba(255,255,255,0.08)"}`,borderRadius:8,padding:0,cursor:"pointer",overflow:"hidden",position:"relative"}}>
                    <img src={room.thumb} alt={room.label} style={{width:"100%",height:80,objectFit:"cover",display:"block"}} onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
                    <div style={{padding:"6px 8px",background:selectedRoom.id===room.id?"rgba(245,197,24,0.15)":"rgba(0,0,0,0.6)",textAlign:"center"}}>
                      <div style={{fontSize:11,fontWeight:600,color:selectedRoom.id===room.id?"#F5C518":"#fff"}}>{room.label}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* FloorWIZ live visualizer toggle */}
              <div style={{marginTop:24,background:"rgba(245,197,24,0.08)",border:"1px solid rgba(245,197,24,0.2)",borderRadius:10,padding:"16px 20px"}}>
                <div style={{fontWeight:700,marginBottom:4}}>🔮 Want the full live 3D visualizer?</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginBottom:12}}>Our AI will apply your selected blend directly onto your room photo in real time.</div>
                <button onClick={()=>setForm({...form,useFloorWiz:!form.useFloorWiz})} style={{background:form.useFloorWiz?"#F5C518":"transparent",color:form.useFloorWiz?"#000":"#fff",border:"1px solid rgba(245,197,24,0.5)",padding:"8px 16px",borderRadius:6,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                  {form.useFloorWiz?"✓ Live Visualizer ON":"Activate Live Visualizer"}
                </button>
              </div>

              <div style={{display:"flex",gap:12,marginTop:24,justifyContent:"space-between"}}>
                <button onClick={()=>setStep(0)} style={{background:"transparent",color:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.1)",padding:"12px 20px",borderRadius:8,cursor:"pointer"}}>← Back</button>
                <button onClick={()=>setStep(2)} style={{background:"#F5C518",color:"#000",border:"none",padding:"14px 28px",borderRadius:8,fontWeight:800,fontSize:15,cursor:"pointer"}}>
                  Next: Choose Blend →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Choose Blend ── */}
          {step===2 && (
            <div>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:20}}>
                <div>
                  <h2 style={{fontSize:28,fontWeight:800,marginBottom:4}}>{CATEGORY_LABELS[category]}</h2>
                  <p style={{color:"rgba(255,255,255,0.5)",fontSize:14}}>{filteredBlends.length} options available</p>
                </div>
                {/* Search + filter */}
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search blends..."
                    style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"10px 14px",color:"#fff",fontSize:14,width:180}}/>
                  {category==="epoxy-flake" && (
                    <div style={{display:"flex",gap:4}}>
                      {['1/16"','1/8"','1/4"'].map(sz=>(
                        <button key={sz} onClick={()=>setChipSize(sz)}
                          style={{background:chipSize===sz?"#F5C518":"rgba(255,255,255,0.06)",color:chipSize===sz?"#000":"#fff",border:"1px solid rgba(255,255,255,0.12)",padding:"8px 12px",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                          {sz}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Color filters */}
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
                <button onClick={()=>setColorFilter(null)} style={{background:!colorFilter?"rgba(245,197,24,0.2)":"rgba(255,255,255,0.04)",border:`1px solid ${!colorFilter?"#F5C518":"rgba(255,255,255,0.1)"}`,color:!colorFilter?"#F5C518":"rgba(255,255,255,0.6)",padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer"}}>All</button>
                {allColorFamilies.map(cf=>(
                  <button key={cf} onClick={()=>setColorFilter(colorFilter===cf?null:cf)}
                    style={{background:colorFilter===cf?"rgba(245,197,24,0.2)":"rgba(255,255,255,0.04)",border:`1px solid ${colorFilter===cf?"#F5C518":"rgba(255,255,255,0.1)"}`,color:colorFilter===cf?"#F5C518":"rgba(255,255,255,0.6)",padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer"}}>{cf}</button>
                ))}
              </div>

              {/* Blend grid */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10,maxHeight:420,overflowY:"auto",paddingRight:4}}>
                {filteredBlends.map(blend=>{
                  const skuSuffix = {"1/16\"":"116","1/8\"":"18","1/4\"":"40"}[chipSize]||"18";
                  const thumbUrl = blend.category==="epoxy-flake"
                    ? `https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/${blend.sku}-${skuSuffix}.jpg`
                    : blend.thumbnail;
                  const sel = selectedBlend?.id===blend.id;
                  return (
                    <button key={blend.id} onClick={()=>setSelectedBlend(blend)}
                      style={{background:sel?"rgba(245,197,24,0.1)":"rgba(255,255,255,0.03)",border:`2px solid ${sel?"#F5C518":"rgba(255,255,255,0.06)"}`,borderRadius:10,padding:0,cursor:"pointer",overflow:"hidden",textAlign:"left",position:"relative",transition:"all 0.2s"}}>
                      {blend.popular && <div style={{position:"absolute",top:6,right:6,background:"#F5C518",color:"#000",fontSize:9,fontWeight:800,padding:"2px 5px",borderRadius:3,zIndex:1}}>POPULAR</div>}
                      {blend.new && <div style={{position:"absolute",top:6,left:6,background:"#0056A6",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 5px",borderRadius:3,zIndex:1}}>NEW</div>}
                      <img src={thumbUrl} alt={blend.name} style={{width:"100%",height:100,objectFit:"cover",display:"block"}}
                        onError={e=>{(e.target as HTMLImageElement).src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='100'%3E%3Crect width='160' height='100' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.35em' fill='%23666' font-size='11'%3ENo preview%3C/text%3E%3C/svg%3E";}}/>
                      <div style={{padding:"8px 10px"}}>
                        <div style={{fontWeight:700,fontSize:13,color:sel?"#F5C518":"#fff"}}>{blend.name}</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginTop:2}}>{blend.colorFamily.slice(0,2).join(" · ")}</div>
                        {sel && <div style={{fontSize:10,color:"#F5C518",fontWeight:700,marginTop:4}}>✓ Selected</div>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedBlend && (
                <div style={{marginTop:16,background:"rgba(245,197,24,0.08)",border:"1px solid rgba(245,197,24,0.25)",borderRadius:10,padding:"16px 20px",display:"flex",alignItems:"center",gap:16}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:16}}>{selectedBlend.name}</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginTop:2}}>{selectedBlend.description}</div>
                    {selectedBlend.sku && <div style={{fontSize:11,color:"#F5C518",marginTop:4,fontFamily:"monospace"}}>SKU: {selectedBlend.sku}-{{"1/16\"":"116","1/8\"":"18","1/4\"":"40"}[chipSize]||"18"}</div>}
                  </div>
                </div>
              )}

              <div style={{display:"flex",gap:12,marginTop:20,justifyContent:"space-between"}}>
                <button onClick={()=>setStep(1)} style={{background:"transparent",color:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.1)",padding:"12px 20px",borderRadius:8,cursor:"pointer"}}>← Back</button>
                <button onClick={()=>setStep(3)} disabled={!selectedBlend}
                  style={{background:selectedBlend?"#F5C518":"rgba(255,255,255,0.1)",color:selectedBlend?"#000":"rgba(255,255,255,0.3)",border:"none",padding:"14px 28px",borderRadius:8,fontWeight:800,fontSize:15,cursor:selectedBlend?"pointer":"not-allowed"}}>
                  Next: Get My Bid →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Contact Info ── */}
          {step===3 && !submitted && (
            <div style={{maxWidth:560}}>
              <h2 style={{fontSize:28,fontWeight:800,marginBottom:4}}>Your free digital bid awaits</h2>
              <p style={{color:"rgba(255,255,255,0.5)",marginBottom:24,fontSize:15}}>We promise a 24-hour turnaround. Create your account to view your bid — it contains pricing, your floor visualization, and digital contract options.</p>

              {/* Summary */}
              {selectedBlend && (
                <div style={{background:"rgba(245,197,24,0.08)",border:"1px solid rgba(245,197,24,0.2)",borderRadius:10,padding:"14px 18px",marginBottom:24,display:"flex",gap:12,alignItems:"center"}}>
                  {selectedBlend.category==="epoxy-flake" && (
                    <img src={`https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/${selectedBlend.sku}-18.jpg`} alt="" style={{width:56,height:56,borderRadius:6,objectFit:"cover"}} onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
                  )}
                  <div>
                    <div style={{fontSize:11,color:"#F5C518",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em"}}>{CATEGORY_LABELS[selectedBlend.category]}</div>
                    <div style={{fontWeight:800,fontSize:16}}>{selectedBlend.name}</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>{selectedRoom.label} · {chipSize}</div>
                  </div>
                </div>
              )}

              <div style={{display:"grid",gap:12}}>
                {[
                  {field:"name",label:"Full Name *",placeholder:"John Smith",type:"text"},
                  {field:"phone",label:"Phone / WhatsApp *",placeholder:"(555) 123-4567",type:"tel"},
                  {field:"email",label:"Email Address *",placeholder:"john@example.com",type:"email"},
                  {field:"address",label:"Property Address",placeholder:"123 Main St, Phoenix AZ",type:"text"},
                  {field:"sqft",label:"Approximate Square Footage",placeholder:"e.g. 600",type:"number"},
                ].map(({field,label,placeholder,type})=>(
                  <div key={field}>
                    <label style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.6)",marginBottom:4,display:"block"}}>{label}</label>
                    <input type={type} value={(form as any)[field]} onChange={e=>setForm({...form,[field]:e.target.value})} placeholder={placeholder}
                      style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"12px 14px",color:"#fff",fontSize:14}}/>
                  </div>
                ))}
                <div>
                  <label style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.6)",marginBottom:4,display:"block"}}>Additional Notes</label>
                  <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Any special requests, current floor condition, or questions..."
                    style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,padding:"12px 14px",color:"#fff",fontSize:14,height:80,resize:"none"}}/>
                </div>
              </div>

              <div style={{background:"rgba(0,86,166,0.15)",border:"1px solid rgba(0,86,166,0.3)",borderRadius:8,padding:"12px 16px",marginTop:16,fontSize:13,color:"rgba(255,255,255,0.7)"}}>
                🔒 <strong>Secure account required to view your bid.</strong> Your bid includes pricing, floor visualization, digital signature, and your assigned crew leader. You&apos;ll receive a WhatsApp + email notification when it&apos;s ready.
              </div>

              <div style={{display:"flex",gap:12,marginTop:20,justifyContent:"space-between"}}>
                <button onClick={()=>setStep(2)} style={{background:"transparent",color:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.1)",padding:"12px 20px",borderRadius:8,cursor:"pointer"}}>← Back</button>
                <button onClick={handleSubmit} disabled={!(form.name&&form.phone&&form.email)}
                  style={{background:form.name&&form.phone&&form.email?"#F5C518":"rgba(255,255,255,0.1)",color:form.name&&form.phone&&form.email?"#000":"rgba(255,255,255,0.3)",border:"none",padding:"14px 28px",borderRadius:8,fontWeight:800,fontSize:15,cursor:form.name&&form.phone&&form.email?"pointer":"not-allowed"}}>
                  🚀 Submit & Create My Account
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Success ── */}
          {submitted && (
            <div style={{maxWidth:560,textAlign:"center",padding:"40px 0"}}>
              <div style={{fontSize:64,marginBottom:16}}>🎉</div>
              <h2 style={{fontSize:32,fontWeight:900,marginBottom:8}}>You&apos;re all set, {form.name.split(" ")[0]}!</h2>
              <p style={{color:"rgba(255,255,255,0.6)",fontSize:16,lineHeight:1.6,marginBottom:28}}>
                Your digital bid request has been submitted. We&apos;ll send your personalized floor visualization and pricing to <strong style={{color:"#F5C518"}}>{form.email}</strong> and via WhatsApp to <strong style={{color:"#F5C518"}}>{form.phone}</strong> within 24 hours.
              </p>
              <div style={{background:"rgba(245,197,24,0.08)",border:"1px solid rgba(245,197,24,0.2)",borderRadius:12,padding:"20px 24px",marginBottom:24,textAlign:"left"}}>
                <div style={{fontWeight:700,marginBottom:12}}>📋 Your Order Summary</div>
                <div style={{display:"grid",gap:6,fontSize:13,color:"rgba(255,255,255,0.7)"}}>
                  <div>Finish: <strong style={{color:"#fff"}}>{CATEGORY_LABELS[selectedBlend?.category||"epoxy-flake"]}</strong></div>
                  {selectedBlend && <div>Blend: <strong style={{color:"#fff"}}>{selectedBlend.name}</strong></div>}
                  <div>Room: <strong style={{color:"#fff"}}>{selectedRoom.label}</strong></div>
                  {form.sqft && <div>Sq Footage: <strong style={{color:"#fff"}}>{form.sqft} sq ft</strong></div>}
                </div>
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                <a href="tel:8779585264" style={{background:"#F5C518",color:"#000",padding:"14px 24px",borderRadius:8,fontWeight:800,fontSize:14,textDecoration:"none"}}>📞 Call Us Now</a>
                <button onClick={()=>{setStep(0);setSubmitted(false);setSelectedBlend(null);}} style={{background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",padding:"14px 24px",borderRadius:8,fontWeight:600,fontSize:14,cursor:"pointer"}}>Visualize Another Floor</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{textAlign:"center",padding:"32px 24px",borderTop:"1px solid rgba(255,255,255,0.06)",marginTop:60,fontSize:12,color:"rgba(255,255,255,0.3)"}}>
        Powered by <strong style={{color:"rgba(255,255,255,0.6)"}}>Xtreme Polishing Systems</strong> — America&apos;s #1 Epoxy Superstore<br/>
        <span style={{marginTop:4,display:"block"}}>(877) 958-5264 · xtremepolishingsystems.com</span>
      </footer>
    </div>
  );
}
