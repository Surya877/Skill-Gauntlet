const app = {
  currentView: 'signin',
  user: null,
  language: '',
  questions: [],
  currentIndex: 0,
  selectedAnswer: null,
  score: 0,
  cooldownTarget: null,
  cooldownInterval: null,
};

const elements = {
  viewSignin: document.getElementById('view-signin'),
  viewDashboard: document.getElementById('view-dashboard'),
  viewQuiz: document.getElementById('view-quiz'),
  viewScore: document.getElementById('view-score'),
  viewCooldown: document.getElementById('view-cooldown'),
  userGreeting: document.getElementById('userGreeting'),
  questionIndex: document.getElementById('questionIndex'),
  progressFill: document.getElementById('progressFill'),
  questionText: document.getElementById('questionText'),
  optionsGrid: document.getElementById('optionsGrid'),
  nextButton: document.getElementById('nextButton'),
  abortButton: document.getElementById('abortButton'),
  scoreSummary: document.getElementById('scoreSummary'),
  reviewPane: document.getElementById('reviewPane'),
  certificatePane: document.getElementById('certificatePane'),
  downloadCertificate: document.getElementById('downloadCertificate'),
  showCooldownButton: document.getElementById('showCooldownButton'),
  restartButton: document.getElementById('restartButton'),
  countdownTimer: document.getElementById('countdownTimer'),
  unlockButton: document.getElementById('unlockButton'),
  cooldownCopy: document.getElementById('cooldownCopy'),
  cooldownRestartButton: document.getElementById('cooldownRestartButton'),
  languageGrid: document.getElementById('languageGrid'),
  guestButton: document.getElementById('guestButton'),
  signoutButton: document.getElementById('signoutButton'),
};

