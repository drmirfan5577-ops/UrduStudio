// eVeR sMaRt UrDu sTuDiO - Storyboard Styles & Templates

export type SceneStyle =
  | 'cinematic' | 'minimal' | 'professional' | 'futuristic' | 'vintage'
  | 'carved3d' | 'neon' | 'royal' | 'documentary' | 'dramatic'
  | 'islamic_golden' | 'military' | 'nature' | 'dark_epic' | 'watercolor';

export interface StoryboardScene {
  id: string;
  sceneNumber: number;
  title: string;
  titleUrdu: string;
  description: string;
  visualsDescription: string;
  backgroundMusic: string;
  dialogues: string[];
  style: SceneStyle;
  bgColors: string[];
  textColor: string;
  accentColor: string;
  overlayOpacity: number;
  duration: string;
  location: string;
  tags: string[];
  icon: string;
  note: string;
}

export interface StoryboardProject {
  id: string;
  title: string;
  titleUrdu: string;
  genre: string;
  description: string;
  scenes: StoryboardScene[];
  style: SceneStyle;
  createdAt: number;
  updatedAt: number;
}

// ============================================================
// STYLE DEFINITIONS
// ============================================================
export const SCENE_STYLES: Record<SceneStyle, {
  label: string; labelUrdu: string; icon: string;
  bg: string[]; text: string; accent: string;
  overlay: string; description: string;
}> = {
  cinematic: {
    label: 'Cinematic', labelUrdu: 'سینماتک', icon: '🎬',
    bg: ['#0D0D0D', '#1A1A2E', '#16213E'],
    text: '#FFFFFF', accent: '#FFD700',
    overlay: 'rgba(0,0,0,0.65)',
    description: 'Dark, dramatic, film-like quality',
  },
  minimal: {
    label: 'Minimal', labelUrdu: 'مینیمل', icon: '⬜',
    bg: ['#FFFFFF', '#F8F8F8', '#F0F0F0'],
    text: '#1A1A1A', accent: '#B8860B',
    overlay: 'rgba(255,255,255,0.3)',
    description: 'Clean, simple, whitespace-driven',
  },
  professional: {
    label: 'Professional', labelUrdu: 'پیشہ ورانہ', icon: '💼',
    bg: ['#1565C0', '#0D47A1', '#01579B'],
    text: '#FFFFFF', accent: '#FFD700',
    overlay: 'rgba(21,101,192,0.5)',
    description: 'Corporate, trustworthy, structured',
  },
  futuristic: {
    label: 'Futuristic', labelUrdu: 'مستقبل', icon: '🚀',
    bg: ['#0A0A2E', '#050520', '#00001A'],
    text: '#00FFFF', accent: '#FF00FF',
    overlay: 'rgba(0,0,255,0.2)',
    description: 'Sci-fi, neon, technological',
  },
  vintage: {
    label: 'Vintage', labelUrdu: 'کلاسک', icon: '📜',
    bg: ['#D4A96A', '#C4956A', '#B8A070'],
    text: '#3B2007', accent: '#8B4513',
    overlay: 'rgba(180,120,60,0.3)',
    description: 'Aged, nostalgic, warm-toned',
  },
  carved3d: {
    label: 'Carved 3D', labelUrdu: '3D کندہ', icon: '🪨',
    bg: ['#C4B380', '#B8A070', '#A09060'],
    text: '#FFFFFF', accent: '#FFD700',
    overlay: 'rgba(0,0,0,0.4)',
    description: 'Stone-carved, textured depth',
  },
  neon: {
    label: 'Neon Glow', labelUrdu: 'نیون', icon: '💡',
    bg: ['#0A0A0A', '#050505', '#000000'],
    text: '#00FF88', accent: '#FF00FF',
    overlay: 'rgba(0,0,0,0.7)',
    description: 'Glowing, electric, vivid colors',
  },
  royal: {
    label: 'Royal', labelUrdu: 'شاہی', icon: '👑',
    bg: ['#4A148C', '#6A1B9A', '#7B1FA2'],
    text: '#FFD700', accent: '#FFF9C4',
    overlay: 'rgba(74,20,140,0.4)',
    description: 'Regal, luxurious, majestic',
  },
  documentary: {
    label: 'Documentary', labelUrdu: 'دستاویزی', icon: '🎥',
    bg: ['#3E2723', '#4E342E', '#5D4037'],
    text: '#FFCC02', accent: '#FF9800',
    overlay: 'rgba(62,39,35,0.5)',
    description: 'Earthy, authentic, real-world feel',
  },
  dramatic: {
    label: 'Dramatic', labelUrdu: 'ڈرامائی', icon: '🎭',
    bg: ['#1A0000', '#2D0000', '#3D0000'],
    text: '#FF4444', accent: '#FF8800',
    overlay: 'rgba(100,0,0,0.5)',
    description: 'Intense, emotional, high-contrast',
  },
  islamic_golden: {
    label: 'Islamic Golden', labelUrdu: 'اسلامی گولڈ', icon: '✦',
    bg: ['#FFF8E1', '#FFF3C4', '#FFF9F0'],
    text: '#B8860B', accent: '#D4A017',
    overlay: 'rgba(255,248,225,0.4)',
    description: 'Luminous gold with Islamic elegance',
  },
  military: {
    label: 'Military', labelUrdu: 'فوجی', icon: '🎖️',
    bg: ['#1B2A1B', '#253525', '#2F4030'],
    text: '#CCFF66', accent: '#FFCC00',
    overlay: 'rgba(27,42,27,0.55)',
    description: 'Tactical, disciplined, powerful',
  },
  nature: {
    label: 'Nature', labelUrdu: 'قدرت', icon: '🌿',
    bg: ['#1B5E20', '#2E7D32', '#388E3C'],
    text: '#FFFFFF', accent: '#FFEE58',
    overlay: 'rgba(27,94,32,0.35)',
    description: 'Organic, fresh, calming',
  },
  dark_epic: {
    label: 'Dark Epic', labelUrdu: 'ڈارک ایپک', icon: '⚔️',
    bg: ['#0D0D0D', '#111111', '#1A1A1A'],
    text: '#C0A060', accent: '#FF4400',
    overlay: 'rgba(0,0,0,0.75)',
    description: 'Epic, cinematic, high-stakes',
  },
  watercolor: {
    label: 'Watercolor', labelUrdu: 'آبرنگ', icon: '🎨',
    bg: ['#FFF0E8', '#FFE8D6', '#FFDFC4'],
    text: '#4A2C0A', accent: '#E65100',
    overlay: 'rgba(255,240,232,0.3)',
    description: 'Soft, artistic, hand-painted',
  },
};

