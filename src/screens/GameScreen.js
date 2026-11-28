// src/screens/GameScreen.js
// Main game screen: shows a celebrity photo and four answer options.
// Game state (score, attempts, used celebrities, current question) is managed with useReducer.

import { useEffect, useReducer } from 'react';
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
import celebrities from '../data/celebrities';
import AnswerButton from '../components/AnswerButton';
import { getRandomCelebrity, generateOptions } from '../utils/gameLogic';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../constants/theme';

const initialState = {
  score: 0,
  attempts: 0,
  usedIds: [],
  current: null,
  options: [],
  answered: false,
};

// Picks the next unused celebrity and builds its four answer options.
function loadNextQuestion(state) {
  const next = getRandomCelebrity(celebrities, state.usedIds);

  if (!next) {
    return { ...state, current: null, options: [], answered: false };
  }

  return {
    ...state,
    current: next,
    options: generateOptions(next, celebrities),
    usedIds: [...state.usedIds, next.id],
    answered: false,
  };
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'ANSWER':
      return {
        ...state,
        score: action.isCorrect ? state.score + 1 : state.score,
        attempts: state.attempts + 1,
        answered: true,
      };
    case 'NEXT_IF_ANSWERED':
      return state.answered ? loadNextQuestion(state) : state;
    case 'RESTART':
      return loadNextQuestion(initialState);
    default:
      return state;
  }
}

export default function GameScreen({ navigation }) {
  // The third argument loads the first question when the screen opens.
  const [state, dispatch] = useReducer(gameReducer, initialState, loadNextQuestion);
  const { height } = useWindowDimensions();
  const imageHeight = Math.min(320, height * 0.38);

  // When the player comes back from the Result screen, show the next celebrity.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({ type: 'NEXT_IF_ANSWERED' });
    });
    return unsubscribe;
  }, [navigation]);

  function handleAnswer(selectedName) {
    if (state.answered) return; // ignore extra taps

    const isCorrect = selectedName === state.current.name;
    const newScore = isCorrect ? state.score + 1 : state.score;
    const newAttempts = state.attempts + 1;

    dispatch({ type: 'ANSWER', isCorrect });

    navigation.navigate('Result', {
      isCorrect,
      selectedName,
      correctName: state.current.name,
      image: state.current.image,
      score: newScore,
      attempts: newAttempts,
      isLastQuestion: state.usedIds.length === celebrities.length,
    });
  }

  function handleFinish() {
    navigation.navigate('FinalScore', {
      score: state.score,
      attempts: state.attempts,
    });
  }

  const finishButton = (
    <Pressable
      style={({ pressed }) => [styles.finishButton, pressed && styles.pressed]}
      onPress={handleFinish}
      accessibilityRole="button"
      accessibilityLabel="Finish game"
    >
      <Ionicons name="flag" size={20} color={COLORS.white} />
      <Text style={styles.finishText}>Finish Game</Text>
    </Pressable>
  );

  // Shown only if every celebrity has already been used.
  if (!state.current) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>You have seen all the celebrities!</Text>
        {finishButton}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <Pressable
          style={({ pressed }) => [styles.restartButton, pressed && styles.pressed]}
          onPress={() => dispatch({ type: 'RESTART' })}
          accessibilityRole="button"
          accessibilityLabel="Restart game"
        >
          <Ionicons name="refresh" size={18} color={COLORS.primary} />
          <Text style={styles.restartText}>Restart</Text>
        </Pressable>

        <View
          style={styles.scoreBox}
          accessible
          accessibilityLabel={`Score ${state.score} out of ${state.attempts}`}
        >
          <Ionicons name="trophy" size={18} color={COLORS.gold} />
          <Text style={styles.scoreText}>
            Score: {state.score} / {state.attempts}
          </Text>
        </View>
      </View>

      <Image
        source={state.current.image}
        style={[styles.image, { height: imageHeight }]}
        resizeMode="cover"
        accessibilityLabel="Photo of the celebrity to guess"
      />

      <View style={styles.questionRow}>
        <Ionicons name="help-circle" size={20} color={COLORS.textMuted} />
        <Text style={styles.questionText}>Who is this celebrity?</Text>
      </View>

      {state.options.map((name) => (
        <AnswerButton key={name} label={name} onPress={() => handleAnswer(name)} />
      ))}

      {finishButton}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  emptyText: {
    marginBottom: SPACING.lg,
    fontSize: FONT_SIZES.title,
    color: COLORS.text,
    textAlign: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.sm,
  },
  restartText: {
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.primary,
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.border,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.md,
  },
  questionText: {
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZES.body,
    fontWeight: '500',
    color: COLORS.text,
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primaryDark,
  },
  finishText: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.8,
  },
});