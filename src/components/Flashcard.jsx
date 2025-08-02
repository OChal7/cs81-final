import './Flashcard.css'; // styling for the flip card

// shows a single flashcard; flips between question and answer
export default function Flashcard({ card, flipped, onFlip }) {
  if (!card) return <div className="no-card">No cards available.</div>;

  return (
    <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="inner">
        {/* front side: question */}
        <div className="front">
          <div className="label">Question</div>
          <div className="text">{card.question}</div>
        </div>

        {/* back side: answer */}
        <div className="back">
          <div className="label">Answer</div>
          <div className="text">{card.answer}</div>
        </div>
      </div>
    </div>
  );
}