// ============================================================
// SCENE TEMPLATES (Pre-made scenes for various genres)
// ============================================================
export const SCENE_PRESET_ICONS: Record<string, string> = {
  'opening': '🎬', 'briefing': '📋', 'action': '⚔️', 'emotional': '💔',
  'climax': '🔥', 'ending': '🌅', 'tribute': '🎖️', 'battle': '💥',
  'celebration': '🎉', 'tragedy': '😢', 'mystery': '🔍', 'romance': '💕',
  'comedy': '😄', 'horror': '👻', 'sci-fi': '🚀', 'fantasy': '🧚',
  'historical': '📜', 'documentary': '🎥', 'nature': '🌿', 'city': '🏙️',
};

export const STORYBOARD_GENRES = [
  { id: 'military', label: 'فوجی', labelEn: 'Military', icon: '🎖️' },
  { id: 'drama', label: 'ڈرامہ', labelEn: 'Drama', icon: '🎭' },
  { id: 'action', label: 'ایکشن', labelEn: 'Action', icon: '⚔️' },
  { id: 'islamic', label: 'اسلامی', labelEn: 'Islamic', icon: '☪️' },
  { id: 'documentary', label: 'دستاویزی', labelEn: 'Documentary', icon: '🎥' },
  { id: 'national', label: 'قومی', labelEn: 'National', icon: '🇵🇰' },
  { id: 'cinematic', label: 'سینماتک', labelEn: 'Cinematic', icon: '🎬' },
  { id: 'presentation', label: 'پریزینٹیشن', labelEn: 'Presentation', icon: '📊' },
  { id: 'educational', label: 'تعلیمی', labelEn: 'Educational', icon: '📚' },
  { id: 'social', label: 'سماجی', labelEn: 'Social Media', icon: '📱' },
];

// ============================================================
// PARSER KEYWORDS (Smart Scene Detection)
// ============================================================
export const SCENE_HEADING_PATTERNS = [
  /^#{1,4}\s*\*?\*?(\d+)[.\-–]\s*(.*?)(?:\((.+?)\))?\*?\*?/m,
  /^(\d+)[.\-–]\s*(?:\*\*)?(.+?)(?:\*\*)?$/m,
  /^(?:سین|منظر|Scene|SCENE)\s*(\d+)/i,
];

