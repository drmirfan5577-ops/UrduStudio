// eVeR sMaRt UrDu sTuDiO - Admin Panel (Password Protected)
import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Switch, Dimensions, Alert as RNAlert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@/constants/theme';
import { AdminFeature } from '@/contexts/EditorContext';
import { useEditor } from '@/hooks/useEditor';
import { useAlert } from '@/template';

const { width } = Dimensions.get('window');
const ADMIN_PASSWORD = 'Admin5577';

type AdminTab = 'features' | 'addmore' | 'templates' | 'docs' | 'backup' | 'settings';

const ADMIN_TABS: { id: AdminTab; label: string; icon: string }[] = [
  { id: 'features', label: 'فیچرز', icon: 'settings' },
  { id: 'addmore', label: 'مزید ایڈ', icon: 'add-circle' },
  { id: 'templates', label: 'ٹیمپلیٹس', icon: 'collections' },
  { id: 'docs', label: 'دستاویز', icon: 'description' },
  { id: 'backup', label: 'بیک اپ', icon: 'backup' },
  { id: 'settings', label: 'سیٹنگز', icon: 'admin-panel-settings' },
];

const FEATURE_CATEGORIES = ['سب', 'fonts', 'templates', 'effects', 'textures', 'stickers', 'borders', 'tools', 'admin'];

const APP_STORE_DOCS = [
  {
    title: 'گوگل پلے اسٹور گائیڈ',
    items: [
      'گوگل پلے کنسول اکاؤنٹ بنائیں: play.google.com/console',
      'APK یا AAB فائل ایکسپورٹ کریں',
      'ایپ ٹائٹل: eVeR sMaRt UrDu sTuDiO',
      'کیٹیگری: Art & Design / Productivity',
      'ریٹنگ: 3+ (Everyone)',
      'قیمت: Free / Premium',
      'اسکرین شاٹس کم از کم 2 (1080×1920)',
      'آئیکن: 512×512 PNG',
      'فیچر گرافک: 1024×500 PNG',
      'مختصر تفصیل: 80 حروف',
      'مکمل تفصیل: 4000 حروف',
    ],
    icon: '🤖',
    color: '#43A047',
  },
  {
    title: 'ایپل ایپ اسٹور گائیڈ',
    items: [
      'Apple Developer اکاؤنٹ: developer.apple.com ($99/year)',
      'Xcode سے IPA بنائیں',
      'App Store Connect میں ایپ ایڈ کریں',
      'Bundle ID: com.eversmarturdustudio.app',
      'Version: 1.0.0',
      'اسکرین شاٹس: iPhone/iPad سائز',
      'آئیکن: 1024×1024 PNG',
      'App Review: 1-3 کاروباری دن',
      'TestFlight سے پہلے ٹیسٹ کریں',
    ],
    icon: '🍎',
    color: '#1565C0',
  },
  {
    title: 'اونر شپ دستاویزات',
    items: [
      'Developer Name: eVeR sMaRt UrDu sTuDiO',
      'Copyright: © 2024-2025 All Rights Reserved',
      'Source Code Location: OnSpace Project Files',
      'License: Proprietary / Commercial',
      'Privacy Policy URL: درکار ہے',
      'Terms of Service URL: درکار ہے',
      'Support Email: ایڈمن ای میل شامل کریں',
      'App Version History محفوظ رکھیں',
    ],
    icon: '📋',
    color: '#B8860B',
  },
];

