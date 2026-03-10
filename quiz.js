let questionsByCategory = {};
let categoryOrder = ["use_case", "experience", "philosophy", "customization", "hardware", "stability", "desktop_environment"];
let currentCategoryIndex = 0;
let currentQuestions = {};
let results = {};

fetch('data/questions.json')
  .then(res => res.json())
  .then(data => {
    questionsByCategory = data;
    startCategory(categoryOrder[currentCategoryIndex]);
  });

function startCategory(category) {
  currentQuestions = {};
  questionsByCategory[category].forEach(q => currentQuestions[q.id] = q);
  const firstId = questionsByCategory[category][0].id;
  updateProgress();
  renderNode(currentQuestions[firstId]);
}

function updateProgress() {
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    const percentage = (currentCategoryIndex / categoryOrder.length) * 100;
    progressBar.style.width = percentage + '%';
  }
}

function selectOption(nextId) {
  const category = categoryOrder[currentCategoryIndex];
  const node = currentQuestions[nextId];

  if (!node.options) {
    results[category] = node.id;
    currentCategoryIndex++;

    if (currentCategoryIndex < categoryOrder.length) {
      startCategory(categoryOrder[currentCategoryIndex]);
    } else {
      localStorage.setItem('quizResults', JSON.stringify(results));
      window.location.href = 'results.html';
    }
  } else {
    renderNode(node);
  }
}

function renderNode(node) {
  const questionEl = document.getElementById('question');
  const buttonsDiv = document.getElementById('buttons');

  buttonsDiv.innerHTML = '';
  questionEl.innerText = node.text || "";
  if (node.options && node.options.length > 3) {
    buttonsDiv.classList.add('multi-column');
  } else {
    buttonsDiv.classList.remove('multi-column');
  }

  node.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.innerText = opt.text;
    if (opt.color) btn.style.backgroundColor = opt.color;

    btn.onclick = () => selectOption(opt.next);
    buttonsDiv.appendChild(btn);
  });
}
