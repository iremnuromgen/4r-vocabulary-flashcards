const BACKGROUNDS = [
  "./assets/backgrounds/bg-1.png",
  "./assets/backgrounds/bg-2.png",
  "./assets/backgrounds/bg-3.png",
  "./assets/backgrounds/bg-4.png",
  "./assets/backgrounds/bg-5.png",
  "./assets/backgrounds/bg-6.png",
  "./assets/backgrounds/bg-7.png",
  "./assets/backgrounds/bg-8.png",
  "./assets/backgrounds/bg-9.png",
  "./assets/backgrounds/bg-10.png",
];

export function setRandomBackground() {
  const randomIndex = Math.floor(
    Math.random() * BACKGROUNDS.length
  );

  const background = BACKGROUNDS[randomIndex];

  document.body.style.backgroundImage = `url("${background}")`;
}