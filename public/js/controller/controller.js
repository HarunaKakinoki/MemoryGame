const gameStart = () => {
    selectedTileNumbers = selectTiles();
    colourSelectedTiles();
    setTimeout(function() {
        hideSelectedTiles();
        if(rotatedFlag === false) {
            rotateMatrix();
            setTileClickEvent();
        } else {
            rotatedFlag = false;
            setTileClickEvent();
        }  
    }, 2000); /*After 2 seconds, hide tile color & Rotate matrix.*/
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
    for(let i = 0; i < (sideOfMatrix * sideOfMatrix); i++) {
        disableOnclickEvent('tile' + i);
    }
    gameStart();
    colourSelectedTiles();
}

function changeGameLevel(selectedLevel) {
    rotatedFlag = false;

    //Set all data according to the selected level.
    setDataToChangeLevel(selectedLevel);

    //Remove old matrix & create new matrix based on the level.
    removeMatrix();
    createMatrix(sideOfMatrix);

    //Change the display of number of tiles. (User data field)
    updateNumberDisplay('tiles', correctTiles);
    
    //Highlight the current level button.
    highlightCurrentLevel();

    setLevelBtnEvent(selectedLevel);

    startNextTrial();
}

const setTileClickEvent = () => {
    for(let i = 0; i < (sideOfMatrix * sideOfMatrix); ++i) {
        console.log(document.getElementById('tile' + i))
        document.getElementById('tile' + i).onclick = function() { 
            processUserClick(this);
        };
    }
}

const gameOver = () => {
    const modal = createGameOverModal();
    setRestartBtnEvent();
    modal.show();
}

const setLevelBtnEvent = (selectedLevel) => {
    const levelLinks = document.getElementsByClassName('levelLinks');
    let index = 0;

    switch(selectedLevel) {
        case 'easy':
                    index = 0;
                    break;
        case 'normal':
                    index = 1;
                    break;
        case 'hard':
                    index = 2;
                    break;
    }

    levelLinks[index].onclick = function () {
            const modal = document.getElementById('levelModal' + index);
            const modalInstance = new Modal(modal);
            modalInstance.show();
    }
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

const setSaveModalBtnEvent = () => {
    document.getElementById('saveModalYesBtn').onclick = function () {
        saveUserDataToLocalStorage();
        window.location.href = SUMMARY_PATH;
   };
}

const setLeaderBoardLinkEvent = () => {
    const link = document.getElementById('leaderboardLink');
    link.onclick = function () {
        window.location.href = LEADERBOARD_PATH;
    } 
}

const setSubmitBtnEvent = () => {
    const button = document.getElementById('submitBtn');
    button.onclick = function() {
        if(isNameInputValid()) {
            postUserDataToDatabase();
            window.location.href = LEADERBOARD_PATH;
        } else {
            showNameFormAlert();
        }
    };
}

const setRestartBtnEvent = () => {
    document.getElementById('restartBtn').onclick = function () {
         window.location.href = INDEX_PATH;
    };
 }

const disableOnclickEvent = (id) => {
    document.getElementById(id).onclick = function () {
        return false;
    }
}

const indexInit = () => {
    renderIndexView();
    setSaveModalBtnEvent();
    setChangingLevelEvent();
    setLeaderBoardLinkEvent();
    gameStart();
}

const summaryInit = () => {
    if(hasUserDataOnLocalStorage()) {
        const userObj = getUserDataFromLocalStorage();
        renderSummaryView(userObj);
        setSubmitBtnEvent();
        setRestartBtnEvent();
    
    } else {
        alert(NODATA_ALERT);
        window.location.href = INDEX_PATH;
    }
}

const leaderboardInit = () => {
    //After excecute getUserDataToDatabase(), excecute inside "then()".
    getUserDataToDatabase().then(function (rankArray) { /*Value == rankArray from getUserDataToDatabase();*/
        
        if (hasUserDataAndUserNameOnLocalStorage()) {
            
            const userObj = getUserDataFromLocalStorage();
            const userRank = searchUserRank(rankArray);
            renderLeaderboardView(rankArray, userRank, userObj);
            clearLocalStorage(); /*Clear user data after display*/
        
        } else {
            
            renderLeaderboardView(rankArray, 0);
        
        }
        setRestartBtnEvent();
    }).catch(function (error) {
    
        console.log(error);
  
  });
}



