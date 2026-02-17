document.addEventListener("DOMContentLoaded", () => {

  const pages = document.querySelectorAll(".page");

  function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  // PAGE 1 → PAGE 2,3,...
  document.querySelectorAll(".risk-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.target);
    });
  });

  // PAGE 2 → PAGE RCRI
  document.querySelectorAll(".score-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.score === "rcri") {
        showPage("page-rcri");
      }
    });
  });
// PAGE 2 → PAGE GOLDMAN
scoreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const score = btn.dataset.score;

    if (score === "goldman") {
      showPage("page-goldman");
    }
  });
});

  // BACK → PAGE 1
  document.querySelectorAll(".backBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      showPage("input-page");
    });
  });

});




