// eVeR sMaRt UrDu sTuDiO - Islamic Templates Collection (60+)

export interface IslamicTemplate {
  id: string;
  name: string;
  nameUrdu: string;
  category: string;
  text: string;
  subText?: string;
  bgColor: string;
  bgGradient?: string[];
  textColor: string;
  borderColor: string;
  decoration: string;
  borderStyle: string;
  edgeDesign: string;
  headerStyle: string;
  footerStyle: string;
  animationEffect?: string;
  tags: string[];
}

export const TEMPLATE_CATEGORIES = [
  'سب', 'بسم اللہ', 'عید', 'رمضان', 'نعت', 'دعا', 'حدیث', 'آیت',
  'اسلامی', 'شادی', 'برتھ ڈے', 'تعزیت', 'تہنیت', 'جمعہ', 'مسجد'
];

export const BORDER_STYLES = [
  { id: 'b1', name: 'سادہ', nameUrdu: 'سادہ', icon: '▭', description: 'Simple clean border' },
  { id: 'b2', name: 'ڈبل', nameUrdu: 'ڈبل', icon: '◫', description: 'Double line border' },
  { id: 'b3', name: 'گولڈ', nameUrdu: 'سونے کا', icon: '🔲', description: 'Golden border' },
  { id: 'b4', name: 'آرچ', nameUrdu: 'محراب', icon: '🌈', description: 'Arch style' },
  { id: 'b5', name: 'ثلث', nameUrdu: 'ثلث', icon: '✦', description: 'Thuluth calligraphy border' },
  { id: 'b6', name: 'فلورل', nameUrdu: 'پھولدار', icon: '🌸', description: 'Floral Islamic border' },
  { id: 'b7', name: 'جیومیٹرک', nameUrdu: 'ہندسی', icon: '◈', description: 'Geometric pattern' },
  { id: 'b8', name: 'عربی', nameUrdu: 'عربی', icon: '☪', description: 'Arabic calligraphy border' },
  { id: 'b9', name: 'اسلامی', nameUrdu: 'اسلامی', icon: '⭐', description: 'Islamic star pattern' },
  { id: 'b10', name: 'کوفی', nameUrdu: 'کوفی', icon: '🔷', description: 'Kufic style border' },
  { id: 'b11', name: 'موتی', nameUrdu: 'موتی', icon: '○', description: 'Pearl bead border' },
  { id: 'b12', name: 'ویو', nameUrdu: 'لہر', icon: '〰', description: 'Wave border' },
  { id: 'b13', name: 'ڈاٹڈ', nameUrdu: 'نقطہ دار', icon: '···', description: 'Dotted border' },
  { id: 'b14', name: 'ڈیش', nameUrdu: 'ڈیش', icon: '---', description: 'Dashed border' },
  { id: 'b15', name: 'ستارہ', nameUrdu: 'ستارہ', icon: '★', description: 'Star border' },
  { id: 'b16', name: 'ہلال', nameUrdu: 'ہلال', icon: '☽', description: 'Crescent border' },
  { id: 'b17', name: 'گنبد', nameUrdu: 'گنبد', icon: '🕌', description: 'Dome style border' },
  { id: 'b18', name: 'قرآنی', nameUrdu: 'قرآنی', icon: '📖', description: 'Quranic style border' },
  { id: 'b19', name: 'طلوع', nameUrdu: 'طلوع', icon: '🌅', description: 'Sunrise gradient border' },
  { id: 'b20', name: 'ریشم', nameUrdu: 'ریشم', icon: '🎀', description: 'Silk ribbon border' },
];

export const EDGE_DESIGNS = [
  { id: 'ed1', name: 'کارنر گولڈ', icon: '✦', color: '#D4A017' },
  { id: 'ed2', name: 'فلورل کارنر', icon: '🌸', color: '#E91E63' },
  { id: 'ed3', name: 'ستارہ کارنر', icon: '⭐', color: '#FFD700' },
  { id: 'ed4', name: 'ہلال کارنر', icon: '☽', color: '#B8860B' },
  { id: 'ed5', name: 'جیومیٹرک کارنر', icon: '◈', color: '#1565C0' },
  { id: 'ed6', name: 'عربی کارنر', icon: '☪', color: '#2E7D32' },
  { id: 'ed7', name: 'موتی کارنر', icon: '○', color: '#9E9E9E' },
  { id: 'ed8', name: 'ڈایمنڈ کارنر', icon: '◆', color: '#00BCD4' },
  { id: 'ed9', name: 'سیدھی لکیر', icon: '━', color: '#B8860B' },
  { id: 'ed10', name: 'لہر', icon: '〰', color: '#2E7D32' },
  { id: 'ed11', name: 'نقش کارنر', icon: '❋', color: '#7B1FA2' },
  { id: 'ed12', name: 'مینی مل', icon: '▪', color: '#1A1A1A' },
  { id: 'ed13', name: 'گلاب کارنر', icon: '🌹', color: '#C62828' },
  { id: 'ed14', name: 'مسجد کارنر', icon: '🕌', color: '#1565C0' },
  { id: 'ed15', name: 'طغرا', icon: '✸', color: '#B8860B' },
];

