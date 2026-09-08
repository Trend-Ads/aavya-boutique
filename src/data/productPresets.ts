export interface FabricPreset {
  label: string;
  composition: string;
  recommendedCare: string;
  recommendedFit?: string;
  tag?: string;
}

export const FABRIC_COMPOSITION_SUGGESTIONS: FabricPreset[] = [
  {
    label: "Chanderi Silk with Zari",
    composition: "100% Pure Handloom Chanderi Silk with fine metallic zari weave",
    recommendedCare: "Dry clean only to preserve artisanal zari luster and delicate weave",
    recommendedFit: "Flared A-line drape with subtle natural sheen",
    tag: "Festive Silk",
  },
  {
    label: "Mulberry Silk Satin",
    composition: "92% Mulberry Silk, 8% Elastane high-luster fluid satin",
    recommendedCare: "Dry clean recommended; or gentle cold hand wash with mild silk detergent",
    recommendedFit: "Body-skimming bias cut with liquid fluid drape",
    tag: "Luxe Satin",
  },
  {
    label: "Organic Handloom Linen",
    composition: "100% Certified Organic Breathable Handloom Linen (Pre-washed)",
    recommendedCare: "Gentle machine wash cold or cold hand wash. Warm steam iron while damp",
    recommendedFit: "Relaxed tailored cut offering crisp, breathable structure",
    tag: "Pure Linen",
  },
  {
    label: "Fine Mulmul Cotton",
    composition: "100% Pure Hand-Spun Mulmul Cotton with artisanal natural dyes",
    recommendedCare: "Gentle cold hand wash separately. Dry in shade. Warm iron on reverse",
    recommendedFit: "Featherlight airy fit designed for tropical and summer comfort",
    tag: "Breathable Cotton",
  },
  {
    label: "Modal Silk Blend",
    composition: "60% Pure Modal, 40% Tussar Silk with soft satin finish",
    recommendedCare: "Dry clean recommended for first 2 washes; delicate cold cycle thereafter",
    recommendedFit: "Flattering relaxed silhouette with supple drape and wrinkle resistance",
    tag: "Silk Blend",
  },
  {
    label: "Georgette with Shantoon",
    composition: "High-twist Poly Georgette with 100% Shantoon breathable soft lining",
    recommendedCare: "Gentle hand wash in cold water or mild cycle. Steam iron on low heat",
    recommendedFit: "Flowing flared silhouette with graceful multi-tiered movement",
    tag: "Flowing Georgette",
  },
  {
    label: "Plush Micro Velvet",
    composition: "100% Plush Micro Velvet with soft breathable cotton voile lining",
    recommendedCare: "Dry clean only. Do not iron directly; steam gently on reverse side",
    recommendedFit: "Regal structured silhouette tailored for winter festive soirees",
    tag: "Velvet Couture",
  },
  {
    label: "Organza Tissue Silk",
    composition: "Pure Sheer Organza Silk with subtle gold tissue metallic sheen",
    recommendedCare: "Dry clean exclusively to preserve sheer crispness and gold tissue",
    recommendedFit: "Voluminous ethereal drape designed for statement festive occasions",
    tag: "Tissue Silk",
  },
  {
    label: "Ajrakh Hand-Block Cotton",
    composition: "100% Natural Dyed Hand-Block Ajrakh Cotton on fine 60s cambric",
    recommendedCare: "Hand wash separately in cold water with mild liquid detergent. Dry in shade",
    recommendedFit: "Comfortable straight cut tailored for effortless everyday luxury",
    tag: "Artisanal Block",
  },
  {
    label: "Bamboo Cotton Slub",
    composition: "70% Bamboo Fiber, 30% Long-Staple Combed Cotton with tactile slub weave",
    recommendedCare: "Machine wash cold delicate with like colors; tumble dry low or line dry",
    recommendedFit: "Casual relaxed silhouette with textured artisanal slub drape",
    tag: "Eco Fiber",
  },
  {
    label: "Banarasi Brocade Silk",
    composition: "Handwoven Pure Banarasi Katan Silk with kadhwa zari motifs",
    recommendedCare: "Dry clean only. Store wrapped in pure muslin cloth",
    recommendedFit: "Sculpted royal silhouette engineered for heirloom festive wear",
    tag: "Heritage Silk",
  },
];

