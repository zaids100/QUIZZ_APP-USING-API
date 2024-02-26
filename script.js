const api="https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple";
let score=0
let currentIndex=0;
let quizzData=[];
let options=document.querySelector('.options');
let question=document.querySelector('.question');
let container=document.querySelector('.container');
let opt=document.querySelectorAll('.opt');
let nextBtn=document.querySelector('.btn');
let header=document.querySelector('.header');

//buttons
let start=document.getElementById("start");

//event listeners
nextBtn.addEventListener('click',nextQuestion);

start.addEventListener('click',()=>{
     container.style.display="flex";
     start.style.display="none";
     getApi();
})

async function getApi()
{
    try{
        let response=await fetch(api);
        let data=await response.json();
        quizzData=data.results;
        displayQuestion();
    }catch(error){
          console.log(error);
    }
}

function displayQuestion(){
    question.innerHTML = quizzData[currentIndex].question;
    
    // Combine incorrect answers and correct answer
    let allAnswers = [...quizzData[currentIndex].incorrect_answers, quizzData[currentIndex].correct_answer];

    // Shuffle the array
    allAnswers = shuffleArray(allAnswers);

    let opts = '';

    // Create HTML for options
    allAnswers.forEach((answer)=>{
        opts += `<div class="opt">${answer}</div>`;
    });

    // Set the HTML content of options
    options.innerHTML = opts;

    // Add event listeners inside displayQuestion function
    let optCards = document.querySelectorAll('.opt');
    optCards.forEach((optCard) => {
        optCard.addEventListener('click', () => {
            if (optCard.textContent === quizzData[currentIndex].correct_answer) {
                optCard.style.backgroundColor = "green";
                score++;
            } else {
                optCard.style.backgroundColor = "red";
            }
            optCards.forEach((card) => {
                if (card.textContent === quizzData[currentIndex].correct_answer) {
                    card.style.backgroundColor = "green";
                }
            });
            optCards.forEach((card) => {
                card.style.pointerEvents = "none"; // Disable pointer events
            });
        });
    });
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}




function nextQuestion(){
    currentIndex++;
    if(currentIndex<quizzData.length)
    {
        displayQuestion();
    }
    else{
         container.style.display="none";
         start.style.display="block";
         start.innerHTML="Your Score is : "+score;   
    } 
}