const gameStart = () => {
    selectedTileNumbers = selectTiles();
    colourSelectedTiles();
    setTimeout(function() {
        hideSelectedTiles();
        rotateMatrix();
    }, 3000); /*After 3 seconds, hide tile color & Rotate matrix.*/
}

const processUserClick = (clickedTile) => {
    const result = checkClickedTile(clickedTile).result;
    
    //When correct tile was clicked.
    if(result === true && clickedTile.className === 'selectedTiles') {
        
        //Get the id of clicked tile.
        const id = checkClickedTile(clickedTile).id;
        showTileColor(id);
        
        //Manage score.
        addScore();
        updateNumberDisplay('score', score);
        
        foundTiles++;
        
        //To avoid over counting, disalbe the event occured by clicking the tile.
        disableOnclickEvent(id);

        //Check trial is end or not.
        const isTrialEnd = (correctTiles > foundTiles) ? false : true;
        if(isTrialEnd) {
            setTimeout(function () {
                preapreForNextTrial();
                startNextTrial();
            }, 1000);
        }
    
    //Incorrect tile was clicked.
    } else {
        minusScore();
        mistakeFlag = true;
        
        if(score < SCORE_LOWER_BOUND) {
            gameOver();
        } else {
            updateNumberDisplay('score', score);
        }
    }
}

const preapreForNextTrial = () => {
    playSound(SOUND_NEXTTRIAL);
    hideSelectedTiles();
    setDataForNextTrial();
    updateNumberDisplay('trial', trial);
    updateNumberDisplay('tiles', correctTiles);
}

const startNextTrial = () => {
    gameStart();
    colourSelectedTiles();
    for(let i = 0; i < (sideOfMatrix * sideOfMatrix); ++i) {
        document.getElementById('tile' + i).onclick = function() { 
            processUserClick(this); 
        };
    }
}

function changeGameLevel(selectedLevel) {
    //Set all data according to the selected level.
    setDataToChangeLevel(selectedLevel);

    //Remove old matrix & create new matrix based on the level.
    removeMatrix();
    createMatrix(sideOfMatrix);

    //Change the display of number of tiles. (User data field)
    updateNumberDisplay('tiles', correctTiles);
    
    //Highlight the current level button.
    highlightCurrentLevel();

    startNextTrial();
}


const gameOver = () => {
    const modal = createGameOverModal();
    setRestartBtnEvent();
    modal.show();
}

const setLeaderBoardLinkEvent = () => {
    const rankLinks = document.getElementsByClassName('rankLinks');
    for(let i = 0; i < rankLinks.length; ++i) {
        rankLinks[i].onclick = function () {
            window.location.href = LEADERBOARD_PATH;
        };
    } 
}

const setRestartBtnEvent = () => {
   document.getElementById('restartBtn').onclick = function () {
        window.location.href = INDEX_PATH;
   };
}

const setSaveModalBtnEvent = () => {
    document.getElementById('saveModalYesBtn').onclick = function () {
        window.location.href = SUMMARY_PATH;
        saveUserDataToLocalStorage();
        showToast();
   };
}

const setChangingLevelEvent = () => {
    const buttons = document.getElementsByClassName('yesBtns');
    for(let i = 0; i < buttons.length; ++i) {
        buttons[i].onclick = function () {
            hideLevelColour();
            changeGameLevel(this.value);
            const modal = document.getElementById('levelModal' + i);
            const modalInstance = new Modal(modal);
            modalInstance.hide();
        };
    }
}

const indexInit = () => {
    renderIndexView();
    setLeaderBoardLinkEvent();
    setSaveModalBtnEvent();
    setChangingLevelEvent();
    gameStart();
    for(let i = 0; i < (sideOfMatrix * sideOfMatrix); ++i) {
        console.log(document.getElementById('tile' + i))
        document.getElementById('tile' + i).onclick = function() { 
            processUserClick(this);
        };
    }
   
}

const summaryInit = () => {
    renderSummaryView();
    setRestartBtnEvent();
}

const leaderboardInit = () => {
    renderLeaderboardView();
    setRestartBtnEvent();
}

