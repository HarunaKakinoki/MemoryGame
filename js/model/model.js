const LEVEL_ARRAY = ['Easy', 'Normal', 'Hard'];
const DEGREE_ARRAY = [90, 180, -90, -180];
const SCORE_LOWER_BOUND = 0;

let score = 0;
let trial = 1;
let sideOfMatrix = 3; /*By default, (Normal = 3 * 3 matrix)*/
let correctTiles = sideOfMatrix + 1; /*Number of correct tiles.*/
let correctTilesLowerBound = sideOfMatrix - 1;
let correctTilesUpperBound = sideOfMatrix * 2;
let foundTiles = 0; /*Number of tiles user found in a trial.*/
let maxTiles = sideOfMatrix + 1; 
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

const checkTrialEnd = () => {
    if(correctTiles > foundTiles) {
        return false;
    }
    return true;
}

const saveUserDataToLocalStorage = () => {
    const user = {
        score : score,
        trial : trial,
        tiles : tiles,
        name : null, /*It will be added later*/
        rank : null  /*It will be added later*/
    };

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(user));
}

//Reset all values.
const resetValues = () => {
    score = 0;
    trial = 1;
}

//Accept an audio object, play the audio.
const playSound = (audioPath) => {
    const audio = new Audio(audioPath);
    audio.play();
}







