const quotes = [
  // 10-word quotes
  "Stay hungry, stay foolish, and never stop chasing dreams.",
  "Success is built daily through small consistent efforts.",
  "Make each day your masterpiece, not someone else's dream.",
  "Creativity takes courage and belief in your own vision.",
  "You only fail when you stop trying and believing.",
  "Discipline is choosing between what you want now.",
  "Live boldly, take risks, and never regret a challenge.",
  "Greatness is a habit built by repeated small wins.",
  "Silence is better than meaningless words or loud ego.",
  "Happiness is homemade, crafted with gratitude and love.",

  // 25-word quotes
  "The only limit to our realization of tomorrow is our doubts of today. Let us move forward with strong and active faith in ourselves.",
  "Failure will never overtake me if my determination to succeed is strong enough. Success comes to those who persist beyond pain and fear.",
  "You have power over your mind—not outside events. Realize this, and you will find strength, peace, and clarity even in the hardest times.",
  "The future depends on what you do today. Every little effort you put in now lays the foundation for greater success and happiness tomorrow.",
  "Believe in yourself. Push your limits. Do whatever it takes to conquer your goals and rise above obstacles. You are stronger than you think.",
  "Growth is painful. Change is painful. But nothing is as painful as staying stuck somewhere you don't belong. Evolve, learn, and break free.",
  "Do not go where the path may lead. Instead, go where there is no path and leave a trail that others may follow with courage.",
  "You don't have to be great to start. But you have to start to become great. Consistent effort brings extraordinary transformation over time.",
  "Dream big. Start small. Act now. Those who wait lose time. Those who act create waves. Time rewards those who value and use it.",
  "Your life is your message to the world. Make it inspiring, bold, and honest. Speak through your actions and write your legacy with passion.",

  // 50-word quotes
  "Life isn't about waiting for the storm to pass. It's about learning to dance in the rain. Your mindset shapes your reality, so choose optimism over fear, and resilience over giving up. Every setback is a setup for a comeback if you are willing to see the lesson and keep moving forward.",
  "Success doesn't come overnight. It's built through dedication, patience, and effort repeated consistently over time. Stay focused even when results seem distant. Your discipline and persistence today will pay off tomorrow. The journey is long, but every step counts. Celebrate small wins and keep climbing. Your future self will thank you.",
  "In a world full of noise, be the calm voice of reason. Speak less, observe more. Lead with kindness, think with clarity, and act with courage. What you do in silence will echo loudly in the future. Be intentional in every choice and walk the path of authenticity and truth.",
  "You may not control all events that happen to you, but you can decide not to be reduced by them. Strength is born in struggle. Growth lies in discomfort. Don't fear change; embrace it with open arms. Your greatest evolution begins where your comfort zone ends. Keep rising, always forward.",
  "The most powerful weapon you have is your mind. Train it daily with positive thoughts, meaningful goals, and clear intentions. Doubt will whisper, but faith must shout louder. Don't let fear write your story. You are capable of far more than you know. Keep believing and striving toward your dreams.",
  "Every expert was once a beginner. Don't be afraid to start small. Practice builds mastery. Effort builds results. Trust the process. Focus on learning, not just winning. Let curiosity guide you, not fear. With time, even the most uncertain path becomes clear. Be patient, stay consistent, and show up every single day.",
  "Sometimes the bravest thing you can do is keep going when everything tells you to stop. Hope lives in small moments. Courage lives in quiet persistence. Believe in what you're doing. Trust in who you're becoming. The world may not notice your effort today, but your future self certainly will.",
  "Nothing worthwhile comes easily. Hard work, sacrifice, and discipline are non-negotiables for greatness. You will be tested. You will doubt. But every moment you choose to continue, you are building something that will outlast the struggle. Keep your focus. Stay grounded in your purpose, and the results will follow.",
  "Your thoughts become words, your words become actions, and your actions define your destiny. So speak with purpose, act with courage, and think with hope. Don't underestimate the power of one decision, one step, or one moment of belief. You are always one mindset shift away from a better future.",
  "We all face doubt, fear, and failure, but these don't define us—our response does. Will you rise after falling? Will you believe in yourself when no one else does? Your story is not over. There is more ahead. Keep your head high, your heart open, and your spirit unbreakable."
];

let currentQuote = "";
let timer;
let timeLeft = 30;
let selectedTime = 30;
let timerRunning = false;
let selectedWordCount = 9;
let filteredQuotes = [];

const display = document.getElementById("wordsDisplay");
const input = document.getElementById("inputField");
const results = document.getElementById("results");
const countdownDisplay = document.getElementById("countdownDisplay");

function setTime(seconds) {
  selectedTime = seconds;
  resetTest();
}

function setWords(wordCount) {
  selectedWordCount = wordCount;
  filteredQuotes = quotes.filter(q => q.split(" ").length === selectedWordCount);

  if (filteredQuotes.length === 0) {
    display.innerHTML = `<span style="color: red;">No quotes found with ${selectedWordCount} words.</span>`;
    input.disabled = true;
    return;
  }

  startTest();
}

function startTest() {
  input.disabled = false;
  input.value = "";
  input.focus();
  results.innerHTML = "";
  countdownDisplay.innerText = "";
  timerRunning = false;
  clearInterval(timer);
  timeLeft = selectedTime;

  if (filteredQuotes.length === 0) {
    filteredQuotes = quotes.filter(q => q.split(" ").length === selectedWordCount);
  }

  currentQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];

  display.innerHTML = currentQuote
    .split("")
    .map((char, i) => `<span id="char-${i}">${char}</span>`)
    .join("");
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    countdownDisplay.innerText = `⏱ ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      finishTest(true);
    }
  }, 1000);
}

function finishTest(timeExpired) {
  input.disabled = true;

  const typedText = input.value;
  const totalTypedWords = typedText.trim().split(/\s+/).length;
  const totalCorrectChars = [...display.querySelectorAll(".correct")].length;
  const timeTaken = selectedTime - timeLeft;
  const wpm = Math.round((totalTypedWords / timeTaken) * 60);
  const accuracy = Math.round((totalCorrectChars / currentQuote.length) * 100);

  results.innerHTML = `
    <p><strong>${timeExpired ? "Time's up!" : "Test complete!"}</strong></p>
    <p><strong>WPM:</strong> ${isNaN(wpm) ? 0 : wpm}</p>
    <p><strong>Accuracy:</strong> ${accuracy}%</p>
  `;
}

function resetTest() {
  clearInterval(timer);
  timerRunning = false;
  timeLeft = selectedTime;
  startTest();
}

input.addEventListener("input", () => {
  if (!timerRunning) {
    timerRunning = true;
    startTimer();
  }

  const typedText = input.value;
  const quoteChars = currentQuote.split("");

  quoteChars.forEach((char, index) => {
    const span = document.getElementById(`char-${index}`);
    const typedChar = typedText[index];

    if (typedChar == null) {
      span.className = "";
    } else if (typedChar === char) {
      span.className = "correct";
    } else {
      span.className = "incorrect";
    }
  });

  if (typedText === currentQuote) {
    clearInterval(timer);
    finishTest(false);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  setWords(9);
});