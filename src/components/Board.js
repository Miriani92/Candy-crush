import React, { useEffect, useState, useRef } from "react";
import blank from "../asset/images/blank.png";
import blue from "../asset/images/blue-candy.png";
import orange from "../asset/images/orange-candy.png";
import green from "../asset/images/green-candy.png";
import purple from "../asset/images/purple-candy.png";
import red from "../asset/images/red-candy.png";
import yellow from "../asset/images/yellow-candy.png";

const BorardWidth = 8;

const Board = () => {
  const [allCandy, setAllCandy] = useState([]);
  const [draggedCandy, setDraggedCandy] = useState(null);
  const [dropCandy, setDropCandy] = useState(null);
  const candys = [blue, orange, green, purple, red, yellow];
  const createBoard = () => {
    let allCandy = [];
    for (let i = 0; i < 64; i++) {
      let candy = Math.floor(Math.random() * candys.length);
      allCandy.push(candys[candy]);
    }
    return setAllCandy(allCandy);
  };

  const dragHandler = (e) => {
    setDraggedCandy(e.target);
  };
  const onDrop = (e) => {
    setDropCandy(e.target);
  };
  const afterDrag = () => {
    const draggedCandyIndex = parseInt(draggedCandy.getAttribute("data-id"));
    const dropCandyIndex = parseInt(dropCandy.getAttribute("data-id"));
    let drag = allCandy[draggedCandyIndex];
    const isBlank = drag === blank;

    const validMoves = [
      draggedCandyIndex + 1,
      draggedCandyIndex - 1,
      draggedCandyIndex + BorardWidth,
      draggedCandyIndex - BorardWidth,
    ];
    const isValidMove = validMoves.includes(dropCandyIndex);
    if (isValidMove && !isBlank) {
      allCandy[draggedCandyIndex] = allCandy[dropCandyIndex];
      allCandy[dropCandyIndex] = drag;
      setDraggedCandy(null);
      setDropCandy(null);
    } else {
      allCandy[draggedCandyIndex] = drag;
      allCandy[dropCandyIndex] = allCandy[dropCandyIndex];
    }
  };
  useEffect(() => {
    createBoard();
  }, []);

  return (
    <div className="board">
      {allCandy.map((candy, index) => {
        return (
          <img
            key={index}
            data-id={index}
            src={candy}
            alt="candy"
            className="img"
            draggable={true}
            onDragStart={dragHandler}
            onDragEnter={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={onDrop}
            onDragEnd={afterDrag}
          />
        );
      })}
    </div>
  );
};

export default Board;
