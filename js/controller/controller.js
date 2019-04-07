const gameStart = () => {
    const tileNumbers = selectTiles();
    colourSelectedTiles(tileNumbers);
    setTimeout(function() {
        hideSelectedTiles(tileNumbers);
        rotateMatrix();
    }, 3000); /*After 3 seconds, hide tile color & Rotate matrix.*/
}



const indexInit = () => {
    renderIndexView();
    gameStart();
}

const summaryInit = () => {
    renderSummaryView();
}

const leaderboardInit = () => {
    renderLeaderboardView();
}