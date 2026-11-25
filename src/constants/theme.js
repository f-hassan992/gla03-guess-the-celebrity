// src/constants/theme.js
// Central design values (colors, spacing, font sizes, corner radius)
// so every screen looks consistent and is easy to restyle.

export const COLORS = {
  primary: '#2563EB',     // main blue for buttons
  primaryDark: '#1E3A8A', // darker blue for the "Finish Game" button
  background: '#F5F7FB',  // light screen background
  card: '#FFFFFF',        // answer buttons and cards
  text: '#1F2937',        // main text (dark grey, easy to read)
  textMuted: '#6B7280',   // secondary text
  border: '#E5E7EB',      // light borders
  success: '#16A34A',     // correct answer (green)
  danger: '#DC2626',      // wrong answer (red)
  gold: '#F5B301',        // trophy icon
  white: '#FFFFFF',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONT_SIZES = {
  small: 14,
  body: 16,
  title: 22,
  heading: 28,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
};