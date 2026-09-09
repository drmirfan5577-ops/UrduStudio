// eVeR sMaRt UrDu sTuDiO - Advanced Texture Collections

export interface TextureItem {
  id: string;
  name: string;
  nameUrdu: string;
  category: string;
  icon: string;
  colors: string[];
  description: string;
  cssFilter?: string;
}

export const TEXTURE_CATEGORIES = [
  'سب', 'کندہ', 'چمکدار', 'قدرتی', 'فیری', 'سنگ مرمر', 'ڈیجیٹل', 'کپڑا', 'پینٹڈ', 'خاص'
];

export const ADVANCED_TEXTURES: TextureItem[] = [
  // Carved
  { id: 'tx1', name: 'Carved Stone', nameUrdu: 'کندہ پتھر', category: 'کندہ', icon: '🪨', colors: ['#D6C9A0', '#C4B380', '#B8A070'], description: 'Stone carved texture' },
  { id: 'tx2', name: 'Carved Wood', nameUrdu: 'کندہ لکڑی', category: 'کندہ', icon: '🪵', colors: ['#D4A96A', '#C4956A', '#A0785A'], description: 'Wood carved grain' },
  { id: 'tx3', name: 'Engraved Gold', nameUrdu: 'کندہ سونا', category: 'کندہ', icon: '⚜️', colors: ['#FFD700', '#D4A017', '#B8860B'], description: 'Engraved gold surface' },
  { id: 'tx4', name: 'Relief Islamic', nameUrdu: 'اسلامی ابھار', category: 'کندہ', icon: '🕌', colors: ['#F5E6D0', '#D4A017', '#B8860B'], description: 'Islamic relief carving' },

  // Dotted
  { id: 'tx5', name: 'Gold Dots', nameUrdu: 'سونے کے نقطے', category: 'چمکدار', icon: '✨', colors: ['#FFFDE7', '#FFD700', '#D4A017'], description: 'Shimmering gold dots' },
  { id: 'tx6', name: 'Pearl Dots', nameUrdu: 'موتی نقطے', category: 'چمکدار', icon: '🔘', colors: ['#F8F6F0', '#E0D8C8', '#C4B89A'], description: 'Pearl-like dots pattern' },
  { id: 'tx7', name: 'Starry Night', nameUrdu: 'ستاروں بھری رات', category: 'چمکدار', icon: '🌟', colors: ['#F0F8FF', '#E3EFF8', '#D4E8FF'], description: 'Starry dotted background' },

  // Zigzag
  { id: 'tx8', name: 'Gold Zigzag', nameUrdu: 'سونا زگزیگ', category: 'چمکدار', icon: '⚡', colors: ['#FFF8E1', '#FFD700', '#B8860B'], description: 'Golden zigzag lines' },
  { id: 'tx9', name: 'Chevron', nameUrdu: 'شیوران', category: 'چمکدار', icon: '〉', colors: ['#FFF9F0', '#F0E0C0', '#D4B896'], description: 'Chevron pattern' },
  { id: 'tx10', name: 'Wave Lines', nameUrdu: 'لہردار لکیریں', category: 'چمکدار', icon: '〰️', colors: ['#E3F2FD', '#BBDEFB', '#90CAF9'], description: 'Wavy striped texture' },

  // Fluffy
  { id: 'tx11', name: 'White Fluffy', nameUrdu: 'سفید روئی', category: 'قدرتی', icon: '☁️', colors: ['#FFFFFF', '#F5F5F5', '#EEEEEE'], description: 'Soft fluffy cloud texture' },
  { id: 'tx12', name: 'Cream Fleece', nameUrdu: 'کریم اون', category: 'قدرتی', icon: '🐑', colors: ['#FFF9F0', '#F5EDE0', '#EDE0CC'], description: 'Creamy fleece texture' },
  { id: 'tx13', name: 'Cotton Soft', nameUrdu: 'روئی نرم', category: 'قدرتی', icon: '🌸', colors: ['#FFF0F5', '#FFE4EE', '#FFD6E5'], description: 'Cotton soft texture' },

  // Glassy
  { id: 'tx14', name: 'Glass Clear', nameUrdu: 'شیشہ صاف', category: 'چمکدار', icon: '💎', colors: ['#F0FAFF', '#E0F4FF', '#CCE8FF'], description: 'Clear glass surface' },
  { id: 'tx15', name: 'Frosted Glass', nameUrdu: 'برفی شیشہ', category: 'چمکدار', icon: '🔮', colors: ['#F8FEFF', '#ECF8FF', '#DDEFFA'], description: 'Frosted glass effect' },
  { id: 'tx16', name: 'Mirror Gold', nameUrdu: 'آئینہ سونا', category: 'چمکدار', icon: '✨', colors: ['#FFFDE7', '#FFF8B0', '#FFD700'], description: 'Golden mirror reflection' },
  { id: 'tx17', name: 'Crystal Blue', nameUrdu: 'کرسٹل نیلا', category: 'چمکدار', icon: '💎', colors: ['#E8F4FD', '#D6EDFB', '#C4E6F9'], description: 'Crystal blue shimmer' },
  { id: 'tx18', name: 'Neon Glow Glass', nameUrdu: 'نیون چمک شیشہ', category: 'چمکدار', icon: '💡', colors: ['#F0FFF0', '#E0FFE8', '#C8FFC8'], description: 'Glowing neon glass' },

  // Fairy
  { id: 'tx19', name: 'Fairy Pink', nameUrdu: 'پری گلابی', category: 'فیری', icon: '🧚', colors: ['#FFF0F8', '#FFE4F5', '#FFD6EC'], description: 'Magical fairy pink' },
  { id: 'tx20', name: 'Fairy Gold', nameUrdu: 'پری سونا', category: 'فیری', icon: '⭐', colors: ['#FFFFF0', '#FFFADA', '#FFF5B0'], description: 'Fairy tale golden dust' },
  { id: 'tx21', name: 'Enchanted Forest', nameUrdu: 'جادوئی جنگل', category: 'فیری', icon: '🌿', colors: ['#F0FFF0', '#E8FFF0', '#D4FFE0'], description: 'Enchanted green forest' },
  { id: 'tx22', name: 'Stardust', nameUrdu: 'ستاروں کی دھول', category: 'فیری', icon: '🌠', colors: ['#F0F4FF', '#E8EDFF', '#DDE5FF'], description: 'Sparkling stardust' },

  // Painted
  { id: 'tx23', name: 'Watercolor Cream', nameUrdu: 'پانی رنگ کریم', category: 'پینٹڈ', icon: '🎨', colors: ['#FFF9F0', '#F5EDD8', '#F0E5CC'], description: 'Watercolor cream wash' },
  { id: 'tx24', name: 'Oil Paint Gold', nameUrdu: 'تیل رنگ سونا', category: 'پینٹڈ', icon: '🖌️', colors: ['#FFF8E1', '#FFE082', '#FFD54F'], description: 'Oil painted golden strokes' },
  { id: 'tx25', name: 'Ink Wash', nameUrdu: 'سیاہی دھلائی', category: 'پینٹڈ', icon: '🖋️', colors: ['#F5F5F5', '#EEEEEE', '#E0E0E0'], description: 'Elegant ink wash' },
  { id: 'tx26', name: 'Arabic Calligraphy Paint', nameUrdu: 'عربی خطاطی پینٹ', category: 'پینٹڈ', icon: '✍️', colors: ['#FFF8E1', '#D4A017', '#B8860B'], description: 'Painted calligraphy style' },

  // Greenery
  { id: 'tx27', name: 'Fresh Leaves', nameUrdu: 'تازہ پتے', category: 'قدرتی', icon: '🌿', colors: ['#E8F5E9', '#C8E6C9', '#A5D6A7'], description: 'Fresh green leaves' },
  { id: 'tx28', name: 'Tropical Green', nameUrdu: 'ٹراپیکل سبز', category: 'قدرتی', icon: '🌴', colors: ['#E0F2F1', '#B2DFDB', '#80CBC4'], description: 'Tropical forest green' },
  { id: 'tx29', name: 'Herb Garden', nameUrdu: 'جڑی بوٹی باغ', category: 'قدرتی', icon: '🌱', colors: ['#F1F8E9', '#DCEDC8', '#C5E1A5'], description: 'Fresh herb garden' },

  // Flowery
  { id: 'tx30', name: 'Rose Petals', nameUrdu: 'گلاب پتیاں', category: 'قدرتی', icon: '🌹', colors: ['#FCE4EC', '#F8BBD0', '#F48FB1'], description: 'Scattered rose petals' },
  { id: 'tx31', name: 'Jasmine', nameUrdu: 'چنبیلی', category: 'قدرتی', icon: '🌼', colors: ['#FFFDE7', '#FFF9C4', '#FFF176'], description: 'Jasmine flower pattern' },
  { id: 'tx32', name: 'Lotus Bloom', nameUrdu: 'کمل کھلنا', category: 'قدرتی', icon: '🪷', colors: ['#FCE4EC', '#F3E5F5', '#EDE7F6'], description: 'Blooming lotus texture' },
  { id: 'tx33', name: 'Tulip Garden', nameUrdu: 'ٹیولپ باغ', category: 'قدرتی', icon: '🌷', colors: ['#F3E5F5', '#CE93D8', '#BA68C8'], description: 'Vibrant tulip garden' },

  // Sharp / Geometric
  { id: 'tx34', name: 'Diamond Grid', nameUrdu: 'ہیرا گرڈ', category: 'ڈیجیٹل', icon: '♦️', colors: ['#E3F2FD', '#BBDEFB', '#90CAF9'], description: 'Diamond grid pattern' },
  { id: 'tx35', name: 'Sharp Lines', nameUrdu: 'تیز لکیریں', category: 'ڈیجیٹل', icon: '📐', colors: ['#FAFAFA', '#F0F0F0', '#E0E0E0'], description: 'Clean sharp geometric' },
  { id: 'tx36', name: 'Hexagon Mesh', nameUrdu: 'چھ پہلو جالی', category: 'ڈیجیٹل', icon: '⬡', colors: ['#E8EAF6', '#C5CAE9', '#9FA8DA'], description: 'Hexagonal mesh pattern' },

  // Sunny / Glowing
  { id: 'tx37', name: 'Sunny Burst', nameUrdu: 'دھوپ پھٹنا', category: 'خاص', icon: '☀️', colors: ['#FFFDE7', '#FFF9C4', '#FFF176'], description: 'Radiating sunshine burst' },
  { id: 'tx38', name: 'Golden Hour', nameUrdu: 'سنہری گھڑی', category: 'خاص', icon: '🌅', colors: ['#FFF8E1', '#FFE082', '#FFD54F'], description: 'Golden hour warm glow' },
  { id: 'tx39', name: 'Full Glow', nameUrdu: 'مکمل چمک', category: 'خاص', icon: '💡', colors: ['#FFFFF0', '#FFFFF5', '#FFFFFF'], description: 'Fully glowing bright white' },
  { id: 'tx40', name: 'Neon Flash', nameUrdu: 'نیون فلیش', category: 'خاص', icon: '⚡', colors: ['#F0FFF4', '#CCFFDD', '#AAFFCC'], description: 'Flashing neon effect' },

  // Sleek
  { id: 'tx41', name: 'Sleek Silver', nameUrdu: 'چکنی چاندی', category: 'ڈیجیٹل', icon: '🔘', colors: ['#FAFAFA', '#F5F5F5', '#EEEEEE'], description: 'Sleek silver surface' },
  { id: 'tx42', name: 'Brushed Gold', nameUrdu: 'برش سونا', category: 'ڈیجیٹل', icon: '✨', colors: ['#FFF8E1', '#FFE082', '#FFD54F'], description: 'Brushed metallic gold' },
  { id: 'tx43', name: 'Carbon Fiber', nameUrdu: 'کاربن فائبر', category: 'ڈیجیٹل', icon: '⬛', colors: ['#F5F5F5', '#EEEEEE', '#E0E0E0'], description: 'Modern carbon fiber look' },

  // Marble
  { id: 'tx44', name: 'White Marble', nameUrdu: 'سفید سنگ مرمر', category: 'سنگ مرمر', icon: '🏛️', colors: ['#FAFAFA', '#F0F0F0', '#E8E8E8'], description: 'Classic white marble veins' },
  { id: 'tx45', name: 'Cream Marble', nameUrdu: 'کریمی سنگ مرمر', category: 'سنگ مرمر', icon: '🏛️', colors: ['#FFF8F0', '#F8EDD8', '#F0E0C0'], description: 'Warm cream marble' },
  { id: 'tx46', name: 'Golden Marble', nameUrdu: 'سونا سنگ مرمر', category: 'سنگ مرمر', icon: '🥇', colors: ['#FFF8E1', '#FFE082', '#B8860B'], description: 'Luxurious golden marble' },
  { id: 'tx47', name: 'Rose Marble', nameUrdu: 'گلابی سنگ مرمر', category: 'سنگ مرمر', icon: '🌸', colors: ['#FCE4EC', '#F8BBD0', '#F48FB1'], description: 'Elegant rose marble' },
  { id: 'tx48', name: 'Green Marble', nameUrdu: 'سبز سنگ مرمر', category: 'سنگ مرمر', icon: '💚', colors: ['#E8F5E9', '#C8E6C9', '#A5D6A7'], description: 'Emerald green marble' },
  { id: 'tx49', name: 'Blue Marble', nameUrdu: 'نیلا سنگ مرمر', category: 'سنگ مرمر', icon: '💎', colors: ['#E3F2FD', '#BBDEFB', '#90CAF9'], description: 'Sapphire blue marble' },
  { id: 'tx50', name: 'Islamic Marble', nameUrdu: 'اسلامی سنگ مرمر', category: 'سنگ مرمر', icon: '🕌', colors: ['#FFF8E1', '#D4A017', '#B8860B'], description: 'Mosque-inspired marble' },

  // Fabric
  { id: 'tx51', name: 'Silk Cream', nameUrdu: 'ریشم کریم', category: 'کپڑا', icon: '🎀', colors: ['#FFF9F0', '#F5EDD8', '#EDE0CC'], description: 'Smooth silk texture' },
  { id: 'tx52', name: 'Velvet Green', nameUrdu: 'مخمل سبز', category: 'کپڑا', icon: '🟢', colors: ['#E8F5E9', '#C8E6C9', '#A5D6A7'], description: 'Rich velvet green' },
  { id: 'tx53', name: 'Lace White', nameUrdu: 'لیس سفید', category: 'کپڑا', icon: '🪡', colors: ['#FFFFFF', '#F8F8F8', '#F0F0F0'], description: 'Delicate lace pattern' },
  { id: 'tx54', name: 'Woven Gold', nameUrdu: 'بنا سونا', category: 'کپڑا', icon: '🧵', colors: ['#FFF8E1', '#FFE082', '#D4A017'], description: 'Woven golden fabric' },
  { id: 'tx55', name: 'Brocade', nameUrdu: 'بروکیڈ', category: 'کپڑا', icon: '✦', colors: ['#FFF3E0', '#FFE0B2', '#FFCC80'], description: 'Rich brocade pattern' },
];

