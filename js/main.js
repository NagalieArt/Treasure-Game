window.addEventListener('load', init);
//Global variables
let imageList = ['ballonnen', 'cars', 'planes', 'goudkistje'];
let alert;
let playingField;
let lastTarget;
let guessNumberField;
let winningImage = 'goudkistje';

/**
 * Initialize after the DOM is ready
 */
function init()
{
    playingField = document.getElementById('playing-field')

    playingField.addEventListener('click', playingFieldClickHandler);

    let playForm = document.getElementById('play-form');
    playForm.addEventListener('submit', formSubmitHandler);

    alert =  document.getElementById('alert');

    guessNumberField = document.getElementById('guess-number');

    createPlayField();
}

/**
 * Generate the playing field dynamically with all the available images
 */
function createPlayField()
{
    imageList = shuffleArray(imageList);

    //of 'for(image of imageList)'
    for(let i = 0; i< imageList.length; i++){
        //Wrapper
        //Create div for card
        let wrapper = document.createElement('div');
        wrapper.classList.add('playing-card');

        //adding numbers
        //Create & append H2 to div
        let number = document.createElement('h2');
        number.innerHTML = i;
        wrapper.appendChild(number);

        ///adding images
        //Create image & append to div
        let img = document.createElement("img")
        img.src = `./img/vraagteken-plaatjes.png`
        img.dataset.id = i.toString();
        wrapper.appendChild(img);

        playingField.appendChild(wrapper);

    }
}

/**
 * Show the card by its front so the player knows whats going on
 *
 * @param e
 */
function playingFieldClickHandler(e)
{
    //controleer of de click op een was
    let currentTarget = e.target;
    if(currentTarget.nodeName === "IMG"){
        console.log("You clicked");
        currentTarget.src = `img/${imageList[currentTarget.dataset.id]}.png`

    if(lastTarget){
     lastTarget.src = `./img/vraagteken-plaatjes.png`;}
     lastTarget = currentTarget;
    }

}

/**
 * Handler for when the form is submitted
 *
 * @param e
 */
function formSubmitHandler(e)
{
   e.preventDefault();
   let guessNum = guessNumberField.value;

   //checking the right picture.
   if(imageList [guessNum] === winningImage){
       writeFeedbackMessage("You did it! You found the treasure!" )
   } else{
       writeFeedbackMessage("Aww too bade, try again!")
   }
}

/**
 * Write text for the user as feedback of their answer
 *
 * @param text
 */
function writeFeedbackMessage(text)
{
    alert.innerHTML = "";
    let span = document.createElement('span');
    span.innerHTML = text;
    alert.appendChild(span);
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * @link http://stackoverflow.com/a/12646864
 *
 * @param array
 * @returns {*}
 */
function shuffleArray(array)
{
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}