export const HEADER_STYLES = [
  { id: 'h1', name: 'کلاسک گولڈ ہیڈر', bg: '#FFF8E1', border: '#D4A017', icon: '👑' },
  { id: 'h2', name: 'اسلامی سبز ہیڈر', bg: '#E8F5E9', border: '#2E7D32', icon: '☪' },
  { id: 'h3', name: 'رائل بلو ہیڈر', bg: '#E3F2FD', border: '#1565C0', icon: '🔵' },
  { id: 'h4', name: 'گلابی عید ہیڈر', bg: '#FCE4EC', border: '#AD1457', icon: '🌸' },
  { id: 'h5', name: 'ارغوانی ہیڈر', bg: '#F3E5F5', border: '#7B1FA2', icon: '💜' },
  { id: 'h6', name: 'محراب ہیڈر', bg: '#FFF3E0', border: '#E65100', icon: '🕌' },
  { id: 'h7', name: 'سفید ہیڈر', bg: '#FFFFFF', border: '#B8860B', icon: '🌟' },
  { id: 'h8', name: 'عربی خط ہیڈر', bg: '#FFF9F0', border: '#B8860B', icon: '✍️' },
  { id: 'h9', name: 'قرآنی ہیڈر', bg: '#E8F5E9', border: '#1B5E20', icon: '📖' },
  { id: 'h10', name: 'ستارہ ہیڈر', bg: '#FFFDE7', border: '#F57F17', icon: '⭐' },
];

export const FOOTER_STYLES = [
  { id: 'f1', name: 'کلاسک گولڈ فوٹر', bg: '#FFF8E1', border: '#D4A017', icon: '✦' },
  { id: 'f2', name: 'اسلامی فوٹر', bg: '#E8F5E9', border: '#2E7D32', icon: '☪' },
  { id: 'f3', name: 'موجی فوٹر', bg: '#E3F2FD', border: '#1565C0', icon: '〰' },
  { id: 'f4', name: 'ستارہ فوٹر', bg: '#FFFDE7', border: '#F57F17', icon: '⭐' },
  { id: 'f5', name: 'ہلال فوٹر', bg: '#FFF9F0', border: '#B8860B', icon: '☽' },
  { id: 'f6', name: 'کاغذ فوٹر', bg: '#FFF8E1', border: '#D4A017', icon: '📜' },
  { id: 'f7', name: 'فلورل فوٹر', bg: '#FCE4EC', border: '#AD1457', icon: '🌸' },
  { id: 'f8', name: 'سادہ فوٹر', bg: '#FFFFFF', border: '#9E9E9E', icon: '─' },
  { id: 'f9', name: 'کوفی فوٹر', bg: '#F3E5F5', border: '#7B1FA2', icon: '🔲' },
  { id: 'f10', name: 'قدیم فوٹر', bg: '#FFF3E0', border: '#E65100', icon: '📜' },
];

export const TITLE_DESIGNS = [
  { id: 't1', name: 'سونے کا ٹائٹل', style: 'gold', color: '#B8860B', bg: '#FFF8E1' },
  { id: 't2', name: 'اسلامی سبز', style: 'islamic', color: '#2E7D32', bg: '#E8F5E9' },
  { id: 't3', name: 'نیلا ٹائٹل', style: 'blue', color: '#1565C0', bg: '#E3F2FD' },
  { id: 't4', name: 'جامنی ٹائٹل', style: 'purple', color: '#7B1FA2', bg: '#F3E5F5' },
  { id: 't5', name: 'لال ٹائٹل', style: 'red', color: '#C62828', bg: '#FFEBEE' },
  { id: 't6', name: 'سفید ٹائٹل', style: 'white', color: '#FFFFFF', bg: '#1A1A1A' },
  { id: 't7', name: 'ٹرانسپرنٹ', style: 'transparent', color: '#B8860B', bg: 'transparent' },
  { id: 't8', name: 'گریڈینٹ', style: 'gradient', color: '#D4A017', bg: '#FFF9F0' },
];

