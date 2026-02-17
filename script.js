document.addEventListener("DOMContentLoaded", () => {

  /* ---------- PAGE HANDLING ---------- */

  const pages = document.querySelectorAll('.page');

  function showPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
    } else {
      console.error("Page not found:", pageId);
    }
  }

  /* ---------- PAGE 1 : ORGAN SELECTION ---------- */

  cconst riskButtons = document.querySelectorAll('.risk-btn');

riskButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    showPage(btn.dataset.target);
  });
});


  /* ---------- PAGE 2 : CARDIAC SCORES ---------- */

  const scoreButtons = document.querySelectorAll('.score-btn');

  scoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const score = btn.dataset.score;
      console.log("Selected score:", score);

      if (score === "rcri") {
        showPage('page-rcri');
      }
      if (score === "goldman") {
        showPage('page-goldman');
      }
      if (score === "gupta") {
        showPage('page-gupta');
      }
      if (score === "detsky") {
        showPage('page-detsky');
      }
    });
  });

  /* ---------- BACK BUTTONS ---------- */

  document.querySelectorAll('.backBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.back;
      showPage(target);
    });
  });

});


