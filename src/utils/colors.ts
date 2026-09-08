/**
 * Aavya Boutique - Comprehensive Fashion & Ethnic Color Palette & Resolver
 * Accurately maps color names (presets, Indian ethnic shades, standard CSS names,
 * compound names, hex codes) to their authentic visual hex representations.
 */

export const COLOR_MAP: Record<string, string> = {
  // ─── Boutique & Preset Colors ──────────────────────────────────────────
  "dusty rose": "#DCAE96",
  "ivory": "#FFFFF0",
  "charcoal": "#2E2E2E",
  "sage green": "#9CAF88",
  "sand": "#C2B280",
  "cream": "#FFFDD0",
  "indigo": "#4B0082",
  "terracotta": "#E2725B",
  "blush pink": "#FFD1DC",
  "blush": "#E8C5C5",
  "champagne gold": "#F7E7CE",
  "champagne": "#F7E7CE",
  "mint": "#98FF98",
  "mint green": "#98FF98",
  "olive green": "#708238",
  "olive": "#708238",
  "emerald": "#50C878",
  "emerald green": "#50C878",
  "navy": "#000080",
  "navy blue": "#000080",
  "maroon": "#800000",
  "black": "#1A1A1A",
  "jet black": "#0A0A0A",
  "burgundy": "#800020",
  "chanderi gold": "#D4AF37",
  "powder blue": "#B0E0E6",
  "wine": "#722F37",
  "coral": "#FF7F50",
  "coral pink": "#F88379",
  "lavender": "#E6E6FA",
  "rust orange": "#C04000",
  "rust": "#C04000",
  "royal blue": "#4169E1",
  "teal": "#2A7B7B",
  "teal blue": "#206F7C",

  // ─── Indian Ethnic & Festive Shades ─────────────────────────────────────
  "haldi": "#E1AD01",
  "haldi yellow": "#FEDB39",
  "mustard": "#D49B23",
  "mustard yellow": "#E1AD01",
  "mehendi": "#4A5D23",
  "mehendi green": "#4A5D23",
  "pista": "#93C572",
  "pista green": "#93C572",
  "pistachio": "#93C572",
  "rani": "#E0115F",
  "rani pink": "#E0115F",
  "sindoor": "#C72C41",
  "sindoor red": "#C72C41",
  "kesariya": "#FF9933",
  "saffron": "#FF9933",
  "genda": "#FF8C00",
  "marigold": "#FFA000",
  "zari gold": "#D4AF37",
  "antique gold": "#C5A059",
  "rose gold": "#B76E79",
  "bronze": "#CD7F32",
  "copper": "#B87333",
  "raw silk": "#EFE8DA",
  "tussar": "#E4D5B7",
  "malmal": "#FDFBF7",
  "off white": "#FAF9F6",
  "pure white": "#FFFFFF",
  "white": "#FFFFFF",
  "pearl": "#EAE0D5",
  "bone": "#E3DAC9",
  "beige": "#F5F5DC",
  "taupe": "#8B8589",
  "khaki": "#C3B091",
  "biscuit": "#D9C9B4",
  "camel": "#C19A6B",
  "coffee": "#6F4E37",
  "mocha": "#967969",
  "chocolate": "#4B3621",
  "cocoa": "#5D3A1A",

  // ─── Pinks, Reds & Corals ──────────────────────────────────────────────
  "red": "#C41E3A",
  "crimson": "#DC143C",
  "ruby": "#9B111E",
  "scarlet": "#FF2400",
  "cherry": "#D2042D",
  "oxblood": "#4A0404",
  "brick red": "#8B3125",
  "pink": "#FFC0CB",
  "hot pink": "#FF69B4",
  "baby pink": "#F4C2C2",
  "pale pink": "#FADADD",
  "rose": "#FF007F",
  "fuchsia": "#FF00FF",
  "magenta": "#FF00FF",
  "peach": "#FFE5B4",
  "peach puff": "#FFDAB9",
  "salmon": "#FA8072",
  "sunset": "#FD5E53",
  "tangerine": "#F28500",
  "orange": "#FFA500",
  "amber": "#FFBF00",
  "ochre": "#CC7722",
  "burnt orange": "#CC5500",

  // ─── Greens & Earth Tones ──────────────────────────────────────────────
  "green": "#2E7D32",
  "forest green": "#228B22",
  "bottle green": "#004225",
  "hunter green": "#355E3B",
  "sea green": "#2E8B57",
  "seafoam": "#9FE2BF",
  "jade": "#00A86B",
  "lime": "#32CD32",
  "moss": "#8A9A5B",
  "moss green": "#8A9A5B",
  "pine green": "#01796F",
  "fern": "#4F7942",

  // ─── Blues & Aquas ─────────────────────────────────────────────────────
  "blue": "#1E88E5",
  "sky blue": "#87CEEB",
  "baby blue": "#89CFF0",
  "ice blue": "#D0F0FD",
  "light blue": "#ADD8E6",
  "cerulean": "#007BA7",
  "cobalt": "#0047AB",
  "cobalt blue": "#0047AB",
  "sapphire": "#0F52BA",
  "ocean blue": "#0077BE",
  "midnight blue": "#191970",
  "denim": "#1560BD",
  "aqua": "#00FFFF",
  "aquamarine": "#7FFFD4",
  "turquoise": "#40E0D0",
  "peacock": "#005F73",
  "peacock blue": "#005F73",
  "peacock green": "#005F73",
  "cyan": "#00FFFF",

  // ─── Purples & Lilacs ──────────────────────────────────────────────────
  "purple": "#800080",
  "violet": "#7F00FF",
  "lilac": "#C8A2C8",
  "mauve": "#E0B0FF",
  "plum": "#673147",
  "orchid": "#DA70D6",
  "amethyst": "#9966CC",
  "mulberry": "#C54B8C",
  "aubergine": "#472C4C",
  "eggplant": "#614051",
  "grape": "#6F2DA8",
  "periwinkle": "#CCCCFF",
  "iris": "#5A4FCF",

  // ─── Greys & Metallics ─────────────────────────────────────────────────
  "grey": "#808080",
  "gray": "#808080",
  "slate": "#708090",
  "slate grey": "#708090",
  "slate gray": "#708090",
  "silver": "#C0C0C0",
  "metallic silver": "#BCC6CC",
  "smoke": "#738276",
  "ash": "#B2BEB5",
  "graphite": "#383428",
  "gunmetal": "#2A3439",
  "gold": "#FFD700",
  "yellow": "#FFD700",
  "lemon": "#FFF700",
};

