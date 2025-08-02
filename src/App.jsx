import './App.css';
import { useState, useEffect } from 'react';
import { useFlashcards } from './hooks/useFlashcards.jsx';
import Flashcard from './components/Flashcard.jsx';
import DeckControls from './components/DeckControls.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';

// returns a motivational message based on coins earned
function getCoinMessage(coins) {
  if (coins < 100) return `Keep going! 😊`;
  if (coins < 300) return `You're doing great! 👍`;
  if (coins < 800) return `Awesome job! 🌟`;
  if (coins < 1200) return `You're almost there! 🚀`;
  return `WOO! All done 🎉`;
}

function App() {
  // grab everything from the flashcard hook
  const {
    deck,
    currentIndex,
    flipped,
    flip,
    next,
    previous,
    shuffle,
    markKnown,
    resetKnown,
    knownCount,
    correctAnswers,
    totalAttempts,
    recordAnswer,
    resetAll,
    setCurrentIndex,
  } = useFlashcards();

  const currentCard = deck[currentIndex] || null;

  // local input & feedback state
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'

  // coin system: 10 coins per correct answer
  const coins = correctAnswers * 10;
  const coinMessage = getCoinMessage(coins);

  // clear input/feedback when card changes
  useEffect(() => {
    setUserAnswer('');
    setFeedback(null);
  }, [currentIndex]);

  // handle answer submission
  const checkAnswer = (e) => {
    e.preventDefault();
    if (!currentCard) return;
    const sanitizedUser = userAnswer.trim();
    const isCorrect = sanitizedUser === currentCard.answer.trim();
    if (isCorrect) {
      recordAnswer(true);      // count it
      setFeedback('correct');  // show correct message
      markKnown();             // mark card known
      if (!flipped) flip();    // flip only on correct
    } else {
      recordAnswer(false);     // attempt but wrong
      setFeedback('incorrect'); // show try again :(
      // do not flip so student can retry
    }
  };

  return (
    <div className="app">
      <h1>Oscar&apos;s Multiplication Game</h1>

      {/* top summary / controls */}
      <div className="top">
        <ProgressTracker
          currentIndex={currentIndex}
          deckSize={deck.length}
          knownCount={knownCount}
        />
        <div className="deck-summary">
          <div>Total cards: {deck.length}</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentIndex(0)}>Go to First</button>
            <button onClick={resetAll}>Reset Game</button>
          </div>
        </div>
      </div>

      {/* performance stats */}
      <div className="stats">
        <div>
          Correct Answers: {correctAnswers} / {totalAttempts}
        </div>
        {totalAttempts > 0 && (
          <div>
            Accuracy:{' '}
            {Math.round((correctAnswers / totalAttempts) * 100)}%
          </div>
        )}
      </div>

      {/* coin reward display */}
      <div className="coin-box">
        <div className="coin-total">
          Coin Total: <strong>{coins}</strong>
        </div>
        {coinMessage && <div className="coin-message">{coinMessage}</div>}
      </div>

      {/* main flashcard */}
      <div className="card-section">
        <Flashcard card={currentCard} flipped={flipped} onFlip={flip} />
      </div>

      {/* navigation / known controls */}
      <DeckControls
        onNext={next}
        onPrevious={previous}
        onShuffle={shuffle}
        onMarkKnown={markKnown}
        onResetKnown={resetKnown}
        disablePrevNext={deck.length === 0}
        knownCount={knownCount}
        deckSize={deck.length}
      />

      {/* answer input and feedback */}
      <div className="answer-section">
        <form onSubmit={checkAnswer} className="answer-form">
          <label>
            Your answer:{' '}
            <input
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                setFeedback(null); // clear feedback while typing
              }}
              placeholder="Type product"
              autoComplete="off"
            />
          </label>
          <button type="submit" disabled={!currentCard}>
            Check Answer
          </button>
        </form>
        {feedback === 'correct' && (
          <div className="feedback correct">Correct! ✅</div>
        )}
        {feedback === 'incorrect' && (
          <div className="feedback incorrect">try again :(</div>
        )}
      </div>
    </div>
  );
}

export default App;
