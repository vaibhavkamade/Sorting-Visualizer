var n;

function setter(){
    var ip = document.getElementById("input");
    n = ip.ariaValueMax;
    
}

function myFunction() {
    var x = document.getElementById("mynum").value;
   n = x;
   init();
}



const array = [];



function init(){
    for(let i = 0 ; i < n ; i++){
        array[i] = Math.random();
    }  
    showbars();
}



// function play(){
//     const copy = [...array];
//     const move1 = bubbleSort(copy);
//     animate(move1);
// }

function play() {
    const copy = [...array];
    const selectedAlgorithm = document.querySelector('input[name="algorithm"]:checked').value;
  
    let moves;
  
    if (selectedAlgorithm === 'bubble') {
      moves = bubbleSort(copy);
    } else if (selectedAlgorithm === 'select') {
      moves = selectionSort(copy);
    } else if (selectedAlgorithm === 'insert') {
      moves = insertionSort(copy);
    }
  
    animate(moves);
  }



function animate(moves){
    if(moves.length == 0){
        showbars();
        return;
    }

    const move = moves.shift();
    const [i,j] = move.indices;
    if(move.type == "swap"){
        [array[i] , array[j]] = [array[j] , array[i]];
    }
    showbars(move);
    setTimeout(function(){
        animate(moves);
    } , 200);
}

function bubbleSort(array){
    const moves = []
do{
    var swapped = false;
    for(let i = 1 ; i < array.length ; i++){
        moves.push({
            indices:[i-1,i],
            type:"cmp"
        })
        if(array[i-1] > array[i]){
            swapped = true;
            moves.push({
                indices:[i-1,i],
                type:"swap"
            });
            [array[i-1] , array[i]] = [array[i] , array[i-1]];
        }
    }
}while(swapped);
    return moves;
}

//selection sort function
function selectionSort(arr) {
    const n = arr.length;
    const moves = [];
  
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
  
      
      for (let j = i + 1; j < n; j++) {
        moves.push({
          indices: [j, minIndex],
          type: "cmp"
        });
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
  
      // Push comparison move for the selected minimum element
      moves.push({
        indices: [i, minIndex],
        type: "cmp"
      });
    
      // Swap the minimum element with the current element
      if (minIndex !== i) {
        moves.push({
          indices: [i, minIndex],
          type: "swap"
        });
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
    }
  
    return moves;
  }

//insertion sort function
function insertionSort(arr){

    const n=arr.length;
    const moves=[];
    for(let i=1;i<n;i++){
        let key=arr[i]
        let j=i-1;
        for(;j>=0 && arr[j]>key;j--){
           
           moves.push({
            indices:[j+1,j],
            type:"swap"
           })
           arr[j+1]=arr[j];
        }
        
        arr[j+1]=key;
    }

    return moves;
  }

//showbars function
function showbars(move){
container.innerHTML = "";
for(let i = 0; i < array.length ; i++){
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");
    
    if( move && move.indices.includes(i)){
        bar.style.backgroundColor = (move.type == "swap"?"red":"blue" );
    }
    container.appendChild(bar);

}
}
