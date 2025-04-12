function calculateSmartwatchMetrics() {
  const heartRate = parseInt(document.getElementById('heartRate').value);
  const steps = parseInt(document.getElementById('steps').value);
  const stress = parseInt(document.getElementById('stress').value);
  const sleep = parseFloat(document.getElementById('sleep').value);

  let resultText = '';

  if (isNaN(heartRate) || isNaN(steps) || isNaN(stress) || isNaN(sleep)) {
    resultText = '⚠️ Please fill in all the fields correctly.';
  } else {
    let wellnessScore = 100;

    if (heartRate > 100 || heartRate < 50) wellnessScore -= 15;
    if (stress > 70) wellnessScore -= 20;
    if (sleep < 6) wellnessScore -= 10;
    if (steps < 3000) wellnessScore -= 10;

    resultText = `🧠 Estimated Wellness Score: <strong>${wellnessScore}</strong>/100<br>`;
    resultText += wellnessScore >= 70
      ? '✅ You seem to be in a good range!'
      : '⚠️ You might need some rest or de-stress techniques.';
  }

  document.getElementById('result').innerHTML = resultText;
}
const watchResult = heartRate > 100 ? "Elevated physiological stress" : "Normal smartwatch vitals";
localStorage.setItem("watchResult", watchResult);
