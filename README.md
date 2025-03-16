# TriviaTime - Python Quiz

TriviaTime is an interactive quiz application designed to test and enhance your Python knowledge across various categories. Featuring a sleek, user-friendly interface, it provides real-time feedback, a progress tracker, and results at the end of each quiz session.

You can access the live version of the quiz application here: [TriviaTime - Python Quiz](https://syam-7096.github.io/TriviaTime/)

## Features

- **Timer for Each Question**: Each question is timed with a 15-second countdown.
- **Progress Bar**: Track your quiz progress visually.
- **Category Selection**: Choose from multiple Python-related topics such as Functions, OOP, and Data Structures.
- **Real-Time Feedback**: Get immediate feedback on your answers.
- **Results Display**: View the number of correct, incorrect, and skipped answers at the end.
- **Mobile-Friendly Design**: Responsive layout for seamless use on desktops, tablets, and smartphones.

## Requirements

- HTML
- CSS
- JavaScript
- JSON (for storing quiz data)

## Implementation Details

### 1. Category Selection
Users select a quiz category from clickable cards. Once selected, the quiz loads questions from that category.

### 2. Quiz Interaction
- Each quiz consists of multiple-choice questions.
- Questions include explanations for the correct answers.
- Immediate feedback is provided for each answer.

### 3. Timer Functionality
- A countdown timer is displayed for each question.
- Once the timer expires, the correct answer is shown, and the next question loads automatically.

### 4. Navigation
- "Next" and "Previous" buttons allow users to navigate between questions.

### 5. Results Display
At the end of the quiz, results are displayed showing:
- Total correct answers
- Incorrect answers
- Skipped questions

### 6. Restart and Exit Options
After completing a quiz, users can:
- Restart the same quiz
- Exit to the category selection screen

## Screenshots

1. **Category Selection Screen**
   - Displays categories with icons and descriptions.
   ![Category Selection](https://github.com/Syam-7096/TriviaTime/blob/a9c0e0f53d1265357f4dcce1a9f82d030327f96f/screenshots/Category-Selection.png)

2. **Quiz Screen**
   - Displays the current question, options, timer, and navigation buttons.
   ![Quiz Screen](https://github.com/Syam-7096/TriviaTime/blob/5e5b877795ceda8e598171fe5ba86a98a35c1020/screenshots/Quiz-Screen.png)

3. **Results Screen**
   - Shows a summary of the user's performance, including correct, incorrect, and skipped answers.
   ![Results Screen](https://github.com/Syam-7096/TriviaTime/blob/2fec13757416613b2b25a97f0adfa1c7670f04e9/screenshots/Results-Screen.png)

## Setup and Integration

### Clone the Repository:
```bash
git clone https://github.com/Syam-7096/TriviaTime.git
```

### Running Locally:
1. Open `index.html` in your browser.
2. Modify `questions.json` to add or update quiz questions.

### Integration into a Website:
1. Include the `index.html`, `style.css`, `script.js`, and `questions.json` files in your project.
2. Ensure all file paths are correctly linked.

### Deployment:
1. Upload the project files to your web server.
2. Access the application through your server's URL.

## File Structure

- **index.html**: Contains the main structure and elements of the application.
- **style.css**: Handles the styling and responsiveness of the application.
- **script.js**: Manages functionality, including question navigation, timers, and result calculations.
- **questions.json**: Stores quiz data categorized by topics.

## Customization

- Modify the **style.css** file to change the appearance of the quiz.
- Update or expand the question bank in **questions.json**.
- Adjust JavaScript logic in **script.js** to add features or customize quiz behavior.

## Authors

- @Syam-7096
