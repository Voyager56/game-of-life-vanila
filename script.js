const canvas = document.querySelector(`.game`)
const reset = document.querySelector(`.reset`)
const pause = document.querySelector(`.pause`)
const start = document.querySelector(`.start`)
const random = document.querySelector(`.random`)
const rows = 50;
const cols = 50;
function makeArray(cols,rows){
    return Array(cols).fill(0).map(() => Array(rows).fill(0));;
}
function randomGrid(grid,rows,cols){
    for(let i = 0; i<cols;i++){
      for(let j =0;j<rows;j++){
        grid[i][j] = Math.floor(Math.random()*2)
    }
  }
  return grid
}
function neighbor(grid,col,row){
    let counter = 0;
    for(let i =-1;i<2;i++){
      for(let j = -1;j<2;j++){
         let newI = (col+j+cols)%cols;
         let newJ = (row+i+rows)%rows;
        counter += grid[newI][newJ]
      }
    }
    counter -= grid[col][row]
    return counter;
}
function nextGeneration(grid,cols,rows){
    let nextgen = makeArray(cols,rows)
    for(let i= 0; i<cols;i++){
      for(let j=0;j<rows;j++){
        let p = grid[i][j]
        let count = neighbor(grid,i,j)
        if(p == 1 && (count<2 || count >3)){
          nextgen[i][j] = 0;
        }
        if(p == 1 && (count == 2 || count == 3)){
          nextgen[i][j] = 1;
        }
        if(p == 0 && count==3){
          nextgen[i][j] = 1;
        }
      }
    }
    
    return nextgen;
}
function fillCanvas(grid,cols,rows){
  for(let i = 0; i<cols;i++){
      let colDiv = document.createElement(`div`);
      colDiv.className = `${i}`
      for(let j=0;j<rows;j++){
        let rowDiv = document.createElement(`div`);
            if(grid[i][j] === 1){
              rowDiv.style.backgroundColor = `black`
            }
          rowDiv.className = `${j}`
          rowDiv.style.width = `15px`
          rowDiv.style.display = `inline-block`
          rowDiv.style.border = `1px solid black`
          rowDiv.style.marginTop = `-5px`
          rowDiv.style.height = `15px`
        colDiv.appendChild(rowDiv);
      }
      canvas.appendChild(colDiv)
    }
}
function show(grid,cols,rows){
    const divs = canvas.childNodes;
    divs.forEach((child,indexI) => {
      child.childNodes.forEach((x,indexJ) =>{ 
        if(grid[indexI][indexJ]===1){
          x.style.backgroundColor = `black`
        }else{
          x.style.backgroundColor = `white`
        }
      })
    })
  }
function render(){
  let grid;
  grid = makeArray(cols,rows);
  grid = randomGrid(grid,rows,cols)
  fillCanvas(grid,cols,rows)
  setInterval(() => {
      grid = nextGeneration(grid,cols,rows);
      show(grid,cols,rows)
      }, (100));
  // canvas.addEventListener(`click`,(e)=>{
  //   if(e.target.style.backgroundColor === `black`){
  //     e.target.style.backgroundColor = `white`
  //     console.log(e.target.style.backgroundColor)
  //     show(grid,cols,rows)
  //   }else{
  //     e.target.style.backgroundColor = `black`
  //     console.log(e.target.style.backgroundColor)
  //     show(grid,cols,rows)
  //   }
  // })
  // reset.addEventListener(`click`,function(){
  //   grid = makeArray(cols,rows);
  //   fillCanvas(grid,cols,rows)
  //   clearInterval(interval);
  //   show(grid,cols,rows)
  // })
  // start.addEventListener(`click`,function(){
  //   interval = setInterval(() => {
  //   grid = nextGeneration(grid,cols,rows);
  //   show(grid,cols,rows)
  //   }, (100));
  // })
  // pause.addEventListener(`click`,()=>{
  //   clearInterval(interval);
  // })
  // random.addEventListener(`click`,()=>{
  //   let grid;
  //   grid = makeArray(cols,rows);
  //   grid = randomGrid(grid,rows,cols)
  //   fillCanvas(grid,cols,rows)
  // })
}
render()


