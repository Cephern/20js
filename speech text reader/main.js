const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/pikachu.png",
    text: "I'm Shocked",
  },
  {
    image: "./img/noice.png",
    text: "BallGASM",
  },
  {
    image: "./img/luv.jpg",
    text: "Just Luv",
  },
  {
    image: "./img/pikachu.png",
    text: "I'm Shocked",
  },
  {
    image: "./img/noice.png",
    text: "BallGASM",
  },
  {
    image: "./img/luv.jpg",
    text: "Just Luv",
  },
  {
    image: "./img/pikachu.png",
    text: "I'm Shocked",
  },
  {
    image: "./img/noice.png",
    text: "BallGASM",
  },
  {
    image: "./img/luv.jpg",
    text: "Just Luv",
  },
];

// create UI boxes
function createBox(item) {
  const { image, text } = item;

  const box = document.createElement("div");

  box.classList.add("box");
  box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

//  Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Inits
data.forEach(createBox);

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

toggleBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

voicesSelect.addEventListener("change", setVoice);

readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
