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

const createLogo = () => {
   const logoImg = createElement('img', 'img-fluid', 'logoImg');
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
        a.textContent = LEVEL_ARRAY[i];
        li.appendChild(a);
        ul.appendChild(li);
    }

    appendElementToIdField('level-field', ul);
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

const createUserDataField = (fieldId) => {
    const $scoreDiv = createElement('div', 'userDataDivs');
    const $trialDiv = createElement('div', 'userDataDivs');
    const $tileDiv = createElement('div', 'userDataDivs');

    //Score.
    const scoreHeader = createElement('span', 'userDataHeaders');
    scoreHeader.textContent = SCORE_HEADER;
    const userscore = createElement('span', 'userDatas', 'score');
    userscore.textContent = score;
    
    //Trial.
    const trialHeader = createElement('span', 'userDataHeaders');
    trialHeader.textContent = TRIAL_HEADER;
    const trials = createElement('span', 'userDatas', 'trial');
    trials.textContent = trial;

    //Tiles.
    const tilesHeader = createElement('span', 'userDataHeaders');
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
    const $div = createElement('div', '', 'tilesContainer');
    
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

//Color seleted(correct) tiles.
const colourSelectedTiles = () => {
    for(let i = 0; i < selectedTileNumbers.length; ++i) {
        const tileId = 'tile' + selectedTileNumbers[i]; /*Eg: tile3*/
        const tile = document.getElementById(tileId);
        tile.className = 'selectedTiles'; /*Color will be changed by adding this classname*/
        tile.style.backgroundColor = CORRECT_TILE_COLOUR;
    }
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

    rotatedFlag = true;
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

const showTileColor = (tileId) => {
    document.getElementById(tileId).style.backgroundColor = CORRECT_TILE_COLOUR;
}

const createSaveBtn = () => {
    const button = createElement('button', 'btn btn-warning buttons', 'saveBtn');
    button.textContent = SAVE_BTN;
    button.setAttribute('data-target', '#saveModal');
    appendElementToIdField('buttons-field', button);
}

const displayLeaderBoardLinkLetter = () => {
    const link = document.getElementById('leaderboardLink');
    link.textContent = LEADERBOARD_LINK_TEXT;
}

//When score or trials or tiles are changed, reflect the change.
const updateNumberDisplay = (fieldId, newNumber) => {
    document.getElementById(fieldId).textContent = newNumber;
}

//Create play data summary.
const createSummary = (fieldId) => {
    //Create header & append.
    const header = createElement('h1', '', 'summaryHeader');
    header.textContent = SUMMARY_HEADER;
    const img = createElement('img', '', 'thumsupImg');
    img.src = '../../images/thumsup.png';
    img.alt = 'thumsup-image' ;
    appendElementToIdField(fieldId, header);
    appendElementToIdField(fieldId, img);

    //Create User summary.
    createUserDataField(fieldId);
}

//User name input form to register on the leaderboard.
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

const createLeaderBoardSummary = (fieldId, userObj) => {
    //Rank.
    const $rankDiv = createElement('div', 'userDataDivs', 'rank');
    const rankNum = userObj.rank;
    const rankHeader = createElement('span');
    rankHeader.textContent = RANK_HEADER;
    const rank = createElement('span', 'userDatas', 'ranking');
    rank.textContent = rankNum;
    
    //Name.
    const $nameDiv = createElement('div', 'userDataDivs');
    const name = userObj.name;
    const nameHeader = createElement('span');
    nameHeader.textContent = NAME_HEADER;
    const username = createElement('span', 'userDatas', 'userName');
    
    if(name.length > 0) { /*If not null*/
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
        name.textContent = rankDataArray[i].username;

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
    
    tr.appendChild(rankHeader);
    tr.appendChild(nameHeader);
    tr.appendChild(trialHeader);
    tr.appendChild(scoreHeader);
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    appendElementToIdField('table-field', table);
}

//User's actual data (Pu)
const displayUserSummary = (user) => {
    document.getElementById('score').textContent = user.score;
    document.getElementById('trial').textContent = user.trial;
    document.getElementById('tiles').textContent = user.tiles;
}

const displayUserRank = (userRank) => {
    document.getElementById('ranking').textContent = userRank;
}

//Create a framework of modal.
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

//Modals for each level. (Easy, Normal, Hard).
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
                + '<h4 class="modal-title modalTitles">'
                + EASY_MODAL_HEADER
                + '</h4>'
                + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
                + '</div>'
                + '<div class="modal-body">'
                +EASY_MODAL_BODY
                +'</div>'
                + '<div class="yesno-btns-container">'
                + '<button class="btn btn-primary yesBtns" value="easy">'
                + YES_BTN
                + '</button>'
                + '<button class="btn btn-danger noBtns" data-dismiss="modal">'
                + NO_BTN
                +'</button>'
                + '</div>', 
        keyboard: false 
    });

    //Normal.
    const normalModal = new Modal(normal, 
    { // options object.
        content:  '<div class="modal-header">'
                + '<h4 class="modal-title modalTitles">'
                + NORMAL_MODAL_HEADER
                +'</h4>'
                + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
                + '</div>'
                + '<div class="modal-body">'
                + NORMAL_MODAL_BODY
                + '</div>'
                + '<div class="yesno-btns-container">'
                + '<button class="btn btn-primary yesBtns" value="normal">'
                + YES_BTN
                + '</button>'
                + '<button class="btn btn-danger noBtns" data-dismiss="modal">'
                + NO_BTN
                +'</button>'
                + '</div>', 
        keyboard: false 
    });

    //Hard.
    const hardModal = new Modal(hard, 
        { // options object.
            content:  '<div class="modal-header">'
                    + '<h4 class="modal-title modalTitles">'
                    + HARD_MODAL_HEADER
                    +'</h4>'
                    + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
                    + '</div>'
                    + '<div class="modal-body">'
                    + HARD_MODAL_BODY
                    +'</div>'
                    + '<div class="yesno-btns-container">'
                    + '<button class="btn btn-primary yesBtns" value="hard">'
                    + YES_BTN
                    + '</button>'
                    + '<button class="btn btn-danger noBtns" data-dismiss="modal">'
                    + NO_BTN
                    +'</button>'
                    + '</div>',  
            keyboard: false 
        });
}

