// eVeR sMaRt UrDu sTuDiO - Effects Collections (150+)

export interface TransitionEffect {
  id: string;
  name: string;
  nameUrdu: string;
  category: string;
  duration: number;
  icon: string;
  type: 'fade' | 'slide' | 'zoom' | 'flip' | 'rotate' | 'bounce' | 'elastic' | 'special';
}

export interface AnimationEffect {
  id: string;
  name: string;
  nameUrdu: string;
  category: string;
  icon: string;
  type: 'entrance' | 'emphasis' | 'exit' | 'loop';
  duration: number;
}

export interface DesignEffect {
  id: string;
  name: string;
  nameUrdu: string;
  category: string;
  icon: string;
}

// ===== TEXT COLORS =====
export const TEXT_COLORS = [
  '#B8860B', '#D4A017', '#FFD700', '#FFC107',
  '#1B5E20', '#2E7D32', '#43A047', '#66BB6A',
  '#0D47A1', '#1565C0', '#1976D2', '#42A5F5',
  '#880E4F', '#AD1457', '#E91E63', '#F48FB1',
  '#4A148C', '#6A1B9A', '#7B1FA2', '#AB47BC',
  '#B71C1C', '#C62828', '#D32F2F', '#EF5350',
  '#E65100', '#F57C00', '#FF9800', '#FFB74D',
  '#006064', '#00838F', '#00ACC1', '#4DD0E1',
  '#1A1200', '#4A3F0A', '#8B7355', '#000000',
  '#FFFFFF', '#F5F5F5', '#EEEEEE', '#BDBDBD',
  '#9E9E9E', '#757575', '#616161', '#424242',
];

// ===== BACKGROUND COLORS =====
export const BACKGROUND_COLORS = [
  '#FFFFFF', '#FFF9F0', '#FFF8E1', '#FFFDE7',
  '#E8F5E9', '#F1F8E9', '#E0F2F1', '#E0F7FA',
  '#E3F2FD', '#EDE7F6', '#F3E5F5', '#FCE4EC',
  '#FBE9E7', '#FFF3E0', '#F5F5F5', '#FAFAFA',
  '#FFF8DC', '#FFFFF0', '#F0FFF0', '#F0F8FF',
];

// ===== DIGITAL GRAPHICS EFFECTS =====
export const DIGITAL_EFFECTS = [
  { id: 'dg1', name: 'Glitter', nameUrdu: 'گلٹر', icon: '✨', type: 'sparkle' },
  { id: 'dg2', name: 'Neon Glow', nameUrdu: 'نیون چمک', icon: '💡', type: 'glow' },
  { id: 'dg3', name: 'Gold Shine', nameUrdu: 'سونے کی چمک', icon: '⭐', type: 'shine' },
  { id: 'dg4', name: 'Rainbow', nameUrdu: 'قوس قزح', icon: '🌈', type: 'rainbow' },
  { id: 'dg5', name: 'Bokeh', nameUrdu: 'بوکہ', icon: '🔮', type: 'bokeh' },
  { id: 'dg6', name: 'Lens Flare', nameUrdu: 'روشنی دھڑکن', icon: '💫', type: 'flare' },
  { id: 'dg7', name: 'Holographic', nameUrdu: 'ہولوگرافک', icon: '🔯', type: 'holo' },
  { id: 'dg8', name: 'Metallic Gold', nameUrdu: 'دھاتی سونا', icon: '🥇', type: 'metallic' },
  { id: 'dg9', name: 'Particle Rain', nameUrdu: 'ذرات بارش', icon: '🌟', type: 'particles' },
  { id: 'dg10', name: 'Starburst', nameUrdu: 'ستارہ پھٹ', icon: '💥', type: 'starburst' },
];

