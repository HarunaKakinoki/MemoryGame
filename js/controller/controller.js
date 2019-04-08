const gameStart = () => {
    selectedTileNumbers = selectTiles();
    colourSelectedTiles(selectedTileNumbers);
    setTimeout(function() {
        hideSelectedTiles(selectedTileNumbers);
        rotateMatrix();
    }, 3000); /*After 3 seconds, hide tile color & Rotate matrix.*/
}

const processUserClick = (clickedTile) => {
    const result = checkClickedTile(clickedTile).result;
    
    if(result === true && clickedTile.className === 'selectedTiles') {
        const id = checkClickedTile(clickedTile).id;
        showTileColor(id);
        score++;
        foundTiles++;
        disableOnclickEvent(id);
    
    } else {
        score--;
        if(score < SCORE_LOWER_BOUND) {
            gameOver();
        }
    }

    updateNumberDisplay('score', score);
    if(checkTrialEnd()) {
        setTimeout(function () {
            startNextTrial();
        }, 1000);
    }
}

const startNextTrial = () => {
    playSound(SOUND_CORRECT)
}

const gameOver = () => {
    score = 0;
    alert("0")
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

