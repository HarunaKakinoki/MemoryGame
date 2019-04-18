//Create DOM element with class & id(optional) attributes.
const createElement = (elementName, className = undefined, id = undefined) => {
    const element = document.createElement(elementName);
    
    if(className != undefined || className === '') {
        element.className = className;
    }

    if(id != undefined || className === '') {
        element.id = id;
    }
    
    return element;

}

//Find the specfied field by Id, & append the passed element to the field.
const appendElementToIdField= (fieldId, element) => {
    const field = document.getElementById(fieldId);
    field.appendChild(element);
}

const createModal = (fieldId, modalId) => {
    const $div = createElement('div', 'modal fade', modalId);
    $div.setAttribute('tabindex', -1);
    $div.setAttribute('role', 'dialog');
    $div.setAttribute('aria-hidden', 'true');
    const $div2 = createElement('div', 'modal-dialog');
    const $content = createElement('div', 'modal-content');

    $div2.appendChild($content);
    $div.appendChild($div2);
    appendElementToIdField(fieldId, $div);
}

const createSwitchLevelModal = () => {
    createModal('main-container', 'levelModal0');
    createModal('main-container', 'levelModal1');
    createModal('main-container', 'levelModal2');
    const easy = document.getElementsByClassName('levelLinks')[0];
    const normal = document.getElementsByClassName('levelLinks')[1];
    const hard = document.getElementsByClassName('levelLinks')[2];

    //Easy.
    const easyModal = new Modal(easy, 
    { // options object.
        content:  '<div class="modal-header">'
                + '<h4 class="modal-title modalTitles">Switch level to Easy</h4>'
                + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
                + '</div>'
                + '<div class="modal-body">Do you really want to switch to Easy (3 x 3) Level?</div>'
                + '<div class="yesno-btns-container">'
                + '<button class="btn btn-primary yesBtns" value="easy">Yes</button>'
                + '<button class="btn btn-danger noBtns" data-dismiss="modal">No</button>'
                + '</div>', 
        keyboard: false 
    });

    //Normal.
    const normalModal = new Modal(normal, 
    { // options object.
        content:  '<div class="modal-header">'
                + '<h4 class="modal-title modalTitles">Switch level to Normal</h4>'
                + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
                + '</div>'
                + '<div class="modal-body">Do you really want to switch to Normal(4 x 4) Level?</div>'
                + '<div class="yesno-btns-container">'
                + '<button class="btn btn-primary yesBtns" value="normal">Yes</button>'
                + '<button class="btn btn-danger noBtns" data-dismiss="modal">No</button>'
                + '</div>', 
        keyboard: false 
    });

    //Hard.
    const hardModal = new Modal(hard, 
        { // options object.
            content:  '<div class="modal-header">'
                    + '<h4 class="modal-title modalTitles">Switch level to Hard</h4>'
                    + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
                    + '</div>'
                    + '<div class="modal-body">Do you really want to switch to Hard(4 x 4 matrix & dobule scoring) Level?</div>'
                    + '<div class="yesno-btns-container">'
                    + '<button class="btn btn-primary yesBtns" value="hard">Yes</button>'
                    + '<button class="btn btn-danger noBtns" data-dismiss="modal">No</button>'
                    + '</div>',  
            keyboard: false 
        });
}

const createGameOverModal = () => {
    createModal('main-container', 'gameOverModal');

    const modal = document.getElementById('gameOverModal');
    const modalInstance = new Modal(modal, {
        content: '<div class="modal-header">'
                + '<h4 class="modal-title modalTitles">Game Over</h4>'
                + '</div>'
                + '<div class="modal-body">Score reached to 0! Please Retry!</div>'
                + '<img id="gameoverImg" alt="game over image" src="../images/gameover.png">'
                + '<div id="restart-btn-container">'
                + '<button class="btn btn-primary" id="restartBtn">Restart</button>'
                + '</div>', 
        backdrop: 'static',
        keyboard: false
    });

    return modalInstance;
}

