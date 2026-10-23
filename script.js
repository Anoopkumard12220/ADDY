// ᥫ᭡ 𝘼𝘿𝘿𝙔
(function () {
  var intro = document.getElementById('intro');
  var done = function () { if (intro && intro.parentNode) intro.parentNode.removeChild(intro); intro = null; };
  if (intro) {
    intro.addEventListener('animationend', function (e) { if (e.animationName === 'introOut') done(); });
    setTimeout(done, 4600);
  }
})();

// Gentle pointer parallax on desktop; disabled for touch and reduced-motion users.
var scene = document.querySelector('.scene');
if (scene && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', function (e) {
    var x = (e.clientX / window.innerWidth - .5) * 8;
    var y = (e.clientY / window.innerHeight - .5) * 8;
    scene.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
  }, { passive: true });
}
