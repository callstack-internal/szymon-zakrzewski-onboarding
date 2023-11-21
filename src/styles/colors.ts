const constColors = {
  white: '#ffffff',
  black: '#2E3035',
  gray: '#708090',
};

const colorPalette = {
  ...constColors,
  accent: '#4689B4',
};

export default {
  badgeLabel: {
    text: colorPalette.white,
    background: colorPalette.accent,
  },
  navArrow: {
    color: colorPalette.gray,
  },
  separator: {
    background: colorPalette.gray,
  },
  text: {
    primary: colorPalette.black,
    secondary: colorPalette.gray,
  },
};
