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
const goldmanBtn = document.getElementById("calcGoldman");

if (goldmanBtn) {
  goldmanBtn.addEventListener("click", () => {

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

    document.getElementById("goldmanResult").innerHTML = `
      <strong>Total Score:</strong> ${score}<br>
      <strong>${riskClass}</strong><br>
      ${riskText}
    `;
  });
}
const detskyBtn = document.getElementById("calcDetsky");

if (detskyBtn) {
  detskyBtn.addEventListener("click", () => {

    let score = 0;

    document
      .querySelectorAll("#page-detsky input[type=checkbox]:checked")
      .forEach(cb => score += Number(cb.dataset.score));

    let risk = "";

    if (score <= 15) {
      risk = "Low risk";
    } else if (score <= 30) {
      risk = "Intermediate risk";
    } else {
      risk = "High risk";
    }

    document.getElementById("detskyResult").innerHTML = `
      <strong>Total Score:</strong> ${score}<br>
      <strong>Risk Level:</strong> ${risk}
    `;
  });
}

const guptaBtn = document.getElementById("calcGupta");

if (guptaBtn) {
  guptaBtn.addEventListener("click", () => {

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

    document.getElementById("guptaResult").innerHTML = `
      <strong>Predicted MICA Risk:</strong> ${percent}%<br>
      <strong>Risk Category:</strong> ${interpretation}
    `;
  });
}

const eagleBtn = document.getElementById("calcEagle");

if (eagleBtn) {
  eagleBtn.addEventListener("click", () => {

    let score = 0;

    document
      .querySelectorAll("#page-eagle input[type=checkbox]:checked")
      .forEach(cb => score += Number(cb.dataset.score));

    let risk = "";

    if (score <= 1) {
      risk = "Low risk";
    } else if (score === 2) {
      risk = "Moderate risk";
    } else {
      risk = "High risk";
    }

    document.getElementById("eagleResult").innerHTML = `
      <strong>Total Score:</strong> ${score}<br>
      <strong>Risk Level:</strong> ${risk}
    `;
  });
}
const ariscatBtn = document.getElementById("calcAriscat");

if (ariscatBtn) {
  ariscatBtn.addEventListener("click", () => {

    let score = 0;

    score += Number(document.getElementById("ariscatAge").value);
    score += Number(document.getElementById("ariscatSpO2").value);
    score += Number(document.getElementById("ariscatSurgery").value);
    score += Number(document.getElementById("ariscatDuration").value);

    if (document.getElementById("ariscatInfection").checked) score += 17;
    if (document.getElementById("ariscatAnemia").checked) score += 11;

    let risk = "";
    let riskPercent = "";

    if (score < 26) {
      risk = "Low Risk";
      riskPercent = "~1.6% PPC";
    } else if (score < 45) {
      risk = "Intermediate Risk";
      riskPercent = "~13% PPC";
    } else {
      risk = "High Risk";
      riskPercent = "~42% PPC";
    }

    document.getElementById("ariscatResult").innerHTML = `
      <strong>Total Score:</strong> ${score}<br>
      <strong>${risk}</strong><br>
      ${riskPercent}
    `;
  });
}










