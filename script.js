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
const scoreButtons = document.querySelectorAll('.score-btn');

scoreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.score === "rcri") {
      showPage('page-rcri');
    }
  });
});
const calcRCRI = document.getElementById('calcRCRI');

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




