// ==========================
// DATA: ALL 8 UNITS (Unit 1 & 2 have MCQs; fill in 3-8 in this format)
// ==========================
const unitsData = {
  "Nursing Education": [
    {
      unitName: "Unit 1: Introduction to Theoretical Foundations",
      questions: [
        {
          questionText: "The all-round development drawing out the best of a child was envisaged by:",
          options: [
            "Swami Vivekananda",
            "Aurobindo Ghosh",
            "Mahatma Gandhi",
            "Dr Radhakrishnan"
          ],
          correctAnswer: "Mahatma Gandhi"
        },
        {
          questionText: "Reconstruction is termed:",
          options: [
            "Critical thinking theory",
            "Assumption theory",
            "Inclusion theory",
            "Exclusion theory"
          ],
          correctAnswer: "Critical thinking theory"
        },
        // ... all remaining Unit 1 MCQs ...
        {
          questionText: "The stages of learning are:",
          options: [
            "Cognitive, associate and disassociate",
            "Cognitive, autonomous and captive",
            "Cognitive, associative and autonomous",
            "Cognitive, associative and behavior"
          ],
          correctAnswer: "Cognitive, associative and autonomous"
        }
      ]
    },
    {
      unitName: "Unit 2: Assessment and Planning",
      questions: [
        {
          questionText: "Factors influencing selection of clinical learning experience except:",
          options: [
            "Allowing students to practise and make decision",
            "Relationship with clinical staff",
            "Mentoring done by teaching and clinical staff",
            "Innovative and creative clinical environment"
          ],
          correctAnswer: "Allowing students to practise and make decision"
        },
        {
          questionText: "The learning outcomes in clinical setting should be focused on:",
          options: [
            "Students ability to focus on interpersonal/relationship",
            "Student ability to work without supervision",
            "Student knowledge to be focused",
            "Student behavior to be focused interms of application of theory in practice"
          ],
          correctAnswer: "Student behavior to be focused interms of application of theory in practice"
        },
        // ... all remaining Unit 2 MCQs ...
        {
          questionText: "Quality of a effective teacher is :",
          options: [
            "Control over the class",
            "Delivering of information in limited period",
            "Inspiring students to learn",
            "Amends the carefully assignments"
          ],
          correctAnswer: "Inspiring students to learn"
        }
      ]
    },
    // Fill units 3–8 in exactly this same format.
    { unitName: "Unit 3: Implementation", questions: [ /* ... */ ] },
    { unitName: "Unit 4: Teaching in the Clinical Setting", questions: [ /* ... */ ] },
    { unitName: "Unit 5: Educational/Teaching Media", questions: [ /* ... */ ] },
    { unitName: "Unit 6: Assessment and Evaluation Methodologies", questions: [ /* ... */ ] },
    { unitName: "Unit 7: Guidance/Academic Advising Counseling and Discipline", questions: [ /* ... */ ] },
    { unitName: "Unit 8: Ethics and Evidence-Based Teaching in Nursing Education", questions: [ /* ... */ ] }
  ]
};

// ========== STATE (with unlock/complete logic persisted) ==========
const UNLOCK_KEY = "ne_mcq_units_unlocked";
const COMPLETE_KEY = "ne_mcq_units_completed";

// Initialize unlock state: only first unit unlocked by default.
function initUnitProgress() {
  let unlocked = JSON.parse(localStorage.getItem(UNLOCK_KEY));
  let completed = JSON.parse(localStorage.getItem(COMPLETE_KEY));
  if (!Array.isArray(unlocked) || unlocked.length !== 8) unlocked = [true, false, false, false, false, false, false, false];
  if (!Array.isArray(completed) || completed.length !== 8) completed = [false, false, false, false, false, false, false, false];
  return { unlocked, completed };
}

function saveUnitProgress(unlocked, completed) {
  localStorage.setItem(UNLOCK_KEY, JSON.stringify(unlocked));
  localStorage.setItem(COMPLETE_KEY, JSON.stringify(completed));
}

let { unlocked, completed } = initUnitProgress();
let currentUnitIdx = 0;
let currentQuestionIdx = 0;
let score = 0;
let answers = [];

