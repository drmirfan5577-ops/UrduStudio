// eVeR sMaRt UrDu sTuDiO - Storyboard Screen
import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Dimensions, Modal, FlatList, Alert,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/constants/theme';
import {
  StoryboardScene, StoryboardProject, SceneStyle,
  SCENE_STYLES, STORYBOARD_GENRES, STORYBOARD_READY_TEMPLATES,
  GENRE_DEFAULT_STYLES, parseTextToScenes, createEmptyScene,
} from '@/constants/storyboard';

const { width, height } = Dimensions.get('window');
const SCENE_CARD_W = width * 0.72;
const SCENE_CARD_H = SCENE_CARD_W * 0.62;

type MainTab = 'board' | 'scenes' | 'styles' | 'templates' | 'smart';

export default function StoryboardScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();

  // Project state
  const [project, setProject] = useState<StoryboardProject>({
    id: 'proj_' + Date.now(),
    title: 'My Storyboard',
    titleUrdu: 'میرا اسٹوری بورڈ',
    genre: 'cinematic',
    description: '',
    scenes: [],
    style: 'cinematic',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  const [projects, setProjects] = useState<StoryboardProject[]>([]);
  const [activeTab, setActiveTab] = useState<MainTab>('board');
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null);
  const [previewScene, setPreviewScene] = useState<StoryboardScene | null>(null);
  const [fullPreview, setFullPreview] = useState(false);
  const [smartInput, setSmartInput] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('cinematic');
  const [selectedStyle, setSelectedStyle] = useState<SceneStyle>('cinematic');
  const [editScene, setEditScene] = useState<StoryboardScene | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectTitleUrdu, setProjectTitleUrdu] = useState('');

  const selectedScene = project.scenes.find(s => s.id === selectedSceneId) || null;

  // Animated scale for scene tap
  const scaleAnim = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scaleAnim.value }] }));

  // ─── Smart Parse ──────────────────────────────────────────
  const handleSmartParse = () => {
    if (!smartInput.trim()) {
      showAlert('⚠️', 'متن، پرامپٹ یا HTML پیسٹ کریں');
      return;
    }
    const genre = selectedGenre;
    const style = GENRE_DEFAULT_STYLES[genre] || selectedStyle;
    const parsed = parseTextToScenes(smartInput, style, genre);
    if (!parsed.length) {
      showAlert('⚠️', 'کوئی سین نہیں ملا، مزید تفصیل شامل کریں');
      return;
    }
    setProject(prev => ({
      ...prev,
      scenes: [...prev.scenes, ...parsed],
      style,
      updatedAt: Date.now(),
    }));
    showAlert('✅ سینز بنائے', `${parsed.length} سین خودکار تیار ہوگئے!`, [
      { text: 'سین دیکھیں', onPress: () => setActiveTab('scenes') },
      { text: 'بورڈ دیکھیں', onPress: () => setActiveTab('board') },
    ]);
    setSmartInput('');
  };

  // ─── Apply Ready Template ──────────────────────────────────
  const applyTemplate = (tpl: typeof STORYBOARD_READY_TEMPLATES[0]) => {
    const scenes: StoryboardScene[] = tpl.scenes.map((s, i) => {
      const style = (s.style as SceneStyle) || tpl.style;
      const si = SCENE_STYLES[style];
      return {
        id: 'sc_' + Date.now() + '_' + i,
        sceneNumber: s.sceneNumber || i + 1,
        title: s.title || `Scene ${i + 1}`,
        titleUrdu: s.titleUrdu || `سین ${i + 1}`,
        description: s.description || '',
        visualsDescription: s.visualsDescription || '',
        backgroundMusic: s.backgroundMusic || '',
        dialogues: s.dialogues || [],
        style,
        bgColors: si.bg,
        textColor: si.text,
        accentColor: si.accent,
        overlayOpacity: 0.6,
        duration: s.duration || '3 min',
        location: s.location || '',
        tags: s.tags || [tpl.genre],
        icon: s.icon || '🎬',
        note: s.note || '',
      };
    });
    setProject(prev => ({
      ...prev,
      title: tpl.title,
      titleUrdu: tpl.titleUrdu,
      genre: tpl.genre,
      style: tpl.style,
      scenes,
      updatedAt: Date.now(),
    }));
    showAlert('✅ ٹیمپلیٹ', `"${tpl.titleUrdu}" لوڈ ہوگیا — ${scenes.length} سینز`);
    setActiveTab('board');
  };

  // ─── Scene CRUD ────────────────────────────────────────────
  const addScene = () => {
    const n = project.scenes.length + 1;
    const style = GENRE_DEFAULT_STYLES[project.genre] || project.style;
    const s = createEmptyScene(n, style);
    setProject(prev => ({ ...prev, scenes: [...prev.scenes, s], updatedAt: Date.now() }));
    setEditScene({ ...s });
    setEditModal(true);
  };

  const deleteScene = (id: string) => {
    showAlert('🗑️ حذف', 'یہ سین ہٹائیں؟', [
      { text: 'ہاں', style: 'destructive', onPress: () => {
        setProject(prev => ({ ...prev, scenes: prev.scenes.filter(s => s.id !== id), updatedAt: Date.now() }));
        if (selectedSceneId === id) setSelectedSceneId(null);
      }},
      { text: 'نہیں', style: 'cancel' },
    ]);
  };

  const duplicateScene = (scene: StoryboardScene) => {
    const dup: StoryboardScene = { ...scene, id: 'sc_' + Date.now(), sceneNumber: project.scenes.length + 1 };
    setProject(prev => ({ ...prev, scenes: [...prev.scenes, dup], updatedAt: Date.now() }));
  };

  const saveEditScene = () => {
    if (!editScene) return;
    const si = SCENE_STYLES[editScene.style];
    const updated: StoryboardScene = {
      ...editScene,
      bgColors: si.bg,
      textColor: si.text,
      accentColor: si.accent,
    };
    setProject(prev => ({
      ...prev,
      scenes: prev.scenes.map(s => s.id === updated.id ? updated : s),
      updatedAt: Date.now(),
    }));
    setEditModal(false);
    setEditScene(null);
  };

  const changeSceneStyle = (id: string, style: SceneStyle) => {
    const si = SCENE_STYLES[style];
    setProject(prev => ({
      ...prev,
      scenes: prev.scenes.map(s => s.id === id ? { ...s, style, bgColors: si.bg, textColor: si.text, accentColor: si.accent } : s),
    }));
  };

  const moveScene = (id: string, dir: 'up' | 'down') => {
    setProject(prev => {
      const idx = prev.scenes.findIndex(s => s.id === id);
      if (dir === 'up' && idx <= 0) return prev;
      if (dir === 'down' && idx >= prev.scenes.length - 1) return prev;
      const sc = [...prev.scenes];
      const swap = dir === 'up' ? idx - 1 : idx + 1;
      [sc[idx], sc[swap]] = [sc[swap], sc[idx]];
      return { ...prev, scenes: sc.map((s, i) => ({ ...s, sceneNumber: i + 1 })), updatedAt: Date.now() };
    });
  };

  const saveProject = () => {
    const p = { ...project, updatedAt: Date.now() };
    setProjects(prev => {
      const idx = prev.findIndex(x => x.id === p.id);
      if (idx >= 0) { const arr = [...prev]; arr[idx] = p; return arr; }
      return [p, ...prev];
    });
    showAlert('✅', 'پروجیکٹ محفوظ ہوگیا');
  };

  const newProject = () => {
    showAlert('📝 نیا پروجیکٹ', 'موجودہ پروجیکٹ بند ہوگا — جاری رکھیں؟', [
      { text: 'ہاں', onPress: () => setProject({
        id: 'proj_' + Date.now(), title: 'New Storyboard', titleUrdu: 'نیا اسٹوری بورڈ',
        genre: 'cinematic', description: '', scenes: [], style: 'cinematic',
        createdAt: Date.now(), updatedAt: Date.now(),
      })},
      { text: 'نہیں', style: 'cancel' },
    ]);
  };

  // ─── Scene Card (Board View) ───────────────────────────────
  const SceneCard = ({ scene, index }: { scene: StoryboardScene; index: number }) => {
    const isSelected = scene.id === selectedSceneId;
    const si = SCENE_STYLES[scene.style];
    return (
      <TouchableOpacity
        style={[styles.sceneCard, { width: SCENE_CARD_W, height: SCENE_CARD_H }, isSelected && styles.sceneCardSelected]}
        onPress={() => { setSelectedSceneId(scene.id); setPreviewScene(scene); }}
        onLongPress={() => { setEditScene({ ...scene }); setEditModal(true); }}
        activeOpacity={0.88}
      >
        {/* BG */}
        <View style={[StyleSheet.absoluteFill, { backgroundColor: si.bg[0] }]} />
        {si.bg[1] && <View style={[StyleSheet.absoluteFill, { backgroundColor: si.bg[1], opacity: 0.5, top: '40%' }]} />}
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,' + scene.overlayOpacity + ')' }]} />

        {/* Scene Number Badge */}
        <View style={[styles.sceneNumBadge, { backgroundColor: scene.accentColor }]}>
          <Text style={styles.sceneNumText}>{scene.sceneNumber}</Text>
        </View>

        {/* Icon */}
        <Text style={styles.sceneIcon}>{scene.icon}</Text>

        {/* Title */}
        <Text style={[styles.sceneTitle, { color: scene.textColor }]} numberOfLines={2}>
          {scene.titleUrdu}
        </Text>
        {scene.title !== scene.titleUrdu && (
          <Text style={[styles.sceneTitleEn, { color: scene.accentColor }]} numberOfLines={1}>
            {scene.title}
          </Text>
        )}

        {/* Visuals hint */}
        {scene.visualsDescription ? (
          <Text style={[styles.sceneVisuals, { color: scene.textColor + 'AA' }]} numberOfLines={2}>
            👁 {scene.visualsDescription}
          </Text>
        ) : null}

        {/* Music hint */}
        {scene.backgroundMusic ? (
          <Text style={[styles.sceneMusic, { color: scene.accentColor + 'CC' }]} numberOfLines={1}>
            🎵 {scene.backgroundMusic}
          </Text>
        ) : null}

        {/* Duration & Location */}
        <View style={styles.sceneFooter}>
          {scene.duration ? <Text style={[styles.sceneFooterText, { color: scene.accentColor }]}>⏱ {scene.duration}</Text> : null}
          {scene.location ? <Text style={[styles.sceneFooterText, { color: scene.textColor + '80' }]} numberOfLines={1}>📍 {scene.location}</Text> : null}
        </View>

        {/* Style badge */}
        <View style={[styles.styleBadge, { backgroundColor: scene.accentColor + '33' }]}>
          <Text style={[styles.styleBadgeText, { color: scene.accentColor }]}>
            {si.icon} {si.labelUrdu}
          </Text>
        </View>

        {/* Selected ring */}
        {isSelected && <View style={[StyleSheet.absoluteFill, { borderWidth: 2.5, borderColor: Colors.primary, borderRadius: Radius.md }]} />}
      </TouchableOpacity>
    );
  };

  // ─── Selected Scene Detail Panel ──────────────────────────
  const SceneDetailPanel = () => {
    if (!previewScene) return null;
    const si = SCENE_STYLES[previewScene.style];
    return (
      <View style={styles.detailPanel}>
        <View style={[styles.detailHeader, { backgroundColor: si.bg[0] }]}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.55)', borderTopLeftRadius: Radius.md, borderTopRightRadius: Radius.md }]} />
          <Text style={[styles.detailTitle, { color: previewScene.textColor }]}>{previewScene.titleUrdu}</Text>
          <Text style={[styles.detailStyleLabel, { color: previewScene.accentColor }]}>{si.icon} {si.labelUrdu}</Text>
        </View>
        <ScrollView style={styles.detailBody} showsVerticalScrollIndicator={false}>
          {previewScene.visualsDescription ? (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>👁 منظر</Text>
              <Text style={styles.detailValue}>{previewScene.visualsDescription}</Text>
            </View>
          ) : null}
          {previewScene.backgroundMusic ? (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>🎵 موسیقی</Text>
              <Text style={styles.detailValue}>{previewScene.backgroundMusic}</Text>
            </View>
          ) : null}
          {previewScene.location ? (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>📍 مقام</Text>
              <Text style={styles.detailValue}>{previewScene.location}</Text>
            </View>
          ) : null}
          {previewScene.duration ? (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>⏱ دورانیہ</Text>
              <Text style={styles.detailValue}>{previewScene.duration}</Text>
            </View>
          ) : null}
          {previewScene.dialogues.length > 0 ? (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>💬 مکالمہ</Text>
              {previewScene.dialogues.map((d, i) => <Text key={i} style={styles.detailValue}>"{d}"</Text>)}
            </View>
          ) : null}
          {previewScene.note ? (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>📌 نوٹ</Text>
              <Text style={styles.detailValue}>{previewScene.note}</Text>
            </View>
          ) : null}
          <View style={styles.detailActions}>
            <TouchableOpacity style={[styles.detailBtn, { backgroundColor: Colors.primary }]}
              onPress={() => { setEditScene({ ...previewScene }); setEditModal(true); }} activeOpacity={0.8}>
              <MaterialIcons name="edit" size={16} color="#FFF" />
              <Text style={styles.detailBtnText}>ایڈٹ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.detailBtn, { backgroundColor: Colors.accentBlue }]}
              onPress={() => duplicateScene(previewScene)} activeOpacity={0.8}>
              <MaterialIcons name="content-copy" size={16} color="#FFF" />
              <Text style={styles.detailBtnText}>کاپی</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.detailBtn, { backgroundColor: Colors.accentRed }]}
              onPress={() => deleteScene(previewScene.id)} activeOpacity={0.8}>
              <MaterialIcons name="delete-outline" size={16} color="#FFF" />
              <Text style={styles.detailBtnText}>حذف</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.detailBtn, { backgroundColor: Colors.accentPurple }]}
              onPress={() => setFullPreview(true)} activeOpacity={0.8}>
              <MaterialIcons name="fullscreen" size={16} color="#FFF" />
              <Text style={styles.detailBtnText}>فل</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  // ─── BOARD TAB ─────────────────────────────────────────────
  const renderBoardTab = () => (
    <View style={styles.flex1}>
      {project.scenes.length === 0 ? (
        <View style={styles.emptyBoard}>
          <Text style={styles.emptyBoardIcon}>🎬</Text>
          <Text style={styles.emptyBoardTitle}>اسٹوری بورڈ خالی ہے</Text>
          <Text style={styles.emptyBoardSub}>سین شامل کریں یا اسمارٹ پارسر استعمال کریں</Text>
          <View style={styles.emptyBoardBtns}>
            <TouchableOpacity style={[styles.emptyBtn, { backgroundColor: Colors.primary }]}
              onPress={addScene} activeOpacity={0.8}>
              <MaterialIcons name="add" size={18} color="#FFF" />
              <Text style={styles.emptyBtnText}>سین شامل کریں</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.emptyBtn, { backgroundColor: Colors.accentBlue }]}
              onPress={() => setActiveTab('smart')} activeOpacity={0.8}>
              <MaterialIcons name="auto-fix-high" size={18} color="#FFF" />
              <Text style={styles.emptyBtnText}>اسمارٹ پارس</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.flex1}>
          {/* Horizontal Scene Strip */}
          <View style={styles.boardStrip}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.boardStripContent}>
              {project.scenes.map((scene, idx) => (
                <SceneCard key={scene.id} scene={scene} index={idx} />
              ))}
              <TouchableOpacity style={styles.addSceneCard} onPress={addScene} activeOpacity={0.8}>
                <MaterialIcons name="add-circle" size={36} color={Colors.primary} />
                <Text style={styles.addSceneText}>سین{'\n'}شامل</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Scene count bar */}
          <View style={styles.countBar}>
            <Text style={styles.countBarText}>{project.scenes.length} سینز</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.countBarDots}>
              {project.scenes.map((s, i) => (
                <TouchableOpacity key={s.id}
                  style={[styles.dot, { backgroundColor: s.id === selectedSceneId ? Colors.primary : Colors.surfaceBorder }]}
                  onPress={() => { setSelectedSceneId(s.id); setPreviewScene(s); }}
                  activeOpacity={0.7} />
              ))}
            </ScrollView>
          </View>

          {/* Detail Panel */}
          {previewScene ? <SceneDetailPanel /> : (
            <View style={styles.noSceneHint}>
              <Text style={styles.noSceneHintText}>سین ٹیپ کریں تفصیل دیکھنے کے لیے</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );

  // ─── SCENES LIST TAB ───────────────────────────────────────
  const renderScenesTab = () => (
    <FlatList
      data={project.scenes}
      keyExtractor={s => s.id}
      contentContainerStyle={[styles.sceneListContent, { paddingBottom: insets.bottom + 120 }]}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyBoard}>
          <Text style={styles.emptyBoardIcon}>📋</Text>
          <Text style={styles.emptyBoardTitle}>کوئی سین نہیں</Text>
          <TouchableOpacity style={[styles.emptyBtn, { backgroundColor: Colors.primary }]}
            onPress={addScene} activeOpacity={0.8}>
            <MaterialIcons name="add" size={16} color="#FFF" />
            <Text style={styles.emptyBtnText}>پہلا سین شامل کریں</Text>
          </TouchableOpacity>
        </View>
      }
      renderItem={({ item: scene, index }) => {
        const si = SCENE_STYLES[scene.style];
        return (
          <View style={[styles.listSceneCard, { borderLeftColor: scene.accentColor }]}>
            <View style={[styles.listSceneHeader, { backgroundColor: si.bg[0] }]}>
              <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: Radius.sm }]} />
              <View style={styles.listSceneHeaderInner}>
                <Text style={styles.listSceneIcon}>{scene.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.listSceneTitleUrdu, { color: scene.textColor }]} numberOfLines={1}>{scene.titleUrdu}</Text>
                  <Text style={[styles.listSceneTitleEn, { color: scene.accentColor }]} numberOfLines={1}>{scene.title}</Text>
                </View>
                <View style={[styles.listNumBadge, { backgroundColor: scene.accentColor }]}>
                  <Text style={styles.listNumText}>{scene.sceneNumber}</Text>
                </View>
              </View>
            </View>
            {scene.visualsDescription ? <Text style={styles.listSceneDesc} numberOfLines={2}>👁 {scene.visualsDescription}</Text> : null}
            {scene.backgroundMusic ? <Text style={styles.listSceneMusic} numberOfLines={1}>🎵 {scene.backgroundMusic}</Text> : null}
            <View style={styles.listSceneFooter}>
              <View style={[styles.listStyleBadge, { backgroundColor: si.bg[0] + '40', borderColor: scene.accentColor + '50' }]}>
                <Text style={[styles.listStyleBadgeText, { color: scene.accentColor }]}>{si.icon} {si.labelUrdu}</Text>
              </View>
              {scene.duration ? <Text style={styles.listDuration}>⏱ {scene.duration}</Text> : null}
              <View style={styles.listSceneActions}>
                <TouchableOpacity onPress={() => moveScene(scene.id, 'up')} style={styles.listBtn}>
                  <MaterialIcons name="arrow-upward" size={15} color={Colors.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => moveScene(scene.id, 'down')} style={styles.listBtn}>
                  <MaterialIcons name="arrow-downward" size={15} color={Colors.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setEditScene({ ...scene }); setEditModal(true); }} style={styles.listBtn}>
                  <MaterialIcons name="edit" size={15} color={Colors.accentBlue} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => duplicateScene(scene)} style={styles.listBtn}>
                  <MaterialIcons name="content-copy" size={15} color={Colors.accent} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteScene(scene.id)} style={styles.listBtn}>
                  <MaterialIcons name="delete-outline" size={15} color={Colors.accentRed} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }}
    />
  );

  // ─── STYLES TAB ────────────────────────────────────────────
  const renderStylesTab = () => (
    <ScrollView contentContainerStyle={[styles.stylesContent, { paddingBottom: insets.bottom + 120 }]}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.tabSectionTitle}>🎨 سین اسٹائلز ({Object.keys(SCENE_STYLES).length})</Text>
      <Text style={styles.tabSectionSubtitle}>منتخب سین پر اسٹائل لگانے کے لیے ٹیپ کریں</Text>
      <View style={styles.styleGrid}>
        {(Object.entries(SCENE_STYLES) as [SceneStyle, any][]).map(([id, si]) => (
          <TouchableOpacity key={id}
            style={[styles.styleCard, { backgroundColor: si.bg[0], borderColor: si.accent + '80' },
              selectedStyle === id && styles.styleCardSelected]}
            onPress={() => {
              setSelectedStyle(id);
              if (selectedSceneId) changeSceneStyle(selectedSceneId, id);
              else setProject(prev => ({ ...prev, style: id }));
              showAlert('✅', `"${si.labelUrdu}" اسٹائل لگایا گیا`);
            }}
            activeOpacity={0.8}
          >
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: Radius.md }]} />
            <Text style={styles.styleCardIcon}>{si.icon}</Text>
            <Text style={[styles.styleCardLabel, { color: si.text }]}>{si.labelUrdu}</Text>
            <Text style={[styles.styleCardEn, { color: si.accent }]}>{si.label}</Text>
            <Text style={[styles.styleCardDesc, { color: si.text + '99' }]} numberOfLines={2}>{si.description}</Text>
            {selectedStyle === id && (
              <View style={[styles.styleSelectedBadge, { backgroundColor: si.accent }]}>
                <MaterialIcons name="check" size={12} color="#000" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.tabSectionTitle, { marginTop: Spacing.lg }]}>🎞️ ژانر سے اسٹائل</Text>
      <View style={styles.genreGrid}>
        {STORYBOARD_GENRES.map(g => {
          const defStyle = GENRE_DEFAULT_STYLES[g.id];
          const si = SCENE_STYLES[defStyle];
          return (
            <TouchableOpacity key={g.id}
              style={[styles.genreCard, { backgroundColor: si.bg[0] + 'CC', borderColor: si.accent + '50' }]}
              onPress={() => {
                setSelectedGenre(g.id);
                setSelectedStyle(defStyle);
                setProject(prev => ({ ...prev, genre: g.id, style: defStyle }));
              }}
              activeOpacity={0.8}>
              <Text style={styles.genreIcon}>{g.icon}</Text>
              <Text style={[styles.genreLabel, { color: si.text }]}>{g.label}</Text>
              <Text style={[styles.genreStyleLabel, { color: si.accent }]}>{si.labelUrdu}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );

  // ─── TEMPLATES TAB ─────────────────────────────────────────
  const renderTemplatesTab = () => (
    <ScrollView contentContainerStyle={[styles.stylesContent, { paddingBottom: insets.bottom + 120 }]}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.tabSectionTitle}>📁 ریڈی میڈ اسٹوری بورڈ ٹیمپلیٹس</Text>
      {STORYBOARD_READY_TEMPLATES.map(tpl => {
        const si = SCENE_STYLES[tpl.style];
        return (
          <TouchableOpacity key={tpl.id}
            style={[styles.tplCard, { borderLeftColor: si.accent }]}
            onPress={() => showAlert(tpl.icon + ' ' + tpl.titleUrdu, `${tpl.description}\n\n${tpl.scenes.length} سینز لوڈ ہوں گے`, [
              { text: 'لوڈ کریں', onPress: () => applyTemplate(tpl) },
              { text: 'منسوخ', style: 'cancel' },
            ])}
            activeOpacity={0.85}
          >
            <View style={[styles.tplBanner, { backgroundColor: si.bg[0] }]}>
              <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)', borderTopLeftRadius: Radius.md, borderTopRightRadius: Radius.md }]} />
              <Text style={styles.tplBannerIcon}>{tpl.icon}</Text>
              <View>
                <Text style={[styles.tplTitle, { color: si.text }]}>{tpl.titleUrdu}</Text>
                <Text style={[styles.tplTitleEn, { color: si.accent }]}>{tpl.title}</Text>
              </View>
              <View style={[styles.tplStyleBadge, { backgroundColor: si.accent + '33', borderColor: si.accent + '50' }]}>
                <Text style={[styles.tplStyleText, { color: si.accent }]}>{si.labelUrdu}</Text>
              </View>
            </View>
            <View style={styles.tplBody}>
              <Text style={styles.tplDesc}>{tpl.description}</Text>
              <View style={styles.tplScenePills}>
                {tpl.scenes.slice(0, 4).map((s, i) => (
                  <View key={i} style={[styles.tplScenePill, { backgroundColor: si.accent + '20' }]}>
                    <Text style={[styles.tplScenePillText, { color: si.accent }]}>{s.icon} {s.titleUrdu}</Text>
                  </View>
                ))}
                {tpl.scenes.length > 4 && (
                  <View style={[styles.tplScenePill, { backgroundColor: Colors.surfaceBorder }]}>
                    <Text style={styles.tplScenePillText}>+{tpl.scenes.length - 4}</Text>
                  </View>
                )}
              </View>
              <View style={styles.tplFooter}>
                <Text style={styles.tplScenesCount}>{tpl.scenes.length} سینز</Text>
                <View style={[styles.tplApplyBtn, { backgroundColor: si.accent }]}>
                  <Text style={styles.tplApplyText}>لوڈ کریں</Text>
                  <MaterialIcons name="arrow-forward" size={14} color="#000" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  // ─── SMART PARSE TAB ───────────────────────────────────────
  const renderSmartTab = () => (
    <KeyboardAvoidingView style={styles.flex1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={[styles.smartContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.smartHeader}>
          <Text style={styles.smartTitle}>🤖 اسمارٹ اسٹوری بورڈ پارسر</Text>
          <Text style={styles.smartSubtitle}>متن، پرامپٹ، HTML یا کوئی بھی معلومات پیسٹ کریں — خودکار سینز بنیں گے</Text>
        </View>

        {/* Genre Selector */}
        <Text style={styles.smartLabel}>ژانر منتخب کریں</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {STORYBOARD_GENRES.map(g => (
            <TouchableOpacity key={g.id}
              style={[styles.genreChip, selectedGenre === g.id && styles.genreChipActive]}
              onPress={() => setSelectedGenre(g.id)} activeOpacity={0.7}>
              <Text style={styles.genreChipIcon}>{g.icon}</Text>
              <Text style={[styles.genreChipText, selectedGenre === g.id && styles.genreChipTextActive]}>{g.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Style Selector */}
        <Text style={styles.smartLabel}>اسٹائل</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {(Object.entries(SCENE_STYLES) as [SceneStyle, any][]).map(([id, si]) => (
            <TouchableOpacity key={id}
              style={[styles.styleChip, { backgroundColor: si.bg[0] + 'CC', borderColor: si.accent + '70' },
                selectedStyle === id && { borderColor: si.accent, borderWidth: 2 }]}
              onPress={() => setSelectedStyle(id)} activeOpacity={0.7}>
              <Text style={[styles.styleChipText, { color: si.text }]}>{si.icon} {si.labelUrdu}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Text Input */}
        <Text style={styles.smartLabel}>متن / پرامپٹ / HTML پیسٹ کریں</Text>
        <TextInput
          style={styles.smartInput}
          value={smartInput}
          onChangeText={setSmartInput}
          placeholder={"مثال:\n#### 1. اوپننگ سین (Opening Scene)\n**منظر:** SSG ہیڈکوارٹر، ٹیم کی تشکیل\n**بیک گراؤنڈ میوزک:** پاکستان کا قومی ترانہ\n\n#### 2. مشن بریفنگ\n..."}
          placeholderTextColor={Colors.textLight}
          multiline
          textAlignVertical="top"
          textAlign="right"
          numberOfLines={12}
        />

        {/* Parse Button */}
        <TouchableOpacity style={styles.parseBtn} onPress={handleSmartParse} activeOpacity={0.85}>
          <MaterialIcons name="auto-fix-high" size={22} color="#FFF" />
          <Text style={styles.parseBtnText}>خودکار سینز بنائیں</Text>
        </TouchableOpacity>

        {/* Supported Formats */}
        <View style={styles.formatsCard}>
          <Text style={styles.formatsTitle}>سپورٹڈ فارمیٹس</Text>
          {[
            { icon: '📝', label: 'اردو/انگریزی متن', desc: 'سادہ ٹیکسٹ میں سین کا نام اور تفصیل' },
            { icon: '📋', label: 'مارک ڈاؤن', desc: '#### 1. سین نام\n**منظر:** تفصیل' },
            { icon: '🌐', label: 'HTML', desc: '<h3>1. Scene</h3><p>Description</p>' },
            { icon: '💡', label: 'پرامپٹ', desc: 'AI پرامپٹ کا آؤٹ پٹ براہ راست پیسٹ کریں' },
            { icon: '🎬', label: 'اسکرپٹ', desc: 'فلم/ڈرامہ اسکرپٹ فارمیٹ' },
            { icon: '📊', label: 'اسپریڈ شیٹ', desc: 'CSV یا ٹیبل ڈیٹا پیسٹ کریں' },
          ].map((f, i) => (
            <View key={i} style={styles.formatRow}>
              <Text style={styles.formatIcon}>{f.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.formatLabel}>{f.label}</Text>
                <Text style={styles.formatDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 اسمارٹ پارسر ٹپس</Text>
          <Text style={styles.tipsText}>
            {'• #### 1. سین نام (English Name) — سین کا عنوان\n'}
            {'• **منظر:** — ویژوال تفصیل\n'}
            {'• **بیک گراؤنڈ میوزک:** — موسیقی کا نام\n'}
            {'• **مقام:** — مقام/جگہ\n'}
            {'• - بلٹ پوائنٹ لائنز بھی سمجھ لی جاتی ہیں\n'}
            {'• سین نمبر 1. یا 1- یا #### 1. سے شروع ہوں'}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  // ─── EDIT SCENE MODAL ──────────────────────────────────────
  const EditSceneModal = () => {
    if (!editScene) return null;
    const si = SCENE_STYLES[editScene.style];
    return (
      <Modal visible={editModal} animationType="slide" transparent onRequestClose={() => setEditModal(false)}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView style={styles.editModal} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={[styles.editModalHeader, { backgroundColor: si.bg[0] }]}>
              <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />
              <Text style={[styles.editModalTitle, { color: si.text }]}>سین {editScene.sceneNumber} ایڈٹ</Text>
              <TouchableOpacity onPress={() => setEditModal(false)} style={styles.editModalClose}>
                <MaterialIcons name="close" size={20} color={si.text} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.editModalBody} showsVerticalScrollIndicator={false}>
              {/* Titles */}
              <Text style={styles.editLabel}>اردو عنوان *</Text>
              <TextInput style={[styles.editInput, { textAlign: 'right' }]}
                value={editScene.titleUrdu}
                onChangeText={t => setEditScene(prev => prev ? { ...prev, titleUrdu: t } : prev)}
                placeholder="سین کا اردو نام..." placeholderTextColor={Colors.textLight} />

              <Text style={styles.editLabel}>English Title</Text>
              <TextInput style={styles.editInput}
                value={editScene.title}
                onChangeText={t => setEditScene(prev => prev ? { ...prev, title: t } : prev)}
                placeholder="Scene title..." placeholderTextColor={Colors.textLight} />

              <Text style={styles.editLabel}>👁 منظر / Visuals</Text>
              <TextInput style={[styles.editInput, { height: 80, textAlignVertical: 'top' }]}
                value={editScene.visualsDescription}
                onChangeText={t => setEditScene(prev => prev ? { ...prev, visualsDescription: t } : prev)}
                placeholder="ویژوال تفصیل..." placeholderTextColor={Colors.textLight}
                multiline textAlign="right" />

              <Text style={styles.editLabel}>🎵 بیک گراؤنڈ موسیقی</Text>
              <TextInput style={styles.editInput}
                value={editScene.backgroundMusic}
                onChangeText={t => setEditScene(prev => prev ? { ...prev, backgroundMusic: t } : prev)}
                placeholder="موسیقی کا نام..." placeholderTextColor={Colors.textLight} textAlign="right" />

              <Text style={styles.editLabel}>📍 مقام / Location</Text>
              <TextInput style={styles.editInput}
                value={editScene.location}
                onChangeText={t => setEditScene(prev => prev ? { ...prev, location: t } : prev)}
                placeholder="جگہ..." placeholderTextColor={Colors.textLight} textAlign="right" />

              <Text style={styles.editLabel}>⏱ دورانیہ / Duration</Text>
              <TextInput style={styles.editInput}
                value={editScene.duration}
                onChangeText={t => setEditScene(prev => prev ? { ...prev, duration: t } : prev)}
                placeholder="3 min / 30 sec..." placeholderTextColor={Colors.textLight} />

              <Text style={styles.editLabel}>📌 نوٹ</Text>
              <TextInput style={[styles.editInput, { height: 60, textAlignVertical: 'top' }]}
                value={editScene.note}
                onChangeText={t => setEditScene(prev => prev ? { ...prev, note: t } : prev)}
                placeholder="اضافی نوٹ..." placeholderTextColor={Colors.textLight} textAlign="right" multiline />

              <Text style={styles.editLabel}>🎨 اسٹائل</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
                {(Object.entries(SCENE_STYLES) as [SceneStyle, any][]).map(([id, sti]) => (
                  <TouchableOpacity key={id}
                    style={[styles.editStyleChip, { backgroundColor: sti.bg[0] + 'DD', borderColor: sti.accent + '80' },
                      editScene.style === id && { borderColor: sti.accent, borderWidth: 2 }]}
                    onPress={() => setEditScene(prev => prev ? { ...prev, style: id as SceneStyle } : prev)}
                    activeOpacity={0.7}>
                    <Text style={{ color: sti.text, fontSize: 14 }}>{sti.icon}</Text>
                    <Text style={[styles.editStyleChipText, { color: sti.accent }]}>{sti.labelUrdu}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity style={styles.saveEditBtn} onPress={saveEditScene} activeOpacity={0.85}>
                <MaterialIcons name="save" size={20} color="#FFF" />
                <Text style={styles.saveEditBtnText}>محفوظ کریں</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  };

  // ─── FULL PREVIEW MODAL ────────────────────────────────────
  const FullPreviewModal = () => {
    if (!previewScene || !fullPreview) return null;
    const si = SCENE_STYLES[previewScene.style];
    return (
      <Modal visible={fullPreview} animationType="fade" onRequestClose={() => setFullPreview(false)}>
        <View style={[styles.fullPreview, { backgroundColor: si.bg[0] }]}>
          {si.bg[1] && <View style={[StyleSheet.absoluteFill, { backgroundColor: si.bg[1], opacity: 0.5, top: '35%' }]} />}
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,' + previewScene.overlayOpacity + ')' }]} />

          {/* Scene Number */}
          <View style={[styles.fpNumBadge, { backgroundColor: previewScene.accentColor }]}>
            <Text style={styles.fpNumText}>سین {previewScene.sceneNumber}</Text>
          </View>

          {/* Icon */}
          <Text style={styles.fpIcon}>{previewScene.icon}</Text>

          {/* Title */}
          <Text style={[styles.fpTitle, { color: previewScene.textColor }]}>{previewScene.titleUrdu}</Text>
          <Text style={[styles.fpTitleEn, { color: previewScene.accentColor }]}>{previewScene.title}</Text>

          {/* Separator */}
          <View style={[styles.fpSeparator, { backgroundColor: previewScene.accentColor }]} />

          <ScrollView contentContainerStyle={styles.fpContent}>
            {previewScene.visualsDescription ? (
              <View style={styles.fpSection}>
                <Text style={[styles.fpSectionLabel, { color: previewScene.accentColor }]}>👁 منظر</Text>
                <Text style={[styles.fpSectionText, { color: previewScene.textColor }]}>{previewScene.visualsDescription}</Text>
              </View>
            ) : null}
            {previewScene.backgroundMusic ? (
              <View style={styles.fpSection}>
                <Text style={[styles.fpSectionLabel, { color: previewScene.accentColor }]}>🎵 بیک گراؤنڈ موسیقی</Text>
                <Text style={[styles.fpSectionText, { color: previewScene.textColor }]}>{previewScene.backgroundMusic}</Text>
              </View>
            ) : null}
            {previewScene.dialogues.map((d, i) => (
              <View key={i} style={styles.fpSection}>
                <Text style={[styles.fpSectionLabel, { color: previewScene.accentColor }]}>💬</Text>
                <Text style={[styles.fpSectionText, { color: previewScene.textColor, fontStyle: 'italic' }]}>"{d}"</Text>
              </View>
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={styles.fpFooter}>
            <Text style={[styles.fpStyleLabel, { color: previewScene.accentColor }]}>{si.icon} {si.labelUrdu}</Text>
            {previewScene.duration ? <Text style={[styles.fpFooterText, { color: previewScene.textColor + 'BB' }]}>⏱ {previewScene.duration}</Text> : null}
            {previewScene.location ? <Text style={[styles.fpFooterText, { color: previewScene.textColor + '80' }]}>📍 {previewScene.location}</Text> : null}
          </View>

          <TouchableOpacity style={[styles.fpCloseBtn, { backgroundColor: previewScene.accentColor + '33' }]}
            onPress={() => setFullPreview(false)} activeOpacity={0.8}>
            <MaterialIcons name="fullscreen-exit" size={22} color={previewScene.accentColor} />
            <Text style={[styles.fpCloseBtnText, { color: previewScene.accentColor }]}>بند کریں</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  // ─── RENDER ────────────────────────────────────────────────
  const TABS: { id: MainTab; label: string; icon: string }[] = [
    { id: 'board', label: 'بورڈ', icon: 'view-carousel' },
    { id: 'scenes', label: 'سینز', icon: 'list' },
    { id: 'styles', label: 'اسٹائل', icon: 'palette' },
    { id: 'templates', label: 'ٹیمپلیٹ', icon: 'collections' },
    { id: 'smart', label: 'اسمارٹ', icon: 'auto-fix-high' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerEmoji}>🎬</Text>
          <View>
            <Text style={styles.headerTitle}>اسٹوری بورڈ</Text>
            <Text style={styles.headerSub} numberOfLines={1}>
              {project.titleUrdu} • {project.scenes.length} سینز
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.hBtn} onPress={saveProject} activeOpacity={0.7}>
            <MaterialIcons name="save" size={16} color={Colors.accent} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.hBtn} onPress={newProject} activeOpacity={0.7}>
            <MaterialIcons name="add" size={16} color={Colors.accentBlue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.hBtn}
            onPress={() => showAlert('📤 ایکسپورٹ', 'اسٹوری بورڈ ایکسپورٹ فارمیٹ', [
              { text: '📄 PDF', onPress: () => showAlert('✅', 'PDF تیار ہورہا ہے') },
              { text: '🖼️ PNG Slides', onPress: () => showAlert('✅', 'سلائیڈز تیار ہورہی ہیں') },
              { text: '📝 Text', onPress: () => showAlert('✅', 'ٹیکسٹ ایکسپورٹ ہوگیا') },
              { text: 'منسوخ', style: 'cancel' },
            ])} activeOpacity={0.7}>
            <MaterialIcons name="file-download" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)} activeOpacity={0.7}>
            <MaterialIcons name={tab.icon as any} size={15}
              color={activeTab === tab.id ? Colors.primary : Colors.textMuted} />
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={[styles.flex1, { paddingBottom: insets.bottom + 68 }]}>
        {activeTab === 'board' && renderBoardTab()}
        {activeTab === 'scenes' && renderScenesTab()}
        {activeTab === 'styles' && renderStylesTab()}
        {activeTab === 'templates' && renderTemplatesTab()}
        {activeTab === 'smart' && renderSmartTab()}
      </View>

      {/* Modals */}
      <EditSceneModal />
      <FullPreviewModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  flex1: { flex: 1 },
  header: { backgroundColor: Colors.surface, paddingHorizontal: Spacing.md, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', ...Shadows.sm },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  headerEmoji: { fontSize: 26 },
  headerTitle: { fontSize: 18, color: Colors.primary, fontWeight: '800' },
  headerSub: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },
  headerRight: { flexDirection: 'row', gap: 6 },
  hBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surfaceBorder },
  tabBar: { flexDirection: 'row', backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 9, gap: 4, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: Colors.primary },
  tabLabel: { fontSize: 9, color: Colors.textMuted, fontWeight: '600' },
  tabLabelActive: { color: Colors.primary },

  // Board
  boardStrip: { paddingVertical: 10, paddingLeft: Spacing.md },
  boardStripContent: { paddingRight: Spacing.md, gap: 12, alignItems: 'center' },
  sceneCard: { borderRadius: Radius.md, overflow: 'hidden', padding: Spacing.sm, justifyContent: 'flex-end', ...Shadows.md, position: 'relative' },
  sceneCardSelected: { ...Shadows.lg },
  sceneNumBadge: { position: 'absolute', top: 8, left: 8, width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  sceneNumText: { fontSize: 11, color: '#000', fontWeight: '800' },
  sceneIcon: { fontSize: 28, textAlign: 'center', marginBottom: 6 },
  sceneTitle: { fontSize: 15, fontWeight: '700', textAlign: 'right', lineHeight: 22 },
  sceneTitleEn: { fontSize: 10, fontWeight: '500', textAlign: 'right', marginTop: 2 },
  sceneVisuals: { fontSize: 9, lineHeight: 13, marginTop: 4, textAlign: 'right' },
  sceneMusic: { fontSize: 9, marginTop: 3, textAlign: 'right' },
  sceneFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, gap: 4 },
  sceneFooterText: { fontSize: 8, fontWeight: '600' },
  styleBadge: { position: 'absolute', top: 8, right: 8, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  styleBadgeText: { fontSize: 8, fontWeight: '700' },
  addSceneCard: { width: 80, height: SCENE_CARD_W * 0.62, borderRadius: Radius.md, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.primary + '50', borderStyle: 'dashed', gap: 6 },
  addSceneText: { fontSize: 10, color: Colors.primary, fontWeight: '700', textAlign: 'center' },
  countBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: 6, borderTopWidth: 1, borderTopColor: Colors.surfaceBorder, gap: 10 },
  countBarText: { fontSize: 11, color: Colors.textMuted, fontWeight: '600', minWidth: 50 },
  countBarDots: { flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 2 },
  noSceneHint: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  noSceneHintText: { fontSize: 13, color: Colors.textLight },
  detailPanel: { flex: 1, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.surfaceBorder },
  detailHeader: { paddingVertical: 12, paddingHorizontal: Spacing.md, borderTopLeftRadius: 0, borderTopRightRadius: 0, position: 'relative', overflow: 'hidden' },
  detailTitle: { fontSize: 16, fontWeight: '800', textAlign: 'right', position: 'relative' },
  detailStyleLabel: { fontSize: 11, marginTop: 2, textAlign: 'right', position: 'relative' },
  detailBody: { flex: 1, padding: Spacing.md },
  detailSection: { marginBottom: 10, backgroundColor: Colors.background, borderRadius: Radius.sm, padding: 10, borderWidth: 1, borderColor: Colors.surfaceBorder },
  detailLabel: { fontSize: 11, color: Colors.primary, fontWeight: '700', textAlign: 'right', marginBottom: 3 },
  detailValue: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20, textAlign: 'right' },
  detailActions: { flexDirection: 'row', gap: 8, marginTop: 8 },
  detailBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, borderRadius: Radius.sm, gap: 4 },
  detailBtnText: { fontSize: 11, color: '#FFF', fontWeight: '700' },
  emptyBoard: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyBoardIcon: { fontSize: 64, marginBottom: 12 },
  emptyBoardTitle: { fontSize: 18, color: Colors.textPrimary, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  emptyBoardSub: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', marginBottom: 20 },
  emptyBoardBtns: { flexDirection: 'row', gap: 12 },
  emptyBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 10, borderRadius: Radius.pill, gap: 6, ...Shadows.sm },
  emptyBtnText: { fontSize: 13, color: '#FFF', fontWeight: '700' },

  // Scenes List
  sceneListContent: { padding: Spacing.md, gap: 10 },
  listSceneCard: { backgroundColor: Colors.surface, borderRadius: Radius.md, overflow: 'hidden', borderWidth: 1, borderColor: Colors.surfaceBorder, borderLeftWidth: 3, ...Shadows.sm },
  listSceneHeader: { padding: Spacing.md, position: 'relative', overflow: 'hidden' },
  listSceneHeaderInner: { flexDirection: 'row', alignItems: 'center', gap: 10, position: 'relative' },
  listSceneIcon: { fontSize: 22 },
  listSceneTitleUrdu: { fontSize: 15, fontWeight: '700', textAlign: 'right' },
  listSceneTitleEn: { fontSize: 10, fontWeight: '500', textAlign: 'right', marginTop: 1 },
  listNumBadge: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  listNumText: { fontSize: 11, color: '#000', fontWeight: '800' },
  listSceneDesc: { fontSize: 12, color: Colors.textSecondary, padding: Spacing.sm, paddingHorizontal: Spacing.md, textAlign: 'right', lineHeight: 18 },
  listSceneMusic: { fontSize: 11, color: Colors.accentBlue, paddingHorizontal: Spacing.md, paddingBottom: 4, textAlign: 'right' },
  listSceneFooter: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingBottom: Spacing.sm, gap: 8 },
  listStyleBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.sm, borderWidth: 1 },
  listStyleBadgeText: { fontSize: 9, fontWeight: '700' },
  listDuration: { fontSize: 10, color: Colors.textMuted },
  listSceneActions: { flexDirection: 'row', gap: 2, marginLeft: 'auto' as any },
  listBtn: { padding: 6 },

  // Styles Tab
  stylesContent: { padding: Spacing.md, gap: 10 },
  tabSectionTitle: { fontSize: 16, color: Colors.primary, fontWeight: '800', textAlign: 'right', marginBottom: 4 },
  tabSectionSubtitle: { fontSize: 12, color: Colors.textMuted, textAlign: 'right', marginBottom: 12 },
  styleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  styleCard: { width: (width - 32 - 10) / 2, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, overflow: 'hidden', position: 'relative', minHeight: 110 },
  styleCardSelected: { borderWidth: 2 },
  styleCardIcon: { fontSize: 24, marginBottom: 4, position: 'relative' },
  styleCardLabel: { fontSize: 14, fontWeight: '700', position: 'relative' },
  styleCardEn: { fontSize: 10, fontWeight: '500', position: 'relative', marginBottom: 4 },
  styleCardDesc: { fontSize: 9, lineHeight: 13, position: 'relative' },
  styleSelectedBadge: { position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  genreGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  genreCard: { width: (width - 32 - 16) / 3, borderRadius: Radius.md, padding: 10, alignItems: 'center', borderWidth: 1, position: 'relative', overflow: 'hidden' },
  genreIcon: { fontSize: 22, marginBottom: 4 },
  genreLabel: { fontSize: 12, fontWeight: '700' },
  genreStyleLabel: { fontSize: 9, fontWeight: '500', marginTop: 2 },

  // Templates Tab
  tplCard: { backgroundColor: Colors.surface, borderRadius: Radius.md, overflow: 'hidden', borderWidth: 1, borderColor: Colors.surfaceBorder, borderLeftWidth: 3, ...Shadows.sm },
  tplBanner: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, gap: 10, position: 'relative', overflow: 'hidden' },
  tplBannerIcon: { fontSize: 26, position: 'relative' },
  tplTitle: { fontSize: 15, fontWeight: '800', position: 'relative' },
  tplTitleEn: { fontSize: 10, position: 'relative', marginTop: 2 },
  tplStyleBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, marginLeft: 'auto' as any, position: 'relative' },
  tplStyleText: { fontSize: 9, fontWeight: '700' },
  tplBody: { padding: Spacing.md, gap: 8 },
  tplDesc: { fontSize: 12, color: Colors.textSecondary, textAlign: 'right', lineHeight: 18 },
  tplScenePills: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tplScenePill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.pill },
  tplScenePillText: { fontSize: 10, fontWeight: '600' },
  tplFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  tplScenesCount: { fontSize: 12, color: Colors.textMuted, fontWeight: '600' },
  tplApplyBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 7, borderRadius: Radius.pill, gap: 4 },
  tplApplyText: { fontSize: 12, color: '#000', fontWeight: '700' },

  // Smart Tab
  smartContent: { padding: Spacing.md, gap: 12 },
  smartHeader: { backgroundColor: Colors.primaryPale, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  smartTitle: { fontSize: 16, color: Colors.primary, fontWeight: '800', textAlign: 'right', marginBottom: 6 },
  smartSubtitle: { fontSize: 12, color: Colors.textSecondary, textAlign: 'right', lineHeight: 18 },
  smartLabel: { fontSize: 13, color: Colors.primary, fontWeight: '700', textAlign: 'right' },
  smartInput: { backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, color: Colors.textPrimary, fontSize: 13, borderWidth: 1, borderColor: Colors.surfaceBorder, textAlignVertical: 'top', minHeight: 180, lineHeight: 20 },
  parseBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: 14, gap: 10, ...Shadows.md },
  parseBtnText: { fontSize: 16, color: '#FFF', fontWeight: '700' },
  genreChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7, borderRadius: Radius.pill, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: 5, marginRight: 8 },
  genreChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  genreChipIcon: { fontSize: 14 },
  genreChipText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  genreChipTextActive: { color: '#FFF' },
  styleChip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: Radius.pill, borderWidth: 1, marginRight: 8, overflow: 'hidden' },
  styleChipText: { fontSize: 11, fontWeight: '600' },
  formatsCard: { backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: 10 },
  formatsTitle: { fontSize: 14, color: Colors.primary, fontWeight: '700', textAlign: 'right', marginBottom: 4 },
  formatRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  formatIcon: { fontSize: 18 },
  formatLabel: { fontSize: 13, color: Colors.textPrimary, fontWeight: '600', textAlign: 'right' },
  formatDesc: { fontSize: 11, color: Colors.textMuted, textAlign: 'right', lineHeight: 16 },
  tipsCard: { backgroundColor: Colors.accentBluePale, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.accentBlue + '40' },
  tipsTitle: { fontSize: 13, color: Colors.accentBlue, fontWeight: '700', textAlign: 'right', marginBottom: 8 },
  tipsText: { fontSize: 11, color: Colors.accentBlue, lineHeight: 20, textAlign: 'right' },

  // Edit Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  editModal: { backgroundColor: Colors.background, borderTopLeftRadius: Radius.xl, borderTopRightRadius: Radius.xl, maxHeight: height * 0.88 },
  editModalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.md, borderTopLeftRadius: Radius.xl, borderTopRightRadius: Radius.xl, overflow: 'hidden', position: 'relative' },
  editModalTitle: { fontSize: 16, fontWeight: '800', position: 'relative' },
  editModalClose: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  editModalBody: { padding: Spacing.md, gap: 10, paddingBottom: 40 },
  editLabel: { fontSize: 12, color: Colors.primary, fontWeight: '700', textAlign: 'right' },
  editInput: { backgroundColor: Colors.surface, borderRadius: Radius.sm, padding: 12, color: Colors.textPrimary, fontSize: 14, borderWidth: 1, borderColor: Colors.surfaceBorder },
  editStyleChip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: Radius.pill, borderWidth: 1, marginRight: 8, alignItems: 'center', overflow: 'hidden', gap: 3 },
  editStyleChipText: { fontSize: 9, fontWeight: '700' },
  saveEditBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: 14, gap: 8, marginTop: 8, ...Shadows.md },
  saveEditBtnText: { fontSize: 15, color: '#FFF', fontWeight: '700' },

  // Full Preview
  fullPreview: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, position: 'relative' },
  fpNumBadge: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: Radius.pill, marginBottom: 16, position: 'relative' },
  fpNumText: { fontSize: 13, color: '#000', fontWeight: '800' },
  fpIcon: { fontSize: 56, marginBottom: 16, textAlign: 'center', position: 'relative' },
  fpTitle: { fontSize: 28, fontWeight: '800', textAlign: 'center', lineHeight: 40, position: 'relative' },
  fpTitleEn: { fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: 6, marginBottom: 20, position: 'relative' },
  fpSeparator: { height: 2, width: 80, borderRadius: 1, marginBottom: 20, position: 'relative' },
  fpContent: { paddingBottom: 20, width: '100%' },
  fpSection: { marginBottom: 16, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: Radius.md, padding: Spacing.md },
  fpSectionLabel: { fontSize: 12, fontWeight: '700', textAlign: 'right', marginBottom: 4 },
  fpSectionText: { fontSize: 14, lineHeight: 22, textAlign: 'right' },
  fpFooter: { flexDirection: 'row', gap: 16, marginTop: 20, flexWrap: 'wrap', justifyContent: 'center', position: 'relative' },
  fpStyleLabel: { fontSize: 13, fontWeight: '700' },
  fpFooterText: { fontSize: 12 },
  fpCloseBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 10, borderRadius: Radius.pill, marginTop: 20, position: 'relative' },
  fpCloseBtnText: { fontSize: 14, fontWeight: '700' },
});
