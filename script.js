const unitsData = {
  "Nursing Education": [
    // ---------- UNIT 1 ----------
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
        }
      ]
    },
    // ---------- UNIT 2 ----------
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
        }
      ]
    },
    // ---------- UNIT 3 ----------
    {
      unitName: "Unit 3: Implementation",
      questions: [
        {
          questionText: "_________________ refers to communication without the usage of words.",
          options: [
            "Object to object communication",
            "Communication by writing",
            "Nonverbal Communication",
            "Oral communication"
          ],
          correctAnswer: "Nonverbal Communication"
        },
        {
          questionText: "_________________ is the name of the person who sends the message.",
          options: [
            "Channel",
            "Sender",
            "Receiver",
            "Response"
          ],
          correctAnswer: "Sender"
        }
      ]
    },
    // ---------- UNIT 4 ----------
    {
      unitName: "Unit 4: Teaching in the Clinical Setting",
      questions: [
        {
          questionText: "The subjective data denotes:",
          options: [
            "Experience by the patient and reported to nurse",
            "Observed by the nurse",
            "Combination of patient experience and nurse’s observation",
            "None of the above"
          ],
          correctAnswer: "Experience by the patient and reported to nurse"
        },
        {
          questionText: "The objective data denotes:",
          options: [
            "Experience by the patient and reported to nurse",
            "Observed by the nurse",
            "Combination of patient experience and nurse’s observation",
            "All of the above"
          ],
          correctAnswer: "Observed by the nurse"
        }
      ]
    },
    // ---------- UNIT 5 ----------
    {
      unitName: "Unit 5: Educational/Teaching Media",
      questions: [
        {
          questionText: "Tele nursing refers to:",
          options: [
            "Utilization of information technology",
            "Utilization of information technology in provision of nursing service in the hospital",
            "Utilization of information technology in provision of nursing service from a distance",
            "It is synonym of tele medicine"
          ],
          correctAnswer: "Utilization of information technology in provision of nursing service from a distance"
        },
        {
          questionText: "E-learning platform models except:",
          options: [
            "MOOCs and blackboard learn",
            "Future learn and linkedin",
            "Skill share and coursera",
            "Chalk and Blackboard"
          ],
          correctAnswer: "Chalk and Blackboard"
        }
      ]
    },
    // ---------- UNIT 6 ----------
    {
      unitName: "Unit 6: Assessment and Evaluation Methodologies",
      questions: [
        {
          questionText: "Evaluation is a process of:",
          options: [
            "Appraisal in every aspect of life",
            "Teaching in graduate schools",
            "Method of teaching",
            "None of the above"
          ],
          correctAnswer: "Appraisal in every aspect of life"
        },
        {
          questionText: "To make evaluation easy, the expected learning outcomes need to be:",
          options: [
            "Specific and measurable",
            "Achievable",
            "Sample",
            "All of these"
          ],
          correctAnswer: "All of these"
        }
      ]
    },
    // ---------- UNIT 7 ----------
    {
      unitName: "Unit 7: Guidance/Academic Advising Counseling and Discipline",
      questions: [
        {
          questionText: "Empathy is defined as:",
          options: [
            "Feeling of helplessness",
            "Non-caring attitude",
            "Synonym of sympathy",
            "Patting oneself in someone else position"
          ],
          correctAnswer: "Patting oneself in someone else position"
        },
        {
          questionText: "In eclectic counseling the client and counselor works in:",
          options: [
            "Work in isolation",
            "Clients depend on counselor",
            "Coordinative method",
            "None of these"
          ],
          correctAnswer: "Coordinative method"
        }
      ]
    },
    // ---------- UNIT 8 ----------
    {
      unitName: "Unit 8: Ethics and Evidence-Based Teaching in Nursing Education",
      questions: [
        {
          questionText: "Strategies used in evidence-based teaching include all except:",
          options: [
            "Online and concept mapping",
            "Internet and game-based learning",
            "Problem-based learning case study",
            "Simulation and seminar"
          ],
          correctAnswer: "Problem-based learning case study"
        },
        {
          questionText: "Which of the following is an ethical principle that guide nursing practice?",
          options: [
            "Autonomy",
            "Utilitarian",
            "Virtue",
            "Care"
          ],
          correctAnswer: "Utilitarian"
        }
      ]
    }
  ]
};

const UNLOCK_KEY = "ne_mcq_units_unlocked";
const COMPLETE_KEY = "ne_mcq_units_completed";

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

function showUnits() {
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Units</h2><ul class="unit-list"></ul>';
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
    else li.title = "Start quiz for this unit";
    li.tabIndex = unlocked[idx] ? 0 : -1;
    if (unlocked[idx]) {
      li.onclick = () => startQuiz(idx);
    }
    list.appendChild(li);
  });
  // Unlock banner
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

// Init
window.showUnits = showUnits;
window.startQuiz = startQuiz;
document.addEventListener("DOMContentLoaded", showUnits);
