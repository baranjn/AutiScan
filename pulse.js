function calculateBrainLoad() {
  const pulse = parseInt(document.getElementById("pulse").value);
  const spo2 = parseInt(document.getElementById("spo2").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(pulse) || isNaN(spo2)) {
    resultDiv.textContent = "❌ Please enter both values.";
    resultDiv.style.color = "red";
    return;
  }

  const workload = ((pulse / spo2) * 100).toFixed(2);
  const workloadScore = parseFloat(workload);

  let remark = "";
  if (workloadScore < 95) {
    remark = "🟢 Normal Brain Load";
    resultDiv.style.color = "green";
  } else if (workloadScore < 115) {
    remark = "🟡 Moderate Brain Load";
    resultDiv.style.color = "orange";
  } else {
    remark = "🔴 High Brain Load - May Need Attention";
    resultDiv.style.color = "red";
  }

  resultDiv.innerHTML = `Brain Workload Index: <strong>${workload}</strong><br>${remark}`;

  // Save result and redirect
  const brainResult = workloadScore > 115 ? "Abnormal brain workload" : "Normal brain workload";
  localStorage.setItem("brainResult", brainResult);

  // Optional delay to let user see the result before redirecting
  setTimeout(() => {
    window.location.href = "smartwatch.html";
  }, 1500);
}
