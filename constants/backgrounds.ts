// eVeR sMaRt UrDu sTuDiO - 50 Bright Texture Collections

export interface Background {
  id: string;
  name: string;
  nameUrdu: string;
  category: string;
  type: 'color' | 'gradient' | 'pattern' | 'texture' | 'digital';
  colors: string[];
  pattern?: string;
  icon: string;
  tags: string[];
}

export const BACKGROUND_CATEGORIES = [
  'سب', 'اسلامی', 'جیومیٹرک', 'رنگین', 'گریڈینٹ', 'قدرتی', 'کلاسک', 'ٹیکسچر', 'ڈیجیٹل', 'پھول'
];

export const TEXTURE_COLLECTIONS = [
  {
    id: 'tc1',
    name: 'اسلامی ٹیکسچر',
    nameUrdu: 'اسلامی ٹیکسچر',
    count: 10,
    icon: '☪',
    color: '#2E7D32',
    textures: ['bg17', 'bg18', 'bg19', 'bg20', 'bg21', 'bg22', 'bg45', 'bg46', 'bg47', 'bg48'],
  },
  {
    id: 'tc2',
    name: 'جیومیٹرک ٹیکسچر',
    nameUrdu: 'جیومیٹرک ٹیکسچر',
    count: 8,
    icon: '◈',
    color: '#1565C0',
    textures: ['bg18', 'bg19', 'bg50', 'bg37', 'bg38', 'bg39', 'bg40', 'bg41'],
  },
  {
    id: 'tc3',
    name: 'قدرتی ٹیکسچر',
    nameUrdu: 'قدرتی ٹیکسچر',
    count: 10,
    icon: '🌿',
    color: '#43A047',
    textures: ['bg7', 'bg8', 'bg9', 'bg10', 'bg11', 'bg12', 'bg13', 'bg14', 'bg15', 'bg16'],
  },
  {
    id: 'tc4',
    name: 'پھول ٹیکسچر',
    nameUrdu: 'پھول ٹیکسچر',
    count: 6,
    icon: '🌸',
    color: '#AD1457',
    textures: ['bg42', 'bg43', 'bg44', 'bg45', 'bg46', 'bg47'],
  },
  {
    id: 'tc5',
    name: 'ڈیجیٹل ٹیکسچر',
    nameUrdu: 'ڈیجیٹل ٹیکسچر',
    count: 8,
    icon: '💎',
    color: '#00897B',
    textures: ['bg28', 'bg29', 'bg30', 'bg31', 'bg32', 'bg33', 'bg34', 'bg35'],
  },
];

