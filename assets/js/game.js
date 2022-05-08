let deck = [];
let playerTotalScore = 0;
let computerScore = 0;
const types = ['C', 'D', 'H', 'S'];
const specials = ['A','J','Q','K'];

//HTML references
const btnNewGame = document.querySelector('#btnNewGame');
const btnAskCard = document.querySelector('#btnAskCard');
const btnStop = document.querySelector('#btnAskCard');
const playerScore = document.querySelector('#playerScore');
const cardsContainer = document.querySelectorAll('.cards-container');
const result = document.querySelector('.result');

const createDeck = ()=>{

    for(let i = 2; i <= 10; i++){
        for (const type of types){
            deck.push(`${i + type}`);
        }
    }

    for (const special of specials){
        for (const type of types){
            deck.push(`${special + type}`);
        }
    }

    deck = _.shuffle(deck);
    return deck;
}
createDeck();

const askForCard = ()=>{

    if(deck.length === 0){
        throw 'No hay más cartas en el deck'
    }

    const card = deck.pop();
    return card;
}

const cardValue = (card)=>{
    const value = card.substring(0, card.length - 1);
    return (!isNaN(value)) ? Number(value) : ( value === 'A') ? 11 : 10;
}

//DOM events
btnAskCard.addEventListener('click', ()=>{

    const card = askForCard();
    const value = cardValue(askForCard());
    playerScore.innerText = playerTotalScore += value;

    const imgCard = document.createElement('img');
    imgCard.src = `/assets/cards/${card}.png`;
    imgCard.classList.add('card');
    cardsContainer[0].append(imgCard);

    if(Number(playerScore.innerHTML) > 21){
        result.style.color = '#CB4335';
        result.innerText = 'Perdiste';
        btnAskCard.disabled = true;
    }else if(Number(playerScore.innerHTML) === 21){
        result.style.color = '#2ECC71';
        result.innerText = 'Genial, obtuviste 21!';
        btnAskCard.disabled = true;
    }
    
})

