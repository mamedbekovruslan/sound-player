import "./main.scss";

let currentSound = null;
let isPlaying = false;
let globalVolume = 0.5;

const sounds = {
  rain: new Audio(),
  summer: new Audio(),
  winter: new Audio(),
};

const elements = {
  background: document.querySelector(".background"),
  volume: document.getElementById("volume"),
  buttons: document.querySelectorAll(".sound-btn"),
  backgroundImages: {
    rain: "",
    summer: "",
    winter: "",
  },
};

function initApp() {
  loadResources();

  setupSounds();

  setupEventListeners();

  elements.volume.value = globalVolume;
}

function loadResources() {
  elements.backgroundImages.rain = require("../src/assets/rainy-bg.jpg");
  elements.backgroundImages.summer = require("../src/assets/summer-bg.jpg");
  elements.backgroundImages.winter = require("../src/assets/winter-bg.jpg");
}

function setupSounds() {
  sounds.rain.src = require("../src/assets/sounds/rain.mp3");
  sounds.summer.src = require("../src/assets/sounds/summer.mp3");
  sounds.winter.src = require("../src/assets/sounds/winter.mp3");

  Object.values(sounds).forEach((sound) => {
    sound.loop = true;
    sound.volume = globalVolume;
  });
}

function setupEventListeners() {
  // Регулятор громкости
  elements.volume.addEventListener("input", handleVolumeChange);

  elements.buttons.forEach((button) => {
    button.addEventListener("click", () => handleSoundButtonClick(button));
  });
}

function handleVolumeChange() {
  globalVolume = parseFloat(elements.volume.value);

  Object.values(sounds).forEach((sound) => {
    sound.volume = globalVolume;
  });
}

function handleSoundButtonClick(button) {
  const soundType = button.dataset.sound;

  if (currentSound === soundType) {
    togglePlayPause(button);
  } else {
    if (currentSound) {
      stopSound(currentSound);
      resetButton(currentSound);
    }

    playSound(soundType, button);

    setBackground(soundType);
  }
}

function togglePlayPause(button) {
  if (isPlaying) {
    sounds[currentSound].pause();
    button.classList.remove("active");
  } else {
    sounds[currentSound].play();
    button.classList.add("active");
  }
  isPlaying = !isPlaying;
}

function playSound(soundType, button) {
  sounds[soundType].play();
  currentSound = soundType;
  isPlaying = true;
  button.classList.add("active");
}

function stopSound(soundType) {
  sounds[soundType].pause();
  sounds[soundType].currentTime = 0;
}

function resetButton(soundType) {
  document
    .querySelector(`[data-sound="${soundType}"]`)
    .classList.remove("active");
}

function setBackground(soundType) {
  elements.background.style.backgroundImage = `url(${elements.backgroundImages[soundType]})`;
}

document.addEventListener("DOMContentLoaded", initApp);
