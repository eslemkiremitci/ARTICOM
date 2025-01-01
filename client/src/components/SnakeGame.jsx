import React, { useState, useEffect } from "react";

const SnakeGame = () => {
  // 1) Oyun alanı boyutu (20 yerine 30 yaptık)
  const gridSize = 30;

  // 2) Eyaletler
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  });
  const [direction, setDirection] = useState({ x: 0, y: 1 });
  const [isGameOver, setIsGameOver] = useState(false);

  // 3) Hareket döngüsü
  useEffect(() => {
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          // Ekran dışına çıkarsa mod alarak diğer tarafa geçiyor
          x: (head.x + direction.x + gridSize) % gridSize,
          y: (head.y + direction.y + gridSize) % gridSize,
        };

        // Yılanın kendine çarpma kontrolü
        const hitSelf = prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        );
        if (hitSelf) {
          setIsGameOver(true);
          return prevSnake; // Oyunu bitir
        }

        // Yem kontrolü (head ile food aynı konumdaysa)
        if (newHead.x === food.x && newHead.y === food.y) {
          // Yeni yem oluştur
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
          });
          // Yılan uzar (yeni kafa + mevcut gövde)
          return [newHead, ...prevSnake];
        }

        // Normalde hareket ederken ilk eleman (kafa) en öne eklenir, son eleman atılır
        return [newHead, ...prevSnake.slice(0, -1)];
      });
    };

    // Yılanı her 150 ms'de bir hareket ettir
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [direction, food, gridSize]);

  // 4) Klavye Kontrolleri (Ok tuşları)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Yukarı (ArrowUp) => direction = {x: -1, y: 0}
      if (e.key === "ArrowUp" && direction.y !== 1) {
        setDirection({ x: -1, y: 0 });
      }
      // Aşağı (ArrowDown) => direction = {x: 1, y: 0}
      if (e.key === "ArrowDown" && direction.y !== -1) {
        setDirection({ x: 1, y: 0 });
      }
      // Sol (ArrowLeft) => direction = {x: 0, y: -1}
      if (e.key === "ArrowLeft" && direction.x !== 1) {
        setDirection({ x: 0, y: -1 });
      }
      // Sağ (ArrowRight) => direction = {x: 0, y: 1}
      if (e.key === "ArrowRight" && direction.x !== -1) {
        setDirection({ x: 0, y: 1 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // 5) Render
  return (
    <div className="relative w-full h-full bg-black text-white">
      {/* Oyun Bitti */}
      {isGameOver ? (
        <p className="absolute inset-0 flex items-center justify-center text-red-500 font-bold text-xl">
          Oyun Bitti! Skor: {snake.length - 1}
        </p>
      ) : (
        // Oyun Alanı
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, index) => {
            const x = Math.floor(index / gridSize);
            const y = index % gridSize;

            // Yılan gövdesinin parçası mı?
            const isSnake = snake.some(
              (segment) => segment.x === x && segment.y === y
            );
            // Yem mi?
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={index}
                className={`w-full h-full ${
                  isSnake
                    ? "bg-green-500"
                    : isFood
                    ? "bg-red-500"
                    : "bg-gray-700"
                } border border-gray-800`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
