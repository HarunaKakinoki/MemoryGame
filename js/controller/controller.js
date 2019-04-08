const gameStart = () => {
    selectedTileNumbers = selectTiles();
    colourSelectedTiles(selectedTileNumbers);
    setTimeout(function() {
        hideSelectedTiles(selectedTileNumbers);
        rotateMatrix();
    }, 3000); /*After 3 seconds, hide tile color & Rotate matrix.*/
}




const indexInit = () => {
    renderIndexView();
    gameStart();
    for(let i = 0; i < (sideOfMatrix * sideOfMatrix); ++i) {
        console.log(document.getElementById('tile' + i))
        document.getElementById('tile' + i).onclick = function() { 
            checkClickedTile(this);
        };
    }
   
}

const summaryInit = () => {
    renderSummaryView();
}

const leaderboardInit = () => {
    renderLeaderboardView();
}

