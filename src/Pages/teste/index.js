import React, { useState } from "react";

function Teste({ onSwipeUp }) {
  const [startY, setStartY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;

    if (distance > 100 && isSwiping) {
      onSwipeUp();
      setIsSwiping(false);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      Swipe up to continue
    </div>
  );
}

export default Teste;
