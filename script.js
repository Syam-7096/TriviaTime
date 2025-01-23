let questions = {};
let filteredQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timerInterval;
let timeLeft = 15;

const categoryCards = document.querySelectorAll('.category-card');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');
const restartButtonContainer = document.getElementById('restart-btn-container');
const exitButton = document.getElementById('exit-btn');

fetch('questions.json')
    .then(response => response.json())
    .then(data => questions = data)
    .catch(error => console.error('Error loading the questions:', error));

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const selectedCategory = card.getAttribute('data-category');
        const categoryIcon = card.querySelector('.category-icon').textContent;
        document.getElementById('category-icon').textContent = categoryIcon;
        document.getElementById('category-name').textContent = selectedCategory;
        filteredQuestions = questions[selectedCategory] || [];
        if (filteredQuestions.length) startQuiz(selectedCategory, categoryIcon);
    });
});

function startQuiz(selectedCategory, categoryIcon) {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    document.getElementById("category-container").style.display = "none";
    quizContainer.style.display = "block";
    exitButton.style.display = "block";
    timerDisplay.style.display = "inline-block";
    prevButton.style.display = "none";
    nextButton.style.display = "inline-block";
    nextButton.style.textAlign = "right";
    loadQuestion();
}


function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 15;
    updateTimerDisplay();
    const currentQuestion = filteredQuestions[currentQuestionIndex];

    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ""; // Clear previous options
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('option');
        optionButton.addEventListener('click', () => handleAnswer(index));
        optionsContainer.appendChild(optionButton);
    });

    prevButton.style.display = "inline-block"; // Show "Prev" button
    nextButton.style.display = "inline-block"; // Show "Next" button
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = false;
    nextButton.textContent = currentQuestionIndex === filteredQuestions.length - 1 ? "Finish" : "Next";
    updateProgressBar();
    startTimer();
}

function handleAnswer(selectedIndex) {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll('.option');
    
    optionButtons.forEach((button, index) => {
        button.disabled = true;  // Disable all options after selection
        button.classList.add('disabled'); 
        if (index === currentQuestion.correct) {
            button.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== currentQuestion.correct) {
            button.classList.add('incorrect');
        }
    });
    if (selectedIndex === currentQuestion.correct) {
        correctAnswers++;  
    } else {
        incorrectAnswers++;  
    }
    setTimeout(() => {
        if (currentQuestionIndex === filteredQuestions.length - 1) {
            endQuiz();
        } else {
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1000);
}

function handleTimeout() {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll('.option');
    
    optionButtons.forEach((button, index) => {
        button.disabled = true;
        button.classList.add('disabled');
        
        if (index === currentQuestion.correct) {
            button.classList.add('correct');
        }
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

function startTimer() {
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
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    timerDisplay.style.color = timeLeft <= 5 ? 'red' : 'black';
}

function updateProgressBar() {
    const progress = (currentQuestionIndex + 1) / filteredQuestions.length * 100;
    progressBar.style.width = `${progress}%`;
}

function endQuiz() {
    clearInterval(timerInterval);
    const skippedQuestions = filteredQuestions.length - (correctAnswers + incorrectAnswers);
    questionContainer.textContent = `Quiz Over!`;
    optionsContainer.innerHTML = `
        <p>Your Results:</p>
        <p>Correct: ${correctAnswers}</p>
        <p>Incorrect: ${incorrectAnswers}</p>
        <p>Skipped: ${skippedQuestions}</p>
    `;
    prevButton.style.display = "none"; // Hide "Prev" button
    nextButton.style.display = "none"; // Hide "Next" button
    timerDisplay.style.display = "none"; // Hide timer
    exitButton.style.display = "block"; // Show exit button on score screen
    restartButtonContainer.style.display = "block"; // Show restart button
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex === filteredQuestions.length - 1) {
        endQuiz();
    } else {
        currentQuestionIndex++;
        loadQuestion();
    }
});

prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

exitButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    document.getElementById("category-container").style.display = "block";
    quizContainer.style.display = "none";
    exitButton.style.display = "none";
    restartButtonContainer.style.display = "none";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    timerDisplay.style.display = "none";
    document.getElementById('category-icon').textContent = '';
    document.getElementById('category-name').textContent = '';
});

function restartQuiz() {
    correctAnswers = 0;
    incorrectAnswers = 0;
    currentQuestionIndex = 0;
    timeLeft = 15;
    const timerElement = document.getElementById('timer');
    timerElement.style.position = 'relative';
    timerElement.style.textAlign = 'center';
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    restartButtonContainer.style.display = "none";
    prevButton.style.display = "inline-block";
    nextButton.style.display = "inline-block"; 
    timerDisplay.style.display = "inline-block"; 
    exitButton.style.display = "block";
    loadQuestion();
}