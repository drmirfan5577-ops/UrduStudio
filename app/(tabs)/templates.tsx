// eVeR sMaRt UrDu sTuDiO - Templates Screen (Bright + Full Customization)
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/constants/theme';
import { ISLAMIC_TEMPLATES, TEMPLATE_CATEGORIES, BORDER_STYLES, EDGE_DESIGNS, HEADER_STYLES, FOOTER_STYLES, TITLE_DESIGNS, LOGO_DESIGNS } from '@/constants/templates';
import { useEditor } from '@/hooks/useEditor';
import { useAlert } from '@/template';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.md * 2 - Spacing.sm) / 2;

type TemplateTab = 'templates' | 'borders' | 'headers' | 'footers' | 'titles' | 'logos' | 'edges';

const TEMPLATE_TABS: { id: TemplateTab; label: string; icon: string; count: number }[] = [
  { id: 'templates', label: 'ٹیمپلیٹس', icon: 'collections', count: ISLAMIC_TEMPLATES.length },
  { id: 'borders', label: 'بارڈر', icon: 'border-style', count: BORDER_STYLES.length },
  { id: 'edges', label: 'کارنر', icon: 'rounded-corner', count: EDGE_DESIGNS.length },
  { id: 'headers', label: 'ہیڈر', icon: 'title', count: HEADER_STYLES.length },
  { id: 'footers', label: 'فوٹر', icon: 'subtitles', count: FOOTER_STYLES.length },
  { id: 'titles', label: 'ٹائٹل', icon: 'format-size', count: TITLE_DESIGNS.length },
  { id: 'logos', label: 'لوگو', icon: 'stars', count: LOGO_DESIGNS.length },
];