// ========== UI LOGIC ==========
function showUnits() {
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Units</h2><ul class="unit-list"></ul>';
  const list = app.querySelector('.unit-list');
  unitsData["Nursing Education"].forEach((unit, idx) => {
    const li = document.createElement('li');
    li.className = "unit";
    if (!unlocked[idx]) li.classList.add("locked");
    if (completed[idx]) li.classList.add("completed");
    li.textContent = unit.unitName;
    if (completed[idx]) {
      li.title = "Completed! All answers correct.";
    } else if (!unlocked[idx]) {
      li.title = "Unlock this unit by scoring 100% on the previous unit.";
    } else {
      li.title = "Start quiz for this unit";
    }
    li.tabIndex = unlocked[idx] ? 0 : -1;
    if (unlocked[idx]) {
      li.onclick = () => startQuiz(idx);
    }
    list.appendChild(li);
  });

  // Show banner if a new unit is unlocked
  if (unlocked.some((u, idx) => u && !completed[idx] && idx > 0 && !unlocked[idx-1])) {
    app.innerHTML += `
      <div style="margin-top:20px; background:linear-gradient(90deg,#cdf9e7,#f1fff9 80%);
                  color:#167255;padding:15px 12px;border-radius:8px;font-weight:600;
                  border:1.5px solid #b5efdf;font-size:1.05rem;text-align:center">
        🎉 Congrats! You’ve unlocked a new unit. Keep going for perfection!
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
    <h2>${unit.unitName}</h2>
    <div class="progress">Q${currentQuestionIdx + 1} / ${unit.questions.length}</div>
    <div class="question">${question.questionText}</div>
    <div class="options" id="options"></div>
    <button class="back-btn" onclick="showUnits()">⬅ Back to Units</button>
  `;
  question.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.onclick = () => submitAnswer(opt);
    document.getElementById('options').appendChild(btn);
  });
}

function submitAnswer(selected) {
  const unit = unitsData["Nursing Education"][currentUnitIdx];
  const question = unit.questions[currentQuestionIdx];
  answers.push({
    question: question.questionText,
    options: question.options,
    selected,
    correct: question.correctAnswer
  });
  if (selected === question.correctAnswer) score++;
  currentQuestionIdx++;
  if (currentQuestionIdx < unit.questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const unit = unitsData["Nursing Education"][currentUnitIdx];
  const app = document.getElementById('app');
  const isPerfect = score === unit.questions.length;
  // Update completion state
  completed[currentUnitIdx] = isPerfect;
  if (isPerfect && currentUnitIdx < 7 && !unlocked[currentUnitIdx + 1]) {
    unlocked[currentUnitIdx + 1] = true;
  }
  saveUnitProgress(unlocked, completed);

  let comment = isPerfect ? "Perfect! This unit is complete and the next is unlocked." :
                score / unit.questions.length > 0.8 ? "Excellent! Try again for a perfect score and unlock the next unit." :
                score / unit.questions.length > 0.6 ? "Good effort. Try to master all questions for progress." :
                "Keep practicing! Review the correct answers below.";

  app.innerHTML = `
    <div class="score-card">
      <div class="score">Your Score: ${score} / ${unit.questions.length}</div>
      <div class="score-comment">${comment}</div>
      ${isPerfect ? `<div style="color:#19a659;margin-top:6px;font-weight:700;font-size:1.14em;">🎉 Unit Unlocked!</div>` : ""}
    </div>
    <div class="result-list">
      ${answers.map((a, i) => `
        <div class="result-question">
          <span class="q-title">Q${i + 1}. ${a.question}</span>
          <div>
            Your answer: 
              <span class="${a.selected === a.correct ? 'correct' : 'wrong'}">
                ${a.selected}
                ${a.selected === a.correct 
                  ? '<span class="result-correct-icon">✔️</span>'
                  : '<span class="result-wrong-icon">❌</span>'
                }
              </span>
          </div>
          <div>
            Correct answer: <span class="correct">${a.correct}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <button class="retry-btn" onclick="startQuiz(${currentUnitIdx})">Try This Unit Again</button>
    <button class="back-btn" onclick="showUnits()">⬅ Back to Units</button>
  `;
}

// ========== BOOTSTRAP ==========
window.showUnits = showUnits;
window.startQuiz = startQuiz;
document.addEventListener("DOMContentLoaded", showUnits);
