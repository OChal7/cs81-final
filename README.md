# Oscar’s Multiplication Game

**Inspiration:** A beginner-friendly math flashcard tool I use with elementary school students that I currently tutor.

## Project Summary
Oscar’s Multiplication Game helps students practice multiplication facts (2×2 through 12×12) in an interactive way. It gives immediate feedback, tracks correct/total answers, awards virtual coins, and lets students mark known cards.

## Key Features
- Multiplication flashcards (2×2 through 12×12, easily expandable).  
- Check answer input: only flips the card when the student gets it right; wrong answers show “try again :(”.  
- Progress tracker: correct/total tracking, known cards, and current position saved in `localStorage`.  
- Coin reward system (10 coins per correct answer) with motivational messages.  
- Navigation controls: Shuffle, Previous, Next, Mark Known, Reset Known.  
- Full game reset button.  
- Kid-friendly theme and responsive layout.  
- App is centered for a clean look on all screen sizes.

## Technologies Used
- JavaScript (React)  
- Vite (build/dev tooling)  
- HTML & CSS  
- `localStorage` for persistence

## Installation & Local Development
1. Clone the repo:  
   ```bash
   git clone https://github.com/OChal7/cs81-final.git
   cd cs81-final
   npm install
   npm run dev 

## Instructions for Use
### 1. Start-Up
- Run the app locally with `npm run dev` and open the URL shown in your browser (e.g., `http://localhost:5173`).
- The app loads a deck of multiplication flashcards (2×2 through 12×12).

### 2. Practice a question
- Look at the current card’s question (e.g., “7 × 8”).  
  - You can click the card to manually flip it, but ideally you’ll type your answer first.

### 3. Submit an Answer
- Type your guess into the “Your answer” input field.
- Click Check Answer (or press Enter).
  - If the answer is correct, the card will automatically flip to reveal the answer, the fact is marked known, and you earn coins. A “Correct! ✅” message appears.
  - If the answer is incorrect, it shows “try again :(” and the card does not flip — you can revise and retry without revealing the answer.

### 4. Navigate the Deck
- Shuffle: Randomizes the order of the cards.  
- Previous / Next: Move backward or forward through the deck.  
- Go to First: Resets the position to the very first card in the current order.

### 5. Track and Adjust Progress
- Correct Answers / Accuracy: Shows how many answers you've gotten right out of total attempts and your percentage accuracy.  
- Mark Known: Manually mark the current card as known (even without answering it).  
- Reset Known: Clears all “known” cards so you can practice from scratch again.

### 6. Rewards
- For every correct answer you earn 10 coins.  
- The coin total is displayed, along with a motivational message that updates as you accumulate coins.

### 7. Reset the Game
- Click Reset Game to clear all progress: deck order, known statuses, correct/total counts, and coin tally. This starts you fresh with the default multiplication deck.

### Tips for Tutors/Students
- Encourage students to aim for streaks of correct answers before moving on to harder tables by changing "<=" values in  
    --  "   for (let i = 2; i <= 12; i++) {
    --      for (let j = 2; j <= 12; j++) {>.   "   section of useFlashcards.jsx  AND click "reset game" after
- Use Shuffle to mix up practice and avoid memorizing order.  