// eVeR sMaRt UrDu sTuDiO - Editor Context (Full Featured)
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { BACKGROUNDS } from '@/constants/backgrounds';

export interface TextLayer {
  id: string;
  text: string;
  fontId: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  x: number;
  y: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  textAlign: 'left' | 'center' | 'right';
  opacity: number;
  rotation: number;
  letterSpacing: number;
  lineHeight: number;
  shadow: boolean;
  glow: boolean;
  outline: boolean;
  outlineColor: string;
  shadowColor: string;
  glowColor: string;
  scale: number;
  scaleX: number;
  scaleY: number;
  locked: boolean;
  visible: boolean;
  shadowOffset: { width: number; height: number };
  shadowRadius: number;
  gradientColors: string[];
  useGradient: boolean;
  textEffect: string;
  runningText: boolean;
  runningDirection: 'left' | 'right' | 'up' | 'down' | 'border-cw' | 'border-ccw';
  animationEffect: string;
  transitionEffect: string;
  zIndex: number;
}

export interface StickerLayer {
  id: string;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
  zIndex: number;
}

export interface DesignState {
  backgroundId: string;
  backgroundColor: string;
  backgroundGradient: string[];
  backgroundPattern: string;
  templateId: string | null;
  textLayers: TextLayer[];
  stickerLayers: StickerLayer[];
  selectedLayerId: string | null;
  selectedLayerType: 'text' | 'sticker' | null;
  canvasWidth: number;
  canvasHeight: number;
  canvasAspect: string;
  transitionEffect: string;
  animationEffect: string;
  designEffect: string;
  headerText: string;
  headerStyle: string;
  footerText: string;
  footerStyle: string;
  logoText: string;
  logoStyle: string;
  titleStyle: string;
  subTitleText: string;
  borderStyle: string;
  edgeDesign: string;
  showGrid: boolean;
  showRuler: boolean;
  showBorder: boolean;
  borderColor: string;
  borderWidth: number;
  videoBackground: string | null;
  filters: string[];
  canvasZoom: number;
  createdAt: number;
  updatedAt: number;
  isDraft: boolean;
  title: string;
}

export interface EditorContextType {
  design: DesignState;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  updateBackground: (bgId: string, colors: string[]) => void;
  applyTemplate: (templateId: string) => void;
  addTextLayer: (text?: string) => void;
  updateTextLayer: (id: string, updates: Partial<TextLayer>) => void;
  deleteTextLayer: (id: string) => void;
  duplicateLayer: (id: string) => void;
  moveLayerUp: (id: string) => void;
  moveLayerDown: (id: string) => void;
  toggleLayerLock: (id: string) => void;
  toggleLayerVisibility: (id: string) => void;
  addStickerLayer: (emoji: string) => void;
  updateStickerLayer: (id: string, updates: Partial<StickerLayer>) => void;
  deleteStickerLayer: (id: string) => void;
  selectLayer: (id: string | null, type?: 'text' | 'sticker') => void;
  setTransitionEffect: (effectId: string) => void;
  setAnimationEffect: (effectId: string) => void;
  setDesignEffect: (effectId: string) => void;
  updateHeader: (text: string, style?: string) => void;
  updateFooter: (text: string, style?: string) => void;
  updateLogo: (text: string, style?: string) => void;
  updateSubTitle: (text: string) => void;
  updateBorder: (style: string, color: string, width?: number) => void;
  updateEdge: (design: string) => void;
  toggleGrid: () => void;
  toggleBorder: () => void;
  setCanvasAspect: (aspect: string, w: number, h: number) => void;
  setCanvasZoom: (zoom: number) => void;
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;
  resetDesign: () => void;
  savedDesigns: DesignState[];
  draftDesigns: DesignState[];
  saveDesign: () => void;
  saveDraft: () => void;
  deleteDraft: (index: number) => void;
  deleteDesign: (index: number) => void;
  loadDesign: (design: DesignState) => void;
  updateDesignTitle: (title: string) => void;
  adminFeatures: AdminFeature[];
  updateAdminFeature: (id: string, updates: Partial<AdminFeature>) => void;
  addAdminFeature: (feature: AdminFeature) => void;
  removeAdminFeature: (id: string) => void;
}

