// Silence warning, see:
// https://github.com/facebookincubator/create-react-app/issues/3199
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};
