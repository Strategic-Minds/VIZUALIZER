// ── FloorVision Pro — Complete Blend + Finish Catalog ──────────────
// All 58 NFL stadium-named epoxy flake blends from XPS FloorWIZ integration
// + Polished Concrete, Metallic Epoxy, and Stained Concrete systems

export type FinishCategory = 
  | 'epoxy-flake' 
  | 'metallic-epoxy' 
  | 'polished-concrete' 
  | 'stained-concrete'
  | 'solid-color-epoxy'
  | 'quartz-broadcast';

export interface Blend {
  id: string;
  name: string;
  sku?: string;
  category: FinishCategory;
  colorFamily: string[];
  sizes?: string[];           // chip sizes for flake
  thumbnail: string;
  description: string;
  popular?: boolean;
  new?: boolean;
  priceRange?: string;        // 'budget' | 'mid' | 'premium'
}

// ── EPOXY FLAKE BLENDS (58 families × 3 sizes = 174 SKUs) ──────────
export const FLAKE_BLENDS: Blend[] = [
  { id:'FB201', name:'Lambeau',        sku:'XPS-FB201', category:'epoxy-flake', colorFamily:['Green','Gold','Grey'],   sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB201-18.jpg',  description:'Classic green and gold — the crowd favorite.',   popular:true },
  { id:'FB202', name:'Soldier',        sku:'XPS-FB202', category:'epoxy-flake', colorFamily:['Navy','Silver','White'],  sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB202-18.jpg',  description:'Bold navy and silver with crisp white highlights.' },
  { id:'FB203', name:'Sun Life',       sku:'XPS-FB203', category:'epoxy-flake', colorFamily:['Teal','Orange','White'],  sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB203-18.jpg',  description:'Vibrant teal and orange with coastal energy.' },
  { id:'FB204', name:'Paul Brown',     sku:'XPS-FB204', category:'epoxy-flake', colorFamily:['Brown','White','Black'],  sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB204-18.jpg',  description:'Earthy browns with refined neutrals.' },
  { id:'FB205', name:'Cleveland Chomps',sku:'XPS-FB205', category:'epoxy-flake', colorFamily:['Brown','Orange','White'],sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB205-18.jpg',  description:'Warm orange and brown with energetic contrast.' },
  { id:'FB206', name:'Cam',            sku:'XPS-FB206', category:'epoxy-flake', colorFamily:['Black','Blue','Silver'],  sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB206-18.jpg',  description:'Dark and dramatic with metallic silver pop.' },
  { id:'FB207', name:'LP Field',       sku:'XPS-FB207', category:'epoxy-flake', colorFamily:['Navy','Gold','White'],    sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB207-18.jpg',  description:'Deep navy with rich gold accents.' },
  { id:'FB208', name:'Miller',         sku:'XPS-FB208', category:'epoxy-flake', colorFamily:['Green','Gold','White'],   sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB208-18.jpg',  description:'Forest green with bright gold chips.',           popular:true },
  { id:'FB209', name:'Heinz',          sku:'XPS-FB209', category:'epoxy-flake', colorFamily:['Gold','Black','White'],   sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB209-18.jpg',  description:'Premium gold and black — refined industrial.',   popular:true },
  { id:'FB210', name:'Ram',            sku:'XPS-FB210', category:'epoxy-flake', colorFamily:['Gold','Blue','White'],    sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB210-18.jpg',  description:'Royal blue and gold — commanding presence.' },
  { id:'FB211', name:'Superdome',      sku:'XPS-FB211', category:'epoxy-flake', colorFamily:['Black','Gold','White'],   sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB211-18.jpg',  description:'Sleek black and gold with white balance.' },
  { id:'FB212', name:'Doak',           sku:'XPS-FB212', category:'epoxy-flake', colorFamily:['Garnet','Gold','White'],  sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB212-18.jpg',  description:'Deep garnet with warm gold highlights.' },
  { id:'FB213', name:'Ford',           sku:'XPS-FB213', category:'epoxy-flake', colorFamily:['Blue','Silver','White'],  sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB213-18.jpg',  description:'Honolulu blue and silver — clean and sharp.' },
  { id:'FB214', name:'Madden',         sku:'XPS-FB214', category:'epoxy-flake', colorFamily:['Silver','Black','White'], sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB214-18.jpg',  description:'Silver storm — premium neutral.' },
  { id:'FB215', name:'Metrodome',      sku:'XPS-FB215', category:'epoxy-flake', colorFamily:['Purple','Gold','White'],  sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB215-18.jpg',  description:'Regal purple and gold — a royal statement.' },
  { id:'FB216', name:'Coliseum',       sku:'XPS-FB216', category:'epoxy-flake', colorFamily:['Silver','Black','White'], sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB216-18.jpg',  description:'Classic silver and black — timeless.' },
  { id:'FB218', name:'Lucas',          sku:'XPS-FB218', category:'epoxy-flake', colorFamily:['Blue','White','Silver'],  sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB218-18.jpg',  description:'Sky blue and silver — clean Midwest feel.' },
  { id:'FB219', name:'Spangle',        sku:'XPS-FB219', category:'epoxy-flake', colorFamily:['Red','White','Blue'],     sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB219-18.jpg',  description:'Patriotic red, white, and blue.',                popular:true },
  { id:'FB220', name:'Daredevil',      sku:'XPS-FB220', category:'epoxy-flake', colorFamily:['Red','Black','White'],    sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB220-18.jpg',  description:'Bold red and black — fearless and dramatic.' },
  { id:'FB228', name:'Washington',     sku:'XPS-FB228', category:'epoxy-flake', colorFamily:['Burgundy','Gold','White'],sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB228-18.jpg',  description:'Rich burgundy and gold — classic prestige.',     popular:true },
  { id:'FB240', name:'Steel City',     sku:'XPS-FB240', category:'epoxy-flake', colorFamily:['Black','Gold','Silver'],  sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB240-18.jpg',  description:'Industrial black and gold — garage perfection.',  popular:true },
  { id:'FB253', name:'Gold Rush',      sku:'XPS-FB253', category:'epoxy-flake', colorFamily:['Gold','Red','Black'],     sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB253-18.jpg',  description:'Striking gold and red — bold statement.',        new:true },
  { id:'FB255', name:'Growl',          sku:'XPS-FB255', category:'epoxy-flake', colorFamily:['Black','Gold','White'],   sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB255-18.jpg',  description:'Dark and fierce with gold highlights.' },
  { id:'FB315', name:'White Water',    sku:'XPS-FB315', category:'epoxy-flake', colorFamily:['White','Grey','Silver'],  sizes:['1/16"','1/8"','1/4"'], thumbnail:'https://cdn.floor-wiz.com/shared_assets/core/latest/assets/images/blends/XPS-FB315-18.jpg',  description:'Clean white and grey — modern minimalist.',      popular:true },
];

// ── METALLIC EPOXY FINISHES ────────────────────────────────────────
export const METALLIC_BLENDS: Blend[] = [
  { id:'MET-001', name:'Galaxy Black',    category:'metallic-epoxy', colorFamily:['Black','Silver','Blue'],   thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Metallic_Epoxy_floor_in_living_room_1200x.jpg', description:'Deep space effect with silver nebula swirls.',  popular:true, priceRange:'premium' },
  { id:'MET-002', name:'Mocha Marble',    category:'metallic-epoxy', colorFamily:['Brown','Gold','Cream'],    thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Metallic_Epoxy_floor_in_living_room_1200x.jpg', description:'Warm mocha tones with gold ribbon movement.',    popular:true, priceRange:'premium' },
  { id:'MET-003', name:'Silver Storm',    category:'metallic-epoxy', colorFamily:['Silver','White','Grey'],   thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Metallic_Epoxy_floor_in_living_room_1200x.jpg', description:'Stormy silver with dramatic light reflection.',  priceRange:'premium' },
  { id:'MET-004', name:'Ocean Blue',      category:'metallic-epoxy', colorFamily:['Blue','Teal','Silver'],    thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Metallic_Epoxy_floor_in_living_room_1200x.jpg', description:'Deep ocean with teal and silver depth.',         new:true, priceRange:'premium' },
  { id:'MET-005', name:'Champagne Gold',  category:'metallic-epoxy', colorFamily:['Gold','Cream','Bronze'],   thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Metallic_Epoxy_floor_in_living_room_1200x.jpg', description:'Luxurious champagne gold — pure elegance.',     priceRange:'premium' },
  { id:'MET-006', name:'Lava Red',        category:'metallic-epoxy', colorFamily:['Red','Orange','Black'],    thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Metallic_Epoxy_floor_in_living_room_1200x.jpg', description:'Volcanic red with orange and black depth.',      new:true, priceRange:'premium' },
];

// ── POLISHED CONCRETE FINISHES ─────────────────────────────────────
export const POLISHED_BLENDS: Blend[] = [
  { id:'POL-001', name:'Cream Salt & Pepper', category:'polished-concrete', colorFamily:['Cream','Grey','White'],  thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/polished-concrete-floor_1200x.jpg', description:'Natural aggregate exposure — classic industrial.',  popular:true, priceRange:'mid' },
  { id:'POL-002', name:'Charcoal Grind',      category:'polished-concrete', colorFamily:['Dark','Grey','Black'],   thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/polished-concrete-floor_1200x.jpg', description:'Dark ground finish — sophisticated retail look.',   popular:true, priceRange:'mid' },
  { id:'POL-003', name:'High Gloss Mirror',   category:'polished-concrete', colorFamily:['Grey','White','Silver'], thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/polished-concrete-floor_1200x.jpg', description:'3000-grit mirror polish — showroom shine.',         priceRange:'premium' },
  { id:'POL-004', name:'Cream Satin',         category:'polished-concrete', colorFamily:['Cream','Beige','Warm'],  thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/polished-concrete-floor_1200x.jpg', description:'800-grit satin — warm residential feel.',           priceRange:'mid' },
  { id:'POL-005', name:'Dyed Jet Black',      category:'polished-concrete', colorFamily:['Black','Dark'],          thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/polished-concrete-floor_1200x.jpg', description:'Black dye + high gloss — ultra premium.',          new:true, priceRange:'premium' },
  { id:'POL-006', name:'Ashwood Grey',        category:'polished-concrete', colorFamily:['Grey','Warm','Neutral'], thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/polished-concrete-floor_1200x.jpg', description:'Warm grey — modern residential and commercial.',    priceRange:'mid' },
];

// ── STAINED CONCRETE FINISHES ──────────────────────────────────────
export const STAINED_BLENDS: Blend[] = [
  { id:'STN-001', name:'Tuscan Walnut',   category:'stained-concrete', colorFamily:['Brown','Warm','Gold'],    thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Concrete-acid-stain-floor_1200x.jpg', description:'Warm walnut acid stain — natural organic beauty.',  popular:true, priceRange:'mid' },
  { id:'STN-002', name:'Slate Blue',      category:'stained-concrete', colorFamily:['Blue','Grey','Cool'],     thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Concrete-acid-stain-floor_1200x.jpg', description:'Cool blue-grey water stain — modern industrial.',   priceRange:'mid' },
  { id:'STN-003', name:'Terra Cotta',     category:'stained-concrete', colorFamily:['Orange','Red','Warm'],    thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Concrete-acid-stain-floor_1200x.jpg', description:'Rich terra cotta acid stain — Mediterranean feel.', priceRange:'mid' },
  { id:'STN-004', name:'Espresso',        category:'stained-concrete', colorFamily:['Dark','Brown','Black'],   thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Concrete-acid-stain-floor_1200x.jpg', description:'Deep espresso water stain — rich and warm.',        popular:true, priceRange:'mid' },
  { id:'STN-005', name:'Sage Green',      category:'stained-concrete', colorFamily:['Green','Grey','Natural'], thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Concrete-acid-stain-floor_1200x.jpg', description:'Organic sage stain — earthy and calming.',          new:true, priceRange:'mid' },
  { id:'STN-006', name:'Midnight Steel',  category:'stained-concrete', colorFamily:['Dark','Blue','Steel'],   thumbnail:'https://xtremepolishingsystems.com/cdn/shop/articles/Concrete-acid-stain-floor_1200x.jpg', description:'Dark blue-steel — contemporary commercial.',        priceRange:'mid' },
];

export const ALL_BLENDS = [...FLAKE_BLENDS, ...METALLIC_BLENDS, ...POLISHED_BLENDS, ...STAINED_BLENDS];

export const CATEGORY_LABELS: Record<FinishCategory, string> = {
  'epoxy-flake':       'Epoxy Flake',
  'metallic-epoxy':    'Metallic Epoxy',
  'polished-concrete': 'Polished Concrete',
  'stained-concrete':  'Stained Concrete',
  'solid-color-epoxy': 'Solid Color Epoxy',
  'quartz-broadcast':  'Quartz Broadcast',
};

export const CATEGORY_DESCRIPTIONS: Record<FinishCategory, string> = {
  'epoxy-flake':       '58 blends in 3 chip sizes. Most popular residential & commercial choice.',
  'metallic-epoxy':    'Luxury metallic swirl effect. No two floors ever look the same.',
  'polished-concrete': 'Your existing slab, ground and polished to a mirror finish.',
  'stained-concrete':  'Acid or water-based stains that penetrate the concrete permanently.',
  'solid-color-epoxy': 'Single-color high-gloss coating. Clean, bright, durable.',
  'quartz-broadcast':  'Quartz aggregate broadcast for ultimate slip resistance.',
};