export interface AdminFeature {
  id: string;
  name: string;
  nameUrdu: string;
  category: string;
  enabled: boolean;
  icon: string;
  description: string;
  type: 'font' | 'template' | 'effect' | 'texture' | 'sticker' | 'border' | 'tool' | 'feature';
  data?: any;
  addedAt: number;
}

const defaultTextLayer: TextLayer = {
  id: '1',
  text: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ',
  fontId: 'u1',
  fontFamily: 'System',
  fontSize: 28,
  color: '#B8860B',
  x: 0.1,
  y: 0.35,
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  textAlign: 'center',
  opacity: 1,
  rotation: 0,
  letterSpacing: 0,
  lineHeight: 1.6,
  shadow: true,
  glow: false,
  outline: false,
  outlineColor: '#D4A017',
  shadowColor: '#D4A017',
  glowColor: '#FFD700',
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  locked: false,
  visible: true,
  shadowOffset: { width: 1, height: 2 },
  shadowRadius: 4,
  gradientColors: ['#B8860B', '#FFD700'],
  useGradient: false,
  textEffect: 'none',
  runningText: false,
  runningDirection: 'left',
  animationEffect: 'an34',
  transitionEffect: 'tr1',
  zIndex: 0,
};

export const initialDesign: DesignState = {
  backgroundId: 'bg2',
  backgroundColor: '#FFF9F0',
  backgroundGradient: ['#FFF9F0', '#FFF3DC'],
  backgroundPattern: '',
  templateId: null,
  textLayers: [defaultTextLayer],
  stickerLayers: [],
  selectedLayerId: '1',
  selectedLayerType: 'text',
  canvasWidth: 1080,
  canvasHeight: 1080,
  canvasAspect: 'square',
  transitionEffect: 'tr1',
  animationEffect: 'an34',
  designEffect: 'de1',
  headerText: '',
  headerStyle: 'h1',
  footerText: '',
  footerStyle: 'f1',
  logoText: '',
  logoStyle: 'l1',
  titleStyle: 't1',
  subTitleText: '',
  borderStyle: 'b3',
  edgeDesign: 'ed1',
  showGrid: false,
  showRuler: false,
  showBorder: true,
  borderColor: '#D4A017',
  borderWidth: 2,
  videoBackground: null,
  filters: [],
  canvasZoom: 1,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  isDraft: false,
  title: 'نیا ڈیزائن',
};

