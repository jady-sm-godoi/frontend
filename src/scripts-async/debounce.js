// Initial config for setting up modals
function debounce(functionCallback, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { functionCallback.apply(this, args); }, timeout);
  };
}
