// src/components/SnakeGame.jsx

import React, { useState, useEffect } from "react";

const SnakeGame = () => {
  const gridSize = 30;

  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  });
  const [direction, setDirection] = useState({ x: 0, y: 1 });
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: (head.x + direction.x + gridSize) % gridSize,
          y: (head.y + direction.y + gridSize) % gridSize,
        };

        // Kendine çarpma
        const hitSelf = prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        );
        if (hitSelf) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Yem kontrolü
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
          return [newHead, ...prevSnake];
        }

        // Normal hareket
        return [newHead, ...prevSnake.slice(0, -1)];
      });
    };

    // Interval 100 ms => daha hızlı hareket ve yön değişimi
    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [direction, food, gridSize]);

  // Ok tuşları
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" && direction.y !== 1) {
        setDirection({ x: -1, y: 0 });
      }
      if (e.key === "ArrowDown" && direction.y !== -1) {
        setDirection({ x: 1, y: 0 });
      }
      if (e.key === "ArrowLeft" && direction.x !== 1) {
        setDirection({ x: 0, y: -1 });
      }
      if (e.key === "ArrowRight" && direction.x !== -1) {
        setDirection({ x: 0, y: 1 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  return (
    <div className="relative w-full h-full bg-black text-white">
      {isGameOver ? (
        <p className="absolute inset-0 flex items-center justify-center text-red-500 font-bold text-xl">
          Oyun Bitti! Skor: {snake.length - 1}
        </p>
      ) : (
        <div
          className="grid w-full h-full"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, i) => {
            const x = Math.floor(i / gridSize);
            const y = i % gridSize;
            const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
            const isFood = x === food.x && y === food.y;

            let cellClass = "bg-gray-700";
            if (isSnake) cellClass = "bg-green-500";
            if (isFood) cellClass = "bg-red-500";

            return (
              <div key={i} className={`${cellClass} border border-gray-800`} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
