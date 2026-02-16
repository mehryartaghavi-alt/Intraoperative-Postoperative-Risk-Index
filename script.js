const pages = document.querySelectorAll('.page');
const riskButtons = document.querySelectorAll('.risk-btn');
const backBtn = document.getElementById('backBtn');

let selectedRisk = null;

function showPage(pageId) {
  pages.forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

riskButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedRisk = btn.dataset.risk;
    console.log("Selected risk:", selectedRisk);
    showPage('results-page');
  });
});

backBtn.addEventListener('click', () => {
  showPage('input-page');
});
