// ═══════════════════════════════════════════
//  SUPABASE CONFIG
// ═══════════════════════════════════════════
var SUPABASE_URL = 'https://gszdnwtlltzrrdcbnupb.supabase.co';
var SUPABASE_KEY = 'sb_publishable_LcVufU0Yiy7vDoFh-AxrFQ_9dBCRg0o';

function supabaseRequest(method, table, data, filters) {
  var url = SUPABASE_URL + '/rest/v1/' + table;
  if (filters) url += '?' + filters;
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Prefer': method === 'POST' ? 'return=representation' : ''
    },
    body: data ? JSON.stringify(data) : undefined
  }).then(function(r) { return r.json(); });
}

// ═══════════════════════════════════════════
//  DEFAULT QUESTIONS (fallback if no DB questions)
// ═══════════════════════════════════════════
var defaultCategories = [
  {
    name: "Computer Science",
    icon: "🖥️",
    questions: [
      { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"], answer: 0, explanation: "CPU stands for Central Processing Unit — the brain of the computer." },
      { question: "Which of these is NOT a programming language?", options: ["Python", "Java", "HTML", "Microsoft Word"], answer: 3, explanation: "Microsoft Word is a word processor, not a programming language." },
      { question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Rapid Action Memory", "Read And Modify"], answer: 1, explanation: "RAM stands for Random Access Memory — temporary storage for running programs." },
      { question: "Which number system does a computer use internally?", options: ["Decimal", "Octal", "Binary", "Hexadecimal"], answer: 2, explanation: "Computers use the Binary number system (0s and 1s) internally." },
      { question: "What is an algorithm?", options: ["A type of computer virus", "A step-by-step procedure to solve a problem", "A programming language", "A type of database"], answer: 1, explanation: "An algorithm is a step-by-step set of instructions to solve a problem." },
      { question: "What does 'bug' mean in programming?", options: ["A feature of a program", "An insect in the computer", "An error in a program", "A type of loop"], answer: 2, explanation: "A bug is an error or flaw in a program that causes unexpected behavior." },
      { question: "Which data structure works on the LIFO principle?", options: ["Queue", "Stack", "Array", "Linked List"], answer: 1, explanation: "Stack works on Last In First Out (LIFO) principle." },
      { question: "What is the full meaning of URL?", options: ["Uniform Resource Locator", "Universal Research Link", "Unified Resource Language", "Uniform Retrieval Location"], answer: 0, explanation: "URL stands for Uniform Resource Locator — the address of a webpage." },
      { question: "Which of these is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], answer: 2, explanation: "A keyboard is an input device used to enter data into a computer." },
      { question: "What is the time complexity of Binary Search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], answer: 2, explanation: "Binary Search has a time complexity of O(log n)." }
    ]
  },
  {
    name: "Programming Fundamentals",
    icon: "💻",
    questions: [
      { question: "Which symbol is used for comments in Python?", options: ["//", "/*", "#", "--"], answer: 2, explanation: "Python uses the # symbol for single-line comments." },
      { question: "What is a variable?", options: ["A fixed value", "A storage location with a name", "A type of loop", "A function"], answer: 1, explanation: "A variable is a named storage location that holds a value." },
      { question: "Which of these is a loop in programming?", options: ["if-else", "try-catch", "for loop", "switch"], answer: 2, explanation: "A for loop is used to repeat a block of code a number of times." },
      { question: "What does 'int' mean in most programming languages?", options: ["Internal", "Integer", "Interface", "Interval"], answer: 1, explanation: "'int' represents an Integer — a whole number data type." },
      { question: "What is the output of: print(2 + 3 * 4) in Python?", options: ["20", "14", "24", "10"], answer: 1, explanation: "Due to operator precedence, multiplication happens first: 3*4=12, then 2+12=14." },
      { question: "What is a function in programming?", options: ["A type of variable", "A reusable block of code", "A data type", "A loop"], answer: 1, explanation: "A function is a reusable block of code that performs a specific task." },
      { question: "Which of these is NOT a data type?", options: ["Integer", "Boolean", "String", "Compiler"], answer: 3, explanation: "A Compiler is a tool that translates code, not a data type." },
      { question: "What does IDE stand for?", options: ["Integrated Development Environment", "Internal Design Editor", "Integrated Debug Engine", "Interface Design Environment"], answer: 0, explanation: "IDE stands for Integrated Development Environment — a tool for writing code." },
      { question: "What is recursion?", options: ["A type of variable", "A function that calls itself", "A sorting algorithm", "A data structure"], answer: 1, explanation: "Recursion is when a function calls itself to solve a smaller version of the same problem." },
      { question: "What symbol is used for assignment in most languages?", options: ["==", "=>", "=", ":="], answer: 2, explanation: "The = symbol is used to assign a value to a variable." }
    ]
  },
  {
    name: "Data Science",
    icon: "📊",
    questions: [
      { question: "What is Data Science?", options: ["Designing websites", "Extracting insights from data", "Building mobile apps", "Managing databases only"], answer: 1, explanation: "Data Science involves extracting meaningful insights from large amounts of data." },
      { question: "Which language is most popular in Data Science?", options: ["Java", "C++", "Python", "PHP"], answer: 2, explanation: "Python is the most widely used language in Data Science due to its simplicity and libraries." },
      { question: "What is a dataset?", options: ["A type of algorithm", "A collection of related data", "A programming language", "A database software"], answer: 1, explanation: "A dataset is a structured collection of related data used for analysis." },
      { question: "What does CSV stand for?", options: ["Comma Separated Values", "Computer Stored Variables", "Central Storage Values", "Coded String Variables"], answer: 0, explanation: "CSV stands for Comma Separated Values — a common format for storing tabular data." },
      { question: "Which of these is a Data Science library in Python?", options: ["React", "Pandas", "Laravel", "Bootstrap"], answer: 1, explanation: "Pandas is a powerful Python library used for data manipulation and analysis." },
      { question: "What is machine learning?", options: ["Teaching humans to use machines", "A computer learning from data without being explicitly programmed", "Programming a robot", "Building computer hardware"], answer: 1, explanation: "Machine learning is a subset of AI where computers learn patterns from data." },
      { question: "What is data cleaning?", options: ["Deleting all data", "Removing or fixing incorrect data", "Encrypting data", "Compressing data"], answer: 1, explanation: "Data cleaning involves identifying and correcting errors or inconsistencies in data." },
      { question: "What type of chart is best for showing trends over time?", options: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"], answer: 2, explanation: "Line charts are best for showing how values change over time." },
      { question: "What is the mean of: 2, 4, 6, 8, 10?", options: ["5", "6", "7", "8"], answer: 1, explanation: "Mean = (2+4+6+8+10)/5 = 30/5 = 6." },
      { question: "What does AI stand for?", options: ["Automated Interface", "Artificial Intelligence", "Advanced Internet", "Automatic Input"], answer: 1, explanation: "AI stands for Artificial Intelligence — machines simulating human intelligence." }
    ]
  },
  {
    name: "Software Engineering",
    icon: "🔧",
    questions: [
      { question: "What is Software Engineering?", options: ["Building computer hardware", "Systematic approach to software development", "Designing user interfaces only", "Writing code without planning"], answer: 1, explanation: "Software Engineering is the systematic application of engineering principles to software development." },
      { question: "What does SDLC stand for?", options: ["Software Design and Logic Cycle", "System Development Life Cycle", "Software Development Life Cycle", "Systematic Design and Launch Cycle"], answer: 2, explanation: "SDLC stands for Software Development Life Cycle — the process of planning, creating and testing software." },
      { question: "Which SDLC model is shaped like a V?", options: ["Agile", "Waterfall", "V-Model", "Spiral"], answer: 2, explanation: "The V-Model is an SDLC model where development and testing phases run in parallel." },
      { question: "What is a software requirement?", options: ["A bug in the system", "What the software must do", "The programming language used", "The database structure"], answer: 1, explanation: "A software requirement describes what a system must do or what quality it must have." },
      { question: "What is Agile methodology?", options: ["A waterfall approach to development", "An iterative and flexible development approach", "A hardware design method", "A database management system"], answer: 1, explanation: "Agile is an iterative development methodology that focuses on flexibility and customer feedback." },
      { question: "What is a software prototype?", options: ["The final version of software", "An early sample of the software", "A software bug", "A type of database"], answer: 1, explanation: "A prototype is an early model of software built to test concepts and get feedback." },
      { question: "What does UML stand for?", options: ["Unified Modeling Language", "Universal Machine Language", "Unique Method Logic", "Unified Memory Layout"], answer: 0, explanation: "UML stands for Unified Modeling Language — used to visually represent software design." },
      { question: "What is version control?", options: ["Controlling software prices", "Managing changes to code over time", "Testing software versions", "Updating software automatically"], answer: 1, explanation: "Version control tracks and manages changes to code, allowing teams to collaborate." },
      { question: "What is Git?", options: ["A programming language", "A version control system", "A database", "An operating system"], answer: 1, explanation: "Git is a distributed version control system used to track changes in source code." },
      { question: "What is software testing?", options: ["Writing code", "Evaluating software to find bugs", "Designing the UI", "Deploying software"], answer: 1, explanation: "Software testing is the process of evaluating software to find defects and ensure quality." }
    ]
  },
  {
    name: "Cyber Security",
    icon: "🔐",
    questions: [
      { question: "What is Cyber Security?", options: ["Building websites", "Protecting systems and networks from digital attacks", "Designing computer hardware", "Managing databases"], answer: 1, explanation: "Cyber Security involves protecting computer systems and networks from digital attacks and unauthorized access." },
      { question: "What is a firewall?", options: ["A physical wall in a data center", "Software or hardware that monitors network traffic", "A type of virus", "An encryption method"], answer: 1, explanation: "A firewall monitors and controls incoming and outgoing network traffic based on security rules." },
      { question: "What is phishing?", options: ["A type of encryption", "Tricking users into revealing sensitive information", "A network protocol", "A firewall technique"], answer: 1, explanation: "Phishing is a cyberattack where attackers trick users into revealing passwords or personal information." },
      { question: "What does VPN stand for?", options: ["Virtual Private Network", "Very Protected Node", "Verified Public Network", "Virtual Protocol Number"], answer: 0, explanation: "VPN stands for Virtual Private Network — it encrypts your internet connection for privacy." },
      { question: "What is malware?", options: ["Good software", "Malicious software designed to harm systems", "A network protocol", "A security tool"], answer: 1, explanation: "Malware is malicious software designed to disrupt, damage or gain unauthorized access to systems." },
      { question: "What is encryption?", options: ["Deleting data", "Converting data into a coded format", "Copying data", "Compressing data"], answer: 1, explanation: "Encryption converts data into a coded format that can only be read with the correct key." },
      { question: "What is a strong password?", options: ["Your name and birthday", "123456", "A mix of letters, numbers and symbols", "Your phone number"], answer: 2, explanation: "A strong password uses a mix of uppercase, lowercase, numbers and special characters." },
      { question: "What is two-factor authentication?", options: ["Using two passwords", "Verifying identity using two different methods", "Having two user accounts", "Logging in twice"], answer: 1, explanation: "Two-factor authentication adds an extra layer of security by requiring two forms of verification." },
      { question: "What is a DDoS attack?", options: ["A type of encryption", "Overwhelming a server with traffic to crash it", "Stealing passwords", "Installing malware"], answer: 1, explanation: "A DDoS (Distributed Denial of Service) attack floods a server with traffic to make it unavailable." },
      { question: "What does HTTPS stand for?", options: ["HyperText Transfer Protocol Secure", "High Transfer Technology Protocol System", "Hybrid Text Transfer Protocol Standard", "HyperText Technology Protocol Service"], answer: 0, explanation: "HTTPS stands for HyperText Transfer Protocol Secure — it encrypts data between browser and server." }
    ]
  }
];

// ═══════════════════════════════════════════
//  SETTINGS
// ═══════════════════════════════════════════
var TOTAL_TIME = 300;

// ═══════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════
var currentUser = { name: '', dept: '', matric: '' };
var categories = [];
var questions = [];
var currentIndex = 0;
var score = 0;
var userAnswers = [];
var timeLeft = TOTAL_TIME;
var timerInterval = null;
var letters = ['A', 'B', 'C', 'D'];

// ═══════════════════════════════════════════
//  SCREEN SWITCHER
// ═══════════════════════════════════════════
function showScreen(id) {
  var screens = document.querySelectorAll('.screen');
  for (var i = 0; i < screens.length; i++) {
    screens[i].classList.remove('active');
  }
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ═══════════════════════════════════════════
//  LOGIN
// ═══════════════════════════════════════════
function updateMatricPrefix() {
  var dept = document.getElementById('input-dept').value;
  document.getElementById('matric-dept').value = dept || '';
}

function submitLogin() {
  var name = document.getElementById('input-name').value.trim();
  var dept = document.getElementById('input-dept').value;
  var year = document.getElementById('matric-year').value.trim();
  var num  = document.getElementById('matric-num').value.trim();
  var valid = true;

  if (!name) { document.getElementById('err-name').classList.add('show'); valid = false; }
  else { document.getElementById('err-name').classList.remove('show'); }

  if (!dept) { document.getElementById('err-dept').classList.add('show'); valid = false; }
  else { document.getElementById('err-dept').classList.remove('show'); }

  var validYears = ['2022','2023','2024','2025'];
  if (!year || !num || num.length < 4 || num.charAt(0) !== '1' || validYears.indexOf(year) === -1) {
    document.getElementById('err-matric').classList.add('show'); valid = false;
  } else { document.getElementById('err-matric').classList.remove('show'); }

  if (!valid) return;

  currentUser.name   = name;
  currentUser.dept   = dept;
  currentUser.matric = dept + '/' + year + '/' + num;

  loadCategories();
}

// ═══════════════════════════════════════════
//  LOAD CATEGORIES FROM SUPABASE
// ═══════════════════════════════════════════
function loadCategories() {
  showScreen('loading-screen');
  supabaseRequest('GET', 'quizzes', null, 'enabled=eq.true&order=created_at.asc')
    .then(function(data) {
      if (data && data.length > 0) {
        categories = data.map(function(quiz) {
          return {
            id: quiz.id,
            name: quiz.name,
            icon: quiz.icon || '📝',
            timer: quiz.timer || 300,
            questions: JSON.parse(quiz.questions)
          };
        });
      } else {
        categories = defaultCategories;
      }
      showCategories();
    })
    .catch(function() {
      categories = defaultCategories;
      showCategories();
    });
}

// ═══════════════════════════════════════════
//  CATEGORIES
// ═══════════════════════════════════════════
function showCategories() {
  var completedCategories = getCompletedCategories();
  var list = document.getElementById('category-list');
  list.innerHTML = '';

  var availableCount = 0;

  categories.forEach(function(cat, index) {
    var isCompleted = completedCategories.indexOf(cat.name) !== -1;
    var btn = document.createElement('button');
    btn.className = 'category-btn' + (isCompleted ? ' completed' : '');
    btn.innerHTML =
      '<span class="category-icon">' + cat.icon + '</span>' +
      '<span class="category-name">' + cat.name + '</span>' +
      '<span class="category-count">' + (isCompleted ? '✅ Done' : cat.questions.length + ' Qs') + '</span>';

    if (!isCompleted) {
      btn.onclick = function() { startQuiz(index); };
      availableCount++;
    } else {
      btn.style.opacity = '0.5';
      btn.style.cursor = 'not-allowed';
    }
    list.appendChild(btn);
  });

  if (availableCount === 0 && categories.length > 0) {
    var msg = document.createElement('div');
    msg.style.cssText = 'text-align:center; color: var(--muted); padding: 20px; font-size: 0.9rem;';
    msg.textContent = 'You have completed all available quizzes! 🎉';
    list.appendChild(msg);
  }

  showScreen('category-screen');
}

// ═══════════════════════════════════════════
//  COMPLETED CATEGORIES (localStorage)
// ═══════════════════════════════════════════
function getCompletedCategories() {
  try {
    var key = 'completed_' + currentUser.matric;
    var data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch(e) { return []; }
}

function markCategoryCompleted(categoryName) {
  try {
    var key = 'completed_' + currentUser.matric;
    var completed = getCompletedCategories();
    if (completed.indexOf(categoryName) === -1) {
      completed.push(categoryName);
      localStorage.setItem(key, JSON.stringify(completed));
    }
  } catch(e) {}
}

// ═══════════════════════════════════════════
//  QUIZ
// ═══════════════════════════════════════════
function startQuiz(categoryIndex) {
  var cat = categories[categoryIndex];
  questions = cat.questions;
  TOTAL_TIME = cat.timer || 300;
  userAnswers = [];
  for (var i = 0; i < questions.length; i++) { userAnswers.push(null); }
  currentIndex = 0;
  score = 0;
  buildTracker();
  showScreen('quiz-screen');
  document.getElementById('timer-display').classList.remove('urgent');
  loadQuestion();
  startTimer();
}

function buildTracker() {
  var tracker = document.getElementById('q-tracker');
  tracker.innerHTML = '';
  for (var i = 0; i < questions.length; i++) {
    var dot = document.createElement('div');
    dot.className = 'q-dot';
    dot.id = 'dot-' + i;
    dot.textContent = (i + 1);
    dot.setAttribute('data-q', i);
    dot.onclick = function() { jumpToQuestion(parseInt(this.getAttribute('data-q'))); };
    dot.style.cursor = 'pointer';
    tracker.appendChild(dot);
  }
}

function jumpToQuestion(index) {
  currentIndex = index;
  loadQuestion();
}

function updateTracker() {
  for (var i = 0; i < questions.length; i++) {
    var dot = document.getElementById('dot-' + i);
    dot.className = 'q-dot';
    if (userAnswers[i] !== null) { dot.className += ' answered'; }
    else if (i === currentIndex)  { dot.className += ' current'; }
  }
}

function loadQuestion() {
  var q = questions[currentIndex];
  var total = questions.length;

  document.getElementById('q-label').textContent = 'Question ' + (currentIndex + 1) + ' of ' + total;
  document.getElementById('q-count').textContent = (currentIndex + 1) + ' / ' + total;
  var num = currentIndex + 1 < 10 ? '0' + (currentIndex + 1) : '' + (currentIndex + 1);
  document.getElementById('q-num').textContent = 'Question ' + num;
  document.getElementById('q-text').textContent = q.question;

  var pct = (currentIndex / total) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';

  var optionsList = document.getElementById('options-list');
  optionsList.innerHTML = '';
  for (var i = 0; i < q.options.length; i++) {
    var btn = document.createElement('button');
    btn.className = 'option-btn';
    if (userAnswers[currentIndex] === i) { btn.className += ' selected'; }
    btn.innerHTML = '<span class="option-letter">' + letters[i] + '</span><span>' + q.options[i] + '</span>';
    btn.setAttribute('data-index', i);
    btn.onclick = function() { selectAnswer(parseInt(this.getAttribute('data-index'))); };
    optionsList.appendChild(btn);
  }

  var nextBtn = document.getElementById('next-btn');
  nextBtn.className = 'next-btn show';
  nextBtn.textContent = currentIndex < questions.length - 1 ? 'Next \u2192' : 'Finish \uD83C\uDFC1';

  var prevBtn = document.getElementById('prev-btn');
  prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
  prevBtn.textContent = '\u2190 Previous';

  updateTracker();
}

function selectAnswer(selectedIndex) {
  userAnswers[currentIndex] = selectedIndex;
  var allBtns = document.querySelectorAll('.option-btn');
  for (var i = 0; i < allBtns.length; i++) { allBtns[i].classList.remove('selected'); }
  allBtns[selectedIndex].classList.add('selected');
  updateTracker();
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    clearInterval(timerInterval);
    showResults();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
  }
}

// ═══════════════════════════════════════════
//  TIMER
// ═══════════════════════════════════════════
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = TOTAL_TIME;
  updateTimerDisplay();
  timerInterval = setInterval(function() {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 30) { document.getElementById('timer-display').classList.add('urgent'); }
    if (timeLeft <= 0)  { clearInterval(timerInterval); showResults(); }
  }, 1000);
}

function updateTimerDisplay() {
  var m = Math.floor(timeLeft / 60);
  var s = timeLeft % 60;
  document.getElementById('timer-display').textContent =
    (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

// ═══════════════════════════════════════════
//  RESULTS
// ═══════════════════════════════════════════
function showResults() {
  clearInterval(timerInterval);

  score = 0;
  for (var i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) score++;
  }

  var total = questions.length;
  var pct = Math.round((score / total) * 100);

  document.getElementById('final-score').textContent = score + '/' + total;
  document.getElementById('correct-count').textContent = score;
  document.getElementById('wrong-count').textContent = total - score;

  var emoji, title, subtitle;
  if (pct === 100)    { emoji = '\uD83C\uDFC6'; title = 'Perfect Score!';  subtitle = 'Absolutely flawless. A true genius!'; }
  else if (pct >= 70) { emoji = '\uD83C\uDF1F'; title = 'Great Job!';      subtitle = 'You clearly know your stuff!'; }
  else if (pct >= 50) { emoji = '\uD83D\uDC4D'; title = 'Not Bad!';        subtitle = 'A solid effort. Study a bit more!'; }
  else                { emoji = '\uD83D\uDCDA'; title = 'Keep Learning!';  subtitle = 'Every mistake is a lesson. Try again!'; }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-subtitle').textContent = subtitle;

  var maskedMatric = currentUser.matric.replace(/\/(\d{4})$/, '/****');
  document.getElementById('badge-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
  document.getElementById('badge-name').textContent = currentUser.name;
  document.getElementById('badge-meta').textContent = maskedMatric + ' \u00B7 ' + currentUser.dept;

  // Answer review
  var reviewList = document.getElementById('review-list');
  reviewList.innerHTML = '';
  for (var i = 0; i < questions.length; i++) {
    var q = questions[i];
    var userAns = userAnswers[i];
    var isCorrect = userAns === q.answer;
    var item = document.createElement('div');
    item.className = 'review-item';
    var answersHTML = '';
    if (userAns === null) {
      answersHTML = '<div class="review-answer missed">\u23ED\uFE0F Not answered | Correct: ' + q.options[q.answer] + '</div>';
    } else if (isCorrect) {
      answersHTML = '<div class="review-answer correct">\u2705 Your answer: ' + q.options[userAns] + '</div>';
    } else {
      answersHTML = '<div class="review-answer wrong">\u274C Your answer: ' + q.options[userAns] + '</div>' +
                    '<div class="review-answer missed">\u2705 Correct: ' + q.options[q.answer] + '</div>';
    }
    item.innerHTML = '<div class="review-q">' + (i+1) + '. ' + q.question + '</div><div class="review-answers">' + answersHTML + '</div>';
    reviewList.appendChild(item);
  }

  // Mark category as completed
  var currentCategoryName = categories.find(function(c) { return c.questions === questions; });
  if (currentCategoryName) { markCategoryCompleted(currentCategoryName.name); }
  else {
    // fallback — find by first question match
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].questions[0] && categories[i].questions[0].question === questions[0].question) {
        markCategoryCompleted(categories[i].name);
        break;
      }
    }
  }

  // Save to Supabase leaderboard
  saveToSupabase(score, total);

  showScreen('results-screen');
}

// ═══════════════════════════════════════════
//  SAVE TO SUPABASE
// ═══════════════════════════════════════════
function saveToSupabase(score, total) {
  var maskedMatric = currentUser.matric.replace(/\/(\d{4})$/, '/****');
  supabaseRequest('POST', 'leaderboard', {
    name: currentUser.name,
    dept: currentUser.dept,
    matric: maskedMatric,
    score: score,
    total: total,
    category: questions[0] ? questions[0].question.substring(0, 10) : 'Quiz',
    created_at: new Date().toISOString()
  }).then(function() {
    loadLeaderboard();
  }).catch(function() {
    loadLeaderboard();
  });
}

// ═══════════════════════════════════════════
//  LOAD LEADERBOARD FROM SUPABASE
// ═══════════════════════════════════════════
function loadLeaderboard() {
  supabaseRequest('GET', 'leaderboard', null, 'order=score.desc&limit=10')
    .then(function(data) {
      renderLeaderboard(data || []);
    })
    .catch(function() {
      renderLeaderboard([]);
    });
}

function renderLeaderboard(board) {
  var el = document.getElementById('leaderboard-list');
  el.innerHTML = '';
  if (!board || board.length === 0) {
    el.innerHTML = '<div class="lb-empty">No scores yet. Be the first!</div>';
    return;
  }
  var medals = ['gold', 'silver', 'bronze'];
  board.forEach(function(entry, i) {
    var item = document.createElement('div');
    item.className = 'leaderboard-item';
    var rankText = i === 0 ? '\uD83E\uDD47' : i === 1 ? '\uD83E\uDD48' : i === 2 ? '\uD83E\uDD49' : '#' + (i+1);
    var rankClass = i < 3 ? medals[i] : '';
    item.innerHTML =
      '<div class="lb-rank ' + rankClass + '">' + rankText + '</div>' +
      '<div class="lb-info">' +
        '<div class="lb-name">' + entry.name + '</div>' +
        '<div class="lb-meta">' + entry.matric + ' \u00B7 ' + entry.dept + '</div>' +
      '</div>' +
      '<div class="lb-score">' + entry.score + '/' + entry.total + '</div>';
    el.appendChild(item);
  });
}

function goHome() {
  showCategories();
}
