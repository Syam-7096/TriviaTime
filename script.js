const questions = [
    {
      question: "Which of the following is NOT a valid Python data type?",
      options: ["List", "Tuple", "Dictionary", "Array"],
      answer: 3,
    },
    {
      question: "What is the output of: print(type(lambda x: x))?",
      options: ["<class 'function'>", "<class 'lambda'>", "<class 'method'>", "Error"],
      answer: 0,
    },
    {
      question: "What is the purpose of the `__init__` method in Python?",
      options: [
        "To initialize a class instance",
        "To define a private variable",
        "To execute code at runtime",
        "To declare static methods",
      ],
      answer: 0,
    },
    {
      question: "Which of these statements about Python inheritance is true?",
      options: [
        "A class can only inherit from one parent class",
        "Child classes override all methods of the parent class",
        "Python supports multiple inheritance",
        "Parent classes must implement all methods of child classes",
      ],
      answer: 2,
    },
    {
      question: "What is the output of: print(2 ** 3 ** 2)?",
      options: ["512", "64", "16", "Error"],
      answer: 0,
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 15;
  let timerInterval;
  
  const questionElement = document.getElementById("question");
  const optionButtons = document.querySelectorAll(".option");
  const nextButton = document.getElementById("next-btn");
  const progressBar = document.getElementById("progress-bar");
  
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionButtons.forEach((button, index) => {
      button.textContent = currentQuestion.options[index];
      button.disabled = false;
      button.classList.remove("correct", "incorrect");
    });
    updateProgressBar();
    startTimer();
  }
  
  function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    clearInterval(timerInterval);
    if (selectedIndex === currentQuestion.answer) {
      score++;
      optionButtons[selectedIndex].classList.add("correct");
    } else {
      optionButtons[selectedIndex].classList.add("incorrect");
      optionButtons[currentQuestion.answer].classList.add("correct");
    }
    optionButtons.forEach(button => (button.disabled = true));
  }
  
  function startTimer() {
    timeLeft = 15;
    document.getElementById("time-left").textContent = timeLeft;
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("time-left").textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        handleAnswer(-1); // Timeout is treated as an incorrect answer
      }
    }, 1000);
  }
  
  function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    questionElement.textContent = `Quiz Over! Your score is ${score}/${questions.length}.`;
    document.getElementById("options-container").style.display = "none";
    nextButton.style.display = "none";
  }
  
  optionButtons.forEach((button, index) => {
    button.addEventListener("click", () => handleAnswer(index));
  });
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      endQuiz();
    }
  });
  
  // Initialize the quiz
  loadQuestion();
  