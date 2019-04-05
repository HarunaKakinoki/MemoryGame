const LEVEL_ARRAY = ['Easy', 'Normal', 'Hard'];
const SIDE_OF_MATRIX = 3; /*By default, (Normal = 3 * 3 matrix)*/
const TOTAL_TILES = SIDE_OF_MATRIX * SIDE_OF_MATRIX;
const DEGREE_ARRAY = [90, 180, -90, -180];
const SCORE_LOWER_BOUND = 0;
const CORRECT_TILES_LOWER_BOUND = 3;
const CORRECT_TILES_UPPER_BOUND = SIDE_OF_MATRIX * 2;
const SOUND_CORRECT = new Audio('../../audio/correct.mp3');
const SOUND_WRONG = new Audio('../../audio/wrong.mp3');
const SOUND_GAMEOVER = new Audio('../../audio/game_over.mp3');

let score = 0;
let trial = 1;
let tiles = 3;
let correctTiles = SIDE_OF_MATRIX + 1; /*Number of correct tiles.*/
let foundTiles = 0; /*Number of tiles user found in a trial.*/
let maxTiles = SIDE_OF_MATRIX + 1; 
let mistakeFlag = false; /*A flag for user's mistake in a trial.*/
let previousIndex = 0;  /*Store the last index of randomly generated degree.*/

//Generate a degree for matrix rotaiton.
function randomDegree() {

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
function selectTiles() {
    let numberSet = new Set(); /*Use "Set" to get distinct values*/
    
    //Generate random numbers & add it to Set.
    while(numberSet.size < correctTiles) {   
        const randomNum = Math.floor((Math.random() * (TOTAL_TILES - 1) + 0));  
        numberSet.add(randomNum);
    }
    
    //Convert Set into Array & return the array.
    return Array.from(numberSet);
}

//Accept an audio object, play the audio.
function playSound(audioObj) {
    audioObj.play();
}




