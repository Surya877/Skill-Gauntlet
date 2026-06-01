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
  authMode: 'login',
};

const elements = {
  viewSignin: document.getElementById('view-signin'),
  viewDashboard: document.getElementById('view-dashboard'),
  viewQuiz: document.getElementById('view-quiz'),
  viewScore: document.getElementById('view-score'),
  viewCooldown: document.getElementById('view-cooldown'),
  userGreeting: document.getElementById('userGreeting'),
  questionIndex: document.getElementById('questionIndex'),
  quizLanguage: document.getElementById('quizLanguage'),
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
  signoutButton: document.getElementById('signoutButton'),
  loginTab: document.getElementById('loginTab'),
  signupTab: document.getElementById('signupTab'),
  authForm: document.getElementById('authForm'),
  authName: document.getElementById('authName'),
  authEmail: document.getElementById('authEmail'),
  authPassword: document.getElementById('authPassword'),
  authSubmit: document.getElementById('authSubmit'),
  authMessage: document.getElementById('authMessage'),
  nameField: document.getElementById('nameField'),
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
  setAuthMode(app.authMode);
  renderCurrentView();
}

function setupEventListeners() {
  elements.loginTab.addEventListener('click', () => setAuthMode('login'));
  elements.signupTab.addEventListener('click', () => setAuthMode('signup'));
  elements.authForm.addEventListener('submit', handleAuthSubmit);

  elements.signoutButton.addEventListener('click', () => {
    app.user = null;
    app.language = '';
    app.questions = [];
    app.currentIndex = 0;
    app.score = 0;
    updateView('signin');
    setAuthMode('login');
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

  document.body.dataset.view = app.currentView;
}

function setAuthMode(mode) {
  app.authMode = mode;
  const isSignup = mode === 'signup';

  elements.loginTab.classList.toggle('active', !isSignup);
  elements.signupTab.classList.toggle('active', isSignup);
  elements.loginTab.setAttribute('aria-selected', String(!isSignup));
  elements.signupTab.setAttribute('aria-selected', String(isSignup));
  elements.nameField.classList.toggle('hidden', !isSignup);
  elements.authName.required = isSignup;
  elements.authPassword.autocomplete = isSignup ? 'new-password' : 'current-password';
  elements.authSubmit.textContent = isSignup ? 'Create Account' : 'Login';
  elements.authMessage.textContent = '';
  elements.authMessage.className = 'auth-message';
}

function handleAuthSubmit(event) {
  event.preventDefault();

  const email = elements.authEmail.value.trim().toLowerCase();
  const password = elements.authPassword.value;
  const name = elements.authName.value.trim();

  if (!isValidEmail(email)) {
    showAuthMessage('Please enter a valid email address.', 'error');
    return;
  }

  if (password.length < 6) {
    showAuthMessage('Password must be at least 6 characters.', 'error');
    return;
  }

  if (app.authMode === 'signup') {
    createLocalAccount(name, email, password);
    return;
  }

  loginLocalAccount(email, password);
}

function createLocalAccount(name, email, password) {
  if (!name) {
    showAuthMessage('Please enter your full name.', 'error');
    return;
  }

  const users = getStoredUsers();
  if (users[email]) {
    showAuthMessage('An account already exists for this email. Please login.', 'error');
    setAuthMode('login');
    elements.authEmail.value = email;
    return;
  }

  users[email] = {
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem('sg_users', JSON.stringify(users));

  app.user = { name, email };
  elements.authForm.reset();
  updateView('dashboard');
}

function loginLocalAccount(email, password) {
  const users = getStoredUsers();
  const user = users[email];

  if (!user || user.password !== password) {
    showAuthMessage('Email or password is incorrect.', 'error');
    return;
  }

  app.user = { name: user.name, email: user.email };
  elements.authForm.reset();
  updateView('dashboard');
}

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem('sg_users')) || {};
  } catch (error) {
    console.warn('Stored users could not be parsed:', error);
    return {};
  }
}

