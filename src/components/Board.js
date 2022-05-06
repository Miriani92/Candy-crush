import React, { useEffect, useState } from "react";
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
  const matchFourCandyColumn = () => {
    for (let i = 0; i <= 39; i++) {
      const currentColor = allCandy[i];
      const matchinCandyIndexes = [
        i,
        i + BorardWidth,
        i + BorardWidth * 2,
        i + BorardWidth * 3,
      ];
      const isBlank = allCandy[i] === blank;
      const isMatch = matchinCandyIndexes.every(
        (index) => allCandy[index] === currentColor
      );
      if (isMatch && !isBlank) {
        matchinCandyIndexes.forEach((index) => (allCandy[index] = blank));
        setAllCandy([...allCandy]);
        return true;
      }
    }
  };
  const matchThreeCandyColumn = () => {
    for (let i = 0; i <= 47; i++) {
      const matchCandyIndexes = [i, i + BorardWidth, i + BorardWidth * 2];
      const currentColor = allCandy[i];
      const isBlank = currentColor === blank;
      const isMatch = matchCandyIndexes.every(
        (index) => allCandy[index] === currentColor
      );
      if (!isBlank && isMatch) {
        matchCandyIndexes.forEach((ind) => (allCandy[ind] = blank));
        setAllCandy([...allCandy]);
        return true;
      }
    }
  };

  const matchFourCandyRow = () => {
    for (let i = 0; i < 63; i++) {
      const invalidIndexes = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63,
      ];
      if (invalidIndexes.includes(i)) continue;
      const currentColor = allCandy[i];
      let matchCandyIndexes = [i, i + 1, i + 2, i + 3];
      const isBlank = allCandy[i] === blank;
      const isMatch = matchCandyIndexes.every(
        (ind) => allCandy[ind] === currentColor
      );
      if (!isBlank && isMatch) {
        matchCandyIndexes.forEach((ind) => (allCandy[ind] = blank));
        setAllCandy([...allCandy]);
        return true;
      }
    }
  };
  const matchThreeCandyRow = () => {
    for (let i = 0; i < 63; i++) {
      const invalidIndexes = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63,
      ];
      const matchThreeCandy = [i, i + 1, i + 2];
      const currentColor = allCandy[i];
      const isBlank = currentColor === blank;
      if (invalidIndexes.includes(i)) continue;
      const isMatch = matchThreeCandy.every(
        (index) => allCandy[index] === currentColor
      );
      if (!isBlank && isMatch) {
        matchThreeCandy.forEach((ind) => (allCandy[ind] = blank));
        setAllCandy([...allCandy]);
        return true;
      }
    }
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
    const isColumnFourMatch = matchFourCandyColumn();
    const isColumnThreeMatch = matchThreeCandyColumn();
    const isRowOfFourMatch = matchFourCandyRow();
    const isRowOfThreeMatch = matchThreeCandyRow();
    const isValidMove = validMoves.includes(dropCandyIndex);
    if (isValidMove && !isBlank) {
      allCandy[draggedCandyIndex] = allCandy[dropCandyIndex];
      allCandy[dropCandyIndex] = drag;
      if (
        isColumnFourMatch ||
        isColumnThreeMatch ||
        isRowOfFourMatch ||
        isRowOfThreeMatch
      ) {
        setDraggedCandy(null);
        setDropCandy(null);
      }
    } else {
      allCandy[draggedCandyIndex] = drag;
      allCandy[dropCandyIndex] = allCandy[dropCandyIndex];
    }
    setAllCandy([...allCandy]);
  };
  useEffect(() => {
    createBoard();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      matchFourCandyColumn();
      matchThreeCandyColumn();
      matchFourCandyRow();
      matchThreeCandyRow();
    }, 100);
    return () => clearInterval(interval);
  }, [
    matchFourCandyColumn,
    matchThreeCandyColumn,
    matchFourCandyRow,
    matchThreeCandyRow,
  ]);

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
