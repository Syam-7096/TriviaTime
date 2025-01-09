let questions = {};
let filteredQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timerInterval;
let timeLeft = 15; // Set timer duration to 15 seconds
const categoryCards = document.querySelectorAll('.category-card');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');
const restartButtonContainer = document.getElementById('restart-btn-container');

// Fetching questions.json and ensuring data is loaded
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data; // Assuming the data structure contains categories
        isDataLoaded = true;
    })
    .catch(error => console.error('Error loading the questions:', error));

// Event listener for category selection
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        filterQuestionsByCategory(category);
        startQuiz();
    });
});

// Function to filter questions by category
function filterQuestionsByCategory(category) {
    if (!questions[category]) {
        filteredQuestions = [];
    } else {
        filteredQuestions = questions[category];
    }
}

// Start Quiz
function startQuiz() {
    if (filteredQuestions.length === 0) {
        alert("No questions available for this category.");
        return;
    }

    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;

    // Hide category selection and show quiz container
    document.getElementById("category-container").style.display = "none";
    quizContainer.style.display = "block";

    loadQuestion();
}

// Load Question
function loadQuestion() {
    clearInterval(timerInterval); // Clear any existing timers
    timeLeft = 15; // Reset timer to 15 seconds
    updateTimerDisplay();
    const currentQuestion = filteredQuestions[currentQuestionIndex];

    setTimeout(() => {
        // Reset UI with the current question
        questionContainer.textContent = currentQuestion.question;
        optionsContainer.innerHTML = ""; // Clear previous options
        currentQuestion.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.classList.add('option');
            optionButton.addEventListener('click', () => handleAnswer(index));
            optionsContainer.appendChild(optionButton);
        });

        // Enable/Disable buttons based on question index
        prevButton.disabled = currentQuestionIndex === 0;
        nextButton.disabled = false; // Enable the skip button
        updateProgressBar();
        startTimer(); // Start the timer
    }, 100);
}

// Handle Answer Selection
function handleAnswer(selectedIndex) {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll('.option');
    optionButtons.forEach((button, index) => {
        button.disabled = true;  // Disable all options after selection
        button.classList.add('disabled');  // Disable hover effect

        // Highlight the correct answer in green
        if (index === currentQuestion.correct) {
            button.classList.add('correct');
        } 
        // Highlight the selected answer in red if it's incorrect
        else if (index === selectedIndex && selectedIndex !== currentQuestion.correct) {
            button.classList.add('incorrect');
        }
    });

    // Increment score if the selected answer is correct
    if (selectedIndex === currentQuestion.correct) {
        correctAnswers++;  // Increase correct answers count
    } else {
        incorrectAnswers++;  // Increase incorrect answers count
    }

    // Move to next question after a short delay
    setTimeout(() => {
        if (currentQuestionIndex === filteredQuestions.length - 1) {
            endQuiz();  // End quiz if it's the last question
        } else {
            currentQuestionIndex++;  // Move to the next question
            loadQuestion();  // Load the next question
        }
    }, 1000);  // Delay before moving to next question or ending the quiz
}

// Timer Logic
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout(); // Timeout handler
        }
    }, 1000);
}

// Update Timer Display
function updateTimerDisplay() {
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 5) {
        timerDisplay.style.color = 'red'; // Change color to red
    } else {
        timerDisplay.style.color = 'black'; // Reset color
    }
}

// Handle Timeout (When timer reaches 0)
function handleTimeout() {
    const currentQuestion = filteredQuestions[currentQuestionIndex];

    optionsContainer.querySelectorAll('.option').forEach((button, index) => {
        button.classList.add('disabled');
        if (index === currentQuestion.correct) {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    setTimeout(() => {
        if (currentQuestionIndex < filteredQuestions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

// Next Question (Skip to next question)
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

// Previous Question
prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

// Update Progress Bar
function updateProgressBar() {
    const progress = (currentQuestionIndex + 1) / filteredQuestions.length * 100;
    progressBar.style.width = `${progress}%`;
}

// End Quiz
function endQuiz() {
    clearInterval(timerInterval);  // Stop the timer
    const skippedQuestions = filteredQuestions.length - (correctAnswers + incorrectAnswers);
    
    // Display quiz results
    questionContainer.textContent = `Quiz Over!`;
    optionsContainer.innerHTML = `
        <p>Your Results:</p>
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Incorrect Answers: ${incorrectAnswers}</p>
        <p>Skipped Questions: ${skippedQuestions}</p>
    `;
    
    // Hide navigation buttons and timer
    prevButton.style.display = "none";  // Hide the previous button
    nextButton.style.display = "none";  // Hide the next button
    timerDisplay.style.display = "none";  // Hide the timer at the end
    
    // Show the restart button
    restartButtonContainer.style.display = "block";  
}

// Restart Quiz
function restartQuiz() {
    correctAnswers = 0;
    incorrectAnswers = 0;
    currentQuestionIndex = 0;
    timeLeft = 15;
    restartButtonContainer.style.display = "none";
    prevButton.style.display = "inline-block";
    nextButton.style.display = "inline-block";
    timerDisplay.style.display = "inline-block"; // Show the timer again
    loadQuestion();
}