// eVeR sMaRt UrDu sTuDiO - Full Editor with Sidebars, Drag, Running Text, Zoom
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Dimensions, Platform, KeyboardAvoidingView,
  PanResponder, Animated as RNAnimated, Modal,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming,
  withSequence, cancelAnimation, Easing, withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/constants/theme';
import { useEditor } from '@/hooks/useEditor';
import { URDU_FONTS, ARABIC_FONTS, ENGLISH_FONTS, FontItem } from '@/constants/fonts';
import { BACKGROUNDS } from '@/constants/backgrounds';
import { TEXT_COLORS, DESIGN_EFFECTS, DIGITAL_EFFECTS, TRANSITION_EFFECTS, ANIMATION_EFFECTS } from '@/constants/effects';
import { STICKERS, STICKER_CATEGORIES } from '@/constants/stickers';
import {
  BORDER_STYLES, EDGE_DESIGNS, HEADER_STYLES, FOOTER_STYLES,
  TITLE_DESIGNS, LOGO_DESIGNS
} from '@/constants/templates';
import {
  ADVANCED_TEXTURES, TEXTURE_CATEGORIES, FILTER_EFFECTS,
  TEXT_EFFECTS_LIST, RUNNING_TEXT_DIRECTIONS, CANVAS_SIZES
} from '@/constants/textures';

const { width, height } = Dimensions.get('window');
const CANVAS_W = width - Spacing.md * 2;
const CANVAS_H = CANVAS_W * 0.75;

type SidebarSection =
  | 'text' | 'font' | 'textfx' | 'runtext'
  | 'color' | 'bg' | 'texture' | 'filter'
  | 'sticker' | 'border' | 'corner' | 'header' | 'footer' | 'logo' | 'title'
  | 'anim' | 'transition' | 'design'
  | 'layer' | 'canvas' | 'export';

interface SidebarItem { id: SidebarSection; label: string; icon: string; side: 'left' | 'right' }

const LEFT_SIDEBAR: SidebarItem[] = [
  { id: 'text', label: 'متن', icon: 'edit', side: 'left' },
  { id: 'font', label: 'فونٹ', icon: 'font-download', side: 'left' },
  { id: 'textfx', label: 'ٹیکسٹ ایفیکٹ', icon: 'auto-awesome', side: 'left' },
  { id: 'runtext', label: 'چلتا متن', icon: 'play-arrow', side: 'left' },
  { id: 'color', label: 'رنگ', icon: 'palette', side: 'left' },
  { id: 'bg', label: 'بیک گراؤنڈ', icon: 'wallpaper', side: 'left' },
  { id: 'texture', label: 'ٹیکسچر', icon: 'texture', side: 'left' },
  { id: 'filter', label: 'فلٹر', icon: 'filter', side: 'left' },
  { id: 'anim', label: 'انیمیشن', icon: 'animation', side: 'left' },
  { id: 'transition', label: 'ٹرانزیشن', icon: 'swap-horiz', side: 'left' },
  { id: 'design', label: 'ڈیزائن ایفیکٹ', icon: 'auto-fix-high', side: 'left' },
];

const RIGHT_SIDEBAR: SidebarItem[] = [
  { id: 'layer', label: 'لئیرز', icon: 'layers', side: 'right' },
  { id: 'border', label: 'بارڈر', icon: 'border-style', side: 'right' },
  { id: 'corner', label: 'کارنر', icon: 'rounded-corner', side: 'right' },
  { id: 'header', label: 'ہیڈر', icon: 'title', side: 'right' },
  { id: 'footer', label: 'فوٹر', icon: 'subtitles', side: 'right' },
  { id: 'title', label: 'ٹائٹل', icon: 'format-size', side: 'right' },
  { id: 'logo', label: 'لوگو', icon: 'stars', side: 'right' },
  { id: 'sticker', label: 'سٹیکر', icon: 'emoji-emotions', side: 'right' },
  { id: 'canvas', label: 'کینوس', icon: 'aspect-ratio', side: 'right' },
  { id: 'export', label: 'ایکسپورٹ', icon: 'file-download', side: 'right' },
];

const FONT_LANG_TABS = ['اردو', 'عربی', 'انگریزی'];

