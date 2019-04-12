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

        if(checkTrialEnd()) {
            setTimeout(function () {
                preapreForNextTrial();
                startNextTrial();
            }, 1000);
        }
    
    //Incorrect tile was clicked.
    } else {
        score--;
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
    updateNumberDisplay('tiles', maxTiles);
}

const startNextTrial = () => {
    gameStart();
    colourSelectedTiles();
    for(let i = 0; i < (sideOfMatrix * sideOfMatrix); ++i) {
        document.getElementById('tile' + i).onclick = function() { 
            //checkClickedTile(this);
            processUserClick(this); 
        };
    }
}

const gameOver = () => {
    score = 0;
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

const indexInit = () => {
    renderIndexView();
    setLeaderBoardLinkEvent();
    setSaveModalBtnEvent();
    gameStart();
    for(let i = 0; i < (sideOfMatrix * sideOfMatrix); ++i) {
        console.log(document.getElementById('tile' + i))
        document.getElementById('tile' + i).onclick = function() { 
            //checkClickedTile(this);
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

