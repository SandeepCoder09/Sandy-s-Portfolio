function showDevPopup() {
  const popup = document.getElementById("devPopup");
  const sound = document.getElementById("popupSound");
  const typingText = document.getElementById("typingText");
  const progressBar = document.getElementById("progressBar");
  const progressPercent = document.getElementById("progressPercent");

  popup.style.display = "flex";
  sound.play();

  // Typing effect text
  const text = 
    "Initializing system... █▓▒ Loading assets... █▓▒ Compiling project... █▓▒ Status: Under Development.";
  typingText.innerHTML = "";
  let i = 0;

  const typingInterval = setInterval(() => {
    typingText.innerHTML += text[i];
    i++;
    if (i >= text.length) clearInterval(typingInterval);
  }, 35);

  // Progress bar animation
  let progress = 0;
  const progressInterval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(progressInterval);
    } else {
      progress++;
      progressBar.style.width = progress + "%";
      progressPercent.innerText = progress + "%";
    }
  }, 40);
}

function closeDevPopup() {
  document.getElementById("devPopup").style.display = "none";
}