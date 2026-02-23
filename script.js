const startBtn = document.getElementById("startBtn");
const quizBox = document.getElementById("quizBox");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("resultBox");
const progressBar = document.getElementById("progressBar");

let currentQuestion = 0;
let selectedType = null;

let scores = {
  "Leader": 0,
  "Creative Thinker": 0,
  "Analytical Mind": 0,
  "Social Butterfly": 0,
  "Adventurer": 0
};

const questions = [
  {
    question: "You prefer working:",
    options: [
      { text: "Leading a team", type: "Leader" },
      { text: "Designing something new", type: "Creative Thinker" },
      { text: "Solving logical problems", type: "Analytical Mind" },
      { text: "With friends", type: "Social Butterfly" }
    ]
  },
  {
    question: "Your weekend plan:",
    options: [
      { text: "Organize event", type: "Leader" },
      { text: "Art or music", type: "Creative Thinker" },
      { text: "Read research", type: "Analytical Mind" },
      { text: "Party time", type: "Social Butterfly" }
    ]
  },
  {
    question: "You enjoy:",
    options: [
      { text: "Taking charge", type: "Leader" },
      { text: "Creative ideas", type: "Creative Thinker" },
      { text: "Data analysis", type: "Analytical Mind" },
      { text: "Meeting people", type: "Social Butterfly" }
    ]
  },
  {
    question: "In challenges you:",
    options: [
      { text: "Lead solution", type: "Leader" },
      { text: "Think different", type: "Creative Thinker" },
      { text: "Analyze deeply", type: "Analytical Mind" },
      { text: "Ask support", type: "Social Butterfly" }
    ]
  },
  {
    question: "Your strength:",
    options: [
      { text: "Confidence", type: "Leader" },
      { text: "Imagination", type: "Creative Thinker" },
      { text: "Logic", type: "Analytical Mind" },
      { text: "Communication", type: "Social Butterfly" }
    ]
  },
  {
    question: "Dream career:",
    options: [
      { text: "CEO", type: "Leader" },
      { text: "Designer", type: "Creative Thinker" },
      { text: "Scientist", type: "Analytical Mind" },
      { text: "Influencer", type: "Social Butterfly" }
    ]
  },
  {
    question: "You take decisions:",
    options: [
      { text: "Boldly", type: "Leader" },
      { text: "Creatively", type: "Creative Thinker" },
      { text: "Logically", type: "Analytical Mind" },
      { text: "Emotionally", type: "Social Butterfly" }
    ]
  },
  {
    question: "Adventure sounds:",
    options: [
      { text: "Leadership camp", type: "Leader" },
      { text: "Art tour", type: "Creative Thinker" },
      { text: "Science expo", type: "Analytical Mind" },
      { text: "Travel with friends", type: "Adventurer" }
    ]
  }
];

startBtn.onclick = () => {
  startBtn.classList.add("hide");
  quizBox.classList.remove("hide");
  showQuestion();
};

function showQuestion() {
  let q = questions[currentQuestion];
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";
  selectedType = null;

  q.options.forEach(option => {
    let btn = document.createElement("button");
    btn.innerText = option.text;

    btn.onclick = () => {
      selectedType = option.type;
    };

    optionsEl.appendChild(btn);
  });

  progressBar.style.width =
    ((currentQuestion / questions.length) * 100) + "%";
}

nextBtn.onclick = () => {
  if (!selectedType) {
    alert("Please select an option!");
    return;
  }

  scores[selectedType]++;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");

  let maxType = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  let descriptions = {
    "Leader": "You are confident, bold and love taking charge. People trust your decisions.",
    "Creative Thinker": "You are imaginative and full of innovative ideas.",
    "Analytical Mind": "You think logically and solve complex problems easily.",
    "Social Butterfly": "You love interacting and making new connections.",
    "Adventurer": "You enjoy exploring new places and experiences."
  };

  let emojis = {
    "Leader": "👑",
    "Creative Thinker": "🎨",
    "Analytical Mind": "🧠",
    "Social Butterfly": "🦋",
    "Adventurer": "🌍"
  };

  let percentage = Math.round((scores[maxType] / questions.length) * 100);

  localStorage.setItem("personalityResult", maxType);

  resultBox.innerHTML = `
    <h2>${emojis[maxType]} ${maxType}</h2>
    <p>${descriptions[maxType]}</p>
    <h3>Score: ${percentage}%</h3>
    <button class="btn" onclick="restartQuiz()">Restart Quiz</button>
  `;

  changeBackground(maxType);
}

function changeBackground(type) {
  const colors = {
    "Leader": "linear-gradient(135deg,#ff512f,#dd2476)",
    "Creative Thinker": "linear-gradient(135deg,#00c6ff,#0072ff)",
    "Analytical Mind": "linear-gradient(135deg,#43cea2,#185a9d)",
    "Social Butterfly": "linear-gradient(135deg,#f7971e,#ffd200)",
    "Adventurer": "linear-gradient(135deg,#11998e,#38ef7d)"
  };
  document.body.style.background = colors[type];
}

function restartQuiz() {
  location.reload();
}