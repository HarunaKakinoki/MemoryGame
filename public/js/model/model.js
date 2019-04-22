const LEVEL_ARRAY = ['easy', 'normal', 'hard'];
const DEGREE_ARRAY = [90, 180, -90, -180];
const SCORE_LOWER_BOUND = 0;
const DEFAULT_SCORE_RATE = 1;
const HARD_SCORE_RATE = 2;
const RANK_TABLE_SIZE = 5; /*on leaderboard*/

let score = 0;
let trial = 1;
let maxTiles = 0;
let currentLevel = LEVEL_ARRAY[1];
let scoreRate = DEFAULT_SCORE_RATE; /*By default*/
let sideOfMatrix = 4; /*By default, (Normal = 4 * 4 matrix)*/
let correctTiles = sideOfMatrix + 1; /*Number of correct tiles.*/
let correctTilesLowerBound = sideOfMatrix - 1;
let correctTilesUpperBound = (sideOfMatrix * 2);
let foundTiles = 0; /*Number of tiles user found in a trial.*/
let mistakeFlag = false; /*A flag for user's mistake in a trial.*/
let previousIndex = 0;  /*Store the last index of randomly generated degree.*/
let selectedTileNumbers = [];

//Generate a degree for matrix rotaiton.
const randomDegree = () =>  {

    //Return a random index 0 to 5.
    let index = Math.floor((Math.random() * DEGREE_ARRAY.length) + 0);

    //To avoid use same index as privious trial.
    while (previousIndex === index) {
        index = Math.floor((Math.random() * DEGREE_ARRAY.length) + 0);
    }
    
    previousIndex = index;
   
    return DEGREE_ARRAY[index]; /*Eg : 90 */
}


//Select tiles to be coloured.( = correct tiles)
const selectTiles = () => {
    const totalTiles = sideOfMatrix * sideOfMatrix;
    let numberSet = new Set(); /*Use "Set" to get distinct values*/
    
    //Generate random numbers & add it to Set.
    while(numberSet.size < correctTiles) {   
        const randomNum = Math.floor((Math.random() * (totalTiles - 1) + 0));  
        numberSet.add(randomNum);
    }
    //Convert Set into Array & return the array.
    return Array.from(numberSet);
}

const disableOnclickEvent = (id) => {
    document.getElementById(id).onclick = function () {
        return false;
    }
}

const addScore = () => {
    score += scoreRate;
}

const minusScore = () => {
    score -= scoreRate;
}

function checkClickedTile(clickedTile) {
    
    if(clickedTile.className === "selectedTiles") {
        playSound(SOUND_CORRECT);
        const tileId = clickedTile.id;
        return {
            result: true,
            id : tileId
        };
    }
    playSound(SOUND_WRONG);
    return false;
}

const setDataForNextTrial = () => {
    foundTiles = SCORE_LOWER_BOUND;
    correctTilesLowerBound = sideOfMatrix - 1;
    correctTilesUpperBound = (sideOfMatrix * 2);
    trial++;
    
    //When user make at least 1 mistake during the trial.
    if(mistakeFlag === true) {
        correctTiles--;
        
        if(correctTiles <= correctTilesLowerBound) {
            correctTiles = correctTilesLowerBound;
        } 
    
    //When user did not make any mistakes through the trial.
    } else {
        correctTiles++;
      
        if(correctTiles >= correctTilesUpperBound) {
            correctTiles = correctTilesUpperBound;
        }
    }
    mistakeFlag = false; /*Reset the flag*/

    //Update max tiles if necessary.
    if(maxTiles < correctTiles) {
        maxTiles = correctTiles;
    }

    //Reset each tile's settings.
    for(let i = 0; i < selectedTileNumbers.length; ++i) {
        const tile = document.getElementById('tile' + selectedTileNumbers[i]);
        tile.classList.remove('selectedTiles');
        tile.classList.add('matrixTiles');
    }
}

const setDataToChangeLevel = (selectedLevel) => {
    switch(selectedLevel) {
        case 'easy':
                    currentLevel = LEVEL_ARRAY[0];
                    sideOfMatrix = 3;
                    scoreRate = DEFAULT_SCORE_RATE;
                    break;
        case 'normal':
                    currentLevel = LEVEL_ARRAY[1];
                    sideOfMatrix = 4;
                    scoreRate = DEFAULT_SCORE_RATE;
                    break;
        case 'hard':
                    currentLevel = LEVEL_ARRAY[2];
                    sideOfMatrix = 4;
                    scoreRate = HARD_SCORE_RATE; // + 2 points per 1 correct answer.
                    break;
    }

    correctTiles = sideOfMatrix + 1;
    foundTiles = 0;
    mistakeFlag = false;
}


const saveUserDataToLocalStorage = () => {
    const user = {
        score : score,
        trial : trial,
        tiles : maxTiles,
        name : null, /*It will be added later*/
        rank : null  /*It will be added later*/
    };

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(user));
}

const isNameInputValid = () => {
    const username = document.getElementById('nameInput').value;
    if(username === "" || username == undefined) {
        return false;
    }
    return true;
}

const saveUserNameToLocalStorage = (username) => {
    //Fetch stored user object from localstorage.
    const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    
    //Add username info to the user object.
    user.name = username;

    //Save up-to-date user object to localstorage.
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(user));
}

//Post user data by using ajax.(Store data to database).
function postUserData() {
    const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)); 
    const name = document.getElementById('nameInput').value; /*only username is get from user input*/
    const score = user.score;
    const trial = user.trial;
    const tiles = user.tiles;
    
    //Ajax. (POST)
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if ( this.readyState == 4 && this.status == 200 ) {
            console.log(this.responseText);
        }
    };
    xhr.open("POST", '/score/add', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        name : name,
        score: score,
        trial: trial,
        tiles: tiles
    }));
    
    //To display current user's name on the leader board.
    //Save name data to local storage.
    saveUserNameToLocalStorage(name);
}

//Get User Data by using ajax & 
//Store all data into an array & return it.
function getUserData() {
    let rankArray = [];

    //Ajax. (GET)
    const xhr = new XMLHttpRequest();

    xhr.open("GET", '/score/', true);
    xhr.onload = function() {
        //Sucess.
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            for(let i = 0; i < data.length; ++i) {
                rankArray.push(data[i]);
            }
        //Fail.
        } else {
            console.log(xhr.status);
        }
    };
    xhr.send();

    const returnVal = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(rankArray);
        }, 500);
    });

    return  returnVal;
  }

const searchUserRank = (rankDataArray) => {
    const userscore = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).score;
    for(let i = 0; i < rankDataArray.length; ++i) {
        if(userscore >= rankDataArray[i]) {
            if(userscore != rankDataArray[i]) {
                 return i;
            }
        }
    }
}

//Accept an audio object, play the audio.
const playSound = (audioPath) => {
    const audio = new Audio(audioPath);
    audio.play();
}