export const FIT_SUGGESTIONS: { label: string; text: string }[] = [
  {
    label: "Relaxed Tailored",
    text: "Relaxed tailored fit with gentle waist contouring; true to standard sizing",
  },
  {
    label: "Flared A-Line",
    text: "Flared A-line silhouette engineered for fluid all-day movement and graceful volume",
  },
  {
    label: "Slim-Fit Contour",
    text: "Tailored slim-fit silhouette; size up for a relaxed, easy drape",
  },
  {
    label: "Straight-Cut with Slits",
    text: "Straight-cut calf-length silhouette with side slits for effortless styling and mobility",
  },
  {
    label: "Comfort Dropped-Shoulder",
    text: "Comfort-fit loose cut with dropped shoulders and airy, unrestrictive ease",
  },
  {
    label: "Empire Waist Drape",
    text: "Empire waist cut with fluid gathered pleats below the bust offering a flattering elongating effect",
  },
];

export const CARE_SUGGESTIONS: { label: string; text: string }[] = [
  {
    label: "Dry Clean Only (Zari/Silk)",
    text: "Dry clean only to maintain artisanal sheen, delicate zari threadwork, and pure textile integrity",
  },
  {
    label: "Gentle Hand Wash (Cold)",
    text: "Gentle hand wash in cold water with mild liquid detergent; dry in shade to preserve natural dyes",
  },
  {
    label: "Machine Wash Delicate",
    text: "Machine wash delicate on cold cycle; warm iron on reverse side; do not bleach or wring",
  },
  {
    label: "Dry Clean First Wash",
    text: "Dry clean recommended for the first wash; subsequent gentle cold hand washes separately",
  },
  {
    label: "Steam Iron Only",
    text: "Do not wring or press directly with hot iron; low heat steam iron recommended",
  },
];

export interface CategoryContentPreset {
  categoryKey: string;
  categoryLabel: string;
  icon: string;
  shortDescSuggestions: string[];
  storyTemplates: {
    title: string;
    text: string;
  }[];
  highlightSuggestions: string[];
}

