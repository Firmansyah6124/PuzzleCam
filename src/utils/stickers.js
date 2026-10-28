// Kawaii Japanese Photobooth Stickers & Presets (Clean, Modern, Cute Japanese Style)

export const STICKERS = [
  {
    id: "sakura_blossom",
    name: "Sakura 桜",
    category: "nature",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sakuraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF0F5"/>
          <stop offset="60%" stop-color="#FFB6C1"/>
          <stop offset="100%" stop-color="#FF7597"/>
        </radialGradient>
      </defs>
      <!-- 5 Petals -->
      <path d="M50 50 C40 20 20 25 32 10 C45 20 50 40 50 50 Z" fill="url(#sakuraGrad)"/>
      <path d="M50 50 C60 20 80 25 68 10 C55 20 50 40 50 50 Z" fill="url(#sakuraGrad)"/>
      <path d="M50 50 C80 35 90 55 90 40 C75 55 60 50 50 50 Z" fill="url(#sakuraGrad)"/>
      <path d="M50 50 C70 80 85 85 70 88 C60 75 55 60 50 50 Z" fill="url(#sakuraGrad)"/>
      <path d="M50 50 C30 80 15 85 30 88 C40 75 45 60 50 50 Z" fill="url(#sakuraGrad)"/>
      <path d="M50 50 C20 35 10 55 10 40 C25 55 40 50 50 50 Z" fill="url(#sakuraGrad)"/>
      <circle cx="50" cy="50" r="7" fill="#FF4D79"/>
      <circle cx="50" cy="50" r="3" fill="#FFF"/>
    </svg>`
  },
  {
    id: "cat_paw",
    name: "Neko Paw 肉球",
    category: "cute",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="65" rx="26" ry="20" fill="#FFAEC9" stroke="#FF7597" stroke-width="3"/>
      <circle cx="28" cy="38" r="10" fill="#FFAEC9" stroke="#FF7597" stroke-width="3"/>
      <circle cx="43" cy="28" r="10" fill="#FFAEC9" stroke="#FF7597" stroke-width="3"/>
      <circle cx="58" cy="28" r="10" fill="#FFAEC9" stroke="#FF7597" stroke-width="3"/>
      <circle cx="73" cy="38" r="10" fill="#FFAEC9" stroke="#FF7597" stroke-width="3"/>
    </svg>`
  },
  {
    id: "cute_onigiri",
    name: "Onigiri おにぎり",
    category: "food",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15 C68 15 85 65 78 80 C70 90 30 90 22 80 C15 65 32 15 50 15 Z" fill="#FFFFFF" stroke="#3D3534" stroke-width="4"/>
      <!-- Nori seaweed -->
      <rect x="36" y="55" width="28" height="28" rx="6" fill="#2C3531"/>
      <!-- Cute blush face -->
      <circle cx="42" cy="48" r="2.5" fill="#3D3534"/>
      <circle cx="58" cy="48" r="2.5" fill="#3D3534"/>
      <ellipse cx="38" cy="52" rx="4" ry="2.5" fill="#FFB6C1"/>
      <ellipse cx="62" cy="52" rx="4" ry="2.5" fill="#FFB6C1"/>
      <path d="M47 51 Q50 54 53 51" stroke="#3D3534" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: "cute_dango",
    name: "Dango だんご",
    category: "food",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Stick -->
      <line x1="20" y1="85" x2="80" y2="25" stroke="#C89D7C" stroke-width="6" stroke-linecap="round"/>
      <!-- Green Dango (Matcha) -->
      <circle cx="35" cy="70" r="14" fill="#A8D5BA" stroke="#7EBD75" stroke-width="2.5"/>
      <circle cx="32" cy="67" r="1.5" fill="#3D3534"/>
      <circle cx="38" cy="67" r="1.5" fill="#3D3534"/>
      <!-- White Dango -->
      <circle cx="50" cy="55" r="14" fill="#FFFFFF" stroke="#E0D6C8" stroke-width="2.5"/>
      <circle cx="47" cy="52" r="1.5" fill="#3D3534"/>
      <circle cx="53" cy="52" r="1.5" fill="#3D3534"/>
      <!-- Pink Dango (Sakura) -->
      <circle cx="65" cy="40" r="14" fill="#FFB7C5" stroke="#FF7597" stroke-width="2.5"/>
      <circle cx="62" cy="37" r="1.5" fill="#3D3534"/>
      <circle cx="68" cy="37" r="1.5" fill="#3D3534"/>
    </svg>`
  },
  {
    id: "cute_bow",
    name: "Ribbon 🎀",
    category: "cute",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Left loop -->
      <path d="M50 48 C30 25 10 35 20 60 C30 70 45 55 50 52 Z" fill="#FF7597" stroke="#FF4D79" stroke-width="3"/>
      <!-- Right loop -->
      <path d="M50 48 C70 25 90 35 80 60 C70 70 55 55 50 52 Z" fill="#FF7597" stroke="#FF4D79" stroke-width="3"/>
      <!-- Ribbon Tails -->
      <path d="M45 54 L30 85 L44 80 L48 60 Z" fill="#FF4D79"/>
      <path d="M55 54 L70 85 L56 80 L52 60 Z" fill="#FF4D79"/>
      <!-- Center Knot -->
      <circle cx="50" cy="50" r="8" fill="#FFE4E8" stroke="#FF4D79" stroke-width="3"/>
    </svg>`
  },
  {
    id: "sparkle_star",
    name: "Kira Kira ✨",
    category: "sparkle",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 Q50 50 90 50 Q50 50 50 90 Q50 50 10 50 Q50 50 50 10 Z" fill="#FFD166" stroke="#FFAA00" stroke-width="2.5"/>
      <circle cx="50" cy="50" r="6" fill="#FFF"/>
      <circle cx="78" cy="22" r="4" fill="#FFD166"/>
      <circle cx="22" cy="78" r="3" fill="#FFD166"/>
    </svg>`
  },
  {
    id: "bunny_ears",
    name: "Usagi 🐰",
    category: "cute",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="38" cy="40" rx="12" ry="32" fill="#FFFFFF" stroke="#FFAEC9" stroke-width="3"/>
      <ellipse cx="38" cy="42" rx="6" ry="20" fill="#FFAEC9"/>
      <ellipse cx="62" cy="40" rx="12" ry="32" fill="#FFFFFF" stroke="#FFAEC9" stroke-width="3"/>
      <ellipse cx="62" cy="42" rx="6" ry="20" fill="#FFAEC9"/>
      <!-- Bow in middle -->
      <circle cx="50" cy="72" r="5" fill="#FF7597"/>
      <ellipse cx="43" cy="72" rx="5" ry="3" fill="#FFB7C5"/>
      <ellipse cx="57" cy="72" rx="5" ry="3" fill="#FFB7C5"/>
    </svg>`
  },
  {
    id: "speech_daisuki",
    name: "だいすき♡",
    category: "speech",
    svg: `<svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="130" height="46" rx="23" fill="#FFF0F5" stroke="#FF7597" stroke-width="3"/>
      <text x="70" y="36" font-family="'Zen Maru Gothic', 'Nunito', sans-serif" font-weight="900" font-size="18" fill="#FF4D79" text-anchor="middle">だいすき♡</text>
    </svg>`
  },
  {
    id: "speech_kawaii",
    name: "カワイイ！",
    category: "speech",
    svg: `<svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="130" height="46" rx="23" fill="#E8F5E9" stroke="#7EBD75" stroke-width="3"/>
      <text x="70" y="36" font-family="'Zen Maru Gothic', 'Nunito', sans-serif" font-weight="900" font-size="17" fill="#4B8B42" text-anchor="middle">カワイイ！✨</text>
    </svg>`
  },
  {
    id: "speech_purikura",
    name: "プリクラ",
    category: "speech",
    svg: `<svg viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="130" height="46" rx="23" fill="#FFF9E6" stroke="#FFD166" stroke-width="3"/>
      <text x="70" y="36" font-family="'Zen Maru Gothic', 'Nunito', sans-serif" font-weight="900" font-size="18" fill="#D48B00" text-anchor="middle">★ プリクラ ★</text>
    </svg>`
  }
];

