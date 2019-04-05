//Create DOM element with class & id(optional) attributes.
const createElement = (elementName, className = undefined, id = undefined) => {
    const element = document.createElement(elementName);
    
    if(className != undefined) {
        element.className = className;
    }

    if(id != undefined) {
        element.id = id;
    }
    
    return element;

}

const renderIndexView = () => {
    createLogo('../../images/logo.png');
    createLevelField(LEVEL_ARRAY);
    createUserDataField('userdata-field');
    createMatrix(SIDE_OF_MATRIX);
    createQuitBtn();
}

const renderSummaryView = (summaryFieldId, restartBtnFieldId) => {
    createLogo();
    createLevelField();
    createSummary(summaryFieldId);
    createNameForm();
    createRestartBtn(restartBtnFieldId);
}

const renderLeaderboardView = (summaryFieldId, restartBtnFieldId, rankDataArray) => {
    createLogo('../../images/logo.png');
    createLevelField();
    createSummary(summaryFieldId);
    createRankTable(rankDataArray);
    createRestartBtn(restartBtnFieldId);
}

//Find the specfied field by Id, & append the passed element to the field.
const appendElementToIdField= (fieldId, element) => {
    const field = document.getElementById(fieldId);
    field.appendChild(element);
}

const createLogo = (imgSrc) => {
   const logoImg = createElement('img');
   logoImg.src = imgSrc;
   appendElementToIdField('logo-field', logoImg);
} 

const createLevelField = (levelArray) => {
    const ul = createElement('ul');
    
    for(let i = 0; i < levelArray.length; ++i) {
        const li = createElement('li');
        const a = createElement('a');
        a.href = '#';
        a.textContent = levelArray[i];
        li.appendChild(a);
        ul.appendChild(li);
    }

    appendElementToIdField('level-field', ul);
}

const createUserDataField = (fieldId) => {
    const $scoreDiv = createElement('div', 'userdataDivs');
    const $trialDiv = createElement('div', 'userdataDivs');
    const $tileDiv = createElement('div', 'userdataDivs');

    //Score.
    const scoreHeader = createElement('span');
    scoreHeader.textContent = SCORE_HEADER;
    const userscore = createElement('span', 'userDatas', 'score');
    userscore.textContent = score;
    
    //Trial.
    const trialHeader = createElement('span');
    trialHeader.textContent = TRIAL_HEADER;
    const trials = createElement('span', 'userDatas', 'trial');
    trials.textContent = trial;

    //Tiles.
    const tilesHeader = createElement('span');
    tilesHeader.textContent = TILES_HEADER;
    const numOftiles = createElement('span', 'userDatas', 'tiles');
    numOftiles.textContent = tiles;

    //Append each element to div.
    $scoreDiv.appendChild(scoreHeader);
    $scoreDiv.appendChild(userscore);
    $trialDiv.appendChild(trialHeader);
    $trialDiv.appendChild(trials);
    $tileDiv.appendChild(tilesHeader);
    $tileDiv.appendChild(numOftiles);

    //Append each div to the passed id field.
    appendElementToIdField(fieldId, $scoreDiv);
    appendElementToIdField(fieldId, $trialDiv);
    appendElementToIdField(fieldId, $tileDiv);
}

const createMatrix = (size) => {
    let tileNum = 0;
    const $div = createElement('div', 'col-lg-6 col-md-12', 'matrixContainer');
    
    //Create matrix tiles.
    for(let i = 0; i < size; ++i) { /*row*/
        const $row = createElement('span', 'matrixRows', ('row' + i));
        
        for(let j = 0; j < size; ++j) { /*col*/
            const tile = createElement('div', 'matrixTiles', ('tile' + tileNum));
            tileNum++;
        }

        $div.appendChild($row);
    }
    appendElementToIdField('matrix-container', $div);
}

//Colour seleted(correct) tiles.
const colourSelectedTiles = (numberArray) => {
    for(let i = 0; i < numberArray.length; ++i) {
        const tileId = 'tile' + numberArray[i]; /*Eg: tile3*/
        const tile = document.getElementById(tileId);
        tile.className = 'selectedTiles';
        tile.style.backgroundColor = CORRECT_TILES_COLOUR; /*Set tile color*/
    }
}

