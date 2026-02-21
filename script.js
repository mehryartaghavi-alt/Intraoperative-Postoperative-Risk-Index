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


/* ================= EAGLE ================= */

const calcEagle = document.getElementById("calcEagle");

if (calcEagle) {
  calcEagle.addEventListener("click", () => {

    let score = 0;

    document
      .querySelectorAll("#page-eagle input[type=checkbox]:checked")
      .forEach(cb => score += Number(cb.dataset.score));

    let risk = "";

    if (score <= 1) risk = "Low risk";
    else if (score === 2) risk = "Moderate risk";
    else risk = "High risk";

    document.getElementById("eagleResult").innerHTML =
      `<strong>Total Score:</strong> ${score}<br>
       <strong>Risk Level:</strong> ${risk}`;
  });
}

/* ================= ARISCAT ================= */

const calcAriscat = document.getElementById("calcAriscat");

if (calcAriscat) {
  calcAriscat.addEventListener("click", () => {

    let score = 0;

    score += Number(document.getElementById("ariscatAge").value);
    score += Number(document.getElementById("ariscatSpO2").value);
    score += Number(document.getElementById("ariscatSurgery").value);
    score += Number(document.getElementById("ariscatDuration").value);

    if (document.getElementById("ariscatInfection").checked) score += 17;
    if (document.getElementById("ariscatAnemia").checked) score += 11;

    let risk = "";
    let percent = "";

    if (score < 26) {
      risk = "Low Risk";
      percent = "~1.6% PPC";
    } else if (score < 45) {
      risk = "Intermediate Risk";
      percent = "~13% PPC";
    } else {
      risk = "High Risk";
      percent = "~42% PPC";
    }

    document.getElementById("ariscatResult").innerHTML =
      `<strong>Total Score:</strong> ${score}<br>
       <strong>${risk}</strong><br>${percent}`;
  });
}

/* ================= ARROZULLAH ================= */

function calculateArrozullah() {

  let score = 0;

  const surgery = Number(document.getElementById("arrozSurgery").value);
  const emergency = document.getElementById("arrozEmergency").checked;
  const albumin = document.getElementById("arrozAlbumin").checked;
  const bun = document.getElementById("arrozBun").checked;
  const dependent = document.getElementById("arrozDependent").checked;
  const copd = document.getElementById("arrozCopd").checked;
  const age = Number(document.getElementById("arrozAge").value);

  score += surgery;

  if (emergency) score += 11;
  if (albumin) score += 8;
  if (bun) score += 8;
  if (dependent) score += 7;
  if (copd) score += 6;

  if (age >= 80) score += 13;
  else if (age >= 70) score += 9;
  else if (age >= 60) score += 4;

  let riskClass = "";
  let riskPercent = "";

  if (score <= 10) {
    riskClass = "Class 1"; riskPercent = "0.5%";
  } else if (score <= 19) {
    riskClass = "Class 2"; riskPercent = "1.8%";
  } else if (score <= 27) {
    riskClass = "Class 3"; riskPercent = "4.2%";
  } else if (score <= 40) {
    riskClass = "Class 4"; riskPercent = "10%";
  } else {
    riskClass = "Class 5"; riskPercent = "26%";
  }

  document.getElementById("arrozResult").innerHTML =
    `Score: ${score}<br>${riskClass} – Risk: ${riskPercent}`;
}

/* ================= GUPTAR ================= */

function calculateGuptar() {

  let score = 0;

  const surgery = Number(document.getElementById("guptarSurgery").value);
  const smoking = document.getElementById("guptarSmoking").checked;
  const hct = document.getElementById("guptarHct").checked;
  const bun = document.getElementById("guptarBun").checked;
  const dependent = document.getElementById("guptarDependent").checked;
  const copd = document.getElementById("guptarCopd").checked;
  const weightLoss = document.getElementById("guptarWeightLoss").checked; // حرف L بزرگ
  const age = Number(document.getElementById("guptarAge").value);

  score += surgery;

  if (smoking) score += 4;
  if (hct) score += 8;
  if (bun) score += 7;
  if (dependent) score += 10;
  if (copd) score += 7;
  if (weightLoss) score += 7;

  if (age >= 80) score += 12;
  else if (age >= 70) score += 8;
  else if (age >= 60) score += 4;

  let riskClass = "";
  let riskPercent = "";

  if (score <= 15) {
    riskClass = "Class 1"; riskPercent = "0.2%";
  } else if (score <= 25) {
    riskClass = "Class 2"; riskPercent = "1.2%";
  } else if (score <= 40) {
    riskClass = "Class 3"; riskPercent = "4%";
  } else if (score <= 55) {
    riskClass = "Class 4"; riskPercent = "9.2%";
  } else {
    riskClass = "Class 5"; riskPercent = "15.3%";
  }

  document.getElementById("guptarResult").innerHTML =
    `Score: ${score}<br>${riskClass} – Risk: ${riskPercent}`;
}

