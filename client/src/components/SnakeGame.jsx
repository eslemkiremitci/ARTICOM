import React, { useState, useEffect } from "react";

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [food, setFood] = useState({ x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10) });
  const [direction, setDirection] = useState({ x: 0, y: 1 });
  const [isGameOver, setIsGameOver] = useState(false);
  const gridSize = 10;

  useEffect(() => {
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newHead = {
          x: (prevSnake[0].x + direction.x + gridSize) % gridSize,
          y: (prevSnake[0].y + direction.y + gridSize) % gridSize,
        };

        // Çarpma kontrolü
        const hitSelf = prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y);
        if (hitSelf) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Yem yeme kontrolü
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
          return [newHead, ...prevSnake];
        }

        return [newHead, ...prevSnake.slice(0, -1)];
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction, food]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" && direction.y !== 1) setDirection({ x: -1, y: 0 });
      if (e.key === "ArrowDown" && direction.y !== -1) setDirection({ x: 1, y: 0 });
      if (e.key === "ArrowLeft" && direction.x !== 1) setDirection({ x: 0, y: -1 });
      if (e.key === "ArrowRight" && direction.x !== -1) setDirection({ x: 0, y: 1 });
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
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: gridSize * gridSize }).map((_, index) => {
            const x = Math.floor(index / gridSize);
            const y = index % gridSize;
            const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={index}
                className={`w-6 h-6 ${
                  isSnake ? "bg-green-500" : isFood ? "bg-red-500" : "bg-gray-700"
                }`}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
