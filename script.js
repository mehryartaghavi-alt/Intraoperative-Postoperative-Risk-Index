document.addEventListener('DOMContentLoaded', () => {

  const pages = document.querySelectorAll('.page');
  const riskButtons = document.querySelectorAll('.risk-btn');
  const backButtons = document.querySelectorAll('.backBtn');
  const scoreButtons = document.querySelectorAll('.score-btn');

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
  }

  // صفحه اول → صفحات ریسک
  riskButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showPage(btn.dataset.target);
    });
  });

  // دکمه‌های Back
  backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showPage('input-page');
    });
  });

  // دکمه‌های Cardiac scores
  scoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log("Selected score:", btn.dataset.score);
      alert("Score selected: " + btn.dataset.score);
    });
  });

});