const createQuitConfirmationModal = () => {
    createModal('main-container', 'quitModal');
    
    const button = document.getElementById('saveBtn');

    const quiteModal = new Modal(button, 
    { // options object
        content:  '<div class="modal-header">'
                + '<h4 class="modal-title modalTitles">Save Score</h4>'
                + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
                + '</div>'
                + '<div class="modal-body">Move onto summary page and You can register your score with your name on the leaderboard.</div>'
                + '<div class="modal-body">Really Ok to quit game now?'
                + '<div class="yesno-btns-container">'
                + '<button class="btn btn-primary" id="saveModalYesBtn">Yes</button>'
                + '<button class="btn btn-danger noBtns" data-dismiss="modal">No</button>'
                + '</div>',  
        keyboard: false // we don't want to dismiss Modal on pressing Esc key
    });
}

const createLogo = () => {
   const logoImg = createElement('img', '', 'logoImg');
   logoImg.src = LOGO_IMG_PATH;
   const a = createElement('a', '', 'logoLink');
   a.href = INDEX_PATH;
   a.appendChild(logoImg);
   appendElementToIdField('logo-field', a);
} 

const createLevelField = () => {
    const ul = createElement('ul');
    
    for(let i = 0; i < LEVEL_ARRAY.length; ++i) {
        const li = createElement('li');
        const a = createElement('a', 'levelLinks');
        a.href = '#levelModal' + i;
        //a.setAttribute('data-target', 'modalID');
        a.textContent = LEVEL_ARRAY[i];
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
    numOftiles.textContent = correctTiles;

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
    const $div = createElement('div', 'col-12', 'tilesContainer');
    
    //Create matrix tiles.
    for(let i = 0; i < size; ++i) { /*row*/
        const $row = createElement('span', 'matrixRows', ('row' + i));
        
        for(let j = 0; j < size; ++j) { /*col*/
            const tile = createElement('div', 'matrixTiles', ('tile' + tileNum));
            tileNum++;
            $row.appendChild(tile);
        }

        $div.appendChild($row);
    }
    appendElementToIdField('matrix-container', $div);
}

//Colour seleted(correct) tiles.
const colourSelectedTiles = () => {
    for(let i = 0; i < selectedTileNumbers.length; ++i) {
        const tileId = 'tile' + selectedTileNumbers[i]; /*Eg: tile3*/
        const tile = document.getElementById(tileId);
        tile.className = 'selectedTiles'; /*Color will be changed by adding this classname*/
        tile.style.backgroundColor = CORRECT_TILE_COLOUR;
    }
}

const updateNumberDisplay = (fieldId, newNumber) => {
    document.getElementById(fieldId).textContent = newNumber;
}

//Rotate Matrix.
function rotateMatrix() {
    const $div = document.getElementById('tilesContainer');
    const degree = randomDegree();

    //Rotate a matrix by using css.
    $div.style.webkitTransform = 'rotate('+degree+'deg)'; 
    $div.style.mozTransform    = 'rotate('+degree+'deg)'; 
    $div.style.msTransform     = 'rotate('+degree+'deg)'; 
    $div.style.oTransform      = 'rotate('+degree+'deg)'; 
    $div.style.transform       = 'rotate('+degree+'deg)'; 
}

const removeMatrix = () => {
    const matrix = document.getElementById('tilesContainer');
    matrix.remove();
}

//Hide the color of correct tiles before rotating matrix.
function hideSelectedTiles() {
    console.log(selectedTileNumbers);
    for(let i = 0; i < selectedTileNumbers.length; ++i) {
        const tileId = 'tile' + selectedTileNumbers[i]; /*Eg: tile3*/
        const tile = document.getElementById(tileId);
        tile.style.backgroundColor = DEFAULT_TILE_COLOUR; 
    }
}

const createSaveBtn = () => {
    const button = createElement('button', 'btn btn-warning buttons', 'saveBtn');
    button.textContent = SAVE_BTN;
    button.setAttribute('data-target', '#quitModal');
    appendElementToIdField('buttons-field', button);
}

const createSummary = (fieldId) => {
    //Create header & append.
    const header = createElement('h1');
    header.textContent = SUMMARY_HEADER;
    appendElementToIdField(fieldId, header);

    //Create User summary.
    createUserDataField(fieldId);
}

const createLeaderBoardSummary = (fieldId) => {
    //Rank.
    const $rankDiv = createElement('div', 'userDataDivs');
    const rankNum = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).rank;
    const rankHeader = createElement('span');
    rankHeader.textContent = RANK_HEADER;
    const rank = createElement('span', 'userDatas', 'ranking');
    rank.textContent = rankNum;
    
    //Name.
    const $nameDiv = createElement('div', 'userDataDivs');
    const name = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).name;
    const nameHeader = createElement('span');
    nameHeader.textContent = NAME_HEADER;
    const username = createElement('span', 'userDatas', 'userName');
    
    if(name != null || name != undefined) {
        username.textContent = name;
    }

    $rankDiv.appendChild(rankHeader);
    $rankDiv.appendChild(rank);
    appendElementToIdField(fieldId, $rankDiv);

    $nameDiv.appendChild(nameHeader);
    $nameDiv.appendChild(username);
    appendElementToIdField(fieldId, $nameDiv);
    createUserDataField(fieldId);
}

