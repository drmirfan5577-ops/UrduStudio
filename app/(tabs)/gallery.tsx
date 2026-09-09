// eVeR sMaRt UrDu sTuDiO - Gallery with Drafts, Media Player, Auto-Save
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  Dimensions, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/constants/theme';
import { useEditor } from '@/hooks/useEditor';
import { useAlert } from '@/template';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - Spacing.md * 2 - Spacing.sm) / 2;

type GalleryTab = 'saved' | 'drafts' | 'media';

const EXPORT_FORMATS = [
  { fmt: 'PNG', icon: '🖼️', desc: 'شفاف بیک گراؤنڈ' },
  { fmt: 'JPG', icon: '📷', desc: 'چھوٹا فائل' },
  { fmt: 'PDF', icon: '📄', desc: 'پرنٹ فارمیٹ' },
  { fmt: 'SVG', icon: '🎨', desc: 'ویکٹر' },
  { fmt: 'WEBP', icon: '🌐', desc: 'ویب' },
];

const SHARE_PLATFORMS = ['WhatsApp', 'Facebook', 'Instagram', 'Twitter', 'Email', 'Telegram'];

const SAMPLE_MEDIA = [
  { id: 'm1', name: 'Islamic Background', type: 'video', icon: '🎬', duration: '0:15' },
  { id: 'm2', name: 'Quran Recitation', type: 'audio', icon: '🎵', duration: '3:45' },
  { id: 'm3', name: 'Nasheed', type: 'audio', icon: '🎶', duration: '4:20' },
  { id: 'm4', name: 'Nature Video', type: 'video', icon: '🎥', duration: '0:30' },
  { id: 'm5', name: 'Gold Particles', type: 'video', icon: '🎞️', duration: '0:10' },
  { id: 'm6', name: 'Calligraphy Sound', type: 'audio', icon: '🎼', duration: '1:30' },
];

