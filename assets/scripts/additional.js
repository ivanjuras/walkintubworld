document.querySelector("body").style.width = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
)
document.querySelector("body").style.height = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
)
