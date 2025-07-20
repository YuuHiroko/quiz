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
        }
      ]
    },
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
          correctAnswer: "Experience by the patient and reported to nurse" // Note: As per attached, this matches the answer style.
        }
      ]
    },
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
  if (!Array.isArray(unlocked) || unlocked.length !== unitsData["Nursing Education"].length) unlocked = Array(unitsData["Nursing Education"].length).fill(false).map((_,i)=>i===0);
  if (!Array.isArray(completed) || completed.length !== unitsData["Nursing Education"].length) completed = Array(unitsData["Nursing Education"].length).fill(false);
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
      li.onkeyup = e => (e.key === "Enter" || e.key === " ") && startQuiz(idx);
    }
    list.appendChild(li);
  });
  if (unlocked.some((u, idx) => u && !completed[idx] && idx > 0 && !unlocked[idx-1])) {
    app.innerHTML += `
      <div style="margin-top:20px; background:linear-gradient(90deg,#cdf9e7,#f1fff9 80%);
                  color:#167255;padding:15px 12px;border-radius:8px;font-weight:700;
                  border:1.5px solid #b5efdf;font-size:1.12rem;text-align:center;box-shadow:0 3px 18px #caffee;">
        🎉 Congrats! You’ve unlocked a new unit! Keep going for perfection!
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
    <h2 style="text-align:center; font-family:'Nunito',Arial,sans-serif;color:#1c889b;padding-bottom:15px;">
      ${unit.unitName}
    </h2>
    <div class="progress">Q${currentQuestionIdx + 1} of ${unit.questions.length}</div>
    <div class="question">${question.questionText}</div>
    <div class="options" id="options"></div>
    <button class="back-btn" onclick="showUnits()">⬅ Back to Units</button>
  `;
  question.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.onclick = () => submitAnswer(opt, btn);
    document.getElementById('options').appendChild(btn);
  });
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
  const isPerfect = score === unit.questions.length;
  completed[currentUnitIdx] = isPerfect;
  if (isPerfect && currentUnitIdx < unitsData["Nursing Education"].length - 1 && !unlocked[currentUnitIdx + 1]) {
    unlocked[currentUnitIdx + 1] = true;
  }
  saveUnitProgress(unlocked, completed);

  let comment = isPerfect ? "🌟 Perfect! This unit is complete, and the next is now unlocked." :
    score / unit.questions.length > 0.8 ? "Great! Try again for a perfect score and unlock the next unit." :
    score / unit.questions.length > 0.6 ? "Good job. Try again to master all questions." :
    "Keep practicing! Review the correct answers below.";

  app.innerHTML = `
    <div class="score-card" style="animation:popin 0.5s;">
      <div class="score" style="letter-spacing:.03em;">Your Score: ${score} / ${unit.questions.length}</div>
      <div class="score-comment">${comment}</div>
      ${isPerfect ? `<div style="color:#19a659;margin-top:9px;font-weight:800;font-size:1.21em;">🎉 Unit Unlocked!</div>` : ""}
    </div>
    <div class="result-list">
      ${answers.map((a, i) => `
        <div class="result-question" tabindex="0">
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
document.addEventListener("DOMContentLoaded", showUnits);