const DEFAULT_ADMIN_FEATURES: AdminFeature[] = [
  { id: 'af1', name: 'Urdu Fonts', nameUrdu: 'اردو فونٹس', category: 'fonts', enabled: true, icon: '✍️', description: '50+ Urdu Nastaliq fonts', type: 'font', addedAt: Date.now() },
  { id: 'af2', name: 'Arabic Fonts', nameUrdu: 'عربی فونٹس', category: 'fonts', enabled: true, icon: '🕌', description: '50+ Arabic fonts', type: 'font', addedAt: Date.now() },
  { id: 'af3', name: 'English Fonts', nameUrdu: 'انگریزی فونٹس', category: 'fonts', enabled: true, icon: '🔤', description: '50+ English fonts', type: 'font', addedAt: Date.now() },
  { id: 'af4', name: 'Islamic Templates', nameUrdu: 'اسلامی ٹیمپلیٹس', category: 'templates', enabled: true, icon: '📋', description: '60+ Islamic templates', type: 'template', addedAt: Date.now() },
  { id: 'af5', name: 'Transition Effects', nameUrdu: 'ٹرانزیشن ایفیکٹس', category: 'effects', enabled: true, icon: '🔄', description: '55+ transition effects', type: 'effect', addedAt: Date.now() },
  { id: 'af6', name: 'Animation Effects', nameUrdu: 'انیمیشن ایفیکٹس', category: 'effects', enabled: true, icon: '✨', description: '55+ animation effects', type: 'effect', addedAt: Date.now() },
  { id: 'af7', name: 'Background Textures', nameUrdu: 'بیک گراؤنڈ ٹیکسچر', category: 'textures', enabled: true, icon: '🎨', description: '50+ texture collections', type: 'texture', addedAt: Date.now() },
  { id: 'af8', name: 'Stickers', nameUrdu: 'سٹیکرز', category: 'stickers', enabled: true, icon: '😊', description: '63+ emoji stickers', type: 'sticker', addedAt: Date.now() },
  { id: 'af9', name: 'Border Styles', nameUrdu: 'بارڈر اسٹائلز', category: 'borders', enabled: true, icon: '🔲', description: '20+ border styles', type: 'border', addedAt: Date.now() },
  { id: 'af10', name: 'Export Feature', nameUrdu: 'ایکسپورٹ فیچر', category: 'tools', enabled: true, icon: '📤', description: 'PNG/JPG/PDF export', type: 'tool', addedAt: Date.now() },
  { id: 'af11', name: 'Running Text', nameUrdu: 'چلتا متن', category: 'effects', enabled: true, icon: '▶️', description: 'Animated running text along borders', type: 'effect', addedAt: Date.now() },
  { id: 'af12', name: 'Layer Management', nameUrdu: 'لئیر مینجمنٹ', category: 'tools', enabled: true, icon: '📚', description: 'Multi-layer drag, lock, reorder', type: 'tool', addedAt: Date.now() },
  { id: 'af13', name: 'Video Backgrounds', nameUrdu: 'ویڈیو بیک گراؤنڈ', category: 'textures', enabled: true, icon: '🎬', description: 'Video background support', type: 'texture', addedAt: Date.now() },
  { id: 'af14', name: 'Filters', nameUrdu: 'فلٹرز', category: 'effects', enabled: true, icon: '🔮', description: 'Multiple image filters', type: 'effect', addedAt: Date.now() },
  { id: 'af15', name: 'Admin Panel', nameUrdu: 'ایڈمن پینل', category: 'admin', enabled: true, icon: '🔐', description: 'Full admin control panel', type: 'feature', addedAt: Date.now() },
];

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [design, setDesign] = useState<DesignState>(initialDesign);
  const [activeTab, setActiveTab] = useState('editor');
  const [savedDesigns, setSavedDesigns] = useState<DesignState[]>([]);
  const [draftDesigns, setDraftDesigns] = useState<DesignState[]>([]);
  const [adminFeatures, setAdminFeatures] = useState<AdminFeature[]>(DEFAULT_ADMIN_FEATURES);

  const updateBackground = useCallback((bgId: string, colors: string[]) => {
    const bg = BACKGROUNDS.find(b => b.id === bgId);
    setDesign(prev => ({
      ...prev,
      backgroundId: bgId,
      backgroundColor: colors[0] || prev.backgroundColor,
      backgroundGradient: colors,
      backgroundPattern: bg?.pattern || '',
      updatedAt: Date.now(),
    }));
  }, []);

  const applyTemplate = useCallback((templateId: string) => {
    setDesign(prev => ({ ...prev, templateId, updatedAt: Date.now() }));
  }, []);

  const addTextLayer = useCallback((text = 'متن لکھیں') => {
    const newLayer: TextLayer = {
      ...defaultTextLayer,
      id: Date.now().toString(),
      text,
      x: 0.05 + Math.random() * 0.1,
      y: 0.3 + Math.random() * 0.2,
      color: '#B8860B',
      glow: false,
      zIndex: Date.now(),
    };
    setDesign(prev => ({
      ...prev,
      textLayers: [...prev.textLayers, newLayer],
      selectedLayerId: newLayer.id,
      selectedLayerType: 'text',
      updatedAt: Date.now(),
    }));
  }, []);

  const updateTextLayer = useCallback((id: string, updates: Partial<TextLayer>) => {
    setDesign(prev => ({
      ...prev,
      textLayers: prev.textLayers.map(layer =>
        layer.id === id ? { ...layer, ...updates } : layer
      ),
      updatedAt: Date.now(),
    }));
  }, []);

  const deleteTextLayer = useCallback((id: string) => {
    setDesign(prev => ({
      ...prev,
      textLayers: prev.textLayers.filter(l => l.id !== id),
      selectedLayerId: prev.selectedLayerId === id ? null : prev.selectedLayerId,
      selectedLayerType: prev.selectedLayerId === id ? null : prev.selectedLayerType,
      updatedAt: Date.now(),
    }));
  }, []);

  const duplicateLayer = useCallback((id: string) => {
    setDesign(prev => {
      const layer = prev.textLayers.find(l => l.id === id);
      if (!layer) return prev;
      const newLayer = { ...layer, id: Date.now().toString(), x: layer.x + 0.03, y: layer.y + 0.03, zIndex: Date.now() };
      return { ...prev, textLayers: [...prev.textLayers, newLayer], selectedLayerId: newLayer.id, updatedAt: Date.now() };
    });
  }, []);

  const moveLayerUp = useCallback((id: string) => {
    setDesign(prev => {
      const idx = prev.textLayers.findIndex(l => l.id === id);
      if (idx >= prev.textLayers.length - 1) return prev;
      const layers = [...prev.textLayers];
      [layers[idx], layers[idx + 1]] = [layers[idx + 1], layers[idx]];
      return { ...prev, textLayers: layers, updatedAt: Date.now() };
    });
  }, []);

  const moveLayerDown = useCallback((id: string) => {
    setDesign(prev => {
      const idx = prev.textLayers.findIndex(l => l.id === id);
      if (idx <= 0) return prev;
      const layers = [...prev.textLayers];
      [layers[idx], layers[idx - 1]] = [layers[idx - 1], layers[idx]];
      return { ...prev, textLayers: layers, updatedAt: Date.now() };
    });
  }, []);

  const toggleLayerLock = useCallback((id: string) => {
    setDesign(prev => ({
      ...prev,
      textLayers: prev.textLayers.map(l => l.id === id ? { ...l, locked: !l.locked } : l),
      updatedAt: Date.now(),
    }));
  }, []);

  const toggleLayerVisibility = useCallback((id: string) => {
    setDesign(prev => ({
      ...prev,
      textLayers: prev.textLayers.map(l => l.id === id ? { ...l, visible: !l.visible } : l),
      updatedAt: Date.now(),
    }));
  }, []);

  const addStickerLayer = useCallback((emoji: string) => {
    const newSticker: StickerLayer = {
      id: 'stk_' + Date.now().toString(),
      emoji,
      x: 0.1 + Math.random() * 0.7,
      y: 0.1 + Math.random() * 0.7,
      scale: 1,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      zIndex: Date.now(),
    };
    setDesign(prev => ({
      ...prev,
      stickerLayers: [...prev.stickerLayers, newSticker],
      selectedLayerId: newSticker.id,
      selectedLayerType: 'sticker',
      updatedAt: Date.now(),
    }));
  }, []);

  const updateStickerLayer = useCallback((id: string, updates: Partial<StickerLayer>) => {
    setDesign(prev => ({
      ...prev,
      stickerLayers: prev.stickerLayers.map(s => s.id === id ? { ...s, ...updates } : s),
      updatedAt: Date.now(),
    }));
  }, []);

  const deleteStickerLayer = useCallback((id: string) => {
    setDesign(prev => ({
      ...prev,
      stickerLayers: prev.stickerLayers.filter(s => s.id !== id),
      selectedLayerId: prev.selectedLayerId === id ? null : prev.selectedLayerId,
      selectedLayerType: prev.selectedLayerId === id ? null : prev.selectedLayerType,
      updatedAt: Date.now(),
    }));
  }, []);

  const selectLayer = useCallback((id: string | null, type: 'text' | 'sticker' = 'text') => {
    setDesign(prev => ({ ...prev, selectedLayerId: id, selectedLayerType: id ? type : null }));
  }, []);

  const setTransitionEffect = useCallback((effectId: string) => {
    setDesign(prev => ({ ...prev, transitionEffect: effectId, updatedAt: Date.now() }));
  }, []);

  const setAnimationEffect = useCallback((effectId: string) => {
    setDesign(prev => ({ ...prev, animationEffect: effectId, updatedAt: Date.now() }));
  }, []);

  const setDesignEffect = useCallback((effectId: string) => {
    setDesign(prev => ({ ...prev, designEffect: effectId, updatedAt: Date.now() }));
  }, []);

  const updateHeader = useCallback((text: string, style?: string) => {
    setDesign(prev => ({ ...prev, headerText: text, ...(style ? { headerStyle: style } : {}), updatedAt: Date.now() }));
  }, []);

  const updateFooter = useCallback((text: string, style?: string) => {
    setDesign(prev => ({ ...prev, footerText: text, ...(style ? { footerStyle: style } : {}), updatedAt: Date.now() }));
  }, []);

  const updateLogo = useCallback((text: string, style?: string) => {
    setDesign(prev => ({ ...prev, logoText: text, ...(style ? { logoStyle: style } : {}), updatedAt: Date.now() }));
  }, []);

  const updateSubTitle = useCallback((text: string) => {
    setDesign(prev => ({ ...prev, subTitleText: text, updatedAt: Date.now() }));
  }, []);

  const updateBorder = useCallback((style: string, color: string, width: number = 2) => {
    setDesign(prev => ({ ...prev, borderStyle: style, borderColor: color, borderWidth: width, updatedAt: Date.now() }));
  }, []);

  const updateEdge = useCallback((edgeDesign: string) => {
    setDesign(prev => ({ ...prev, edgeDesign, updatedAt: Date.now() }));
  }, []);

  const toggleGrid = useCallback(() => {
    setDesign(prev => ({ ...prev, showGrid: !prev.showGrid }));
  }, []);

  const toggleBorder = useCallback(() => {
    setDesign(prev => ({ ...prev, showBorder: !prev.showBorder }));
  }, []);

  const setCanvasAspect = useCallback((aspect: string, w: number, h: number) => {
    setDesign(prev => ({ ...prev, canvasAspect: aspect, canvasWidth: w, canvasHeight: h, updatedAt: Date.now() }));
  }, []);

  const setCanvasZoom = useCallback((zoom: number) => {
    setDesign(prev => ({ ...prev, canvasZoom: zoom }));
  }, []);

  const addFilter = useCallback((filter: string) => {
    setDesign(prev => ({ ...prev, filters: [...prev.filters.filter(f => f !== filter), filter], updatedAt: Date.now() }));
  }, []);

  const removeFilter = useCallback((filter: string) => {
    setDesign(prev => ({ ...prev, filters: prev.filters.filter(f => f !== filter), updatedAt: Date.now() }));
  }, []);

  const resetDesign = useCallback(() => {
    setDesign({ ...initialDesign, createdAt: Date.now(), updatedAt: Date.now() });
  }, []);

  const saveDesign = useCallback(() => {
    const toSave = { ...design, isDraft: false, updatedAt: Date.now() };
    setSavedDesigns(prev => [toSave, ...prev.slice(0, 49)]);
  }, [design]);

  const saveDraft = useCallback(() => {
    const toDraft = { ...design, isDraft: true, updatedAt: Date.now() };
    setDraftDesigns(prev => [toDraft, ...prev.slice(0, 49)]);
  }, [design]);

  const deleteDraft = useCallback((index: number) => {
    setDraftDesigns(prev => prev.filter((_, i) => i !== index));
  }, []);

  const deleteDesign = useCallback((index: number) => {
    setSavedDesigns(prev => prev.filter((_, i) => i !== index));
  }, []);

  const loadDesign = useCallback((d: DesignState) => {
    setDesign({ ...d, updatedAt: Date.now() });
  }, []);

  const updateDesignTitle = useCallback((title: string) => {
    setDesign(prev => ({ ...prev, title, updatedAt: Date.now() }));
  }, []);

  const updateAdminFeature = useCallback((id: string, updates: Partial<AdminFeature>) => {
    setAdminFeatures(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  }, []);

  const addAdminFeature = useCallback((feature: AdminFeature) => {
    setAdminFeatures(prev => [...prev, feature]);
  }, []);

  const removeAdminFeature = useCallback((id: string) => {
    setAdminFeatures(prev => prev.filter(f => f.id !== id));
  }, []);

  return (
    <EditorContext.Provider value={{
      design, activeTab, setActiveTab,
      updateBackground, applyTemplate,
      addTextLayer, updateTextLayer, deleteTextLayer,
      duplicateLayer, moveLayerUp, moveLayerDown,
      toggleLayerLock, toggleLayerVisibility,
      addStickerLayer, updateStickerLayer, deleteStickerLayer,
      selectLayer,
      setTransitionEffect, setAnimationEffect, setDesignEffect,
      updateHeader, updateFooter, updateLogo, updateSubTitle,
      updateBorder, updateEdge,
      toggleGrid, toggleBorder,
      setCanvasAspect, setCanvasZoom,
      addFilter, removeFilter,
      resetDesign, savedDesigns, draftDesigns,
      saveDesign, saveDraft, deleteDraft, deleteDesign,
      loadDesign, updateDesignTitle,
      adminFeatures, updateAdminFeature, addAdminFeature, removeAdminFeature,
    }}>
      {children}
    </EditorContext.Provider>
  );
}
