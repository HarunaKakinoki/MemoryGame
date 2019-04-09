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
    
    if(result === true && clickedTile.className === 'selectedTiles') {
        const id = checkClickedTile(clickedTile).id;
        showTileColor(id);
        addScore();
        updateNumberDisplay('score', score);
        foundTiles++;
        disableOnclickEvent(id);

        if(checkTrialEnd()) {
            setTimeout(function () {
                hideSelectedTiles();
                startNextTrial();
            }, 1000);
        }
    
    } else {
        score--;
        if(score < SCORE_LOWER_BOUND) {
            gameOver();
        } 
        updateNumberDisplay('score', score);
    }
}

const startNextTrial = () => {
    playSound(SOUND_NEXTTRIAL);
    setDataForNextTrial();
    gameStart();
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

const indexInit = () => {
    renderIndexView();
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
}

const leaderboardInit = () => {
    renderLeaderboardView();
}

