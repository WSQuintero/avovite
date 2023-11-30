export default {
  getWrapWidth: (divisions, gap) => `calc(${100 / divisions}% - ${gap - gap / divisions}px)`,
};
