let questions = {};
let filteredQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timerInterval;
let timeLeft = 15;
let userClickedNext = false;
let feedbackTimeout;

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
const feedbackContainer = document.getElementById('feedback-container');
feedbackContainer.setAttribute('aria-live', 'assertive');

// Fetch questions
fetch('questions.json')
    .then(response => response.json())
    .then(data => questions = data)
    .catch(error => console.error('Error loading the questions:', error));

// Handle category selection
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const selectedCategory = card.getAttribute('data-category');
        const categoryIcon = card.querySelector('.category-icon').textContent;
        document.getElementById('category-icon').textContent = categoryIcon;
        document.getElementById('category-name').textContent = selectedCategory;
        filteredQuestions = questions[selectedCategory] || [];
        if (filteredQuestions.length) startQuiz();
    });
});

// Utility to shuffle an array
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// Start the quiz
const startQuiz = () => {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    shuffleArray(filteredQuestions);
    filteredQuestions.forEach(q => q.answered = false);

    document.getElementById("category-container").style.display = "none";
    quizContainer.style.display = "block";
    exitButton.style.display = "block";
    timerDisplay.style.display = "inline-block";
    prevButton.style.display = "none";
    nextButton.style.display = "inline-block";
    loadQuestion();
};

// Load the current question
const loadQuestion = () => {
    clearInterval(timerInterval);
    timeLeft = 15;
    updateTimerDisplay();
    updateQuestionNumber();

    userClickedNext = false;

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const shuffledOptions = [...currentQuestion.options];
    shuffleArray(shuffledOptions);

    const correctIndexInShuffledOptions = shuffledOptions.indexOf(currentQuestion.options[currentQuestion.correct]);

    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";

    shuffledOptions.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('option');
        optionButton.addEventListener('click', () => handleAnswer(index, correctIndexInShuffledOptions, currentQuestion.explanation));
        optionsContainer.appendChild(optionButton);
    });

    prevButton.style.display = "inline-block";
    nextButton.style.display = "inline-block";
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = false;
    nextButton.textContent = currentQuestionIndex === filteredQuestions.length - 1 ? "Finish" : "Next";
    updateProgressBar();

    if (!currentQuestion.answered) startTimer();
};

// Handle answer selection
const handleAnswer = (selectedIndex, correctIndexInShuffledOptions, explanation) => {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll('.option');

    clearInterval(timerInterval);

    if (currentQuestion.answered) return;

    optionButtons.forEach((button, index) => {
        button.disabled = true;
        button.classList.add('disabled');
        if (index === correctIndexInShuffledOptions) button.classList.add('correct');
        else if (index === selectedIndex) button.classList.add('incorrect');
    });

    currentQuestion.answered = true;
    selectedIndex === correctIndexInShuffledOptions ? correctAnswers++ : incorrectAnswers++;

    showFeedback(explanation, selectedIndex === correctIndexInShuffledOptions);
};

// Display feedback
const showFeedback = (explanation, isCorrect) => {
    feedbackContainer.style.display = 'block';
    feedbackContainer.textContent = isCorrect ? `Correct! ${explanation}` : `Incorrect! ${explanation}`;

    clearTimeout(feedbackTimeout);

    feedbackTimeout = setTimeout(() => {
        if (!userClickedNext) {
            feedbackContainer.style.display = 'none';
            if (currentQuestionIndex === filteredQuestions.length - 1) {
                endQuiz();
            } else {
                currentQuestionIndex++;
                loadQuestion();
            }
        }
    }, 5000);
};

// Handle timeout
const handleTimeout = () => {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll('.option');

    if (currentQuestion.answered) return;

    optionButtons.forEach((button, index) => {
        button.disabled = true;
        button.classList.add('disabled');
        if (index === currentQuestion.correct) button.classList.add('correct');
    });

    currentQuestion.answered = true;
    incorrectAnswers++;

    setTimeout(() => {
        if (currentQuestionIndex < filteredQuestions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
};

// Start the timer
const startTimer = () => {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
};

// Update timer display
const updateTimerDisplay = () => {
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    timerDisplay.style.color = timeLeft <= 5 ? 'red' : 'black';
};

const updateQuestionNumber = () => {
    const questionNumberDisplay = document.getElementById('question-number');
    questionNumberDisplay.textContent = `Question ${currentQuestionIndex + 1} of ${filteredQuestions.length}`;
};

// Update progress bar
const updateProgressBar = () => {
    const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
};

// End the quiz
const endQuiz = () => {
    clearInterval(timerInterval);
    const skippedQuestions = filteredQuestions.length - (correctAnswers + incorrectAnswers);
    questionContainer.textContent = `Quiz Over!`;
    optionsContainer.innerHTML = `
        <p>Your Results:</p>
        <p>Correct: ${correctAnswers}</p>
        <p>Incorrect: ${incorrectAnswers}</p>
        <p>Skipped: ${skippedQuestions}</p>
    `;
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    timerDisplay.style.display = "none";
    exitButton.style.display = "block";
    restartButtonContainer.style.display = "block";
};

// Event listeners for navigation buttons
[nextButton, prevButton].forEach(button => {
    button.addEventListener('click', () => {
        userClickedNext = button === nextButton;

        clearTimeout(feedbackTimeout);
        feedbackContainer.style.display = 'none';

        if (userClickedNext && currentQuestionIndex === filteredQuestions.length - 1) {
            endQuiz();
        } else {
            currentQuestionIndex += button === nextButton ? 1 : -1;
            loadQuestion();
        }

        updateProgressBar();
    });
});

// Exit the quiz
exitButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    filteredQuestions = [];
    currentQuestionIndex = 0;
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

// Restart the quiz
const restartQuiz = () => {
    correctAnswers = 0;
    incorrectAnswers = 0;
    currentQuestionIndex = 0;
    timeLeft = 15;
    filteredQuestions.forEach(q => q.answered = false);
    shuffleArray(filteredQuestions);
    restartButtonContainer.style.display = "none";
    prevButton.style.display = "inline-block";
    nextButton.style.display = "inline-block";
    timerDisplay.style.display = "inline-block";
    exitButton.style.display = "block";
    loadQuestion();
};