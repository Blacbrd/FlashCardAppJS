const flashcards = document.getElementsByClassName("flashcards")[0];

const createBox = document.getElementsByClassName("createCard")[0];

const question = document.getElementById("question");
const answer = document.getElementById("answer");

// Local storage keeps data in the browser even if page refreshed
// This checks if any local storage exists, if not, new array is made
// This array will then have new local storage added to it
let contentArray = localStorage.getItem('items') 
? JSON.parse(localStorage.getItem('items')) : [];

function addFlashcard(){

    // Key value pair of what's inside the flashcard
    var flashcardInfo = {
        'myQuestion' : question.value,
        'myAnswer' : answer.value
    }

    // Adds dictionary to contentArray
    contentArray.push(flashcardInfo);

    // Updates contentArray in local storage
    localStorage.setItem('items', JSON.stringify(contentArray));

    putFlashcardOnScreen(contentArray[contentArray.length - 1])

    question.value = '';
    answer.value = '';
}

// This calls the putFlashcardsOnScreen function for every item in the array
// This is so that if there were any previous flashcards, they will be added even if the page is reloaded
contentArray.forEach(putFlashcardOnScreen)

function putFlashcardOnScreen(text){

    // This dynamically adds new div and h2 elements in the webpage
    var div = document.createElement("div");
    var h2Question = document.createElement("h2");
    var h2Answer = document.createElement("h2");

    // Gives a classname to the div variable
    div.className = 'flashcard';

    // You can add style elements using javascript
    h2Question.setAttribute('style', "border-top:1px solid red; padding: 15px; margin-top: 30px");

    h2Question.innerHTML = text.myQuestion;

    // Display starts as none, as we want to hide the answer to the question at first
    h2Answer.setAttribute('style', "text-allign: centre; display: none; color: red")

    h2Answer.innerHTML = text.myAnswer;

    // Adds the question and answer attributes to the div
    div.appendChild(h2Question);
    div.appendChild(h2Answer);

    // Adds an event listener that listens for a click
    // The function() allows us to decide what happens when the click occurs
    div.addEventListener("click", function(){
        if(h2Answer.style.display == "none"){
            h2Answer.style.display = "block";
        } else{
            h2Answer.style.display = "none";
        }
    })

    flashcards.appendChild(div);

}


function deleteFlashcards(){
    localStorage.clear();
    flashcards.innerHTML = '';
    contentArray = [];
}

function showCreateBox(){
    createBox.style.display = "block";
}

function hideCreateBox(){
    // This hides the create box
    createBox.style.display = "none";
}