const questionBank = {
  python: [
    { id: 1, question: 'Which keyword defines a function in Python?', options: ['func', 'def', 'function', 'lambda'], correct: 1, explanation: 'Python uses def to create functions.' },
    { id: 2, question: 'How do you declare a list in Python?', options: ['{}', '()', '[]', '<>'], correct: 2, explanation: 'Lists use square brackets [] in Python.' },
    { id: 3, question: 'What is the output of 3 * 1**3 in Python?', options: ['27', '9', '3', '1'], correct: 2, explanation: 'Exponentiation happens before multiplication.' },
    { id: 4, question: 'Which statement is used for a conditional branch?', options: ['if', 'switch', 'when', 'cond'], correct: 0, explanation: 'Python uses if for branching.' },
    { id: 5, question: 'How do you add an element to the end of a list?', options: ['append()', 'insert()', 'push()', 'add()'], correct: 0, explanation: 'append() adds an item to the end of a list.' },
    { id: 6, question: 'Which data type is immutable?', options: ['list', 'set', 'tuple', 'dict'], correct: 2, explanation: 'Tuples are immutable in Python.' },
    { id: 7, question: 'What symbol begins a comment?', options: ['//', '#', '/*', '<!--'], correct: 1, explanation: 'Python comments begin with #.' },
    { id: 8, question: 'What does len() return for a string?', options: ['Number of lines', 'Byte size', 'Character count', 'Memory address'], correct: 2, explanation: 'len() returns the number of characters.' },
    { id: 9, question: 'Which loop runs while a condition is true?', options: ['for', 'repeat', 'while', 'do'], correct: 2, explanation: 'The while loop repeats while its condition remains true.' },
    { id: 10, question: 'How do you import a module named math?', options: ['include math', 'import math', 'require("math")', 'using math'], correct: 1, explanation: 'Python imports modules with import.' },
    { id: 11, question: 'What is the correct way to write a dictionary?', options: ['{key: value}', '[key: value]', '(key, value)', '<key:value>'], correct: 0, explanation: 'Dictionaries use braces with key:value pairs.' },
    { id: 12, question: 'How do you convert text to an integer?', options: ['int("42")', 'str(42)', 'num("42")', 'parseInt("42")'], correct: 0, explanation: 'int() converts a string to an integer.' },
    { id: 13, question: 'Which keyword handles exceptions?', options: ['catch', 'except', 'handle', 'error'], correct: 1, explanation: 'Python uses except after try.' },
    { id: 14, question: 'What does // operator compute?', options: ['remainder', 'float division', 'integer division', 'power'], correct: 2, explanation: 'The // operator returns integer floor division.' },
    { id: 15, question: 'How do you create a set?', options: ['{1,2}', '[1,2]', '(1,2)', '<1,2>'], correct: 0, explanation: 'Sets are defined using braces.' },
    { id: 16, question: 'Which function prints output?', options: ['echo()', 'print()', 'display()', 'show()'], correct: 1, explanation: 'print() outputs text to the console.' },
    { id: 17, question: 'What type is True in Python?', options: ['int', 'bool', 'str', 'float'], correct: 1, explanation: 'True is a boolean value.' },
    { id: 18, question: 'How do you write a multi-line string?', options: ['"string"', "'''string'''", '/string/', '`string`'], correct: 1, explanation: 'Triple quotes create multi-line strings.' },
    { id: 19, question: 'Which operator checks equality?', options: ['=', '==', '===', ':='], correct: 1, explanation: '== checks equality in Python.' },
    { id: 20, question: 'How do you comment out a block in Python?', options: ['/* */', '#', '///', 'No native block comment'], correct: 3, explanation: 'Python does not support native block comments; use # each line.' },
  ],
  javascript: [
    { id: 1, question: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'const', 'both let and const'], correct: 3, explanation: 'let and const create block-scoped variables.' },
    { id: 2, question: 'How do you write a comment in JavaScript?', options: ['// comment', '<!-- comment -->', '# comment', '/* comment */'], correct: 0, explanation: 'Single-line comments use //. Multi-line use /* */.' },
    { id: 3, question: 'What is the output of typeof []?', options: ['array', 'object', 'list', 'undefined'], correct: 1, explanation: 'Arrays are objects in JavaScript.' },
    { id: 4, question: 'Which method adds an item to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correct: 0, explanation: 'push() appends an element to the array.' },
    { id: 5, question: 'What does === compare?', options: ['type only', 'value only', 'value and type', 'reference only'], correct: 2, explanation: '=== checks both value and type.' },
    { id: 6, question: 'How do you create a function?', options: ['func f() {}', 'function f() {}', 'def f() {}', 'create f() {}'], correct: 1, explanation: 'function keyword declares functions.' },
    { id: 7, question: 'Which object stores key-value pairs in insertion order?', options: ['Object', 'Set', 'Map', 'Array'], correct: 2, explanation: 'Map preserves insertion order for entries.' },
    { id: 8, question: 'What is the DOM?', options: ['Data Object Model', 'Document Object Model', 'Dynamic Output Model', 'Default Object Map'], correct: 1, explanation: 'DOM stands for Document Object Model.' },
    { id: 9, question: 'How do you convert a string to a number?', options: ['Number("5")', 'parseInt("5")', '+"5"', 'all of the above'], correct: 3, explanation: 'All listed methods convert strings to numbers.' },
    { id: 10, question: 'Which loop is ideal for iterating arrays?', options: ['for..of', 'for..in', 'while', 'switch'], correct: 0, explanation: 'for..of loops over array values directly.' },
    { id: 11, question: 'What keyword stops a loop?', options: ['break', 'halt', 'exit', 'stop'], correct: 0, explanation: 'break exits loops early.' },
    { id: 12, question: 'What is an arrow function syntax?', options: ['() => {}', 'function() {}', 'lambda {}', 'arrow() {}'], correct: 0, explanation: 'Arrow functions use => notation.' },
    { id: 13, question: 'Which method removes the first array item?', options: ['shift()', 'pop()', 'splice()', 'slice()'], correct: 0, explanation: 'shift() removes the first element.' },
    { id: 14, question: 'Which built-in object handles timed events?', options: ['Timer', 'Clock', 'Date', 'setTimeout'], correct: 3, explanation: 'setTimeout is used for delayed execution.' },
    { id: 15, question: 'How do you write strict equality?', options: ['==', '===', '=', '!=='], correct: 1, explanation: '=== tests for strict equality.' },
    { id: 16, question: 'What does JSON stand for?', options: ['JavaScript Object Notation', 'Java Object Notation', 'JavaScript Output Notation', 'Joint Script Object Name'], correct: 0, explanation: 'JSON stands for JavaScript Object Notation.' },
    { id: 17, question: 'Which variable is constant?', options: ['const x = 5', 'let x = 5', 'var x = 5', 'x = 5'], correct: 0, explanation: 'const declares a constant variable.' },
    { id: 18, question: 'How do you add an event listener?', options: ['on(event)', 'addEventListener()', 'listen()', 'attachEvent()'], correct: 1, explanation: 'addEventListener registers an event handler.' },
    { id: 19, question: 'What is NaN?', options: ['Not a Number', 'New Array Node', 'Null and Nothing', 'Native Array'], correct: 0, explanation: 'NaN means Not a Number.' },
    { id: 20, question: 'Which keyword creates a promise?', options: ['new Promise()', 'async()', 'await', 'Promise.create()'], correct: 0, explanation: 'Promises are created with new Promise().' },
  ],
  java: [
    { id: 1, question: 'What method starts a Java application?', options: ['main()', 'run()', 'start()', 'init()'], correct: 0, explanation: 'main() is the entry point.' },
    { id: 2, question: 'Which keyword creates a class?', options: ['class', 'struct', 'module', 'def'], correct: 0, explanation: 'Java uses class declarations.' },
    { id: 3, question: 'How do you declare an integer?', options: ['int num;', 'number num;', 'var num;', 'integer num;'], correct: 0, explanation: 'int declares an integer variable.' },
    { id: 4, question: 'Which modifier allows subclass access?', options: ['private', 'protected', 'static', 'transient'], correct: 1, explanation: 'protected enables subclass access.' },
    { id: 5, question: 'What does JVM stand for?', options: ['Java Visual Machine', 'Java Virtual Machine', 'Java Variable Model', 'Java Version Manager'], correct: 1, explanation: 'JVM is Java Virtual Machine.' },
    { id: 6, question: 'Which collection does not allow duplicates?', options: ['ArrayList', 'HashMap', 'HashSet', 'LinkedList'], correct: 2, explanation: 'HashSet enforces unique items.' },
    { id: 7, question: 'How do you print text?', options: ['System.out.print()', 'Console.log()', 'printf()', 'cout <<'], correct: 0, explanation: 'System.out.print() prints output.' },
    { id: 8, question: 'What keyword defines a constant?', options: ['final', 'const', 'static', 'immutable'], correct: 0, explanation: 'final marks values as unchangeable.' },
    { id: 9, question: 'Which type is a textual sequence?', options: ['String', 'char', 'text', 'word'], correct: 0, explanation: 'String stores text in Java.' },
    { id: 10, question: 'Which loop runs a fixed count?', options: ['for', 'while', 'do-while', 'repeat'], correct: 0, explanation: 'for loops iterate a defined number of times.' },
    { id: 11, question: 'How do you create a new object?', options: ['new ClassName()', 'ClassName()', 'create ClassName', 'make ClassName'], correct: 0, explanation: 'new creates a new object instance.' },
    { id: 12, question: 'Which keyword inherits behavior?', options: ['implements', 'extends', 'inherits', 'uses'], correct: 1, explanation: 'extends is used for inheritance.' },
    { id: 13, question: 'Which package contains Scanner?', options: ['java.io', 'java.util', 'java.lang', 'java.net'], correct: 1, explanation: 'Scanner is in java.util.' },
    { id: 14, question: 'What does null mean?', options: ['No value', 'Zero', 'False', 'Undefined'], correct: 0, explanation: 'null indicates absence of a value.' },
    { id: 15, question: 'Which access modifier is visible to all?', options: ['private', 'protected', 'public', 'package'], correct: 2, explanation: 'public is visible everywhere.' },
    { id: 16, question: 'Which method compares strings?', options: ['equals()', '==', 'compare()', 'match()'], correct: 0, explanation: 'equals() compares string content.' },
    { id: 17, question: 'How do you define an array of ints?', options: ['int[] arr;', 'array<int> arr;', 'int arr[];', 'both int[] arr and int arr[]'], correct: 3, explanation: 'Both syntaxes are valid in Java.' },
    { id: 18, question: 'Which statement catches exceptions?', options: ['catch', 'except', 'handle', 'trap'], correct: 0, explanation: 'catch handles exceptions.' },
    { id: 19, question: 'What is bytecode?', options: ['Compiled Java code', 'Source code', 'Native code', 'Assembly code'], correct: 0, explanation: 'Bytecode is JVM-friendly compiled code.' },
    { id: 20, question: 'Which type stores true/false?', options: ['boolean', 'int', 'char', 'String'], correct: 0, explanation: 'boolean holds true or false.' },
  ],
  cpp: [
    { id: 1, question: 'Which operator allocates memory?', options: ['new', 'malloc', 'alloc', 'create'], correct: 0, explanation: 'new allocates objects in C++.' },
    { id: 2, question: 'How do you end a statement?', options: [';', '\\n', '.', ':'], correct: 0, explanation: 'C++ statements end with a semicolon.' },
    { id: 3, question: 'Which header is needed for cout?', options: ['<iostream>', '<stdio.h>', '<ostream>', '<iostream.h>'], correct: 0, explanation: '<iostream> provides cout and cin.' },
    { id: 4, question: 'What is the main return type?', options: ['void', 'int', 'main', 'bool'], correct: 1, explanation: 'main() typically returns int.' },
    { id: 5, question: 'Which symbol is used for pointer declaration?', options: ['*', '&', '%', '#'], correct: 0, explanation: 'Asterisk denotes pointer types.' },
    { id: 6, question: 'How do you include a header?', options: ['#include "file"', 'include file', 'import file', 'using file'], correct: 0, explanation: '#include imports headers in C++.' },
    { id: 7, question: 'Which keyword creates a constant?', options: ['const', 'let', 'var', 'immutable'], correct: 0, explanation: 'const declares constants.' },
    { id: 8, question: 'What is the scope operator?', options: ['::', '.', '->', '=>'], correct: 0, explanation: ':: specifies namespaces and class scope.' },
    { id: 9, question: 'Which container stores keyed values?', options: ['map', 'vector', 'set', 'list'], correct: 0, explanation: 'map stores key-value pairs.' },
    { id: 10, question: 'How do you write a single-line comment?', options: ['// comment', '/* comment */', '# comment', '<!-- comment -->'], correct: 0, explanation: '// starts single-line comments.' },
    { id: 11, question: 'What does std::endl do?', options: ['Ends line and flushes stream', 'Starts new line', 'Deletes stream', 'Formats output'], correct: 0, explanation: 'std::endl inserts newline and flushes output.' },
    { id: 12, question: 'Which type stores a character?', options: ['char', 'string', 'int', 'bool'], correct: 0, explanation: 'char stores single characters.' },
    { id: 13, question: 'What operator compares equality?', options: ['==', '=', '===', '!='], correct: 0, explanation: '== compares values in C++.' },
    { id: 14, question: 'Which loop checks condition after each iteration?', options: ['do-while', 'while', 'for', 'foreach'], correct: 0, explanation: 'do-while executes first and checks later.' },
    { id: 15, question: 'How do you declare an array of five ints?', options: ['int a[5];', 'int a = 5;', 'array<int> a(5);', 'vector<int> a(5);'], correct: 0, explanation: 'int a[5]; declares a fixed-size array.' },
    { id: 16, question: 'Which keyword is used for inheritance?', options: ['extends', 'inherits', ':', 'override'], correct: 2, explanation: 'C++ uses : for class inheritance.' },
    { id: 17, question: 'What is RAII?', options: ['Resource Acquisition Is Initialization', 'Runtime Access Is Immediate', 'Random Access Internal Interface', 'Reference and Instance Initialization'], correct: 0, explanation: 'RAII manages resources via constructors/destructors.' },
    { id: 18, question: 'Which object model uses namespaces?', options: ['std', 'sys', 'core', 'base'], correct: 0, explanation: 'std is the standard namespace.' },
    { id: 19, question: 'How do you declare a reference variable?', options: ['int &ref = x;', 'int *ref = x;', 'int ref = &x;', 'ref int x;'], correct: 0, explanation: 'References use & in declarations.' },
    { id: 20, question: 'Which cast is safest for runtime types?', options: ['dynamic_cast', 'static_cast', 'reinterpret_cast', 'const_cast'], correct: 0, explanation: 'dynamic_cast is used for safe downcasting.' },
  ],
};

