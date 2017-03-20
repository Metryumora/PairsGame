/**
 * Created by Supreme on 20.03.2017.
 */

let gameSize;
let values;
let selectedCardsCoordinates = [[-1, -1], [-1, -1]];
var pairsFound;
var triesTaken;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function startGame() {
    pairsFound = 0;
    triesTaken = 0;
    updateStats();
    document.getElementById("tableBody").innerHTML = "";
    gameSize = parseInt(document.getElementById("sizeInput").value);
    let pairs = [];
    let valueCounter = 0;
    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            if (((i * gameSize + j) % gameSize) == 0) {
                valueCounter++;
            }
            pairs[i * gameSize + j] = valueCounter;
        }
    }
    values = [];
    for (let i = 0; i < gameSize; i++) {
        values[i] = [];
        document.getElementById("tableBody").innerHTML += "<tr id=row" + i + "></tr>";
        for (let j = 0; j < gameSize; j++) {
            document.getElementById("row" + i).innerHTML += "<td><button class=hiddenButton id=" + parseBackBtnId(i, j) + " onclick=processClick(this.id)></button></td>";
            let randomElement = getRandomInt(0, pairs.length);
            if (pairs[randomElement] == undefined) {
            }
            values[i][j] = pairs[randomElement];
            pairs.splice(randomElement, 1);
        }
    }
}

function showValue(id) {
    document.getElementById(id).className = 'shownButton';
    let coordinates = parseBtnId(id);
    document.getElementById(id).innerHTML = values[coordinates[0]][coordinates[1]];

}

function writeToSlot(arr, slotNumber) {
    selectedCardsCoordinates[slotNumber][0] = arr[0];
    selectedCardsCoordinates[slotNumber][1] = arr[1];
    document.getElementById(parseBackBtnId(arr[0], arr[1])).disabled = true;
}

function process(id) {
    let arr = parseBtnId(id);
    if (selectedCardsCoordinates[0][0] == -1) {
        writeToSlot(arr, 0);
    } else {
        if (selectedCardsCoordinates[1][0] == -1) {
            writeToSlot(arr, 1);
            if (pairsFound == gameSize * gameSize / 2 - 1) {
                checkAndProcessCoincidence();
                alert("You've won!");
            }
        } else {
            checkAndProcessCoincidence();
            selectedCardsCoordinates = [[-1, -1], [-1, -1]];
            writeToSlot(arr, 0)
        }
    }
}

function checkAndProcessCoincidence() {
    if (values[selectedCardsCoordinates[0][0]][selectedCardsCoordinates[0][1]] == values[selectedCardsCoordinates[1][0]][selectedCardsCoordinates[1][1]]) {
        document.getElementById(parseBackBtnId(selectedCardsCoordinates[0][0], selectedCardsCoordinates[0][1])).className = "blankButton";
        document.getElementById(parseBackBtnId(selectedCardsCoordinates[1][0], selectedCardsCoordinates[1][1])).className = "blankButton";
        document.getElementById(parseBackBtnId(selectedCardsCoordinates[0][0], selectedCardsCoordinates[0][1])).disabled = true;
        document.getElementById(parseBackBtnId(selectedCardsCoordinates[1][0], selectedCardsCoordinates[1][1])).disabled = true;
        pairsFound++;
    } else {
        document.getElementById(parseBackBtnId(selectedCardsCoordinates[0][0], selectedCardsCoordinates[0][1])).className = "hiddenButton";
        document.getElementById(parseBackBtnId(selectedCardsCoordinates[1][0], selectedCardsCoordinates[1][1])).className = "hiddenButton";
        document.getElementById(parseBackBtnId(selectedCardsCoordinates[0][0], selectedCardsCoordinates[0][1])).disabled = false;
        document.getElementById(parseBackBtnId(selectedCardsCoordinates[1][0], selectedCardsCoordinates[1][1])).disabled = false;
    }
    triesTaken++;
    updateStats();
}

function processClick(id) {
    showValue(id);
    process(id);
}

function parseBtnId(id) {
    return id.substring(3).split("_");
}

function parseBackBtnId(i, j) {
    return "btn" + i + "_" + j;
}

function debug() {
    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            showValue(parseBackBtnId(i, j));
            document.getElementById(parseBackBtnId(i, j)).className = "shownButton";
        }
    }
}

function updateStats(){
    document.getElementById("found").innerHTML = pairsFound.toString();
    document.getElementById("tries").innerHTML = triesTaken.toString();
    document.getElementById("average").innerHTML = (triesTaken/pairsFound).toString();

}