function calculateSprs() {

  let score = 0;

  const age = Number(document.getElementById("sprsAge").value);
  const surgery = Number(document.getElementById("sprsSurgery").value);
  const copd = document.getElementById("sprsCopd").checked;
  const emergency = document.getElementById("sprsEmergency").checked;
  const albumin = document.getElementById("sprsAlbumin").checked;
  const dependent = document.getElementById("sprsDependent").checked;

  score += surgery;

  if (copd) score += 6;
  if (emergency) score += 8;
  if (albumin) score += 8;
  if (dependent) score += 7;

  if (age >= 80) score += 12;
  else if (age >= 70) score += 8;
  else if (age >= 60) score += 4;

  let riskLevel = "";
  let riskPercent = "";

  if (score <= 10) {
    riskLevel = "Low Risk";
    riskPercent = "<1%";
  } else if (score <= 20) {
    riskLevel = "Moderate Risk";
    riskPercent = "3–5%";
  } else if (score <= 35) {
    riskLevel = "High Risk";
    riskPercent = "10–15%";
  } else {
    riskLevel = "Very High Risk";
    riskPercent = ">20%";
  }

  document.getElementById("sprsResult").innerHTML =
    `Score: ${score}<br>${riskLevel} – Estimated Risk: ${riskPercent}`;
}

function calculatePrri() {

  let score = 0;

  const age = Number(document.getElementById("prriAge").value);
  const surgery = Number(document.getElementById("prriSurgery").value);
  const ckd = document.getElementById("prriCkd").checked;
  const diabetes = document.getElementById("prriDiabetes").checked;
  const hf = document.getElementById("prriHf").checked;
  const emergency = document.getElementById("prriEmergency").checked;
  const sepsis = document.getElementById("prriSepsis").checked;
  const hypotension = document.getElementById("prriHypotension").checked;

  score += surgery;

  if (ckd) score += 10;
  if (diabetes) score += 6;
  if (hf) score += 8;
  if (emergency) score += 8;
  if (sepsis) score += 10;
  if (hypotension) score += 6;

  if (age >= 80) score += 10;
  else if (age >= 70) score += 6;
  else if (age >= 60) score += 3;

  let riskLevel = "";
  let riskPercent = "";

  if (score <= 10) {
    riskLevel = "Low Risk";
    riskPercent = "<1% AKI";
  } else if (score <= 20) {
    riskLevel = "Moderate Risk";
    riskPercent = "3–5% AKI";
  } else if (score <= 35) {
    riskLevel = "High Risk";
    riskPercent = "10–15% AKI";
  } else {
    riskLevel = "Very High Risk";
    riskPercent = ">20% AKI";
  }

  document.getElementById("prriResult").innerHTML =
    `Score: ${score}<br>${riskLevel} – Estimated Risk: ${riskPercent}`;
}

function calculateSpark() {

  let score = 0;

  const age = Number(document.getElementById("sparkAge").value);
  const egfr = Number(document.getElementById("sparkEgfr").value);
  const albuminuria = document.getElementById("sparkAlbuminuria").checked;
  const anemia = document.getElementById("sparkAnemia").checked;
  const diabetes = document.getElementById("sparkDiabetes").checked;
  const raas = document.getElementById("sparkRaas").checked;
  const emergency = document.getElementById("sparkEmergency").checked;
  const hypoalbumin = document.getElementById("sparkHypoalbumin").checked;
  const duration = Number(document.getElementById("sparkDuration").value);

  // Age
  if (age >= 80) score += 10;
  else if (age >= 70) score += 7;
  else if (age >= 60) score += 4;

  // eGFR
  if (egfr < 30) score += 15;
  else if (egfr < 45) score += 10;
  else if (egfr < 60) score += 5;

  if (albuminuria) score += 8;
  if (anemia) score += 6;
  if (diabetes) score += 4;
  if (raas) score += 4;
  if (emergency) score += 8;
  if (hypoalbumin) score += 8;

  score += duration;

  let riskLevel = "";
  let riskPercent = "";

  if (score <= 10) {
    riskLevel = "Low Risk";
    riskPercent = "<1% AKI";
  } else if (score <= 20) {
    riskLevel = "Moderate Risk";
    riskPercent = "3–5% AKI";
  } else if (score <= 35) {
    riskLevel = "High Risk";
    riskPercent = "10–20% AKI";
  } else {
    riskLevel = "Very High Risk";
    riskPercent = ">30% AKI";
  }

  document.getElementById("sparkResult").innerHTML =
    `Score: ${score}<br>${riskLevel} – Estimated AKI Risk: ${riskPercent}`;
}

function calculateKheterpal() {

  let score = 0;

  const age = Number(document.getElementById("kAge").value);

  const intraperitoneal = document.getElementById("kIntraperitoneal").checked;
  const aortic = document.getElementById("kAortic").checked;
  const renal = document.getElementById("kRenal").checked;
  const diabetes = document.getElementById("kDiabetes").checked;
  const chf = document.getElementById("kCHF").checked;
  const ascites = document.getElementById("kAscites").checked;
  const emergency = document.getElementById("kEmergency").checked;

  if (age > 56) score += 1;
  if (intraperitoneal) score += 1;
  if (aortic) score += 2;
  if (renal) score += 2;
  if (diabetes) score += 1;
  if (chf) score += 1;
  if (ascites) score += 2;
  if (emergency) score += 1;

  let riskClass = "";
  let riskPercent = "";

  if (score <= 2) {
    riskClass = "Class I";
    riskPercent = "0.2% Dialysis Risk";
  } else if (score <= 3) {
    riskClass = "Class II";
    riskPercent = "0.8% Dialysis Risk";
  } else if (score <= 5) {
    riskClass = "Class III";
    riskPercent = "1.8% Dialysis Risk";
  } else if (score <= 6) {
    riskClass = "Class IV";
    riskPercent = "3.3% Dialysis Risk";
  } else {
    riskClass = "Class V";
    riskPercent = "9% Dialysis Risk";
  }

  document.getElementById("kResult").innerHTML =
    `Score: ${score}<br>${riskClass} – Estimated Risk: ${riskPercent}`;
}