function initApp() {
  restoreCooldown();
  setupEventListeners();
  renderCurrentView();
}

function setupEventListeners() {
  elements.guestButton.addEventListener('click', () => {
    app.user = { name: 'Guest', email: 'guest@skillgauntlet.local' };
    updateView('dashboard');
  });

  elements.signoutButton.addEventListener('click', () => {
    app.user = null;
    app.language = '';
    app.questions = [];
    app.currentIndex = 0;
    app.score = 0;
    updateView('signin');
  });

  elements.languageGrid.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-language]');
    if (!button || button.disabled) return;
    app.language = button.dataset.language;
    startQuiz(app.language);
  });

  elements.nextButton.addEventListener('click', handleNextQuestion);
  elements.abortButton.addEventListener('click', resetToDashboard);
  elements.restartButton.addEventListener('click', resetToDashboard);
  elements.downloadCertificate.addEventListener('click', downloadCertificate);
  elements.showCooldownButton.addEventListener('click', () => updateView('cooldown'));
  elements.unlockButton.addEventListener('click', handleUnlock);
  elements.cooldownRestartButton.addEventListener('click', resetToDashboard);
}

function renderCurrentView() {
  const views = [
    elements.viewSignin,
    elements.viewDashboard,
    elements.viewQuiz,
    elements.viewScore,
    elements.viewCooldown,
  ];
  views.forEach((view) => view.classList.add('hidden'));

  if (app.currentView === 'signin') {
    elements.viewSignin.classList.remove('hidden');
  } else if (app.currentView === 'dashboard') {
    elements.viewDashboard.classList.remove('hidden');
    if (app.user) {
      elements.userGreeting.textContent = `Welcome, ${app.user.name}! Choose a language to begin.`;
    }
  } else if (app.currentView === 'quiz') {
    elements.viewQuiz.classList.remove('hidden');
  } else if (app.currentView === 'score') {
    elements.viewScore.classList.remove('hidden');
  } else if (app.currentView === 'cooldown') {
    elements.viewCooldown.classList.remove('hidden');
  }
}