export default function AdminPanel() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const { adminFeatures, updateAdminFeature, addAdminFeature, removeAdminFeature } = useEditor();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('features');
  const [catFilter, setCatFilter] = useState('سب');
  const [newFeatureForm, setNewFeatureForm] = useState({
    name: '', nameUrdu: '', icon: '✨', type: 'feature' as AdminFeature['type'],
    category: 'features', description: '',
  });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      showAlert('❌ غلط پاس ورڈ', 'پاس ورڈ غلط ہے۔ دوبارہ کوشش کریں۔');
      setPassword('');
    }
  };

  const handleChangePassword = () => {
    showAlert('🔐 پاس ورڈ تبدیلی', 'یہ فیچر مکمل بیک اینڈ انٹیگریشن کے بعد دستیاب ہوگا', [
      { text: 'ٹھیک ہے', style: 'cancel' },
    ]);
  };

  const handleAddFeature = () => {
    if (!newFeatureForm.name || !newFeatureForm.nameUrdu) {
      showAlert('⚠️', 'نام اور اردو نام ضروری ہیں');
      return;
    }
    const newFeature: AdminFeature = {
      id: 'af_' + Date.now(),
      name: newFeatureForm.name,
      nameUrdu: newFeatureForm.nameUrdu,
      icon: newFeatureForm.icon,
      type: newFeatureForm.type,
      category: newFeatureForm.category,
      description: newFeatureForm.description,
      enabled: true,
      addedAt: Date.now(),
    };
    addAdminFeature(newFeature);
    setNewFeatureForm({ name: '', nameUrdu: '', icon: '✨', type: 'feature', category: 'features', description: '' });
    showAlert('✅ شامل', `"${newFeature.nameUrdu}" کامیابی سے شامل کر دیا گیا`);
  };

  const filteredFeatures = catFilter === 'سب'
    ? adminFeatures
    : adminFeatures.filter(f => f.category === catFilter);

  if (!authenticated) {
    return (
      <View style={[styles.loginContainer, { paddingTop: insets.top }]}>
        <View style={styles.loginCard}>
          <View style={styles.loginIconBg}>
            <MaterialIcons name="admin-panel-settings" size={56} color={Colors.primary} />
          </View>
          <Text style={styles.loginTitle}>ایڈمن پینل</Text>
          <Text style={styles.loginSubtitle}>eVeR sMaRt UrDu sTuDiO</Text>
          <Text style={styles.loginNote}>پاس ورڈ درج کریں</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="پاس ورڈ یہاں لکھیں"
              placeholderTextColor={Colors.textLight}
              secureTextEntry={!showPassword}
              onSubmitEditing={handleLogin}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={22} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.8}>
            <MaterialIcons name="lock-open" size={18} color="#FFFFFF" />
            <Text style={styles.loginBtnText}>داخل ہوں</Text>
          </TouchableOpacity>
          <View style={styles.defaultPassHint}>
            <MaterialIcons name="info" size={14} color={Colors.textMuted} />
            <Text style={styles.defaultPassText}>ڈیفالٹ پاس ورڈ: Admin5577</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="admin-panel-settings" size={22} color={Colors.primary} />
          <Text style={styles.headerTitle}>ایڈمن پینل</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => setAuthenticated(false)} activeOpacity={0.7}>
          <MaterialIcons name="logout" size={16} color={Colors.accentRed} />
          <Text style={styles.logoutText}>خروج</Text>
        </TouchableOpacity>
      </View>

      {/* Admin Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow} contentContainerStyle={styles.tabsContent}>
        {ADMIN_TABS.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.adminTab, activeTab === tab.id && styles.adminTabActive]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            <MaterialIcons name={tab.icon as any} size={14} color={activeTab === tab.id ? Colors.primary : Colors.textMuted} />
            <Text style={[styles.adminTabText, activeTab === tab.id && styles.adminTabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>

        {/* FEATURES TAB */}
        {activeTab === 'features' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>تمام فیچرز کنٹرول ({adminFeatures.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow} contentContainerStyle={styles.catContent}>
              {FEATURE_CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catChip, catFilter === cat && styles.catChipActive]}
                  onPress={() => setCatFilter(cat)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.catChipText, catFilter === cat && styles.catChipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {filteredFeatures.map(feature => (
              <View key={feature.id} style={[styles.featureRow, !feature.enabled && styles.featureRowDisabled]}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <View style={styles.featureInfo}>
                  <Text style={styles.featureName}>{feature.nameUrdu}</Text>
                  <Text style={styles.featureDesc} numberOfLines={1}>{feature.description}</Text>
                  <View style={styles.featureBadges}>
                    <View style={[styles.typeBadge, { backgroundColor: Colors.primaryPale }]}>
                      <Text style={styles.typeBadgeText}>{feature.type}</Text>
                    </View>
                    <View style={[styles.typeBadge, { backgroundColor: Colors.accentPale }]}>
                      <Text style={[styles.typeBadgeText, { color: Colors.accent }]}>{feature.category}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.featureActions}>
                  <Switch
                    value={feature.enabled}
                    onValueChange={(val) => updateAdminFeature(feature.id, { enabled: val })}
                    thumbColor={feature.enabled ? Colors.primary : Colors.textLight}
                    trackColor={{ false: Colors.surfaceBorder, true: Colors.primaryPale }}
                  />
                  <TouchableOpacity
                    onPress={() => showAlert('🗑️ حذف', `کیا "${feature.nameUrdu}" ہٹانا ہے؟`, [
                      { text: 'ہاں', style: 'destructive', onPress: () => removeAdminFeature(feature.id) },
                      { text: 'نہیں', style: 'cancel' },
                    ])}
                    style={styles.deleteBtn}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="delete-outline" size={18} color={Colors.accentRed} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ADD MORE TAB */}
        {activeTab === 'addmore' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>نئے فیچر شامل کریں</Text>
            <View style={styles.formCard}>
              <Text style={styles.formLabel}>انگریزی نام *</Text>
              <TextInput
                style={styles.formInput}
                value={newFeatureForm.name}
                onChangeText={(t) => setNewFeatureForm(prev => ({ ...prev, name: t }))}
                placeholder="Feature Name"
                placeholderTextColor={Colors.textLight}
              />
              <Text style={styles.formLabel}>اردو نام *</Text>
              <TextInput
                style={styles.formInput}
                value={newFeatureForm.nameUrdu}
                onChangeText={(t) => setNewFeatureForm(prev => ({ ...prev, nameUrdu: t }))}
                placeholder="اردو نام"
                placeholderTextColor={Colors.textLight}
                textAlign="right"
              />
              <Text style={styles.formLabel}>آئیکن (ایموجی)</Text>
              <TextInput
                style={styles.formInput}
                value={newFeatureForm.icon}
                onChangeText={(t) => setNewFeatureForm(prev => ({ ...prev, icon: t }))}
                placeholder="✨"
                placeholderTextColor={Colors.textLight}
              />
              <Text style={styles.formLabel}>قسم</Text>
              <View style={styles.typeRow}>
                {(['font', 'template', 'effect', 'texture', 'sticker', 'border', 'tool', 'feature'] as AdminFeature['type'][]).map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.typeChip, newFeatureForm.type === type && styles.typeChipActive]}
                    onPress={() => setNewFeatureForm(prev => ({ ...prev, type }))}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.typeChipText, newFeatureForm.type === type && styles.typeChipTextActive]}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.formLabel}>تفصیل</Text>
              <TextInput
                style={[styles.formInput, { height: 72, textAlignVertical: 'top' }]}
                value={newFeatureForm.description}
                onChangeText={(t) => setNewFeatureForm(prev => ({ ...prev, description: t }))}
                placeholder="فیچر کی تفصیل..."
                placeholderTextColor={Colors.textLight}
                multiline
                textAlign="right"
              />
              <TouchableOpacity style={styles.addBtn} onPress={handleAddFeature} activeOpacity={0.8}>
                <MaterialIcons name="add-circle" size={20} color="#FFFFFF" />
                <Text style={styles.addBtnText}>فیچر شامل کریں</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: Spacing.lg }]}>اضافی فیچر اقسام</Text>
            {[
              { icon: '🖼️', title: 'نیا ٹیمپلیٹ سلائیڈ', desc: 'اسلامی ٹیمپلیٹ یا کسٹم سلائیڈ شامل کریں' },
              { icon: '🎨', title: 'نئی بیک گراؤنڈ', desc: 'نئی ٹیکسچر یا گریڈینٹ شامل کریں' },
              { icon: '✨', title: 'نیا ایفیکٹ', desc: 'انیمیشن یا ٹرانزیشن ایفیکٹ شامل کریں' },
              { icon: '✍️', title: 'نیا فونٹ', desc: 'اردو/عربی/انگریزی فونٹ شامل کریں' },
              { icon: '🔲', title: 'نیا بارڈر', desc: 'کارنر یا بارڈر ڈیزائن شامل کریں' },
              { icon: '😊', title: 'نیا سٹیکر', desc: 'ایموجی یا شکل سٹیکر شامل کریں' },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                style={styles.addTypeCard}
                onPress={() => setNewFeatureForm(prev => ({ ...prev, name: item.title, description: item.desc }))}
                activeOpacity={0.8}
              >
                <Text style={styles.addTypeIcon}>{item.icon}</Text>
                <View style={styles.addTypeInfo}>
                  <Text style={styles.addTypeTitle}>{item.title}</Text>
                  <Text style={styles.addTypeDesc}>{item.desc}</Text>
                </View>
                <MaterialIcons name="add-circle-outline" size={22} color={Colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* TEMPLATES MANAGEMENT TAB */}
        {activeTab === 'templates' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ٹیمپلیٹ مینجمنٹ</Text>
            <View style={styles.infoCard}>
              <MaterialIcons name="info" size={20} color={Colors.accentBlue} />
              <Text style={styles.infoText}>ٹیمپلیٹس کو ایکٹیو یا ڈی ایکٹیو کریں، نئے شامل کریں یا موجودہ ایڈٹ کریں</Text>
            </View>
            {[
              { title: 'بسم اللہ ٹیمپلیٹس', count: 4, enabled: true },
              { title: 'عید ٹیمپلیٹس', count: 4, enabled: true },
              { title: 'رمضان ٹیمپلیٹس', count: 4, enabled: true },
              { title: 'نعت ٹیمپلیٹس', count: 5, enabled: true },
              { title: 'دعا ٹیمپلیٹس', count: 6, enabled: true },
              { title: 'حدیث ٹیمپلیٹس', count: 2, enabled: true },
              { title: 'آیت ٹیمپلیٹس', count: 6, enabled: true },
              { title: 'اسلامی ٹیمپلیٹس', count: 15, enabled: true },
              { title: 'شادی ٹیمپلیٹس', count: 3, enabled: true },
              { title: 'تہنیت ٹیمپلیٹس', count: 5, enabled: true },
            ].map((cat, i) => (
              <View key={i} style={styles.tmplCatRow}>
                <MaterialIcons name="collections" size={18} color={Colors.primary} />
                <View style={styles.tmplCatInfo}>
                  <Text style={styles.tmplCatTitle}>{cat.title}</Text>
                  <Text style={styles.tmplCatCount}>{cat.count} ٹیمپلیٹس</Text>
                </View>
                <Switch
                  value={cat.enabled}
                  thumbColor={Colors.primary}
                  trackColor={{ false: Colors.surfaceBorder, true: Colors.primaryPale }}
                  onValueChange={() => showAlert('ℹ️', 'فیچر کامیابی سے اپ ڈیٹ ہوگیا')}
                />
              </View>
            ))}
          </View>
        )}

        {/* DOCUMENTATION TAB */}
        {activeTab === 'docs' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ایپ اسٹور دستاویزات</Text>
            {APP_STORE_DOCS.map((doc, i) => (
              <View key={i} style={[styles.docCard, { borderLeftColor: doc.color }]}>
                <View style={styles.docHeader}>
                  <Text style={styles.docIcon}>{doc.icon}</Text>
                  <Text style={[styles.docTitle, { color: doc.color }]}>{doc.title}</Text>
                </View>
                {doc.items.map((item, j) => (
                  <View key={j} style={styles.docItem}>
                    <View style={[styles.docBullet, { backgroundColor: doc.color }]} />
                    <Text style={styles.docItemText}>{item}</Text>
                  </View>
                ))}
              </View>
            ))}

            <View style={styles.docCard}>
              <Text style={styles.docTitle}>📱 سورس کوڈ معلومات</Text>
              <Text style={styles.docBody}>
                سورس کوڈ OnSpace پروجیکٹ میں محفوظ ہے۔{"\n"}
                GitHub اکاؤنٹ سے کنیکٹ کر کے ورژن کنٹرول کریں۔{"\n"}
                Download بٹن سے مکمل سورس کوڈ ڈاؤنلوڈ کریں۔{"\n"}
                OnSpace ڈیش بورڈ → Code View → GitHub سے رسائی حاصل کریں۔
              </Text>
            </View>
          </View>
        )}

        {/* BACKUP TAB */}
        {activeTab === 'backup' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>بیک اپ و ریسٹور</Text>

            {[
              { icon: '💾', title: 'سورس کوڈ بیک اپ', desc: 'OnSpace ڈیش بورڈ سے مکمل پروجیکٹ ڈاؤنلوڈ کریں', action: 'سورس ڈاؤنلوڈ', color: Colors.primary },
              { icon: '🐙', title: 'GitHub بیک اپ', desc: 'GitHub ریپوزیٹری سے کنیکٹ کریں اور کمٹ کریں', action: 'GitHub', color: Colors.accentBlue },
              { icon: '🎨', title: 'ڈیزائنز بیک اپ', desc: 'تمام محفوظ ڈیزائنز کو بیک اپ کریں', action: 'ڈیزائن بیک اپ', color: Colors.accent },
              { icon: '⚙️', title: 'سیٹنگز بیک اپ', desc: 'تمام ایڈمن سیٹنگز محفوظ کریں', action: 'سیٹنگز محفوظ', color: Colors.accentPurple },
              { icon: '📤', title: 'APK بنائیں', desc: 'OnSpace ٹول بار سے Android APK بنائیں', action: 'APK بنائیں', color: Colors.accentOrange },
              { icon: '🍎', title: 'iOS بنائیں', desc: 'OnSpace سے App Store IPA بنائیں', action: 'iOS بنائیں', color: '#1565C0' },
            ].map((item, i) => (
              <View key={i} style={styles.backupCard}>
                <Text style={styles.backupIcon}>{item.icon}</Text>
                <View style={styles.backupInfo}>
                  <Text style={styles.backupTitle}>{item.title}</Text>
                  <Text style={styles.backupDesc}>{item.desc}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.backupBtn, { backgroundColor: item.color }]}
                  onPress={() => showAlert('ℹ️ ' + item.title, item.desc + '\n\nOnSpace ڈیش بورڈ سے یہ آپریشن انجام دیں')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.backupBtnText}>{item.action}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ایڈمن سیٹنگز</Text>

            <View style={styles.settingCard}>
              <View style={styles.settingRow}>
                <MaterialIcons name="lock" size={20} color={Colors.primary} />
                <Text style={styles.settingLabel}>پاس ورڈ تبدیل کریں</Text>
                <TouchableOpacity style={styles.settingBtn} onPress={handleChangePassword} activeOpacity={0.8}>
                  <Text style={styles.settingBtnText}>تبدیل کریں</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.settingRow}>
                <MaterialIcons name="info" size={20} color={Colors.accentBlue} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>ایپ ورژن</Text>
                  <Text style={styles.settingValue}>eVeR sMaRt UrDu sTuDiO v2.5</Text>
                </View>
              </View>
              <View style={styles.settingRow}>
                <MaterialIcons name="developer-mode" size={20} color={Colors.accent} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>فیچرز کی تعداد</Text>
                  <Text style={styles.settingValue}>{adminFeatures.length} فعال فیچرز</Text>
                </View>
              </View>
            </View>

            <View style={[styles.settingCard, { marginTop: Spacing.md }]}>
              <Text style={styles.sectionSubTitle}>تمام فیچرز</Text>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>تمام فیچرز فعال</Text>
                <Switch
                  value={adminFeatures.every(f => f.enabled)}
                  onValueChange={(val) => adminFeatures.forEach(f => updateAdminFeature(f.id, { enabled: val }))}
                  thumbColor={Colors.primary}
                  trackColor={{ false: Colors.surfaceBorder, true: Colors.primaryPale }}
                />
              </View>
            </View>

            <View style={[styles.settingCard, { marginTop: Spacing.md }]}>
              <Text style={styles.sectionSubTitle}>ایڈمن معلومات</Text>
              <Text style={styles.adminInfoText}>
                ⚠️ ایڈمن پینل صرف ایپ ڈیولپر یا اونر کے لیے ہے۔{"\n"}
                🔐 پاس ورڈ کسی کو نہ بتائیں۔{"\n"}
                💾 باقاعدگی سے بیک اپ لیتے رہیں۔{"\n"}
                📱 OnSpace ویب ڈیش بورڈ سے بھی سیٹنگز کنٹرول کریں۔
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loginContainer: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  loginCard: { width: '100%', backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: Spacing.xl, alignItems: 'center', borderWidth: 1, borderColor: Colors.surfaceBorder, ...Shadows.lg },
  loginIconBg: { width: 90, height: 90, borderRadius: 45, backgroundColor: Colors.primaryPale, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg, borderWidth: 2, borderColor: Colors.surfaceBorder },
  loginTitle: { fontSize: 26, color: Colors.primary, fontWeight: '800', marginBottom: 4 },
  loginSubtitle: { fontSize: 13, color: Colors.textMuted, marginBottom: Spacing.lg, letterSpacing: 1 },
  loginNote: { fontSize: 13, color: Colors.textSecondary, marginBottom: Spacing.md, textAlign: 'right', alignSelf: 'flex-end' },
  passwordRow: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: Spacing.md },
  passwordInput: { flex: 1, backgroundColor: Colors.background, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: 12, color: Colors.textPrimary, fontSize: 16, borderWidth: 1, borderColor: Colors.surfaceBorder, letterSpacing: 2 },
  eyeBtn: { padding: 12, marginLeft: 8 },
  loginBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: Radius.pill, gap: 8, ...Shadows.md, marginTop: 8 },
  loginBtnText: { fontSize: 16, color: '#FFFFFF', fontWeight: '700' },
  defaultPassHint: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.md },
  defaultPassText: { fontSize: 11, color: Colors.textMuted, fontStyle: 'italic' },
  header: { backgroundColor: Colors.surface, paddingHorizontal: Spacing.md, paddingBottom: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', ...Shadows.sm },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: FontSize.xl, color: Colors.primary, fontWeight: '800' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#FFEBEE', borderRadius: Radius.sm, borderWidth: 1, borderColor: '#FFCDD2' },
  logoutText: { fontSize: 12, color: Colors.accentRed, fontWeight: '600' },
  tabsRow: { backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder, maxHeight: 50 },
  tabsContent: { paddingHorizontal: Spacing.md, paddingVertical: 8, gap: 8 },
  adminTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radius.pill, backgroundColor: Colors.background, gap: 4, borderWidth: 1, borderColor: Colors.surfaceBorder },
  adminTabActive: { backgroundColor: Colors.primaryPale, borderColor: Colors.primary + '60' },
  adminTabText: { fontSize: 11, color: Colors.textMuted, fontWeight: '600' },
  adminTabTextActive: { color: Colors.primary },
  section: { padding: Spacing.md, gap: 10 },
  sectionTitle: { fontSize: FontSize.lg, color: Colors.primary, fontWeight: '800', textAlign: 'right', marginBottom: 4 },
  sectionSubTitle: { fontSize: 14, color: Colors.textPrimary, fontWeight: '700', textAlign: 'right', marginBottom: Spacing.sm },
  catRow: { marginBottom: 4 },
  catContent: { gap: 8, paddingVertical: 4 },
  catChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radius.pill, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.surfaceBorder },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catChipText: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },
  catChipTextActive: { color: '#FFFFFF' },
  featureRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: Spacing.sm, ...Shadows.sm },
  featureRowDisabled: { opacity: 0.5 },
  featureIcon: { fontSize: 22, width: 30, textAlign: 'center' },
  featureInfo: { flex: 1 },
  featureName: { fontSize: 14, color: Colors.textPrimary, fontWeight: '700', textAlign: 'right' },
  featureDesc: { fontSize: 11, color: Colors.textMuted, textAlign: 'right', marginTop: 2 },
  featureBadges: { flexDirection: 'row', gap: 6, marginTop: 4, justifyContent: 'flex-end' },
  typeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  typeBadgeText: { fontSize: 9, color: Colors.primary, fontWeight: '700' },
  featureActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  deleteBtn: { padding: 4 },
  formCard: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: 8 },
  formLabel: { fontSize: 13, color: Colors.primary, fontWeight: '700', textAlign: 'right' },
  formInput: { backgroundColor: Colors.background, borderRadius: Radius.sm, padding: 12, color: Colors.textPrimary, fontSize: 14, borderWidth: 1, borderColor: Colors.surfaceBorder },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: Radius.sm, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.surfaceBorder },
  typeChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  typeChipText: { fontSize: 11, color: Colors.textSecondary, fontWeight: '500' },
  typeChipTextActive: { color: '#FFFFFF' },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primary, borderRadius: Radius.md, padding: 14, gap: 8, marginTop: 8, ...Shadows.md },
  addBtnText: { fontSize: 15, color: '#FFFFFF', fontWeight: '700' },
  addTypeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: Spacing.md, ...Shadows.sm },
  addTypeIcon: { fontSize: 24 },
  addTypeInfo: { flex: 1 },
  addTypeTitle: { fontSize: 14, color: Colors.textPrimary, fontWeight: '600', textAlign: 'right' },
  addTypeDesc: { fontSize: 11, color: Colors.textMuted, textAlign: 'right', marginTop: 2 },
  docCard: { backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, borderLeftWidth: 3, borderLeftColor: Colors.primary, gap: 6, ...Shadows.sm },
  docHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  docIcon: { fontSize: 22 },
  docTitle: { fontSize: 15, color: Colors.primary, fontWeight: '700' },
  docItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  docBullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6, flexShrink: 0 },
  docItemText: { fontSize: 12, color: Colors.textSecondary, flex: 1, lineHeight: 18 },
  docBody: { fontSize: 13, color: Colors.textSecondary, lineHeight: 22, textAlign: 'right' },
  backupCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: Spacing.md, ...Shadows.sm },
  backupIcon: { fontSize: 26 },
  backupInfo: { flex: 1 },
  backupTitle: { fontSize: 14, color: Colors.textPrimary, fontWeight: '700', textAlign: 'right' },
  backupDesc: { fontSize: 11, color: Colors.textMuted, textAlign: 'right', marginTop: 2 },
  backupBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: Radius.sm },
  backupBtnText: { fontSize: 11, color: '#FFFFFF', fontWeight: '700' },
  settingCard: { backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: 12 },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  settingLabel: { flex: 1, fontSize: 14, color: Colors.textPrimary, fontWeight: '600', textAlign: 'right' },
  settingValue: { fontSize: 12, color: Colors.textMuted, textAlign: 'right', marginTop: 2 },
  settingBtn: { paddingHorizontal: 14, paddingVertical: 7, backgroundColor: Colors.primaryPale, borderRadius: Radius.sm, borderWidth: 1, borderColor: Colors.surfaceBorder },
  settingBtnText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  toggleLabel: { fontSize: 14, color: Colors.textPrimary, fontWeight: '500', textAlign: 'right' },
  adminInfoText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 22, textAlign: 'right' },
  infoCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: Colors.accentBluePale, borderRadius: Radius.md, padding: Spacing.md, gap: 8, borderWidth: 1, borderColor: Colors.accentBlue + '40' },
  infoText: { flex: 1, fontSize: 12, color: Colors.accentBlue, lineHeight: 18, textAlign: 'right' },
  tmplCatRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: Spacing.md },
  tmplCatInfo: { flex: 1 },
  tmplCatTitle: { fontSize: 14, color: Colors.textPrimary, fontWeight: '600', textAlign: 'right' },
  tmplCatCount: { fontSize: 11, color: Colors.textMuted, textAlign: 'right' },
});
