export const colors = {
  primaryColor: "#33abfb",
  mainColor: "#353b46",
  mainTextColor: "#bac5d8",
  backColor: "#eaecf1",
  orangish: "#FFAC4E",
  pinkish: "#FF74A8",
  orange: "#FFA160",
  white: "#FFFFFF",
  whiteDull: "rgba(250,250,250,0.6)",
  lightgray: "lightgray",
  darkOrange: "#ff8a39",
  black: "black"
};

export const createApiActionTypes = (namespace, type) => [
  `${namespace}/${type}_REQUEST`,
  `${namespace}/${type}_SUCCESS`,
  `${namespace}/${type}_FAIL`
];
export const sizes = {
  heading: "24px",
  headingMiddle: "24px",
  headingLarge: "30px",
  normalText: "13px",
  h1: "16px",
  h2: "15px",
  h3: "14px",
  h4: "13px",
  h5: "12px",
  h6: "10px"
};

export const textColor = {
  text_dark: "rgba(0,0,0,0.85)",
  text_midle: "rgba(0,0,0,0.65)",
  text_light: "rgba(0,0,0,0.45)"
};
export const isMobile = window.innerWidth < 500;

export const isTablet = window.innerWidth < 600;