// Rich Themed Photobooth Frames (Decorates the actual outer strip/card)
export const FRAME_STYLES = [
  {
    id: "sakura_blossom",
    name: "Sakura Blossom 🌸",
    icon: "🌸",
    bg: "#FFF0F5",
    border: "#FF7597",
    accent: "#FF4D79",
    tag: "POPULER",
    sub: "Bunga sakura & rona pink manis"
  },
  {
    id: "kawaii_ribbon",
    name: "Sweet Ribbon 🎀",
    icon: "🎀",
    bg: "#FFF5F8",
    border: "#FF69B4",
    accent: "#FF1493",
    tag: "KAWAII",
    sub: "Pita stroberi & ornamen hati"
  },
  {
    id: "neko_paw",
    name: "Neko Cafe 🐾",
    icon: "🐾",
    bg: "#FFFDF5",
    border: "#E0A96D",
    accent: "#8B5A2B",
    tag: "LUCU",
    sub: "Telinga kucing & jejak telapak"
  },
  {
    id: "kyoto_matcha",
    name: "Kyoto Tea 🍵",
    icon: "🍵",
    bg: "#F1F8F3",
    border: "#7EBD75",
    accent: "#387032",
    tag: "ZEN",
    sub: "Estetika teh hijau tradisional"
  },
  {
    id: "y2k_sparkle",
    name: "Y2K Sparkle ✨",
    icon: "✨",
    bg: "#F7F3FF",
    border: "#B39DDB",
    accent: "#7E57C2",
    tag: "RETRO",
    sub: "Bintang lavender & kilauan retro"
  },
  {
    id: "minimal_white",
    name: "Clean Minimal 🤍",
    icon: "🤍",
    bg: "#FFFFFF",
    border: "#D6D6D6",
    accent: "#5C5251",
    tag: "MODERN",
    sub: "Polaroid putih elegan bergaris"
  }
];