function showAuthMessage(message, type) {
  elements.authMessage.textContent = message;
  elements.authMessage.className = `auth-message ${type}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  const isLastQuestion = app.currentIndex === app.questions.length - 1;
  elements.questionIndex.textContent = `Question ${app.currentIndex + 1} of ${app.questions.length}`;
  elements.quizLanguage.textContent = `${capitalize(app.language)} - Beginner tier`;
  elements.progressFill.style.width = `${((app.currentIndex + 1) / app.questions.length) * 100}%`;
  elements.questionText.textContent = item.question;

  elements.optionsGrid.innerHTML = '';
  item.options.forEach((optionText, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-button';
    btn.textContent = optionText;
    btn.dataset.letter = String.fromCharCode(65 + index);
    btn.dataset.index = index;
    btn.addEventListener('click', () => selectOption(btn, index));
    elements.optionsGrid.appendChild(btn);
  });
  elements.nextButton.disabled = true;
  elements.nextButton.textContent = isLastQuestion ? 'Finish Challenge' : 'Next Question';
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
  transitionQuestion();
}

function transitionQuestion() {
  const questionBlock = document.querySelector('.question-block');
  questionBlock.classList.add('is-changing');
  elements.optionsGrid.classList.add('is-changing');

  window.setTimeout(() => {
    renderQuestion();
    questionBlock.classList.remove('is-changing');
    elements.optionsGrid.classList.remove('is-changing');
  }, 170);
}

function finalizeScore() {
  const percent = Math.round((app.score / app.questions.length) * 100);
  const userName = app.user ? app.user.name : 'SKILLGAUNTLET USER';
  
  elements.scoreSummary.innerHTML = `
    <div class="score-metric">
      <span class="metric-label">Final score</span>
      <span class="metric-value">${percent}%</span>
    </div>
    <div class="score-metric">
      <span class="metric-label">Correct answers</span>
      <span class="metric-value">${app.score}/${app.questions.length}</span>
    </div>
    <div class="score-metric">
      <span class="metric-label">Candidate</span>
      <span class="metric-value">${escapeHtml(userName)}</span>
    </div>
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
  const issuedDate = new Date();
  const percent = Math.round((app.score / app.questions.length) * 100);
  const credentialHash = generateCredentialHash();
  const language = capitalize(app.language);

  ctx.clearRect(0, 0, width, height);
  ctx.save();

  const paper = ctx.createLinearGradient(0, 0, width, height);
  paper.addColorStop(0, '#fffdf8');
  paper.addColorStop(0.42, '#f7f1e6');
  paper.addColorStop(1, '#eef4f7');

  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, width, height);

  drawCertificatePattern(ctx, width, height);

  ctx.strokeStyle = '#123047';
  ctx.lineWidth = 18;
  ctx.strokeRect(70, 70, width - 140, height - 140);

  ctx.strokeStyle = '#c89b3c';
  ctx.lineWidth = 8;
  ctx.strokeRect(105, 105, width - 210, height - 210);

  ctx.strokeStyle = 'rgba(18, 48, 71, 0.16)';
  ctx.lineWidth = 2;
  ctx.strokeRect(135, 135, width - 270, height - 270);

  drawRibbon(ctx, width);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#123047';
  ctx.font = '700 54px Georgia, "Times New Roman", serif';
  ctx.fillText('SkillGauntlet Academy', width / 2, 215);

  ctx.fillStyle = '#8a681d';
  ctx.font = '700 34px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('CERTIFICATE OF ACHIEVEMENT', width / 2, 284);

  ctx.fillStyle = '#4b5563';
  ctx.font = '500 31px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('This certifies that', width / 2, 432);

  ctx.fillStyle = '#0f172a';
  drawFittedCenteredText(ctx, userName, width / 2, 550, 1320, 92, 'Georgia, "Times New Roman", serif', 700);

  ctx.strokeStyle = 'rgba(200, 155, 60, 0.72)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(390, 608);
  ctx.lineTo(width - 390, 608);
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.font = '500 34px "Inter", "Segoe UI", sans-serif';
  drawWrappedCenteredText(
    ctx,
    `has successfully completed the ${language} Beginner Tier assessment with a score of ${percent}%.`,
    width / 2,
    708,
    1180,
    46
  );

  ctx.fillStyle = '#123047';
  ctx.font = '700 40px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('Beginner Tier Certification', width / 2, 828);

  drawInfoBox(ctx, 300, 902, 400, 126, 'Language', language);
  drawInfoBox(ctx, 800, 902, 400, 126, 'Score', `${percent}%`);
  drawInfoBox(ctx, 1300, 902, 400, 126, 'Issued', issuedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }));

  drawSeal(ctx, width / 2, 1128, credentialHash);

  // Left: SkillGauntlet verified stamp (smaller, aligned)
  drawStamp(ctx, 480, 1230, 'SkillGauntlet VERIFIED');
  // Right: credential authority handwritten signature (Skill Gauntlet)
  drawHandwrittenSignature(ctx, 1220, 1210, 'Skill Gauntlet', credentialHash);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748b';
  ctx.font = '500 24px "JetBrains Mono", Consolas, monospace';
  ctx.fillText(`Credential ID: ${credentialHash}`, width / 2, 1322);
  ctx.restore();
}

