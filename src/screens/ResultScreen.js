// src/screens/ResultScreen.js
// Shows immediate feedback for the player's answer and the correct answer.

import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../constants/theme';

export default function ResultScreen({ navigation, route }) {
  const { isCorrect, selectedName, correctName, image, score, attempts, isLastQuestion } =
    route.params;
  const { height } = useWindowDimensions();
  const imageHeight = Math.min(300, height * 0.36);

  function goToFinalScore() {
    navigation.navigate('FinalScore', { score, attempts });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={styles.scoreBox}
        accessible
        accessibilityLabel={`Score ${score} out of ${attempts}`}
      >
        <Ionicons name="trophy" size={18} color={COLORS.gold} />
        <Text style={styles.scoreText}>
          Score: {score} / {attempts}
        </Text>
      </View>

      <Image
        source={image}
        style={[
          styles.image,
          { height: imageHeight, borderColor: isCorrect ? COLORS.success : COLORS.danger },
        ]}
        resizeMode="cover"
        accessibilityLabel={`Photo of ${correctName}`}
      />

      <View style={styles.feedbackRow} accessible accessibilityLiveRegion="polite">
        <Ionicons
          name={isCorrect ? 'checkmark-circle' : 'close-circle'}
          size={36}
          color={isCorrect ? COLORS.success : COLORS.danger}
        />
        <Text style={styles.feedbackText}>
          {isCorrect ? 'Correct! That was ' : 'Wrong! It was '}
          <Text style={styles.bold}>{correctName}</Text>
        </Text>
      </View>

      {!isCorrect && <Text style={styles.yourAnswer}>Your answer: {selectedName}</Text>}

      <Pressable
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        onPress={isLastQuestion ? goToFinalScore : () => navigation.goBack()}
        accessibilityRole="button"
      >
        <Ionicons
          name={isLastQuestion ? 'trophy' : 'arrow-forward-circle'}
          size={22}
          color={COLORS.white}
        />
        <Text style={styles.buttonText}>
          {isLastQuestion ? 'See Final Score' : 'Next Question'}
        </Text>
      </Pressable>

      {!isLastQuestion && (
        <Pressable
          style={({ pressed }) => [styles.finishButton, pressed && styles.pressed]}
          onPress={goToFinalScore}
          accessibilityRole="button"
        >
          <Ionicons name="flag" size={20} color={COLORS.white} />
          <Text style={styles.buttonText}>Finish Game</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: SPACING.md,
  },
  scoreText: {
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZES.small,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  image: {
    aspectRatio: 3 / 4,
    alignSelf: 'center',
    borderWidth: 4,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.border,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  feedbackText: {
    flexShrink: 1,
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.title - 2,
    color: COLORS.text,
  },
  bold: {
    fontWeight: 'bold',
  },
  yourAnswer: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.body,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primaryDark,
  },
  buttonText: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.8,
  },
});