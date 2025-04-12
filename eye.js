const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const timerDisplay = document.getElementById('timer');
const resultBox = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const ctx = canvas.getContext('2d');

let eyeMovementCount = 0;
let lastEyeX = null;
let eyeActivityLevel = "";

// Setup FaceMesh
const faceMesh = new FaceMesh({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
});

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

faceMesh.onResults(results => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (results.multiFaceLandmarks.length > 0) {
    const landmarks = results.multiFaceLandmarks[0];
    const leftEyeX = landmarks[468].x;

    if (lastEyeX !== null && Math.abs(leftEyeX - lastEyeX) > 0.01) {
      eyeMovementCount++;
    }

    lastEyeX = leftEyeX;
  }
});

// Setup camera
const camera = new Camera(video, {
  onFrame: async () => {
    await faceMesh.send({ image: video });
  },
  width: 640,
  height: 480
});

camera.start();

let countdown = 30;
timerDisplay.textContent = countdown;

const countdownTimer = setInterval(() => {
  countdown--;
  timerDisplay.textContent = countdown;

  if (countdown <= 0) {
    clearInterval(countdownTimer);
    camera.stop();
    faceMesh.close();

    // Compute result and SHOW IT IMMEDIATELY
    eyeActivityLevel = eyeMovementCount > 20 ? "High chances of Autism" : "Low chances of Autism";
    
    localStorage.setItem("eyeResult", eyeActivityLevel);
    localStorage.setItem("eyeMovementCount", eyeMovementCount);

    resultBox.innerHTML = `
      <strong>Eye Activity:</strong> ${eyeActivityLevel}<br/>
      <strong>Movements Detected:</strong> ${eyeMovementCount}
    `;

    // Show the button to move forward
    nextBtn.style.display = "inline-block";
  }
}, 1000);

// Redirect on next
nextBtn.addEventListener("click", () => {
  window.location.href = "questions.html";
});
