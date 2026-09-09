// eVeR sMaRt UrDu sTuDiO - Stickers & Shapes

export interface Sticker {
  id: string;
  emoji: string;
  name: string;
  nameUrdu: string;
  category: string;
}

export const STICKER_CATEGORIES = [
  'سب', 'اسلامی', 'پھول', 'دل', 'ستارے', 'جانور', 'شکلیں', 'موسم', 'خاص'
];

export const STICKERS: Sticker[] = [
  // اسلامی
  { id: 'st1', emoji: '☪️', name: 'Star Crescent', nameUrdu: 'ہلال ستارہ', category: 'اسلامی' },
  { id: 'st2', emoji: '🕌', name: 'Mosque', nameUrdu: 'مسجد', category: 'اسلامی' },
  { id: 'st3', emoji: '🕋', name: 'Kaaba', nameUrdu: 'کعبہ', category: 'اسلامی' },
  { id: 'st4', emoji: '📿', name: 'Tasbih', nameUrdu: 'تسبیح', category: 'اسلامی' },
  { id: 'st5', emoji: '📖', name: 'Quran', nameUrdu: 'قرآن', category: 'اسلامی' },
  { id: 'st6', emoji: '🌙', name: 'Crescent', nameUrdu: 'ہلال', category: 'اسلامی' },
  { id: 'st7', emoji: '✨', name: 'Sparkle', nameUrdu: 'چمک', category: 'اسلامی' },
  { id: 'st8', emoji: '⭐', name: 'Star', nameUrdu: 'ستارہ', category: 'اسلامی' },
  { id: 'st9', emoji: '🌟', name: 'Glowing Star', nameUrdu: 'چمکتا ستارہ', category: 'اسلامی' },
  { id: 'st10', emoji: '🤲', name: 'Dua Hands', nameUrdu: 'دعا ہاتھ', category: 'اسلامی' },
  { id: 'st11', emoji: '☀️', name: 'Sun', nameUrdu: 'سورج', category: 'اسلامی' },
  { id: 'st12', emoji: '🌹', name: 'Rose', nameUrdu: 'گلاب', category: 'اسلامی' },

  // پھول
  { id: 'st13', emoji: '🌸', name: 'Cherry Blossom', nameUrdu: 'چیری پھول', category: 'پھول' },
  { id: 'st14', emoji: '🌺', name: 'Hibiscus', nameUrdu: 'گڑھل', category: 'پھول' },
  { id: 'st15', emoji: '🌼', name: 'Blossom', nameUrdu: 'پھول کھلنا', category: 'پھول' },
  { id: 'st16', emoji: '🌷', name: 'Tulip', nameUrdu: 'ٹیولپ', category: 'پھول' },
  { id: 'st17', emoji: '🌻', name: 'Sunflower', nameUrdu: 'سورج مکھی', category: 'پھول' },
  { id: 'st18', emoji: '🪷', name: 'Lotus', nameUrdu: 'کمل', category: 'پھول' },
  { id: 'st19', emoji: '💐', name: 'Bouquet', nameUrdu: 'گل دستہ', category: 'پھول' },
  { id: 'st20', emoji: '🍀', name: 'Clover', nameUrdu: 'تین پتہ', category: 'پھول' },
  { id: 'st21', emoji: '🌿', name: 'Herb', nameUrdu: 'جڑی بوٹی', category: 'پھول' },
  { id: 'st22', emoji: '🍃', name: 'Leaves', nameUrdu: 'پتے', category: 'پھول' },

  // دل
  { id: 'st23', emoji: '❤️', name: 'Heart', nameUrdu: 'دل', category: 'دل' },
  { id: 'st24', emoji: '💛', name: 'Yellow Heart', nameUrdu: 'پیلا دل', category: 'دل' },
  { id: 'st25', emoji: '💚', name: 'Green Heart', nameUrdu: 'سبز دل', category: 'دل' },
  { id: 'st26', emoji: '💙', name: 'Blue Heart', nameUrdu: 'نیلا دل', category: 'دل' },
  { id: 'st27', emoji: '💜', name: 'Purple Heart', nameUrdu: 'جامنی دل', category: 'دل' },
  { id: 'st28', emoji: '🧡', name: 'Orange Heart', nameUrdu: 'نارنجی دل', category: 'دل' },
  { id: 'st29', emoji: '💗', name: 'Pink Heart', nameUrdu: 'گلابی دل', category: 'دل' },
  { id: 'st30', emoji: '💖', name: 'Sparkling Heart', nameUrdu: 'چمکتا دل', category: 'دل' },
  { id: 'st31', emoji: '💝', name: 'Heart Ribbon', nameUrdu: 'ربن دل', category: 'دل' },
  { id: 'st32', emoji: '💞', name: 'Revolving Hearts', nameUrdu: 'گھومتے دل', category: 'دل' },

  // ستارے
  { id: 'st33', emoji: '⭐', name: 'Star', nameUrdu: 'ستارہ', category: 'ستارے' },
  { id: 'st34', emoji: '🌟', name: 'Glowing', nameUrdu: 'چمکتا', category: 'ستارے' },
  { id: 'st35', emoji: '💫', name: 'Dizzy', nameUrdu: 'چکر', category: 'ستارے' },
  { id: 'st36', emoji: '✨', name: 'Sparkles', nameUrdu: 'چمکیں', category: 'ستارے' },
  { id: 'st37', emoji: '🌠', name: 'Shooting Star', nameUrdu: 'شہاب ثاقب', category: 'ستارے' },
  { id: 'st38', emoji: '⚡', name: 'Lightning', nameUrdu: 'بجلی', category: 'ستارے' },
  { id: 'st39', emoji: '🔮', name: 'Crystal Ball', nameUrdu: 'شیشہ گولہ', category: 'ستارے' },
  { id: 'st40', emoji: '💎', name: 'Diamond', nameUrdu: 'ہیرا', category: 'ستارے' },

  // شکلیں (Shapes)
  { id: 'st41', emoji: '⬛', name: 'Square', nameUrdu: 'مربع', category: 'شکلیں' },
  { id: 'st42', emoji: '⭕', name: 'Circle', nameUrdu: 'دائرہ', category: 'شکلیں' },
  { id: 'st43', emoji: '🔺', name: 'Triangle', nameUrdu: 'مثلث', category: 'شکلیں' },
  { id: 'st44', emoji: '🔷', name: 'Diamond Blue', nameUrdu: 'نیلا ہیرا', category: 'شکلیں' },
  { id: 'st45', emoji: '🔶', name: 'Diamond Orange', nameUrdu: 'نارنجی ہیرا', category: 'شکلیں' },
  { id: 'st46', emoji: '⬡', name: 'Hexagon', nameUrdu: 'چھ پہلو', category: 'شکلیں' },
  { id: 'st47', emoji: '🌀', name: 'Cyclone', nameUrdu: 'گردباد', category: 'شکلیں' },
  { id: 'st48', emoji: '🎯', name: 'Bullseye', nameUrdu: 'نشانہ', category: 'شکلیں' },

  // موسم
  { id: 'st49', emoji: '🌈', name: 'Rainbow', nameUrdu: 'قوس قزح', category: 'موسم' },
  { id: 'st50', emoji: '⛅', name: 'Cloud Sun', nameUrdu: 'بادل سورج', category: 'موسم' },
  { id: 'st51', emoji: '🌦️', name: 'Rain', nameUrdu: 'بارش', category: 'موسم' },
  { id: 'st52', emoji: '❄️', name: 'Snowflake', nameUrdu: 'برف', category: 'موسم' },
  { id: 'st53', emoji: '🌊', name: 'Wave', nameUrdu: 'لہر', category: 'موسم' },
  { id: 'st54', emoji: '🍂', name: 'Leaf', nameUrdu: 'خزاں پتہ', category: 'موسم' },
  { id: 'st55', emoji: '🌅', name: 'Sunrise', nameUrdu: 'طلوع آفتاب', category: 'موسم' },

  // خاص
  { id: 'st56', emoji: '🏆', name: 'Trophy', nameUrdu: 'ٹرافی', category: 'خاص' },
  { id: 'st57', emoji: '👑', name: 'Crown', nameUrdu: 'تاج', category: 'خاص' },
  { id: 'st58', emoji: '🎀', name: 'Ribbon', nameUrdu: 'ربن', category: 'خاص' },
  { id: 'st59', emoji: '🎊', name: 'Confetti', nameUrdu: 'کنفیٹی', category: 'خاص' },
  { id: 'st60', emoji: '🪄', name: 'Magic Wand', nameUrdu: 'جادو چھڑی', category: 'خاص' },
  { id: 'st61', emoji: '🦋', name: 'Butterfly', nameUrdu: 'تتلی', category: 'خاص' },
  { id: 'st62', emoji: '🕊️', name: 'Dove', nameUrdu: 'فاختہ', category: 'خاص' },
  { id: 'st63', emoji: '🦚', name: 'Peacock', nameUrdu: 'مور', category: 'خاص' },
];