const createNameForm = () => {
    //Input alert.
    const alert = createElement('p', '', 'nameAlert');
    alert.textContent = NAME_INPUT_ALERT;

    //Input field.
    const textInput = createElement('input', '', 'nameInput');
    textInput.type = 'text';
    textInput.placeholder = INPUT_PLACEHOLDER;

    //Submit button.
    const button = createElement('button', 'btn btn-info buttons', 'submitBtn');
    button.textContent = SUBMIT_BTN;

    appendElementToIdField('name-form', alert);
    appendElementToIdField('name-form', textInput);
    appendElementToIdField('name-form', button);
}

const showNameFormAlert = () => {
    document.getElementById('nameAlert').style.visibility = 'visible';
}

const createRestartBtn = (fieldId) => {
    const button = createElement('button', 'btn btn-warning buttons', 'restartBtn');
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

const displayUserSummary = () => {
    const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    document.getElementById('score').textContent = user.score;
    document.getElementById('trial').textContent = user.trial;
    document.getElementById('tiles').textContent = user.tiles;
}

const showTileColor = (tileId) => {
    document.getElementById(tileId).style.backgroundColor = CORRECT_TILE_COLOUR;
}

const hideLevelColour = () => {
    const levelLinks = document.getElementsByClassName('levelLinks');
    switch(currentLevel) {
       
        case 'easy':
                    levelLinks[0].style.backgroundImage= LEVELLINK_DEFAULT_CLOUR;
                    break;
        case 'normal':
                    levelLinks[1].style.backgroundImage= LEVELLINK_DEFAULT_CLOUR;
                    break;
        case 'hard':
                    levelLinks[2].style.backgroundImage= LEVELLINK_DEFAULT_CLOUR;
                    break;
      }
}

const highlightCurrentLevel = () => {
    const levelLinks = document.getElementsByClassName('levelLinks');
    switch(currentLevel) {
       
        case 'easy':
                    levelLinks[0].style.backgroundImage= LEVELLINK_CURRENT_COLOUR;
                    break;
        case 'normal':
                    levelLinks[1].style.backgroundImage= LEVELLINK_CURRENT_COLOUR;
                    break;
        case 'hard':
                    levelLinks[2].style.backgroundImage= LEVELLINK_CURRENT_COLOUR;
                    break;
      }
}

const displayLeaderBoardLinkLetter = () => {
    const links = document.getElementsByClassName('rankLinks');
    for(let i = 0; i < links.length; i++) {
        links[i].textContent = LEADERBOARD_LINK_TEXT;
    }
}

const renderIndexView = () => {
    createLogo();
    createLevelField();
    createUserDataField('userdata-field');
    createMatrix(sideOfMatrix);
    createSaveBtn();
    createSwitchLevelModal();
    createQuitConfirmationModal();
    highlightCurrentLevel();
    displayLeaderBoardLinkLetter();
}

const renderSummaryView = () => {
    createLogo();
    createSummary('summary-field');
    displayUserSummary();
    createNameForm();
    createRestartBtn('summary-restart-field');
    displayLeaderBoardLinkLetter();
}

const renderLeaderboardView = () => {
    const rankDataArray = [];
    const obj = {
        name: "doraneko",
        trial: 3,
        score: 10
    };
    rankDataArray.push(obj);

    createLogo();
    createLeaderBoardSummary('rank-summary-field');
    displayUserSummary();
    createRankTable(rankDataArray);
    createRestartBtn('leaderboard-restart-field');
}


