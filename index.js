var n;

function setter() {
    var ip = document.getElementById("input");
    n = ip.ariaValueMax;
}

function myFunction() {
    var x = parseInt(document.getElementById("mynum").value, 10);
    if (x < 0 || x > 20) {
        alert("Please enter a number between 0 and 20");
        return;
    }
    n = x;
    init();
}


const array = [];

function init() {
    array.length = 0;  // Clear the array
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showbars();
}


function play() {
    const copy = [...array];
    const selectedAlgorithm = document.querySelector('#algorithm').value;

    let moves;

    if (selectedAlgorithm === 'bubble') {
        moves = bubbleSort(copy);
    } else if (selectedAlgorithm === 'select') {
        moves = selectionSort(copy);
    } else if (selectedAlgorithm === 'insert') {
        moves = insertionSort(copy);
    }

    document.getElementById("generateButton").disabled = true;
    document.getElementById("sortButton").disabled = true;
    animate(moves);
}

function animate(moves) {
    if (moves.length === 0) {
        showbars();
        document.getElementById("generateButton").disabled = false;
        document.getElementById("sortButton").disabled = false;
        return;
    }

    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type === "swap") {
        [array[i], array[j]] = [array[j], array[i]];
    }
    showbars(move);
    setTimeout(function() {
        animate(moves);
    }, 200);
}

function bubbleSort(array) {
    const moves = [];
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < array.length; i++) {
            moves.push({
                indices: [i - 1, i],
                type: "cmp"
            });
            if (array[i - 1] > array[i]) {
                swapped = true;
                moves.push({
                    indices: [i - 1, i],
                    type: "swap"
                });
                [array[i - 1], array[i]] = [array[i], array[i - 1]];
            }
        }
    } while (swapped);
    return moves;
}

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
        
        moves.push({
            indices: [i, minIndex],
            type: "cmp"
        });
        
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

function insertionSort(arr) {
    const n = arr.length;
    const moves = [];
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            moves.push({
                indices: [j + 1, j],
                type: "cmp"
            });
            arr[j + 1] = arr[j];
            moves.push({
                indices: [j + 1, j],
                type: "swap"
            });
            j = j - 1;
        }
        arr[j + 1] = key;
        moves.push({
            indices: [j + 1, i],
            type: "cmp"
        });
    }
    return moves;
}

function showbars(move) {
    const container = document.getElementById('container');
    container.innerHTML = "";
    const barWidth = (container.clientWidth - (n * 6)) / n; // Calculate bar width dynamically
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.innerHTML = i; // Add index to the bar
        bar.style.height = array[i] * 100 + "%";
        bar.style.width = barWidth + "px"; // Set width dynamically
        bar.classList.add("bar");

        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
        }
        container.appendChild(bar);
    }
}


