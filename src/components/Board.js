import React, { useEffect, useState } from "react";
import blank from "../asset/images/blank.png";
import blue from "../asset/images/blue-candy.png";
import orange from "../asset/images/orange-candy.png";
import green from "../asset/images/green-candy.png";
import purple from "../asset/images/purple-candy.png";
import red from "../asset/images/red-candy.png";
import yellow from "../asset/images/yellow-candy.png";

const Board = () => {
  const [allCandy, setAllCandy] = useState([]);
  const candys = [blue, orange, green, purple, red, yellow];
  const createBoard = () => {
    let allCandy = [];
    for (let i = 0; i < 64; i++) {
      let candy = Math.floor(Math.random() * candys.length);
      allCandy.push(candys[candy]);
    }
    return setAllCandy(allCandy);
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
          />
        );
      })}
    </div>
  );
};

export default Board;
