import "./main.scss";

type SoundType = 'rain' | 'summer' | 'winter';

interface AppElements {
  container: HTMLElement | null;
  background: HTMLElement | null;
  volume: HTMLInputElement | null;
  buttons: NodeListOf<HTMLButtonElement>;
  backgroundImages: Record<SoundType, string>;
  icons: Record<SoundType, string>;
}


interface SoundSources {
  rain: string;
  summer: string;
  winter: string;
}

const SoundPlayer = () => {
  let currentSound: SoundType | null = null;
  let isPlaying = false;
  let globalVolume = 0.5;
  const audioInstance = new Audio();

  const elements: AppElements = {
    container: document.querySelector(".buttons"),
    background: document.querySelector(".background"),
    volume: document.getElementById("volume") as HTMLInputElement,
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

  const soundSources: SoundSources = {
    rain: require("../src/assets/sounds/rain.mp3"),
    summer: require("../src/assets/sounds/summer.mp3"),
    winter: require("../src/assets/sounds/winter.mp3")
  };

  const setupAudio = (): void => {
    audioInstance.loop = true;
    audioInstance.volume = globalVolume;
    audioInstance.addEventListener('play', () => isPlaying = true);
    audioInstance.addEventListener('pause', () => isPlaying = false);
  };

  const setupIcons = (): void => {
    elements.buttons.forEach(button => {
      const soundType = button.dataset.sound as SoundType;
      const img = button.querySelector('img');
      if (img) img.src = elements.icons[soundType];
    });
  };

  const setupEventListeners = (): void => {
    if (elements.volume) {
      elements.volume.addEventListener("input", handleVolumeChange);
    }

    if (elements.container) {
      elements.container.addEventListener("click", (event: MouseEvent) => {
        const button = (event.target as HTMLElement).closest('.sound-btn') as HTMLButtonElement;
        if (button) handleSoundButtonClick(button);
      });
    }
  };

  const handleVolumeChange = (): void => {
    if (elements.volume) {
      globalVolume = parseFloat(elements.volume.value);
      audioInstance.volume = globalVolume;
    }
  };

  const handleSoundButtonClick = (button: HTMLButtonElement): void => {
    const soundType = button.dataset.sound as SoundType;
    soundType === currentSound ? togglePlayPause() : changeSound(soundType);
    updateButtonStates();
  };

  const togglePlayPause = (): void => {
    isPlaying ? audioInstance.pause() : audioInstance.play();
  };

  const changeSound = (soundType: SoundType): void => {
    if (isPlaying) audioInstance.pause();
    audioInstance.src = soundSources[soundType];
    currentSound = soundType;
    audioInstance.play().catch((e: Error) => console.error("Playback failed:", e));
    setBackground(soundType);
  };

  const updateButtonStates = (): void => {
    elements.buttons.forEach(button => {
      const soundType = button.dataset.sound as SoundType;
      button.classList.toggle("active", soundType === currentSound && isPlaying);
    });
  };

  const setBackground = (soundType: SoundType): void => {
    if (elements.background) {
      elements.background.style.backgroundImage = `url(${elements.backgroundImages[soundType]})`;
    }
  };

  const init = (): void => {
    setupAudio();
    setupIcons();
    setupEventListeners();
    if (elements.volume) {
      elements.volume.value = globalVolume.toString();
    }
  };

  return { init };
};

document.addEventListener("DOMContentLoaded", () => {
  SoundPlayer().init();
});