//Rotate Matrix.
function rotateMatrix() {
    const $div = document.getElementById('tilesField');
    const degree = randomDegree();

    $div.style.webkitTransform = 'rotate('+degree+'deg)'; 
    $div.style.mozTransform    = 'rotate('+degree+'deg)'; 
    $div.style.msTransform     = 'rotate('+degree+'deg)'; 
    $div.style.oTransform      = 'rotate('+degree+'deg)'; 
    $div.style.transform       = 'rotate('+degree+'deg)'; 
}

//Hide the color of correct tiles before rotating matrix.
function hideSelectedTiles(numberArr) {
    for(let i = 0; i < numberArr.length; ++i) {
        const tileId = 'tile' + numberArray[i]; /*Eg: tile3*/
        const tile = document.getElementById(tileId);
        tile.style.backgroundColor = NORMAL_TILES_COLOUR; 
    }
}

const createQuitBtn = () => {
    const button = createElement('button', 'buttons', 'quitBtn');
    button.type = 'button';
    button.textContent = QUIT_BTN;
    appendElementToIdField('quit-btn-field', button);
}

const createSummary = (fieldId) => {
    //Create header & append.
    const header = createElement('h1');
    header.textContent = SUMMARY_HEADER;
    appendElementToIdField(fieldId, header);

    //Create User summary.
    createUserDataField(fieldId);
}

const createNameForm = () => {
    //Input field.
    const textInput = createElement('input', 'nameInput');
    textInput.type = 'text';
    textInput.placeholder = INPUT_PLACEHOLDER;

    //Submit button.
    const button = createElement('button', 'buttons', 'submitBtn');
    button.textContent = SUBMIT_BTN;

    appendElementToIdField('name-form', textInput);
    appendElementToIdField('name-form', button);
}

const createRestartBtn = (fieldId) => {
    const button = createElement('button', 'buttons', 'restartBtn');
    button.textContent = RESTART_BTN;
    appendElementToIdField(fieldId, button);
}

const createRankTable = (rankDataArray, tableSize) => {
    //Create basic table elements.
    const table = createElement('table', 'table table-striped', 'rankTable');
    const thead = createElement('thead');
    const tr = createElement('tr');
    const tbody = createElement('tbody');
    
    //Create table headers.
    const rankHeader = createElement('td', 'tableHeaders');
    rankHeader.textContent = TABLE_HEADER_RANK  
    
    const nameHeader = createElement('td', 'tableHeaders');
    nameHeader.textContent = TABLE_HEADER_NAME;
    
    const scoreHeader = createElement('td', 'tableHeaders');
    scoreHeader.textContent = TABLE_HEADER_SCORE;
    
    const trialHeader = createElement('td', 'tableHeaders');
    trialHeader.textContent = TABLE_HEADER_TRIAL;
   
    //Create rank data by rankDataArray.
    for(let i = 0; i < tableSize; ++i) {
        const tr = createElement('tr');
        
        //Rank.
        const rank = createElement('td', 'ranks');
        rank.textContent = (i + 1);
        
        //Name.
        const name = createElement('td', 'names');
        name.textContent = rankDataArray[i].name;

        //Trial.
        const trial = createElement('td', 'rankTrials');
        trial.textContent = rankDataArray[i].trial;

        //Score.
        const score = createElement('td', 'rankScores');
        score.textContent = rankDataArray[i].score;

        //Append all data to a table row.
        tr.appendChild(rank);
        tr.appendChild(name);
        tr.appendChild(trial);
        tr.appendChild(score);
        
        //Append a row to table body.
        tbody.appendChild(tr);
    }
    
    tr.appendChild(rankHeader, nameHeader, trialHeader, scoreHeader);
    thead.appendChild(tr);
    table.appendChild(thead, tbody);
    appendElementToIdField('table-field', table);
}



