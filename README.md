# TriviaTime - Python Quiz

This project is a dynamic quiz page that can be integrated into a future website. The page allows users to test their knowledge in various categories by answering multiple-choice questions with a time limit for each. It features a timer, progress bar, and displays results after the quiz ends.

## Requirements

- **HTML**
- **CSS**
- **JavaScript**
- **JSON** (for storing quiz data)

## Implementation

### 1. **Category Selection**
   Users begin by selecting a category for the quiz. Categories are displayed as clickable cards, and once a category is selected, the quiz page loads with questions from that category.

### 2. **Quiz Interaction**
   The quiz consists of multiple-choice questions, each with a 15-second time limit. Users can answer questions by selecting an option, and the page provides immediate feedback on whether the answer was correct or incorrect.

### 3. **Timer Functionality**
   A countdown timer is displayed for each question. When the time runs out, the correct answer is shown, and the page automatically moves to the next question.

### 4. **Navigation**
   Users can navigate between questions using "Next" and "Previous" buttons. These allow the user to review or skip questions.

### 5. **Results Display**
   After the last question is answered or the timer runs out, the user is shown their results, which include the number of correct, incorrect, and skipped answers.

### 6. **Restarting or Exiting**
   After completing the quiz, the user can either restart the quiz or exit back to the category selection screen.

## Features

- **Timer for Each Question**: A countdown timer of 15 seconds for each question.
- **Progress Bar**: Shows the user’s progress through the quiz.
- **Category Selection**: Users can choose different categories of questions.
- **Real-Time Feedback**: Immediate feedback is provided after each answer is selected.
- **Results Display**: Shows the number of correct, incorrect, and skipped answers at the end of the quiz.
- **Responsive Design**: The page is designed to be mobile-friendly and will work on desktop, tablet, and mobile devices.
- **Navigation Buttons**: Buttons to move between questions (Next, Previous).

## Screenshots

### 1. **Category Selection Screen**
   This screen allows users to choose from different quiz categories.
   ![Category Selection](screenshot1.png)

### 2. **Quiz Screen**
   This is the main quiz interface where users can answer questions and see a countdown timer.
   ![Quiz Screen](screenshot2.png)

### 3. **Results Screen**
   After the quiz ends, this screen shows the user's results, including the number of correct, incorrect, and skipped answers.
   ![Results Screen](screenshot3.png)

## How to Integrate

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Syam-7096/TriviaTime.git
   ```

2. **Integration into Website:**
   - To use this quiz page within a website, simply include the HTML, CSS, and JavaScript files in the desired section of your website.
   - Ensure that the `questions.json` file is properly linked and contains all the quiz data for different categories.

3. **Running Locally:**
   - Open the `index.html` file in your browser to run the quiz page.
   - You can modify the `questions.json` file to add or update quiz questions.

4. **Customization:**
   - You can customize the look and feel of the quiz by editing the `styles.css` file.
   - Modify the JavaScript functions if you want to change how the quiz behaves or if you want to add new features.

5. **Deployment:**
   - If you are deploying the website, upload the HTML, CSS, JavaScript, and JSON files to your web server.

## Authors

- @Syam-7096