function drawCertificatePattern(ctx, width, height) {
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = '#c89b3c';
  ctx.lineWidth = 1.5;

  for (let x = -height; x < width; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height, height);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = '#123047';
  for (let x = 0; x < width; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.bezierCurveTo(x + 160, 350, x - 160, 680, x + 120, height);
    ctx.stroke();
  }

  ctx.restore();
}

function drawRibbon(ctx, width) {
  ctx.save();
  const center = width / 2;
  const y = 318;
  const left = center - 480;
  const right = center + 480;
  const gradient = ctx.createLinearGradient(left, y, right, y);
  gradient.addColorStop(0, '#123047');
  gradient.addColorStop(0.5, '#1f4f68');
  gradient.addColorStop(1, '#123047');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(left, y);
  ctx.lineTo(right, y);
  ctx.lineTo(right - 55, y + 72);
  ctx.lineTo(left + 55, y + 72);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f7e7bd';
  ctx.textAlign = 'center';
  ctx.font = '700 25px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('VERIFIED COMPLETION RECORD', center, y + 47);
  ctx.restore();
}

function drawInfoBox(ctx, x, y, boxWidth, boxHeight, label, value) {
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = 'rgba(18, 48, 71, 0.18)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, boxWidth, boxHeight, 18);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#475569';
  ctx.font = '700 22px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(label.toUpperCase(), x + boxWidth / 2, y + 42);

  ctx.fillStyle = '#07111f';
  ctx.font = '900 40px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(value, x + boxWidth / 2, y + 88);
  ctx.restore();
}

