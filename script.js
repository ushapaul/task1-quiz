const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "HyperText Markup Language",
      "HyperText Machine Language",
      "HighText Marking Language"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "What does JavaScript primarily do in web development?",
    options: ["Structure", "Style", "Interactivity", "Database"],
    answer: "Interactivity"
  },
  {
    question: "What does `===` do in JavaScript?",
    options: ["Compares values only", "Compares values and types", "Assigns a value", "Checks only type"],
    answer: "Compares values and types"
  },
  {
    question: "Which is a JavaScript data type?",
    options: ["number", "digit", "character", "decimal"],
    answer: "number"
  },
  {
    question: "What is `typeof []`?",
    options: ["array", "object", "list", "undefined"],
    answer: "object"
  },
  {
    question: "What will `Boolean(0)` return?",
    options: ["true", "false", "null", "undefined"],
    answer: "false"
  },
  {
    question: "Which method loops through an array?",
    options: ["forEach()", "loop()", "each()", "iterate()"],
    answer: "forEach()"
  },
  {
    question: "How do you define a function in JS?",
    options: ["function myFunc() {}", "def myFunc()", "fun myFunc()", "function:myFunc()"],
    answer: "function myFunc() {}"
  },
  {
    question: "Which method joins two strings?",
    options: ["append()", "concat()", "attach()", "combine()"],
    answer: "concat()"
  }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("high-score");
const progress = document.getElementById("progress");

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
  currentIndex = 0;
  score = 0;
  startScreen.classList.add("hidden");
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  resetTimer();
  const current = questions[currentIndex];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

  // Shuffle options
  const shuffledOptions = [...current.options].sort(() => Math.random() - 0.5);
  shuffledOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    const li = document.createElement("li");
    li.appendChild(btn);
    optionsEl.appendChild(li);
  });

  updateProgressBar();
  startTimer();
}

function checkAnswer(selected) {
  stopTimer();
  const correct = questions[currentIndex].answer;
  if (selected === correct) {
    score++;
    alert("✅ Correct!");
  } else {
    alert(`❌ Incorrect! Correct answer: ${correct}`);
  }
  nextQuestion();
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;

  // High score tracking
  const oldHigh = localStorage.getItem("highScore") || 0;
  if (score > oldHigh) {
    localStorage.setItem("highScore", score);
    highScoreEl.textContent = `${score} (New Record 🎉)`;
  } else {
    highScoreEl.textContent = oldHigh;
  }
}

function startTimer() {
  timeLeft = 15;
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      stopTimer();
      alert("⏰ Time's up!");
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeEl.textContent = 15;
}

function stopTimer() {
  clearInterval(timer);
}

function updateProgressBar() {
  const percent = (currentIndex / questions.length) * 100;
  progress.style.width = `${percent}%`;
}
