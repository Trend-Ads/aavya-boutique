-- ==============================================================================
-- AAVYA BOUTIQUE - PRODUCTS & AUTO-SAVE DRAFTS MIGRATION
-- Execute this script in your Supabase Project Dashboard -> SQL Editor.
-- ==============================================================================

-- 1. Create PRODUCTS table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  descriptor TEXT DEFAULT '',
  tagline TEXT DEFAULT '',
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  category TEXT NOT NULL,
  colors TEXT[] DEFAULT ARRAY[]::TEXT[],
  sizes TEXT[] DEFAULT ARRAY[]::TEXT[],
  badge TEXT,
  is_bestseller BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  stock_count INTEGER DEFAULT 1,
  sku TEXT,
  description TEXT DEFAULT '',
  highlights JSONB DEFAULT '[]'::jsonb,
  details JSONB DEFAULT '{}'::jsonb,
  shipping JSONB DEFAULT '{}'::jsonb,
  reviews JSONB DEFAULT '{}'::jsonb,
  is_listed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create PRODUCT_DRAFTS table (Stores the latest admin auto-saved draft)
CREATE TABLE IF NOT EXISTS public.product_drafts (
  id TEXT PRIMARY KEY DEFAULT 'admin_current_draft',
  draft_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Indexes for High Performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_listed ON public.products(is_listed);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_drafts ENABLE ROW LEVEL SECURITY;

-- 5. Public Storefront Read Policy for Listed Products
CREATE POLICY "Public storefront can read listed products"
  ON public.products
  FOR SELECT
  USING (true);

-- 6. Authenticated Admin Full Access Policy for Products
CREATE POLICY "Admin full access to products"
  ON public.products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. Authenticated Admin Full Access Policy for Drafts
CREATE POLICY "Admin full access to product drafts"
  ON public.product_drafts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 8. Seed Initial Static Products (Upsert to avoid duplicates)
INSERT INTO public.products (
  slug, name, descriptor, tagline, price, original_price, image, images, category,
  colors, sizes, badge, is_bestseller, in_stock, stock_count, sku, description,
  highlights, details, shipping, reviews, is_listed
)
VALUES
(
  'satin-draped-midi-dress',
  'Satin Draped Midi Dress',
  'Flowing satin with wrap silhouette',
  'Luminous fluid satin sculpted with a graceful asymmetric drape for unforgettable evenings.',
  2490,
  3290,
  '/images/product-1.jpg',
  ARRAY['/images/product-1.jpg', '/images/cat-dresses.jpg', '/images/featured-large.jpg', '/images/product-6.jpg'],
  'Dresses',
  ARRAY['Dusty Rose', 'Ivory', 'Charcoal'],
  ARRAY['XS', 'S', 'M', 'L', 'XL'],
  'New',
  true,
  true,
  6,
  'AAV-DRS-001',
  'Crafted from ultra-luxe mulberry-blend fluid satin, this draped midi dress redefines contemporary evening wear. Featuring a softened cowl neckline, gentle gathered waist pleats that flatter every silhouette, and a cascading asymmetric hem that moves fluidly with every step. Perfect for intimate cocktail gatherings, festive soirées, or romantic dinners in Fort Kochi.',
  '["Ultra-soft fluid satin with subtle pearl sheen", "Asymmetric gathered wrap drape designed to flatter all body types", "Concealed side zip with delicate self-fabric covered buttons", "Fully lined with breathable viscose for all-day comfort", "Handcrafted at the Aavya Atelier, Panampilly Nagar, Kochi"]'::jsonb,
  '{"fabric": "92% Viscose Satin, 8% Elastane blend", "fit": "Relaxed tailored fit with gentle waist cinching; true to size", "care": "Dry clean only or delicate cold hand wash with mild silk detergent", "origin": "Crafted in Kochi, Kerala, India"}'::jsonb,
  '{"dispatch": "Orders placed before 2:00 PM are dispatched the next business day from our Panampilly Nagar studio.", "transit": "South India: 2-3 business days. Rest of India: 3-5 business days via Blue Dart / Delhivery express.", "exchanges": "We offer a 7-day complimentary door-pickup exchange window for size adjustments."}'::jsonb,
  '{"rating": 4.9, "count": 28, "items": []}'::jsonb,
  true
),
(
  'linen-coord-set',
  'Linen Co-ord Set',
  'Relaxed blazer & wide-leg trousers',
  'Breathable European flax tailored for effortless daytime elegance and warm tropical afternoons.',
  3290,
  4190,
  '/images/product-2.jpg',
  ARRAY['/images/product-2.jpg', '/images/cat-coords.jpg', '/images/product-7.jpg', '/images/featured-small.jpg'],
  'Co-ords',
  ARRAY['Sage Green', 'Sand', 'Cream'],
  ARRAY['XS', 'S', 'M', 'L', 'XL'],
  'New',
  true,
  true,
  8,
  'AAV-CRD-002',
  'A testament to relaxed tailoring, our signature Linen Co-ord Set combines an unlined slouchy single-breasted blazer with high-waisted, wide-leg trousers. Pre-washed for a buttery soft handfeel, it effortlessly navigates boardroom meetings to coastal weekend brunches.',
  '["100% pure organic pre-washed flax linen", "Tailored notch lapel with horn-effect sustainable buttons", "High-rise relaxed trousers with partially elasticated back waistband", "Deep functional side pockets on both blazer and trousers", "Includes spare button and custom garment hanger"]'::jsonb,
  '{"fabric": "100% Certified European Flax Linen", "fit": "Relaxed tailored fit. Take your normal size for an editorial oversized look", "care": "Machine wash cold on gentle cycle or hand wash; line dry in shade", "origin": "Ethically woven & crafted in Kochi, Kerala"}'::jsonb,
  '{"dispatch": "Orders placed before 2:00 PM are dispatched the next business day from our Panampilly Nagar studio.", "transit": "South India: 2-3 business days. Rest of India: 3-5 business days via Blue Dart / Delhivery express.", "exchanges": "We offer a 7-day complimentary door-pickup exchange window for size adjustments."}'::jsonb,
  '{"rating": 4.8, "count": 19, "items": []}'::jsonb,
  true
),
(
  'block-print-kurta',
  'Hand-Blocked Chanderi Kurta',
  'Artisanal Chanderi silk with subtle zari',
  'Timeless Kerala craftsmanship adorned with intricate hand-carved floral block printing.',
  1890,
  2490,
  '/images/product-3.jpg',
  ARRAY['/images/product-3.jpg', '/images/cat-kurtis.jpg', '/images/featured-large.jpg', '/images/product-1.jpg'],
  'Kurtis',
  ARRAY['Indigo', 'Terracotta', 'Ivory'],
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  'Bestseller',
  true,
  true,
  12,
  'AAV-KRT-003',
  'Graceful straight-cut silhouette woven from sheer Chanderi silk cotton, detailed with hand-printed botanical motifs using all-natural dyes. Delicate antique zari borders line the sleeve cuffs and hemline, lending an understated sheen to your festive wardrobe.',
  '["Authentic hand block-printed by heritage artisans", "Lightweight sheer Chanderi with built-in cotton lining", "Mandarin keyhole collar with mother-of-pearl button detailing", "Side slits designed for graceful fluid movement"]'::jsonb,
  '{"fabric": "Chanderi Silk Cotton with 100% Malmal Cotton lining", "fit": "Straight classic fit; true to Indian boutique sizing", "care": "Dry clean recommended for initial washes; cold hand wash separately afterwards", "origin": "Artisanal handcrafting in Kochi Atelier"}'::jsonb,
  '{"dispatch": "Orders placed before 2:00 PM are dispatched the next business day from our Panampilly Nagar studio.", "transit": "South India: 2-3 business days. Rest of India: 3-5 business days via Blue Dart / Delhivery express.", "exchanges": "We offer a 7-day complimentary door-pickup exchange window for size adjustments."}'::jsonb,
  '{"rating": 4.9, "count": 34, "items": []}'::jsonb,
  true
),
(
  'organza-saree-edit',
  'Tissue Organza Festive Saree',
  'Gossamer organza with hand-embroidered scallops',
  'Ethereal translucent tissue organza that drapes like spun gold under festive lanterns.',
  4190,
  5290,
  '/images/product-4.jpg',
  ARRAY['/images/product-4.jpg', '/images/cat-ethnic.jpg', '/images/featured-small.jpg', '/images/product-2.jpg'],
  'Ethnic',
  ARRAY['Blush Pink', 'Champagne Gold', 'Mint'],
  ARRAY['Free Size'],
  'Bestseller',
  true,
  true,
  4,
  'AAV-ETH-004',
  'An ode to royal festivities, this gossamer tissue organza saree features delicately hand-embroidered resham and cut-dana scalloped borders. Unfolds with a structured yet featherweight drape that stays crisp all through wedding receptions.',
  '["Pure featherweight tissue organza with metallic sheen", "Hand-embroidered scallop borders with glass bead cut-dana", "Includes unstitched running blouse piece (80 cm)", "Lightweight and easy to carry for long festive ceremonies"]'::jsonb,
  '{"fabric": "Pure Tissue Organza with metallic warp", "fit": "Traditional 5.5m saree drape + 0.8m blouse fabric", "care": "Strictly dry clean only; store folded in muslin cloth", "origin": "Hand-embroidered in Kochi, Kerala"}'::jsonb,
  '{"dispatch": "Orders placed before 2:00 PM are dispatched the next business day from our Panampilly Nagar studio.", "transit": "South India: 2-3 business days. Rest of India: 3-5 business days via Blue Dart / Delhivery express.", "exchanges": "We offer a 7-day complimentary door-pickup exchange window for size adjustments."}'::jsonb,
  '{"rating": 5.0, "count": 42, "items": []}'::jsonb,
  true
),
(
  'tiered-chiffon-maxi',
  'Tiered Chiffon Maxi Dress',
  'Breezy georgette with micro-pleated tiers',
  'Romantic flowing tiers of botanical-printed georgette cut for sunset walks and destination weddings.',
  2790,
  3590,
  '/images/product-5.jpg',
  ARRAY['/images/product-5.jpg', '/images/cat-dresses.jpg', '/images/product-6.jpg', '/images/product-1.jpg'],
  'Dresses',
  ARRAY['Olive Green', 'Dusty Rose', 'Cream'],
  ARRAY['XS', 'S', 'M', 'L'],
  'New',
  false,
  true,
  7,
  'AAV-DRS-005',
  'A silhouette inspired by gentle coastal breezes. Features a smocked elasticated bodice that conforms comfortably to your form, paired with a sweeping 3-tier maxi skirt that floats effortlessly.',
  '["Lightweight crinkle georgette chiffon with custom floral artwork", "Smocked elasticated sweetheart bodice for a flexible snug fit", "Adjustable delicate tie-up shoulder straps", "Tiered flounce hem with fine micro-edging"]'::jsonb,
  '{"fabric": "100% Poly Georgette with soft crepe lining", "fit": "Fitted smocked bodice through waist; flowing skirt", "care": "Gentle machine wash inside a laundry bag; do not tumble dry", "origin": "Designed & finished in Kochi"}'::jsonb,
  '{"dispatch": "Orders placed before 2:00 PM are dispatched the next business day from our Panampilly Nagar studio.", "transit": "South India: 2-3 business days. Rest of India: 3-5 business days via Blue Dart / Delhivery express.", "exchanges": "We offer a 7-day complimentary door-pickup exchange window for size adjustments."}'::jsonb,
  '{"rating": 4.7, "count": 16, "items": []}'::jsonb,
  true
),
(
  'embroidered-silk-kurti',
  'Raw Silk Embroidered Short Kurti',
  'Structured raw silk with subtle tone-on-tone embroidery',
  'Modern architectural cut crafted in lustrous raw silk for contemporary ethnic styling.',
  2190,
  2790,
  '/images/product-6.jpg',
  ARRAY['/images/product-6.jpg', '/images/cat-kurtis.jpg', '/images/product-7.jpg', '/images/featured-large.jpg'],
  'Kurtis',
  ARRAY['Charcoal', 'Ivory', 'Terracotta'],
  ARRAY['S', 'M', 'L', 'XL'],
  'Sale',
  false,
  true,
  5,
  'AAV-KRT-006',
  'Minimalist luxury at its finest. Structured raw silk tailored with sharp side slits, a clean mandarin collar, and tone-on-tone thread embroidery along the placket. Pairs seamlessly with tailored cigarette trousers or palazzo bottoms.',
  '["Rich structured raw silk with natural slub texture", "Fine needlepoint tonal embroidery down the hidden placket", "Concealed front zip closure with top hook", "Fully lined in cotton voile for breathability"]'::jsonb,
  '{"fabric": "Raw Silk blend with 100% Cotton voile lining", "fit": "Structured tailored fit with clean silhouette", "care": "Dry clean only to maintain raw silk slub luster", "origin": "Crafted in Panampilly Nagar studio, Kochi"}'::jsonb,
  '{"dispatch": "Orders placed before 2:00 PM are dispatched the next business day from our Panampilly Nagar studio.", "transit": "South India: 2-3 business days. Rest of India: 3-5 business days via Blue Dart / Delhivery express.", "exchanges": "We offer a 7-day complimentary door-pickup exchange window for size adjustments."}'::jsonb,
  '{"rating": 4.9, "count": 14, "items": []}'::jsonb,
  true
),
(
  'festive-raw-silk-set',
  'Festive Raw Silk Anarkali Set',
  'Kalidar flared anarkali with organza dupatta',
  'Regal flare featuring rich jewel tones and delicate antique gota patti highlights.',
  4890,
  5990,
  '/images/product-7.jpg',
  ARRAY['/images/product-7.jpg', '/images/cat-ethnic.jpg', '/images/featured-small.jpg', '/images/product-4.jpg'],
  'Party Wear',
  ARRAY['Emerald', 'Navy', 'Maroon'],
  ARRAY['S', 'M', 'L', 'XL'],
  'Bestseller',
  true,
  true,
  3,
  'AAV-PRT-007',
  'A masterpiece 16-kali raw silk Anarkali set that commands regal attention at weddings and festive galas. Accompanied by fitted churidar pants and a contrast scalloped organza dupatta adorned with hand-stitched gota patti.',
  '["16-kali flared floor-length kalidar cut", "Traditional Rajasthani hand-stitched gota patti work", "Complimentary scalloped organza dupatta included", "Padded bust cups and concealed back zipper"]'::jsonb,
  '{"fabric": "Art Silk Brocade with Shantoon lining; Organza Dupatta", "fit": "Fitted bodice with dramatic 4.5m flare", "care": "Dry clean only; steam iron on reverse silk setting", "origin": "Artisanal handcrafting in Kochi Atelier"}'::jsonb,
  '{"dispatch": "Orders placed before 2:00 PM are dispatched the next business day from our Panampilly Nagar studio.", "transit": "South India: 2-3 business days. Rest of India: 3-5 business days via Blue Dart / Delhivery express.", "exchanges": "We offer a 7-day complimentary door-pickup exchange window for size adjustments."}'::jsonb,
  '{"rating": 5.0, "count": 22, "items": []}'::jsonb,
  true
),
(
  'print-palazzos',
  'Print Palazzos',
  'Relaxed co-ord with bold print',
  'Wide-leg volume with artisanal block motifs for fluid, effortless comfort.',
  1690,
  2190,
  '/images/product-3.jpg',
  ARRAY['/images/product-3.jpg', '/images/cat-coords.jpg', '/images/cat-ethnic.jpg', '/images/product-7.jpg'],
  'Co-ords',
  ARRAY['Navy', 'Sage Green'],
  ARRAY['S', 'M', 'L', 'XL'],
  NULL,
  false,
  true,
  9,
  'AAV-PLZ-008',
  'Voluminous palazzo trousers engineered for all-day ease. Cut from soft modal cotton, these pants offer breezy drape, an elasticated waistband with adjustable drawstring, and deep concealed pockets.',
  '["Ultra-soft breathable modal cotton blend", "Wide fluid leg with dramatic flared hem", "Comfortable elasticated waistband with tasseled drawstring", "Generous side slip pockets"]'::jsonb,
  '{"fabric": "60% Cotton, 40% Modal", "fit": "Wide-leg relaxed fit; mid-to-high rise", "care": "Cold machine wash with gentle spin; line dry", "origin": "Crafted in Kochi Atelier"}'::jsonb,
  '{"dispatch": "Orders placed before 2:00 PM are dispatched the next business day from our Panampilly Nagar studio.", "transit": "South India: 2-3 business days. Rest of India: 3-5 business days via Blue Dart / Delhivery express.", "exchanges": "We offer a 7-day complimentary door-pickup exchange window for size adjustments."}'::jsonb,
  '{"rating": 4.8, "count": 11, "items": []}'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  descriptor = EXCLUDED.descriptor,
  tagline = EXCLUDED.tagline,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  image = EXCLUDED.image,
  images = EXCLUDED.images,
  category = EXCLUDED.category,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  badge = EXCLUDED.badge,
  is_bestseller = EXCLUDED.is_bestseller,
  in_stock = EXCLUDED.in_stock,
  stock_count = EXCLUDED.stock_count,
  sku = EXCLUDED.sku,
  description = EXCLUDED.description,
  highlights = EXCLUDED.highlights,
  details = EXCLUDED.details,
  shipping = EXCLUDED.shipping,
  reviews = EXCLUDED.reviews,
  is_listed = EXCLUDED.is_listed,
  updated_at = now();