// ===== TRANSITION EFFECTS (55) =====
export const TRANSITION_EFFECTS: TransitionEffect[] = [
  // Fade Group
  { id: 'tr1', name: 'Fade In', nameUrdu: 'آہستہ آئیں', category: 'فیڈ', duration: 500, icon: '🌅', type: 'fade' },
  { id: 'tr2', name: 'Fade Out', nameUrdu: 'آہستہ جائیں', category: 'فیڈ', duration: 500, icon: '🌇', type: 'fade' },
  { id: 'tr3', name: 'Cross Fade', nameUrdu: 'کراس فیڈ', category: 'فیڈ', duration: 600, icon: '🔄', type: 'fade' },
  { id: 'tr4', name: 'Fade Through', nameUrdu: 'فیڈ تھرو', category: 'فیڈ', duration: 800, icon: '💨', type: 'fade' },
  { id: 'tr5', name: 'White Fade', nameUrdu: 'سفید فیڈ', category: 'فیڈ', duration: 700, icon: '⚪', type: 'fade' },
  { id: 'tr6', name: 'Black Fade', nameUrdu: 'سیاہ فیڈ', category: 'فیڈ', duration: 700, icon: '⚫', type: 'fade' },
  { id: 'tr7', name: 'Gold Fade', nameUrdu: 'سونے کا فیڈ', category: 'فیڈ', duration: 600, icon: '🌟', type: 'fade' },
  { id: 'tr8', name: 'Blur Fade', nameUrdu: 'دھندلا فیڈ', category: 'فیڈ', duration: 800, icon: '🔮', type: 'fade' },
  { id: 'tr9', name: 'Color Fade', nameUrdu: 'رنگین فیڈ', category: 'فیڈ', duration: 900, icon: '🌈', type: 'fade' },
  { id: 'tr10', name: 'Glow Fade', nameUrdu: 'چمکتا فیڈ', category: 'فیڈ', duration: 600, icon: '✨', type: 'fade' },

  // Slide Group
  { id: 'tr11', name: 'Slide Left', nameUrdu: 'بائیں سلائیڈ', category: 'سلائیڈ', duration: 400, icon: '⬅️', type: 'slide' },
  { id: 'tr12', name: 'Slide Right', nameUrdu: 'دائیں سلائیڈ', category: 'سلائیڈ', duration: 400, icon: '➡️', type: 'slide' },
  { id: 'tr13', name: 'Slide Up', nameUrdu: 'اوپر سلائیڈ', category: 'سلائیڈ', duration: 400, icon: '⬆️', type: 'slide' },
  { id: 'tr14', name: 'Slide Down', nameUrdu: 'نیچے سلائیڈ', category: 'سلائیڈ', duration: 400, icon: '⬇️', type: 'slide' },
  { id: 'tr15', name: 'Push Left', nameUrdu: 'بائیں دھکیل', category: 'سلائیڈ', duration: 450, icon: '◀️', type: 'slide' },
  { id: 'tr16', name: 'Push Right', nameUrdu: 'دائیں دھکیل', category: 'سلائیڈ', duration: 450, icon: '▶️', type: 'slide' },
  { id: 'tr17', name: 'Cover Up', nameUrdu: 'اوپر ڈھانپ', category: 'سلائیڈ', duration: 500, icon: '🆙', type: 'slide' },
  { id: 'tr18', name: 'Reveal Down', nameUrdu: 'نیچے ظاہر', category: 'سلائیڈ', duration: 500, icon: '🔽', type: 'slide' },
  { id: 'tr19', name: 'Split Horizontal', nameUrdu: 'افقی تقسیم', category: 'سلائیڈ', duration: 600, icon: '↔️', type: 'slide' },
  { id: 'tr20', name: 'Split Vertical', nameUrdu: 'عمودی تقسیم', category: 'سلائیڈ', duration: 600, icon: '↕️', type: 'slide' },

  // Zoom Group
  { id: 'tr21', name: 'Zoom In', nameUrdu: 'زوم اندر', category: 'زوم', duration: 500, icon: '🔍', type: 'zoom' },
  { id: 'tr22', name: 'Zoom Out', nameUrdu: 'زوم باہر', category: 'زوم', duration: 500, icon: '🔎', type: 'zoom' },
  { id: 'tr23', name: 'Scale Up', nameUrdu: 'اسکیل اوپر', category: 'زوم', duration: 400, icon: '📈', type: 'zoom' },
  { id: 'tr24', name: 'Scale Down', nameUrdu: 'اسکیل نیچے', category: 'زوم', duration: 400, icon: '📉', type: 'zoom' },
  { id: 'tr25', name: 'Zoom Fade', nameUrdu: 'زوم فیڈ', category: 'زوم', duration: 600, icon: '🔭', type: 'zoom' },
  { id: 'tr26', name: 'Magnify', nameUrdu: 'بڑا کریں', category: 'زوم', duration: 500, icon: '🧪', type: 'zoom' },
  { id: 'tr27', name: 'Shrink', nameUrdu: 'چھوٹا کریں', category: 'زوم', duration: 500, icon: '🔬', type: 'zoom' },

  // Flip Group
  { id: 'tr28', name: 'Flip X', nameUrdu: 'افقی پلٹ', category: 'فلپ', duration: 600, icon: '🔁', type: 'flip' },
  { id: 'tr29', name: 'Flip Y', nameUrdu: 'عمودی پلٹ', category: 'فلپ', duration: 600, icon: '🔃', type: 'flip' },
  { id: 'tr30', name: 'Card Flip', nameUrdu: 'کارڈ پلٹ', category: 'فلپ', duration: 700, icon: '🃏', type: 'flip' },
  { id: 'tr31', name: 'Page Turn', nameUrdu: 'صفحہ پلٹ', category: 'فلپ', duration: 800, icon: '📖', type: 'flip' },
  { id: 'tr32', name: 'Cube Flip', nameUrdu: 'مکعب پلٹ', category: 'فلپ', duration: 700, icon: '🎲', type: 'flip' },

  // Rotate Group
  { id: 'tr33', name: 'Rotate CW', nameUrdu: 'دائیں گھمائیں', category: 'روٹیٹ', duration: 600, icon: '🔄', type: 'rotate' },
  { id: 'tr34', name: 'Rotate CCW', nameUrdu: 'بائیں گھمائیں', category: 'روٹیٹ', duration: 600, icon: '🔃', type: 'rotate' },
  { id: 'tr35', name: 'Spiral In', nameUrdu: 'سرپل اندر', category: 'روٹیٹ', duration: 800, icon: '🌀', type: 'rotate' },
  { id: 'tr36', name: 'Wheel', nameUrdu: 'پہیہ', category: 'روٹیٹ', duration: 700, icon: '⚙️', type: 'rotate' },
  { id: 'tr37', name: 'Spin In', nameUrdu: 'گھوم کر آئیں', category: 'روٹیٹ', duration: 600, icon: '🎡', type: 'rotate' },

  // Bounce & Elastic
  { id: 'tr38', name: 'Bounce In', nameUrdu: 'اچھل کر آئیں', category: 'باؤنس', duration: 700, icon: '⛹', type: 'bounce' },
  { id: 'tr39', name: 'Bounce Out', nameUrdu: 'اچھل کر جائیں', category: 'باؤنس', duration: 700, icon: '🎾', type: 'bounce' },
  { id: 'tr40', name: 'Spring', nameUrdu: 'اسپرنگ', category: 'باؤنس', duration: 800, icon: '🌱', type: 'elastic' },
  { id: 'tr41', name: 'Elastic', nameUrdu: 'لچکدار', category: 'باؤنس', duration: 900, icon: '🪀', type: 'elastic' },
  { id: 'tr42', name: 'Rubber Band', nameUrdu: 'ربر بینڈ', category: 'باؤنس', duration: 800, icon: '🎯', type: 'elastic' },

  // Special Effects
  { id: 'tr43', name: 'Glitter Burst', nameUrdu: 'گلٹر پھٹ', category: 'خاص', duration: 800, icon: '✨', type: 'special' },
  { id: 'tr44', name: 'Islamic Star', nameUrdu: 'اسلامی ستارہ', category: 'خاص', duration: 900, icon: '⭐', type: 'special' },
  { id: 'tr45', name: 'Crescent Open', nameUrdu: 'ہلال کھلے', category: 'خاص', duration: 700, icon: '🌙', type: 'special' },
  { id: 'tr46', name: 'Calligraphy Brush', nameUrdu: 'خطاطی برش', category: 'خاص', duration: 1000, icon: '✍️', type: 'special' },
  { id: 'tr47', name: 'Gold Rush', nameUrdu: 'سونا رش', category: 'خاص', duration: 800, icon: '🥇', type: 'special' },
  { id: 'tr48', name: 'Diamond Burst', nameUrdu: 'ہیرا پھٹ', category: 'خاص', duration: 700, icon: '💎', type: 'special' },
  { id: 'tr49', name: 'Magic Wand', nameUrdu: 'جادو کی چھڑی', category: 'خاص', duration: 900, icon: '🪄', type: 'special' },
  { id: 'tr50', name: 'Ripple', nameUrdu: 'لہریں', category: 'خاص', duration: 600, icon: '🌊', type: 'special' },
  { id: 'tr51', name: 'Morph', nameUrdu: 'شکل بدلیں', category: 'خاص', duration: 800, icon: '🔮', type: 'special' },
  { id: 'tr52', name: 'Particle Fade', nameUrdu: 'ذرات فیڈ', category: 'خاص', duration: 900, icon: '🌟', type: 'special' },
  { id: 'tr53', name: 'Ink Drop', nameUrdu: 'سیاہی قطرہ', category: 'خاص', duration: 700, icon: '🖋️', type: 'special' },
  { id: 'tr54', name: 'Feather Float', nameUrdu: 'پر تیرنا', category: 'خاص', duration: 1000, icon: '🪶', type: 'special' },
  { id: 'tr55', name: 'Divine Light', nameUrdu: 'الہی روشنی', category: 'خاص', duration: 1200, icon: '☀️', type: 'special' },
];