export const LOGO_DESIGNS = [
  { id: 'l1', name: 'سرکل لوگو', shape: 'circle', icon: '⭕' },
  { id: 'l2', name: 'ہیکساگون لوگو', shape: 'hexagon', icon: '⬡' },
  { id: 'l3', name: 'شیلڈ لوگو', shape: 'shield', icon: '🛡' },
  { id: 'l4', name: 'ڈایمنڈ لوگو', shape: 'diamond', icon: '◆' },
  { id: 'l5', name: 'اسٹار لوگو', shape: 'star', icon: '⭐' },
  { id: 'l6', name: 'بینر لوگو', shape: 'banner', icon: '🏳' },
  { id: 'l7', name: 'بیج لوگو', shape: 'badge', icon: '🏅' },
  { id: 'l8', name: 'ربن لوگو', shape: 'ribbon', icon: '🎀' },
  { id: 'l9', name: 'کریسٹ لوگو', shape: 'crest', icon: '👑' },
  { id: 'l10', name: 'سیل لوگو', shape: 'seal', icon: '🔮' },
  { id: 'l11', name: 'سکرول لوگو', shape: 'scroll', icon: '📜' },
  { id: 'l12', name: 'مسجد لوگو', shape: 'mosque', icon: '🕌' },
];

export const ISLAMIC_TEMPLATES: IslamicTemplate[] = [
  // بسم اللہ Templates
  { id: 'tmpl1', name: 'Bismillah Classic', nameUrdu: 'بسم اللہ کلاسک', category: 'بسم اللہ', text: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '✦', borderStyle: 'b3', edgeDesign: 'ed1', headerStyle: 'h1', footerStyle: 'f1', tags: ['بسم اللہ', 'اسلامی'] },
  { id: 'tmpl2', name: 'Bismillah Green', nameUrdu: 'بسم اللہ سبز', category: 'بسم اللہ', text: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ', subText: 'شروع اللہ کے نام سے', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '🌿', borderStyle: 'b6', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['بسم اللہ', 'سبز'] },
  { id: 'tmpl3', name: 'Bismillah Royal', nameUrdu: 'بسم اللہ شاہی', category: 'بسم اللہ', text: 'بِسْمِ اللّٰهِ', subText: 'الرَّحْمٰنِ الرَّحِيمِ', bgColor: '#E3F2FD', textColor: '#0D47A1', borderColor: '#1565C0', decoration: '👑', borderStyle: 'b9', edgeDesign: 'ed5', headerStyle: 'h3', footerStyle: 'f3', tags: ['بسم اللہ', 'شاہی'] },
  { id: 'tmpl4', name: 'Bismillah Pearl', nameUrdu: 'بسم اللہ موتی', category: 'بسم اللہ', text: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ', bgColor: '#FAFAFA', textColor: '#B8860B', borderColor: '#9E9E9E', decoration: '🌟', borderStyle: 'b11', edgeDesign: 'ed7', headerStyle: 'h7', footerStyle: 'f8', tags: ['بسم اللہ', 'موتی'] },

  // عید Templates
  { id: 'tmpl5', name: 'Eid Mubarak Classic', nameUrdu: 'عید مبارک کلاسک', category: 'عید', text: 'عید مبارک', subText: 'تقبل اللہ منا ومنكم', bgColor: '#FFF9F0', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🌙', borderStyle: 'b3', edgeDesign: 'ed1', headerStyle: 'h1', footerStyle: 'f1', tags: ['عید', 'مبارک'] },
  { id: 'tmpl6', name: 'Eid Pink', nameUrdu: 'عید گلابی', category: 'عید', text: 'عید مبارک', subText: 'خوشیاں بانٹیں', bgColor: '#FCE4EC', textColor: '#880E4F', borderColor: '#AD1457', decoration: '🌸', borderStyle: 'b6', edgeDesign: 'ed13', headerStyle: 'h4', footerStyle: 'f7', tags: ['عید', 'گلابی'] },
  { id: 'tmpl7', name: 'Eid Stars', nameUrdu: 'عید ستارے', category: 'عید', text: 'عید الفطر مبارک', subText: '🌙⭐ تقبل اللہ ⭐🌙', bgColor: '#FFFDE7', textColor: '#F57F17', borderColor: '#F9A825', decoration: '⭐', borderStyle: 'b15', edgeDesign: 'ed3', headerStyle: 'h10', footerStyle: 'f4', tags: ['عید', 'ستارے'] },
  { id: 'tmpl8', name: 'Eid Adha', nameUrdu: 'عید الاضحی', category: 'عید', text: 'عید الاضحیٰ مبارک', subText: 'قربانی قبول ہو', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '🐑', borderStyle: 'b2', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['عید الاضحی', 'قربانی'] },

  // رمضان Templates
  { id: 'tmpl9', name: 'Ramadan Mubarak', nameUrdu: 'رمضان مبارک', category: 'رمضان', text: 'رمضان المبارک', subText: 'ماہ صیام مبارک ہو', bgColor: '#F3E5F5', textColor: '#6A1B9A', borderColor: '#7B1FA2', decoration: '🌙', borderStyle: 'b16', edgeDesign: 'ed4', headerStyle: 'h5', footerStyle: 'f9', tags: ['رمضان', 'مبارک'] },
  { id: 'tmpl10', name: 'Ramadan Kareem', nameUrdu: 'رمضان کریم', category: 'رمضان', text: 'رمضان کریم', subText: 'روزے مبارک ہوں', bgColor: '#E8EAF6', textColor: '#283593', borderColor: '#3949AB', decoration: '✨', borderStyle: 'b9', edgeDesign: 'ed8', headerStyle: 'h3', footerStyle: 'f3', tags: ['رمضان', 'کریم'] },
  { id: 'tmpl11', name: 'Sehri Iftaar', nameUrdu: 'سحری افطار', category: 'رمضان', text: 'سحری و افطار مبارک', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🌅', borderStyle: 'b19', edgeDesign: 'ed9', headerStyle: 'h1', footerStyle: 'f1', tags: ['سحری', 'افطار'] },
  { id: 'tmpl12', name: 'Laylat al-Qadr', nameUrdu: 'شبِ قدر', category: 'رمضان', text: 'لَيْلَةُ الْقَدْرِ', subText: 'شبِ قدر مبارک', bgColor: '#EDE7F6', textColor: '#4527A0', borderColor: '#512DA8', decoration: '⭐', borderStyle: 'b15', edgeDesign: 'ed11', headerStyle: 'h5', footerStyle: 'f9', tags: ['شب قدر', 'رمضان'] },

  // نعت Templates
  { id: 'tmpl13', name: 'Naat Sharif', nameUrdu: 'نعت شریف', category: 'نعت', text: 'یا رسول اللہ ﷺ', subText: 'محبوبِ خدا', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '☪', borderStyle: 'b8', edgeDesign: 'ed15', headerStyle: 'h1', footerStyle: 'f1', tags: ['نعت', 'نبی'] },
  { id: 'tmpl14', name: 'Darood Sharif', nameUrdu: 'درود شریف', category: 'نعت', text: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '🌹', borderStyle: 'b6', edgeDesign: 'ed13', headerStyle: 'h2', footerStyle: 'f2', tags: ['درود', 'نعت'] },
  { id: 'tmpl15', name: 'Milad un Nabi', nameUrdu: 'میلاد النبی ﷺ', category: 'نعت', text: 'میلاد النبی ﷺ مبارک', subText: 'ربیع الاول', bgColor: '#FFFDE7', textColor: '#F57F17', borderColor: '#F9A825', decoration: '🌙', borderStyle: 'b3', edgeDesign: 'ed3', headerStyle: 'h10', footerStyle: 'f4', tags: ['میلاد', 'نبی'] },

  // دعا Templates
  { id: 'tmpl16', name: 'Dua Morning', nameUrdu: 'صبح کی دعا', category: 'دعا', text: 'اللَّهُمَّ بَارِكْ لَنَا', subText: 'صبح کی برکت', bgColor: '#FFF9F0', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🌅', borderStyle: 'b19', edgeDesign: 'ed9', headerStyle: 'h1', footerStyle: 'f1', tags: ['دعا', 'صبح'] },
  { id: 'tmpl17', name: 'Dua Evening', nameUrdu: 'شام کی دعا', category: 'دعا', text: 'رَبِّ اغْفِرْ لِي', subText: 'شام کی دعا', bgColor: '#E3F2FD', textColor: '#0D47A1', borderColor: '#1565C0', decoration: '🌆', borderStyle: 'b3', edgeDesign: 'ed5', headerStyle: 'h3', footerStyle: 'f3', tags: ['دعا', 'شام'] },
  { id: 'tmpl18', name: 'Dua Health', nameUrdu: 'صحت کی دعا', category: 'دعا', text: 'رَبِّ أَنِّي مَسَّنِيَ الضُّرُّ', subText: 'شفاء کی دعا', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '💚', borderStyle: 'b6', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['دعا', 'صحت'] },

  // حدیث Templates
  { id: 'tmpl19', name: 'Hadith Gold', nameUrdu: 'حدیث سونا', category: 'حدیث', text: 'قَالَ رَسُولُ اللَّهِ ﷺ', subText: 'خیر آپ کے لیے', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '📖', borderStyle: 'b18', edgeDesign: 'ed1', headerStyle: 'h1', footerStyle: 'f1', tags: ['حدیث', 'رسول اللہ'] },
  { id: 'tmpl20', name: 'Hadith Blue', nameUrdu: 'حدیث نیلا', category: 'حدیث', text: 'حدیثِ نبوی ﷺ', bgColor: '#E3F2FD', textColor: '#0D47A1', borderColor: '#1565C0', decoration: '📜', borderStyle: 'b18', edgeDesign: 'ed5', headerStyle: 'h3', footerStyle: 'f3', tags: ['حدیث', 'نبوی'] },

  // آیت Templates
  { id: 'tmpl21', name: 'Ayat Gold', nameUrdu: 'آیت سونا', category: 'آیت', text: 'وَمَن يَتَّقِ اللَّهَ', subText: 'القرآن الكريم', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '📖', borderStyle: 'b18', edgeDesign: 'ed1', headerStyle: 'h9', footerStyle: 'f1', tags: ['آیت', 'قرآن'] },
  { id: 'tmpl22', name: 'Ayat Green', nameUrdu: 'آیت سبز', category: 'آیت', text: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', subText: 'سورۃ الشرح', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '☪', borderStyle: 'b8', edgeDesign: 'ed6', headerStyle: 'h9', footerStyle: 'f2', tags: ['آیت', 'قرآن'] },
  { id: 'tmpl23', name: 'Kalima', nameUrdu: 'کلمہ', category: 'آیت', text: 'لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ', bgColor: '#F3E5F5', textColor: '#4527A0', borderColor: '#7B1FA2', decoration: '☪', borderStyle: 'b9', edgeDesign: 'ed4', headerStyle: 'h5', footerStyle: 'f9', tags: ['کلمہ', 'شہادت'] },
  { id: 'tmpl24', name: 'Ayat Kursi', nameUrdu: 'آیت الکرسی', category: 'آیت', text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ', subText: 'الحي القيوم', bgColor: '#FFFDE7', textColor: '#E65100', borderColor: '#F57F17', decoration: '✨', borderStyle: 'b15', edgeDesign: 'ed3', headerStyle: 'h10', footerStyle: 'f4', tags: ['آیت الکرسی', 'قرآن'] },

  // اسلامی Templates
  { id: 'tmpl25', name: 'Allah Name', nameUrdu: 'اللہ', category: 'اسلامی', text: 'اللّٰه', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '✦', borderStyle: 'b3', edgeDesign: 'ed1', headerStyle: 'h1', footerStyle: 'f1', tags: ['اللہ', 'اسلامی'] },
  { id: 'tmpl26', name: 'Muhammad PBUH', nameUrdu: 'محمد ﷺ', category: 'اسلامی', text: 'مُحَمَّدٌ رَّسُوْلُ اللّٰه ﷺ', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '🌹', borderStyle: 'b6', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['محمد', 'اسلامی'] },
  { id: 'tmpl27', name: 'Masjid', nameUrdu: 'مسجد', category: 'مسجد', text: 'مسجد النبوی ﷺ', bgColor: '#E3F2FD', textColor: '#0D47A1', borderColor: '#1565C0', decoration: '🕌', borderStyle: 'b17', edgeDesign: 'ed14', headerStyle: 'h3', footerStyle: 'f3', tags: ['مسجد', 'اسلامی'] },
  { id: 'tmpl28', name: 'Alhamdulillah', nameUrdu: 'الحمد للہ', category: 'اسلامی', text: 'الحمد للہ', subText: 'شکر الہی', bgColor: '#FFF9F0', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🌟', borderStyle: 'b3', edgeDesign: 'ed1', headerStyle: 'h1', footerStyle: 'f1', tags: ['الحمد للہ', 'اسلامی'] },
  { id: 'tmpl29', name: 'Subhanallah', nameUrdu: 'سبحان اللہ', category: 'اسلامی', text: 'سبحان اللّٰہ', bgColor: '#E8F5E9', textColor: '#2E7D32', borderColor: '#43A047', decoration: '☘', borderStyle: 'b6', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['سبحان اللہ'] },
  { id: 'tmpl30', name: 'Mashallah', nameUrdu: 'ماشاء اللہ', category: 'اسلامی', text: 'مَاشَاءَ اللّٰهُ', bgColor: '#FFFDE7', textColor: '#F57F17', borderColor: '#F9A825', decoration: '⭐', borderStyle: 'b15', edgeDesign: 'ed3', headerStyle: 'h10', footerStyle: 'f4', tags: ['ماشاء اللہ'] },

  // شادی Templates
  { id: 'tmpl31', name: 'Wedding Classic', nameUrdu: 'شادی کلاسک', category: 'شادی', text: 'شادی مبارک', subText: 'خوشیاں برسیں', bgColor: '#FCE4EC', textColor: '#880E4F', borderColor: '#AD1457', decoration: '🌸', borderStyle: 'b6', edgeDesign: 'ed13', headerStyle: 'h4', footerStyle: 'f7', tags: ['شادی', 'مبارک'] },
  { id: 'tmpl32', name: 'Nikah', nameUrdu: 'نکاح مبارک', category: 'شادی', text: 'بارک اللہ لکما', subText: 'نکاح مبارک ہو', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '💍', borderStyle: 'b3', edgeDesign: 'ed1', headerStyle: 'h1', footerStyle: 'f1', tags: ['نکاح', 'شادی'] },
  { id: 'tmpl33', name: 'Wedding Floral', nameUrdu: 'شادی پھول', category: 'شادی', text: 'تبریک و تہنیت', subText: 'Happy Wedding', bgColor: '#F8BBD0', textColor: '#880E4F', borderColor: '#E91E63', decoration: '💐', borderStyle: 'b6', edgeDesign: 'ed13', headerStyle: 'h4', footerStyle: 'f7', tags: ['شادی', 'پھول'] },

  // برتھ ڈے Templates
  { id: 'tmpl34', name: 'Birthday Islamic', nameUrdu: 'سالگرہ اسلامی', category: 'برتھ ڈے', text: 'سالگرہ مبارک', subText: 'جیتے رہیں', bgColor: '#E3F2FD', textColor: '#0D47A1', borderColor: '#1565C0', decoration: '🎂', borderStyle: 'b3', edgeDesign: 'ed5', headerStyle: 'h3', footerStyle: 'f3', tags: ['سالگرہ', 'مبارک'] },
  { id: 'tmpl35', name: 'Birthday Gold', nameUrdu: 'سالگرہ سونا', category: 'برتھ ڈے', text: 'عمر دراز ہو', subText: 'Happy Birthday', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🎉', borderStyle: 'b3', edgeDesign: 'ed1', headerStyle: 'h1', footerStyle: 'f1', tags: ['سالگرہ', 'سونا'] },

  // تعزیت Templates
  { id: 'tmpl36', name: 'Taziyat', nameUrdu: 'تعزیت', category: 'تعزیت', text: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ', subText: 'اللہ رحمت نازل فرمائے', bgColor: '#F5F5F5', textColor: '#424242', borderColor: '#757575', decoration: '🤲', borderStyle: 'b1', edgeDesign: 'ed12', headerStyle: 'h7', footerStyle: 'f8', tags: ['تعزیت', 'وفات'] },
  { id: 'tmpl37', name: 'Urooj', nameUrdu: 'عروج', category: 'تعزیت', text: 'مرحوم و مغفور', subText: 'جنت الفردوس میں جگہ ملے', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '🌿', borderStyle: 'b6', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['تعزیت', 'مرحوم'] },

  // تہنیت Templates
  { id: 'tmpl38', name: 'Congratulations', nameUrdu: 'مبارک باد', category: 'تہنیت', text: 'مبارک ہو', subText: 'اللہ مزید کامیابیاں دے', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🏆', borderStyle: 'b3', edgeDesign: 'ed1', headerStyle: 'h1', footerStyle: 'f1', tags: ['مبارک', 'تہنیت'] },
  { id: 'tmpl39', name: 'Success', nameUrdu: 'کامیابی', category: 'تہنیت', text: 'کامیابی مبارک', subText: 'مزید ترقی ملے', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '⭐', borderStyle: 'b15', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['کامیابی', 'مبارک'] },

  // جمعہ Templates
  { id: 'tmpl40', name: 'Jumma Mubarak', nameUrdu: 'جمعہ مبارک', category: 'جمعہ', text: 'جمعہ مبارک', subText: 'سید الایام', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '☪', borderStyle: 'b8', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['جمعہ', 'مبارک'] },
  { id: 'tmpl41', name: 'Jumma Gold', nameUrdu: 'جمعہ سونا', category: 'جمعہ', text: 'جُمُعَۃُ الْمُبَارَک', subText: 'یوم الجمعہ', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🌙', borderStyle: 'b3', edgeDesign: 'ed1', headerStyle: 'h1', footerStyle: 'f1', tags: ['جمعہ', 'سونا'] },

  // More Islamic
  { id: 'tmpl42', name: 'Hajj Mubarak', nameUrdu: 'حج مبارک', category: 'اسلامی', text: 'حج مبارک', subText: 'حج مقبول ہو', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🕋', borderStyle: 'b3', edgeDesign: 'ed1', headerStyle: 'h1', footerStyle: 'f1', tags: ['حج', 'مکہ'] },
  { id: 'tmpl43', name: 'Umrah', nameUrdu: 'عمرہ مبارک', category: 'اسلامی', text: 'عمرہ مقبول ہو', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '🕋', borderStyle: 'b6', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['عمرہ', 'مبارک'] },
  { id: 'tmpl44', name: 'Shab e Barat', nameUrdu: 'شبِ برات', category: 'اسلامی', text: 'شبِ برات مبارک', subText: 'بخشش کی رات', bgColor: '#E8EAF6', textColor: '#283593', borderColor: '#3949AB', decoration: '✨', borderStyle: 'b9', edgeDesign: 'ed8', headerStyle: 'h5', footerStyle: 'f9', tags: ['شب برات'] },
  { id: 'tmpl45', name: 'Shab e Miraj', nameUrdu: 'شبِ معراج', category: 'اسلامی', text: 'شبِ معراج مبارک', bgColor: '#F3E5F5', textColor: '#6A1B9A', borderColor: '#7B1FA2', decoration: '🌟', borderStyle: 'b15', edgeDesign: 'ed4', headerStyle: 'h5', footerStyle: 'f9', tags: ['معراج'] },
  { id: 'tmpl46', name: 'Muharram', nameUrdu: 'محرم', category: 'اسلامی', text: 'محرم الحرام', subText: 'ماہ محرم مبارک', bgColor: '#FFEBEE', textColor: '#B71C1C', borderColor: '#C62828', decoration: '🌙', borderStyle: 'b16', edgeDesign: 'ed4', headerStyle: 'h4', footerStyle: 'f7', tags: ['محرم', 'اسلامی'] },
  { id: 'tmpl47', name: 'Rabi ul Awal', nameUrdu: 'ربیع الاول', category: 'نعت', text: 'ربیع الاول مبارک', subText: '12 ربیع الاول', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🌹', borderStyle: 'b3', edgeDesign: 'ed13', headerStyle: 'h1', footerStyle: 'f1', tags: ['ربیع الاول', 'میلاد'] },
  { id: 'tmpl48', name: 'Tazkira', nameUrdu: 'تذکرہ', category: 'اسلامی', text: 'یاد الہی', subText: 'ذکر اللہ', bgColor: '#FFF9F0', textColor: '#B8860B', borderColor: '#D4A017', decoration: '📿', borderStyle: 'b3', edgeDesign: 'ed1', headerStyle: 'h1', footerStyle: 'f1', tags: ['ذکر', 'اسلامی'] },
  { id: 'tmpl49', name: 'Wazifa', nameUrdu: 'وظیفہ', category: 'دعا', text: 'اَللَّهُ أَكْبَر', subText: 'وظیفہ', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '📿', borderStyle: 'b6', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['وظیفہ', 'دعا'] },
  { id: 'tmpl50', name: 'Tahajjud', nameUrdu: 'تہجد', category: 'اسلامی', text: 'صلوٰۃ التہجد', subText: 'قیام اللیل', bgColor: '#E8EAF6', textColor: '#283593', borderColor: '#3949AB', decoration: '🌙', borderStyle: 'b16', edgeDesign: 'ed8', headerStyle: 'h3', footerStyle: 'f3', tags: ['تہجد', 'نماز'] },
  { id: 'tmpl51', name: 'Salah', nameUrdu: 'نماز', category: 'اسلامی', text: 'الصَّلٰوةُ خَيْرٌ مِّنَ النَّوْمِ', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🕌', borderStyle: 'b17', edgeDesign: 'ed14', headerStyle: 'h9', footerStyle: 'f1', tags: ['نماز', 'اذان'] },
  { id: 'tmpl52', name: 'Zakat', nameUrdu: 'زکوٰۃ', category: 'اسلامی', text: 'زکوٰۃ ادا کریں', subText: 'مال پاک ہوگا', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '💚', borderStyle: 'b6', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['زکوٰۃ', 'اسلامی'] },
  { id: 'tmpl53', name: 'Sadqa', nameUrdu: 'صدقہ', category: 'اسلامی', text: 'صدقہ دیں', subText: 'صدقہ بلا ٹالتا ہے', bgColor: '#FFF3E0', textColor: '#E65100', borderColor: '#F57F17', decoration: '🤲', borderStyle: 'b19', edgeDesign: 'ed9', headerStyle: 'h10', footerStyle: 'f4', tags: ['صدقہ', 'خیرات'] },
  { id: 'tmpl54', name: 'Quran Pak', nameUrdu: 'قرآن پاک', category: 'آیت', text: 'قُلْ هُوَ اللَّهُ أَحَد', subText: 'سورۃ الاخلاص', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '📖', borderStyle: 'b18', edgeDesign: 'ed6', headerStyle: 'h9', footerStyle: 'f2', tags: ['قرآن', 'سورۃ'] },
  { id: 'tmpl55', name: 'Pakistan Green', nameUrdu: 'پاکستان', category: 'اسلامی', text: 'پاکستان زندہ باد', subText: 'لا الہ الا اللہ', bgColor: '#E8F5E9', textColor: '#1B5E20', borderColor: '#2E7D32', decoration: '☪', borderStyle: 'b9', edgeDesign: 'ed6', headerStyle: 'h2', footerStyle: 'f2', tags: ['پاکستان', 'اسلامی'] },
  { id: 'tmpl56', name: 'Azkar Morning', nameUrdu: 'اذکار صبح', category: 'دعا', text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ', bgColor: '#FFF9F0', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🌅', borderStyle: 'b19', edgeDesign: 'ed9', headerStyle: 'h1', footerStyle: 'f1', tags: ['اذکار', 'صبح'] },
  { id: 'tmpl57', name: 'Nabi Ki Shan', nameUrdu: 'نبی کی شان', category: 'نعت', text: 'رحمۃ للعالمین ﷺ', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '🌹', borderStyle: 'b8', edgeDesign: 'ed15', headerStyle: 'h1', footerStyle: 'f1', tags: ['نبی', 'رحمت'] },
  { id: 'tmpl58', name: 'Islamic New Year', nameUrdu: 'اسلامی نیا سال', category: 'اسلامی', text: 'نیا اسلامی سال مبارک', subText: 'ہجری سال', bgColor: '#E8EAF6', textColor: '#283593', borderColor: '#3949AB', decoration: '🌙', borderStyle: 'b16', edgeDesign: 'ed4', headerStyle: 'h3', footerStyle: 'f3', tags: ['اسلامی', 'نیا سال'] },
  { id: 'tmpl59', name: 'Quran Majeed 2', nameUrdu: 'قرآن مجید', category: 'آیت', text: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ', subText: 'سورۃ الضحیٰ', bgColor: '#FFF8E1', textColor: '#B8860B', borderColor: '#D4A017', decoration: '✨', borderStyle: 'b18', edgeDesign: 'ed1', headerStyle: 'h9', footerStyle: 'f1', tags: ['قرآن', 'آیت'] },
  { id: 'tmpl60', name: 'Tasbih', nameUrdu: 'تسبیح', category: 'دعا', text: 'سبحان اللہ و بحمدہ', subText: 'سبحان اللہ العظیم', bgColor: '#F3E5F5', textColor: '#6A1B9A', borderColor: '#7B1FA2', decoration: '📿', borderStyle: 'b15', edgeDesign: 'ed11', headerStyle: 'h5', footerStyle: 'f9', tags: ['تسبیح', 'ذکر'] },
];
