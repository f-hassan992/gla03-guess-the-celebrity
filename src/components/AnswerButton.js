// src/components/AnswerButton.js
// Reusable answer option button with an Expo icon.

import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../constants/theme';

export default function AnswerButton({ label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Answer: ${label}`}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name="person-circle-outline" size={24} color={COLORS.primary} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08)',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  label: {
    flexShrink: 1,
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.body,
    fontWeight: '500',
    color: COLORS.text,
  },
});