export default function GalleryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { showAlert } = useAlert();
  const { savedDesigns, draftDesigns, resetDesign, deleteDesign, deleteDraft, loadDesign } = useEditor();
  const [galleryTab, setGalleryTab] = useState<GalleryTab>('saved');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [playingMediaId, setPlayingMediaId] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleNewDesign = () => {
    showAlert('🎨 نیا ڈیزائن', 'ایڈیٹر کھولنا چاہتے ہیں؟', [
      { text: 'نیا ڈیزائن', onPress: () => { resetDesign(); router.push('/editor'); } },
      { text: 'منسوخ', style: 'cancel' },
    ]);
  };

  const handleExport = (index?: number) => {
    showAlert('📤 فارمیٹ منتخب', 'کس فارمیٹ میں ایکسپورٹ کریں؟',
      EXPORT_FORMATS.map(f => ({
        text: `${f.icon} ${f.fmt}`,
        onPress: () => showAlert('✅ ایکسپورٹ', `${f.fmt} کامیابی سے محفوظ ہوگیا`),
      })) as any
    );
  };

  const handleShare = () => {
    showAlert('📱 شیئر', 'پلیٹ فارم منتخب کریں',
      [...SHARE_PLATFORMS.map(p => ({
        text: p,
        onPress: () => showAlert('✅', `${p} پر شیئر ہوگیا`),
      })), { text: 'منسوخ', style: 'cancel' }] as any
    );
  };

  const handleRestoreDraft = (idx: number) => {
    loadDesign(draftDesigns[idx]);
    showAlert('✅ ڈرافٹ لوڈ', 'ڈرافٹ ایڈیٹر میں لوڈ ہوگیا', [
      { text: 'ایڈیٹر کھولیں', onPress: () => router.push('/editor') },
      { text: 'ٹھیک ہے', style: 'cancel' },
    ]);
  };

  const EmptyState = ({ tab }: { tab: GalleryTab }) => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>{tab === 'drafts' ? '📝' : tab === 'media' ? '🎬' : '🎨'}</Text>
      <Text style={styles.emptyTitle}>
        {tab === 'drafts' ? 'کوئی ڈرافٹ نہیں' : tab === 'media' ? 'کوئی میڈیا نہیں' : 'کوئی ڈیزائن نہیں'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {tab === 'drafts' ? 'ایڈیٹر میں ڈرافٹ محفوظ کریں'
          : tab === 'media' ? 'ویڈیو یا آڈیو فائل شامل کریں'
          : 'ایڈیٹر میں جا کر ڈیزائن بنائیں اور محفوظ کریں'}
      </Text>
      {tab !== 'media' && (
        <TouchableOpacity style={styles.emptyBtn} onPress={() => router.push('/editor')} activeOpacity={0.8}>
          <MaterialIcons name="edit" size={18} color="#FFF" />
          <Text style={styles.emptyBtnText}>ایڈیٹر کھولیں</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const designs = galleryTab === 'saved' ? savedDesigns : draftDesigns;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>🖼 گیلری</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIconBtn}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} activeOpacity={0.7}>
            <MaterialIcons name={viewMode === 'grid' ? 'view-list' : 'grid-view'} size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.newBtn} onPress={handleNewDesign} activeOpacity={0.7}>
            <MaterialIcons name="add" size={18} color="#FFF" />
            <Text style={styles.newBtnText}>نیا</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Gallery Tabs */}
      <View style={styles.galleryTabs}>
        {([
          { id: 'saved', label: 'محفوظ', icon: 'photo-library', count: savedDesigns.length },
          { id: 'drafts', label: 'ڈرافٹ', icon: 'drafts', count: draftDesigns.length },
          { id: 'media', label: 'میڈیا', icon: 'video-library', count: SAMPLE_MEDIA.length },
        ] as { id: GalleryTab; label: string; icon: string; count: number }[]).map(tab => (
          <TouchableOpacity key={tab.id}
            style={[styles.galleryTab, galleryTab === tab.id && styles.galleryTabActive]}
            onPress={() => setGalleryTab(tab.id)} activeOpacity={0.7}>
            <MaterialIcons name={tab.icon as any} size={16}
              color={galleryTab === tab.id ? Colors.primary : Colors.textMuted} />
            <Text style={[styles.galleryTabText, galleryTab === tab.id && styles.galleryTabTextActive]}>
              {tab.label}
            </Text>
            {tab.count > 0 && (
              <View style={[styles.tabCountBadge, galleryTab === tab.id && styles.tabCountBadgeActive]}>
                <Text style={[styles.tabCountText, galleryTab === tab.id && styles.tabCountTextActive]}>{tab.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Bar */}
      {galleryTab !== 'media' && (
        <View style={styles.statsBar}>
          <Text style={styles.statsText}>
            {galleryTab === 'saved' ? `${savedDesigns.length} ڈیزائن محفوظ` : `${draftDesigns.length} ڈرافٹس`}
          </Text>
          {designs.length > 0 && (
            <View style={styles.bulkBtns}>
              <TouchableOpacity style={styles.bulkBtn} onPress={handleShare} activeOpacity={0.7}>
                <MaterialIcons name="share" size={14} color={Colors.accentBlue} />
                <Text style={[styles.bulkBtnText, { color: Colors.accentBlue }]}>شیئر</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bulkBtn} onPress={() => handleExport()} activeOpacity={0.7}>
                <MaterialIcons name="file-download" size={14} color={Colors.accent} />
                <Text style={[styles.bulkBtnText, { color: Colors.accent }]}>ایکسپورٹ</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* SAVED & DRAFTS */}
      {galleryTab !== 'media' && (
        designs.length === 0 ? <EmptyState tab={galleryTab} /> : (
          <FlatList
            data={designs}
            numColumns={viewMode === 'grid' ? 2 : 1}
            key={viewMode + galleryTab}
            keyExtractor={(_, idx) => idx.toString()}
            contentContainerStyle={[styles.gridContainer, { paddingBottom: insets.bottom + 110 }]}
            columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : undefined}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return viewMode === 'grid' ? (
                <TouchableOpacity
                  style={styles.galleryCard}
                  onPress={() => {
                    if (galleryTab === 'drafts') handleRestoreDraft(index);
                    else router.push('/editor');
                  }}
                  activeOpacity={0.85}
                >
                  <View style={[styles.designPreview, { backgroundColor: item.backgroundColor }]}>
                    {item.backgroundGradient.length > 1 && (
                      <View style={[StyleSheet.absoluteFill, { backgroundColor: item.backgroundGradient[1], opacity: 0.3, top: '45%' }]} />
                    )}
                    {item.textLayers.slice(0, 2).map(layer => (
                      <Text key={layer.id} style={[styles.previewText, { color: layer.color, fontSize: Math.min(layer.fontSize * 0.25, 12) }]} numberOfLines={2}>
                        {layer.text}
                      </Text>
                    ))}
                    {(item.stickerLayers || []).slice(0, 3).map(sticker => (
                      <Text key={sticker.id} style={styles.previewSticker}>{sticker.emoji}</Text>
                    ))}
                    {galleryTab === 'drafts' && (
                      <View style={styles.draftBadge}><Text style={styles.draftBadgeText}>ڈرافٹ</Text></View>
                    )}
                  </View>
                  <View style={styles.cardInfo}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle} numberOfLines={1}>{item.title || `ڈیزائن ${index + 1}`}</Text>
                      <Text style={styles.cardMeta}>{item.textLayers.length} لئیر</Text>
                    </View>
                    <View style={styles.cardActions}>
                      <TouchableOpacity onPress={handleShare} activeOpacity={0.7}>
                        <MaterialIcons name="share" size={14} color={Colors.accentBlue} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleExport(index)} activeOpacity={0.7}>
                        <MaterialIcons name="file-download" size={14} color={Colors.accent} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        showAlert('🗑️', 'حذف کریں؟', [
                          { text: 'ہاں', style: 'destructive', onPress: () => galleryTab === 'drafts' ? deleteDraft(index) : deleteDesign(index) },
                          { text: 'نہیں', style: 'cancel' },
                        ]);
                      }} activeOpacity={0.7}>
                        <MaterialIcons name="delete-outline" size={14} color={Colors.accentRed} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.listCard}
                  onPress={() => galleryTab === 'drafts' ? handleRestoreDraft(index) : router.push('/editor')}
                  activeOpacity={0.85}
                >
                  <View style={[styles.listPreview, { backgroundColor: item.backgroundColor }]}>
                    {item.textLayers.slice(0, 1).map(layer => (
                      <Text key={layer.id} style={[styles.previewText, { color: layer.color, fontSize: 10 }]} numberOfLines={1}>
                        {layer.text}
                      </Text>
                    ))}
                  </View>
                  <View style={styles.listInfo}>
                    <Text style={styles.listTitle}>{item.title || `ڈیزائن ${index + 1}`}</Text>
                    <Text style={styles.listMeta}>{item.textLayers.length} لئیر • {item.canvasAspect}</Text>
                    {galleryTab === 'drafts' && <Text style={styles.draftLabel}>ڈرافٹ • ایڈٹ کریں</Text>}
                  </View>
                  <View style={styles.listActions}>
                    <TouchableOpacity onPress={handleShare} activeOpacity={0.7}>
                      <MaterialIcons name="share" size={18} color={Colors.accentBlue} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleExport(index)} activeOpacity={0.7}>
                      <MaterialIcons name="file-download" size={18} color={Colors.accent} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      showAlert('🗑️', 'حذف کریں؟', [
                        { text: 'ہاں', style: 'destructive', onPress: () => galleryTab === 'drafts' ? deleteDraft(index) : deleteDesign(index) },
                        { text: 'نہیں', style: 'cancel' },
                      ]);
                    }} activeOpacity={0.7}>
                      <MaterialIcons name="delete-outline" size={18} color={Colors.accentRed} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )
      )}

      {/* MEDIA TAB */}
      {galleryTab === 'media' && (
        <ScrollView contentContainerStyle={[styles.mediaContainer, { paddingBottom: insets.bottom + 120 }]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.mediaInfoCard}>
            <MaterialIcons name="info" size={16} color={Colors.accentBlue} />
            <Text style={styles.mediaInfoText}>
              ویڈیو اور آڈیو فائلز پریویو کریں، بیک گراؤنڈ میں لگائیں یا ایڈیٹر میں شامل کریں
            </Text>
          </View>

          {/* Upload Buttons */}
          <View style={styles.uploadRow}>
            <TouchableOpacity style={[styles.uploadBtn, { backgroundColor: Colors.accentBluePale }]}
              onPress={() => showAlert('📁 ویڈیو', 'ویڈیو فائل منتخب کریں')} activeOpacity={0.7}>
              <MaterialIcons name="video-call" size={22} color={Colors.accentBlue} />
              <Text style={[styles.uploadBtnText, { color: Colors.accentBlue }]}>ویڈیو شامل کریں</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.uploadBtn, { backgroundColor: Colors.accentPale }]}
              onPress={() => showAlert('🎵 آڈیو', 'آڈیو فائل منتخب کریں')} activeOpacity={0.7}>
              <MaterialIcons name="audio-file" size={22} color={Colors.accent} />
              <Text style={[styles.uploadBtnText, { color: Colors.accent }]}>آڈیو شامل کریں</Text>
            </TouchableOpacity>
          </View>

          {/* Media List */}
          <Text style={styles.mediaSectionTitle}>نمونہ میڈیا</Text>
          {SAMPLE_MEDIA.map(media => (
            <View key={media.id} style={[styles.mediaCard, playingMediaId === media.id && styles.mediaCardPlaying]}>
              <View style={styles.mediaIconBg}>
                <Text style={styles.mediaIcon}>{media.icon}</Text>
              </View>
              <View style={styles.mediaInfo}>
                <Text style={styles.mediaName}>{media.name}</Text>
                <View style={styles.mediaMetaRow}>
                  <View style={[styles.mediaTypeBadge, { backgroundColor: media.type === 'video' ? Colors.accentBluePale : Colors.accentPale }]}>
                    <Text style={[styles.mediaTypeText, { color: media.type === 'video' ? Colors.accentBlue : Colors.accent }]}>
                      {media.type === 'video' ? 'ویڈیو' : 'آڈیو'}
                    </Text>
                  </View>
                  <Text style={styles.mediaDuration}>{media.duration}</Text>
                </View>
              </View>
              <View style={styles.mediaActions}>
                <TouchableOpacity
                  style={[styles.playBtn, playingMediaId === media.id && styles.playBtnActive]}
                  onPress={() => setPlayingMediaId(playingMediaId === media.id ? null : media.id)}
                  activeOpacity={0.7}>
                  <MaterialIcons
                    name={playingMediaId === media.id ? 'pause-circle-filled' : 'play-circle-filled'}
                    size={28}
                    color={playingMediaId === media.id ? Colors.primary : Colors.textMuted}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addToDesignBtn}
                  onPress={() => showAlert('✅', `${media.name} ڈیزائن میں شامل کر دیا گیا`)}
                  activeOpacity={0.7}>
                  <MaterialIcons name="add-circle" size={20} color={Colors.accent} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Playing Indicator */}
          {playingMediaId && (
            <View style={styles.playingBar}>
              <View style={styles.playingWave}>
                {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                  <View key={i} style={[styles.playingWaveBar, { height: h * 4 }]} />
                ))}
              </View>
              <Text style={styles.playingText}>
                {SAMPLE_MEDIA.find(m => m.id === playingMediaId)?.name} چل رہا ہے...
              </Text>
              <TouchableOpacity onPress={() => setPlayingMediaId(null)} activeOpacity={0.7}>
                <MaterialIcons name="stop" size={20} color={Colors.accentRed} />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}

      {/* Bottom Action Bar */}
      {designs.length > 0 && galleryTab !== 'media' && (
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 80 }]}>
          <TouchableOpacity style={styles.bottomBtn} onPress={() => handleExport()} activeOpacity={0.7}>
            <MaterialIcons name="file-download" size={18} color={Colors.primary} />
            <Text style={styles.bottomBtnText}>ایکسپورٹ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBtn} onPress={handleShare} activeOpacity={0.7}>
            <MaterialIcons name="share" size={18} color={Colors.accentBlue} />
            <Text style={[styles.bottomBtnText, { color: Colors.accentBlue }]}>شیئر</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomBtn, styles.bottomBtnMain]} onPress={handleNewDesign} activeOpacity={0.7}>
            <MaterialIcons name="add" size={18} color="#FFF" />
            <Text style={[styles.bottomBtnText, { color: '#FFF' }]}>نیا ڈیزائن</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, ...Shadows.sm },
  headerTitle: { fontSize: FontSize.xl, color: Colors.primary, fontWeight: '800' },
  headerActions: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  headerIconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surfaceBorder },
  newBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, backgroundColor: Colors.primary, borderRadius: Radius.pill, gap: 4, ...Shadows.sm },
  newBtnText: { fontSize: 13, color: '#FFF', fontWeight: '700' },
  galleryTabs: { flexDirection: 'row', backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder },
  galleryTab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, gap: 5, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  galleryTabActive: { borderBottomColor: Colors.primary },
  galleryTabText: { fontSize: 12, color: Colors.textMuted, fontWeight: '600' },
  galleryTabTextActive: { color: Colors.primary },
  tabCountBadge: { backgroundColor: Colors.background, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 8, borderWidth: 1, borderColor: Colors.surfaceBorder },
  tabCountBadgeActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabCountText: { fontSize: 9, color: Colors.textMuted, fontWeight: '700' },
  tabCountTextActive: { color: '#FFF' },
  statsBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: 8, backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder },
  statsText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  bulkBtns: { flexDirection: 'row', gap: 8 },
  bulkBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, backgroundColor: Colors.background, borderRadius: Radius.sm, gap: 4, borderWidth: 1, borderColor: Colors.surfaceBorder },
  bulkBtnText: { fontSize: 11, fontWeight: '600' },
  gridContainer: { padding: Spacing.md },
  gridRow: { gap: Spacing.sm, marginBottom: Spacing.sm },
  galleryCard: { width: ITEM_SIZE, backgroundColor: Colors.surface, borderRadius: Radius.md, overflow: 'hidden', borderWidth: 1, borderColor: Colors.surfaceBorder, ...Shadows.sm },
  designPreview: { height: ITEM_SIZE * 0.85, alignItems: 'center', justifyContent: 'center', padding: 8, position: 'relative' },
  previewText: { textAlign: 'center', lineHeight: 18, fontWeight: '600', marginVertical: 2 },
  previewSticker: { fontSize: 16 },
  draftBadge: { position: 'absolute', top: 6, right: 6, backgroundColor: Colors.accentOrange + 'CC', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  draftBadgeText: { fontSize: 8, color: '#FFF', fontWeight: '700' },
  cardInfo: { padding: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },
  cardMeta: { fontSize: 9, color: Colors.textMuted },
  cardActions: { flexDirection: 'row', gap: 8 },
  listCard: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: Radius.md, overflow: 'hidden', borderWidth: 1, borderColor: Colors.surfaceBorder, marginBottom: Spacing.sm, ...Shadows.sm },
  listPreview: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center', padding: 6 },
  listInfo: { flex: 1, padding: Spacing.md, justifyContent: 'center' },
  listTitle: { fontSize: 14, color: Colors.textPrimary, fontWeight: '700', textAlign: 'right' },
  listMeta: { fontSize: 11, color: Colors.textMuted, marginTop: 3, textAlign: 'right' },
  draftLabel: { fontSize: 10, color: Colors.accentOrange, fontWeight: '600', marginTop: 3, textAlign: 'right' },
  listActions: { flexDirection: 'row', alignItems: 'center', paddingRight: Spacing.md, gap: 14 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyIcon: { fontSize: 72, marginBottom: Spacing.lg },
  emptyTitle: { fontSize: FontSize.xxl, color: Colors.textPrimary, fontWeight: '700', marginBottom: Spacing.sm, textAlign: 'center' },
  emptySubtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xl },
  emptyBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, paddingHorizontal: 28, paddingVertical: 14, borderRadius: Radius.pill, gap: 8, ...Shadows.md },
  emptyBtnText: { fontSize: 15, color: '#FFF', fontWeight: '700' },
  mediaContainer: { padding: Spacing.md, gap: 10 },
  mediaInfoCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: Colors.accentBluePale, borderRadius: Radius.md, padding: Spacing.md, gap: 8, borderWidth: 1, borderColor: Colors.accentBlue + '40' },
  mediaInfoText: { flex: 1, fontSize: 12, color: Colors.accentBlue, lineHeight: 18, textAlign: 'right' },
  uploadRow: { flexDirection: 'row', gap: 10 },
  uploadBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: Spacing.md, borderRadius: Radius.md, gap: 8, borderWidth: 1, borderColor: Colors.surfaceBorder },
  uploadBtnText: { fontSize: 13, fontWeight: '700' },
  mediaSectionTitle: { fontSize: 14, color: Colors.textPrimary, fontWeight: '700', textAlign: 'right', marginTop: 8 },
  mediaCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: Spacing.md, ...Shadows.sm },
  mediaCardPlaying: { borderColor: Colors.primary, backgroundColor: Colors.primaryPale },
  mediaIconBg: { width: 48, height: 48, borderRadius: Radius.md, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surfaceBorder },
  mediaIcon: { fontSize: 24 },
  mediaInfo: { flex: 1 },
  mediaName: { fontSize: 13, color: Colors.textPrimary, fontWeight: '600', textAlign: 'right' },
  mediaMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4, justifyContent: 'flex-end' },
  mediaTypeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  mediaTypeText: { fontSize: 10, fontWeight: '700' },
  mediaDuration: { fontSize: 11, color: Colors.textMuted },
  mediaActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  playBtn: { padding: 2 },
  playBtnActive: {},
  addToDesignBtn: { padding: 2 },
  playingBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primaryPale, borderRadius: Radius.md, padding: Spacing.md, gap: 10, borderWidth: 1, borderColor: Colors.surfaceBorder, marginTop: 8 },
  playingWave: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  playingWaveBar: { width: 3, backgroundColor: Colors.primary, borderRadius: 2 },
  playingText: { flex: 1, fontSize: 12, color: Colors.primary, fontWeight: '600', textAlign: 'right' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: Colors.surface, paddingTop: 10, paddingHorizontal: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.surfaceBorder, gap: Spacing.sm, ...Shadows.md },
  bottomBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: Radius.md, backgroundColor: Colors.background, gap: 6, borderWidth: 1, borderColor: Colors.surfaceBorder },
  bottomBtnMain: { backgroundColor: Colors.primary, flex: 1.5, borderColor: Colors.primary },
  bottomBtnText: { fontSize: 13, color: Colors.primary, fontWeight: '700' },
});