const createGameOverModal = () => {
    createModal('main-container', 'gameOverModal');
    const modal = document.getElementById('gameOverModal');
    const modalInstance = new Modal(modal, {
        content: '<div class="modal-header">'
                + '<h4 class="modal-title modalTitles">'
                + GAMEOVER_MODAL_HEADER
                +'</h4>'
                + '</div>'
                + '<div class="modal-body">' 
                + GAMEOVER_MODAL_BODY 
                + '</div>'
                + '<div>'
                + '<img id="gameOverImg" src="../images/game-over.png">'
                + '</div>'
                + '<div id="restart-btn-container">'
                + '<button class="btn btn-primary" id="restartBtn">' 
                + RESTART_BTN
                + '</button>'
                + '</div>', 
        backdrop: 'static',
        keyboard: false
    });

    return modalInstance;
}

const createSaveConfirmationModal = () => {
    createModal('main-container', 'saveModal');
    
    const button = document.getElementById('saveBtn');

    const saveModal = new Modal(button, 
    { // options object
        content:  '<div class="modal-header">'
                + '<h4 class="modal-title modalTitles">'
                + SAVE_MODAL_HEADER
                + '</h4>'
                + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'
                + '</div>'
                + '<div class="modal-body">'
                + SAVE_MODAL_BODY
                + '</div>'
                + '<div class="modal-body">'
                + '<div class="yesno-btns-container">'
                + '<button class="btn btn-primary" id="saveModalYesBtn">' 
                + YES_BTN
                + '</button>'
                + '<button class="btn btn-danger noBtns" data-dismiss="modal">'
                + NO_BTN
                + '</button>'
                + '</div>',  
        keyboard: false // we don't want to dismiss Modal on pressing Esc key
    });
}

const fadeIn = (element) => {
    let opacity = 0.1;
    element.style.opacity = opacity;
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (opacity >= 1){
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity += opacity * 0.1;
    }, 10);
}

const renderIndexView = () => {
    createLogo();
    createLevelField();
    createUserDataField('userdata-field');
    createMatrix(sideOfMatrix);
    createSaveBtn();
    createSwitchLevelModal();
    createSaveConfirmationModal();
    highlightCurrentLevel();
    displayLeaderBoardLinkLetter();

    //Fade in.
    const body = document.getElementById('main-container');
    fadeIn(body);
}

const renderSummaryView = (userObj) => {
    createLogo();
    createSummary('summary-field');
    displayUserSummary(userObj);
    createNameForm();
    createRestartBtn('summary-restart-field');

    //Fade in.
    const body = document.getElementById('main-container');
    fadeIn(body);
}

const renderLeaderboardView = (rankDataArray, userRank, userObj) => {
    createLogo();
    if(userRank > 0) { /*When userRank === 0, then no user data is stored*/
        createLeaderBoardSummary('rank-summary-field', userObj);
        displayUserRank(userRank);
        displayUserSummary(userObj);
    }
    createRankTable(rankDataArray, RANK_TABLE_SIZE);
    createRestartBtn('leaderboard-restart-field');
    
    //Fade in.
    const body = document.getElementById('main-container');
    fadeIn(body);
}


