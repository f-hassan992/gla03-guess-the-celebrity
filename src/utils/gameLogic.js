// src/utils/gameLogic.js
// Helper functions for the game logic.

// Returns a new array with the items in random order (Fisher-Yates shuffle).
export function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Picks a random celebrity that has not been shown yet.
// Returns null when every celebrity has been used.
export function getRandomCelebrity(celebrities, usedIds) {
  const available = celebrities.filter((c) => !usedIds.includes(c.id));
  if (available.length === 0) return null;
  const index = Math.floor(Math.random() * available.length);
  return available[index];
}

// Builds four shuffled answer options: the correct name + 3 wrong names.
export function generateOptions(correctCelebrity, celebrities, count = 4) {
  const wrongNames = shuffleArray(
    celebrities.filter((c) => c.id !== correctCelebrity.id)
  )
    .slice(0, count - 1)
    .map((c) => c.name);

  return shuffleArray([correctCelebrity.name, ...wrongNames]);
}