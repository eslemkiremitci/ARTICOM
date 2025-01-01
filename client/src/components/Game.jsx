// src/components/Game.jsx
import React, { useState, useEffect } from "react";

const letters = ["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"];

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
  return array;
}

const Game = () => {
  const [cards, setCards] = useState([]);
  const [firstPick, setFirstPick] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [disableAll, setDisableAll] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (firstPick && secondPick) {
      setDisableAll(true);
      if (firstPick.value === secondPick.value) {
        setCards(prev => {
          return prev.map(card => {
            if (card.id === firstPick.id || card.id === secondPick.id) {
              return { ...card, isMatched: true };
            }
            return card;
          });
        });
        setMatchedCount(prev => prev + 2);
        resetPicks();
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card => {
              if (card.id === firstPick.id || card.id === secondPick.id) {
                return { ...card, isFlipped: false };
              }
              return card;
            })
          );
          resetPicks();
        }, 1000);
      }
    }
  }, [firstPick, secondPick]);

  const resetPicks = () => {
    setFirstPick(null);
    setSecondPick(null);
    setDisableAll(false);
  };

  const startNewGame = () => {
    const shuffled = shuffle([...letters]);
    const prepared = shuffled.map((value, idx) => ({
      id: idx,
      value,
      isFlipped: false,
      isMatched: false
    }));
    setCards(prepared);
    setFirstPick(null);
    setSecondPick(null);
    setMatchedCount(0);
    setDisableAll(false);
  };

  const handleCardClick = (card) => {
    if (disableAll || card.isMatched || card.isFlipped) return;
    setCards(prev =>
      prev.map(c => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );
    if (!firstPick) {
      setFirstPick({ ...card, isFlipped: true });
    } else if (!secondPick) {
      setSecondPick({ ...card, isFlipped: true });
    }
  };

  const allMatched = matchedCount === cards.length && cards.length > 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      
      <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-md">
        Memory Game
      </h2>

      {allMatched ? (
        <div className="text-center mb-4 text-xl font-semibold text-green-300">
          Tebrikler! Tüm eşleşmeleri buldunuz.
        </div>
      ) : (
        <p className="text-sm mb-4 text-white/80 font-medium">
          İki aynı harfi eşleştirmeye çalışın!
        </p>
      )}

      <div className="grid grid-cols-4 grid-rows-4 gap-3 sm:gap-4 w-[280px] sm:w-[360px] md:w-[400px]">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={
              "h-14 sm:h-20 text-xl sm:text-2xl font-extrabold rounded-md border-2 transition-all duration-300 transform " +
              (card.isFlipped || card.isMatched
                ? "bg-green-400 text-black border-green-500 scale-105 shadow-lg"
                : "bg-gray-700 text-transparent border-gray-600 hover:bg-gray-600 hover:scale-105")
            }
          >
            {card.isFlipped || card.isMatched ? card.value : "?"}
          </button>
        ))}
      </div>

      <button
        onClick={startNewGame}
        className="
          mt-8 px-7 py-3 
          bg-gradient-to-r from-purple-600 to-pink-500 
          rounded-full text-white font-bold 
          hover:scale-110 transition-transform duration-300 
          shadow-xl
        "
      >
        Baştan Başla
      </button>
    </div>
  );
};

export default Game;