export const SCENE_FIELD_KEYWORDS: Record<string, string[]> = {
  visuals: ['**منظر:**', 'منظر:', '**Visuals:**', 'Visuals:', '**Visual:**', '**Scene:**', '**Background:**'],
  music: ['**بیک گراؤنڈ میوزک:**', 'بیک گراؤنڈ میوزک:', '**Background Music:**', 'Music:', '**میوزک:**'],
  dialogue: ['**مکالمہ:**', 'Dialogue:', '**آواز:**', '**Text:**', '**Content:**'],
  location: ['**مقام:**', 'Location:', '**جگہ:**', '**Setting:**'],
  note: ['**نوٹ:**', 'Note:', '**یاد رہے:**'],
};

// ============================================================
// DEFAULT SCENE STYLES PER GENRE
// ============================================================
export const GENRE_DEFAULT_STYLES: Record<string, SceneStyle> = {
  military: 'military',
  drama: 'dramatic',
  action: 'dark_epic',
  islamic: 'islamic_golden',
  documentary: 'documentary',
  national: 'military',
  cinematic: 'cinematic',
  presentation: 'professional',
  educational: 'minimal',
  social: 'futuristic',
};

// ============================================================
// PRE-MADE STORYBOARD TEMPLATES (Ready to apply)
// ============================================================
export const STORYBOARD_READY_TEMPLATES: {
  id: string; title: string; titleUrdu: string; genre: string;
  style: SceneStyle; icon: string; description: string;
  scenes: Partial<StoryboardScene>[];
}[] = [
  {
    id: 'sb_military_1',
    title: 'SHADOW FORCE: Special Ops',
    titleUrdu: 'شیڈو فورس: خصوصی آپریشن',
    genre: 'military',
    style: 'military',
    icon: '🎖️',
    description: 'Pakistani special forces counter-terrorism thriller',
    scenes: [
      { sceneNumber: 1, titleUrdu: 'اوپننگ سین', title: 'Opening Scene', visualsDescription: 'SSG ہیڈکوارٹر، ٹیم کی تشکیل، پاکستانی پرچم', backgroundMusic: 'پاکستان کا قومی ترانہ (آرکسٹرا)', location: 'SSG HQ', duration: '3 min', icon: '🎬', style: 'military' },
      { sceneNumber: 2, titleUrdu: 'مشن بریفنگ', title: 'Mission Briefing', visualsDescription: 'نقشے، انٹیلیجنس رپورٹس، ٹیم آمادہ', backgroundMusic: 'ہم تیرے سپاہی (Instrumental)', location: 'Operations Room', duration: '4 min', icon: '📋', style: 'professional' },
      { sceneNumber: 3, titleUrdu: 'پہلی جھڑپ', title: 'First Combat', visualsDescription: 'ہل اسٹیشن، رات کا حملہ، چھپ کر کارروائی', backgroundMusic: 'نعرہ تکبیر (Digital Orchestra)', location: 'Hill Station', duration: '6 min', icon: '⚔️', style: 'dark_epic' },
      { sceneNumber: 4, titleUrdu: 'شہادت', title: 'Martyrdom', visualsDescription: 'شہید کی قربانی، ساتھیوں کا غم', backgroundMusic: 'خودی کا سر نہاں (Slow Version)', location: 'Battle Zone', duration: '3 min', icon: '💔', style: 'dramatic' },
      { sceneNumber: 5, titleUrdu: 'فتح', title: 'Victory', visualsDescription: 'لیب تباہ، ٹیم واپسی، پرچم لہراتا', backgroundMusic: 'پاکستان کا قومی ترانہ (Full Orchestra)', location: 'Victory Point', duration: '5 min', icon: '🏆', style: 'military' },
    ],
  },
  {
    id: 'sb_islamic_1',
    title: 'Islamic Documentary',
    titleUrdu: 'اسلامی دستاویزی',
    genre: 'islamic',
    style: 'islamic_golden',
    icon: '☪️',
    description: 'Beautiful Islamic history and culture documentary',
    scenes: [
      { sceneNumber: 1, titleUrdu: 'بسم اللہ', title: 'In the Name of Allah', visualsDescription: 'خانہ کعبہ، طلوع آفتاب، قرآن پاک', backgroundMusic: 'قرآن تلاوت', location: 'Mecca', duration: '2 min', icon: '✦', style: 'islamic_golden' },
      { sceneNumber: 2, titleUrdu: 'مدینہ منورہ', title: 'Madinah', visualsDescription: 'مسجد نبوی، روضہ مبارک، عازمین حج', backgroundMusic: 'درود شریف (قوالی)', location: 'Madinah', duration: '4 min', icon: '🕌', style: 'royal' },
      { sceneNumber: 3, titleUrdu: 'اسلامی تاریخ', title: 'Islamic History', visualsDescription: 'قدیم نقشے، خلافت راشدہ، فتوحات', backgroundMusic: 'قومی ترانہ اسلامی ورژن', location: 'Historical Arabia', duration: '5 min', icon: '📜', style: 'vintage' },
    ],
  },
  {
    id: 'sb_national_1',
    title: 'Pakistan Tribute',
    titleUrdu: 'پاکستان خراجِ عقیدت',
    genre: 'national',
    style: 'military',
    icon: '🇵🇰',
    description: 'A tribute to the heroes of Pakistan',
    scenes: [
      { sceneNumber: 1, titleUrdu: 'آزادی کا سفر', title: 'Journey to Freedom', visualsDescription: '1947 تقسیم، مہاجرین، قائداعظم', backgroundMusic: 'پاکستان زندہ باد', location: 'Lahore 1947', duration: '5 min', icon: '🏳️', style: 'documentary' },
      { sceneNumber: 2, titleUrdu: 'شہداء کو سلام', title: 'Salute to Martyrs', visualsDescription: 'یادگار شہداء، سبز ہلالی پرچم', backgroundMusic: 'یہ وطن تمہارا ہے', location: 'Martyrs Memorial', duration: '3 min', icon: '🎖️', style: 'dramatic' },
      { sceneNumber: 3, titleUrdu: 'روشن مستقبل', title: 'Bright Future', visualsDescription: 'نئی نسل، ترقی، روشنی', backgroundMusic: 'ایک ہے پاکستان', location: 'Islamabad', duration: '4 min', icon: '🌅', style: 'professional' },
    ],
  },
  {
    id: 'sb_social_1',
    title: 'Social Media Reel',
    titleUrdu: 'سوشل میڈیا ریل',
    genre: 'social',
    style: 'futuristic',
    icon: '📱',
    description: 'Eye-catching social media content template',
    scenes: [
      { sceneNumber: 1, titleUrdu: 'ہک اوپن', title: 'Hook Opening', visualsDescription: 'چمکتی تصویر، بڑا ٹیکسٹ، فاسٹ کٹ', backgroundMusic: 'Trending Beat (No Copyright)', location: 'Studio', duration: '3 sec', icon: '⚡', style: 'neon' },
      { sceneNumber: 2, titleUrdu: 'مین کنٹینٹ', title: 'Main Content', visualsDescription: 'پروڈکٹ/خیال/پیغام واضح طور پر', backgroundMusic: 'Ambient Loop', location: 'Studio', duration: '20 sec', icon: '🎯', style: 'minimal' },
      { sceneNumber: 3, titleUrdu: 'کال ٹو ایکشن', title: 'Call to Action', visualsDescription: 'فالو/لائک/شیئر، لوگو، رابطہ', backgroundMusic: 'Upbeat Outro', location: 'Studio', duration: '5 sec', icon: '🔔', style: 'futuristic' },
    ],
  },
  {
    id: 'sb_drama_1',
    title: 'Emotional Drama',
    titleUrdu: 'جذباتی ڈرامہ',
    genre: 'drama',
    style: 'dramatic',
    icon: '🎭',
    description: 'Urdu drama with rich emotional scenes',
    scenes: [
      { sceneNumber: 1, titleUrdu: 'ملاقات', title: 'First Meeting', visualsDescription: 'دو کردار، صبح کی روشنی، پھولوں کا باغ', backgroundMusic: 'نرم پس منظر موسیقی', location: 'Park', duration: '4 min', icon: '💕', style: 'watercolor' },
      { sceneNumber: 2, titleUrdu: 'جدائی', title: 'Separation', visualsDescription: 'بارش، اندھیرا، خاموشی', backgroundMusic: 'اداس سرنگم', location: 'Station', duration: '3 min', icon: '💔', style: 'dramatic' },
      { sceneNumber: 3, titleUrdu: 'ملن', title: 'Reunion', visualsDescription: 'سنہری روشنی، خوشی، گلے ملنا', backgroundMusic: 'خوشی کا گیت', location: 'Home', duration: '5 min', icon: '🌅', style: 'cinematic' },
    ],
  },
];

