let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
      questions = data.questions; 
      loadQuestion(); // Load the first question
  })
  .catch(error => console.error('Error loading the questions:', error));

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

    const quizContainer = document.getElementById("quiz-container");
    quizContainer.classList.remove("fade", "in"); // Remove previous fade classes

    setTimeout(() => {
        quizContainer.classList.add("fade", "in");

        // Reset UI with the current question
        questionElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = ""; // Clear previous options
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option");
            button.onclick = () => handleAnswer(index);
            optionsContainer.appendChild(button);
        });

        // Enable/Disable buttons based on question index
        prevButton.disabled = currentQuestionIndex === 0;
        skipButton.disabled = false; // Enable Skip Button

        updateProgressBar(); // Update progress bar
        startTimer(); // Start the timer

    }, 100);
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
    if (timeLeft <= 5) {
        timerElement.style.color = "red"; // Change color to red
    } else {
        timerElement.style.color = "black"; // Reset color
    }
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