import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'flashcard_app_state';

// build default deck: multiplication facts from 2×2 to 12×12
function generateDeck() {
  const deck = [];
  for (let i = 2; i <= 12; i++) {
    for (let j = 2; j <= 12; j++) {
      deck.push({
        question: `${i} × ${j}`,
        answer: String(i * j),
        known: false, 
      });
    }
  }
  return deck;
}

export function useFlashcards() {
  // load deck from localStorage if present, otherwise generate default
  const [deck, setDeck] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.deck) && parsed.deck.length > 0) {
          return parsed.deck;
        }
      } catch {
        // ignore errors and fall back
      }
    }
    return generateDeck();
  });

  // current position in the deck
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.currentIndex === 'number' && parsed.currentIndex >= 0) {
          return parsed.currentIndex;
        }
      } catch {
        // ignore
      }
    }
    return 0;
  });

  // whether the current card is flipped
  const [flipped, setFlipped] = useState(false);

  // global counters for correctness tracking
  const [correctAnswers, setCorrectAnswers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return typeof parsed.correctAnswers === 'number' ? parsed.correctAnswers : 0;
      } catch {}
    }
    return 0;
  });
  const [totalAttempts, setTotalAttempts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return typeof parsed.totalAttempts === 'number' ? parsed.totalAttempts : 0;
      } catch {}
    }
    return 0;
  });

  // persist relevant state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ deck, currentIndex, correctAnswers, totalAttempts })
    );
  }, [deck, currentIndex, correctAnswers, totalAttempts]);

  // if deck somehow becomes empty or invalid, restore default
  useEffect(() => {
    if (!Array.isArray(deck) || deck.length === 0) {
      setDeck(generateDeck());
      setCurrentIndex(0);
    }
  }, [deck]);

  // flip card 
  const flip = () => setFlipped((f) => !f);

  // go to next card (wraps around)
  const next = () => {
    setFlipped(false);
    setCurrentIndex((i) => (deck.length ? (i + 1) % deck.length : 0));
  };

  // go to previous card (wraps around)
  const previous = () => {
    setFlipped(false);
    setCurrentIndex((i) =>
      deck.length ? (i === 0 ? deck.length - 1 : i - 1) : 0
    );
  };

  // shuffle the deck randomly and reset index
  const shuffle = useCallback(() => {
    setFlipped(false);
    setDeck((d) => {
      const arr = [...d];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
    setCurrentIndex(0);
  }, []);

  // mark current card as known
  const markKnown = () =>
    setDeck((d) => {
      if (!d.length) return d;
      const copy = [...d];
      copy[currentIndex] = { ...copy[currentIndex], known: true };
      return copy;
    });

  // reset all known 
  const resetKnown = () =>
    setDeck((d) => d.map((c) => ({ ...c, known: false })));

  // record whether an answer was correct (updates attempt counters)
  const recordAnswer = (isCorrect) => {
    setTotalAttempts((t) => t + 1);
    if (isCorrect) setCorrectAnswers((c) => c + 1);
  };

  // clear correctness stats
  const resetStats = () => {
    setCorrectAnswers(0);
    setTotalAttempts(0);
  };

  // full reset: deck, position, flips, and stored data
  const resetAll = () => {
    const newDeck = generateDeck();
    setDeck(newDeck);
    setCurrentIndex(0);
    setFlipped(false);
    setCorrectAnswers(0);
    setTotalAttempts(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  // how many cards are marked known
  const knownCount = deck.filter((c) => c.known).length;

  return {
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
    resetStats,
    resetAll,
    setCurrentIndex,
    setFlipped,
  };
}
