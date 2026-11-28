// src/screens/FinalScoreScreen.js
// Shows the final score and lets the player restart or return home.

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../constants/theme';

export default function FinalScoreScreen({ navigation, route }) {
  const { score, attempts } = route.params;
  const percentage = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  let message = 'Good try! Play again to improve.';
  if (attempts === 0) message = 'You did not answer any questions yet.';
  else if (percentage >= 80) message = 'Amazing! You really know your celebrities!';
  else if (percentage >= 50) message = 'Nice work! Keep practicing.';

  // Start a brand-new game (fresh state) with Home underneath it.
  function handleRestart() {
    navigation.reset({
      index: 1,
      routes: [{ name: 'Home' }, { name: 'Game' }],
    });
  }

  // Go back to the Home screen.
  function handleClose() {
    navigation.popToTop();
  }

  return (
    <View style={styles.container}>
      <Ionicons name="trophy" size={80} color={COLORS.gold} />
      <Text style={styles.title} accessibilityRole="header">
        Final Score
      </Text>
      <Text style={styles.score}>
        {score} / {attempts}
      </Text>
      <Text style={styles.summary}>
        You answered {score} out of {attempts} correctly ({percentage}%).
      </Text>
      <Text style={styles.message}>{message}</Text>

      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
          onPress={handleClose}
          accessibilityRole="button"
        >
          <Ionicons name="close" size={20} color={COLORS.danger} />
          <Text style={styles.closeText}>Close</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.restartButton, pressed && styles.pressed]}
          onPress={handleRestart}
          accessibilityRole="button"
        >
          <Ionicons name="refresh" size={20} color={COLORS.white} />
          <Text style={styles.restartText}>Restart Game</Text>
        </Pressable>
      </View>
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
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  score: {
    marginVertical: SPACING.sm,
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  summary: {
    fontSize: FONT_SIZES.body,
    color: COLORS.text,
    textAlign: 'center',
  },
  message: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.body,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.danger,
    borderRadius: RADIUS.md,
  },
  closeText: {
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    color: COLORS.danger,
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
  },
  restartText: {
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.8,
  },
});