export const BACKGROUNDS: Background[] = [
  // ===== BRIGHT WHITES & CREAMS =====
  { id: 'bg1', name: 'Pure White', nameUrdu: 'خالص سفید', category: 'کلاسک', type: 'color', colors: ['#FFFFFF'], icon: '⬜', tags: ['سفید', 'خالص', 'صاف'] },
  { id: 'bg2', name: 'Warm Cream', nameUrdu: 'گرم کریم', category: 'کلاسک', type: 'gradient', colors: ['#FFF9F0', '#FFF3DC'], icon: '🌟', tags: ['کریم', 'گرم', 'کلاسک'] },
  { id: 'bg3', name: 'Ivory Gold', nameUrdu: 'ہاتھی دانت', category: 'کلاسک', type: 'gradient', colors: ['#FFFFF0', '#FFF8DC'], icon: '🏛️', tags: ['ہاتھی دانت', 'سونا'] },
  { id: 'bg4', name: 'Pearl White', nameUrdu: 'موتی سفید', category: 'کلاسک', type: 'gradient', colors: ['#FAFAFA', '#F5F5F5'], icon: '🔘', tags: ['موتی', 'سفید'] },
  { id: 'bg5', name: 'Snow Fresh', nameUrdu: 'برف تازہ', category: 'کلاسک', type: 'color', colors: ['#F8F9FA'], icon: '❄️', tags: ['برف', 'تازہ', 'صاف'] },

  // ===== LIGHT GOLD & YELLOW =====
  { id: 'bg6', name: 'Golden Light', nameUrdu: 'سنہری روشنی', category: 'اسلامی', type: 'gradient', colors: ['#FFF8E1', '#FFFDE7'], icon: '✨', tags: ['سونا', 'روشنی'] },
  { id: 'bg7', name: 'Sunrise Gold', nameUrdu: 'طلوع سونا', category: 'گریڈینٹ', type: 'gradient', colors: ['#FFF9F0', '#FFF3CC', '#FFE082'], icon: '🌅', tags: ['طلوع', 'سونا'] },
  { id: 'bg8', name: 'Honey Glow', nameUrdu: 'شہد چمک', category: 'قدرتی', type: 'gradient', colors: ['#FFF8DC', '#FFEAA7'], icon: '🍯', tags: ['شہد', 'چمک'] },
  { id: 'bg9', name: 'Lemon Fresh', nameUrdu: 'لیموں تازہ', category: 'رنگین', type: 'gradient', colors: ['#FFFDE7', '#FFF9C4'], icon: '🍋', tags: ['لیموں', 'تازہ'] },
  { id: 'bg10', name: 'Amber Warm', nameUrdu: 'کہربا گرم', category: 'قدرتی', type: 'gradient', colors: ['#FFF8E1', '#FFE0B2'], icon: '🌞', tags: ['کہربا', 'گرم'] },

  // ===== LIGHT GREEN =====
  { id: 'bg11', name: 'Islamic Green Light', nameUrdu: 'اسلامی سبز روشن', category: 'اسلامی', type: 'gradient', colors: ['#E8F5E9', '#F1F8E9'], icon: '☪', tags: ['اسلامی', 'سبز'] },
  { id: 'bg12', name: 'Mint Fresh', nameUrdu: 'پودینہ تازہ', category: 'قدرتی', type: 'gradient', colors: ['#E0F2F1', '#E8F5E9'], icon: '🌿', tags: ['پودینہ', 'سبز'] },
  { id: 'bg13', name: 'Sage Green', nameUrdu: 'سیج سبز', category: 'قدرتی', type: 'gradient', colors: ['#F1F8E9', '#DCEDC8'], icon: '🌱', tags: ['سیج', 'سبز'] },
  { id: 'bg14', name: 'Emerald Light', nameUrdu: 'زمرد روشن', category: 'اسلامی', type: 'gradient', colors: ['#E8F5E9', '#C8E6C9'], icon: '💚', tags: ['زمرد', 'اسلامی'] },
  { id: 'bg15', name: 'Forest Mist', nameUrdu: 'جنگل دھند', category: 'قدرتی', type: 'gradient', colors: ['#F1F8E9', '#E8F5E9'], icon: '🌲', tags: ['جنگل', 'دھند'] },

  // ===== LIGHT BLUE =====
  { id: 'bg16', name: 'Sky Blue Light', nameUrdu: 'آسمانی روشن', category: 'رنگین', type: 'gradient', colors: ['#E3F2FD', '#E1F5FE'], icon: '☁️', tags: ['آسمانی', 'نیلا'] },
  { id: 'bg17', name: 'Royal Blue Light', nameUrdu: 'شاہی نیلا روشن', category: 'کلاسک', type: 'gradient', colors: ['#EDE7F6', '#E3F2FD'], icon: '👑', tags: ['شاہی', 'نیلا'] },
  { id: 'bg18', name: 'Ocean Breeze', nameUrdu: 'سمندری ہوا', category: 'قدرتی', type: 'gradient', colors: ['#E0F7FA', '#E1F5FE'], icon: '🌊', tags: ['سمندر', 'ہوا'] },
  { id: 'bg19', name: 'Ice Crystal', nameUrdu: 'برف کرسٹل', category: 'رنگین', type: 'gradient', colors: ['#F3E5F5', '#E8EAF6'], icon: '❄️', tags: ['برف', 'کرسٹل'] },
  { id: 'bg20', name: 'Powder Blue', nameUrdu: 'پاؤڈر نیلا', category: 'رنگین', type: 'gradient', colors: ['#ECEFF1', '#E3F2FD'], icon: '💎', tags: ['پاؤڈر', 'نیلا'] },

  // ===== LIGHT PINK & PURPLE =====
  { id: 'bg21', name: 'Rose Blush', nameUrdu: 'گلابی شرم', category: 'پھول', type: 'gradient', colors: ['#FCE4EC', '#F8BBD0'], icon: '🌸', tags: ['گلابی', 'پھول'] },
  { id: 'bg22', name: 'Lavender Dream', nameUrdu: 'لیوینڈر خواب', category: 'پھول', type: 'gradient', colors: ['#F3E5F5', '#EDE7F6'], icon: '💜', tags: ['لیوینڈر', 'جامنی'] },
  { id: 'bg23', name: 'Lilac Mist', nameUrdu: 'لیلک دھند', category: 'رنگین', type: 'gradient', colors: ['#EDE7F6', '#F3E5F5'], icon: '🔮', tags: ['لیلک', 'دھند'] },
  { id: 'bg24', name: 'Cherry Blossom', nameUrdu: 'چیری پھول', category: 'پھول', type: 'gradient', colors: ['#FCE4EC', '#F3E5F5'], icon: '🌺', tags: ['چیری', 'پھول'] },
  { id: 'bg25', name: 'Peach Soft', nameUrdu: 'آڑو نرم', category: 'پھول', type: 'gradient', colors: ['#FBE9E7', '#FCE4EC'], icon: '🍑', tags: ['آڑو', 'نرم'] },

  // ===== ISLAMIC PATTERNS (Bright) =====
  { id: 'bg26', name: 'Arabesque Gold', nameUrdu: 'عربی نقش سونا', category: 'اسلامی', type: 'pattern', colors: ['#FFF8E1', '#D4A017'], pattern: 'arabesque', icon: '🔯', tags: ['عربی', 'نقش', 'سونا'] },
  { id: 'bg27', name: 'Geometric Islamic', nameUrdu: 'جیومیٹرک اسلامی', category: 'جیومیٹرک', type: 'pattern', colors: ['#E8F5E9', '#2E7D32'], pattern: 'geometric', icon: '🔷', tags: ['جیومیٹرک', 'اسلامی'] },
  { id: 'bg28', name: 'Star Pattern Gold', nameUrdu: 'ستارہ نقش سونا', category: 'اسلامی', type: 'pattern', colors: ['#FFFDE7', '#F9A825'], pattern: 'stars', icon: '⭐', tags: ['ستارہ', 'سونا'] },
  { id: 'bg29', name: 'Mosque Bright', nameUrdu: 'مسجد روشن', category: 'اسلامی', type: 'pattern', colors: ['#E3F2FD', '#1565C0'], pattern: 'mosque', icon: '🕌', tags: ['مسجد', 'روشن'] },
  { id: 'bg30', name: 'Crescent Stars', nameUrdu: 'ہلال ستارے', category: 'اسلامی', type: 'pattern', colors: ['#F3E5F5', '#7B1FA2'], pattern: 'crescent', icon: '☪️', tags: ['ہلال', 'ستارہ'] },
  { id: 'bg31', name: 'Kufic Border', nameUrdu: 'کوفی حاشیہ', category: 'اسلامی', type: 'pattern', colors: ['#FFF8E1', '#B8860B'], pattern: 'kufic', icon: '🔲', tags: ['کوفی', 'حاشیہ'] },
  { id: 'bg32', name: 'Floral Islamic', nameUrdu: 'پھولوں کا اسلامی', category: 'اسلامی', type: 'pattern', colors: ['#E8F5E9', '#43A047'], pattern: 'floral', icon: '🌺', tags: ['پھول', 'اسلامی'] },
  { id: 'bg33', name: 'Lattice Gold', nameUrdu: 'سونے کی جالی', category: 'جیومیٹرک', type: 'pattern', colors: ['#FFF8E1', '#D4A017'], pattern: 'lattice', icon: '🔲', tags: ['جالی', 'سونا'] },

  // ===== MARBLE TEXTURES =====
  { id: 'bg34', name: 'White Marble', nameUrdu: 'سفید سنگ مرمر', category: 'ٹیکسچر', type: 'texture', colors: ['#FAFAFA', '#F5F5F5'], icon: '🏛️', tags: ['سنگ مرمر', 'سفید'] },
  { id: 'bg35', name: 'Cream Marble', nameUrdu: 'کریمی سنگ مرمر', category: 'ٹیکسچر', type: 'texture', colors: ['#FFF8F0', '#FFF0E0'], icon: '🏛️', tags: ['سنگ مرمر', 'کریمی'] },
  { id: 'bg36', name: 'Gold Marble', nameUrdu: 'سونے کا سنگ مرمر', category: 'ٹیکسچر', type: 'texture', colors: ['#FFF8E1', '#D4A017'], icon: '🏆', tags: ['سونا', 'سنگ مرمر'] },
  { id: 'bg37', name: 'Rose Marble', nameUrdu: 'گلابی سنگ مرمر', category: 'ٹیکسچر', type: 'texture', colors: ['#FCE4EC', '#F8BBD0'], icon: '🌸', tags: ['گلابی', 'سنگ مرمر'] },
  { id: 'bg38', name: 'Green Marble', nameUrdu: 'سبز سنگ مرمر', category: 'ٹیکسچر', type: 'texture', colors: ['#E8F5E9', '#C8E6C9'], icon: '💚', tags: ['سبز', 'سنگ مرمر'] },
  { id: 'bg39', name: 'Blue Marble', nameUrdu: 'نیلا سنگ مرمر', category: 'ٹیکسچر', type: 'texture', colors: ['#E3F2FD', '#BBDEFB'], icon: '💎', tags: ['نیلا', 'سنگ مرمر'] },

  // ===== PAPER & FABRIC TEXTURES =====
  { id: 'bg40', name: 'Old Paper', nameUrdu: 'پرانا کاغذ', category: 'ٹیکسچر', type: 'texture', colors: ['#FFF8DC', '#F5E6C8'], icon: '📜', tags: ['کاغذ', 'پرانا'] },
  { id: 'bg41', name: 'Parchment', nameUrdu: 'پارچمنٹ', category: 'ٹیکسچر', type: 'texture', colors: ['#FFF9F0', '#F5EDD8'], icon: '📜', tags: ['پارچمنٹ', 'کلاسک'] },
  { id: 'bg42', name: 'Linen White', nameUrdu: 'کتان سفید', category: 'ٹیکسچر', type: 'texture', colors: ['#FAFAF8', '#F5F5F2'], icon: '🧵', tags: ['کپڑا', 'سفید'] },
  { id: 'bg43', name: 'Silk Gold', nameUrdu: 'ریشم سونا', category: 'ٹیکسچر', type: 'texture', colors: ['#FFF8E1', '#FFE082'], icon: '🎀', tags: ['ریشم', 'سونا'] },
  { id: 'bg44', name: 'Velvet Green', nameUrdu: 'مخمل سبز', category: 'ٹیکسچر', type: 'texture', colors: ['#E8F5E9', '#A5D6A7'], icon: '🎭', tags: ['مخمل', 'سبز'] },

  // ===== FLORAL TEXTURES =====
  { id: 'bg45', name: 'Rose Garden', nameUrdu: 'گلاب باغ', category: 'پھول', type: 'pattern', colors: ['#FCE4EC', '#E91E63'], pattern: 'roses', icon: '🌹', tags: ['گلاب', 'باغ'] },
  { id: 'bg46', name: 'Jasmine', nameUrdu: 'چنبیلی', category: 'پھول', type: 'pattern', colors: ['#FFFDE7', '#FFC107'], pattern: 'jasmine', icon: '🌼', tags: ['چنبیلی', 'پھول'] },
  { id: 'bg47', name: 'Lotus', nameUrdu: 'کمل', category: 'پھول', type: 'pattern', colors: ['#FCE4EC', '#F8BBD0'], pattern: 'lotus', icon: '🪷', tags: ['کمل', 'پھول'] },
  { id: 'bg48', name: 'Tulip', nameUrdu: 'ٹیولپ', category: 'پھول', type: 'pattern', colors: ['#F3E5F5', '#CE93D8'], pattern: 'tulip', icon: '🌷', tags: ['ٹیولپ', 'پھول'] },

  // ===== DIGITAL GRADIENTS =====
  { id: 'bg49', name: 'Digital Gold', nameUrdu: 'ڈیجیٹل سونا', category: 'ڈیجیٹل', type: 'digital', colors: ['#FFF8E1', '#FFD54F', '#FFC107'], icon: '💡', tags: ['ڈیجیٹل', 'سونا'] },
  { id: 'bg50', name: 'Digital Rainbow', nameUrdu: 'ڈیجیٹل قوس قزح', category: 'ڈیجیٹل', type: 'digital', colors: ['#E3F2FD', '#E8F5E9', '#FFF8E1', '#FCE4EC'], icon: '🌈', tags: ['قوس قزح', 'ڈیجیٹل'] },
];
