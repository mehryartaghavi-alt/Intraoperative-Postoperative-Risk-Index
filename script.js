document.addEventListener("DOMContentLoaded", () => {

  const pages = document.querySelectorAll(".page");

  function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
  }

  /* ================= NAVIGATION ================= */

  document.querySelectorAll(".risk-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.target);
    });
  });

  document.querySelectorAll(".score-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      showPage(`page-${btn.dataset.score}`);
    });
  });

  document.querySelectorAll(".backBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target || "input-page";
      showPage(target);
    });
  });

  /* ================= RCRI ================= */

  const calcRCRI = document.getElementById("calcRCRI");
  if (calcRCRI) {
    calcRCRI.addEventListener("click", () => {
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

  /* ================= GOLDMAN ================= */

  const calcGoldman = document.getElementById("calcGoldman");
  if (calcGoldman) {
    calcGoldman.addEventListener("click", () => {
      let score = 0;

      document
        .querySelectorAll("#page-goldman input[type=checkbox]:checked")
        .forEach(cb => score += Number(cb.dataset.score));

      let riskClass = "";
      let riskText = "";

      if (score <= 5) {
        riskClass = "Class I";
        riskText = "~1% cardiac complication risk";
      } else if (score <= 12) {
        riskClass = "Class II";
        riskText = "~7% cardiac complication risk";
      } else if (score <= 25) {
        riskClass = "Class III";
        riskText = "~14% cardiac complication risk";
      } else {
        riskClass = "Class IV";
        riskText = "Very high risk (~78%)";
      }

      document.getElementById("goldmanResult").innerHTML =
        `<strong>Total Score:</strong> ${score}<br>
         <strong>${riskClass}</strong><br>${riskText}`;
    });
  }

  /* ================= DETSKY ================= */

  const calcDetsky = document.getElementById("calcDetsky");
  if (calcDetsky) {
    calcDetsky.addEventListener("click", () => {
      let score = 0;

      document
        .querySelectorAll("#page-detsky input[type=checkbox]:checked")
        .forEach(cb => score += Number(cb.dataset.score));

      let risk = "";
      if (score <= 15) risk = "Low risk";
      else if (score <= 30) risk = "Intermediate risk";
      else risk = "High risk";

      document.getElementById("detskyResult").innerHTML =
        `<strong>Total Score:</strong> ${score}<br>
         <strong>Risk Level:</strong> ${risk}`;
    });
  }

  /* ================= GUPTA MICA ================= */

  const calcGupta = document.getElementById("calcGupta");
  if (calcGupta) {
    calcGupta.addEventListener("click", () => {

      const age = Number(document.getElementById("guptaAge").value);
      const asa = Number(document.getElementById("guptaASA").value);
      const func = Number(document.getElementById("guptaFunc").value);
      const cr = document.getElementById("guptaCr").checked ? 0.61 : 0;
      const surg = document.getElementById("guptaSurg").checked ? 0.80 : 0;

      const intercept = -5.25;
      const ageCoef = 0.02 * age;
      const x = intercept + ageCoef + asa + func + cr + surg;

      const risk = Math.exp(x) / (1 + Math.exp(x));
      const percent = (risk * 100).toFixed(2);

      let interpretation = "";
      if (percent < 1) interpretation = "Low risk";
      else if (percent < 5) interpretation = "Moderate risk";
      else interpretation = "High risk";

      document.getElementById("guptaResult").innerHTML =
        `<strong>Predicted MICA Risk:</strong> ${percent}%<br>
         <strong>Risk Category:</strong> ${interpretation}`;
    });
  }

});









