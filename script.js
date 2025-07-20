const unitsData = {
  "Nursing Education": [
    {
      unitName: "Unit 1: Introduction to Theoretical Foundations",
      questions: [
        // Paste Unit 1 MCQs here (format: {questionText, options: [], correctAnswer})
      ]
    },
    {
      unitName: "Unit 2: Assessment and Planning",
      questions: [
        // Paste Unit 2 MCQs here
      ]
    },
    {
      unitName: "Unit 3: Implementation",
      questions: [
        // Paste Unit 3 MCQs here
      ]
    },
    {
      unitName: "Unit 4: Teaching in the Clinical Setting",
      questions: [
        // Paste Unit 4 MCQs here
      ]
    },
    {
      unitName: "Unit 5: Educational/Teaching Media",
      questions: [
        // Paste Unit 5 MCQs here
      ]
    },
    {
      unitName: "Unit 6: Assessment and Evaluation Methodologies",
      questions: [
        // Paste Unit 6 MCQs here
      ]
    },
    {
      unitName: "Unit 7: Guidance/Academic Advising Counseling and Discipline",
      questions: [
        // Paste Unit 7 MCQs here
      ]
    },
    {
      unitName: "Unit 8: Ethics and Evidence-Based Teaching in Nursing Education",
      questions: [
        // Paste Unit 8 MCQs here
      ]
    }
  ]
};

const UNLOCK_KEY = "et_mcq_units_unlocked";
const COMPLETE_KEY = "et_mcq_units_completed";
const MASTER_UNLOCK_PHRASE = "Ahamad";

function initUnitProgress() {
  let unlocked = JSON.parse(localStorage.getItem(UNLOCK_KEY));
  let completed = JSON.parse(localStorage.getItem(COMPLETE_KEY));
  if (!Array.isArray(unlocked) || unlocked.length !== unitsData["Nursing Education"].length) unlocked = Array(unitsData["Nursing Education"].length).fill(false).map((_,i)=>i===0);
  if (!Array.isArray(completed) || completed.length !== unitsData["Nursing Education"].length) completed = Array(unitsData["Nursing Education"].length).fill(false);
  return { unlocked, completed };
}
function saveUnitProgress(unlocked, completed) {
  localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked));
  localStorage.setItem(COMPLETE_KEY, JSON.stringify(completed));
}

function masterUnlock() {
  const code = prompt("Enter unlock key:");
  if (code && code.trim().toLowerCase() === MASTER_UNLOCK_PHRASE.toLowerCase()) {
    unlocked = Array(unitsData["Nursing Education"].length).fill(true);
    saveUnitProgress(unlocked, completed);
    showUnits();
    alert("All units unlocked!");
  } else if (code !== null) {
    alert("Incorrect key. Please contact admin for the unlock key.");
  }
}

let { unlocked, completed } = initUnitProgress();
let currentUnitIdx = 0;
let currentQuestionIdx = 0;
let score = 0;
let answers = [];

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("unlockAllBtn");
  if (btn) btn.onclick = masterUnlock;
  showUnits();
});

function showUnits() {
  const app = document.getElementById('app');
  app.innerHTML = '<h2 style="font-family:Nunito,Arial,sans-serif;color:#1997c5;text-align:center;margin-bottom:29px;">Select a Unit</h2><ul class="unit-list"></ul>';
  const list = app.querySelector('.unit-list');
  unitsData["Nursing Education"].forEach((unit, idx) => {
    const li = document.createElement('li');
    li.className = "unit";
    if (!unlocked[idx]) li.classList.add("locked");
    if (completed[idx]) li.classList.add("completed");
    li.innerHTML = `
      <span>${unit.unitName}</span>
      <span class="mcq-count">${unit.questions.length} MCQs</span>
    `;
    if (completed[idx]) li.title = "Completed! All answers correct.";
    else if (!unlocked[idx]) li.title = "Unlock this unit by scoring 100% on the previous unit.";
    else li.title = "Tap to start this unit's quiz";
    li.tabIndex = unlocked[idx] ? 0 : -1;
    if (unlocked[idx]) {
      li.onclick = () => startQuiz(idx);
    }
    list.appendChild(li);
  });
  if (unlocked.some((u, idx) => u && !completed[idx] && idx > 0 && !unlocked[idx-1])) {
    app.innerHTML += `
      <div style="margin-top:20px; background:#eaf4e4;color:#19804d;padding:14px 13px;border-radius:8px;font-weight:700;font-size:1.09rem;text-align:center;">
        🎉 New unit unlocked!
      </div>
    `;
  }
}

