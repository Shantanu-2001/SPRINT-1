function Astar(startNode,endNode){
 let openSet = []
 let closedSet = []
 let path = [];
 let visitedNodes = [];

 openSet.push(startNode);
  while(openSet.length > 0){
    let minIndex = 0;
    for(let i = 0 ; i < openSet.length;i++){
    if(openSet[i].f < openSet[minIndex].f){
      minIndex = i;
    }
    }

  let current = openSet[minIndex];
  visitedNodes.push(current);
  if(current === endNode){
   let temp = current;
   path.push(temp);
   while(temp.previous){
    path.push(temp.previous);
    temp = temp.previous;
   }
   // console.log(path);
   return {path,visitedNodes};
   // console.log("Done");
  }

  openSet = openSet.filter((element) => element !== current);
  closedSet.push(current);

  let neighbours = current.neighbours;
  for(let i = 0; i < neighbours.length;i++){
   let neighbour = neighbours[i];
   if(!closedSet.includes(neighbour) && !neighbour.isWall){
    let tempG = current.g + 1;
    let newPath = false;
    if(openSet.includes(neighbour)){
     if(tempG < neighbour.g){
      neighbour.g = tempG;
      newPath = true;
     }
    }
    else {
     neighbour.g = tempG;
     newPath = true;
     openSet.push(neighbour);
    }
    if (newPath) {
     neighbour.h = heuristic(neighbour, endNode);
    //  neighbour.f = neighbour.f + neighbour.g;
     neighbour.f = neighbour.h + neighbour.g;
     neighbour.previous = current;
    }

    }
  
  }
 }
 return {path,visitedNodes, error:"No Path found!"};
}


function heuristic(a,b){
 let d = Math.abs(a.x - a.y) + Math.abs(b.x-b.y);
 return d;
}

export default Astar;

// g: cost of getting from the start node to the current node
// h: heuristc estimate of getting from current node to end node
//open set is the collection of the nodes that have been discovered but not been evaluated fully
//close set is the collection of the nodes that have been evaluated 