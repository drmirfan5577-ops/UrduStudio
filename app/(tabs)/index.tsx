// eVeR sMaRt UrDu sTuDiO - Home Screen (Bright Luminous)
import React, { useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Dimensions, Animated, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/constants/theme';
import { URDU_FONTS, ARABIC_FONTS, ENGLISH_FONTS } from '@/constants/fonts';
import { ISLAMIC_TEMPLATES } from '@/constants/templates';
import { TRANSITION_EFFECTS, ANIMATION_EFFECTS } from '@/constants/effects';
import { BACKGROUNDS } from '@/constants/backgrounds';

const { width } = Dimensions.get('window');

const FEATURES = [
  { icon: 'font-download', titleUrdu: 'اردو فونٹس', count: `${URDU_FONTS.length}`, color: Colors.primary, desc: 'نستعلیق، نسخ، کوفی، خوشخطی', bg: Colors.primaryPale },
  { icon: 'translate', titleUrdu: 'عربی فونٹس', count: `${ARABIC_FONTS.length}`, color: Colors.accent, desc: 'عامری، شہرزاد، کوفی، دیوانی', bg: Colors.accentPale },
  { icon: 'text-fields', titleUrdu: 'انگریزی فونٹس', count: `${ENGLISH_FONTS.length}`, color: Colors.accentBlue, desc: 'سیرف، اسکرپٹ، ڈسپلے', bg: Colors.accentBluePale },
  { icon: 'swap-horiz', titleUrdu: 'ٹرانزیشن', count: '55+', color: Colors.accentRed, desc: 'فیڈ، سلائیڈ، زوم، فلپ', bg: '#FFEBEE' },
  { icon: 'animation', titleUrdu: 'انیمیشن', count: '55+', color: Colors.accentPurple, desc: 'پلس، فلوٹ، ٹائپ رائٹر', bg: Colors.accentPurplePale },
  { icon: 'collections', titleUrdu: 'اسلامی ٹیمپلیٹ', count: `${ISLAMIC_TEMPLATES.length}+`, color: Colors.accent, desc: 'بسم اللہ، عید، نعت، دعا', bg: Colors.accentPale },
  { icon: 'texture', titleUrdu: 'ٹیکسچر', count: `${BACKGROUNDS.length}+`, color: Colors.accentOrange, desc: 'جیومیٹرک، پھول، سنگ مرمر', bg: '#FFF3E0' },
  { icon: 'emoji-emotions', titleUrdu: 'سٹیکر', count: '63+', color: Colors.accentPink, desc: 'اسلامی، پھول، دل، شکلیں', bg: '#FCE4EC' },
  { icon: 'border_style', titleUrdu: 'بارڈر', count: '20+', color: Colors.accentTeal, desc: 'گولڈ، فلورل، جیومیٹرک', bg: '#E0F2F1' },
  { icon: 'auto-fix-high', titleUrdu: 'ڈیزائن ایفیکٹ', count: '15+', color: Colors.gold, desc: 'شیڈو، گلو، میٹالک', bg: Colors.primaryPale },
];

const QUICK_ACTIONS = [
  { icon: 'edit', label: 'ڈیزائن بنائیں', screen: '/editor', color: Colors.primary, bg: Colors.primaryPale },
  { icon: 'collections', label: 'ٹیمپلیٹ', screen: '/templates', color: Colors.accent, bg: Colors.accentPale },
  { icon: 'auto-awesome', label: 'ایفیکٹس', screen: '/effects', color: Colors.accentPurple, bg: Colors.accentPurplePale },
  { icon: 'photo-library', label: 'گیلری', screen: '/gallery', color: Colors.accentRed, bg: '#FFEBEE' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerBg = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: ['#FFF9F0', '#FFFFFF'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F0" />

      {/* Header */}
      <Animated.View style={[styles.header, { paddingTop: insets.top + 8, backgroundColor: headerBg }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.appNameTop}>eVeR sMaRt</Text>
            <Text style={styles.appNameBottom}>UrDu StUdIo</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.versionBadge}>
              <Text style={styles.versionText}>✦ v2.0</Text>
            </View>
          </View>
        </View>
        <Text style={styles.headerSubtitle}>خوبصورت اردو، عربی اور انگریزی ڈیزائن</Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={require('@/assets/images/hero_banner.jpg')}
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>✦ اسلامی ڈیزائن اسٹوڈیو ✦</Text>
            </View>
            <Text style={styles.heroArabic}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ</Text>
            <Text style={styles.heroUrdu}>پیشہ ورانہ ڈیزائن آپ کی مٹھی میں</Text>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => router.push('/editor')}
              activeOpacity={0.8}
            >
              <MaterialIcons name="edit" size={18} color="#FFFFFF" />
              <Text style={styles.heroButtonText}>ابھی ڈیزائن کریں</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ فوری رسائی</Text>
          <View style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickActionCard, { backgroundColor: action.bg, borderColor: action.color + '30' }]}
                onPress={() => router.push(action.screen as any)}
                activeOpacity={0.75}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                  <MaterialIcons name={action.icon as any} size={26} color={action.color} />
                </View>
                <Text style={[styles.quickActionLabel, { color: action.color }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { num: URDU_FONTS.length + ARABIC_FONTS.length + ENGLISH_FONTS.length, label: 'فونٹس', icon: '🔤' },
            { num: ISLAMIC_TEMPLATES.length, label: 'ٹیمپلیٹ', icon: '📋' },
            { num: TRANSITION_EFFECTS.length + ANIMATION_EFFECTS.length, label: 'ایفیکٹس', icon: '✨' },
            { num: BACKGROUNDS.length, label: 'ٹیکسچر', icon: '🎨' },
          ].map((stat, i) => (
            <React.Fragment key={i}>
              <View style={styles.statCard}>
                <Text style={styles.statEmoji}>{stat.icon}</Text>
                <Text style={styles.statNumber}>{stat.num}+</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
              {i < 3 && <View style={styles.statDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌟 تمام خصوصیات</Text>
          <View style={styles.featuresGrid}>
            {FEATURES.map((feature, index) => (
              <View key={index} style={[styles.featureCard, { backgroundColor: feature.bg, borderColor: feature.color + '25' }]}>
                <View style={[styles.featureIconBg, { backgroundColor: feature.color + '20' }]}>
                  <MaterialIcons name={feature.icon as any} size={22} color={feature.color} />
                </View>
                <View style={styles.featureInfo}>
                  <View style={styles.featureHeader}>
                    <Text style={[styles.featureTitle, { color: Colors.textPrimary }]}>{feature.titleUrdu}</Text>
                    <View style={[styles.featureCount, { backgroundColor: feature.color }]}>
                      <Text style={styles.featureCountText}>{feature.count}</Text>
                    </View>
                  </View>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Templates Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>🕌 مقبول ٹیمپلیٹس</Text>
            <TouchableOpacity onPress={() => router.push('/templates')} activeOpacity={0.7}>
              <Text style={styles.sectionMore}>مزید ←</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ISLAMIC_TEMPLATES.slice(0, 10).map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[styles.templatePreviewCard, { backgroundColor: template.bgColor, borderColor: template.borderColor + '50' }]}
                onPress={() => router.push('/templates')}
                activeOpacity={0.8}
              >
                <Text style={styles.templateDecoration}>{template.decoration}</Text>
                <Text style={[styles.templatePreviewText, { color: template.textColor }]} numberOfLines={2}>
                  {template.text}
                </Text>
                <View style={[styles.templateCategoryBadge, { backgroundColor: template.borderColor + '20' }]}>
                  <Text style={[styles.templateCategoryText, { color: template.borderColor }]}>{template.category}</Text>
                </View>
                <Text style={[styles.templateName, { color: template.textColor + 'CC' }]} numberOfLines={1}>{template.nameUrdu}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Font Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✍️ فونٹ نمونے</Text>
          <View style={styles.fontPreviewCard}>
            <View style={styles.fontPreviewHeader}>
              <MaterialIcons name="font-download" size={14} color={Colors.primary} />
              <Text style={styles.fontPreviewLabel}>اردو نستعلیق</Text>
            </View>
            <Text style={styles.fontPreviewUrdu}>اردو کا خوبصورت رسم الخط</Text>
          </View>
          <View style={[styles.fontPreviewCard, { marginTop: 8, backgroundColor: Colors.accentPale }]}>
            <View style={styles.fontPreviewHeader}>
              <MaterialIcons name="translate" size={14} color={Colors.accent} />
              <Text style={[styles.fontPreviewLabel, { color: Colors.accent }]}>عربی نسخ</Text>
            </View>
            <Text style={styles.fontPreviewArabic}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ</Text>
          </View>
          <View style={[styles.fontPreviewCard, { marginTop: 8, backgroundColor: Colors.accentBluePale }]}>
            <View style={styles.fontPreviewHeader}>
              <MaterialIcons name="text-fields" size={14} color={Colors.accentBlue} />
              <Text style={[styles.fontPreviewLabel, { color: Colors.accentBlue }]}>English Display</Text>
            </View>
            <Text style={styles.fontPreviewEnglish}>Beautiful Typography Design</Text>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfoCard}>
          <View style={styles.appInfoGoldBar} />
          <Text style={styles.appInfoTitle}>eVeR sMaRt UrDu StUdIo</Text>
          <Text style={styles.appInfoSubtitle}>پیشہ ورانہ اردو ڈیزائن ایپ</Text>
          <Text style={styles.appInfoText}>
            150+ فونٹس • 60+ ٹیمپلیٹس • 110+ ایفیکٹس • 50+ ٹیکسچر • سٹیکر • بارڈر • ایکسپورٹ
          </Text>
          <View style={styles.appInfoBadges}>
            {[
              { icon: 'offline-bolt', label: 'آف لائن', color: Colors.primary },
              { icon: 'android', label: 'اینڈرائیڈ', color: Colors.accent },
              { icon: 'share', label: 'شیئر', color: Colors.accentBlue },
            ].map((b, i) => (
              <View key={i} style={[styles.badge, { backgroundColor: b.color + '15', borderColor: b.color + '30' }]}>
                <MaterialIcons name={b.icon as any} size={12} color={b.color} />
                <Text style={[styles.badgeText, { color: b.color }]}>{b.label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.appInfoGoldBar} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
    ...Shadows.sm,
  },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  appNameTop: { fontSize: 12, color: Colors.textMuted, fontWeight: '600', letterSpacing: 3, textTransform: 'uppercase' },
  appNameBottom: { fontSize: 22, color: Colors.primary, fontWeight: '800', letterSpacing: 1 },
  headerRight: { alignItems: 'flex-end' },
  versionBadge: { backgroundColor: Colors.primaryPale, paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.pill, borderWidth: 1, borderColor: Colors.surfaceBorder },
  versionText: { fontSize: 11, color: Colors.primary, fontWeight: '700' },
  headerSubtitle: { fontSize: 12, color: Colors.textMuted, marginTop: 4, textAlign: 'right' },
  scrollContent: {},
  heroBanner: { margin: Spacing.md, borderRadius: Radius.lg, overflow: 'hidden', height: 220, ...Shadows.lg },
  heroImage: { position: 'absolute', width: '100%', height: '100%' },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(255,249,240,0.75)', padding: Spacing.md, justifyContent: 'center', alignItems: 'center' },
  heroBadge: { backgroundColor: Colors.primaryPale, paddingHorizontal: 14, paddingVertical: 4, borderRadius: Radius.pill, borderWidth: 1, borderColor: Colors.surfaceBorder, marginBottom: 10 },
  heroBadgeText: { fontSize: 11, color: Colors.primary, fontWeight: '700', letterSpacing: 1 },
  heroArabic: { fontSize: 17, color: Colors.primary, fontWeight: '700', textAlign: 'center', marginBottom: 6 },
  heroUrdu: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', marginBottom: 16 },
  heroButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, paddingHorizontal: 22, paddingVertical: 12, borderRadius: Radius.pill, gap: 8, ...Shadows.md },
  heroButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  section: { paddingHorizontal: Spacing.md, marginBottom: Spacing.lg },
  sectionTitle: { fontSize: FontSize.lg, color: Colors.textPrimary, fontWeight: '700', marginBottom: Spacing.md, textAlign: 'right' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  sectionMore: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  quickActionsGrid: { flexDirection: 'row', gap: Spacing.sm },
  quickActionCard: { flex: 1, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', borderWidth: 1, ...Shadows.sm },
  quickActionIcon: { width: 48, height: 48, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  quickActionLabel: { fontSize: 11, fontWeight: '700', textAlign: 'center' },
  statsRow: { flexDirection: 'row', marginHorizontal: Spacing.md, backgroundColor: Colors.surface, borderRadius: Radius.lg, marginBottom: Spacing.lg, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, ...Shadows.sm },
  statCard: { flex: 1, alignItems: 'center' },
  statEmoji: { fontSize: 18, marginBottom: 2 },
  statNumber: { fontSize: 20, color: Colors.primary, fontWeight: '800' },
  statLabel: { fontSize: 10, color: Colors.textMuted, marginTop: 2, textAlign: 'center' },
  statDivider: { width: 1, backgroundColor: Colors.surfaceBorder, marginVertical: 4 },
  featuresGrid: { gap: Spacing.sm },
  featureCard: { flexDirection: 'row', borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, alignItems: 'center', gap: Spacing.md, ...Shadows.sm },
  featureIconBg: { width: 42, height: 42, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center' },
  featureInfo: { flex: 1 },
  featureHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  featureTitle: { fontSize: 14, fontWeight: '600' },
  featureCount: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: Radius.pill },
  featureCountText: { fontSize: 11, color: '#FFFFFF', fontWeight: '700' },
  featureDesc: { fontSize: 11, color: Colors.textMuted },
  templatePreviewCard: { width: 130, marginRight: Spacing.sm, borderRadius: Radius.md, overflow: 'hidden', borderWidth: 1, padding: 10, alignItems: 'center', ...Shadows.sm },
  templateDecoration: { fontSize: 22, marginBottom: 6 },
  templatePreviewText: { fontSize: 11, textAlign: 'center', fontWeight: '600', lineHeight: 16, marginBottom: 6 },
  templateCategoryBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.sm, marginBottom: 4 },
  templateCategoryText: { fontSize: 9, fontWeight: '700' },
  templateName: { fontSize: 10, textAlign: 'center' },
  fontPreviewCard: { backgroundColor: Colors.primaryPale, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  fontPreviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  fontPreviewLabel: { fontSize: 11, color: Colors.primary, fontWeight: '600' },
  fontPreviewUrdu: { fontSize: 22, color: Colors.primary, textAlign: 'right', lineHeight: 38 },
  fontPreviewArabic: { fontSize: 18, color: Colors.accent, textAlign: 'right', lineHeight: 30 },
  fontPreviewEnglish: { fontSize: 18, color: Colors.accentBlue, textAlign: 'left', fontStyle: 'italic' },
  appInfoCard: { margin: Spacing.md, backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.lg, borderWidth: 1, borderColor: Colors.surfaceBorder, ...Shadows.md },
  appInfoGoldBar: { height: 2, backgroundColor: Colors.primary, borderRadius: 1, marginVertical: Spacing.sm },
  appInfoTitle: { fontSize: 16, color: Colors.primary, fontWeight: '800', textAlign: 'center', marginBottom: 4, letterSpacing: 1 },
  appInfoSubtitle: { fontSize: 12, color: Colors.textMuted, textAlign: 'center', marginBottom: Spacing.sm },
  appInfoText: { fontSize: 12, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: Spacing.md },
  appInfoBadges: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.sm },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: Radius.pill, gap: 4, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: '600' },
});