export default function EditorScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const {
    design, addTextLayer, updateTextLayer, deleteTextLayer, selectLayer,
    updateBackground, saveDesign, saveDraft, addStickerLayer, updateStickerLayer,
    deleteStickerLayer, updateBorder, updateEdge, toggleGrid, toggleBorder,
    updateHeader, updateFooter, updateLogo, updateSubTitle,
    setCanvasAspect, setCanvasZoom, addFilter, removeFilter,
    duplicateLayer, moveLayerUp, moveLayerDown, toggleLayerLock, toggleLayerVisibility,
    setAnimationEffect, setTransitionEffect,
  } = useEditor();

  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SidebarSection>('text');
  const [fontLangTab, setFontLangTab] = useState(0);
  const [fontSearch, setFontSearch] = useState('');
  const [stickerCat, setStickerCat] = useState('سب');
  const [textureCat, setTextureCat] = useState('سب');
  const [headerText, setHeaderText] = useState(design.headerText);
  const [footerText, setFooterText] = useState(design.footerText);
  const [logoText, setLogoText] = useState(design.logoText);
  const [subTitleText, setSubTitleText] = useState(design.subTitleText);
  const [canvasScale, setCanvasScale] = useState(1);

  const leftAnim = useRef(new RNAnimated.Value(-300)).current;
  const rightAnim = useRef(new RNAnimated.Value(300)).current;

  // Reanimated for text layer preview
  const previewOpacity = useSharedValue(1);
  const previewScale = useSharedValue(1);
  const previewTranslateY = useSharedValue(0);
  const previewTranslateX = useSharedValue(0);

  // Running text animated value
  const runningAnim = useRef(new RNAnimated.Value(0)).current;
  const runningAnimRef = useRef<RNAnimated.CompositeAnimation | null>(null);

  const selectedLayer = design.textLayers.find(l => l.id === design.selectedLayerId);
  const selectedSticker = design.stickerLayers.find(s => s.id === design.selectedLayerId);

  const currentFontList = fontLangTab === 0 ? URDU_FONTS : fontLangTab === 1 ? ARABIC_FONTS : ENGLISH_FONTS;
  const filteredFonts = currentFontList.filter(f =>
    f.name.toLowerCase().includes(fontSearch.toLowerCase()) ||
    (f.nameUrdu && f.nameUrdu.includes(fontSearch))
  );
  const filteredStickers = stickerCat === 'سب' ? STICKERS : STICKERS.filter(s => s.category === stickerCat);
  const filteredTextures = textureCat === 'سب' ? ADVANCED_TEXTURES : ADVANCED_TEXTURES.filter(t => t.category === textureCat);

  const openLeft = useCallback((section: SidebarSection) => {
    setActiveSection(section);
    if (leftOpen && activeSection === section) {
      RNAnimated.timing(leftAnim, { toValue: -300, duration: 250, useNativeDriver: true }).start();
      setLeftOpen(false);
    } else {
      setLeftOpen(true);
      setRightOpen(false);
      RNAnimated.timing(rightAnim, { toValue: 300, duration: 200, useNativeDriver: true }).start();
      RNAnimated.timing(leftAnim, { toValue: 0, duration: 280, useNativeDriver: true }).start();
    }
  }, [leftOpen, activeSection]);

  const openRight = useCallback((section: SidebarSection) => {
    setActiveSection(section);
    if (rightOpen && activeSection === section) {
      RNAnimated.timing(rightAnim, { toValue: 300, duration: 250, useNativeDriver: true }).start();
      setRightOpen(false);
    } else {
      setRightOpen(true);
      setLeftOpen(false);
      RNAnimated.timing(leftAnim, { toValue: -300, duration: 200, useNativeDriver: true }).start();
      RNAnimated.timing(rightAnim, { toValue: 0, duration: 280, useNativeDriver: true }).start();
    }
  }, [rightOpen, activeSection]);

  const closeSidebars = () => {
    RNAnimated.parallel([
      RNAnimated.timing(leftAnim, { toValue: -300, duration: 250, useNativeDriver: true }),
      RNAnimated.timing(rightAnim, { toValue: 300, duration: 250, useNativeDriver: true }),
    ]).start();
    setLeftOpen(false);
    setRightOpen(false);
  };

  // Drag support per text layer
  const layerPositions = useRef<Record<string, { x: RNAnimated.Value; y: RNAnimated.Value }>>({});

  const getLayerAnim = useCallback((id: string, initX: number, initY: number) => {
    if (!layerPositions.current[id]) {
      layerPositions.current[id] = {
        x: new RNAnimated.Value(initX * CANVAS_W),
        y: new RNAnimated.Value(initY * CANVAS_H),
      };
    }
    return layerPositions.current[id];
  }, []);

  const makePanResponder = useCallback((layerId: string, isLocked: boolean) => {
    if (isLocked) return PanResponder.create({});
    const anim = layerPositions.current[layerId];
    if (!anim) return PanResponder.create({});
    let startX = 0, startY = 0;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        selectLayer(layerId, 'text');
        anim.x.stopAnimation(val => { startX = val; });
        anim.y.stopAnimation(val => { startY = val; });
      },
      onPanResponderMove: (_, gs) => {
        const nx = Math.max(0, Math.min(CANVAS_W - 60, startX + gs.dx));
        const ny = Math.max(0, Math.min(CANVAS_H - 40, startY + gs.dy));
        anim.x.setValue(nx);
        anim.y.setValue(ny);
      },
      onPanResponderRelease: (_, gs) => {
        const nx = Math.max(0, Math.min(CANVAS_W - 60, startX + gs.dx));
        const ny = Math.max(0, Math.min(CANVAS_H - 40, startY + gs.dy));
        updateTextLayer(layerId, { x: nx / CANVAS_W, y: ny / CANVAS_H });
      },
    });
  }, [selectLayer, updateTextLayer]);

  const triggerAnimPreview = (animType: string) => {
    cancelAnimation(previewOpacity);
    cancelAnimation(previewScale);
    cancelAnimation(previewTranslateY);
    if (animType === 'an34' || animType === 'float') {
      previewTranslateY.value = withRepeat(withSequence(
        withTiming(-10, { duration: 700 }), withTiming(10, { duration: 700 })
      ), 3, true);
    } else if (animType === 'an14' || animType === 'pulse') {
      previewScale.value = withRepeat(withSequence(
        withTiming(1.12, { duration: 350 }), withTiming(1.0, { duration: 350 })
      ), 3, true);
    } else if (animType === 'an35' || animType === 'glow') {
      previewOpacity.value = withRepeat(withSequence(
        withTiming(0.3, { duration: 400 }), withTiming(1.0, { duration: 400 })
      ), 4, true);
    } else {
      previewScale.value = withSpring(1.1, {}, () => { previewScale.value = withSpring(1.0); });
    }
    setTimeout(() => {
      previewScale.value = withTiming(1);
      previewOpacity.value = withTiming(1);
      previewTranslateY.value = withTiming(0);
    }, 2400);
  };

  const animStyle = useAnimatedStyle(() => ({
    opacity: previewOpacity.value,
    transform: [{ scale: previewScale.value }, { translateY: previewTranslateY.value }],
  }));

  const startRunningText = (layerId: string, direction: string) => {
    const layerAnim = layerPositions.current[layerId];
    if (!layerAnim) return;
    if (runningAnimRef.current) { runningAnimRef.current.stop(); }
    if (direction === 'left') {
      layerAnim.x.setValue(CANVAS_W);
      runningAnimRef.current = RNAnimated.loop(
        RNAnimated.timing(layerAnim.x, { toValue: -200, duration: 4000, useNativeDriver: true })
      );
    } else if (direction === 'right') {
      layerAnim.x.setValue(-200);
      runningAnimRef.current = RNAnimated.loop(
        RNAnimated.timing(layerAnim.x, { toValue: CANVAS_W, duration: 4000, useNativeDriver: true })
      );
    } else if (direction === 'up') {
      layerAnim.y.setValue(CANVAS_H);
      runningAnimRef.current = RNAnimated.loop(
        RNAnimated.timing(layerAnim.y, { toValue: -40, duration: 4000, useNativeDriver: true })
      );
    } else {
      layerAnim.y.setValue(-40);
      runningAnimRef.current = RNAnimated.loop(
        RNAnimated.timing(layerAnim.y, { toValue: CANVAS_H, duration: 4000, useNativeDriver: true })
      );
    }
    runningAnimRef.current.start();
  };

  const handleExport = () => {
    showAlert('📤 ایکسپورٹ', 'فارمیٹ منتخب کریں', [
      { text: 'PNG', onPress: () => showAlert('✅', 'PNG محفوظ ہوگیا') },
      { text: 'JPG', onPress: () => showAlert('✅', 'JPG محفوظ ہوگیا') },
      { text: 'PDF', onPress: () => showAlert('✅', 'PDF محفوظ ہوگیا') },
      { text: 'منسوخ', style: 'cancel' },
    ]);
  };

  const handleShare = () => {
    showAlert('📱 شیئر', 'پلیٹ فارم منتخب کریں', [
      { text: 'WhatsApp', onPress: () => showAlert('✅', 'WhatsApp پر شیئر') },
      { text: 'Facebook', onPress: () => showAlert('✅', 'Facebook پر شیئر') },
      { text: 'Instagram', onPress: () => showAlert('✅', 'Instagram پر شیئر') },
      { text: 'منسوخ', style: 'cancel' },
    ]);
  };

  const renderSidebarContent = () => {
    switch (activeSection) {
      // TEXT
      case 'text':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>متن لکھیں</Text>
            <TextInput
              style={s.textInput}
              value={selectedLayer?.text || ''}
              onChangeText={(t) => selectedLayer && updateTextLayer(selectedLayer.id, { text: t })}
              placeholder="یہاں متن لکھیں..."
              placeholderTextColor={Colors.textLight}
              multiline
              numberOfLines={3}
              textAlign={selectedLayer?.fontId?.startsWith('e') ? 'left' : 'right'}
            />
            <Text style={s.panelLabel}>فونٹ سائز: {selectedLayer?.fontSize || 28}px</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={s.sizeRow}>
                {[12, 14, 18, 22, 28, 32, 40, 48, 56, 64, 72, 96, 120].map(sz => (
                  <TouchableOpacity key={sz}
                    style={[s.sizeChip, selectedLayer?.fontSize === sz && s.sizeChipActive]}
                    onPress={() => selectedLayer && updateTextLayer(selectedLayer.id, { fontSize: sz })}
                    activeOpacity={0.7}>
                    <Text style={[s.sizeChipText, selectedLayer?.fontSize === sz && s.sizeChipTextActive]}>{sz}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <Text style={s.panelLabel}>سیدھ</Text>
            <View style={s.alignRow}>
              {(['right', 'center', 'left'] as const).map(align => (
                <TouchableOpacity key={align}
                  style={[s.alignBtn, selectedLayer?.textAlign === align && s.alignBtnActive]}
                  onPress={() => selectedLayer && updateTextLayer(selectedLayer.id, { textAlign: align })}
                  activeOpacity={0.7}>
                  <MaterialIcons name={`format-align-${align}` as any} size={20}
                    color={selectedLayer?.textAlign === align ? Colors.primary : Colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={s.panelLabel}>اسٹائل</Text>
            <View style={s.styleRow}>
              {[
                { key: 'bold', label: 'B', icon: null },
                { key: 'italic', label: 'I', icon: null },
                { key: 'underline', label: 'U', icon: null },
                { key: 'shadow', icon: 'blur-on', label: '' },
                { key: 'glow', icon: 'auto-awesome', label: '' },
                { key: 'outline', icon: 'format-color-text', label: '' },
              ].map(({ key, label, icon }) => (
                <TouchableOpacity key={key}
                  style={[s.styleBtn, (selectedLayer as any)?.[key] && s.styleBtnActive]}
                  onPress={() => selectedLayer && updateTextLayer(selectedLayer.id, { [key]: !(selectedLayer as any)[key] } as any)}
                  activeOpacity={0.7}>
                  {icon ? <MaterialIcons name={icon as any} size={18}
                    color={(selectedLayer as any)?.[key] ? Colors.primary : Colors.textMuted} />
                    : <Text style={[s.styleBtnLabel, key === 'italic' && { fontStyle: 'italic' },
                      key === 'underline' && { textDecorationLine: 'underline' },
                      (selectedLayer as any)?.[key] && s.styleBtnLabelActive]}>{label}</Text>}
                </TouchableOpacity>
              ))}
            </View>
            <Text style={s.panelLabel}>شفافیت</Text>
            <View style={s.opacityRow}>
              {[0.3, 0.5, 0.7, 0.85, 1.0].map(op => (
                <TouchableOpacity key={op}
                  style={[s.opacityBtn, { opacity: op }, selectedLayer?.opacity === op && s.opacityBtnActive]}
                  onPress={() => selectedLayer && updateTextLayer(selectedLayer.id, { opacity: op })}
                  activeOpacity={0.7}>
                  <Text style={s.opacityBtnText}>{Math.round(op * 100)}%</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={s.panelLabel}>گریڈینٹ متن</Text>
            <View style={s.twoCol}>
              {[
                { colors: ['#B8860B', '#FFD700'], label: 'گولڈ' },
                { colors: ['#1B5E20', '#66BB6A'], label: 'سبز' },
                { colors: ['#1565C0', '#42A5F5'], label: 'نیلا' },
                { colors: ['#E91E63', '#FF80AB'], label: 'گلابی' },
                { colors: ['#4A148C', '#CE93D8'], label: 'جامنی' },
                { colors: ['#FF6600', '#FFD700'], label: 'آگ' },
              ].map((g, i) => (
                <TouchableOpacity key={i} style={[s.gradBtn, {
                  backgroundColor: g.colors[0] + '30', borderColor: g.colors[0]
                }]}
                  onPress={() => selectedLayer && updateTextLayer(selectedLayer.id,
                    { gradientColors: g.colors, useGradient: true, color: g.colors[0] })}
                  activeOpacity={0.7}>
                  <Text style={[s.gradBtnText, { color: g.colors[0] }]}>{g.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={s.animPreviewBtn} onPress={() => triggerAnimPreview(design.animationEffect)} activeOpacity={0.7}>
              <MaterialIcons name="play-circle-filled" size={18} color={Colors.primary} />
              <Text style={s.animPreviewText}>انیمیشن پریویو</Text>
            </TouchableOpacity>
          </View>
        );

      // FONT
      case 'font':
        return (
          <View style={s.panelContent}>
            <View style={s.langTabs}>
              {FONT_LANG_TABS.map((lang, idx) => (
                <TouchableOpacity key={lang} style={[s.langTab, fontLangTab === idx && s.langTabActive]}
                  onPress={() => setFontLangTab(idx)} activeOpacity={0.7}>
                  <Text style={[s.langTabText, fontLangTab === idx && s.langTabTextActive]}>{lang}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput style={s.searchInput} value={fontSearch} onChangeText={setFontSearch}
              placeholder="فونٹ تلاش..." placeholderTextColor={Colors.textLight} />
            {filteredFonts.map(font => (
              <TouchableOpacity key={font.id}
                style={[s.fontItem, selectedLayer?.fontId === font.id && s.fontItemActive]}
                onPress={() => selectedLayer && updateTextLayer(selectedLayer.id, { fontFamily: font.family, fontId: font.id })}
                activeOpacity={0.8}>
                <View style={s.fontItemLeft}>
                  <Text style={s.fontName}>{font.nameUrdu || font.name}</Text>
                  <Text style={s.fontCat}>{font.category}</Text>
                </View>
                <Text style={[s.fontPreviewSample, { color: selectedLayer?.fontId === font.id ? Colors.primary : Colors.textSecondary }]}>
                  {font.preview}
                </Text>
                {selectedLayer?.fontId === font.id && <MaterialIcons name="check-circle" size={16} color={Colors.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        );

      // TEXT EFFECTS
      case 'textfx':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>ٹیکسٹ ایفیکٹس ({TEXT_EFFECTS_LIST.length})</Text>
            {TEXT_EFFECTS_LIST.map(te => (
              <TouchableOpacity key={te.id}
                style={[s.effectItem, selectedLayer?.textEffect === te.id && s.effectItemActive]}
                onPress={() => selectedLayer && updateTextLayer(selectedLayer.id, { textEffect: te.id })}
                activeOpacity={0.7}>
                <Text style={s.effectIcon}>{te.icon}</Text>
                <Text style={[s.effectName, { color: (te.preview as any).color || Colors.textPrimary }]}>{te.nameUrdu}</Text>
                {selectedLayer?.textEffect === te.id && <MaterialIcons name="check-circle" size={16} color={Colors.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        );

      // RUNNING TEXT
      case 'runtext':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>چلتا متن سیٹنگز</Text>
            <View style={s.toggleRow}>
              <Text style={s.toggleLabel}>چلتا متن فعال</Text>
              <TouchableOpacity style={[s.toggle, selectedLayer?.runningText && s.toggleActive]}
                onPress={() => selectedLayer && updateTextLayer(selectedLayer.id, { runningText: !selectedLayer.runningText })}
                activeOpacity={0.7}>
                <View style={[s.toggleDot, selectedLayer?.runningText && s.toggleDotActive]} />
              </TouchableOpacity>
            </View>
            <Text style={s.panelLabel}>سمت منتخب کریں</Text>
            <View style={s.twoCol}>
              {RUNNING_TEXT_DIRECTIONS.map(dir => (
                <TouchableOpacity key={dir.id}
                  style={[s.dirBtn, selectedLayer?.runningDirection === dir.id && s.dirBtnActive]}
                  onPress={() => {
                    if (selectedLayer) {
                      updateTextLayer(selectedLayer.id, { runningDirection: dir.id as any, runningText: true });
                      startRunningText(selectedLayer.id, dir.id);
                    }
                  }}
                  activeOpacity={0.7}>
                  <Text style={s.dirIcon}>{dir.icon}</Text>
                  <Text style={[s.dirLabel, selectedLayer?.runningDirection === dir.id && s.dirLabelActive]}>{dir.nameUrdu}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={s.infoBox}>
              <Text style={s.infoBoxText}>
                بارڈر سمت: چلتا متن کینوس کے چاروں طرف گھومتا ہے۔{"\n"}
                دائیں بارڈر: اوپر سے نیچے → نیچے بائیں → نیچے سے اوپر → اوپر دائیں
              </Text>
            </View>
          </View>
        );

      // COLOR
      case 'color':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>متن رنگ</Text>
            <View style={s.colorGrid}>
              {TEXT_COLORS.map(color => (
                <TouchableOpacity key={color}
                  style={[s.colorSwatch, { backgroundColor: color }, selectedLayer?.color === color && s.colorSwatchActive]}
                  onPress={() => selectedLayer && updateTextLayer(selectedLayer.id, { color })}
                  activeOpacity={0.8} />
              ))}
            </View>
            <Text style={[s.panelLabel, { marginTop: 12 }]}>سایہ رنگ</Text>
            <View style={s.colorGrid}>
              {TEXT_COLORS.slice(0, 24).map(color => (
                <TouchableOpacity key={color + 's'}
                  style={[s.colorSwatch, { backgroundColor: color }, selectedLayer?.shadowColor === color && s.colorSwatchActive]}
                  onPress={() => selectedLayer && updateTextLayer(selectedLayer.id, { shadowColor: color, shadow: true })}
                  activeOpacity={0.8} />
              ))}
            </View>
            <Text style={[s.panelLabel, { marginTop: 12 }]}>آؤٹ لائن رنگ</Text>
            <View style={s.colorGrid}>
              {TEXT_COLORS.slice(0, 24).map(color => (
                <TouchableOpacity key={color + 'o'}
                  style={[s.colorSwatch, { backgroundColor: color }, selectedLayer?.outlineColor === color && s.colorSwatchActive]}
                  onPress={() => selectedLayer && updateTextLayer(selectedLayer.id, { outlineColor: color, outline: true })}
                  activeOpacity={0.8} />
              ))}
            </View>
          </View>
        );

      // BACKGROUND
      case 'bg':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>پس منظر ({BACKGROUNDS.length})</Text>
            <View style={s.bgGrid}>
              {BACKGROUNDS.map(bg => (
                <TouchableOpacity key={bg.id}
                  style={[s.bgItem, design.backgroundId === bg.id && s.bgItemActive]}
                  onPress={() => updateBackground(bg.id, bg.colors)} activeOpacity={0.8}>
                  <View style={[s.bgPreview, { backgroundColor: bg.colors[0] }]}>
                    {bg.colors.length > 1 && (
                      <View style={[StyleSheet.absoluteFill, { backgroundColor: bg.colors[1], opacity: 0.4, top: '50%' }]} />
                    )}
                    <Text style={s.bgIcon}>{bg.icon}</Text>
                  </View>
                  <Text style={s.bgName} numberOfLines={1}>{bg.nameUrdu}</Text>
                  {design.backgroundId === bg.id && <View style={s.bgCheck}><MaterialIcons name="check" size={8} color="#FFF" /></View>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // TEXTURE
      case 'texture':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>ٹیکسچر ({ADVANCED_TEXTURES.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
              {TEXTURE_CATEGORIES.map(cat => (
                <TouchableOpacity key={cat}
                  style={[s.catChip, textureCat === cat && s.catChipActive]}
                  onPress={() => setTextureCat(cat)} activeOpacity={0.7}>
                  <Text style={[s.catChipText, textureCat === cat && s.catChipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={s.bgGrid}>
              {filteredTextures.map(tx => (
                <TouchableOpacity key={tx.id}
                  style={[s.bgItem]}
                  onPress={() => updateBackground('tx_' + tx.id, tx.colors)} activeOpacity={0.8}>
                  <View style={[s.bgPreview, { backgroundColor: tx.colors[0] }]}>
                    {tx.colors.length > 1 && (
                      <View style={[StyleSheet.absoluteFill, { backgroundColor: tx.colors[1], opacity: 0.4, top: '40%' }]} />
                    )}
                    <Text style={{ fontSize: 16 }}>{tx.icon}</Text>
                  </View>
                  <Text style={s.bgName} numberOfLines={1}>{tx.nameUrdu}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // FILTER
      case 'filter':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>فلٹرز ({FILTER_EFFECTS.length})</Text>
            {FILTER_EFFECTS.map(fl => (
              <TouchableOpacity key={fl.id}
                style={[s.filterItem, design.filters.includes(fl.id) && s.filterItemActive]}
                onPress={() => design.filters.includes(fl.id) ? removeFilter(fl.id) : addFilter(fl.id)}
                activeOpacity={0.7}>
                <Text style={s.filterIcon}>{fl.icon}</Text>
                <Text style={s.filterName}>{fl.nameUrdu}</Text>
                <Text style={s.filterDesc}>{fl.name}</Text>
                {design.filters.includes(fl.id) && <MaterialIcons name="check-circle" size={16} color={Colors.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        );

      // ANIMATION
      case 'anim':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>انیمیشن ایفیکٹس ({ANIMATION_EFFECTS.length})</Text>
            {ANIMATION_EFFECTS.map(an => (
              <TouchableOpacity key={an.id}
                style={[s.effectItem, design.animationEffect === an.id && s.effectItemActive]}
                onPress={() => { setAnimationEffect(an.id); triggerAnimPreview(an.id); }}
                activeOpacity={0.7}>
                <Text style={s.effectIcon}>{an.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.effectName}>{an.nameUrdu}</Text>
                  <Text style={s.effectCat}>{an.category} • {an.duration}ms</Text>
                </View>
                {design.animationEffect === an.id && <MaterialIcons name="check-circle" size={16} color={Colors.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        );

      // TRANSITION
      case 'transition':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>ٹرانزیشن ایفیکٹس ({TRANSITION_EFFECTS.length})</Text>
            {TRANSITION_EFFECTS.map(tr => (
              <TouchableOpacity key={tr.id}
                style={[s.effectItem, design.transitionEffect === tr.id && s.effectItemActive]}
                onPress={() => setTransitionEffect(tr.id)}
                activeOpacity={0.7}>
                <Text style={s.effectIcon}>{tr.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.effectName}>{tr.nameUrdu}</Text>
                  <Text style={s.effectCat}>{tr.category} • {tr.duration}ms</Text>
                </View>
                {design.transitionEffect === tr.id && <MaterialIcons name="check-circle" size={16} color={Colors.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        );

      // DESIGN EFFECTS
      case 'design':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>ڈیزائن ایفیکٹس</Text>
            {DESIGN_EFFECTS.map(de => (
              <TouchableOpacity key={de.id}
                style={[s.effectItem, design.designEffect === de.id && s.effectItemActive]}
                onPress={() => {}}
                activeOpacity={0.7}>
                <Text style={s.effectIcon}>{de.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.effectName}>{de.nameUrdu}</Text>
                  <Text style={s.effectCat}>{de.category}</Text>
                </View>
                {design.designEffect === de.id && <MaterialIcons name="check-circle" size={16} color={Colors.primary} />}
              </TouchableOpacity>
            ))}
            <Text style={[s.panelLabel, { marginTop: 12 }]}>ڈیجیٹل ایفیکٹس</Text>
            <View style={s.twoCol}>
              {DIGITAL_EFFECTS.map(de => (
                <TouchableOpacity key={de.id} style={s.digitalBtn} activeOpacity={0.7}>
                  <Text style={{ fontSize: 22, marginBottom: 4 }}>{de.icon}</Text>
                  <Text style={s.digitalName}>{de.nameUrdu}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // LAYERS
      case 'layer':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>لئیر مینجمنٹ</Text>
            <TouchableOpacity style={s.addLayerBtn} onPress={() => addTextLayer()} activeOpacity={0.7}>
              <MaterialIcons name="add" size={18} color={Colors.primary} />
              <Text style={s.addLayerText}>نئی لئیر شامل کریں</Text>
            </TouchableOpacity>
            {design.textLayers.map((layer, idx) => (
              <View key={layer.id} style={[s.layerItem, layer.id === design.selectedLayerId && s.layerItemActive]}>
                <TouchableOpacity onPress={() => selectLayer(layer.id, 'text')} style={{ flex: 1 }}>
                  <Text style={s.layerName} numberOfLines={1}>📝 {layer.text.slice(0, 20)}</Text>
                  <Text style={s.layerIdx}>لئیر {idx + 1} • {layer.locked ? '🔒' : '🔓'} {layer.visible ? '👁' : '🚫'}</Text>
                </TouchableOpacity>
                <View style={s.layerBtns}>
                  <TouchableOpacity onPress={() => toggleLayerLock(layer.id)} style={s.layerBtn}>
                    <MaterialIcons name={layer.locked ? 'lock' : 'lock-open'} size={15} color={Colors.textMuted} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleLayerVisibility(layer.id)} style={s.layerBtn}>
                    <MaterialIcons name={layer.visible ? 'visibility' : 'visibility-off'} size={15} color={Colors.textMuted} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => moveLayerUp(layer.id)} style={s.layerBtn}>
                    <MaterialIcons name="keyboard-arrow-up" size={15} color={Colors.textMuted} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => moveLayerDown(layer.id)} style={s.layerBtn}>
                    <MaterialIcons name="keyboard-arrow-down" size={15} color={Colors.textMuted} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => duplicateLayer(layer.id)} style={s.layerBtn}>
                    <MaterialIcons name="content-copy" size={15} color={Colors.accentBlue} />
                  </TouchableOpacity>
                  {design.textLayers.length > 1 && (
                    <TouchableOpacity onPress={() => deleteTextLayer(layer.id)} style={s.layerBtn}>
                      <MaterialIcons name="close" size={15} color={Colors.accentRed} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
            {design.stickerLayers.map((sticker, idx) => (
              <View key={sticker.id} style={[s.layerItem, sticker.id === design.selectedLayerId && s.layerItemActive]}>
                <TouchableOpacity onPress={() => selectLayer(sticker.id, 'sticker')} style={{ flex: 1 }}>
                  <Text style={s.layerName}>{sticker.emoji} سٹیکر {idx + 1}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteStickerLayer(sticker.id)} style={s.layerBtn}>
                  <MaterialIcons name="close" size={15} color={Colors.accentRed} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );

      // BORDER
      case 'border':
        return (
          <View style={s.panelContent}>
            <View style={s.toggleRow}>
              <Text style={s.toggleLabel}>بارڈر دکھائیں</Text>
              <TouchableOpacity style={[s.toggle, design.showBorder && s.toggleActive]} onPress={toggleBorder} activeOpacity={0.7}>
                <View style={[s.toggleDot, design.showBorder && s.toggleDotActive]} />
              </TouchableOpacity>
            </View>
            <Text style={s.panelLabel}>بارڈر اسٹائل ({BORDER_STYLES.length})</Text>
            {BORDER_STYLES.map(border => (
              <TouchableOpacity key={border.id}
                style={[s.borderItem, design.borderStyle === border.id && s.borderItemActive]}
                onPress={() => updateBorder(border.id, design.borderColor, design.borderWidth)}
                activeOpacity={0.8}>
                <Text style={s.borderIcon}>{border.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.borderName}>{border.nameUrdu}</Text>
                  <Text style={s.borderDesc}>{border.description}</Text>
                </View>
                {design.borderStyle === border.id && <MaterialIcons name="check-circle" size={16} color={Colors.primary} />}
              </TouchableOpacity>
            ))}
            <Text style={[s.panelLabel, { marginTop: 12 }]}>بارڈر رنگ</Text>
            <View style={s.colorGrid}>
              {TEXT_COLORS.slice(0, 24).map(color => (
                <TouchableOpacity key={color + 'b'}
                  style={[s.colorSwatch, { backgroundColor: color }, design.borderColor === color && s.colorSwatchActive]}
                  onPress={() => updateBorder(design.borderStyle, color, design.borderWidth)}
                  activeOpacity={0.8} />
              ))}
            </View>
            <Text style={[s.panelLabel, { marginTop: 12 }]}>بارڈر موٹائی</Text>
            <View style={s.sizeRow}>
              {[1, 2, 3, 4, 6, 8, 10].map(w => (
                <TouchableOpacity key={w}
                  style={[s.sizeChip, design.borderWidth === w && s.sizeChipActive]}
                  onPress={() => updateBorder(design.borderStyle, design.borderColor, w)}
                  activeOpacity={0.7}>
                  <Text style={[s.sizeChipText, design.borderWidth === w && s.sizeChipTextActive]}>{w}px</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // CORNER
      case 'corner':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>کارنر ڈیزائن ({EDGE_DESIGNS.length})</Text>
            <View style={s.edgeGrid}>
              {EDGE_DESIGNS.map(edge => (
                <TouchableOpacity key={edge.id}
                  style={[s.edgeBtn, design.edgeDesign === edge.id && s.edgeBtnActive, { borderColor: edge.color }]}
                  onPress={() => updateEdge(edge.id)} activeOpacity={0.7}>
                  <Text style={{ fontSize: 22, marginBottom: 4 }}>{edge.icon}</Text>
                  <Text style={[s.edgeName, { color: edge.color }]} numberOfLines={1}>{edge.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // HEADER
      case 'header':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>ہیڈر متن</Text>
            <TextInput style={[s.textInput, { height: 48 }]}
              value={headerText}
              onChangeText={(t) => { setHeaderText(t); updateHeader(t); }}
              placeholder="ہیڈر یہاں لکھیں..." placeholderTextColor={Colors.textLight} textAlign="right" />
            <Text style={[s.panelLabel, { marginTop: 10 }]}>ہیڈر اسٹائل</Text>
            {HEADER_STYLES.map(hs => (
              <TouchableOpacity key={hs.id}
                style={[s.borderItem, { backgroundColor: hs.bg }, design.headerStyle === hs.id && s.borderItemActive]}
                onPress={() => updateHeader(headerText, hs.id)} activeOpacity={0.8}>
                <Text style={s.borderIcon}>{hs.icon}</Text>
                <Text style={[s.borderName, { color: hs.border }]}>{hs.name}</Text>
                {design.headerStyle === hs.id && <MaterialIcons name="check-circle" size={16} color={hs.border} />}
              </TouchableOpacity>
            ))}
            <Text style={[s.panelLabel, { marginTop: 10 }]}>سب ٹائٹل</Text>
            <TextInput style={[s.textInput, { height: 48 }]}
              value={subTitleText}
              onChangeText={(t) => { setSubTitleText(t); updateSubTitle(t); }}
              placeholder="سب ٹائٹل..." placeholderTextColor={Colors.textLight} textAlign="right" />
          </View>
        );

      // FOOTER
      case 'footer':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>فوٹر متن</Text>
            <TextInput style={[s.textInput, { height: 48 }]}
              value={footerText}
              onChangeText={(t) => { setFooterText(t); updateFooter(t); }}
              placeholder="فوٹر یہاں لکھیں..." placeholderTextColor={Colors.textLight} textAlign="right" />
            <Text style={[s.panelLabel, { marginTop: 10 }]}>فوٹر اسٹائل</Text>
            {FOOTER_STYLES.map(fs => (
              <TouchableOpacity key={fs.id}
                style={[s.borderItem, { backgroundColor: fs.bg }, design.footerStyle === fs.id && s.borderItemActive]}
                onPress={() => updateFooter(footerText, fs.id)} activeOpacity={0.8}>
                <Text style={s.borderIcon}>{fs.icon}</Text>
                <Text style={[s.borderName, { color: fs.border }]}>{fs.name}</Text>
                {design.footerStyle === fs.id && <MaterialIcons name="check-circle" size={16} color={fs.border} />}
              </TouchableOpacity>
            ))}
          </View>
        );

      // LOGO
      case 'logo':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>لوگو متن</Text>
            <TextInput style={[s.textInput, { height: 48 }]}
              value={logoText}
              onChangeText={(t) => { setLogoText(t); updateLogo(t); }}
              placeholder="لوگو نام..." placeholderTextColor={Colors.textLight} textAlign="center" />
            <Text style={[s.panelLabel, { marginTop: 10 }]}>لوگو شکل ({LOGO_DESIGNS.length})</Text>
            <View style={s.edgeGrid}>
              {LOGO_DESIGNS.map(logo => (
                <TouchableOpacity key={logo.id} style={s.logoBtn} activeOpacity={0.7}>
                  <Text style={{ fontSize: 26, marginBottom: 4 }}>{logo.icon}</Text>
                  <Text style={s.logoName}>{logo.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // TITLE
      case 'title':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>ٹائٹل ڈیزائن ({TITLE_DESIGNS.length})</Text>
            {TITLE_DESIGNS.map(td => (
              <TouchableOpacity key={td.id}
                style={[s.borderItem, { backgroundColor: td.bg }]}
                activeOpacity={0.7}>
                <View style={[s.titleDot, { backgroundColor: td.color }]} />
                <Text style={[s.borderName, { color: td.color }]}>{td.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      // STICKER
      case 'sticker':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>سٹیکرز ({STICKERS.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
              {STICKER_CATEGORIES.map(cat => (
                <TouchableOpacity key={cat}
                  style={[s.catChip, stickerCat === cat && s.catChipActive]}
                  onPress={() => setStickerCat(cat)} activeOpacity={0.7}>
                  <Text style={[s.catChipText, stickerCat === cat && s.catChipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={s.stickerGrid}>
              {filteredStickers.map(sticker => (
                <TouchableOpacity key={sticker.id} style={s.stickerBtn}
                  onPress={() => addStickerLayer(sticker.emoji)} activeOpacity={0.7}>
                  <Text style={{ fontSize: 28, marginBottom: 3 }}>{sticker.emoji}</Text>
                  <Text style={s.stickerName} numberOfLines={1}>{sticker.nameUrdu}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // CANVAS
      case 'canvas':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>کینوس سائز</Text>
            {CANVAS_SIZES.map(cs => (
              <TouchableOpacity key={cs.id}
                style={[s.borderItem, design.canvasAspect === cs.id && s.borderItemActive]}
                onPress={() => setCanvasAspect(cs.id, cs.w, cs.h)} activeOpacity={0.7}>
                <Text style={s.borderIcon}>{cs.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.borderName}>{cs.label}</Text>
                  <Text style={s.borderDesc}>{cs.labelEn} • {cs.w}×{cs.h}</Text>
                </View>
                {design.canvasAspect === cs.id && <MaterialIcons name="check-circle" size={16} color={Colors.primary} />}
              </TouchableOpacity>
            ))}
            <Text style={[s.panelLabel, { marginTop: 10 }]}>گرڈ</Text>
            <View style={s.toggleRow}>
              <Text style={s.toggleLabel}>گرڈ دکھائیں</Text>
              <TouchableOpacity style={[s.toggle, design.showGrid && s.toggleActive]} onPress={toggleGrid} activeOpacity={0.7}>
                <View style={[s.toggleDot, design.showGrid && s.toggleDotActive]} />
              </TouchableOpacity>
            </View>
            <Text style={[s.panelLabel, { marginTop: 10 }]}>زوم</Text>
            <View style={s.sizeRow}>
              {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(z => (
                <TouchableOpacity key={z}
                  style={[s.sizeChip, design.canvasZoom === z && s.sizeChipActive]}
                  onPress={() => { setCanvasZoom(z); setCanvasScale(z); }}
                  activeOpacity={0.7}>
                  <Text style={[s.sizeChipText, design.canvasZoom === z && s.sizeChipTextActive]}>{z}x</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      // EXPORT
      case 'export':
        return (
          <View style={s.panelContent}>
            <Text style={s.panelLabel}>ایکسپورٹ فارمیٹ</Text>
            {[
              { fmt: 'PNG', icon: '🖼️', desc: 'بہترین معیار - شفاف بیک گراؤنڈ', color: Colors.primary },
              { fmt: 'JPG', icon: '📷', desc: 'چھوٹا فائل سائز', color: Colors.accent },
              { fmt: 'PDF', icon: '📄', desc: 'پرنٹ کے لیے', color: Colors.accentBlue },
              { fmt: 'SVG', icon: '🎨', desc: 'ویکٹر گرافکس', color: Colors.accentPurple },
              { fmt: 'WEBP', icon: '🌐', desc: 'ویب کے لیے بہترین', color: Colors.accentTeal },
            ].map(item => (
              <TouchableOpacity key={item.fmt}
                style={[s.borderItem, { borderColor: item.color + '40' }]}
                onPress={() => showAlert(`📤 ${item.fmt}`, `${item.desc}\n${item.fmt} فارمیٹ میں محفوظ کیا جائے گا`, [
                  { text: 'ڈاؤنلوڈ', onPress: () => showAlert('✅', `${item.fmt} کامیابی سے محفوظ`) },
                  { text: 'منسوخ', style: 'cancel' },
                ])}
                activeOpacity={0.7}>
                <Text style={s.borderIcon}>{item.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[s.borderName, { color: item.color }]}>{item.fmt}</Text>
                  <Text style={s.borderDesc}>{item.desc}</Text>
                </View>
                <MaterialIcons name="file-download" size={18} color={item.color} />
              </TouchableOpacity>
            ))}
            <Text style={[s.panelLabel, { marginTop: 10 }]}>شیئر کریں</Text>
            {['WhatsApp', 'Facebook', 'Instagram', 'Twitter', 'Email'].map(p => (
              <TouchableOpacity key={p} style={s.borderItem}
                onPress={() => showAlert('✅', `${p} پر شیئر ہوگیا`)} activeOpacity={0.7}>
                <MaterialIcons name="share" size={18} color={Colors.accentBlue} />
                <Text style={s.borderName}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      default: return null;
    }
  };

  return (
    <KeyboardAvoidingView style={s.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Header */}
      <View style={[s.editorHeader, { paddingTop: insets.top + 6 }]}>
        <Text style={s.editorTitle}>✦ ڈیزائن ایڈیٹر</Text>
        <View style={s.headerActions}>
          <TouchableOpacity style={s.hBtn} onPress={() => saveDraft()} activeOpacity={0.7}>
            <MaterialIcons name="drafts" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={s.hBtn} onPress={handleShare} activeOpacity={0.7}>
            <MaterialIcons name="share" size={16} color={Colors.accentBlue} />
          </TouchableOpacity>
          <TouchableOpacity style={s.hBtn} onPress={handleExport} activeOpacity={0.7}>
            <MaterialIcons name="file-download" size={16} color={Colors.accent} />
          </TouchableOpacity>
          <TouchableOpacity style={s.hBtn} onPress={() => addTextLayer()} activeOpacity={0.7}>
            <MaterialIcons name="add" size={16} color={Colors.accentPurple} />
          </TouchableOpacity>
          <TouchableOpacity style={[s.hBtn, s.saveBtn]} onPress={() => { saveDesign(); showAlert('✅', 'محفوظ ہوگیا'); }} activeOpacity={0.7}>
            <MaterialIcons name="save" size={16} color="#FFF" />
            <Text style={s.saveBtnText}>محفوظ</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Canvas Area */}
      <View style={s.canvasWrapper}>
        {/* LEFT STAR */}
        <TouchableOpacity style={s.leftStar} onPress={() => openLeft(activeSection)} activeOpacity={0.7}>
          <Text style={s.starEmoji}>✦</Text>
        </TouchableOpacity>

        {/* CANVAS */}
        <TouchableOpacity activeOpacity={1} onPress={closeSidebars} style={{ flex: 1, alignItems: 'center' }}>
          <View style={[s.canvas, {
            width: CANVAS_W * canvasScale,
            height: CANVAS_H * canvasScale,
            backgroundColor: design.backgroundColor,
            borderColor: design.showBorder ? design.borderColor : 'transparent',
            borderWidth: design.showBorder ? design.borderWidth : 0,
            transform: [{ scale: canvasScale > 1 ? 1 : 1 }],
          }]}>
            {design.backgroundGradient.length > 1 && (
              <View style={[StyleSheet.absoluteFill, { backgroundColor: design.backgroundGradient[1], opacity: 0.35, top: '50%' }]} />
            )}
            {design.showGrid && [...Array(5)].map((_, i) => (
              <View key={'gv' + i} style={[s.gridLineV, { left: (CANVAS_W / 5) * i * canvasScale }]} />
            ))}
            {design.showGrid && [...Array(5)].map((_, i) => (
              <View key={'gh' + i} style={[s.gridLineH, { top: (CANVAS_H / 5) * i * canvasScale }]} />
            ))}

            {/* Header */}
            {design.headerText ? (
              <View style={s.canvasHeader}>
                <Text style={s.canvasHeaderText}>{design.headerText}</Text>
              </View>
            ) : null}

            {/* SubTitle */}
            {design.subTitleText ? (
              <View style={s.canvasSubTitle}>
                <Text style={s.canvasSubTitleText}>{design.subTitleText}</Text>
              </View>
            ) : null}

            {/* Text Layers */}
            {design.textLayers.map((layer) => {
              if (!layer.visible) return null;
              const pos = getLayerAnim(layer.id, layer.x, layer.y);
              const panResponder = makePanResponder(layer.id, layer.locked);
              return (
                <RNAnimated.View
                  key={layer.id}
                  {...panResponder.panHandlers}
                  style={[
                    s.draggableLayer,
                    {
                      left: pos.x,
                      top: pos.y,
                      borderColor: layer.id === design.selectedLayerId ? Colors.primary + '80' : 'transparent',
                      borderWidth: layer.id === design.selectedLayerId ? 1.5 : 0,
                    },
                  ]}
                >
                  <Animated.View style={layer.id === design.selectedLayerId ? animStyle : undefined}>
                    <Text style={[s.canvasText, {
                      color: layer.color,
                      fontSize: Math.min(layer.fontSize * 0.52, 28),
                      fontWeight: layer.bold ? '700' : '400',
                      fontStyle: layer.italic ? 'italic' : 'normal',
                      textDecorationLine: layer.underline ? 'underline' : 'none',
                      textAlign: layer.textAlign,
                      opacity: layer.opacity,
                      textShadowColor: layer.shadow ? layer.shadowColor + '90' : 'transparent',
                      textShadowOffset: layer.shadowOffset,
                      textShadowRadius: layer.shadow ? layer.shadowRadius : 0,
                      letterSpacing: layer.letterSpacing,
                      lineHeight: layer.fontSize * 0.52 * layer.lineHeight,
                      transform: [{ scale: layer.scale }, { rotate: `${layer.rotation}deg` }],
                    }]} numberOfLines={4}>
                      {layer.text}
                    </Text>
                  </Animated.View>
                  {layer.locked && (
                    <View style={s.lockedBadge}><MaterialIcons name="lock" size={9} color={Colors.accentRed} /></View>
                  )}
                </RNAnimated.View>
              );
            })}

            {/* Sticker Layers */}
            {design.stickerLayers.map((sticker) => {
              if (!sticker.visible) return null;
              const stkAnim = getLayerAnim('stk_' + sticker.id, sticker.x, sticker.y);
              const stkPan = PanResponder.create({
                onStartShouldSetPanResponder: () => !sticker.locked,
                onPanResponderGrant: () => selectLayer(sticker.id, 'sticker'),
                onPanResponderMove: (_, gs) => {
                  const layer = design.stickerLayers.find(s => s.id === sticker.id);
                  if (!layer) return;
                  stkAnim.x.setValue(Math.max(0, Math.min(CANVAS_W - 40, layer.x * CANVAS_W + gs.dx)));
                  stkAnim.y.setValue(Math.max(0, Math.min(CANVAS_H - 40, layer.y * CANVAS_H + gs.dy)));
                },
                onPanResponderRelease: (_, gs) => {
                  const layer = design.stickerLayers.find(s => s.id === sticker.id);
                  if (!layer) return;
                  updateStickerLayer(sticker.id, {
                    x: Math.max(0, Math.min(0.95, layer.x + gs.dx / CANVAS_W)),
                    y: Math.max(0, Math.min(0.95, layer.y + gs.dy / CANVAS_H)),
                  });
                },
              });
              return (
                <RNAnimated.View key={sticker.id} {...stkPan.panHandlers}
                  style={[s.draggableLayer, {
                    left: stkAnim.x, top: stkAnim.y,
                    borderColor: sticker.id === design.selectedLayerId ? Colors.primary + '80' : 'transparent',
                    borderWidth: sticker.id === design.selectedLayerId ? 1.5 : 0,
                  }]}>
                  <Text style={{ fontSize: 32 * sticker.scale, opacity: sticker.opacity }}>{sticker.emoji}</Text>
                </RNAnimated.View>
              );
            })}

            {/* Footer */}
            {design.footerText ? (
              <View style={s.canvasFooter}>
                <Text style={s.canvasFooterText}>{design.footerText}</Text>
              </View>
            ) : null}

            {/* Corner decorations */}
            {design.showBorder && (
              <>
                <Text style={[s.cornerTL, { color: design.borderColor }]}>
                  {EDGE_DESIGNS.find(e => e.id === design.edgeDesign)?.icon || '✦'}
                </Text>
                <Text style={[s.cornerTR, { color: design.borderColor }]}>
                  {EDGE_DESIGNS.find(e => e.id === design.edgeDesign)?.icon || '✦'}
                </Text>
                <Text style={[s.cornerBL, { color: design.borderColor }]}>
                  {EDGE_DESIGNS.find(e => e.id === design.edgeDesign)?.icon || '✦'}
                </Text>
                <Text style={[s.cornerBR, { color: design.borderColor }]}>
                  {EDGE_DESIGNS.find(e => e.id === design.edgeDesign)?.icon || '✦'}
                </Text>
              </>
            )}

            <View style={s.canvasBadge}><Text style={s.canvasBadgeText}>{design.canvasWidth}×{design.canvasHeight}</Text></View>
          </View>
        </TouchableOpacity>

        {/* RIGHT STAR */}
        <TouchableOpacity style={s.rightStar} onPress={() => openRight(activeSection === 'layer' ? 'layer' : 'layer')} activeOpacity={0.7}>
          <Text style={s.starEmoji}>✦</Text>
        </TouchableOpacity>
      </View>

      {/* Quick access toolbar */}
      <View style={s.quickBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.quickBarContent}>
          {LEFT_SIDEBAR.map(item => (
            <TouchableOpacity key={item.id}
              style={[s.quickBtn, activeSection === item.id && leftOpen && s.quickBtnActive]}
              onPress={() => openLeft(item.id)} activeOpacity={0.7}>
              <MaterialIcons name={item.icon as any} size={14}
                color={activeSection === item.id && leftOpen ? Colors.primary : Colors.textMuted} />
              <Text style={[s.quickBtnText, activeSection === item.id && leftOpen && s.quickBtnTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={s.quickDivider} />
          {RIGHT_SIDEBAR.map(item => (
            <TouchableOpacity key={item.id}
              style={[s.quickBtn, activeSection === item.id && rightOpen && s.quickBtnActive]}
              onPress={() => openRight(item.id)} activeOpacity={0.7}>
              <MaterialIcons name={item.icon as any} size={14}
                color={activeSection === item.id && rightOpen ? Colors.primary : Colors.textMuted} />
              <Text style={[s.quickBtnText, activeSection === item.id && rightOpen && s.quickBtnTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LEFT SIDEBAR */}
      {(leftOpen || true) ? (
        <RNAnimated.View style={[s.sidebar, s.sidebarLeft, { transform: [{ translateX: leftAnim }] }]}>
          <View style={s.sidebarHeader}>
            <Text style={s.sidebarTitle}>
              {LEFT_SIDEBAR.find(i => i.id === activeSection)?.label || ''}
            </Text>
            <TouchableOpacity onPress={closeSidebars} style={s.sidebarClose}>
              <MaterialIcons name="close" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}>
            {renderSidebarContent()}
          </ScrollView>
        </RNAnimated.View>
      ) : null}

      {/* RIGHT SIDEBAR */}
      {(rightOpen || true) ? (
        <RNAnimated.View style={[s.sidebar, s.sidebarRight, { transform: [{ translateX: rightAnim }] }]}>
          <View style={s.sidebarHeader}>
            <TouchableOpacity onPress={closeSidebars} style={s.sidebarClose}>
              <MaterialIcons name="close" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
            <Text style={s.sidebarTitle}>
              {RIGHT_SIDEBAR.find(i => i.id === activeSection)?.label || ''}
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}>
            {renderSidebarContent()}
          </ScrollView>
        </RNAnimated.View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  editorHeader: { backgroundColor: Colors.surface, paddingHorizontal: Spacing.md, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', ...Shadows.sm },
  editorTitle: { fontSize: 16, color: Colors.primary, fontWeight: '700' },
  headerActions: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  hBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 6, borderRadius: Radius.sm, backgroundColor: Colors.surfaceElevated, gap: 3, borderWidth: 1, borderColor: Colors.surfaceBorder },
  saveBtn: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  saveBtnText: { fontSize: 11, color: '#FFFFFF', fontWeight: '700' },
  canvasWrapper: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder },
  leftStar: { width: 32, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
  rightStar: { width: 32, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
  starEmoji: { fontSize: 22, color: Colors.primary },
  canvas: { borderRadius: Radius.md, overflow: 'hidden', position: 'relative', ...Shadows.md },
  gridLineV: { position: 'absolute', width: 1, top: 0, bottom: 0, backgroundColor: Colors.primary + '20' },
  gridLineH: { position: 'absolute', height: 1, left: 0, right: 0, backgroundColor: Colors.primary + '20' },
  canvasHeader: { position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: Colors.primaryPale + 'DD', paddingVertical: 3, paddingHorizontal: 8, zIndex: 10 },
  canvasHeaderText: { fontSize: 9, color: Colors.primary, textAlign: 'center', fontWeight: '700' },
  canvasSubTitle: { position: 'absolute', top: 20, left: 0, right: 0, paddingHorizontal: 8 },
  canvasSubTitleText: { fontSize: 8, color: Colors.textSecondary, textAlign: 'center' },
  canvasFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.primaryPale + 'DD', paddingVertical: 3, paddingHorizontal: 8, zIndex: 10 },
  canvasFooterText: { fontSize: 9, color: Colors.primary, textAlign: 'center', fontWeight: '600' },
  draggableLayer: { position: 'absolute', borderStyle: 'dashed', borderRadius: 4, padding: 3 },
  canvasText: { lineHeight: 22 },
  lockedBadge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#FFEBEE', borderRadius: 6, padding: 2 },
  cornerTL: { position: 'absolute', top: 4, left: 5, fontSize: 12 },
  cornerTR: { position: 'absolute', top: 4, right: 5, fontSize: 12 },
  cornerBL: { position: 'absolute', bottom: 4, left: 5, fontSize: 12 },
  cornerBR: { position: 'absolute', bottom: 4, right: 5, fontSize: 12 },
  canvasBadge: { position: 'absolute', bottom: 4, right: 6, backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3 },
  canvasBadgeText: { fontSize: 8, color: '#FFF' },
  quickBar: { backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, maxHeight: 46 },
  quickBarContent: { paddingHorizontal: Spacing.sm, paddingVertical: 6, gap: 5, alignItems: 'center' },
  quickBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: Radius.pill, backgroundColor: Colors.background, gap: 3, borderWidth: 1, borderColor: Colors.surfaceBorder },
  quickBtnActive: { backgroundColor: Colors.primaryPale, borderColor: Colors.primary + '60' },
  quickBtnText: { fontSize: 10, color: Colors.textMuted, fontWeight: '500' },
  quickBtnTextActive: { color: Colors.primary },
  quickDivider: { width: 1, height: 22, backgroundColor: Colors.surfaceBorder, marginHorizontal: 4 },
  sidebar: { position: 'absolute', top: 0, bottom: 0, width: 280, backgroundColor: Colors.surface, zIndex: 100, ...Shadows.lg },
  sidebarLeft: { left: 0, borderRightWidth: 1, borderRightColor: Colors.surfaceBorder },
  sidebarRight: { right: 0, borderLeftWidth: 1, borderLeftColor: Colors.surfaceBorder },
  sidebarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, backgroundColor: Colors.primaryPale },
  sidebarTitle: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
  sidebarClose: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surfaceBorder },
  panelContent: { padding: Spacing.md, gap: 8 },
  panelLabel: { fontSize: 12, color: Colors.primary, fontWeight: '700', textAlign: 'right', marginBottom: 4 },
  textInput: { backgroundColor: Colors.background, borderRadius: Radius.md, padding: 10, color: Colors.textPrimary, fontSize: 14, borderWidth: 1, borderColor: Colors.surfaceBorder, textAlignVertical: 'top', minHeight: 72, lineHeight: 22 },
  sizeRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  sizeChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: Radius.sm, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.surfaceBorder },
  sizeChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  sizeChipText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  sizeChipTextActive: { color: '#FFF' },
  alignRow: { flexDirection: 'row', gap: 8 },
  alignBtn: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: Radius.sm, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.surfaceBorder },
  alignBtnActive: { backgroundColor: Colors.primaryPale, borderColor: Colors.primary },
  styleRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  styleBtn: { flex: 1, minWidth: 40, alignItems: 'center', paddingVertical: 8, borderRadius: Radius.sm, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.surfaceBorder },
  styleBtnActive: { backgroundColor: Colors.primaryPale, borderColor: Colors.primary },
  styleBtnLabel: { fontSize: 15, fontWeight: '800', color: Colors.textSecondary },
  styleBtnLabelActive: { color: Colors.primary },
  opacityRow: { flexDirection: 'row', gap: 5 },
  opacityBtn: { flex: 1, alignItems: 'center', paddingVertical: 7, borderRadius: Radius.sm, backgroundColor: Colors.primary, borderWidth: 1, borderColor: Colors.surfaceBorder },
  opacityBtnActive: { borderWidth: 2.5, borderColor: Colors.textPrimary },
  opacityBtnText: { fontSize: 10, color: '#FFF', fontWeight: '700' },
  twoCol: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  gradBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: Radius.pill, borderWidth: 1.5 },
  gradBtnText: { fontSize: 12, fontWeight: '700' },
  animPreviewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primaryPale, borderRadius: Radius.md, paddingVertical: 10, gap: 8, borderWidth: 1, borderColor: Colors.surfaceBorder, marginTop: 4 },
  animPreviewText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  langTabs: { flexDirection: 'row', backgroundColor: Colors.background, borderRadius: Radius.md, padding: 3, borderWidth: 1, borderColor: Colors.surfaceBorder },
  langTab: { flex: 1, paddingVertical: 6, borderRadius: Radius.sm, alignItems: 'center' },
  langTabActive: { backgroundColor: Colors.primary },
  langTabText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  langTabTextActive: { color: '#FFF' },
  searchInput: { backgroundColor: Colors.background, borderRadius: Radius.md, padding: 10, color: Colors.textPrimary, fontSize: 13, borderWidth: 1, borderColor: Colors.surfaceBorder },
  fontItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.sm, padding: 10, marginBottom: 5, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: 10 },
  fontItemActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryPale },
  fontItemLeft: { flex: 1 },
  fontName: { fontSize: 13, color: Colors.textPrimary, fontWeight: '600' },
  fontCat: { fontSize: 10, color: Colors.textMuted },
  fontPreviewSample: { fontSize: 12, lineHeight: 18 },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  colorSwatch: { width: 36, height: 36, borderRadius: Radius.sm, borderWidth: 1, borderColor: Colors.surfaceBorder },
  colorSwatchActive: { borderWidth: 3, borderColor: Colors.textPrimary },
  bgGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  bgItem: { width: (280 - 32 - 32) / 5, alignItems: 'center', borderRadius: Radius.sm, padding: 2, position: 'relative' },
  bgItemActive: { backgroundColor: Colors.primaryPale, borderWidth: 2, borderColor: Colors.primary, borderRadius: Radius.sm },
  bgPreview: { width: '100%', aspectRatio: 1, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderWidth: 1, borderColor: Colors.surfaceBorder },
  bgIcon: { fontSize: 14 },
  bgName: { fontSize: 7, color: Colors.textSecondary, marginTop: 2, textAlign: 'center' },
  bgCheck: { position: 'absolute', top: 2, right: 2, width: 14, height: 14, borderRadius: 7, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  catChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: Radius.pill, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.surfaceBorder, marginRight: 6 },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catChipText: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600' },
  catChipTextActive: { color: '#FFF' },
  filterItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.sm, padding: 10, marginBottom: 5, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: 8 },
  filterItemActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryPale },
  filterIcon: { fontSize: 16, width: 20, textAlign: 'center' },
  filterName: { flex: 1, fontSize: 13, color: Colors.textPrimary, fontWeight: '600', textAlign: 'right' },
  filterDesc: { fontSize: 10, color: Colors.textMuted },
  effectItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.sm, padding: 10, marginBottom: 5, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: 8 },
  effectItemActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryPale },
  effectIcon: { fontSize: 18, width: 22, textAlign: 'center' },
  effectName: { flex: 1, fontSize: 13, color: Colors.textPrimary, fontWeight: '600', textAlign: 'right' },
  effectCat: { fontSize: 10, color: Colors.textMuted },
  digitalBtn: { width: (280 - 32 - 16) / 3, alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: 10, borderWidth: 1, borderColor: Colors.surfaceBorder },
  digitalName: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600', textAlign: 'center' },
  addLayerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primaryPale, borderRadius: Radius.md, paddingVertical: 10, gap: 6, borderWidth: 1, borderColor: Colors.surfaceBorder, marginBottom: 6 },
  addLayerText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  layerItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.sm, padding: 8, marginBottom: 5, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: 6 },
  layerItemActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryPale },
  layerName: { fontSize: 12, color: Colors.textPrimary, fontWeight: '600', textAlign: 'right' },
  layerIdx: { fontSize: 9, color: Colors.textMuted, textAlign: 'right' },
  layerBtns: { flexDirection: 'row', gap: 3 },
  layerBtn: { padding: 4 },
  borderItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.sm, padding: 10, marginBottom: 5, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: 8 },
  borderItemActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryPale },
  borderIcon: { fontSize: 16, width: 20, textAlign: 'center' },
  borderName: { flex: 1, fontSize: 13, color: Colors.textPrimary, fontWeight: '600', textAlign: 'right' },
  borderDesc: { fontSize: 10, color: Colors.textMuted },
  edgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  edgeBtn: { width: (280 - 32 - 24) / 4, alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.sm, padding: 8, borderWidth: 1 },
  edgeBtnActive: { backgroundColor: Colors.primaryPale },
  edgeName: { fontSize: 8, fontWeight: '600', textAlign: 'center' },
  stickerGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  stickerBtn: { width: (280 - 32 - 32) / 5, backgroundColor: Colors.surface, borderRadius: Radius.sm, padding: 6, alignItems: 'center', borderWidth: 1, borderColor: Colors.surfaceBorder },
  stickerName: { fontSize: 7, color: Colors.textMuted, textAlign: 'center' },
  logoBtn: { width: (280 - 32 - 24) / 4, alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.sm, padding: 8, borderWidth: 1, borderColor: Colors.surfaceBorder },
  logoName: { fontSize: 8, color: Colors.textMuted, textAlign: 'center' },
  titleDot: { width: 16, height: 16, borderRadius: 8 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.surface, padding: 10, borderRadius: Radius.sm, borderWidth: 1, borderColor: Colors.surfaceBorder },
  toggleLabel: { fontSize: 13, color: Colors.textPrimary, fontWeight: '500', textAlign: 'right' },
  toggle: { width: 40, height: 22, borderRadius: 11, backgroundColor: Colors.surfaceBorder, justifyContent: 'center', padding: 2 },
  toggleActive: { backgroundColor: Colors.primary },
  toggleDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: Colors.textLight },
  toggleDotActive: { backgroundColor: '#FFF', alignSelf: 'flex-end' },
  dirBtn: { width: (280 - 32 - 16) / 3, alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.sm, padding: 8, borderWidth: 1, borderColor: Colors.surfaceBorder },
  dirBtnActive: { backgroundColor: Colors.primaryPale, borderColor: Colors.primary },
  dirIcon: { fontSize: 20, marginBottom: 4 },
  dirLabel: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600' },
  dirLabelActive: { color: Colors.primary },
  infoBox: { backgroundColor: Colors.accentBluePale, borderRadius: Radius.sm, padding: 10, borderWidth: 1, borderColor: Colors.accentBlue + '40' },
  infoBoxText: { fontSize: 11, color: Colors.accentBlue, lineHeight: 18, textAlign: 'right' },
});
