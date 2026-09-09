// eVeR sMaRt UrDu sTuDiO - Effects Screen (Bright + Real Animation Preview)
import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, cancelAnimation, Easing } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/constants/theme';
import { TRANSITION_EFFECTS, ANIMATION_EFFECTS, DESIGN_EFFECTS, DIGITAL_EFFECTS } from '@/constants/effects';
import { useEditor } from '@/hooks/useEditor';

type EffectsTab = 'transition' | 'animation' | 'design' | 'digital';

const TABS: { id: EffectsTab; label: string; icon: string; count: number }[] = [
  { id: 'transition', label: 'ٹرانزیشن', icon: 'swap-horiz', count: TRANSITION_EFFECTS.length },
  { id: 'animation', label: 'انیمیشن', icon: 'animation', count: ANIMATION_EFFECTS.length },
  { id: 'design', label: 'ڈیزائن', icon: 'auto-fix-high', count: DESIGN_EFFECTS.length },
  { id: 'digital', label: 'ڈیجیٹل', icon: 'auto-awesome', count: DIGITAL_EFFECTS.length },
];

const ANIM_TYPE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  entrance: { label: 'داخلہ', color: Colors.accent, bg: Colors.accentPale },
  emphasis: { label: 'زور', color: Colors.primary, bg: Colors.primaryPale },
  exit: { label: 'خروج', color: Colors.accentRed, bg: '#FFEBEE' },
  loop: { label: 'چکر', color: Colors.accentPurple, bg: Colors.accentPurplePale },
};

