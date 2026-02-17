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

  document.addEventListener('DOMContentLoaded', () => {

  const pages = document.querySelectorAll('.page');
  const riskButtons = document.querySelectorAll('.risk-btn');
  const backButtons = document.querySelectorAll('.backBtn');
  const scoreButtons = document.querySelectorAll('.score-btn');
  const calcRCRI = document.getElementById('calcRCRI');

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
  }

  // Stage 1 → Stage 2
  riskButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showPage(btn.dataset.target);
    });
  });

  // Stage 2 → Stage 3 (RCRI)
  scoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const score = btn.dataset.score;
      console.log("Selected score:", score);

      if (score === "rcri") {
        showPage('page-rcri');
      }
    });
  });

  // Back buttons
  backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showPage('input-page');
    });
  });

  // RCRI calculation (بعداً کاملش می‌کنیم)
  if (calcRCRI) {
    calcRCRI.addEventListener('click', () => {
      console.log("Calculate RCRI clicked");
    });
  }

});


if (calcRCRI) {
  calcRCRI.addEventListener('click', () => {

    const checkboxes = document.querySelectorAll('#page-rcri input[type="checkbox"]');
    let score = 0;

    checkboxes.forEach(cb => {
      if (cb.checked) score += 1;
    });

    let interpretation = "";

    if (score === 0) {
      interpretation = "Low risk";
    } else if (score === 1) {
      interpretation = "Intermediate risk";
    } else {
      interpretation = "High risk";
    }

    document.getElementById('rcriResult').innerHTML =
      `<strong>RCRI Score:</strong> ${score}<br>
       <strong>Risk Level:</strong> ${interpretation}`;
  });
}





