
  // ═══════════════════════════════
  //  QUESTIONS
  // ═══════════════════════════════
  var categories = [
    {
      name: "General Knowledge",
      icon: "🧠",
      questions: [
        { question: "What is the largest planet in our Solar System?", options: ["Saturn", "Jupiter", "Neptune", "Uranus"], answer: 1, explanation: "Jupiter is the largest planet — all other planets could fit inside it!" },
        { question: "Which element has the chemical symbol Au?", options: ["Silver", "Aluminum", "Gold", "Argon"], answer: 2, explanation: "Au comes from Aurum, the Latin word for Gold." },
        { question: "How many bones are in the adult human body?", options: ["206", "186", "225", "198"], answer: 0, explanation: "Adults have 206 bones." },
        { question: "Who wrote Romeo and Juliet?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: 1, explanation: "Written by Shakespeare around 1594-1596." },
        { question: "What is the speed of light approximately?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"], answer: 0, explanation: "Light travels at about 300,000 km/s." }
      ]
    },
    {
      name: "Nigerian Knowledge",
      icon: "🇳🇬",
      questions: [
        { question: "What is the capital city of Nigeria?", options: ["Lagos", "Abuja", "Kano", "Ibadan"], answer: 1, explanation: "Abuja has been Nigeria's capital since 1991." },
        { question: "In what year did Nigeria gain independence?", options: ["1957", "1963", "1960", "1955"], answer: 2, explanation: "Nigeria gained independence on October 1, 1960." },
        { question: "What is the official language of Nigeria?", options: ["Yoruba", "Hausa", "Igbo", "English"], answer: 3, explanation: "English is Nigeria's official language." },
        { question: "Which river is the longest in Nigeria?", options: ["River Benue", "River Niger", "River Kaduna", "River Ogun"], answer: 1, explanation: "The River Niger is the longest river in Nigeria." },
        { question: "Who was Nigeria's first president?", options: ["Yakubu Gowon", "Nnamdi Azikiwe", "Obafemi Awolowo", "Abubakar Tafawa Balewa"], answer: 1, explanation: "Dr. Nnamdi Azikiwe was Nigeria's first president." }
      ]
    },
    {
      name: "Science",
      icon: "🔬",
      questions: [
        { question: "Which gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2, explanation: "Plants absorb CO2 and convert it to oxygen." },
        { question: "How many chambers does the human heart have?", options: ["2", "3", "4", "5"], answer: 2, explanation: "The human heart has 4 chambers." },
        { question: "What planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Saturn", "Mars"], answer: 3, explanation: "Mars is called the Red Planet because of iron oxide on its surface." },
        { question: "What is H2O commonly known as?", options: ["Salt", "Water", "Oxygen", "Hydrogen"], answer: 1, explanation: "H2O is the chemical formula for water." },
        { question: "How many chromosomes do humans have?", options: ["23", "44", "46", "48"], answer: 2, explanation: "Humans have 46 chromosomes arranged in 23 pairs." }
      ]
    }
  ];

  // ═══════════════════════════════
  //  SETTINGS
  // ═══════════════════════════════
  var TOTAL_TIME = 300;

  // ═══════════════════════════════
  //  STATE
  // ═══════════════════════════════
  var currentUser = { name: '', dept: '', matric: '' };
  var questions = [];
  var currentIndex = 0;
  var score = 0;
  var userAnswers = [];
  var timeLeft = TOTAL_TIME;
  var timerInterval = null;
  var letters = ['A', 'B', 'C', 'D'];

  // ═══════════════════════════════
  //  SCREEN SWITCHER
  // ═══════════════════════════════
  function showScreen(id) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.remove('active');
    }
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
  }

  // ═══════════════════════════════
  //  LOGIN
  // ═══════════════════════════════
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
    if (!year || !num || num.length < 4 || num.charAt(0) !=='1' || validYears.indexOf(year) === -1) {
      document.getElementById('err-matric').classList.add('show'); valid = false;
    } else { document.getElementById('err-matric').classList.remove('show'); }

    if (!valid) return;

    currentUser.name   = name;
    currentUser.dept   = dept;
    currentUser.matric = dept + '/' + year + '/' + num;

    showCategories();
  }

  // ═══════════════════════════════
  //  CATEGORIES
  // ═══════════════════════════════
  function showCategories() {
    var list = document.getElementById('category-list');
    list.innerHTML = '';
    categories.forEach(function(cat, index) {
      var btn = document.createElement('button');
      btn.className = 'category-btn';
      btn.innerHTML =
        '<span class="category-icon">' + cat.icon + '</span>' +
        '<span class="category-name">' + cat.name + '</span>' +
        '<span class="category-count">' + cat.questions.length + ' Qs</span>';
      btn.onclick = function() { startQuiz(index); };
      list.appendChild(btn);
    });
    showScreen('category-screen');
  }

  // ═══════════════════════════════
  //  QUIZ
  // ═══════════════════════════════
  function startQuiz(categoryIndex) {
    questions = categories[categoryIndex].questions;
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
    nextBtn.className =  'next-btn show';
    var prevBtn = document.getElementById('prev-btn');
    prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
    prevBtn.textContent = '← Previous'
    nextBtn.textContent = currentIndex < questions.length - 1 ? 'Next \u2192' : 'Finish \uD83C\uDFC1';

    updateTracker();
  }

  function selectAnswer(selectedIndex) {
    userAnswers[currentIndex] = selectedIndex;
    var allBtns = document.querySelectorAll('.option-btn');
    for (var i = 0; i < allBtns.length; i++) { allBtns[i].classList.remove('selected'); }
    allBtns[selectedIndex].classList.add('selected');
    document.getElementById('next-btn').className = 'next-btn show';
    updateTracker();
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      currentIndex--;
      loadQuestion();
    }
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

  // ═══════════════════════════════
  //  TIMER
  // ═══════════════════════════════
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

  // ═══════════════════════════════
  //  RESULTS
  // ═══════════════════════════════
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

    // User badge
    var maskedMatric = currentUser.matric.replace(/\/(\d{4})$/, '/****');
    document.getElementById('badge-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('badge-name').textContent = currentUser.name;
    document.getElementById('badge-meta').textContent = maskedMatric + ' · ' + currentUser.dept;

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

    // Save to leaderboard
    saveToLeaderboard(score, total);
    renderLeaderboard();

    showScreen('results-screen');
  }

  // ═══════════════════════════════
  //  LEADERBOARD (localStorage)
  // ═══════════════════════════════
  function saveToLeaderboard(score, total) {
    var board = getLeaderboard();
    var maskedMatric = currentUser.matric.replace(/\/(\d{4})$/, '/****');
    board.push({
      name: currentUser.name,
      dept: currentUser.dept,
      matric: maskedMatric,
      score: score,
      total: total,
      pct: Math.round((score / total) * 100)
    });
    board.sort(function(a, b) { return b.pct - a.pct; });
    board = board.slice(0, 10);
    try { localStorage.setItem('quizbox_leaderboard', JSON.stringify(board)); } catch(e) {}
  }

  function getLeaderboard() {
    try {
      var data = localStorage.getItem('quizbox_leaderboard');
      return data ? JSON.parse(data) : [];
    } catch(e) { return []; }
  }

  function renderLeaderboard() {
    var board = getLeaderboard();
    var el = document.getElementById('leaderboard-list');
    el.innerHTML = '';
    if (board.length === 0) {
      el.innerHTML = '<div class="lb-empty">No scores yet. Be the first!</div>';
      return;
    }
    var medals = ['gold', 'silver', 'bronze'];
    board.forEach(function(entry, i) {
      var item = document.createElement('div');
      item.className = 'leaderboard-item';
      var rankClass = i < 3 ? medals[i] : '';
      var rankText = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i+1);
      item.innerHTML =
        '<div class="lb-rank ' + rankClass + '">' + rankText + '</div>' +
        '<div class="lb-info">' +
          '<div class="lb-name">' + entry.name + '</div>' +
          '<div class="lb-meta">' + entry.matric + ' · ' + entry.dept + '</div>' +
        '</div>' +
        '<div class="lb-score">' + entry.score + '/' + entry.total + '</div>';
      el.appendChild(item);
    });
  }

  function playAgain() {
    showCategories();
  }
