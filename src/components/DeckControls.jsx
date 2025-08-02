// displays the buttons that control the deck: shuffle, navigate, mark known, reset known,
// and also shows how many cards are known out of the total.

export default function DeckControls({
  onNext, // go to the next card
  onPrevious, // go to the previous card
  onShuffle, // randomize card order
  onMarkKnown, // mark current card as known
  onResetKnown, // clear all known
  disablePrevNext, // whether previous/next should be disabled 
  knownCount, // number of cards known
  deckSize, // total number of cards in the deck
}) {
  return (
    <div className="controls">
      {/* shuffle cards*/}
      <button onClick={onShuffle}>Shuffle</button>

      {/* navigate backward */}
      <button onClick={onPrevious} disabled={disablePrevNext}>
        Previous
      </button>

      {/* navigate forward */}
      <button onClick={onNext} disabled={disablePrevNext}>
        Next
      </button>

      {/* mark current card known */}
      <button onClick={onMarkKnown}>Mark Known</button>

      {/* reset known cards */}
      <button onClick={onResetKnown}>Reset Known</button>

      {/* summary of known vs total */}
      <div className="known-summary">
        Known: {knownCount} / {deckSize}
      </div>
    </div>
  );
}