export const CATEGORY_CONTENT_PRESETS: Record<string, CategoryContentPreset> = {
  dresses: {
    categoryKey: "dresses",
    categoryLabel: "Dresses",
    icon: "👗",
    shortDescSuggestions: [
      "A fluid silhouette crafted from ultra-luxe breathable fabric, perfect for sunlit soirees and dinner dates.",
      "Contemporary romance meets tailored ease in this timeless artisanal occasion dress.",
      "Effortlessly flattering dress with asymmetric wrap drape and concealed functional pockets.",
    ],
    storyTemplates: [
      {
        title: "Fluid Romance & Contemporary Drape",
        text: "Crafted from ultra-luxe fluid fabric with a delicate luster, this dress redefines contemporary occasion wear. Thoughtfully tailored with gentle waist cinching and an asymmetric gathered drape, it moves effortlessly with every step. Whether styled with minimal gold jewelry for sunlit garden afternoons or dressed up with heels for candlelit evenings, it promises understated luxury and timeless elegance.",
      },
      {
        title: "Effortless Panampilly Studio Atelier",
        text: "Designed at our Panampilly Nagar studio, this silhouette celebrates clean structural lines softened by fluid artisanal textures. Featuring a comfortable inner lining, concealed side pockets, and precision-finished seams, it offers the perfect balance between high-fashion couture and effortless wearable comfort.",
      },
      {
        title: "Modern Minimalist Silhouette",
        text: "Sculpted with subtle architectural gathers and a breezy hemline, this dress is an ode to understated modern aesthetics. The breathable natural weave feels delightfully weightless against the skin, making it an essential centerpiece for discerning festive wardrobes.",
      },
    ],
    highlightSuggestions: [
      "Fluid silhouette tailored for graceful movement and effortless drape",
      "Asymmetric gathered wrap detailing designed to flatter all heights",
      "Concealed side zipper with reinforced hook-and-eye closure",
      "Two functional deep concealed side seam pockets",
      "Fully lined with ultra-soft breathable cotton voile for all-day skin comfort",
      "Subtle tiered ruffle hemline with hand-rolled boutique edging",
      "Versatile styling: effortlessly transitions from day brunch to evening dinner",
      "Tailored at our Panampilly Nagar atelier, Kochi",
    ],
  },

  kurtis: {
    categoryKey: "kurtis",
    categoryLabel: "Kurtis",
    icon: "🥻",
    shortDescSuggestions: [
      "Handcrafted artisanal kurti combining traditional motifs with clean contemporary lines.",
      "Everyday luxury tailored in breathable handloom textiles with delicate hand-embroidered accents.",
      "Versatile calf-length kurti with mandarin collar and functional smartphone pocket.",
    ],
    storyTemplates: [
      {
        title: "Handcrafted Heritage & Modern Ease",
        text: "A contemporary homage to Indian textile heritage, this handcrafted kurti showcases authentic artisanal motifs accented with delicate zari threadwork along the neckline and cuffs. Cut from breathable hand-spun natural fibers, it delivers a graceful calf-length silhouette engineered for effortless all-day wear from desk to festive gatherings.",
      },
      {
        title: "Artisanal Hand-Block Masterpiece",
        text: "Each piece is artisanally stamped by master craftsmen using heritage wooden blocks and skin-friendly natural dyes. Designed with a tailored mandarin collar, side movement slits, and understated contrast piping, this kurti marries generational Indian craftsmanship with modern minimalist sophistication.",
      },
      {
        title: "Refined Everyday Luxury",
        text: "Tailored for the contemporary woman who appreciates slow fashion, this kurti pairs crisp clean lines with artisanal hand-embroidered accents. The breathable, lightweight weave keeps you feeling composed and elegant from morning boardroom meetings to intimate evening family dinners.",
      },
    ],
    highlightSuggestions: [
      "Handcrafted artisanal block print created using traditional wooden blocks",
      "Tailored mandarin collar with delicate hand-finished mother-of-pearl buttons",
      "Reinforced side slits engineered for unrestricted ease of movement",
      "Intricate needlework embroidery highlighting the neckline and cuffs",
      "Functional concealed side pocket sized for everyday essentials",
      "Calf-length straight silhouette tailored to flatter Indian body proportions",
      "Pre-washed breathable natural weave for guaranteed zero shrinkage",
      "Handcrafted in Kerala, India at our boutique studio",
    ],
  },

  "kurta-sets": {
    categoryKey: "kurta-sets",
    categoryLabel: "Kurta Sets",
    icon: "✨",
    shortDescSuggestions: [
      "Opulent three-piece coordinated ensemble featuring a regal kurta, tapered trousers, and sheer dupatta.",
      "Curated for celebratory festivities, with hand-embroidered yoke detailing and metallic accents.",
      "A festive showstopper crafted with rich hand-embroidered accents and comfortable palazzos.",
    ],
    storyTemplates: [
      {
        title: "Regal Celebratory Three-Piece Ensemble",
        text: "An opulent celebration of festive elegance, this coordinated three-piece ensemble features a regal silhouette kurta, tailored straight-cut trousers, and a diaphanous sheer dupatta adorned with delicate zari borders. Designed for wedding sangeets, festive pujas, and celebratory family dinners, it exudes royal grace while ensuring effortless lightweight comfort.",
      },
      {
        title: "Artisanal Gota-Patti Festive Set",
        text: "Meticulously embellished with traditional gota-patti and threadwork along the yoke and sleeve cuffs, this kurta set pairs heirloom-inspired detailing with modern tailored palazzos. The coordinated bottom features a comfortable semi-elasticated waistband with a functional pocket, making celebration styling utterly seamless.",
      },
      {
        title: "Heirloom Festive Grandeur",
        text: "Inspired by royal court silhouettes of India, this kurta set pairs exquisite resham and metallic threadwork with soft, breathable fabrics. The accompanying lightweight dupatta drapes like liquid light, creating a breathtaking statement of festive sophistication.",
      },
    ],
    highlightSuggestions: [
      "Coordinated three-piece set: Regal Kurta, tailored trousers, and sheer dupatta",
      "Intricate gold zari and gota-patti border work along the hemline and sleeves",
      "Comfort-fit trousers with semi-elasticated back waist and functional side pockets",
      "Lightweight diaphanous dupatta with artisanal handcrafted corner tassels",
      "V-neckline accented with hand-placed micro-sequin and resham embroidery",
      "Flattering straight-cut silhouette with side vents for graceful movement",
      "Designed for festive celebrations, intimate weddings, and family gatherings",
      "Includes generous 2.5-meter coordinated sheer dupatta",
    ],
  },

  "co-ords": {
    categoryKey: "co-ords",
    categoryLabel: "Co-ords",
    icon: "🧥",
    shortDescSuggestions: [
      "Modern two-piece coordinated set delivering effortless chic from desk to dinner.",
      "Relaxed yet sharply tailored co-ord set crafted from premium wrinkle-resistant weave.",
      "Contemporary two-piece ensemble designed to be worn together or styled as versatile separates.",
    ],
    storyTemplates: [
      {
        title: "Modern Monochromatic Tailoring",
        text: "Modern boutique luxury at its finest—this relaxed yet sharply tailored two-piece co-ord set delivers understated elegance and complete styling versatility. Crafted from a high-twist wrinkle-resistant weave, it features a fluid buttoned tunic paired with matching high-waisted trousers that effortlessly transition from boardroom meetings to evening cocktails.",
      },
      {
        title: "Effortless Two-Piece Statement",
        text: "Sculpted for modern women on the move, this co-ord ensemble blends clean structural minimalism with tactile textured textiles. Wear both pieces together for a commanding monochromatic statement, or style the tunic with denims and the trousers with a tailored blazer for endless wardrobe versatility.",
      },
      {
        title: "Resort & Travel Sophistication",
        text: "Engineered for lightweight travel and cosmopolitan outings, this co-ord set pairs an airy silhouette with meticulous atelier finishing. The relaxed trousers feature double front pleats and deep functional pockets, while the top delivers breezy, modern sophistication.",
      },
    ],
    highlightSuggestions: [
      "Matching two-piece coordinated set (tailored top/tunic & matching trousers)",
      "Versatile styling: wear together as a cohesive statement or mix & match as separates",
      "High-waisted relaxed trousers with flat front waistband and elasticated back",
      "Premium wrinkle-resistant fabric with soft fluid drape and subtle sheen",
      "Concealed front button placket with custom handcrafted minimalist buttons",
      "Deep functional side pockets on trousers for effortless utility",
      "Flattering relaxed silhouette tailored for all-day comfort without creasing",
      "Curated contemporary design from our Panampilly Nagar studio",
    ],
  },

  ethnic: {
    categoryKey: "ethnic",
    categoryLabel: "Ethnic Wear",
    icon: "🪡",
    shortDescSuggestions: [
      "Rooted in timeless royal heritage, showcasing authentic artisanal weaves and rich jewel tones.",
      "Heirloom-grade ethnic silhouette adorned with intricate resham threadwork and gold accents.",
      "Traditional Indian craftsmanship meets contemporary grace for festive occasions.",
    ],
    storyTemplates: [
      {
        title: "Timeless Heritage & Royal Textiles",
        text: "Rooted in timeless royal heritage, this ethnic creation celebrates generational Indian craftsmanship with authentic artisanal weaves and rich festive jewel tones. Meticulously constructed with a flattering flared silhouette, it features delicate hand-guided embroidery and heirloom-quality metallic accents that honor traditional craftsmanship.",
      },
      {
        title: "Festive Heirloom Silhouettes",
        text: "Crafted for auspicious occasions, this ensemble blends royal Indian textile traditions with thoughtful contemporary tailoring. Lined with soft handloom mulmul cotton for skin-friendly comfort, it drapes with majestic fluidity while capturing the warm glow of celebratory festivities.",
      },
      {
        title: "Artisanal Weavers' Tribute",
        text: "Every stitch in this ethnic silhouette represents hours of dedicated craftsmanship by generational weavers. Adorned with heritage borders and subtle metallic motifs, it is tailored to remain a cherished staple in your wardrobe for decades to come.",
      },
    ],
    highlightSuggestions: [
      "Authentic Indian handloom weave inspired by royal heritage traditions",
      "Rich festive jewel tone dyed using skin-friendly, color-fast processes",
      "Flattering flared A-line silhouette with a regal boat neckline",
      "Heirloom-quality resham and metallic threadwork detailing along borders",
      "Subtle side gathers creating volume without adding bulk",
      "Full interior lining with soft handloom mulmul cotton for luxurious skin comfort",
      "Designed to be cherished as a treasured staple in your festive wardrobe",
      "Authentic artisanal craftsmanship from Kerala, India",
    ],
  },

  "party-wear": {
    categoryKey: "party-wear",
    categoryLabel: "Party Wear",
    icon: "💎",
    shortDescSuggestions: [
      "Captivating evening silhouette featuring shimmering metallic accents and dramatic drape.",
      "Designed to turn heads under evening lights, tailored with couture-level finishing.",
      "High-luster glam garment engineered with structured support and liquid-fluid movement.",
    ],
    storyTemplates: [
      {
        title: "Evening Glamour & High-Luster Drama",
        text: "Designed to turn heads under evening lights, this party wear statement features luminous textures, couture-level finishing, and dramatic fluid motion. Accented with hand-set bead embellishments and sculpted waist contours, it brings red-carpet glamour to high-profile cocktail evenings and gala celebrations.",
      },
      {
        title: "Couture Evening Showstopper",
        text: "A dazzling celebration of modern boutique couture, tailored with sculptural contours, subtle side-slit drama, and a high-sheen satin finish. Built with structured princess seams and concealed interior support, it ensures confident, picture-perfect elegance throughout the night.",
      },
      {
        title: "Midnight Opulence & Luminous Sheen",
        text: "Channel nocturnal radiance with this exquisite party wear piece. Cut on the bias to hug curves gracefully before cascading into a fluid, sweeping hemline, it combines decadent tactile indulgence with effortless modern wearability.",
      },
    ],
    highlightSuggestions: [
      "Luminous high-luster fabric with subtle light-catching metallic sheen",
      "Hand-embroidered sequin and bead embellishments crafted by master artisans",
      "Statement evening silhouette with dramatic contouring and fluid fall",
      "Concealed premium back zipper with seamless hook-and-eye closure",
      "Floor-sweeping or mid-calf dramatic hemline tailored for stiletto heels",
      "Contoured princess seams offering flattering structured support",
      "Engineered to maintain a pristine, crease-free silhouette throughout evening events",
      "Couture boutique construction with reinforced inner boning / seams",
    ],
  },

  tops: {
    categoryKey: "tops",
    categoryLabel: "Tops & Tunics",
    icon: "👚",
    shortDescSuggestions: [
      "Contemporary artisanal top featuring delicate pintuck detailing and breathable natural weave.",
      "Versatile luxury tunic designed to pair effortlessly with trousers, palazzos, or denims.",
      "Modern tailored blouse crafted from lightweight breathable fabric with artisanal buttons.",
    ],
    storyTemplates: [
      {
        title: "Contemporary Minimalist Blouse",
        text: "Effortlessly blending casual ease with boutique sophistication, this artisanal top features delicate pintuck pleating and hand-finished button accents. Tailored from a breathable natural weave, it pairs seamlessly with tailored trousers for office elegance or relaxed palazzos for weekend leisure.",
      },
      {
        title: "Artisanal Tunic with Modern Detailing",
        text: "Crafted for women who adore refined simplicity, this tunic showcases clean architectural lines softened by subtle gathers and a flattering collar. The pre-washed natural fiber drapes gracefully, making it an indispensable wardrobe essential for year-round comfort.",
      },
    ],
    highlightSuggestions: [
      "Breathable natural fiber weave pre-washed for soft hand feel",
      "Delicate handcrafted pintucks along the front yoke",
      "Mother-of-pearl button detailing on front placket and cuffs",
      "Flattering hip-length silhouette with gentle curved hemline",
      "Versatile styling: pairs seamlessly with trousers, palazzos, or denims",
      "Comfortable relaxed cut designed for tropical and warm weather wear",
    ],
  },

  festive: {
    categoryKey: "festive",
    categoryLabel: "Festive Wear",
    icon: "🪔",
    shortDescSuggestions: [
      "Radiant festive ensemble featuring glistening gota work and celebratory jewel tones.",
      "Joyful festive craftsmanship tailored with rich celebratory textures and fluid grace.",
    ],
    storyTemplates: [
      {
        title: "Radiant Festive Grandeur",
        text: "Infuse your festive celebrations with royal charm—featuring radiant festive hues, glistening gota border work, and artisanal heritage embroidery. Thoughtfully tailored to offer royal grandeur while remaining delightfully lightweight, it allows you to dance and celebrate throughout festive gatherings and wedding ceremonies.",
      },
    ],
    highlightSuggestions: [
      "Celebratory festive ensemble with glimmering metallic threadwork",
      "Festive color palette designed to shine in both daytime sunshine and evening lights",
      "Opulent border trimming along the neckline, sleeves, and hemline",
      "Lightweight construction allowing unrestricted festive dancing and movement",
      "Artisanal handcrafted detailing honoring time-tested Indian festive traditions",
    ],
  },

  sarees: {
    categoryKey: "sarees",
    categoryLabel: "Sarees",
    icon: "🥻",
    shortDescSuggestions: [
      "Ethereal handwoven saree featuring rich zari pallu and matching unstitched blouse piece.",
      "Heirloom saree with fluid drape that holds pleats effortlessly.",
    ],
    storyTemplates: [
      {
        title: "Ethereal Handwoven Saree Tradition",
        text: "Woven with generational reverence, this heirloom saree features ethereal drape, rich zari pallu work, and a matching unstitched blouse piece. A symphony of lightweight grace and metallic luminescence, it flows naturally with every step and holds pleats with crisp perfection.",
      },
    ],
    highlightSuggestions: [
      "Full 6.5 meters length inclusive of matching unstitched blouse piece",
      "Artisanal woven zari border featuring traditional floral and temple motifs",
      "Ethereal lightweight drape that holds pleats effortlessly throughout the day",
      "Contrasting rich pallu with dense metallic weave embellishment",
      "Heirloom-grade textile woven to be passed down through generations",
    ],
  },

  default: {
    categoryKey: "default",
    categoryLabel: "Boutique Garment",
    icon: "✨",
    shortDescSuggestions: [
      "Handcrafted boutique garment tailored with premium artisanal fabrics and timeless aesthetics.",
      "Understated luxury piece combining flattering silhouettes with meticulous atelier detailing.",
    ],
    storyTemplates: [
      {
        title: "Handcrafted Atelier Elegance",
        text: "Crafted at our Panampilly Nagar atelier, this garment reflects our commitment to slow, intentional fashion. Featuring artisanal textiles, precise hand-finished seams, and a silhouette designed to flatter modern Indian aesthetics, it delivers effortless sophistication for any special occasion.",
      },
      {
        title: "Artisanal Heritage & Modern Ease",
        text: "A celebration of tactile luxury and thoughtful tailoring, this piece balances generational Indian craftsmanship with contemporary ease. Breathable, durable, and exquisitely finished, it is tailored to become a cherished favorite in your wardrobe.",
      },
    ],
    highlightSuggestions: [
      "Ultra-soft handcrafted boutique fabric with premium finish",
      "Relaxed silhouette tailored to flatter modern Indian aesthetics",
      "Handcrafted with precision at our Panampilly Nagar studio, Kochi",
      "Breathable natural weave engineered for all-day comfort",
      "Subtle artisanal detailing with reinforced boutique seam finishing",
      "Thoughtfully tailored for versatile occasion and everyday styling",
    ],
  },
};

