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
    } else if (selectedAlgorithm === 'merge') {
        moves = mergeSort(copy);
    } else if (selectedAlgorithm === 'quick') {
        moves = quickSort(copy);
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
    } else if (move.type === "overwrite") {
        array[i] = move.value;
    }

    showbars(move);
    setTimeout(function () {
        animate(moves);
    }, 700);
}

function bubbleSort(array) {
    const moves = [];
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < array.length; i++) {
            moves.push({ indices: [i - 1, i], type: "cmp" });
            if (array[i - 1] > array[i]) {
                swapped = true;
                moves.push({ indices: [i - 1, i], type: "swap" });
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
            moves.push({ indices: [j, minIndex], type: "cmp" });
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        moves.push({ indices: [i, minIndex], type: "cmp" });

        if (minIndex !== i) {
            moves.push({ indices: [i, minIndex], type: "swap" });
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
            moves.push({ indices: [j + 1, j], type: "cmp" });
            arr[j + 1] = arr[j];
            moves.push({ indices: [j + 1, j], type: "swap" });
            j = j - 1;
        }
        arr[j + 1] = key;
        moves.push({ indices: [j + 1, i], type: "cmp" });
    }
    return moves;
}

// Merge Sort Visualization
function merge(arr, tempArr, start, mid, end, moves) {
    let i = start, j = mid + 1, k = start;

    while (i <= mid && j <= end) {
        moves.push({ indices: [i, j], type: "cmp" });
        if (arr[i] <= arr[j]) {
            tempArr[k++] = arr[i++];
        } else {
            tempArr[k++] = arr[j++];
        }
    }

    while (i <= mid) {
        tempArr[k++] = arr[i++];
    }

    while (j <= end) {
        tempArr[k++] = arr[j++];
    }

    for (let i = start; i <= end; i++) {
        moves.push({ indices: [i, i], type: "overwrite", value: tempArr[i] });
        arr[i] = tempArr[i];
    }
}

function mergeSortRecursive(arr, tempArr, start, end, moves) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        mergeSortRecursive(arr, tempArr, start, mid, moves);
        mergeSortRecursive(arr, tempArr, mid + 1, end, moves);
        merge(arr, tempArr, start, mid, end, moves);
    }
}

function mergeSort(array) {
    const tempArr = new Array(array.length);
    const moves = [];
    mergeSortRecursive(array, tempArr, 0, array.length - 1, moves);
    return moves;
}

function quickSort(arr) {
    const moves = [];
    quickSortHelper(arr, 0, arr.length - 1, moves);
    return moves;
}

function quickSortHelper(arr, low, high, moves) {
    if (low < high) {
        let pi = partition(arr, low, high, moves);

        // Recursively sort the left and right parts
        quickSortHelper(arr, low, pi - 1, moves);
        quickSortHelper(arr, pi + 1, high, moves);
    }
}

function partition(arr, low, high, moves) {
    let pivot = arr[low]; // First element as pivot
    let count = 0;

    // Count how many elements are <= pivot
    for (let j = low + 1; j <= high; j++) {
        moves.push({
            indices: [low, j],
            type: 'pivot'
        });
        if (arr[j] <= pivot) {
            count++;
        }
    }

    let pivotIndex = low + count;

    // Move pivot to its correct position
    moves.push({
        indices: [low, pivotIndex],
        type: 'swap'
    });
    [arr[low], arr[pivotIndex]] = [arr[pivotIndex], arr[low]];

    let i = low;
    let j = high;

    // Partition the array around the pivot

    
    while (i < pivotIndex && j > pivotIndex) {
        while (arr[i] <= arr[pivotIndex]) {
            i++;
        }

        while (arr[j] > arr[pivotIndex]) {
            j--;
        }

    

        if (i < pivotIndex && j > pivotIndex) {
            moves.push({
                indices:[pivotIndex],
                type:'pivot'
            })
            moves.push({
                indices: [i, j],
                type: 'swap'
            });
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }

    return pivotIndex;
}



function showbars(move) {
    const container = document.getElementById('container');
    container.innerHTML = "";
    const barWidth = (container.clientWidth - (n * 6)) / n; // Calculate bar width dynamically
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        const heightPercentage = array[i] * 100; // Height as percentage

        // Convert height to string and extract the integer part
        const heightString = heightPercentage.toFixed(2); // Convert to string with 2 decimal places
        const heightBeforeDot = heightString.split('.')[0]; // Extract the part before the dot

        bar.innerHTML = heightBeforeDot; // Use the integer part for display
        bar.style.height = heightPercentage + "%";
        bar.style.width = barWidth + "px"; // Set width dynamically
        bar.classList.add("bar");

        if (move && move.indices.includes(i)) {
            if (move.type === "swap") {
                bar.style.backgroundColor = "red";
            } else if (move.type === "cmp") {
                bar.style.backgroundColor = "blue";
            } else if (move.type === "pivot") {
                bar.style.backgroundColor = "yellow"; // Pivot bar color
            } else if(move.type === 'overwrite'){
                bar.style.backgroundColor = 'orange'
            }
        }
        container.appendChild(bar);
    }
}