export const FILTER_EFFECTS = [
  { id: 'fl1', name: 'Normal', nameUrdu: 'عام', icon: '⬜', filter: 'none' },
  { id: 'fl2', name: 'Warm', nameUrdu: 'گرم', icon: '🌅', filter: 'sepia(0.3) brightness(1.1)' },
  { id: 'fl3', name: 'Cool', nameUrdu: 'ٹھنڈا', icon: '❄️', filter: 'hue-rotate(30deg) brightness(1.05)' },
  { id: 'fl4', name: 'Vintage', nameUrdu: 'پرانا', icon: '📷', filter: 'sepia(0.5) contrast(0.9)' },
  { id: 'fl5', name: 'Bright', nameUrdu: 'روشن', icon: '☀️', filter: 'brightness(1.3) contrast(1.1)' },
  { id: 'fl6', name: 'Soft', nameUrdu: 'نرم', icon: '🌸', filter: 'brightness(1.05) blur(0.5px)' },
  { id: 'fl7', name: 'Gold Tone', nameUrdu: 'سونے کا رنگ', icon: '✨', filter: 'sepia(0.7) brightness(1.15)' },
  { id: 'fl8', name: 'Green Tone', nameUrdu: 'سبز رنگ', icon: '🌿', filter: 'hue-rotate(-60deg) saturate(1.3)' },
  { id: 'fl9', name: 'Blue Tone', nameUrdu: 'نیلا رنگ', icon: '💎', filter: 'hue-rotate(200deg) saturate(0.8)' },
  { id: 'fl10', name: 'Contrast+', nameUrdu: 'تضاد زیادہ', icon: '⬛', filter: 'contrast(1.5)' },
  { id: 'fl11', name: 'Saturate+', nameUrdu: 'رنگین', icon: '🌈', filter: 'saturate(2)' },
  { id: 'fl12', name: 'Dreamy', nameUrdu: 'خوابی', icon: '🌙', filter: 'brightness(1.1) saturate(0.8) blur(0.3px)' },
];

