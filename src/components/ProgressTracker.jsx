// display of current progress: which card out of total/percentage/known count
export default function ProgressTracker({ currentIndex, deckSize, knownCount }) {
  const progressPercent = deckSize
    ? Math.round(((currentIndex + 1) / deckSize) * 100)
    : 0;

  return (
    <div className="progress">
      <div>
        Card {currentIndex + 1} of {deckSize}
      </div>
      <div>Progress: {progressPercent}%</div>
      <div>Known: {knownCount}</div>
    </div>
  );
}
