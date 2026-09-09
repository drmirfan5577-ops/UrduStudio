// eVeR sMaRt UrDu sTuDiO - Tab Layout with Admin
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Colors, Shadows } from '@/constants/theme';

function TabIcon({ name, label, color, focused }: { name: any; label: string; color: string; focused: boolean }) {
  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
      <MaterialIcons name={name} size={20} color={focused ? Colors.primary : Colors.textMuted} />
      <Text style={[styles.tabLabel, { color: focused ? Colors.primary : Colors.textMuted }]} numberOfLines={1}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.select({ ios: insets.bottom + 62, android: insets.bottom + 62, default: 70 }),
          paddingTop: 5,
          paddingBottom: Platform.select({ ios: insets.bottom + 6, android: insets.bottom + 6, default: 8 }),
          paddingHorizontal: 2,
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.surfaceBorder,
          ...Shadows.md,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen name="index" options={{ tabBarIcon: ({ color, focused }) => <TabIcon name="home" label="ہوم" color={color} focused={focused} /> }} />
      <Tabs.Screen name="editor" options={{ tabBarIcon: ({ color, focused }) => <TabIcon name="edit" label="ایڈیٹر" color={color} focused={focused} /> }} />
      <Tabs.Screen name="templates" options={{ tabBarIcon: ({ color, focused }) => <TabIcon name="collections" label="ٹیمپلیٹ" color={color} focused={focused} /> }} />
      <Tabs.Screen name="effects" options={{ tabBarIcon: ({ color, focused }) => <TabIcon name="auto-awesome" label="ایفیکٹس" color={color} focused={focused} /> }} />
      <Tabs.Screen name="gallery" options={{ tabBarIcon: ({ color, focused }) => <TabIcon name="photo-library" label="گیلری" color={color} focused={focused} /> }} />
      <Tabs.Screen name="storyboard" options={{ tabBarIcon: ({ color, focused }) => <TabIcon name="movie-creation" label="اسٹوری" color={color} focused={focused} /> }} />
      <Tabs.Screen name="admin" options={{ tabBarIcon: ({ color, focused }) => <TabIcon name="admin-panel-settings" label="ایڈمن" color={color} focused={focused} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 10, minWidth: 48 },
  tabIconActive: { backgroundColor: Colors.primaryPale },
  tabLabel: { fontSize: 8, fontWeight: '600', marginTop: 2, textAlign: 'center' },
});
