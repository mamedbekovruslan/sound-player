import "./main.scss";

const SoundPlayer = () => {
  let currentSound = null;
  let isPlaying = false;
  let globalVolume = 0.5;
  const audioInstance = new Audio();

  const elements = {
    container: document.querySelector(".buttons"),
    background: document.querySelector(".background"),
    volume: document.getElementById("volume"),
    buttons: document.querySelectorAll(".sound-btn"),
    backgroundImages: {
      rain: require("../src/assets/rainy-bg.jpg"),
      summer: require("../src/assets/summer-bg.jpg"),
      winter: require("../src/assets/winter-bg.jpg"),
    },
    icons: {
      rain: require("../src/assets/icons/cloud-rain.svg"),
      summer: require("../src/assets/icons/sun.svg"),
      winter: require("../src/assets/icons/cloud-snow.svg"),
    }
  };

  const soundSources = {
    rain: require("../src/assets/sounds/rain.mp3"),
    summer: require("../src/assets/sounds/summer.mp3"),
    winter: require("../src/assets/sounds/winter.mp3")
  };

  const init = () => {
    setupAudio();
    setupIcons();
    setupEventListeners();
    elements.volume.value = globalVolume;
  };

  const setupAudio = () => {
    audioInstance.loop = true;
    audioInstance.volume = globalVolume;
    audioInstance.addEventListener('play', () => isPlaying = true);
    audioInstance.addEventListener('pause', () => isPlaying = false);
  };

  const setupIcons = () => {
    elements.buttons.forEach(button => {
      const soundType = button.dataset.sound;
      const img = button.querySelector('img');
      if (img) img.src = elements.icons[soundType];
    });
  };

  const setupEventListeners = () => {
    elements.volume.addEventListener("input", handleVolumeChange);
    elements.container.addEventListener("click", (event) => {
      const button = event.target.closest('.sound-btn');
      if (button) handleSoundButtonClick(button);
    });
  };

  const handleVolumeChange = () => {
    globalVolume = parseFloat(elements.volume.value);
    audioInstance.volume = globalVolume;
  };

  const handleSoundButtonClick = (button) => {
    const soundType = button.dataset.sound;
    soundType === currentSound ? togglePlayPause() : changeSound(soundType);
    updateButtonStates();
  };

  const togglePlayPause = () => {
    isPlaying ? audioInstance.pause() : audioInstance.play();
  };

  const changeSound = (soundType) => {
    if (isPlaying) audioInstance.pause();
    audioInstance.src = soundSources[soundType];
    currentSound = soundType;
    audioInstance.play().catch(e => console.error("Playback failed:", e));
    setBackground(soundType);
  };

  const updateButtonStates = () => {
    elements.buttons.forEach(button => {
      const soundType = button.dataset.sound;
      button.classList.toggle("active", soundType === currentSound && isPlaying);
    });
  };

  const setBackground = (soundType) => {
    elements.background.style.backgroundImage = `url(${elements.backgroundImages[soundType]})`;
  };

  return { init };
};

document.addEventListener("DOMContentLoaded", () => {
  SoundPlayer().init();
});