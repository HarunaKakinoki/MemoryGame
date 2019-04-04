//Create DOM element with class & id(optional) attributes.
const createElement = (elementName, className = undefined, id = undefined) => {
    const $element = document.createElement(elementName);
    
    if(className != undefined) {
        $element.className = className;
    }

    if(id != undefined) {
        $element.id = id;
    }
    
    return $element;

}

//Find the specfied field by Id, & append the passed element to the field.
const appendElementToIdField= (fieldId, element) => {
    const $field = document.getElementById(fieldId);
    $field.appendChild(element);
}

const createLogo = (imgSrc) => {
   const logoImg = createElement('img');
   logoImg.src = imgSrc;
   appendElementToIdField('logo-field', logoImg);
} 

const createLevelField = (levelArray) => {
    const $ul = createElement('ul');
    for(let i = 0; i < levelArray.length; ++i) {
        const $li = createElement('li');
        const $a = createElement('a');
        $a.href = '#';
        $a.textContent = levelArray[i];
        $li.appendChild($a);
        $ul.appendChild($li);
    }
    appendElementToIdField('level-field', $ul);
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

createLogo('images/logo.png');
createLevelField(LEVEL_ARRAY);
createUserDataField('userdata-field');


