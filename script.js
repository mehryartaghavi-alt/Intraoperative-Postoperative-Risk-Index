document.addEventListener("DOMContentLoaded", () => {

  const pages = document.querySelectorAll(".page");

  function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
  }

  // Main navigation
  document.querySelectorAll(".risk-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.target);
    });
  });

  // Score navigation
  document.querySelectorAll(".score-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(`page-${btn.dataset.score}`);
    });
  });

  // Back buttons
  document.querySelectorAll(".backBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      showPage("input-page");
    });
  });

  // RCRI calculation
  const calcBtn = document.getElementById("calcRCRI");
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      let score = 0;
      document
        .querySelectorAll("#page-rcri input[type=checkbox]:checked")
        .forEach(cb => score += Number(cb.dataset.score));

      let risk = "";
      if (score === 0) risk = "Class I – Very Low Risk (<1%)";
      else if (score === 1) risk = "Class II – Low Risk (~1%)";
      else if (score === 2) risk = "Class III – Moderate Risk (~6%)";
      else risk = "Class IV – High Risk (>10%)";

      document.getElementById("rcriResult").innerHTML =
        `<strong>Total Score:</strong> ${score}<br>${risk}`;
    });
  }

});





