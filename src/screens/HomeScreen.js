// src/screens/HomeScreen.js
// Welcome screen that introduces the game and starts it.

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Ionicons name="film-outline" size={72} color={COLORS.primary} />

      <Text style={styles.title} accessibilityRole="header">
        Guess The Celebrity
      </Text>

      <Text style={styles.subtitle}>
        Look at the photo and pick the right name from four choices.
        How many can you get right?
      </Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => navigation.navigate('Game')}
        accessibilityRole="button"
        accessibilityLabel="Start game"
      >
        <Ionicons name="play-circle" size={24} color={COLORS.white} />
        <Text style={styles.buttonText}>Start Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  title: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 320,
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
    fontSize: FONT_SIZES.body,
    lineHeight: 22,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
    color: COLORS.white,
  },
});