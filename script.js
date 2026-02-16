alert("JS LOADED");
const pages = document.querySelectorAll('.page');
const riskButtons = document.querySelectorAll('.risk-btn');
const backButtons = document.querySelectorAll('.backBtn');

function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// رفتن به صفحه مربوطه
riskButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetPage = btn.dataset.target;
    showPage(targetPage);
  });
});

// برگشت به صفحه اول
backButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    showPage('input-page');
  });
});
const scoreButtons = document.querySelectorAll('.score-btn');

scoreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const score = btn.dataset.score;
    console.log("Selected score:", score);
  });
});