function updateView(viewName) {
  app.currentView = viewName;
  renderCurrentView();
}

function resetToDashboard() {
  app.questions = [];
  app.currentIndex = 0;
  app.selectedAnswer = null;
  app.score = 0;
  app.language = '';
  elements.nextButton.disabled = true;
  elements.reviewPane.classList.add('hidden');
  elements.certificatePane.classList.add('hidden');

  if (!app.cooldownTarget) {
    updateView('dashboard');
  } else {
    updateView('cooldown');
  }
}

async function startQuiz(language) {
  if (app.cooldownTarget) {
    updateView('cooldown');
    return;
  }
  app.questions = await fetchQuizQuestions(language, 'beginner');
  app.currentIndex = 0;
  app.score = 0;
  app.selectedAnswer = null;
  elements.nextButton.disabled = true;
  elements.reviewPane.classList.add('hidden');
  elements.certificatePane.classList.add('hidden');
  updateView('quiz');
  renderQuestion();
}

async function fetchQuizQuestions(language, tier) {
  const localPool = questionBank[language] || questionBank.javascript;
  const requestPayload = {
    language,
    tier,
    count: 20,
  };

  try {
    const response = await fetch('/api/gemini-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });

    if (response.ok) {
      const results = await response.json();
      if (Array.isArray(results) && results.length >= 20) {
        return results.map((item) => ({
          id: Number(item.id) || 0,
          question: String(item.question || ''),
          options: Array.isArray(item.options) ? item.options : [],
          correct: Number(item.correct) || 0,
          explanation: String(item.explanation || ''),
        }));
      }
    }
  } catch (error) {
    console.warn('Gemini service fallback triggered:', error);
  }

  const shuffled = shuffleArray(localPool.slice());
  const selection = shuffled.slice(0, 20);
  if (selection.length < 20) {
    const extended = [...selection];
    while (extended.length < 20) {
      extended.push({ ...localPool[extended.length % localPool.length], id: extended.length + 1 });
    }
    return extended;
  }

  return selection;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderQuestion() {
  const item = app.questions[app.currentIndex];
  if (!item) return;

  elements.questionIndex.textContent = `Question ${app.currentIndex + 1} of ${app.questions.length}`;
  elements.progressFill.style.width = `${((app.currentIndex) / app.questions.length) * 100}%`;
  elements.questionText.textContent = item.question;

  elements.optionsGrid.innerHTML = '';
  item.options.forEach((optionText, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-button';
    btn.textContent = optionText;
    btn.dataset.index = index;
    btn.addEventListener('click', () => selectOption(btn, index));
    elements.optionsGrid.appendChild(btn);
  });
  elements.nextButton.disabled = true;
}

function selectOption(button, index) {
  app.selectedAnswer = index;
  elements.optionsGrid.querySelectorAll('button').forEach((btn) => btn.classList.remove('active'));
  button.classList.add('active');
  elements.nextButton.disabled = false;
}

function handleNextQuestion() {
  const question = app.questions[app.currentIndex];
  if (typeof app.selectedAnswer !== 'number') return;
  if (app.selectedAnswer === question.correct) {
    app.score += 1;
  }
  app.currentIndex += 1;
  app.selectedAnswer = null;

  if (app.currentIndex >= app.questions.length) {
    finalizeScore();
    return;
  }
  renderQuestion();
}

function finalizeScore() {
  const percent = Math.round((app.score / app.questions.length) * 100);
  const userName = app.user ? app.user.name : 'SKILLGAUNTLET USER';
  
  elements.scoreSummary.innerHTML = `
    <p><strong>Final Score:</strong> ${percent}%</p>
    <p><strong>Correct Answers:</strong> ${app.score} / ${app.questions.length}</p>
    <p><strong>Candidate:</strong> ${userName}</p>
  `;
  
  if (percent >= 70) {
    renderCertificateCanvas(userName);
    elements.reviewPane.classList.add('hidden');
    elements.certificatePane.classList.remove('hidden');
    setCooldownLock();
  } else {
    elements.certificatePane.classList.add('hidden');
    elements.reviewPane.classList.remove('hidden');
  }
  updateView('score');
}

function renderCertificateCanvas(userName) {
  const canvas = document.getElementById('certificateCanvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#080A11');
  gradient.addColorStop(0.5, '#0B0F19');
  gradient.addColorStop(1, '#080A11');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
  ctx.lineWidth = 26;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  ctx.strokeStyle = 'rgba(255, 0, 127, 0.25)';
  ctx.lineWidth = 16;
  ctx.strokeRect(80, 80, width - 160, height - 160);

  ctx.fillStyle = '#00F0FF';
  ctx.shadowColor = '#00F0FF';
  ctx.shadowBlur = 20;
  ctx.font = '150px "JetBrains Mono", monospace';
  ctx.fillText('SKILLGAUNTLET CERT', 120, 260);

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#F4F7FF';
  ctx.font = '90px "JetBrains Mono", monospace';
  ctx.fillText(`Name: ${userName}`, 120, 420);
  ctx.fillText(`Language: ${capitalize(app.language)}`, 120, 520);
  ctx.fillText(`Date: ${new Date().toLocaleDateString('en-US')}`, 120, 620);

  const hash = generateCredentialHash();
  ctx.fillStyle = '#FF007F';
  ctx.font = '110px "JetBrains Mono", monospace';
  ctx.fillText(`Credential: ${hash}`, 120, 760);

  ctx.fillStyle = '#39FF14';
  ctx.font = '70px "JetBrains Mono", monospace';
  ctx.fillText('BEGINNER TIER GRADUATION', 120, 920);
}

function generateCredentialHash() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'SG-';
  for (let i = 0; i < 3; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  result += '-';
  for (let i = 0; i < 3; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function downloadCertificate() {
  const canvas = document.getElementById('certificateCanvas');
  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = url;
  const userName = app.user ? app.user.name.replace(/\s/g, '-') : 'candidate';
  link.download = `SkillGauntlet-Certificate-${app.language}-${userName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function setCooldownLock() {
  if (app.cooldownTarget) return;
  const targetTime = Date.now() + 3600000;
  app.cooldownTarget = targetTime;
  localStorage.setItem('sg_cooldown_js', String(targetTime));
  startCooldownTimer();
}

function restoreCooldown() {
  const stored = localStorage.getItem('sg_cooldown_js');
  if (!stored) return;
  const target = Number(stored);
  if (Number.isNaN(target)) {
    localStorage.removeItem('sg_cooldown_js');
    return;
  }
  if (target > Date.now()) {
    app.cooldownTarget = target;
    app.currentView = 'cooldown';
    startCooldownTimer();
    return;
  }
  localStorage.removeItem('sg_cooldown_js');
}

function startCooldownTimer() {
  if (app.cooldownInterval) {
    clearInterval(app.cooldownInterval);
  }
  updateCooldownDisplay();
  app.cooldownInterval = setInterval(() => {
    updateCooldownDisplay();
  }, 1000);
}

function updateCooldownDisplay() {
  if (!app.cooldownTarget) return;
  const now = Date.now();
  const remaining = Math.max(0, app.cooldownTarget - now);
  const minutes = String(Math.floor(remaining / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
  elements.countdownTimer.textContent = `${minutes}:${seconds}`;
  if (remaining === 0) {
    clearInterval(app.cooldownInterval);
    app.cooldownInterval = null;
    elements.unlockButton.disabled = false;
    elements.unlockButton.classList.remove('disabled');
    elements.cooldownCopy.textContent = 'Intermediate tier is ready to unlock. Click the button to continue.';
    localStorage.removeItem('sg_cooldown_js');
  }
}

function handleUnlock() {
  if (elements.unlockButton.disabled) return;
  app.cooldownTarget = null;
  elements.unlockButton.disabled = true;
  updateView('dashboard');
}

function capitalize(value) {
  if (!value) return '';
  return value === 'cpp' ? 'C++' : value.charAt(0).toUpperCase() + value.slice(1);
}

function handleGoogleSignIn(response) {
  if (response.credential) {
    const decoded = parseJwt(response.credential);
    app.user = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    updateView('dashboard');
  }
}

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('JWT decode error:', e);
    return {};
  }
}

window.handleGoogleSignIn = handleGoogleSignIn;
initApp();