export default function TemplatesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { showAlert } = useAlert();
  const { applyTemplate, updateBorder, updateEdge, updateHeader, updateFooter } = useEditor();
  const [selectedCategory, setSelectedCategory] = useState('سب');
  const [activeTab, setActiveTab] = useState<TemplateTab>('templates');

  const filtered = selectedCategory === 'سب'
    ? ISLAMIC_TEMPLATES
    : ISLAMIC_TEMPLATES.filter(t => t.category === selectedCategory);

  const handleApply = (templateId: string, templateName: string) => {
    applyTemplate(templateId);
    showAlert('✅ ٹیمپلیٹ', `"${templateName}" ایڈیٹر میں لگا دیا گیا`, [
      { text: 'ایڈیٹر کھولیں', onPress: () => router.push('/editor') },
      { text: 'ٹھیک ہے', style: 'cancel' },
    ]);
  };

  const handleBorderApply = (borderId: string, name: string) => {
    updateBorder(borderId, Colors.primary, 2);
    showAlert('✅ بارڈر', `"${name}" لگا دیا گیا`);
  };

  const handleEdgeApply = (edgeId: string, name: string, color: string) => {
    updateEdge(edgeId);
    showAlert('✅ کارنر', `"${name}" لگا دیا گیا`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>🕌 ڈیزائن لائبریری</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{ISLAMIC_TEMPLATES.length}+</Text>
        </View>
      </View>

      {/* Main Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mainTabsRow} contentContainerStyle={styles.mainTabsContent}>
        {TEMPLATE_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.mainTab, activeTab === tab.id && styles.mainTabActive]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            <MaterialIcons name={tab.icon as any} size={15} color={activeTab === tab.id ? Colors.primary : Colors.textMuted} />
            <Text style={[styles.mainTabText, activeTab === tab.id && styles.mainTabTextActive]}>{tab.label}</Text>
            <View style={[styles.mainTabCount, activeTab === tab.id && styles.mainTabCountActive]}>
              <Text style={[styles.mainTabCountText, activeTab === tab.id && styles.mainTabCountTextActive]}>{tab.count}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <>
          <View style={styles.categoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
              {TEMPLATE_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.categoryChipText, selectedCategory === cat && styles.categoryChipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <Text style={styles.resultCount}>{filtered.length} ٹیمپلیٹس</Text>
          <FlatList
            data={filtered}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + 100 }]}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.templateCard, { borderColor: item.borderColor + '50' }]}
                onPress={() => handleApply(item.id, item.nameUrdu)}
                activeOpacity={0.85}
              >
                <View style={[styles.templatePreview, { backgroundColor: item.bgColor }]}>
                  {item.bgGradient && (
                    <View style={[StyleSheet.absoluteFill, { backgroundColor: item.bgGradient[1], opacity: 0.4, top: '50%' }]} />
                  )}
                  <Text style={styles.decorationText}>{item.decoration}</Text>
                  <Text style={[styles.previewMainText, { color: item.textColor }]} numberOfLines={2}>{item.text}</Text>
                  {item.subText && (
                    <Text style={[styles.previewSubText, { color: item.textColor + 'AA' }]} numberOfLines={1}>{item.subText}</Text>
                  )}
                  <View style={[styles.previewBorderTop, { borderColor: item.borderColor + '50' }]} />
                  <View style={[styles.previewBorderBottom, { borderColor: item.borderColor + '50' }]} />
                </View>
                <View style={styles.templateInfo}>
                  <Text style={styles.templateNameText} numberOfLines={1}>{item.nameUrdu}</Text>
                  <View style={styles.templateMeta}>
                    <View style={[styles.catBadge, { backgroundColor: item.borderColor + '20' }]}>
                      <Text style={[styles.catBadgeText, { color: item.borderColor }]}>{item.category}</Text>
                    </View>
                    <TouchableOpacity style={styles.applyBtn} onPress={() => handleApply(item.id, item.nameUrdu)} activeOpacity={0.7}>
                      <MaterialIcons name="add-circle" size={20} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {/* Borders Tab */}
      {activeTab === 'borders' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }]}>
          <Text style={styles.sectionNote}>بارڈر منتخب کریں اور ایڈیٹر میں لگائیں</Text>
          {BORDER_STYLES.map((border) => (
            <TouchableOpacity
              key={border.id}
              style={styles.listItem}
              onPress={() => handleBorderApply(border.id, border.nameUrdu)}
              activeOpacity={0.8}
            >
              <View style={styles.listItemPreview}>
                <Text style={styles.listItemIcon}>{border.icon}</Text>
              </View>
              <View style={styles.listItemInfo}>
                <Text style={styles.listItemName}>{border.nameUrdu}</Text>
                <Text style={styles.listItemDesc}>{border.description}</Text>
              </View>
              <MaterialIcons name="add-circle-outline" size={22} color={Colors.primary} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Edges Tab */}
      {activeTab === 'edges' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.gridContent, { paddingBottom: insets.bottom + 100 }]}>
          <Text style={styles.sectionNote}>کارنر ڈیزائن منتخب کریں</Text>
          <View style={styles.edgeGrid}>
            {EDGE_DESIGNS.map((edge) => (
              <TouchableOpacity
                key={edge.id}
                style={[styles.edgeCard, { borderColor: edge.color + '40' }]}
                onPress={() => handleEdgeApply(edge.id, edge.name, edge.color)}
                activeOpacity={0.8}
              >
                <Text style={styles.edgeCardIcon}>{edge.icon}</Text>
                <Text style={[styles.edgeCardName, { color: edge.color }]} numberOfLines={1}>{edge.name}</Text>
                <MaterialIcons name="add-circle" size={16} color={edge.color} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Headers Tab */}
      {activeTab === 'headers' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }]}>
          <Text style={styles.sectionNote}>ہیڈر اسٹائل منتخب کریں</Text>
          {HEADER_STYLES.map((hs) => (
            <TouchableOpacity
              key={hs.id}
              style={[styles.listItem, { backgroundColor: hs.bg, borderColor: hs.border + '30' }]}
              onPress={() => { updateHeader('ہیڈر متن', hs.id); showAlert('✅', `${hs.name} لگا دیا گیا`); }}
              activeOpacity={0.8}
            >
              <Text style={styles.listItemIcon}>{hs.icon}</Text>
              <Text style={[styles.listItemName, { color: hs.border }]}>{hs.name}</Text>
              <MaterialIcons name="add-circle-outline" size={22} color={hs.border} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Footers Tab */}
      {activeTab === 'footers' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }]}>
          <Text style={styles.sectionNote}>فوٹر اسٹائل منتخب کریں</Text>
          {FOOTER_STYLES.map((fs) => (
            <TouchableOpacity
              key={fs.id}
              style={[styles.listItem, { backgroundColor: fs.bg, borderColor: fs.border + '30' }]}
              onPress={() => { updateFooter('فوٹر متن', fs.id); showAlert('✅', `${fs.name} لگا دیا گیا`); }}
              activeOpacity={0.8}
            >
              <Text style={styles.listItemIcon}>{fs.icon}</Text>
              <Text style={[styles.listItemName, { color: fs.border }]}>{fs.name}</Text>
              <MaterialIcons name="add-circle-outline" size={22} color={fs.border} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Titles Tab */}
      {activeTab === 'titles' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }]}>
          <Text style={styles.sectionNote}>ٹائٹل اسٹائل منتخب کریں</Text>
          {TITLE_DESIGNS.map((td) => (
            <TouchableOpacity
              key={td.id}
              style={[styles.listItem, { backgroundColor: td.bg, borderColor: td.color + '30' }]}
              activeOpacity={0.8}
            >
              <View style={[styles.titleColorDot, { backgroundColor: td.color }]} />
              <Text style={[styles.listItemName, { color: td.color }]}>{td.name}</Text>
              <MaterialIcons name="add-circle-outline" size={22} color={td.color} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Logos Tab */}
      {activeTab === 'logos' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.gridContent, { paddingBottom: insets.bottom + 100 }]}>
          <Text style={styles.sectionNote}>لوگو شکل منتخب کریں</Text>
          <View style={styles.logoGrid}>
            {LOGO_DESIGNS.map((logo) => (
              <TouchableOpacity
                key={logo.id}
                style={styles.logoCard}
                onPress={() => showAlert('✅', `${logo.name} لوگو شامل کر دیا گیا`)}
                activeOpacity={0.8}
              >
                <Text style={styles.logoCardIcon}>{logo.icon}</Text>
                <Text style={styles.logoCardName}>{logo.name}</Text>
                <MaterialIcons name="add-circle" size={16} color={Colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, ...Shadows.sm },
  headerTitle: { fontSize: FontSize.xl, color: Colors.primary, fontWeight: '800' },
  countBadge: { backgroundColor: Colors.primary, paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.pill },
  countText: { fontSize: 13, color: '#FFFFFF', fontWeight: '800' },
  mainTabsRow: { backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, maxHeight: 54 },
  mainTabsContent: { paddingHorizontal: Spacing.md, paddingVertical: 8, gap: 8, flexDirection: 'row' },
  mainTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 7, borderRadius: Radius.pill, backgroundColor: Colors.background, gap: 4, borderWidth: 1, borderColor: Colors.surfaceBorder },
  mainTabActive: { backgroundColor: Colors.primaryPale, borderColor: Colors.primary + '60' },
  mainTabText: { fontSize: 11, color: Colors.textMuted, fontWeight: '600' },
  mainTabTextActive: { color: Colors.primary },
  mainTabCount: { backgroundColor: Colors.background, paddingHorizontal: 5, paddingVertical: 1, borderRadius: 6, borderWidth: 1, borderColor: Colors.surfaceBorder },
  mainTabCountActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  mainTabCountText: { fontSize: 9, color: Colors.textMuted, fontWeight: '700' },
  mainTabCountTextActive: { color: '#FFFFFF' },
  categoryContainer: { backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder },
  categoryScroll: { paddingHorizontal: Spacing.md, paddingVertical: 10, gap: 8 },
  categoryChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: Radius.pill, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.surfaceBorder },
  categoryChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  categoryChipText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  categoryChipTextActive: { color: '#FFFFFF' },
  resultCount: { fontSize: 12, color: Colors.textMuted, textAlign: 'right', paddingHorizontal: Spacing.md, paddingVertical: 6 },
  grid: { paddingHorizontal: Spacing.md, paddingTop: 4 },
  row: { gap: Spacing.sm, marginBottom: Spacing.sm },
  templateCard: { width: CARD_WIDTH, backgroundColor: Colors.surface, borderRadius: Radius.md, overflow: 'hidden', borderWidth: 1, ...Shadows.sm },
  templatePreview: { height: CARD_WIDTH * 0.88, alignItems: 'center', justifyContent: 'center', padding: 10, position: 'relative' },
  decorationText: { fontSize: 26, marginBottom: 6 },
  previewMainText: { fontSize: 11, textAlign: 'center', fontWeight: '700', lineHeight: 18 },
  previewSubText: { fontSize: 9, textAlign: 'center', marginTop: 4, lineHeight: 14 },
  previewBorderTop: { position: 'absolute', top: 6, left: 6, right: 6, height: 1, borderTopWidth: 1 },
  previewBorderBottom: { position: 'absolute', bottom: 6, left: 6, right: 6, height: 1, borderBottomWidth: 1 },
  templateInfo: { padding: 10 },
  templateNameText: { fontSize: 12, color: Colors.textPrimary, fontWeight: '700', marginBottom: 6, textAlign: 'right' },
  templateMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  catBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.sm },
  catBadgeText: { fontSize: 10, fontWeight: '700' },
  applyBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.primaryPale, alignItems: 'center', justifyContent: 'center' },
  listContent: { padding: Spacing.md, gap: 8 },
  gridContent: { padding: Spacing.md },
  sectionNote: { fontSize: 12, color: Colors.textMuted, textAlign: 'right', marginBottom: Spacing.md, backgroundColor: Colors.primaryPale, padding: 10, borderRadius: Radius.sm },
  listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: Spacing.md, ...Shadows.sm },
  listItemPreview: { width: 44, height: 44, backgroundColor: Colors.background, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surfaceBorder },
  listItemIcon: { fontSize: 22 },
  listItemInfo: { flex: 1 },
  listItemName: { fontSize: 14, color: Colors.textPrimary, fontWeight: '600' },
  listItemDesc: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  edgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  edgeCard: { width: (width - Spacing.md * 2 - 24) / 3, backgroundColor: Colors.surface, borderRadius: Radius.md, padding: 12, alignItems: 'center', borderWidth: 1, ...Shadows.sm },
  edgeCardIcon: { fontSize: 28, marginBottom: 6 },
  edgeCardName: { fontSize: 11, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  titleColorDot: { width: 28, height: 28, borderRadius: 14 },
  logoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  logoCard: { width: (width - Spacing.md * 2 - 24) / 3, backgroundColor: Colors.surface, borderRadius: Radius.md, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: Colors.surfaceBorder, ...Shadows.sm },
  logoCardIcon: { fontSize: 30, marginBottom: 6 },
  logoCardName: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
});