// Real Japanese Purikura Color Filters (Applied to the camera/photo)
export const FILTERS = [
  {
    id: "sakura_blush",
    name: "Sakura Blush 🌸",
    icon: "🌸",
    sub: "Pinkish glow, cerah & merona",
    css: "brightness(1.1) contrast(1.06) saturate(1.3) hue-rotate(-8deg)"
  },
  {
    id: "bihaku_porcelain",
    name: "Bihaku White 🥛",
    icon: "🥛",
    sub: "Efek pemutih kulit khas Jepang",
    css: "brightness(1.2) contrast(1.08) saturate(0.92)"
  },
  {
    id: "kyoto_film",
    name: "Kyoto Film 🍵",
    icon: "🍵",
    sub: "Tone vintage kehijauan estetik",
    css: "contrast(1.14) brightness(1.04) saturate(1.22) hue-rotate(22deg) sepia(0.12)"
  },
  {
    id: "tokyo_bw",
    name: "Tokyo B&W 🖤",
    icon: "🎞️",
    sub: "Monokrom klasik kontras tajam",
    css: "grayscale(1) contrast(1.28) brightness(1.08)"
  },
  {
    id: "shibuya_sunset",
    name: "Golden Sunset 🌅",
    icon: "🌅",
    sub: "Nuansa senja hangat keemasan",
    css: "sepia(0.38) contrast(1.14) brightness(1.08) saturate(1.35)"
  },
  {
    id: "pure_natural",
    name: "Natural Glow ✨",
    icon: "✨",
    sub: "Warna asli tanpa perubahan",
    css: "none"
  }
];

export function getStickerDataUrl(svgString) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
}
