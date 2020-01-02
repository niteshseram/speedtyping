const RANDOM_QUOTE_API_URL = 'http://quotes.stormconsultancy.co.uk/random.json'
const quoteDisplayElement =document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const buttonElement = document.getElementById('startButton')
let check=true
buttonElement.onclick= startTimer;
function clicked(){
    console.log("click" )
}
quoteInputElement.addEventListener('input',()=>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')

    let correct = true
    arrayQuote.forEach((characterSpan, index)=>{
        const character = arrayValue[index]
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }else if(character === characterSpan.innerText){
           characterSpan.classList.add('correct')
           characterSpan.classList.remove('incorrect') 
        }else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct) {
        renderNewQuote()
        stopTimer()
        timerElement.innerText=0
    }
})

function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.quote)
}

async function renderNewQuote(){
    const quote= await getRandomQuote()
    quoteDisplayElement.innerText =''
    quote.split('').forEach(character=>{
        const characterSpan = document.createElement('span')
        characterSpan.innerText=character;
        quoteDisplayElement.append(characterSpan)
    })
    quoteInputElement.value = null
    
}
let starTime
let myVar
function startTimer(){
    timerElement.innerText = 0;
    startTime = new Date()
    myVar = setInterval(()=>{
        timer.innerText = getTimerTime()
    },1000)          
}

function getTimerTime(){
    return Math.floor((new Date()- startTime)/1000)
}
function stopTimer(){
    clearInterval(myVar)
}

renderNewQuote()