// ===== ANIMATION EFFECTS (55) =====
export const ANIMATION_EFFECTS: AnimationEffect[] = [
  // Entrance
  { id: 'an1', name: 'Fade In Up', nameUrdu: 'اوپر سے فیڈ', category: 'داخلہ', icon: '⬆', type: 'entrance', duration: 600 },
  { id: 'an2', name: 'Fade In Down', nameUrdu: 'نیچے سے فیڈ', category: 'داخلہ', icon: '⬇', type: 'entrance', duration: 600 },
  { id: 'an3', name: 'Fade In Left', nameUrdu: 'بائیں سے فیڈ', category: 'داخلہ', icon: '◀', type: 'entrance', duration: 600 },
  { id: 'an4', name: 'Fade In Right', nameUrdu: 'دائیں سے فیڈ', category: 'داخلہ', icon: '▶', type: 'entrance', duration: 600 },
  { id: 'an5', name: 'Zoom In', nameUrdu: 'زوم اندر', category: 'داخلہ', icon: '🔍', type: 'entrance', duration: 500 },
  { id: 'an6', name: 'Rotate In', nameUrdu: 'گھوم کر آئیں', category: 'داخلہ', icon: '🔄', type: 'entrance', duration: 700 },
  { id: 'an7', name: 'Bounce In', nameUrdu: 'اچھل کر آئیں', category: 'داخلہ', icon: '⛹', type: 'entrance', duration: 800 },
  { id: 'an8', name: 'Flip In X', nameUrdu: 'افقی پلٹ آئیں', category: 'داخلہ', icon: '🔁', type: 'entrance', duration: 700 },
  { id: 'an9', name: 'Flip In Y', nameUrdu: 'عمودی پلٹ آئیں', category: 'داخلہ', icon: '🔃', type: 'entrance', duration: 700 },
  { id: 'an10', name: 'Slide In Up', nameUrdu: 'اوپر سے سلائیڈ', category: 'داخلہ', icon: '📥', type: 'entrance', duration: 500 },
  { id: 'an11', name: 'Roll In', nameUrdu: 'لڑھک کر آئیں', category: 'داخلہ', icon: '🎡', type: 'entrance', duration: 700 },
  { id: 'an12', name: 'Light Speed In', nameUrdu: 'روشنی تیز آئیں', category: 'داخلہ', icon: '⚡', type: 'entrance', duration: 400 },
  { id: 'an13', name: 'Jack In Box', nameUrdu: 'جیک ان باکس', category: 'داخلہ', icon: '🎁', type: 'entrance', duration: 800 },

  // Emphasis
  { id: 'an14', name: 'Pulse', nameUrdu: 'دھڑکن', category: 'زور', icon: '💓', type: 'emphasis', duration: 1000 },
  { id: 'an15', name: 'Bounce', nameUrdu: 'اچھال', category: 'زور', icon: '🎾', type: 'emphasis', duration: 1000 },
  { id: 'an16', name: 'Shake', nameUrdu: 'ہلنا', category: 'زور', icon: '📳', type: 'emphasis', duration: 800 },
  { id: 'an17', name: 'Swing', nameUrdu: 'جھولنا', category: 'زور', icon: '🎠', type: 'emphasis', duration: 1000 },
  { id: 'an18', name: 'Tada', nameUrdu: 'ٹاڈا', category: 'زور', icon: '🎉', type: 'emphasis', duration: 1000 },
  { id: 'an19', name: 'Wobble', nameUrdu: 'لرزنا', category: 'زور', icon: '〰️', type: 'emphasis', duration: 1000 },
  { id: 'an20', name: 'Jello', nameUrdu: 'جیلو', category: 'زور', icon: '🍮', type: 'emphasis', duration: 1000 },
  { id: 'an21', name: 'Heart Beat', nameUrdu: 'دل دھڑکن', category: 'زور', icon: '❤️', type: 'emphasis', duration: 1300 },
  { id: 'an22', name: 'Flash', nameUrdu: 'چمک', category: 'زور', icon: '⚡', type: 'emphasis', duration: 1000 },
  { id: 'an23', name: 'Rubber Band', nameUrdu: 'ربر بینڈ', category: 'زور', icon: '🪀', type: 'emphasis', duration: 1000 },
  { id: 'an24', name: 'Head Shake', nameUrdu: 'سر ہلانا', category: 'زور', icon: '🤷', type: 'emphasis', duration: 1000 },
  { id: 'an25', name: 'Hinge', nameUrdu: 'قلابہ', category: 'زور', icon: '🔩', type: 'emphasis', duration: 1000 },

  // Exit
  { id: 'an26', name: 'Fade Out', nameUrdu: 'غائب ہوں', category: 'خروج', icon: '👻', type: 'exit', duration: 600 },
  { id: 'an27', name: 'Zoom Out', nameUrdu: 'زوم باہر', category: 'خروج', icon: '🔎', type: 'exit', duration: 500 },
  { id: 'an28', name: 'Slide Out Down', nameUrdu: 'نیچے چلے جائیں', category: 'خروج', icon: '📤', type: 'exit', duration: 500 },
  { id: 'an29', name: 'Flip Out X', nameUrdu: 'افقی پلٹ جائیں', category: 'خروج', icon: '🔁', type: 'exit', duration: 700 },
  { id: 'an30', name: 'Rotate Out', nameUrdu: 'گھوم کر جائیں', category: 'خروج', icon: '🌀', type: 'exit', duration: 700 },
  { id: 'an31', name: 'Bounce Out', nameUrdu: 'اچھل کر جائیں', category: 'خروج', icon: '🎯', type: 'exit', duration: 800 },
  { id: 'an32', name: 'Light Speed Out', nameUrdu: 'روشنی تیز جائیں', category: 'خروج', icon: '💨', type: 'exit', duration: 400 },
  { id: 'an33', name: 'Roll Out', nameUrdu: 'لڑھک جائیں', category: 'خروج', icon: '🎢', type: 'exit', duration: 700 },

  // Loop Animations
  { id: 'an34', name: 'Float', nameUrdu: 'تیرنا', category: 'چکر', icon: '🎈', type: 'loop', duration: 2000 },
  { id: 'an35', name: 'Glow', nameUrdu: 'چمکنا', category: 'چکر', icon: '💡', type: 'loop', duration: 1500 },
  { id: 'an36', name: 'Rotate CW', nameUrdu: 'دائیں گھومنا', category: 'چکر', icon: '🔄', type: 'loop', duration: 2000 },
  { id: 'an37', name: 'Rotate CCW', nameUrdu: 'بائیں گھومنا', category: 'چکر', icon: '🔃', type: 'loop', duration: 2000 },
  { id: 'an38', name: 'Wave', nameUrdu: 'لہر', category: 'چکر', icon: '〰️', type: 'loop', duration: 1500 },
  { id: 'an39', name: 'Breath', nameUrdu: 'سانس', category: 'چکر', icon: '💨', type: 'loop', duration: 3000 },
  { id: 'an40', name: 'Shimmer', nameUrdu: 'چمچماہٹ', category: 'چکر', icon: '✨', type: 'loop', duration: 1500 },
  { id: 'an41', name: 'Typewriter', nameUrdu: 'ٹائپ رائٹر', category: 'چکر', icon: '⌨️', type: 'loop', duration: 2000 },
  { id: 'an42', name: 'Neon Pulse', nameUrdu: 'نیون دھڑکن', category: 'چکر', icon: '💡', type: 'loop', duration: 1000 },
  { id: 'an43', name: 'Star Twinkle', nameUrdu: 'ستارہ ٹمٹماہٹ', category: 'چکر', icon: '⭐', type: 'loop', duration: 1500 },
  { id: 'an44', name: 'Islamic Star Spin', nameUrdu: 'اسلامی ستارہ چکر', category: 'چکر', icon: '☪', type: 'loop', duration: 2000 },
  { id: 'an45', name: 'Gold Rain', nameUrdu: 'سونے کی بارش', category: 'چکر', icon: '🌟', type: 'loop', duration: 2000 },
  { id: 'an46', name: 'Crescent Rock', nameUrdu: 'ہلال جھولنا', category: 'چکر', icon: '🌙', type: 'loop', duration: 2000 },
  { id: 'an47', name: 'Calligraphy Write', nameUrdu: 'خطاطی لکھنا', category: 'چکر', icon: '✍️', type: 'loop', duration: 3000 },
  { id: 'an48', name: 'Fire', nameUrdu: 'آگ', category: 'چکر', icon: '🔥', type: 'loop', duration: 1000 },
  { id: 'an49', name: 'Water Flow', nameUrdu: 'پانی بہنا', category: 'چکر', icon: '🌊', type: 'loop', duration: 2000 },
  { id: 'an50', name: 'Wind Blow', nameUrdu: 'ہوا چلنا', category: 'چکر', icon: '🍃', type: 'loop', duration: 2000 },
  { id: 'an51', name: 'Rainbow Cycle', nameUrdu: 'قوس قزح چکر', category: 'چکر', icon: '🌈', type: 'loop', duration: 3000 },
  { id: 'an52', name: 'Particle Float', nameUrdu: 'ذرات تیرنا', category: 'چکر', icon: '🌟', type: 'loop', duration: 2500 },
  { id: 'an53', name: 'Pendulum', nameUrdu: 'لنگر', category: 'چکر', icon: '⏱', type: 'loop', duration: 2000 },
  { id: 'an54', name: 'Magnetic', nameUrdu: 'مقناطیسی', category: 'چکر', icon: '🧲', type: 'loop', duration: 1500 },
  { id: 'an55', name: 'Divine Glow', nameUrdu: 'الہی روشنی', category: 'چکر', icon: '☀️', type: 'loop', duration: 2000 },
];