// ============================================================
// SMART PARSER: Convert raw text to storyboard scenes
// ============================================================
export function parseTextToScenes(
  rawText: string,
  defaultStyle: SceneStyle = 'cinematic',
  genre: string = 'cinematic'
): StoryboardScene[] {
  const scenes: StoryboardScene[] = [];
  const lines = rawText.split('\n');
  let currentScene: Partial<StoryboardScene> | null = null;
  let sceneCounter = 0;
  let inField: string | null = null;
  let fieldBuffer: string[] = [];

  const flushField = () => {
    if (!currentScene || !inField || !fieldBuffer.length) return;
    const content = fieldBuffer.join('\n').trim();
    if (inField === 'visuals') currentScene.visualsDescription = content;
    else if (inField === 'music') currentScene.backgroundMusic = content;
    else if (inField === 'location') currentScene.location = content;
    else if (inField === 'note') currentScene.note = content;
    else if (inField === 'dialogue') {
      currentScene.dialogues = currentScene.dialogues || [];
      currentScene.dialogues.push(content);
    }
    inField = null;
    fieldBuffer = [];
  };

  const pushScene = () => {
    if (!currentScene || !currentScene.titleUrdu) return;
    flushField();
    const style = currentScene.style || defaultStyle;
    const styleInfo = SCENE_STYLES[style];
    scenes.push({
      id: 'sc_' + Date.now() + '_' + sceneCounter,
      sceneNumber: currentScene.sceneNumber || sceneCounter,
      title: currentScene.title || `Scene ${sceneCounter}`,
      titleUrdu: currentScene.titleUrdu || `سین ${sceneCounter}`,
      description: currentScene.description || '',
      visualsDescription: currentScene.visualsDescription || '',
      backgroundMusic: currentScene.backgroundMusic || '',
      dialogues: currentScene.dialogues || [],
      style,
      bgColors: styleInfo.bg,
      textColor: styleInfo.text,
      accentColor: styleInfo.accent,
      overlayOpacity: 0.6,
      duration: currentScene.duration || '3 min',
      location: currentScene.location || '',
      tags: currentScene.tags || [genre],
      icon: currentScene.icon || '🎬',
      note: currentScene.note || '',
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) { if (inField) { fieldBuffer.push(''); } continue; }

    // Detect scene heading: #### 1. Title / 1. Title / سین 1
    const sceneHeading =
      /^#{1,4}\s*\*?\*?(\d+)[.\-–]\s*(.*?)(?:\s*\((.+?)\))?\*?\*?\s*$/.exec(trimmed) ||
      /^(\d+)[.\-–]\s+\*?\*?(.+?)\*?\*?\s*$/.exec(trimmed);

    if (sceneHeading) {
      pushScene();
      sceneCounter++;
      const num = parseInt(sceneHeading[1], 10);
      const rawTitle = (sceneHeading[2] || '').replace(/\*\*/g, '').trim();
      const parenPart = sceneHeading[3] || '';

      // Determine if title is Urdu or English
      const isUrdu = /[\u0600-\u06FF]/.test(rawTitle);
      const englishTitle = parenPart || (isUrdu ? `Scene ${num}` : rawTitle);
      const urduTitle = isUrdu ? rawTitle : (parenPart && /[\u0600-\u06FF]/.test(parenPart) ? parenPart : rawTitle);

      // Detect style from keywords
      let detectedStyle: SceneStyle = GENRE_DEFAULT_STYLES[genre] || defaultStyle;
      const lc = rawTitle.toLowerCase();
      if (lc.includes('open') || lc.includes('اوپننگ')) detectedStyle = 'cinematic';
      else if (lc.includes('action') || lc.includes('combat') || lc.includes('جھڑپ') || lc.includes('حملہ')) detectedStyle = 'dark_epic';
      else if (lc.includes('emotion') || lc.includes('tribute') || lc.includes('شہادت') || lc.includes('خراج')) detectedStyle = 'dramatic';
      else if (lc.includes('victory') || lc.includes('فتح') || lc.includes('ending') || lc.includes('final')) detectedStyle = genre === 'military' ? 'military' : 'cinematic';
      else if (lc.includes('brief') || lc.includes('mission') || lc.includes('بریفنگ') || lc.includes('مشن')) detectedStyle = 'professional';
      else if (lc.includes('islamic') || lc.includes('اسلام') || lc.includes('قرآن') || lc.includes('مسجد')) detectedStyle = 'islamic_golden';
      else if (lc.includes('credit') || lc.includes('کریڈٹ')) detectedStyle = 'documentary';

      const icon = Object.entries(SCENE_PRESET_ICONS).find(([k]) => lc.includes(k))?.[1] || '🎬';

      currentScene = {
        sceneNumber: num,
        title: englishTitle,
        titleUrdu: urduTitle,
        style: detectedStyle,
        icon,
        dialogues: [],
        tags: [genre],
      };
      inField = null;
      fieldBuffer = [];
      continue;
    }

    // If we haven't found a scene yet, create a default one
    if (!currentScene && trimmed.length > 5) {
      sceneCounter++;
      currentScene = {
        sceneNumber: sceneCounter,
        title: 'Scene 1',
        titleUrdu: 'سین 1',
        style: defaultStyle,
        icon: '🎬',
        dialogues: [],
        tags: [genre],
      };
    }

    if (!currentScene) continue;

    // Detect field keywords
    let foundField = false;
    for (const [field, keywords] of Object.entries(SCENE_FIELD_KEYWORDS)) {
      for (const kw of keywords) {
        if (trimmed.startsWith(kw) || trimmed.toLowerCase().startsWith(kw.toLowerCase())) {
          flushField();
          inField = field;
          const rest = trimmed.slice(kw.length).replace(/^:\s*/, '').trim();
          if (rest) fieldBuffer.push(rest);
          foundField = true;
          break;
        }
      }
      if (foundField) break;
    }
    if (foundField) continue;

    // Detect bullet points (- **text** or • text)
    const bullet = /^[-•*]\s+(.+)/.exec(trimmed);
    if (bullet) {
      const content = bullet[1].replace(/\*\*/g, '').trim();
      if (inField) {
        fieldBuffer.push(content);
      } else if (!currentScene.visualsDescription && /[\u0600-\u06FF]/.test(content)) {
        currentScene.visualsDescription = (currentScene.visualsDescription || '') + (currentScene.visualsDescription ? ', ' : '') + content;
      } else if (content.includes('Music') || content.includes('میوزک') || content.includes('ترانہ') || content.includes('گانا') || content.includes('نغمہ')) {
        const music = content.replace(/^\*\*"?|"?\*\*$/g, '').trim();
        currentScene.backgroundMusic = (currentScene.backgroundMusic || '') + (currentScene.backgroundMusic ? ' | ' : '') + music;
      } else {
        if (inField) fieldBuffer.push(content);
      }
      continue;
    }

    // Regular content line
    if (inField) {
      fieldBuffer.push(trimmed.replace(/\*\*/g, ''));
    } else if (!currentScene.description && trimmed.length > 10) {
      currentScene.description = trimmed.replace(/\*\*/g, '');
    }
  }

  pushScene();

  // If no scenes detected, create one from whole text
  if (scenes.length === 0 && rawText.trim().length > 10) {
    const styleInfo = SCENE_STYLES[defaultStyle];
    scenes.push({
      id: 'sc_' + Date.now() + '_1',
      sceneNumber: 1,
      title: 'Scene 1',
      titleUrdu: 'سین 1',
      description: rawText.slice(0, 200),
      visualsDescription: rawText.slice(0, 300),
      backgroundMusic: '',
      dialogues: [],
      style: defaultStyle,
      bgColors: styleInfo.bg,
      textColor: styleInfo.text,
      accentColor: styleInfo.accent,
      overlayOpacity: 0.6,
      duration: '3 min',
      location: '',
      tags: [genre],
      icon: '🎬',
      note: '',
    });
  }

  return scenes;
}

export function createEmptyScene(num: number, style: SceneStyle = 'cinematic'): StoryboardScene {
  const styleInfo = SCENE_STYLES[style];
  return {
    id: 'sc_' + Date.now() + '_' + num,
    sceneNumber: num,
    title: `Scene ${num}`,
    titleUrdu: `سین ${num}`,
    description: '',
    visualsDescription: '',
    backgroundMusic: '',
    dialogues: [],
    style,
    bgColors: styleInfo.bg,
    textColor: styleInfo.text,
    accentColor: styleInfo.accent,
    overlayOpacity: 0.6,
    duration: '3 min',
    location: '',
    tags: [],
    icon: '🎬',
    note: '',
  };
}
