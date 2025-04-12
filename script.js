function showResults() {
  const pulse = parseInt(document.getElementById("pulseRate").value);
  const smart = parseInt(document.getElementById("smartData").value);
  const q1 = document.getElementById("q1").checked;
  const q2 = document.getElementById("q2").checked;
  const q3 = document.getElementById("q3").checked;

  let score = 0;
  if (pulse < 90 || pulse > 130) score++;
  if (smart > 80) score++;
  if (stableFrames < 100) score++;
  if (!q1) score++;
  if (!q2) score++;
  if (q3) score++;

  // Individual Results
  const brainResult = (pulse < 90 || pulse > 130) ? "Brain workload abnormal" : "Normal brain workload";
  const watchResult = (smart > 80) ? "Smartwatch data abnormal" : "Smartwatch vitals normal";
  const eyeResult = (stableFrames < 100) ? "Eye movement unstable" : "Eye movement stable";
  const questionResult = (!q1 || !q2 || q3) ? "Some traits detected" : "No significant traits";

  // Save to localStorage
  localStorage.setItem("brainResult", brainResult);
  localStorage.setItem("watchResult", watchResult);
  localStorage.setItem("eyeResult", eyeResult);
  localStorage.setItem("questionResult", questionResult);

  // Final Score-based Result
  let result = score >= 3
    ? "⚠️ High Possibility of Early Autism Symptoms. Seek professional advice."
    : "✅ Low Risk of Autism Symptoms. Keep monitoring.";

  localStorage.setItem("finalResult", result);
  document.getElementById("results").innerText = result;
}