// ===== DESIGN EFFECTS (10+) =====
export const DESIGN_EFFECTS: DesignEffect[] = [
  { id: 'de1', name: 'Gold Shadow', nameUrdu: 'سونے کا سایہ', category: 'سایہ', icon: '✦' },
  { id: 'de2', name: 'Drop Shadow', nameUrdu: 'ڈراپ شیڈو', category: 'سایہ', icon: '🌑' },
  { id: 'de3', name: 'Inner Shadow', nameUrdu: 'اندرونی سایہ', category: 'سایہ', icon: '⬛' },
  { id: 'de4', name: 'Neon Glow', nameUrdu: 'نیون چمک', category: 'چمک', icon: '💡' },
  { id: 'de5', name: 'Gold Glow', nameUrdu: 'سونے کی چمک', category: 'چمک', icon: '✨' },
  { id: 'de6', name: 'Green Glow', nameUrdu: 'سبز چمک', category: 'چمک', icon: '💚' },
  { id: 'de7', name: 'Metallic Gold', nameUrdu: 'دھاتی سونا', category: 'میٹالک', icon: '🥇' },
  { id: 'de8', name: 'Metallic Silver', nameUrdu: 'دھاتی چاندی', category: 'میٹالک', icon: '🥈' },
  { id: 'de9', name: 'Metallic Bronze', nameUrdu: 'دھاتی کانسہ', category: 'میٹالک', icon: '🥉' },
  { id: 'de10', name: 'Emboss', nameUrdu: 'ابھار', category: 'ٹیکسچر', icon: '📐' },
  { id: 'de11', name: 'Engrave', nameUrdu: 'کندہ', category: 'ٹیکسچر', icon: '✒️' },
  { id: 'de12', name: 'Outline Gold', nameUrdu: 'سونا آؤٹ لائن', category: 'آؤٹ لائن', icon: '🔲' },
  { id: 'de13', name: 'Double Outline', nameUrdu: 'ڈبل آؤٹ لائن', category: 'آؤٹ لائن', icon: '⬜' },
  { id: 'de14', name: 'Rainbow Text', nameUrdu: 'رنگین متن', category: 'رنگ', icon: '🌈' },
  { id: 'de15', name: 'Gradient Text', nameUrdu: 'گریڈینٹ متن', category: 'رنگ', icon: '🎨' },
];