export default function EffectsScreen() {
  const insets = useSafeAreaInsets();
  const { design, setTransitionEffect, setAnimationEffect } = useEditor();
  const [activeTab, setActiveTab] = useState<EffectsTab>('transition');
  const [previewingId, setPreviewingId] = useState<string | null>(null);

  // Reanimated shared values for preview
  const previewOpacity = useSharedValue(1);
  const previewScale = useSharedValue(1);
  const previewTranslateX = useSharedValue(0);
  const previewTranslateY = useSharedValue(0);
  const previewRotate = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({
    opacity: previewOpacity.value,
    transform: [
      { scale: previewScale.value },
      { translateX: previewTranslateX.value },
      { translateY: previewTranslateY.value },
      { rotate: `${previewRotate.value}deg` },
    ],
  }));

  const triggerPreview = (effectId: string, animType?: string) => {
    setPreviewingId(effectId);
    cancelAnimation(previewScale);
    cancelAnimation(previewOpacity);
    cancelAnimation(previewTranslateX);
    cancelAnimation(previewTranslateY);
    cancelAnimation(previewRotate);

    // Reset
    previewScale.value = 1;
    previewOpacity.value = 1;
    previewTranslateX.value = 0;
    previewTranslateY.value = 0;
    previewRotate.value = 0;

    const type = animType || 'fade';

    if (type === 'fade' || effectId.includes('tr1')) {
      previewOpacity.value = withSequence(
        withTiming(0, { duration: 300 }), withTiming(1, { duration: 400 })
      );
    } else if (type === 'slide') {
      previewTranslateX.value = withSequence(
        withTiming(80, { duration: 0 }), withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) })
      );
    } else if (type === 'zoom') {
      previewScale.value = withSequence(
        withTiming(0.5, { duration: 0 }), withTiming(1.05, { duration: 300 }), withTiming(1, { duration: 200 })
      );
    } else if (type === 'bounce' || type === 'emphasis') {
      previewScale.value = withSequence(
        withTiming(1.15, { duration: 200 }), withTiming(0.9, { duration: 150 }),
        withTiming(1.08, { duration: 150 }), withTiming(1, { duration: 150 })
      );
    } else if (type === 'rotate') {
      previewRotate.value = withSequence(
        withTiming(0, { duration: 0 }), withTiming(360, { duration: 700, easing: Easing.out(Easing.cubic) }),
      );
    } else if (type === 'loop') {
      if (effectId === 'an34' || effectId.includes('float')) {
        previewTranslateY.value = withRepeat(withSequence(
          withTiming(-10, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(10, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        ), 3, true);
      } else if (effectId === 'an35' || effectId.includes('glow')) {
        previewOpacity.value = withRepeat(withSequence(
          withTiming(0.3, { duration: 400 }), withTiming(1, { duration: 400 })
        ), 4, true);
      } else if (effectId === 'an14' || effectId.includes('pulse')) {
        previewScale.value = withRepeat(withSequence(
          withTiming(1.1, { duration: 400 }), withTiming(1, { duration: 400 })
        ), 4, true);
      } else {
        previewScale.value = withRepeat(withSequence(
          withTiming(1.05, { duration: 500 }), withTiming(1, { duration: 500 })
        ), 3, true);
      }
    } else {
      previewOpacity.value = withSequence(
        withTiming(0, { duration: 200 }), withTiming(1, { duration: 400 })
      );
    }

    setTimeout(() => {
      setPreviewingId(null);
      previewScale.value = withTiming(1, { duration: 200 });
      previewOpacity.value = withTiming(1, { duration: 200 });
      previewTranslateX.value = withTiming(0, { duration: 200 });
      previewTranslateY.value = withTiming(0, { duration: 200 });
      previewRotate.value = withTiming(0, { duration: 200 });
    }, 2800);
  };

  const total = TRANSITION_EFFECTS.length + ANIMATION_EFFECTS.length + DESIGN_EFFECTS.length + DIGITAL_EFFECTS.length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>✨ ایفیکٹس</Text>
        <View style={styles.headerCountBadge}>
          <Text style={styles.headerCountText}>{total}+</Text>
        </View>
      </View>

      {/* Animation Preview Canvas */}
      <View style={styles.previewBox}>
        <Animated.View style={[styles.previewContent, animStyle]}>
          <Text style={styles.previewArabic}>بِسْمِ اللّٰهِ</Text>
          <Text style={styles.previewUrdu}>ایفیکٹ پریویو</Text>
        </Animated.View>
        <Text style={styles.previewHint}>
          {previewingId ? '▶ چل رہا ہے...' : '▶ پریویو دیکھنے کیلئے ٹیپ کریں'}
        </Text>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow} contentContainerStyle={styles.tabsContent}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            <MaterialIcons name={tab.icon as any} size={16} color={activeTab === tab.id ? Colors.primary : Colors.textMuted} />
            <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>{tab.label}</Text>
            <View style={[styles.tabCount, activeTab === tab.id && styles.tabCountActive]}>
              <Text style={[styles.tabCountText, activeTab === tab.id && styles.tabCountTextActive]}>{tab.count}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Effects List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.effectsList, { paddingBottom: insets.bottom + 100 }]}>
        {activeTab === 'transition' && TRANSITION_EFFECTS.map((effect) => (
          <TouchableOpacity
            key={effect.id}
            style={[styles.effectCard, design.transitionEffect === effect.id && styles.effectCardActive]}
            onPress={() => { setTransitionEffect(effect.id); triggerPreview(effect.id, effect.type); }}
            activeOpacity={0.8}
          >
            <Text style={styles.effectEmoji}>{effect.icon}</Text>
            <View style={styles.effectDetails}>
              <Text style={styles.effectName}>{effect.nameUrdu}</Text>
              <View style={styles.effectMeta}>
                <View style={styles.categoryTag}><Text style={styles.categoryTagText}>{effect.category}</Text></View>
                <Text style={styles.durationText}>{effect.duration}ms</Text>
              </View>
            </View>
            <View style={styles.effectRight}>
              {design.transitionEffect === effect.id && <MaterialIcons name="check-circle" size={20} color={Colors.primary} />}
              <TouchableOpacity
                style={styles.previewBtn}
                onPress={() => triggerPreview(effect.id, effect.type)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                activeOpacity={0.7}
              >
                <MaterialIcons name="play-circle-outline" size={22} color={Colors.accent} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {activeTab === 'animation' && ANIMATION_EFFECTS.map((effect) => {
          const typeInfo = ANIM_TYPE_LABELS[effect.type] || ANIM_TYPE_LABELS.loop;
          return (
            <TouchableOpacity
              key={effect.id}
              style={[styles.effectCard, design.animationEffect === effect.id && styles.effectCardActive]}
              onPress={() => { setAnimationEffect(effect.id); triggerPreview(effect.id, effect.type); }}
              activeOpacity={0.8}
            >
              <Text style={styles.effectEmoji}>{effect.icon}</Text>
              <View style={styles.effectDetails}>
                <Text style={styles.effectName}>{effect.nameUrdu}</Text>
                <View style={styles.effectMeta}>
                  <View style={styles.categoryTag}><Text style={styles.categoryTagText}>{effect.category}</Text></View>
                  <View style={[styles.typeTag, { backgroundColor: typeInfo.bg }]}>
                    <Text style={[styles.typeTagText, { color: typeInfo.color }]}>{typeInfo.label}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.effectRight}>
                {design.animationEffect === effect.id && <MaterialIcons name="check-circle" size={20} color={Colors.primary} />}
                <TouchableOpacity
                  style={styles.previewBtn}
                  onPress={() => triggerPreview(effect.id, effect.type)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="play-circle-outline" size={22} color={Colors.accent} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        {activeTab === 'design' && DESIGN_EFFECTS.map((effect) => (
          <TouchableOpacity
            key={effect.id}
            style={[styles.effectCard, design.designEffect === effect.id && styles.effectCardActive]}
            activeOpacity={0.8}
          >
            <Text style={styles.effectEmoji}>{effect.icon}</Text>
            <View style={styles.effectDetails}>
              <Text style={styles.effectName}>{effect.nameUrdu}</Text>
              <View style={styles.effectMeta}>
                <View style={styles.categoryTag}><Text style={styles.categoryTagText}>{effect.category}</Text></View>
              </View>
            </View>
            {design.designEffect === effect.id && <MaterialIcons name="check-circle" size={20} color={Colors.primary} />}
          </TouchableOpacity>
        ))}

        {activeTab === 'digital' && (
          <>
            <View style={styles.sectionNote}>
              <MaterialIcons name="info-outline" size={14} color={Colors.accentBlue} />
              <Text style={styles.sectionNoteText}>ڈیجیٹل ایفیکٹس کینوس پر لائیو دکھائے جاتے ہیں</Text>
            </View>
            {DIGITAL_EFFECTS.map((effect) => (
              <TouchableOpacity
                key={effect.id}
                style={[styles.effectCard]}
                onPress={() => triggerPreview(effect.id, 'special')}
                activeOpacity={0.8}
              >
                <Text style={styles.effectEmoji}>{effect.icon}</Text>
                <View style={styles.effectDetails}>
                  <Text style={styles.effectName}>{effect.nameUrdu}</Text>
                  <View style={styles.effectMeta}>
                    <View style={styles.categoryTag}><Text style={styles.categoryTagText}>{effect.type}</Text></View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.previewBtn}
                  onPress={() => triggerPreview(effect.id, 'special')}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="play-circle-outline" size={22} color={Colors.accent} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, ...Shadows.sm },
  headerTitle: { fontSize: FontSize.xl, color: Colors.primary, fontWeight: '800' },
  headerCountBadge: { backgroundColor: Colors.primary, paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.pill },
  headerCountText: { fontSize: 13, color: '#FFFFFF', fontWeight: '800' },
  previewBox: { height: 130, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, position: 'relative', ...Shadows.sm },
  previewContent: { alignItems: 'center' },
  previewArabic: { fontSize: 28, color: Colors.primary, fontWeight: '800' },
  previewUrdu: { fontSize: 12, color: Colors.textMuted, marginTop: 4 },
  previewHint: { position: 'absolute', bottom: 8, right: 16, fontSize: 11, color: Colors.textLight, fontStyle: 'italic' },
  tabsRow: { backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, maxHeight: 54 },
  tabsContent: { paddingHorizontal: Spacing.md, paddingVertical: 8, gap: 8, flexDirection: 'row' },
  tab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 7, borderRadius: Radius.pill, backgroundColor: Colors.background, gap: 5, borderWidth: 1, borderColor: Colors.surfaceBorder },
  tabActive: { backgroundColor: Colors.primaryPale, borderColor: Colors.primary + '60' },
  tabText: { fontSize: 12, color: Colors.textMuted, fontWeight: '600' },
  tabTextActive: { color: Colors.primary },
  tabCount: { backgroundColor: Colors.background, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, borderWidth: 1, borderColor: Colors.surfaceBorder },
  tabCountActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabCountText: { fontSize: 10, color: Colors.textMuted, fontWeight: '700' },
  tabCountTextActive: { color: '#FFFFFF' },
  effectsList: { padding: Spacing.md, gap: 8 },
  effectCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: 12, ...Shadows.sm },
  effectCardActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryPale },
  effectEmoji: { fontSize: 22, width: 32, textAlign: 'center' },
  effectDetails: { flex: 1 },
  effectName: { fontSize: 14, color: Colors.textPrimary, fontWeight: '600', marginBottom: 5 },
  effectMeta: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  categoryTag: { backgroundColor: Colors.background, paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.sm, borderWidth: 1, borderColor: Colors.surfaceBorder },
  categoryTagText: { fontSize: 10, color: Colors.textSecondary, fontWeight: '500' },
  typeTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.sm },
  typeTagText: { fontSize: 10, fontWeight: '700' },
  durationText: { fontSize: 11, color: Colors.textMuted },
  effectRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  previewBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: Colors.accentPale, alignItems: 'center', justifyContent: 'center' },
  sectionNote: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.accentBluePale, padding: Spacing.sm, borderRadius: Radius.sm, gap: 8, marginBottom: Spacing.sm },
  sectionNoteText: { fontSize: 12, color: Colors.accentBlue, fontWeight: '500', flex: 1, textAlign: 'right' },
});