/**
 * Normalizes any category string (e.g. "Co-ord Sets", "Kurtis", "Dresses")
 * to its corresponding preset configuration.
 */
export function getCategoryContentPreset(categoryName: string): CategoryContentPreset {
  const norm = (categoryName || "").toLowerCase().trim();

  if (norm.includes("dress")) return CATEGORY_CONTENT_PRESETS["dresses"];
  if (norm.includes("kurta set") || norm.includes("kurtaset")) return CATEGORY_CONTENT_PRESETS["kurta-sets"];
  if (norm.includes("kurti") || norm.includes("kurta")) return CATEGORY_CONTENT_PRESETS["kurtis"];
  if (norm.includes("co-ord") || norm.includes("coord") || norm.includes("set")) return CATEGORY_CONTENT_PRESETS["co-ords"];
  if (norm.includes("saree") || norm.includes("sari")) return CATEGORY_CONTENT_PRESETS["sarees"];
  if (norm.includes("party")) return CATEGORY_CONTENT_PRESETS["party-wear"];
  if (norm.includes("festive")) return CATEGORY_CONTENT_PRESETS["festive"];
  if (norm.includes("ethnic")) return CATEGORY_CONTENT_PRESETS["ethnic"];
  if (norm.includes("top") || norm.includes("tunic") || norm.includes("blouse")) return CATEGORY_CONTENT_PRESETS["tops"];

  return CATEGORY_CONTENT_PRESETS["default"];
}