/**
 * Words that can be stripped to find the core color keyword.
 */
const MODIFIER_WORDS = [
  "pure", "deep", "light", "dark", "soft", "pale", "bright", "rich",
  "vibrant", "matte", "glossy", "metallic", "shimmer", "tone", "shade",
  "hue", "color", "colour", "fabric", "silk", "cotton", "chiffon",
  "organza", "satin", "traditional", "festive", "royal", "signature"
];

/**
 * Validates whether an input is a valid CSS hex code.
 */
export function isValidHex(hex: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hex.trim());
}

/**
 * Checks if a hex color is light (requires a clear border/ring for contrast on light backgrounds).
 */
export function isLightColor(hex: string): boolean {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  if (clean.length < 6) return true;

  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);

  // Perceived brightness formula (ITU-R BT.709)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 200; // Above 200 is very light (ivory, cream, white, etc.)
}

/**
 * Generates a stable, elegant pastel/warm boutique hue for completely unmapped custom names.
 */
function getDeterministicBoutiqueColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  // Elegant muted boutique saturation (35-50%) and lightness (45-60%)
  const sat = 38 + (Math.abs(hash >> 3) % 15);
  const light = 48 + (Math.abs(hash >> 5) % 15);
  return `hsl(${hue}, ${sat}%, ${light}%)`;
}

/**
 * Resolves any color string (preset, Indian shade name, CSS name, hex code,
 * compound name like "Deep Wine" or "Light Sage") to a visually accurate color hex.
 */
export function getColorHex(colorInput?: string | null): string {
  if (!colorInput || typeof colorInput !== "string") {
    return "#DCAE96"; // warm boutique dusty rose fallback
  }

  const trimmed = colorInput.trim();
  if (!trimmed) return "#DCAE96";

  // 1. Direct Hex Code match
  if (isValidHex(trimmed)) {
    return trimmed;
  }

  // 2. Direct CSS rgb/hsl values
  if (/^(rgb|hsl)a?\(/i.test(trimmed)) {
    return trimmed;
  }

  // 3. Normalize: lowercase, replace underscores/hyphens with space
  const normalized = trimmed.toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();

  // 4. Exact dictionary match
  if (COLOR_MAP[normalized]) {
    return COLOR_MAP[normalized];
  }

  // 5. Handle slash or comma separated colors (e.g. "Maroon / Gold" -> match "maroon")
  if (normalized.includes("/") || normalized.includes(",") || normalized.includes("&")) {
    const firstPart = normalized.split(/[/,&]/)[0].trim();
    if (COLOR_MAP[firstPart]) {
      return COLOR_MAP[firstPart];
    }
  }

  // 6. Substring match for longer known keys (e.g., "Deep Olive Green" matches "olive green")
  // Sort keys by length descending to match most specific shade first (e.g. "sage green" before "green")
  const sortedKeys = Object.keys(COLOR_MAP).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (normalized.includes(key)) {
      return COLOR_MAP[key];
    }
  }

  // 7. Strip modifier words ("Light", "Deep", "Pure", etc.)
  const words = normalized.split(" ");
  const strippedWords = words.filter((w) => !MODIFIER_WORDS.includes(w));
  const strippedName = strippedWords.join(" ").trim();
  if (strippedName && COLOR_MAP[strippedName]) {
    return COLOR_MAP[strippedName];
  }

  // 8. Individual word check in order of appearance
  for (const word of strippedWords) {
    if (COLOR_MAP[word]) {
      return COLOR_MAP[word];
    }
  }

  // 9. If all else fails, generate a harmonious deterministic boutique shade
  return getDeterministicBoutiqueColor(trimmed);
}