export const TEXT_EFFECTS_LIST = [
  { id: 'te1', name: 'Normal', nameUrdu: 'عام', icon: 'A', preview: { color: '#B8860B' } },
  { id: 'te2', name: 'Bold Extra', nameUrdu: 'انتہائی بولڈ', icon: 'B', preview: { fontWeight: '900' as any } },
  { id: 'te3', name: 'Neon Glow', nameUrdu: 'نیون چمک', icon: '💡', preview: { color: '#00FF88', textShadow: '0 0 10px #00FF88' } },
  { id: 'te4', name: 'Gold Gradient', nameUrdu: 'سونا گریڈینٹ', icon: '✨', preview: { color: '#FFD700' } },
  { id: 'te5', name: 'Emerald Crimson', nameUrdu: 'زمرد قرمزی', icon: '🔀', preview: { color: '#2E7D32' } },
  { id: 'te6', name: 'Multi-Color', nameUrdu: 'کثیر رنگ', icon: '🌈', preview: { color: '#E91E63' } },
  { id: 'te7', name: 'Glass Text', nameUrdu: 'شیشہ متن', icon: '💎', preview: { color: '#90CAF9' } },
  { id: 'te8', name: 'Tube Light', nameUrdu: 'ٹیوب لائٹ', icon: '💡', preview: { color: '#FFFFFF' } },
  { id: 'te9', name: 'Fire Text', nameUrdu: 'آگ متن', icon: '🔥', preview: { color: '#FF6600' } },
  { id: 'te10', name: 'Shadow Deep', nameUrdu: 'گہرا سایہ', icon: '🌑', preview: { color: '#1A1A1A' } },
  { id: 'te11', name: 'Outline Only', nameUrdu: 'صرف آؤٹ لائن', icon: '⬜', preview: { color: 'transparent' } },
  { id: 'te12', name: 'Shiny Gold', nameUrdu: 'چمکتا سونا', icon: '🌟', preview: { color: '#FFD700' } },
  { id: 'te13', name: 'Themed Islamic', nameUrdu: 'اسلامی تھیم', icon: '☪️', preview: { color: '#2E7D32' } },
  { id: 'te14', name: 'Running Sparkle', nameUrdu: 'چلتی چمک', icon: '✨', preview: { color: '#FFD700' } },
  { id: 'te15', name: 'Digital LED', nameUrdu: 'ڈیجیٹل ایل ای ڈی', icon: '📺', preview: { color: '#00FF00' } },
];