function startQuiz(unitIdx) {
  currentUnitIdx = unitIdx;
  currentQuestionIdx = 0;
  score = 0;
  answers = [];
  showQuestion();
}
function showQuestion() {
  const unit = unitsData["Nursing Education"][currentUnitIdx];
  const question = unit.questions[currentQuestionIdx];
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2 style="font-family:Nunito,Arial,sans-serif;color:#1e679a;font-size:1.13rem;">${unit.unitName}</h2>
    <div class="progress">Q${currentQuestionIdx + 1} of ${unit.questions.length}</div>
    <div class="question">${question ? question.questionText : "No questions in this unit yet."}</div>
    <div class="options" id="options"></div>
    <button class="back-btn" onclick="showUnits()">⬅ Back to Units</button>
  `;
  if (question) {
    question.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.className = "option-btn";
      btn.onclick = () => submitAnswer(opt, btn);
      document.getElementById('options').appendChild(btn);
    });
  }
}

function submitAnswer(selected, btn) {
  const unit = unitsData["Nursing Education"][currentUnitIdx];
  const question = unit.questions[currentQuestionIdx];
  answers.push({
    question: question.questionText,
    options: question.options,
    selected,
    correct: question.correctAnswer
  });
  document.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === question.correctAnswer) b.classList.add('highlight-correct');
    if (b.textContent === selected && selected !== question.correctAnswer) b.classList.add('highlight-wrong');
  });

  if (selected === question.correctAnswer) score++;
  setTimeout(() => {
    currentQuestionIdx++;
    if (currentQuestionIdx < unit.questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 650);
}

function showResult() {
  const unit = unitsData["Nursing Education"][currentUnitIdx];
  const app = document.getElementById('app');
  const isPerfect = score === unit.questions.length && unit.questions.length > 0;
  completed[currentUnitIdx] = isPerfect;
  if (isPerfect && currentUnitIdx < unitsData["Nursing Education"].length - 1 && !unlocked[currentUnitIdx + 1]) {
    unlocked[currentUnitIdx + 1] = true;
  }
  saveUnitProgress(unlocked, completed);

  let comment = isPerfect ? "🌟 Perfect! This unit is complete, and the next is now unlocked." :
    score / (unit.questions.length || 1) > 0.8 ? "Great! Try again for a perfect score and unlock the next unit." :
    score / (unit.questions.length || 1) > 0.6 ? "Good job. Try again to master all questions." :
    "Keep practicing! Review the correct answers below.";

  app.innerHTML = `
    <div class="score-card">
      <div class="score" style="letter-spacing:.03em;">Your Score: ${score} / ${unit.questions.length}</div>
      <div class="score-comment">${comment}</div>
      ${isPerfect ? `<div style="color:#19a659;margin-top:9px;font-weight:800;font-size:1.21em;">🎉 Unit Unlocked!</div>` : ""}
    </div>
    <div class="result-list">
      ${answers.length === 0 ? `<div style="color:#987;">No questions in this unit yet.</div>` :
      answers.map((a, i) => `
        <div class="result-question">
          <span class="q-title"><b>Q${i + 1}.</b> ${a.question}</span>
          <div>
            Your answer:
            <span class="${a.selected === a.correct ? 'correct' : 'wrong'}">
              ${a.selected}
              ${a.selected === a.correct 
                ? '<span class="result-correct-icon">✔️</span>'
                : '<span class="result-wrong-icon">❌</span>'}
            </span>
          </div>
          <div>
            Correct answer: <span class="correct">${a.correct}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <button class="retry-btn" onclick="startQuiz(${currentUnitIdx})">🔄 Try This Unit Again</button>
    <button class="back-btn" onclick="showUnits()">⬅ Back to Units</button>
  `;
}

window.showUnits = showUnits;
window.startQuiz = startQuiz;
