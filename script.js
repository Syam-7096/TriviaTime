const questions = [
  { question: "What is Python?", options: ["A snake", "A programming language", "A car", "An operating system"], correct: 1 },
  { question: "What is the output of: print(type(lambda x: x))?",options: ["<class 'function'>", "<class 'lambda'>", "<class 'method'>", "Error"], correct: 0 },
  { question: "What does OOP stand for?", options: ["Object-Oriented Programming", "Operational Output Process", "Overlapping Object Procedures", "Organized Operations Program"], correct: 0 },
  { question: "Which keyword is used to create a class in Python?", options: ["def", "class", "function", "module"], correct: 1 },
  { question: "What is the correct file extension for Python files?", options: [".pyth", ".pt", ".py", ".python"], correct: 2 },
  { question: "Which of the following is a mutable data type in Python?", options: ["String", "Tuple", "List", "Integer"], correct: 2 },
  { question: "How do you define a function in Python?", options: ["function()", "def myFunction():", "create myFunction()", "func myFunction()"], correct: 1 },
  { question: "Which operator is used for exponentiation in Python?", options: ["^", "**", "//", "%"], correct: 1 },
  { question: "What is the output of `print(2 ** 3)` in Python?", options: ["6", "8", "9", "Error"], correct: 1 },
  { question: "Which of these is NOT a Python keyword?", options: ["lambda", "yield", "var", "global"], correct: 2 },
  { question: "Which Python library is used for data manipulation?", options: ["NumPy", "Matplotlib", "Pandas", "Flask"], correct: 2 },
  { question: "What does the `self` keyword represent in a Python class?", options: ["The class itself", "A variable", "The instance of the class", "A function"], correct: 2 },
  { question: "What is the purpose of the `__init__` method in Python?", options: ["Initialize a class", "Define a variable", "Create a function", "Initialize an object"], correct: 3 },
  { question: "Which method is used to add an item to a list in Python?", options: ["insert()", "add()", "push()", "append()"], correct: 3 },
  { question: "How do you comment a single line in Python?", options: ["//", "#", "/* */", "!!"], correct: 1 },
  { question: "Which of the following is used to handle exceptions in Python?", options: ["try-catch", "try-except", "error handling", "catch block"], correct: 1 },
  { question: "Which Python feature is used to iterate over items in a list?", options: ["while loop", "if-else", "for loop", "switch-case"], correct: 2 },
  { question: "Which of these methods can be used to remove an element from a dictionary?", options: ["del", "remove", "discard", "pop"], correct: 0 },
  { question: "What is the output of `type(3.14)`?", options: ["int", "float", "double", "decimal"], correct: 1 },
  { question: "Which method is used to convert a string to lowercase in Python?", options: ["toLowerCase()", "lower()", "casefold()", "tolower()"], correct: 1 },
  { question: "What does the `len()` function do?", options: ["Calculates the length of a string or collection", "Finds the size of a file", "Returns the maximum value in a list", "Counts the number of occurrences of an item"], correct: 0 },
  { question: "Which Python module is used for regular expressions?", options: ["regex", "re", "match", "expr"], correct: 1 },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

// DOM Elements
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const prevButton = document.getElementById("prev-btn");
const skipButton = document.getElementById("next-btn"); // Renamed "Next" button to "Skip"
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("time-left");
const restartButtonContainer = document.getElementById("restart-btn-container"); // New container for restart button

// Load Question
function loadQuestion() {
    clearInterval(timerInterval); // Clear any existing timers
    timeLeft = 15; // Reset timer
    updateTimerDisplay();

    const currentQuestion = questions[currentQuestionIndex];

    // Reset UI
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(button);
    });

    prevButton.disabled = currentQuestionIndex === 0;
    skipButton.disabled = false; // Enable Skip Button

    updateProgressBar();
    startTimer();
}

// Handle Answer Selection
function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    clearInterval(timerInterval); // Stop the timer

    optionsContainer.childNodes.forEach((button, index) => {
        button.classList.add("disabled"); // Disable hover effect
        if (index === currentQuestion.correct) {
            button.classList.add("correct"); // Highlight the correct answer in green
        }
        if (index === selectedIndex && selectedIndex !== currentQuestion.correct) {
            button.classList.add("incorrect"); // Highlight the selected incorrect answer in red
        }
        button.disabled = true;
    });

    if (selectedIndex === currentQuestion.correct) {
        score++;
    }

    // Auto move to next question after 1 second delay
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1000); // 1 second delay before moving to the next question
}

// Timer Logic
function startTimer() {
    clearInterval(timerInterval); // Ensure only one interval is running
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerElement.textContent = timeLeft;
}

// Handle Timeout
function handleTimeout() {
    const currentQuestion = questions[currentQuestionIndex];

    optionsContainer.childNodes.forEach((button, index) => {
        button.classList.add("disabled"); // Disable hover effect
        if (index === currentQuestion.correct) {
            button.classList.add("correct"); // Highlight the correct answer on timeout
        }
        button.disabled = true;
    });

    // Auto move to the next question after 1 second delay
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1000); // 1 second delay before moving to the next question
}

// Skip to Next Question
function skipQuestion() {
    clearInterval(timerInterval); // Stop the timer immediately
    const currentQuestion = questions[currentQuestionIndex];

    // Disable all the options
    optionsContainer.childNodes.forEach((button) => {
        button.classList.add("disabled"); // Disable hover effect
    });

    // Move to the next question immediately
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endQuiz();
    }
}

// End Quiz
function endQuiz() {
    clearInterval(timerInterval);
    questionElement.textContent = `Quiz Over! Your score is ${score}/${questions.length}.`;
    optionsContainer.innerHTML = "";
    prevButton.style.display = "none";
    skipButton.style.display = "none"; // Hide the Skip button
    restartButtonContainer.style.display = "block"; // Show the Restart button

    // Create the Restart button dynamically (if not already present)
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.onclick = restartQuiz;
    restartButtonContainer.appendChild(restartButton);
}

// Restart Quiz
function restartQuiz() {
    // Reset quiz variables
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 15;

    // Hide Restart button and re-enable navigation
    restartButtonContainer.style.display = "none"; // Hide the Restart button
    prevButton.style.display = "inline-block"; // Show the previous button again
    skipButton.style.display = "inline-block"; // Show the Skip button again

    // Start the quiz again from the first question
    loadQuestion();
}

// Update Progress Bar
function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Navigation Buttons
prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

// Skip Button
skipButton.addEventListener("click", skipQuestion); // "Skip" button functionality

// Initialize Quiz
loadQuestion();