export const RUNNING_TEXT_DIRECTIONS = [
  { id: 'left', nameUrdu: 'بائیں', icon: '⬅️' },
  { id: 'right', nameUrdu: 'دائیں', icon: '➡️' },
  { id: 'up', nameUrdu: 'اوپر', icon: '⬆️' },
  { id: 'down', nameUrdu: 'نیچے', icon: '⬇️' },
  { id: 'border-cw', nameUrdu: 'بارڈر دائیں', icon: '🔄' },
  { id: 'border-ccw', nameUrdu: 'بارڈر بائیں', icon: '🔃' },
];

export const CANVAS_SIZES = [
  { id: 'square', label: 'مربع', labelEn: 'Square (1:1)', w: 1080, h: 1080, icon: '⬛' },
  { id: 'portrait', label: 'پورٹریٹ', labelEn: 'Portrait (4:5)', w: 1080, h: 1350, icon: '📱' },
  { id: 'landscape', label: 'لینڈ اسکیپ', labelEn: 'Landscape (16:9)', w: 1280, h: 720, icon: '🖥️' },
  { id: 'story', label: 'اسٹوری', labelEn: 'Story (9:16)', w: 1080, h: 1920, icon: '📸' },
  { id: 'banner', label: 'بینر', labelEn: 'Banner (1.91:1)', w: 1200, h: 628, icon: '🏳️' },
  { id: 'card', label: 'کارڈ', labelEn: 'Card (3:2)', w: 900, h: 600, icon: '🎴' },
  { id: 'a4', label: 'اے فور', labelEn: 'A4 Print', w: 2480, h: 3508, icon: '📄' },
  { id: 'thumbnail', label: 'تھمبنیل', labelEn: 'YouTube Thumb', w: 1280, h: 720, icon: '▶️' },
];
