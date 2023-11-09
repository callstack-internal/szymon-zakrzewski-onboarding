const dimensions = {
  badgeLabel: {
    width: 100,
    height: 40,
    borderRadius: 20,
    padding: 15,
  },
};

const margins = {
  small: 5,
  medium: 15,
  large: 30,
  huge: 50,
};

const text = {
  large: {
    size: 26,
  },
  base: {
    size: 20,
  },
  small: {
    size: 14,
  },
};

const cities = [
  703448, // Kyiv, UA
  692194, // Sumy, UA
  756135, // Warsaw, PL
  3081368, // Wrocław, PL
  3067696, // Prague, CZ
  3077916, // České Budějovice, CZ
  2950159, // Berlin, DE
  2867714, // Munich, DE
  3247449, // Aachen, DE
  5815135, // Washington, US
  5128581, // New York City, US
];

export default {
  cities,
  margins,
  dimensions,
  text,
};
