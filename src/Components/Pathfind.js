import React, { useState, useEffect } from "react";
import Node from "./Node";
import Astar from "../Algorithm/astar";
import "./Pathfind.css";


const cols = 25;
const rows = 10;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;

const Pathfind = () => {
  const [Matrix, setMatrix] = useState([]);
  const [Path, setPath] = useState([]);
  const [VisitedNodes, setVisitedNodes] = useState([]);
  useEffect(() => {
    initializeMatrix();
  }, []);


  //creates the matrix
  const initializeMatrix = () => {
    const matrix = new Array(rows);

    for (let i = 0; i < rows; i++) {
      matrix[i] = new Array(cols);
    }

    createBlock(matrix);

    setMatrix(matrix);
    addneighbours(matrix);

    const startNode = matrix[NODE_START_ROW][NODE_START_COL];
    const endNode = matrix[NODE_END_ROW][NODE_END_COL];
    let path = Astar(startNode, endNode);
    startNode.isWall = false;
    endNode.isWall = false;
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);
  }

  //create the Block
  const createBlock = (matrix) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = new Block(i, j);
      }
    }
  }

  //Add Neighbours
  const addneighbours = (matrix) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        matrix[i][j].addneighbours(matrix);
      }
    }
  }

  //Block constructor
  function Block(i, j) {
    this.x = i;
    this.y = j;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.neighbours = [];
    this.isWall = false;
    if (Math.random(1) < 0.2) {
      this.isWall = true;
    }
    this.previous = undefined;
    this.addneighbours = function (matrix) {
      let i = this.x;
      let j = this.y;
      if (i > 0) this.neighbours.push(matrix[i - 1][j]);
      if (i < rows - 1) this.neighbours.push(matrix[i + 1][j]);
      if (j > 0) this.neighbours.push(matrix[i][j - 1]);
      if (j < cols - 1) this.neighbours.push(matrix[i][j + 1]);


    }
  }

  //matrix with node
  const matrixWithNode = (
    <div>
      {Matrix.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStart, isEnd, isWall } = col;
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowIndex}
                  col={colIndex}
                  isWall={isWall}
                />
              );
            })}
          </div>
        )
      })}
    </div>
  )

  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
      }, 10 * i)
    }
  }

  const visualizePath = () => {
    for (let i = 0; i <= VisitedNodes.length; i++) {
      if (i === VisitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(Path);
        }, 20 * i)
      }
      else {
        setTimeout(() => {
          const node = VisitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
        }, 20 * i);

      }
    }
  }



  console.log(Path);
  return (
    <div className="Wrapper">
      <button onClick={visualizePath}>Visualize</button>
      <h1>Making a matrix</h1>
      {matrixWithNode}
    </div>
  )
}

export default Pathfind;