function drawSeal(ctx, x, y, credentialHash) {
  ctx.save();
  const outer = ctx.createRadialGradient(x - 24, y - 30, 18, x, y, 104);
  outer.addColorStop(0, '#f8df90');
  outer.addColorStop(0.6, '#c89b3c');
  outer.addColorStop(1, '#8a681d');

  ctx.fillStyle = outer;
  ctx.beginPath();
  ctx.arc(x, y, 104, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#fff7d6';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(x, y, 84, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#123047';
  ctx.beginPath();
  ctx.arc(x, y, 62, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fff7d6';
  ctx.textAlign = 'center';
  ctx.font = '800 36px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('SG', x, y - 6);
  ctx.font = '700 16px "JetBrains Mono", Consolas, monospace';
  ctx.fillText(credentialHash.replace('SG-', ''), x, y + 34);
  ctx.restore();
}

function drawStamp(ctx, x, y, label) {
  ctx.save();
  // slightly smaller outer ring for neat fit
  ctx.strokeStyle = '#9b1c2b';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(x, y, 76, 0, Math.PI * 2);
  ctx.stroke();

  // inner ring
  ctx.strokeStyle = '#9b1c2b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, 54, 0, Math.PI * 2);
  ctx.stroke();

  // center initials
  ctx.fillStyle = '#9b1c2b';
  ctx.textAlign = 'center';
  ctx.font = '800 36px Inter, "Segoe UI", sans-serif';
  ctx.fillText('SG', x, y - 6);

  // small stamp text
  ctx.fillStyle = '#9b1c2b';
  ctx.font = '600 12px "JetBrains Mono", Consolas, monospace';
  ctx.fillText('VERIFIED', x, y + 24);
  ctx.fillText('CERTIFICATE', x, y + 40);

  // optional short label below stamp
  ctx.font = '600 16px Inter, "Segoe UI", sans-serif';
  ctx.fillText(label, x, y + 72);
  ctx.restore();
}

function seedFromString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
  }
  return h >>> 0;
}

function mulberry32(a) {
  return function() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawHandwrittenSignature(ctx, x, y, name, seedStr = '') {
  const seed = seedStr ? seedFromString(seedStr) : Math.floor(Math.random() * 4294967295);
  const rnd = mulberry32(seed);

  ctx.save();
  // slight rotation per-seed
  const angle = (rnd() - 0.5) * 0.08; // +/- ~2.3 degrees
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.strokeStyle = '#07111f';
  ctx.lineWidth = 2.4 + rnd() * 1.2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // draw flowing signature strokes using seeded randomness
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.bezierCurveTo(48 + rnd() * 20, -46 + rnd() * 12, 120 + rnd() * 30, -4 + rnd() * 20, 200 + rnd() * 40, -18 + rnd() * 12);
  ctx.bezierCurveTo(260 + rnd() * 30, -40 + rnd() * 18, 320 + rnd() * 40, 4 + rnd() * 30, 420 + rnd() * 60, -18 + rnd() * 18);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(18 + rnd() * 10, 4 + rnd() * 10);
  ctx.bezierCurveTo(78 + rnd() * 30, 24 + rnd() * 24, 150 + rnd() * 40, -6 + rnd() * 16, 210 + rnd() * 40, 0 + rnd() * 18);
  ctx.stroke();

  // handwritten-looking name with slightly larger size for authority
  ctx.fillStyle = '#07111f';
  const fontSize = 36 + Math.floor(rnd() * 12);
  ctx.font = `italic ${fontSize}px "Brush Script MT", "Segoe Script", cursive`;
  ctx.textAlign = 'left';
  ctx.fillText(name, 0, 70 + rnd() * 6);

  // printed title under signature for authority clarity (smaller)
  ctx.font = '600 12px Inter, "Segoe UI", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#334155';
  ctx.fillText('Credential Authority — SkillGauntlet', 0, 120);

  ctx.restore();
}

function drawSignature(ctx, x, y, label) {
  ctx.save();
  ctx.strokeStyle = '#123047';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 450, y);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.font = '600 26px "Inter", "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, x + 225, y + 44);
  ctx.restore();
}

function drawFittedCenteredText(ctx, text, x, y, maxWidth, startSize, fontFamily, fontWeight) {
  let size = startSize;
  do {
    ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
    size -= 2;
  } while (ctx.measureText(text).width > maxWidth && size > 42);

  ctx.textAlign = 'center';
  ctx.fillText(text, x, y);
}

function drawWrappedCenteredText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
      return;
    }
    line = testLine;
  });

  if (line) lines.push(line);

  ctx.textAlign = 'center';
  lines.forEach((wrappedLine, index) => {
    ctx.fillText(wrappedLine, x, y + index * lineHeight);
  });
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

initApp();
